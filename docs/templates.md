# Templates (Phase 6)

Operational image templates rendered via HTML + Matters DS tokens +
Playwright. Lets ops produce on-brand OG images, social shares, and
newsletter headers from JSON data — no Figma seat needed, fully version-
controlled.

## Why this exists

Three pain points the previous "edit Figma + export PNG" workflow had:

1. **Bottleneck**: every campaign needed a designer touch
2. **Drift**: edited Figma file ≠ what eventually goes out (ops hand-edits the PNG in Photoshop)
3. **Scale**: 100 article OG images × manual workflow = doesn't happen

This pipeline:

- Templates are HTML files anyone with a text editor can change
- Tokens stay in sync with the rest of the DS automatically (`tokens.css` is the same one Storybook + the React package use)
- Output is deterministic: same data → same PNG, byte-for-byte
- One-shot or in a loop — render 100 at once is just a shell loop

## What's in the box

3 templates, see [`templates/README.md`](../templates/README.md):

| Template            | Size        | Use case                               |
| ------------------- | ----------- | -------------------------------------- |
| `og-image`          | 1200 × 630  | Article share card                     |
| `social-card`       | 1080 × 1080 | Square share — Threads / IG / Mastodon |
| `newsletter-header` | 600 × 200   | Email newsletter banner                |

Plus the renderer:

- `scripts/render-template.mjs` — Node + Playwright Chromium
- `pnpm template:render <name>` shorthand

## Render one

```bash
# Default: uses templates/<name>/data.example.json,
# writes to templates/.example-output/<name>.png
pnpm template:render og-image

# Custom data + output path
pnpm template:render og-image \
  --data /tmp/my-article.json \
  --out /tmp/my-og.png

# 2x retina
pnpm template:render og-image --scale 2
```

## Render many (e.g. all live articles)

```bash
# Pseudo: pull article data from the matters.town API into JSON files,
# loop the renderer
for f in /tmp/articles/*.json; do
  out="/tmp/og/$(basename "$f" .json).png"
  pnpm template:render og-image --data "$f" --out "$out"
done
```

The Playwright browser is launched/closed per-call. For very high
volume, refactor `render-template.mjs` to accept a list and reuse the
browser context — Phase 7+ optimisation, deferred.

## Adding a new template

```bash
mkdir templates/my-template
cd templates/my-template

cat > template.html <<'EOF'
<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="ds-template-size" content="800x400" />
    <link rel="stylesheet" href="../shared/tokens.css" />
    <link rel="stylesheet" href="../shared/template-base.css" />
    <style>
      .tpl-canvas {
        width: 800px; height: 400px;
        /* …your styles, using --color-* / --space-* tokens… */
      }
    </style>
  </head>
  <body>
    <div class="tpl-canvas">
      <h1>{{title}}</h1>
    </div>
  </body>
</html>
EOF

cat > data.example.json <<'EOF'
{ "title": "範例" }
EOF

cat > README.md <<'EOF'
# my-template

(Describe the template, input schema, design notes.)
EOF
```

Then `pnpm template:render my-template` — the script auto-discovers
templates by directory.

### Conventions

- `<meta name="ds-template-size" content="WxH">` is **required** —
  the renderer reads it for viewport size
- `.tpl-canvas` is the screenshotted element — wrap your design in it
- Use `--color-*` / `--space-*` / `--shadow-*` tokens — never hard-code
- Use Noto Sans TC + Noto Serif TC via Google Fonts — they render
  consistently across machines (PingFang TC is Apple-only)
- Keep templates self-contained: no JS, no external assets except the
  shared CSS + Google Fonts + image URLs that come from data

## When the data is dynamic

For matters.town to auto-generate OG images at write time:

1. Backend collects the article's data (title, summary, author, etc.)
2. POSTs to a small render service that runs `render-template.mjs`
3. Service uploads the PNG to S3 / R2 / IPFS and returns the URL
4. Backend stores the URL in the article's `og:image` field

This service doesn't exist yet. When it does, the same templates here
become its input — no parallel implementation needed.

For seasonal campaigns (七日書, 徵文), the manual `pnpm template:render`
loop is enough; ops generates the assets and uploads them.

## Operational workflow

1. **Designer changes a token** (e.g. brand purple shade) → updates
   `packages/tokens/tokens.json` → `pnpm build:tokens` → ALL templates
   automatically reflect the change next render
2. **Designer changes a template** (e.g. tweak OG image layout) →
   edits `template.html` → renders, reviews, commits
3. **Ops needs a custom render** → writes a JSON file with article
   data → `pnpm template:render og-image --data my.json --out my.png`
   → uploads
4. **Engineer adds a new template** → see "Adding a new template" above

No Figma round-trip required for any of these.

## Limits

- Output is PNG only (Playwright limit). For SVG output, see Phase 7+
- Templates render to a fixed viewport — responsive within that viewport
  is fine, but no separate "mobile vs. desktop" layouts
- Web fonts must be available via URL (Google Fonts works); embedded
  custom fonts would need to be data-URL'd into the CSS
- Performance: ~1s per render on M1 Mac, ~2s in CI. Fine for 10s of images;
  for 1000s, switch to a long-running render service
