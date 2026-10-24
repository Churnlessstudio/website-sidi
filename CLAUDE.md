@AGENTS.md

# The INC Consulting: Funnel Studio

This repo holds client funnels built as Next.js pages, one route group per funnel.

- **Always** load the `inc-funnel-design` skill (`.claude/skills/inc-funnel-design/SKILL.md`)
  before creating, redesigning, or improving any funnel or landing page. If Anthropic's
  `frontend-design` plugin is enabled, use it alongside.
- Funnel content and integrations live in `src/funnels/<slug>/config.ts`, the theme in
  `theme.css`, and creative direction in `brief.md`. Routes are in `src/app/(funnels)/<slug>/`.
- Never invent testimonials, stats, credentials, guarantees, scarcity, deadlines, image
  URLs or integration IDs. Use `[PLACEHOLDER: …]` and report it.
- Before hand-off: `npm run lint`, `npm run build`, `npm run review -- /<slug>` (and look at
  the screenshots). Before launch: `npm run check:placeholders -- <slug>`.
- `legacy/bandatics-static/` is the original hand-coded Bandatics page, kept for reference.
