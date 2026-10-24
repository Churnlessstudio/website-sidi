# Creative direction library

Starting points, not templates. Combine, adapt, and push further. Record what you chose in
the funnel's `brief.md` so the next funnel can deliberately do something different.

## Aesthetic directions by market

| Market | Direction | Background ideas | Palette mood | Type mood |
|---|---|---|---|---|
| Luxury real estate | **Architectural noir**: blueprint linework, brass on ink | `BlueprintGrid` + spotlight; graded property photography; thin-rule frames | Ink navy, brass, bone, smoke | High-contrast serif + refined grotesk |
| Real estate investing / wholesaling | **Developer's pitch book**: confident, data-forward | Topographic or plat-map lines, warm daylight photography, ledger rules | Concrete, sage, signal orange | Condensed grotesk + clean text |
| AI / automation / SaaS | **Precision futurism**: dark fields, controlled light | `Aurora`, dot matrices, fine grids with perspective, glass panels | Near-black blue, electric accent, cool greys | Geometric/technical grotesk + mono accent |
| Business coaching / consulting | **Editorial authority**: magazine feature | Paper grain, generous white space, large portrait photography, rule lines | Warm off-white, deep ink, one saturated accent | Editorial serif display + humanist sans |
| High-ticket mastermind | **Private members' club** | Deep velvet gradients, `GrainOverlay`, gold-leaf hairlines, low-key portrait lighting | Oxblood/forest/midnight, champagne | Didone or wedge serif + elegant sans |
| Credit / finance / funding | **Trust with momentum** | Clean light sections with dark hero, subtle guilloche/security-pattern linework | Bank green or deep blue, mint/gold accent | Sturdy grotesk + readable text |
| Health / wellness / fitness | **Vital and warm** | Soft organic mesh gradients, sun-washed photography, botanical shapes | Clay, sage, sand, a lively accent | Soft serif or rounded grotesk + friendly sans |
| Beauty / salon / lifestyle | **Glossy editorial** | Satin gradients, macro texture photography, arched frames | Blush, cocoa, cream, gloss highlight | Fashion serif + light grotesk |
| Faith / community / nonprofit | **Luminous and human** | Dawn-light gradients, warm documentary photography | Warm gold, deep plum/navy, cream | Classic serif + warm sans |
| E-commerce / creators | **Bold poster** | Flat colour fields, oversized type as image, halftone or sticker motifs | High-saturation duo + neutral | Display grotesk/extended + compact sans |

## Type pairings (all on Google Fonts, load with `next/font/google`)

Display ➜ Text. Pick by brand voice. Avoid repeating a pairing another funnel in the repo already uses.

**Editorial / authority**
- Fraunces (opsz, soft) ➜ Hanken Grotesk
- Instrument Serif ➜ Geist
- Newsreader ➜ Public Sans
- Playfair Display (only at large sizes) ➜ Source Sans 3
- DM Serif Display ➜ DM Sans

**Luxury / high-ticket**
- Cormorant Garamond (600+, large only) ➜ Jost
- Bodoni Moda ➜ Figtree
- Gloock ➜ Albert Sans
- Italiana (accents only) + Marcellus ➜ Mulish

**Modern / tech / AI**
- Space Grotesk ➜ IBM Plex Sans (+ IBM Plex Mono accents)
- Unbounded (headlines, sparing) ➜ Manrope
- Sora ➜ Inter Tight
- Bricolage Grotesque ➜ Geist (+ Geist Mono)
- Syne ➜ Outfit

**Bold / momentum / finance**
- Archivo (expanded widths) ➜ Archivo
- Anton or Bebas Neue (large only) ➜ Barlow
- Big Shoulders Display ➜ Work Sans
- Familjen Grotesk ➜ Karla

**Warm / wellness / community**
- Recoleta-like: Young Serif ➜ Nunito Sans
- Lora ➜ Plus Jakarta Sans
- Gelasio ➜ Rubik

Rules: at most 2 families (plus an optional mono or italic accent). Set real weights and
`display: "swap"`. Keep italics or a contrasting weight for emphasis words in headlines
instead of colour-only highlights.

## Palette construction

Define tokens in `theme.css` (consumed via Tailwind as `bg-f-bg`, `text-f-ink`, etc.):

| Token | Role |
|---|---|
| `--f-bg` | Page background (dominant mood) |
| `--f-bg-alt` | Alternating section background |
| `--f-surface` | Cards/panels |
| `--f-ink` | Primary text |
| `--f-muted` | Secondary text (still AA on its background) |
| `--f-line` | Hairlines, borders |
| `--f-accent` | CTA + key highlights (one hue, used sparingly) |
| `--f-accent-ink` | Text on accent (AA contrast) |
| `--f-glow` | Light/glow colour for gradients |

Method: choose the mood hue, then tint neutrals toward it (e.g. warm greys for gold,
blue-greys for electric). Use one accent at full strength; derive glows at 10–35% alpha.
Verify ink/bg, muted/bg, and accent-ink/accent contrast.

## Background treatments (components in `src/components/backgrounds/`)

- `MeshGradient`: layered radial blobs. Set colours and positions per funnel. Can drift slowly.
- `Aurora`: animated soft light ribbons for tech/AI or premium dark heroes.
- `BlueprintGrid`: architectural grid with major/minor lines and an optional radial fade mask.
- `DotGrid`: technical dot matrix with fade mask.
- `Spotlight`: a single dimensional light cone from above, the "stage lighting" effect.
- `GrainOverlay`: SVG film grain. Adds expense to flat gradients (keep opacity 0.04–0.12).
- Photography: client-supplied or licensed only, in `public/funnels/<slug>/`. Grade it with
  overlay gradients so text stays readable. Use `next/image` with `fill` + `sizes` + `priority` for the hero.
- Parallax: a gentle translate on scroll for one decorative layer at most (respect reduced motion).

Section rhythm: hero (signature treatment) ➜ calmer content sections ➜ a high-contrast
"band" mid-page (proof or mechanism) ➜ calm ➜ closing CTA that echoes the hero treatment.
