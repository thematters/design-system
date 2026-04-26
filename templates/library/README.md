# Template asset library

Pre-approved background images and brand assets that **ops can use directly**
in template renders without going to Figma.

These come from the existing Matters image library (the "如何設計自己的活動頁？"
designer handoff doc) and are licensed for re-use across activity pages,
covers, posters and the templates in this repo.

## What's here

```
library/
├── covers/        ← 688×160 banner-format backgrounds (6 designs)
├── posters/       ← 1200×1200 square backgrounds (6 designs, paired with covers)
└── examples/      ← Full-size finished examples (Cover.png, Poster.png)
```

The 6 covers and 6 posters are paired by index — `cover-3.jpg` is the
banner-format version of `poster-3.jpg`. Pick one design family,
use the cover for narrow surfaces, the poster for square ones.

## Use as a template background

Each template that takes an `imageSrc` / `coverImageUrl` / `backgroundUrl` field
in its data envelope can point at any file under `library/` via a relative
path or absolute URL.

### Example: og-image with library cover

```bash
cat > /tmp/og-event.json <<'JSON'
{
  "tag": "活動",
  "topic": "七日書 2026 春",
  "title": "七日書 2026 春季：寫給未來自己的七封信",
  "summary": "從 4/30 到 5/6，每天一個提示，七天一本書。已有 1,284 位作者報名同行。",
  "authorName": "Matters",
  "authorHandle": "matters",
  "authorAvatarUrl": "../library/posters/poster-3.jpg"
}
JSON

pnpm template:render og-image --data /tmp/og-event.json --out /tmp/og.png
open /tmp/og.png
```

(The og-image template doesn't currently have a full-bleed background slot —
it uses the avatar field. To add a real background slot, see "Adding a
background slot" below.)

### Example: social-card with library poster

The social-card template's dark background is currently a CSS gradient.
To swap it for a library poster:

1. Add `backgroundImage` to `templates/social-card/data.example.json`
2. In `templates/social-card/template.html`, add inside `.tpl-canvas`:
   ```html
   <img class="bg" src="{{backgroundImage}}" alt="" />
   ```
3. CSS:
   ```css
   .bg {
     position: absolute;
     inset: 0;
     width: 100%;
     height: 100%;
     object-fit: cover;
     z-index: -2;
     opacity: 0.5;
   }
   ```
4. Render with `"backgroundImage": "../library/posters/poster-2.jpg"`

This is intentionally NOT pre-built — different campaigns want different
treatments (full-bleed, dimmed, blurred, etc.). Templates stay simple;
ops/designer fork the template per campaign.

## Adding more assets to the library

1. Drop the file under `covers/` or `posters/` (or a new subdirectory)
2. ASCII filenames only (`cover-7.jpg`, not `活動頁封面圖_7.jpg`) — easier
   in URLs and avoids encoding issues
3. Common sizes:
   - covers: 688×160 (legacy) or 1200×630 (OG-aligned)
   - posters: 1200×1200
   - icons: SVG, viewBox-defined
4. Keep individual files under 300 KB. For larger, host externally and
   reference by URL

## License / attribution

These assets come from the canonical Matters image library (see
`私人和共用/如何設計自己的活動頁？` in the design handoff). Approved for use
in:

- Activity pages on matters.town
- Promotional images generated via this design system
- Template previews / examples in this repo

For external use (sponsorship decks, third-party campaigns), check with
the design / brand team first.

## Source

Original handoff zip: `如何設計自己的活動頁？` (Notion export from
designer's handoff). The Notion doc ID is captured in the file name of
the original HTML export.
