# @matters/design-system-tokens

Canonical Matters Design System tokens — colors, typography, spacing,
radii, shadows. Generated from Figma Design System 1.5.

> **穩定性（請先讀）**：本套件處於 `0.x`，正隨 Matters 2.0 品牌遷移演進。
> token **名稱**是公開 API；遷移期間可能改名（屬預期內 breaking）。請只綁
> 語意層、並鎖定窄版本範圍（`~0.3.0`）。完整規則見
> [`docs/token-naming-contract.md`](../../docs/token-naming-contract.md)。

## Install

```bash
pnpm add @matters/design-system-tokens
# or, for vendored consumers, see ../../docs/consume.md
```

## Usage

### CSS custom properties

```css
@import "@matters/design-system-tokens/tokens.css";

.my-button {
  background: var(--color-brand-new-purple);
  color: var(--color-grey-white);
  padding: var(--space-sp8) var(--space-sp16);
}
```

### TypeScript

```ts
import { tokens, colorByPath } from "@matters/design-system-tokens";

console.log(colorByPath["color.brand.new.purple"]); // "#7258FF"
```

### Tailwind preset

```js
// tailwind.config.cjs
module.exports = {
  presets: [require("@matters/design-system-tokens/tailwind")],
  content: ["./src/**/*.{ts,tsx,html}"],
};
```

## What's inside

| Group                                   | Tokens                                                                                                                                           |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Brand colors (canonical)                | `--color-brand-new-purple` (#7258FF), `--color-brand-new-green` (#C3F432)                                                                        |
| Brand colors (legacy, migration period) | `--color-brand-legacy-green-*`, `--color-brand-legacy-gold-*`                                                                                    |
| Semantic scales                         | `primary`, `secondary`, `info`, `attention` (each 0–900); `grey` (named); state colors under `function.*` (positive / negative / warn / heart …) |
| Freewrite (七日書 only, **opt-in**)     | `--color-freewrite-*` — shipped in a separate `freewrite.css`. See note below.                                                                   |
| Typography                              | System scale (h1/h2/h3/body-1/body-2/small/label) + Article scale (title/summary/body)                                                           |
| Spacing                                 | `--space-sp2` … `--space-sp32` (8pt grid + 2-unit fine-grain)                                                                                    |
| Effects                                 | `--shadow-shadow-1` … `--shadow-shadow-4`                                                                                                        |

### Freewrite isolation (Phase 3)

The Freewrite landing page has its own palette (cool blue), distinct from the
canonical brand. To prevent product code from accidentally referencing it,
`--color-freewrite-*` tokens are **not** included in `tokens.css`. They ship
in a separate stylesheet that consumers must opt into:

```tsx
import "@matters/design-system-tokens/tokens.css"; // canonical
import "@matters/design-system-tokens/freewrite.css"; // ⚠ Freewrite only
```

If a non-Freewrite surface references `--color-freewrite-*`, the variable
will be undefined and CSS will fall back to its inherited value — that's
the intended failure mode.

For the full freewrite design database (15 Figma pages, 7 component specs,
6 design-principle docs) and proposed extensions to the 4-token palette,
see [`docs/freewrite-design-system/`](../../docs/freewrite-design-system/README.md)
and [`docs/freewrite-design-system/color-usage.md`](../../docs/freewrite-design-system/color-usage.md).

## Building

```bash
pnpm --filter @matters/design-system-tokens build
# or
node packages/tokens/build.mjs
```

Outputs to **both** `packages/tokens/dist/` (npm consumption) and
`tokens/dist/` (legacy vendored-copy back-compat).

## Source

Figma Design System 1.5 — `JDKpHezhllOvJF42xbKcNN`. Token decisions live in
[`docs/figma-tokens-diff.md`](../../docs/figma-tokens-diff.md) and PM notes.

Brand color decision (2026-04-24): `--color-brand-new-purple` is the canonical
brand reference. Legacy green/gold are retained for gradual migration only.
