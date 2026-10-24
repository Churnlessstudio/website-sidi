# Build guide

## Stack
Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript, Tailwind CSS v4.
This Next.js version differs from older training data. Check `node_modules/next/dist/docs/`
before using an API you're unsure of (see `AGENTS.md`).

## Project map

```
src/
  app/
    layout.tsx                    root html/body (no fonts; funnels own theirs)
    globals.css                   Tailwind, token→utility mapping, fluid type, buttons, motion
    page.tsx                      internal funnel index (noindex)
    (funnels)/<slug>/
      layout.tsx                  next/font + theme.css + data-funnel wrapper + metadata
      page.tsx                    the funnel page (composition is unique per funnel)
      thank-you/page.tsx          noindex confirmation page
      replay/page.tsx             (when needed)
  funnels/
    registry.ts                   list shown on "/"
    <slug>/config.ts              ALL editable content + integrations (the file the team edits)
    <slug>/theme.css              palette + font tokens scoped to [data-funnel="<slug>"]
    <slug>/brief.md               creative direction + asset licences + suggested copy
  components/
    funnel/                       Hero, CtaButton, Countdown, VideoEmbed, Faq, Testimonials,
                                  AuthorityBlock, BenefitGrid, OfferStack, ApplicationSection,
                                  EmbedFrame, StickyCta, Reveal, primitives (Section, Container,
                                  Eyebrow, SectionHeading, MissingConfig)
    backgrounds/                  MeshGradient, Aurora, BlueprintGrid, DotGrid, Spotlight,
                                  GrainOverlay, FadeEdge
  lib/
    funnel.ts                     shared types (Cta, Testimonial, Expert, Embed, …), buildMetadata
    video.ts                      YouTube/Vimeo/Wistia/Loom/mp4 URL → embed
    calendar.ts                   formatEventDate, googleCalendarUrl
public/funnels/<slug>/            client assets (logos, headshots, posters, OG image)
scripts/                          new-funnel, check-placeholders, review (screenshots)
```

## Theming

`theme.css` defines `--f-bg`, `--f-bg-alt`, `--f-surface`, `--f-ink`, `--f-muted`, `--f-line`,
`--f-accent`, `--f-accent-ink`, `--f-glow`, `--f-radius`, `--f-font-display`, `--f-font-text`
(+ optional `--f-font-mono`). Tailwind exposes them as `bg-f-bg`, `text-f-muted`,
`border-f-line`, `font-display`, `font-text`, `rounded-f`, and so on. Add funnel-specific CSS
in the same file, always under the `[data-funnel="<slug>"]` selector.

Fonts: in `layout.tsx`, call `next/font/google` (or `next/font/local` for client brand fonts placed in
`src/funnels/<slug>/fonts/`) with `variable: "--font-<slug_token>-display"` and wire the variable into
`--f-font-display` in theme.css. Font loaders must be called at module scope.

Fluid type utilities: `text-display-xl|lg|md|sm`, `text-lede`, `text-eyebrow`; section padding: `section-y`.

## Components cheat-sheet

| Need | Use |
|---|---|
| Hero layout + staggered entrance | `<Hero composition="centered|split|media-first" background={…} … />` (or hand-build with `.f-enter` + `--enter-delay`) |
| Buttons | `<CtaButton cta={{label, href, note?, newTab?}} variant="primary|ghost" size="lg" showNote />` |
| Countdown | `<Countdown deadline="2026-12-03T19:00:00-05:00" variant="tiles|inline" />` (real deadline, with offset) |
| Video / VSL | `<VideoEmbed url={…} title="…" poster="/funnels/<slug>/poster.jpg" priority />` (click-to-load) |
| GHL form / calendar | `<EmbedFrame embed={{kind:"ghl-form"|"ghl-calendar", src}} />` or inside `<ApplicationSection embed={…} steps={…} />` |
| FAQ | `<Faq items={…} />` (native details, FAQPage JSON-LD) |
| Proof | `<Testimonials items={…} layout="grid|featured|wall" />` (hidden when empty) |
| Expert | `<AuthorityBlock expert={…} imageSide="left|right" />` |
| Benefits / learn / pains / qualifiers | `<BenefitGrid variant="cards|numbered|list" columns={2|3|4} />` |
| Offer / pricing | `<OfferStack title items bonuses price totalValue cta />` |
| Scroll entrance | `<Reveal delay={…}>` (below the fold only) |
| Mobile sticky CTA | `<StickyCta cta afterId="hero" hideWhenVisibleId="register" />` |

When a concept needs something these can't express (a timeline, a comparison table, a
logo marquee, a parallax photo band), build a new component in `src/components/funnel/`
with the same conventions (token colours, `Reveal`, reduced-motion safe) so the next funnel can reuse it.

## Integrations

**GoHighLevel form / survey**: from the client's embed code, copy the iframe `src`
(`https://api.leadconnectorhq.com/widget/form/<id>`, `/widget/survey/<id>`, or their white-label
domain). Put it in config as `{ kind: "ghl-form", src }`. In GHL, set the form's
on-submit action to redirect to `https://<domain>/<slug>/thank-you`.
**GoHighLevel calendar**: `{ kind: "ghl-calendar", src: "https://api.leadconnectorhq.com/widget/booking/<id>" }`.
Set the confirmation redirect in the calendar settings.
`EmbedFrame` loads GHL's `form_embed.js` (lazyOnload) so the iframe auto-resizes.
**Hosted page instead of embed**: pass `cta={{ label, href: "<GHL funnel/survey URL>" }}` to `ApplicationSection`.
**Other providers** (Typeform, Calendly, Jotform…): `{ kind: "iframe", src, title, height }`.

Never build a fake form that "submits" to nothing. If no embed has been supplied, the config
holds `"[PLACEHOLDER: …]"`. Dev shows a dashed "Not configured" box, and `check:placeholders` fails.

**Video**: paste any YouTube / Vimeo / Wistia / Loom share URL or a direct `.mp4`. Other
`https` player URLs are embedded as-is.

**Tracking pixels / tag managers**: add with `next/script` in the funnel's `layout.tsx`
(`strategy="afterInteractive"`), using IDs the client provides. Never invent IDs.

## Assets
- Client files go in `public/funnels/<slug>/`. Reference them as `/funnels/<slug>/file.jpg`.
- Remote images need an entry in `next.config.ts` → `images.remotePatterns`; add one only for a
  host you've verified serves the asset.
- Record each asset's source and licence in `brief.md`.
- OG image: 1200×630 at `public/funnels/<slug>/og.jpg` → `seo.ogImage`.

## Commands
```
npm run dev                         # http://localhost:3000
npm run new:funnel -- <slug> --client "Name" --type webinar
npm run lint && npm run typecheck
npm run build                       # must pass before hand-off
npm run review -- /<slug> /<slug>/thank-you    # with dev or start running → .review/
npm run check:placeholders -- <slug>           # must pass before launch
```

## Deploy
**Vercel (recommended).** Import the GitHub repo in Vercel. The framework (Next.js) is auto-detected and the
build is `npm run build`. Add the client's domain under Project → Domains. For one domain per client, either
(a) point the domain at the project and add a redirect from `/` to `/<slug>` in `next.config.ts`
`redirects()` scoped with a `has: [{ type: "host", value: "clientdomain.com" }]` condition, or
(b) create a separate Vercel project per client from the same repo with a host-based redirect.
Set `seo.canonical` to the production URL.
**Any Node host**: `npm ci && npm run build && npm start` (port 3000).
**GoHighLevel-hosted funnels**: these pages are full Next.js pages, so link to them from GHL
or use a custom domain on Vercel. Don't paste the built HTML into GHL custom-code blocks.
