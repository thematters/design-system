# tokens/ — backward-compat surface

> **Source moved.** As of Phase 1 (monorepo migration), the canonical token
> source lives at [`packages/tokens/`](../packages/tokens/).

This directory is **kept for backward compatibility** with vendored-copy
consumers (landing pages, lifeboat, fediverse-gateway). The build still
emits artifacts here so those consumers keep working unchanged:

- `tokens/dist/tokens.css` — CSS custom properties + typography utilities
- `tokens/dist/tokens.ts` — TypeScript export
- `tokens/dist/tailwind.preset.cjs` — Tailwind preset

## What changed

- `tokens/tokens.json` → moved to `packages/tokens/tokens.json`
- `tokens/build.mjs` → now a thin forwarder; real script at `packages/tokens/build.mjs`
- `tokens/dist/*` → still committed, still vendored, still consumed by
  vendored-copy users. Now also mirrored to `packages/tokens/dist/` for
  npm-package consumers.

## Building

Either entry point works:

```bash
node packages/tokens/build.mjs    # preferred
node tokens/build.mjs             # legacy, still works
pnpm build:tokens                 # via monorepo script
```

Both produce identical output and write to **both** `tokens/dist/` and
`packages/tokens/dist/`.

## Consumption

- **Vendored copy** (current production path): copy `tokens/dist/tokens.css`
  into your repo, no install. See [`docs/consume.md`](../docs/consume.md).
- **npm package** (Phase 1+ option): `pnpm add @matters/design-system-tokens`,
  import via `@matters/design-system-tokens/tokens.css`.

## Source of truth

- Figma Design System 1.5 — `JDKpHezhllOvJF42xbKcNN`
- Matters 2.0 Colors — `wzoAKeR1Aa5PFx7zXdyLIT`
