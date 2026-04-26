# Templates

Operational (Ops / Marketing) templates rendered to PNG via Playwright +
Matters Design System tokens. Pure HTML/CSS + a JSON data envelope —
ops can edit copy and re-render without touching Figma.

## Source of truth

Figma `CC & Branding` (fileKey `HQ5Y6bBc9dVDT99u8Qvkb5`) is the visual
reference. Templates here are programmatic ports — change visual = update
both, with Figma as ground truth.

## What's shipped

| Template                                   | Output size | Use case                                  |
| ------------------------------------------ | ----------- | ----------------------------------------- |
| [`og-image/`](og-image/)                   | 1200 × 630  | OG / Twitter card for an article share    |
| [`social-card/`](social-card/)             | 1080 × 1080 | Square share — Threads, IG post, Mastodon |
| [`newsletter-header/`](newsletter-header/) | 600 × 200   | Email newsletter banner                   |

Each template directory has:

- `template.html` — the renderable HTML (uses `{{placeholder}}` substitution)
- `data.example.json` — sample data envelope
- `README.md` — input schema + design notes

Plus shared resources:

- [`shared/`](shared/) — `tokens.css` (DS canonical tokens), `template-base.css` (resets + brand-mark utility), and the official **Matters.News logo SVGs** (`matters-mark-black.svg`, `matters-mark-white.svg`, `matters-mark-color.svg`, plus letterings)
- [`library/`](library/) — pre-approved background images (covers, posters) sourced from the design handoff. Ops can use these directly as `imageSrc` / `backgroundUrl` in template renders without going to Figma. See [`library/README.md`](library/README.md).

## Render one

```bash
# From repo root
pnpm template:render og-image \
  --data templates/og-image/data.example.json \
  --out /tmp/og.png

# Quick: use the example data (default)
pnpm template:render og-image
# → writes templates/.example-output/og-image.png
```

The render script (`scripts/render-template.mjs`) uses Playwright (already
installed for visual regression). It opens `template.html`, substitutes
`{{key}}` with values from the data JSON, sets the viewport to the
template's declared size, waits for fonts + images, then screenshots.

## Add a new template

1. `mkdir templates/<name>/` and put `template.html` + `data.example.json` + `README.md` inside
2. In `template.html`, declare the canvas size via a `<meta>` tag:
   ```html
   <meta name="ds-template-size" content="1200x630" />
   ```
3. Reference tokens via `<link rel="stylesheet" href="../shared/tokens.css">` (path to the canonical tokens — see existing templates)
4. Use Google Fonts for typography (Noto Sans TC + Noto Serif TC) — these render consistently across macOS / Linux / CI
5. Add a story to `tests/visual/templates.spec.ts` if you want CI to lock down its visual output (Phase 7+)

## Why HTML + Playwright over Figma direct export?

- Editable by anyone with text editor — ops doesn't need a Figma seat
- Version-controlled — every visual change has a git commit
- Data-driven — same template renders 100 article OG images in a loop
- Locale-friendly — swap PingFang TC ↔ Noto Sans TC for CI stability

## Why Google Fonts (Noto) and not PingFang TC?

PingFang TC is an Apple system font; it's not on Linux / cloud render
servers. Templates need to render the same regardless of where the
script runs (your Mac, GitHub Actions, a Cloudflare Worker, an ops
person's Windows laptop). Noto Sans TC + Noto Serif TC are open and
cover the same character ranges. Visual difference vs. PingFang is
small; consistency matters more for shareable images.
