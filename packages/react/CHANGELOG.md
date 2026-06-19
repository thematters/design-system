# @matters/design-system-react

## 0.3.0

### Minor Changes

- 06111ce: 對齊兩個 linked 套件版本，作為**首個公開（npm）發布**。

  此前 `tokens@0.2.0` 與 `react@0.2.2` 因早期分開 bump 而版本不一致，且從未真正
  發布到 npm（過去每次 Release CI 因 `NPM_TOKEN` 未設定而 clean-skip）。本次 minor
  bump 讓兩者對齊到同一版本，作為乾淨的 v1 起點。

  隨附：新增 [`docs/token-naming-contract.md`](../docs/token-naming-contract.md)
  （token 命名契約與 0.x 穩定性政策），並修正 `packages/tokens/README.md` 中
  語意色階的文件漂移（`success/warn/error` → 實際的 `attention` + `function.*`）。

  > 消費端注意：0.x 期間 token 名稱可能隨 2.0 品牌遷移改名，請鎖定窄版本範圍
  > （`~0.3.0`）。詳見命名契約。

### Patch Changes

- Updated dependencies [06111ce]
  - @matters/design-system-tokens@0.3.0

## 0.2.2

### Patch Changes

- 94675c3: `ArticleCard`: also fix the Small variant's cover-vs-text alignment
  (text wraps to 2 lines but cover stays 76px → cover hung at top with
  empty space below). Switched `.content` from `align-items: flex-start`
  to `align-items: center` so the cover vertically centers with the
  text whether text is taller or shorter than cover.

  Combined with the prior `min-height` fix on `.text`, both Big (text
  shorter than cover) and Small (text taller than cover) variants now
  render with the cover balanced relative to the text content.

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
