#!/usr/bin/env node
/**
 * Pre-launch guard: fails if a funnel still contains "[PLACEHOLDER" markers
 * (unapproved copy, missing testimonials, unset GHL embeds…).
 *
 *   npm run check:placeholders              # every funnel except the starter
 *   npm run check:placeholders -- acme-vsl  # one funnel
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const FUNNELS = "src/funnels";
const ROUTES = "src/app/(funnels)";
const requested = process.argv.slice(2);

const slugs = requested.length
  ? requested
  : (await readdir(FUNNELS, { withFileTypes: true }))
      .filter((d) => d.isDirectory() && d.name !== "starter-webinar")
      .map((d) => d.name);

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(tsx?|css|json)$/.test(e.name)) yield p;
  }
}

let hits = 0;
for (const slug of slugs) {
  for (const root of [path.join(FUNNELS, slug), path.join(ROUTES, slug)]) {
    if (!(await stat(root).catch(() => null))) continue;
    for await (const file of walk(root)) {
      const lines = (await readFile(file, "utf8")).split("\n");
      lines.forEach((line, i) => {
        if (line.includes("[PLACEHOLDER")) {
          hits++;
          console.log(`${file}:${i + 1}  ${line.trim().slice(0, 140)}`);
        }
      });
    }
  }
}

if (hits) {
  console.error(`\n✗ ${hits} placeholder(s) left. Replace with client-approved content or remove the section.`);
  process.exit(1);
}
console.log(`✓ No placeholders in: ${slugs.join(", ") || "(no funnels)"}`);
