#!/usr/bin/env node
/**
 * Design review screenshots: full-page desktop (1440) + mobile (390) captures
 * of one or more routes, written to .review/<route>/.
 *
 *   npm run dev                       # in another terminal
 *   npm run review -- /starter-webinar /starter-webinar/thank-you
 *
 * Options (env): BASE_URL (default http://localhost:3000), REVIEW_MOTION=1 to keep animations.
 * Requires Playwright (`npm i -D playwright && npx playwright install chromium` locally).
 */
import { mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const routes = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (!routes.length) {
  console.error("Usage: npm run review -- /<slug> [/<slug>/thank-you …]");
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  try {
    // Falls back to a globally installed Playwright (CommonJS resolution honours NODE_PATH).
    ({ chromium } = createRequire(import.meta.url)("playwright"));
  } catch {
    console.error("Playwright not found. Install with: npm i -D playwright && npx playwright install chromium");
    process.exit(1);
  }
}

const viewports = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
];

const browser = await chromium.launch();
const problems = [];

for (const route of routes) {
  const dir = path.join(".review", route.replace(/^\//, "").replace(/\//g, "__") || "index");
  await mkdir(dir, { recursive: true });

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      reducedMotion: process.env.REVIEW_MOTION ? "no-preference" : "reduce",
    });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && problems.push(`[${vp.name} ${route}] console: ${m.text()}`));
    page.on("pageerror", (e) => problems.push(`[${vp.name} ${route}] pageerror: ${e.message}`));
    page.on("requestfailed", (r) => problems.push(`[${vp.name} ${route}] request failed: ${r.url()}`));

    const res = await page.goto(base + route, { waitUntil: "networkidle" });
    if (!res || !res.ok()) problems.push(`[${vp.name} ${route}] HTTP ${res?.status()}`);

    // Trigger scroll reveals, then return to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 1) problems.push(`[${vp.name} ${route}] horizontal overflow: ${overflow}px`);

    const brokenImages = await page.evaluate(() =>
      [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src),
    );
    for (const src of brokenImages) problems.push(`[${vp.name} ${route}] broken image: ${src}`);

    const links = await page.evaluate(() =>
      [...document.querySelectorAll("a[href^='#']")].map((a) => a.getAttribute("href")).filter((h) => h && h.length > 1),
    );
    for (const href of new Set(links)) {
      const exists = await page.evaluate((id) => !!document.getElementById(id), href.slice(1));
      if (!exists) problems.push(`[${vp.name} ${route}] anchor target missing: ${href}`);
    }

    await page.screenshot({ path: path.join(dir, `${vp.name}-fold.png`) });
    await page.screenshot({ path: path.join(dir, `${vp.name}-full.png`), fullPage: true });
    await ctx.close();
    console.log(`✓ ${route} @ ${vp.name} → ${dir}`);
  }
}

await browser.close();
if (problems.length) {
  console.log("\nIssues found:");
  for (const p of problems) console.log("  - " + p);
  process.exitCode = 1;
} else {
  console.log("\nNo console errors, broken images, missing anchors or horizontal overflow.");
}
