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

The CLI launches/closes Playwright per call (~1s overhead each).
For high volume, hit the long-running [render service](../services/render)
instead — it keeps one Chromium hot and spins up a fresh Context
per request.

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
2. POSTs to the render service in [`services/render/`](../services/render)
3. Service returns PNG bytes; backend uploads to S3 / R2 / IPFS and
   stores the resulting URL on the article's `og:image` field

The service is a Phase 7 skeleton — works end-to-end for one template
at a time, but auth, rate limits, and the S3 upload step are deferred
to Phase 8+ (see its [README](../services/render/README.md)).

```
POST /render/og-image
Content-Type: application/json
Body: { ...same shape as templates/og-image/data.example.json,
        scale?: 1 | 2 }
→ 200 OK, image/png
```

The service imports the same `render.mjs` library that
`pnpm template:render` uses, so there is exactly one renderer
implementation — templates render identically from the CLI and the API.

### Deploy

```bash
# build context = monorepo root
docker build -f services/render/Dockerfile -t matters-render .
docker run --rm -p 3000:3000 matters-render

# probe
curl http://localhost:3000/healthz                       # → ok
curl -X POST http://localhost:3000/render/og-image \
  -H "Content-Type: application/json" \
  -d @templates/og-image/data.example.json \
  -o /tmp/og.png
```

Env vars: `PORT` (default `3000`), `CORS_ORIGIN` (optional — when set,
the service replies with `Access-Control-Allow-Origin: <value>`).

For seasonal campaigns (七日書, 徵文), the manual `pnpm template:render`
loop is still the right tool; ops generates the assets and uploads
them by hand.

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
