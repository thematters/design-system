# Architecture (Phase 1+)

How the Matters Design System repo is organised, why it has three layers,
and how they relate.

## TL;DR

```
design-system/
├── components/         ← layer 1: design specs (Figma source-of-truth refs)
├── packages/tokens/    ← layer 2a: canonical tokens (CSS / TS / Tailwind)
├── packages/react/     ← layer 2b: React component library
├── apps/storybook/     ← docs site for layer 2
├── tokens/             ← legacy mirror of packages/tokens/dist (back-compat)
└── docs/, scripts/, templates/
```

## The three layers

### Layer 1 — design specs (`components/<group>/<name>/`)

Markdown specs (`spec.md`) + Figma screenshots (`figma-preview.png`) +
optional vanilla HTML/CSS reference (`impl.html`, `impl.css`).

These are the **design source-of-truth references**. Every implemented
React component must point back to one of these specs. When the spec is
incomplete (most are, as of Phase 1), the implementer fills in the
missing sections via Figma access + reviewer feedback.

Vendored-copy consumers (e.g. landing pages without a build pipeline)
consume directly from this layer. They cp `impl.css` into their repo.

### Layer 2a — tokens (`packages/tokens/`)

The canonical design tokens — colors, typography, spacing, shadows.
Generated from `tokens.json` by `build.mjs`. Outputs:

- `dist/tokens.css` — CSS custom properties + `.ds-text-*` utility classes
- `dist/tokens.ts` — TypeScript export + flat `colorByPath` map
- `dist/tailwind.preset.cjs` — Tailwind preset

**Dual-write**: the build script also mirrors output to `tokens/dist/` so
existing vendored-copy consumers keep working without changes.

Brand color decision (2026-04-24): `--color-brand-new-purple` is the
canonical brand reference. Legacy green/gold tokens are retained for
gradual migration only and must not be referenced by new code.

### Layer 2b — React components (`packages/react/`)

Production-grade React implementation of the components in layer 1, using
CSS Modules + the tokens from layer 2a. Each component must include:

- `<Name>.tsx` — implementation (forwardRef, full props API)
- `<Name>.module.css` — scoped styles, only references CSS vars from tokens
- `<Name>.test.tsx` — render + interaction + axe a11y
- `<Name>.stories.tsx` — Storybook coverage of every variant + state
- `index.ts` — barrel

Phase 1 ships **Button** only. Phase 2 adds TextField, Dialog, Toast.

## Distribution channels (parallel)

| Channel                     | Best for                                     | How                                                                            |
| --------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ |
| **Vendored copy**           | Static landing pages, no JS framework        | `cp -r tokens/dist consumer/assets/`; copy `components/<name>/impl.{css,html}` |
| **npm package**             | React apps, design-system-aware consumers    | `pnpm add @matters/design-system-react`; import `<Button>`                     |
| **Copy-and-own (Phase 2+)** | Forks, marketing sites that want full source | `pnpm dlx @matters/design-system-cli add Button`                               |

The three channels share the same source of truth. There is **no** "vendored
version drifts from npm version" problem — the build script writes to both
locations, and the React package compiles directly from the spec-aligned
source in `packages/react/src/`.

## Why a monorepo?

Pre-Phase-1, the repo was a flat tree with `tokens/`, `components/`, `docs/`
at root. We grew out of it because:

- `packages/react/` needs its own `package.json`, tsconfig, build, tests.
  Co-locating its dependencies at root would balloon the design-handoff
  surface area unnecessarily.
- Storybook needs its own runtime stack (Vite + Storybook 8). Isolating it
  in `apps/storybook/` keeps the design-handoff layers (`components/`,
  `tokens/`, `docs/`) free of `node_modules`.
- A future `apps/playground/` or second-package addition (e.g. a Vue port,
  or `@matters/design-system-icons`) drops in cleanly under `packages/` or
  `apps/` without restructuring.

We use **pnpm workspaces** because the alternative (npm workspaces, Yarn
PnP, or a Turborepo wrapper) would add either a dependency or a lockfile
churn problem. pnpm is conservative and well-supported on Node 20+.

## Phase plan

| Phase                 | Scope                                                              | Deliverable                                                                                                                                                                                                                                                                    |
| --------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Phase 1** (this PR) | Monorepo skeleton + `Button`                                       | Workspaces, tokens migration, Button impl/tests/stories, CI, docs                                                                                                                                                                                                              |
| **Phase 2**           | TextField + Dialog + Toast; complete spec a11y/responsive sections | 3 more production components + spec backfill                                                                                                                                                                                                                                   |
| **Phase 3** ✅        | Storybook deploy; tokens docs site; freewrite tokens isolation     | Public docs at `https://thematters.github.io/design-system/`; tokens reference pages (Colors/Typography/Spacing/Shadows/Brand/Freewrite); freewrite tokens shipped as opt-in `freewrite.css`                                                                                   |
| **Phase 4** ✅        | ArticleCard + Avatar + Banner; Figma Code Connect mappings         | 3 compound components (97/97 tests). `<Name>.figma.tsx` mapping files for Button + Avatar + Banner + ArticleCard. Manual-trigger publish workflow at `.github/workflows/figma-code-connect.yml`. See [`docs/code-connect.md`](./code-connect.md)                               |
| **Phase 5** ✅        | Versioning + npm publish; visual regression                        | Changesets workflow ([`docs/releasing.md`](./releasing.md)); release CI auto-publishes `@matters/design-system-{tokens,react}@0.x` on merging the version PR; Playwright visual regression with Linux-pinned snapshots ([`docs/visual-regression.md`](./visual-regression.md)) |
| **Phase 6+**          | Operational templates (`templates/`)                               | OG-image / newsletter generators                                                                                                                                                                                                                                               |

## Where things live (cheat sheet)

- 改 token 數值 → `packages/tokens/tokens.json` → `pnpm build:tokens`
- 加新元件 → `packages/react/src/components/<Name>/` + `components/<group>/<name>/spec.md`
- 改 Storybook → `apps/storybook/.storybook/` 或元件 `*.stories.tsx`
- 改 CI → `.github/workflows/ci.yml`
- 看「為什麼是 monorepo」決策 → 這份文件，上面那段
