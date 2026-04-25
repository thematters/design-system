# Figma Code Connect

Code Connect is a Figma feature that links a Figma component to its production
React code. Designers see the live React snippet in Dev Mode; developers see
which Figma node a component implements. Two-way traceable.

We require **Figma Pro** (the `tech@matters.news Matters's team` is on Pro,
which works). Personal/Starter plans don't expose Code Connect.

## What's wired

| Component     | Mapping file                                                      | Figma node   |
| ------------- | ----------------------------------------------------------------- | ------------ |
| `Button`      | `packages/react/src/components/Button/Button.figma.tsx`           | `3371:23079` |
| `Avatar`      | `packages/react/src/components/Avatar/Avatar.figma.tsx`           | `3278:8803`  |
| `Banner`      | `packages/react/src/components/Banner/Banner.figma.tsx`           | `5251:1856`  |
| `ArticleCard` | `packages/react/src/components/ArticleCard/ArticleCard.figma.tsx` | `4853:994`   |

`TextField`, `Dialog`, `Toast` from Phase 2 are not yet mapped — adding them
is mechanical (copy the pattern). They'll be wired in a follow-up PR if
designers need them.

## Setup once: add `FIGMA_ACCESS_TOKEN` secret

1. Go to Figma → top-right avatar → Settings → Security → **Personal access tokens**
2. Generate a token with **Code Connect: write** scope
3. In GitHub: repo Settings → Secrets and variables → Actions → New repository secret
   - Name: `FIGMA_ACCESS_TOKEN`
   - Value: the token from step 2

## Validating locally

```bash
# Parse only — checks the .figma.tsx files compile, doesn't talk to Figma.
pnpm --filter @matters/design-system-react figma:connect:parse
```

## Publishing to Figma

```bash
# Push to Figma's servers — Designers see snippets in Dev Mode immediately.
FIGMA_ACCESS_TOKEN=fpat_xxx \
  pnpm --filter @matters/design-system-react figma:connect:publish
```

Or via GitHub Actions: **Actions → Publish Figma Code Connect → Run workflow**.
This is a manual-only workflow because publishing rewrites Figma server
state and we don't want every PR merge to thrash it.

## When to update mappings

- A component's Figma node id changes (e.g. component was rebuilt in Figma) → update the URL in the relevant `.figma.tsx`
- A component's React props change (rename, add, remove) → update the `props:` block + `example` callback to match
- A new component lands → add a `<Name>.figma.tsx` next to the implementation, run `figma:connect:parse` to verify, then publish

## How designers see it

In Figma Dev Mode, they pick a component instance, then see a code snippet under "Connected" — the snippet is exactly what `example: ({...}) => …` returns, with prop placeholders filled in based on Figma variant choices. Click "Open in code" if your editor has the Figma plugin to jump to the source file.

## Trade-offs

- Code Connect bound mappings are dev-time only — they don't appear in the published `@matters/design-system-react` bundle (`.figma.tsx` files are excluded from tsup + tsconfig).
- We use `@figma/code-connect` as a devDependency — about 800KB unpacked but never bundled.
- Publishing requires PAT with write scope; treat the secret as production-grade.
