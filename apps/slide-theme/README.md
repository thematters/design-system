# @matters/slide-theme-slidev

A [Slidev](https://sli.dev) theme that renders Markdown decks in the **Matters
visual language**: Noto Sans / Noto Serif TC, the canonical
`--color-brand-new-purple` + `--color-brand-new-green` accents, generous
whitespace, and the official `matters-mark-color.svg` brand mark.

The theme targets non-designers (PM / editor / marketing) — write Markdown,
get a presentation that looks on-brand without any further configuration.

Phase 8a deliverable. See [`docs/architecture.md`](../../docs/architecture.md)
for the broader phase plan.

## Quick start

```bash
mkdir my-deck && cd my-deck
cat > slides.md <<'EOF'
---
theme: ../path/to/design-system/apps/slide-theme
---

# Hello, Matters
EOF

# Either of these works — no workspace install required.
pnpm dlx @slidev/cli@0.50 slides.md
# or
npx @slidev/cli@0.50 slides.md
```

The dev server opens at `http://localhost:3030`. Press `e` to edit a slide,
`Cmd+P` (or `slidev export slides.md`) for a PDF.

## Layouts

| Layout       | Use for                                        | Key frontmatter                          |
| ------------ | ---------------------------------------------- | ---------------------------------------- |
| `default`    | Standard 16:9 page; bullets, narrative, tables | `eyebrow`, `inverse`, `hideBrand`        |
| `cover`      | Title / chapter break, big serif title         | `eyebrow`, `subtitle`, `meta`, `inverse` |
| `two-column` | 50/50 split via `::left::` / `::right::`       | `eyebrow`, `title`                       |
| `full-image` | Full-bleed image + scrim + overlay text        | `image`, `eyebrow`, `subtitle`           |

### `default`

```markdown
---
layout: default
eyebrow: Mission
---

# 我們在做什麼

Matters 是一個**去中心化的公共寫作平台**……
```

### `cover`

```markdown
---
layout: cover
eyebrow: Product Pitch · 2026
subtitle: 一個讓寫作者保留所有權的去中心化公共寫作社群。
meta: 2026-04 · matters.town
---

認識 Matters
```

### `two-column`

```markdown
---
layout: two-column
eyebrow: Values
title: 我們珍視的三件事
---

::left::

## 所有權

文章的著作權與收益權都屬於作者本人。

::right::

## 公共性

匿名不等於沒有責任。
```

### `full-image`

```markdown
---
layout: full-image
image: /your-photo.jpg
eyebrow: 2026 Roadmap
subtitle: 把 Matters 接上整個聯邦宇宙。
---

Matters × Fediverse
```

## Design tokens

The theme imports `@matters/design-system-tokens/dist/tokens.css` directly,
so you get the same `--color-brand-new-purple` / `--color-grey-grey-darker`
etc. that the React component library uses. Override per-deck by setting CSS
variables in a `style.css` next to your `slides.md`.

## Dark mode

Slidev's built-in dark toggle (top-right of the dev UI) flips the palette
and swaps the brand mark to the white-filled variant. No per-deck setup
required.

## Print / PDF export

`slidev export slides.md --output deck.pdf` works out of the box. The theme
deliberately avoids `vh` / `vw` units so PDF rendering matches the on-screen
canvas (1280×720, 16:9).

## Examples

Three real decks in `examples/`:

- `product-pitch.md` — "What is Matters" 8 slides
- `activity-recap.md` — 七日書 2026 春啟動會 9 slides
- `quarterly-review.md` — 內部 Q1 回顧 with KPI table 7 slides

Run any of them locally:

```bash
cd apps/slide-theme
pnpm dlx @slidev/cli@0.50 examples/product-pitch.md
```

## What's NOT included

Deferred to Phase 8b / 9:

- Custom Vue components (Stat, Quote, Timeline) — use Markdown for now
- Animated transitions beyond Slidev defaults
- Auto-published HTML / PDF via CI
- Theme variants for Matters Lab vs. Matters.Town brand splits

## License

Apache-2.0, same as the parent monorepo. Published as `private: true` —
consumers reference it via filesystem path or git submodule, not via npm.
