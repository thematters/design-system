# @matters/design-system-react

## 0.2.1

### Patch Changes

- b46040a: `ArticleCard`: fix cover image overhang when the title fits in a single
  line. The text column now has `min-height` matching the cover size
  (76px small / 106px big) with vertically centered content, so the cover
  no longer orphans below the text on wider viewports.
- ad21b9f: Add Figma Code Connect mappings for `TextField`, `Dialog`, and `Toast` (via
  `ToastProvider`). Dev-time metadata only — package bundle and tokens are
  unchanged. Designers will see live React snippets in Figma Dev Mode for
  these components after the next manual `figma:connect:publish` run.

## 0.2.0

### Minor Changes

- 784d209: Initial public release.

  `@matters/design-system-tokens@0.1.0`
  - Canonical tokens (color / typography / spacing / effects) generated from Figma Design System 1.5
  - Triple output: CSS custom properties, TypeScript export, Tailwind preset
  - Brand canonical: `--color-brand-new-purple` (#7258FF) + `--color-brand-new-green` (#C3F432)
  - Freewrite tokens isolated to opt-in `freewrite.css` (Phase 3)
  - Dual-write to both `packages/tokens/dist/` and legacy `tokens/dist/` for vendored-copy back-compat

  `@matters/design-system-react@0.1.0`
  - 7 components: `Button`, `TextField`, `Dialog`, `Toast`, `Avatar`, `Banner`, `ArticleCard`
  - Self-contained: zero runtime deps beyond `clsx`; Dialog brings its own focus trap; Toast brings its own queue
  - React 18+ peer dep (forward-compatible with 19)
  - CSS Modules for per-component scoping; tokens via CSS variables
  - Full a11y: 11 axe assertions across 97 tests
  - Figma Code Connect mappings for 4 components (Button, Avatar, Banner, ArticleCard)

### Patch Changes

- Updated dependencies [784d209]
  - @matters/design-system-tokens@0.2.0
