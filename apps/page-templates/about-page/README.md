# About Page Starter

Astro static-site starter for **institutional about pages** — mission, history,
team, partners. Multi-section, scrollable.

## What you edit

Just **`src/content/page.ts`** — mission statement, "what we do" pillars,
timeline of milestones, team list, partners.

## Sections shipped

1. **Sticky header** — brand mark + section nav (auto-hides on mobile)
2. **Hero** — big serif mission statement
3. **3-column "what we believe" grid** (`#pillars`)
4. **Timeline** of year-by-year milestones (`#timeline`)
5. **Team grid** (avatar + name + role) (`#team`)
6. **Partners** (`#partners` — optional, delete to hide)
7. **Footer** with email + social links

## Local dev

```bash
pnpm install
pnpm dev          # → http://localhost:4321
pnpm build        # → dist/
pnpm typecheck
```

## Deploy

`dist/` is plain static HTML. See the
[activity-landing README](../activity-landing/README.md#deploy) for
Cloudflare Pages / GitHub Pages / Netlify recipes — they apply identically.

## Tokens

Tokens are vendored at `src/styles/vendor/tokens.css`. Re-vendor with:

```bash
cp packages/tokens/dist/tokens.css \
  apps/page-templates/about-page/src/styles/vendor/tokens.css
```
