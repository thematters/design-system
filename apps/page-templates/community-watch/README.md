# Community Watch Page Prototype

Astro static-site prototype for the Matters **馬特市守望相助隊** public
transparency page at `community-watch.matters.town`.

## What you edit

Start with **`src/content/page.ts`** for copy, metrics, sample moderation
records, appeal text, and future bot-planning notes. The current page is a
mocked public page, not wired to live API data yet.

The shape is fully typed (see the `CommunityWatchContent` interface at the top
of the file), so editors can autocomplete fields and catch missing records.

## Sections shipped

1. **Hero** — domain, title, slogan, two CTAs, and Billboard reminder
2. **Metrics** — mocked counts for色情廣告, 濫發廣告, 覆核, and申訴
3. **Action log** — public handling records with blurred original comments
4. **Appeal panel** — clear email-based remedy path
5. **Training plan** — how cases can later feed spam-detection tooling
6. **Footer** — operational links

## Local dev

```bash
pnpm install
pnpm dev
pnpm build
pnpm typecheck
```

## Customising the brand mark

Brand SVGs live in `public/`. Swap to `matters-mark-white.svg` for dark
backgrounds, or replace with your own activity-specific mark.

## Tokens

CSS variables (`--color-*`, `--space-*`, `.ds-text-*`) are vendored into
`src/styles/vendor/tokens.css` from
[`@matters/design-system-tokens`](../../../packages/tokens). Re-vendor when
upgrading:

```bash
# from the design-system monorepo root
cp packages/tokens/dist/tokens.css \
  apps/page-templates/community-watch/src/styles/vendor/tokens.css
```

## Deploy

The `dist/` folder is a plain static bundle. Deploy options:

- **Cloudflare Pages**: connect repo → build cmd `pnpm build` → output
  `dist/`. Or one-shot: `pnpm dlx wrangler pages deploy dist`.
- **GitHub Pages**: `BASE_PATH=user/repo SITE_URL=https://user.github.io
pnpm build && gh-pages -d dist` (or use the official Pages action).
- **Netlify / Vercel**: zero-config; auto-detect Astro.

For production, point `community-watch.matters.town` at the generated static
bundle, or serve the same UI from the Matters web app once live API integration
is ready.

## Use as a standalone starter

This package is part of the `thematters/design-system` monorepo, but it's
designed to be `cp -r`'d out as a self-contained project:

```bash
cp -r apps/page-templates/community-watch my-community-watch
cd my-community-watch
pnpm install      # tokens are already vendored, no workspace needed
pnpm dev
```
