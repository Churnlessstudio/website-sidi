# Review checklist

Run it after every build and every significant redesign. Fix, then re-run the screenshots.

## 1. Mechanics
- [ ] `npm run lint` is clean
- [ ] `npm run build` passes (static routes are expected)
- [ ] `npm run dev` (or `npm start`), then `npm run review -- /<slug> /<slug>/thank-you`. The script
      reports console errors, failed requests, broken images, missing `#anchor` targets and
      horizontal overflow. All must be zero.
- [ ] Open `.review/<slug>/desktop-fold.png`, `desktop-full.png`, `mobile-fold.png`, `mobile-full.png`
      and actually look at them. If browser tooling is unavailable, say so in the hand-off. Don't claim
      a visual check you didn't do.

## 2. Five-second test (fold screenshots)
- [ ] Offer, audience and next step are obvious on desktop **and** mobile fold
- [ ] Headline is the dominant element. Nothing competes with it.
- [ ] Primary CTA is visible above the fold on mobile (or within one short scroll for VSL)
- [ ] Event date/time with timezone is present for live events

## 3. Creative-director pass
- [ ] Does it look like *this client*, not a template? Compare against `brief.md`.
- [ ] Is it different from the other funnels in `src/funnels/`?
- [ ] Typography: pairing is intentional, the display face renders (not a fallback), leading and tracking
      feel tuned, no orphans or widows in headlines, body measure ≤ ~72ch
- [ ] Background: the hero treatment is rich but text stays crisp. Sections have rhythm (not
      one flat colour top to bottom), and grain and glows are subtle rather than muddy.
- [ ] Spacing: consistent vertical rhythm, no cramped cards, no giant accidental gaps
      (watch for hero padding plus section padding stacking)
- [ ] Alignment: shared left edges, centred items actually centred, grid columns line up
- [ ] Contrast: body ≥ 4.5:1, muted text still readable on every background, CTA label readable
- [ ] Generic smell test: stock-feeling icon grids, centred everything, identical card rows,
      default shadows, emoji bullets. Redesign anything that reads as "AI landing page".

## 4. Mobile pass (390px screenshots)
- [ ] Headline wraps well (adjust copy breaks or size, never just shrink to tiny)
- [ ] No horizontal scroll, and tap targets are ≥ 44px
- [ ] Section order still makes sense stacked, and images crop well
- [ ] Sticky CTA appears after the hero and hides over the form

## 5. Function
- [ ] Every CTA destination works (anchors scroll to existing ids, routes exist, external URLs are the client's)
- [ ] Form / calendar embed is the client's real one and loads. The redirect to thank-you is configured in GHL.
- [ ] Countdown targets the configured deadline (with offset) and the expired state reads correctly
- [ ] Video plays (click-to-load) and the poster is the client's
- [ ] FAQ opens and closes with mouse and keyboard
- [ ] Metadata: title, description, OG image, canonical; thank-you/replay are noindex
- [ ] `prefers-reduced-motion`: content is visible and nothing loops aggressively

## 6. Integrity
- [ ] No invented stats, testimonials, credentials, logos, guarantees, scarcity or deadlines
- [ ] `npm run check:placeholders -- <slug>` passes before launch. Before that, list every open placeholder in the hand-off.
- [ ] Copy suggestions are in `brief.md`, not silently shipped
