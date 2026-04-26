# Activity Landing Starter

Astro static-site starter for Matters-branded **activity / event landing pages** —
seven-day writing challenges, season campaigns, special editions, etc.

Generalised from the
[七日書 2026 春 spec](../../../docs/handoff-specs/seven-day-book-landing.md)
and the live preview at
<https://mashbean.github.io/seven-day-book-landing-preview/>.

## What you edit

Just **`src/content/page.ts`** — title, copy, hero image, CTAs, day prompts,
entries, FAQ. No `.astro` / no JSX changes required.

The shape is fully typed (see the `ActivityLandingContent` interface at the top
of the file), so your editor will autocomplete fields and yell at you if you
forget one.

## Sections shipped

1. **Hero** — eyebrow + title + subtitle + 2 CTAs + participant wall
2. **Day Prompts row** _(optional — delete `dayPrompts` from `page.ts` to hide)_
3. **Entries grid** — 4–6 cards, with optional "see more" link
4. **Rules / FAQ accordion** _(optional — delete `faq` to hide)_
5. **Closing CTA** — repeats the primary CTA on a tinted board
6. **Footer** — small print + optional link list

## Local dev

```bash
pnpm install
pnpm dev          # → http://localhost:4321
pnpm build        # → dist/  (static HTML, deploy anywhere)
pnpm typecheck    # astro check
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
  apps/page-templates/activity-landing/src/styles/vendor/tokens.css
cp packages/tokens/dist/freewrite.css \
  apps/page-templates/activity-landing/src/styles/vendor/freewrite.css
```

## Deploy

The `dist/` folder is a plain static bundle. Deploy options:

- **Cloudflare Pages**: connect repo → build cmd `pnpm build` → output
  `dist/`. Or one-shot: `pnpm dlx wrangler pages deploy dist`.
- **GitHub Pages**: `BASE_PATH=user/repo SITE_URL=https://user.github.io
pnpm build && gh-pages -d dist` (or use the official Pages action).
- **Netlify / Vercel**: zero-config; auto-detect Astro.

To deploy under a non-root path (e.g. `https://example.com/event-landing/`),
set `BASE_PATH=event-landing` before `pnpm build`.

## Use as a standalone starter

This package is part of the `thematters/design-system` monorepo, but it's
designed to be `cp -r`'d out as a self-contained project:

```bash
cp -r apps/page-templates/activity-landing my-spring-event
cd my-spring-event
pnpm install      # tokens are already vendored, no workspace needed
pnpm dev
```
