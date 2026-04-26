# Matters Page Templates (Phase 8b)

Reusable Astro static-site starters for spinning up Matters-branded marketing
pages **without writing JSX**. Edit one typed config file (`src/content/page.ts`),
re-run the dev server, ship.

## Available starters

| Starter                                   | Use case                                          | Sections                                                         |
| ----------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| [`activity-landing/`](./activity-landing) | Activity / event landing (七日書, 馬拉松, 季活動) | hero · participant wall · day prompts · entries grid · FAQ · CTA |
| [`coming-soon/`](./coming-soon)           | Single-screen waitlist / launch teaser            | brand · headline · countdown · email form · footer               |
| [`about-page/`](./about-page)             | Institutional about page (mission / history)      | hero · pillars · timeline · team · partners · footer             |

## Quick start

From the design-system monorepo:

```bash
pnpm install
pnpm --filter @matters/page-template-activity-landing dev   # → :4321
```

Or copy a starter out as a standalone project:

```bash
cp -r apps/page-templates/activity-landing my-event-landing
cd my-event-landing
# edit src/content/page.ts (title, copy, hero image, CTAs…)
pnpm install
pnpm dev          # → http://localhost:4321
pnpm build        # → dist/
```

Tokens are **vendored** into each starter at `src/styles/vendor/tokens.css`,
so the copied project works without any workspace dependency. Re-vendor when
the token package updates:

```bash
cp packages/tokens/dist/tokens.css \
  apps/page-templates/<starter>/src/styles/vendor/tokens.css
```

## Design constraints

- **Astro 4.x** (pinned in each `package.json`).
- **No React.** These are pure HTML/CSS via Astro components — the React DS
  package is for product surfaces, not static pages.
- All colours / spacing / typography flow through `--color-*` / `--space-*` /
  `.ds-text-*` from the design-system tokens. No hard-coded brand values.
- Brand canonical: purple `#7258FF` + lime `#C3F432`. Switch to the freewrite
  palette by importing `src/styles/vendor/freewrite.css` (already vendored in
  `activity-landing/`).
- Dark-mode aware via `prefers-color-scheme: dark` (no toggle in 8b — that's
  Phase 8c).
- Mobile responsive (≤ 480px stacked CTAs, single column).
- a11y: semantic landmarks, single `<h1>`, `lang="zh-Hant"`, alt text on all
  images.

## Deploy options

`pnpm build` produces a plain `dist/` — deploy anywhere static:

- **Cloudflare Pages** — `pnpm dlx wrangler pages deploy dist`
- **GitHub Pages** — set `BASE_PATH=user/repo SITE_URL=https://user.github.io`
  before `pnpm build`, then publish `dist/` (e.g. with `gh-pages -d dist` or
  the official GH Pages action)
- **Netlify / Vercel** — zero-config; both auto-detect Astro
- **Any S3 / object store** — upload `dist/` recursively

To deploy under a subpath (e.g. `https://example.com/event/`), set
`BASE_PATH=event` before `pnpm build`. The starter's `astro.config.mjs`
respects both `SITE_URL` and `BASE_PATH` env vars.

## Performance budget

Each starter targets **< 100 KB JS at runtime**. Astro's zero-JS-by-default
makes this easy: only `coming-soon/` ships JS (countdown timer + waitlist
form, both vanilla, both inline).

## Related

- **Phase 6** ([`templates/`](../../templates)) — operational image templates
  (OG / social / newsletter)
- **Phase 8a** ([`apps/slide-theme/`](../slide-theme)) — Slidev theme

These page templates (Phase 8b) sit in the same family as 8a: both let
non-designers ship visually-aligned artefacts by editing markdown / typed
config rather than touching components.
