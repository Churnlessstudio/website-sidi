# INC reference starter: creative brief (`starter-webinar`)

Reference implementation of the component system. All copy is sample content.

## Creative direction
1. **Visual concept:** "After Hours": warm ember light falling on a dark editorial stage, with faint architectural gridlines.
2. **Emotional impression:** intimate, assured, premium.
3. **Palette:**
   | Token | Hex | Role |
   |---|---|---|
   | --f-bg | #0f0c0a | warm near-black stage |
   | --f-bg-alt | #16110e | alternating sections |
   | --f-surface | #1d1713 | cards |
   | --f-ink | #f5eee6 | primary text (warm bone) |
   | --f-muted | #b9aa9b | secondary text (~8:1 on bg) |
   | --f-accent | #f3a861 | amber CTA + emphasis |
   | --f-glow | #e9733a | ember glows |
4. **Typography:** Fraunces (soft optical serif, italic for emphasis words) + Hanken Grotesk (clean, warm grotesk for UI and body).
5. **Background treatment:** hero has a drifting ember mesh, a top spotlight, a faint blueprint grid and film grain, fading to the stage colour. Content sections alternate bg/bg-alt. The register section and final CTA echo the hero glow.
6. **Hero composition:** centred stage. Announcement bar with format and date, eyebrow, two-line headline with an italic accent phrase, subheadline, countdown tiles, CTA with reassurance note, host line.
7. **Animation approach:** CSS staggered entrance for the hero, slow ambient drift on glows, `Reveal` for content below the fold, and a light-sweep on the CTA hover. All of it is disabled under reduced motion.

## Section journey
Hero → What you'll learn (numbered, sticky heading) → Who it's for (checklist) → Host → Proof → Register (steps + GHL embed) → FAQ → Final CTA → footer. Mobile sticky CTA.

## Assets & licences
None. All backgrounds are CSS/SVG.

## Review notes
- Desktop and mobile screenshots reviewed. Fixed: mobile glow too weak (blob sizes now have px minimums), announcement wrapping on mobile, and an empty register panel when no embed is configured.
