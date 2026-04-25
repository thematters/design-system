# @matters/design-system-react

Matters Design System — React component library. **Phase 1: Button only.**

## Install

```bash
pnpm add @matters/design-system-react @matters/design-system-tokens
# peer deps
pnpm add react react-dom
```

## Usage

```tsx
import "@matters/design-system-tokens/tokens.css";
import "@matters/design-system-react/styles.css";
import { Button } from "@matters/design-system-react";

export function LoginForm() {
  return (
    <form>
      {/* … inputs … */}
      <Button type="submit">登入</Button>
      <Button variant="secondary">取消</Button>
    </form>
  );
}
```

The `tokens.css` import is **required** — Button styles reference CSS
custom properties (`--color-brand-new-purple`, `--space-sp16`, etc.) from
the tokens package. Import once at your app's root.

## Components

| Component     | Phase | Status |
| ------------- | ----- | ------ |
| `Button`      | 1     | ✅     |
| `TextField`   | 2     | ⏳     |
| `Dialog`      | 2     | ⏳     |
| `Toast`       | 2     | ⏳     |
| `ArticleCard` | 4     | ⏳     |
| `Avatar`      | 4     | ⏳     |
| `Banner`      | 4     | ⏳     |

See [`docs/architecture.md`](../../docs/architecture.md) for the full phase
plan.

## Button props

| Prop                            | Type                                         | Default     | Notes                                                               |
| ------------------------------- | -------------------------------------------- | ----------- | ------------------------------------------------------------------- |
| `variant`                       | `"primary"` \| `"secondary"` \| `"tertiary"` | `"primary"` | Visual variant                                                      |
| `size`                          | `"large"` \| `"medium"` \| `"small"`         | `"medium"`  | `large` meets WCAG 44px touch target                                |
| `iconOnly`                      | `boolean`                                    | `false`     | Requires `aria-label`                                               |
| `fullWidth`                     | `boolean`                                    | `false`     | Mobile/CTA contexts                                                 |
| `loading`                       | `boolean`                                    | `false`     | Replaces `leftIcon` with spinner; sets `aria-busy` and blocks click |
| `leftIcon`, `rightIcon`         | `ReactNode`                                  | —           | Sized to 1em via `currentColor`                                     |
| _all native_ `<button>` _attrs_ | —                                            | —           | `disabled`, `onClick`, `aria-*`, etc.                               |

`getButtonClassName()` is exported for the rare case where you need
button styling on `<a>` (routing) or `<label>` (file input). Prefer
`<Button>` whenever the element is actually a button.

## Source of truth

This package implements the spec at
[`components/buttons/normal/spec.md`](../../components/buttons/normal/spec.md).
Vanilla HTML/CSS reference at the same directory. If you change one, change
both — visual fidelity must match.

## Development

```bash
pnpm --filter @matters/design-system-react test
pnpm --filter @matters/design-system-react build
pnpm --filter @matters/design-system-react test:watch
```

Adding a new component: see
[`docs/architecture.md`](../../docs/architecture.md) §"Layer 2b".
