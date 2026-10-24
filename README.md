# The INC Consulting: Funnel Studio

Conversion funnels built as real Next.js pages (Next.js 16, React 19, TypeScript, Tailwind v4).
Design standards are in the **INC Funnel Design** skill: `.claude/skills/inc-funnel-design/`.

## Local preview
```bash
npm install
npm run dev          # http://localhost:3000 lists every funnel
```

## New funnel
```bash
npm run new:funnel -- acme-webinar --client "Acme" --type webinar
```
Then fill in `src/funnels/acme-webinar/brief.md` (creative direction), `config.ts` (content and
GoHighLevel embeds) and `theme.css`, and art-direct `src/app/(funnels)/acme-webinar/page.tsx`.

## Quality gates
```bash
npm run lint && npm run build
npm run review -- /acme-webinar /acme-webinar/thank-you   # desktop + mobile screenshots → .review/
npm run check:placeholders -- acme-webinar                # must pass before launch
```
`review` needs Playwright locally: `npm i -D playwright && npx playwright install chromium`.

## Deploy
Import the repo into Vercel (Next.js is auto-detected), add the client domain, and set the GHL form
redirect to `https://<domain>/<slug>/thank-you`. Full notes are in
`.claude/skills/inc-funnel-design/references/build-guide.md#deploy`.

## Layout
- `src/app/(funnels)/<slug>/`: routes (layout with fonts + SEO, page, thank-you)
- `src/funnels/<slug>/`: config, theme, brief
- `src/components/funnel/`: reusable sections. `src/components/backgrounds/`: background layers
- `legacy/bandatics-static/`: the original static Bandatics page (reference only)
