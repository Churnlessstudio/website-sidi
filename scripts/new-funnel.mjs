#!/usr/bin/env node
/**
 * Scaffold a new funnel from the reference starter:
 *
 *   npm run new:funnel -- <slug> [--client "Client Name"] [--type webinar]
 *
 * Creates src/funnels/<slug>/ (config, theme, brief) and
 * src/app/(funnels)/<slug>/ (layout, page, thank-you) and registers it.
 * The result is plumbing. Rework the design to match the creative brief.
 */
import { cp, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

if (!slug || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error("Usage: npm run new:funnel -- <kebab-case-slug> [--client \"Name\"] [--type webinar]");
  process.exit(1);
}
const client = flag("client", slug);
const type = flag("type", "webinar");

const SRC = "starter-webinar";
const pairs = [
  [path.join("src/funnels", SRC), path.join("src/funnels", slug)],
  [path.join("src/app/(funnels)", SRC), path.join("src/app/(funnels)", slug)],
];

for (const [, to] of pairs) {
  if (await stat(to).catch(() => null)) {
    console.error(`✗ ${to} already exists`);
    process.exit(1);
  }
}

// Identifier-safe token for font CSS variables, e.g. acme-vsl -> acme_vsl
const token = slug.replace(/-/g, "_");
const Pascal = slug.replace(/(^|-)([a-z0-9])/g, (_, __, ch) => ch.toUpperCase());

async function rewrite(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      await rewrite(p);
      continue;
    }
    let s = await readFile(p, "utf8");
    s = s
      .replaceAll("starter-webinar", slug)
      .replaceAll("--font-starter-", `--font-${token}-`)
      .replaceAll("StarterWebinar", Pascal)
      .replaceAll("StarterThankYou", `${Pascal}ThankYou`);
    await writeFile(p, s);
  }
}

for (const [from, to] of pairs) {
  await cp(from, to, { recursive: true });
  await rewrite(to);
}

// brief.md from the skill template
const briefTpl = await readFile(".claude/skills/inc-funnel-design/templates/brief.md", "utf8");
await writeFile(path.join("src/funnels", slug, "brief.md"), briefTpl.replaceAll("<slug>", slug).replaceAll("<Client>", client));

// register
const regPath = "src/funnels/registry.ts";
const reg = await readFile(regPath, "utf8");
const entry = `  {
    slug: "${slug}",
    client: ${JSON.stringify(client)},
    type: "${type}",
    concept: "TODO: one-line visual concept from brief.md",
    routes: ["/${slug}", "/${slug}/thank-you"],
    status: "draft",
  },
];`;
await writeFile(regPath, reg.replace(/\n\];\s*$/, `\n${entry}\n`));

console.log(`✓ Created funnel "${slug}"
  src/funnels/${slug}/config.ts      ← content + integrations
  src/funnels/${slug}/theme.css      ← palette + type tokens
  src/funnels/${slug}/brief.md       ← creative direction (fill this in FIRST)
  src/app/(funnels)/${slug}/         ← layout (fonts, SEO), page, thank-you
Preview: npm run dev → http://localhost:3000/${slug}`);
