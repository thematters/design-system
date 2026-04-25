---
"@matters/design-system-tokens": minor
"@matters/design-system-react": minor
---

Initial public release.

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
