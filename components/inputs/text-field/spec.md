# Component: Text field

## Overview

DS 1.5 standard input field. Vertical stack of `[label row, field box, helper row]`. The field box has a 1px border, 8px radius, 12px padding, 16px gap; it can host left/right icon slots and the actual input. Below the field, helper or error text appears in a fixed-height row so layout doesn't shift between states.

The Figma source includes optional left/right "link" decorators inside the field — useful for prefix/suffix labels (e.g. `https://`, `.matters.town`). For Phase 2 the React port keeps these as `leftIcon` / `rightIcon` slots.

## Source

- **Figma file**: Design System 1.5 (`JDKpHezhllOvJF42xbKcNN`)
- **Page**: Inputs
- **Type**: COMPONENT
- **Node id**: `3307:19338`
- **Key**: `c7be5a4c7cebcf8adb7d567377bd3b4c694dfbc3`
- **Open in Figma**: https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=3307-19338

## Design Tokens Used

### Linked Figma styles → canonical tokens

| Figma style                     | Token / variable                                                | Used for                                       |
| ------------------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| Grey Scale/Black (`FILL`)       | `--color-grey-black`                                            | label, input value                             |
| System/Body 2/Regular (`TEXT`)  | 14px / lh 22 / PingFang TC 400                                  | label, input                                   |
| Logo/Matters Green (`FILL`)     | **remap → `--color-brand-new-purple`** (PM 2026-04-24 decision) | focus ring, label-side link                    |
| Grey Scale/Grey Light (`FILL`)  | `--color-grey-grey-light`                                       | default border `#DDD`                          |
| Grey Scale/Grey Darker (`FILL`) | `--color-grey-grey-darker`                                      | icon glyphs                                    |
| Grey Scale/Grey (`FILL`)        | `--color-grey-grey`                                             | placeholder + helper text default `#B3B3B3`    |
| System/Small/Regular (`TEXT`)   | 12px / lh 18 / PingFang TC 400                                  | helper text, error text                        |
| Function/Negative red           | `--color-function-negative`                                     | error border + error text + required `*` glyph |

### Fonts seen in tree

- PingFang TC / 400 / 14px / lh 22 — label, input value
- PingFang TC / 400 / 12px / lh 18 — helper / error

## States and Interactions

| State          | Visual                                                              | Notes                                                |
| -------------- | ------------------------------------------------------------------- | ---------------------------------------------------- |
| Default (idle) | Border `--color-grey-grey-light`, white background                  |                                                      |
| Focus          | Border `--color-brand-new-purple`, 3px halo `--color-primary-0`     | Implemented via `:focus-within` on the field wrapper |
| Hover          | No change in DS 1.5 (inherits idle)                                 | Cursor stays `text` over the input                   |
| Disabled       | Background `--color-grey-grey-lighter`, cursor `not-allowed`        | `disabled` on `<input>`; field gets `.disabled`      |
| Error          | Border `--color-function-negative`, helper row paints red           | Driven by `error` prop (string)                      |
| Error + Focus  | Same border red, halo recoloured to `--color-function-insufficient` | Avoids fighting the focus ring                       |
| Read-only      | Same as default; cursor `text`; do not drop focus ring              | Use `readOnly` HTML attr                             |

## Responsive Behavior

- Default width: `100%` of parent (Figma source is 280px but the React port stretches).
- Single-column layout on all breakpoints. No mobile-specific reflow.
- Touch target: field height ≈ 46–48px with default 12px padding + 22px line-height; meets WCAG 2.1 AA touch-target minimum (24px) on all sizes.

## Edge Cases

- **Long placeholder / value**: input is `flex:1 0 0` with `min-width: 0` — text truncates with native ellipsis when the user blurs (browser default).
- **Both leftIcon and rightIcon**: gap is 12px between slots; total width remains responsive.
- **Error message wraps**: helper row uses `min-height: 18px` so the layout below the field doesn't jump when error appears/disappears, but multi-line errors still grow correctly.
- **labelHidden**: visually hides the label but keeps it in the accessibility tree (sr-only).
- **showRequired**: shows a red `*` next to the label. Decorative — pair with the native `required` attribute for actual form validation; the `*` is `aria-hidden`.
- **labelAction**: optional inline button or link on the right of the label row (e.g. "忘記密碼？"). When `href` is given, renders `<a>`; otherwise renders `<button type="button">`.

## Accessibility Notes

- Label and input linked via `htmlFor`/`id`. ID is auto-generated via `useId()` if not provided.
- `aria-invalid="true"` set when `error` is truthy.
- `aria-describedby` automatically points to the error id when present, falling back to the helper id, then to any user-supplied describedBy.
- Error messages render with `role="alert"` so screen readers announce them on appearance.
- Required marker (`*`) is decorative (`aria-hidden="true"`); rely on native `required` for SR semantics.
- Focus ring has 3:1 contrast against white background (purple on white passes WCAG 2.1 AA).
- Disabled fields keep their label visible (no contrast violation) but lower contrast on input value (`--color-grey-grey-darker` on `--color-grey-grey-lighter`).

## Implementation

- **React**: [`packages/react/src/components/TextField/`](../../../packages/react/src/components/TextField/)
- Public API: `TextField` from `@matters/design-system-react`
- Props: `label`, `labelHidden`, `showRequired`, `labelAction`, `helperText`, `error`, `leftIcon`, `rightIcon`, `multiline`, plus all native `<input>` / `<textarea>` props.
- Vendored copy: not yet shipped at `components/inputs/text-field/impl.{html,css}`. For Phase 2 the React port is the canonical implementation; vendored HTML/CSS port can be added later if a non-React consumer needs it.

## Dual-track Judgment

- 結構軌（atomic component）
- High reuse: forms, search, profile editing, comments. Implementing first in Phase 2 unlocks Phase 3+ form patterns.

## Preview

![figma preview](./figma-preview.png)
