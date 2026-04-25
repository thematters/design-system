# Component: Avatar

## Overview

Circular profile image. Two roles: identify a user across the product surface, and signal community status (Matters Architect, Civic Liker, both) via decorative rings around the image. An optional bottom-right badge slot supports overlay states (logbook owner, online indicator, mention bell, etc.).

The Figma source is fixed at 72px; the React port adds smaller sizes (xs / sm / md) for use in dense surfaces (article cards, comment threads, mentions).

## Source

- **Figma file**: Design System 1.5 (`JDKpHezhllOvJF42xbKcNN`)
- **Page**: Others
- **Type**: COMPONENT_SET
- **Node id**: `3278:8803`
- **Key**: `aaba7a4faf6a117d9640f4464c01d897ff1ece87`
- **Open in Figma**: https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=3278-8803

## Variants

| Property | Default    | Options                                                                   |
| -------- | ---------- | ------------------------------------------------------------------------- |
| Style    | `Standard` | `Matters Architect`, `Civic Liker`, `Civic Liker & Architect`, `Standard` |
| Size     | `72`       | `72`                                                                      |
| Logbook  | `Off`      | `Off`, `On`                                                               |

### Variant nodes

- `Style=Standard, Size=72, Logbook=Off` — node `3278:8804`
- `Style=Matters Architect, Size=72, Logbook=Off` — node `3278:8806`
- `Style=Civic Liker, Size=72, Logbook=Off` — node `3278:8811`
- `Style=Civic Liker & Architect, Size=72, Logbook=Off` — node `3278:8816`
- `Style=Standard, Size=72, Logbook=On` — node `4803:1668`
- `Style=Matters Architect, Size=72, Logbook=On` — node `3278:8826`
- `Style=Civic Liker, Size=72, Logbook=On` — node `3278:8832`
- `Style=Civic Liker & Architect, Size=72, Logbook=On` — node `3278:8838`

## Design Tokens Used

| Element                   | Token / value                                                     |
| ------------------------- | ----------------------------------------------------------------- |
| Image background fallback | `--color-grey-grey-lighter`                                       |
| Initials fallback bg      | `--color-primary-100`                                             |
| Initials fallback text    | `--color-brand-new-purple`                                        |
| Architect ring            | `--color-brand-new-green` (canonical lime)                        |
| Civic Liker ring          | `--color-brand-new-purple`                                        |
| Both rings                | inner `--color-brand-new-purple`, outer `--color-brand-new-green` |
| Badge background          | `--color-grey-white` (with white halo border)                     |

## States and Interactions

| State             | Visual                                                                                |
| ----------------- | ------------------------------------------------------------------------------------- |
| Image loaded      | The provided `src` is shown                                                           |
| Image loading     | Falls back to the grey background; image fades in                                     |
| Image error / 404 | Falls back to initials (CJK: last 2 chars; latin: first letters of first + last name) |
| No `src` provided | Initials immediately                                                                  |
| Custom `initials` | Pass-through, never overridden                                                        |

## Responsive Behavior

Avatar is a static element — its size is set explicitly via the `size` prop:

- `xs` 20px — comment threads, mention chips, tight feed rows
- `sm` 32px — list rows, search results
- `md` 48px (default) — profile sidebars, settings pages
- `lg` 72px — profile headers (matches Figma source)

Container does not flex — wrap in your own layout if you need fluid sizing.

## Edge Cases

- **No `src`**: shows the initials fallback. Pair with `initials="??"` if the user is anonymous and you want a literal placeholder.
- **Image fails to load (404 / network error)**: `onError` flips state and renders the initials fallback. Tested via `fireEvent.error`.
- **Very long names**: only the initials show, never the full name. The accessible name (`alt`) is unchanged.
- **`ring` + `badge` together**: ring sits _outside_ the avatar circle (negative-inset border), badge sits _inside_ the bottom-right corner. They don't overlap.
- **Two rings (`both`)**: outer green + inner purple. Don't add custom borders on top via `className` — they'll fight each other.

## Accessibility Notes

- `alt` is required — for SR users, `alt` carries the user's name (e.g. "豆泥的頭像" or just "豆泥").
- When fallback initials are shown, the wrapper `<span>` gets `role="img"` + `aria-label={alt}` so SR announces the user identity, not the initials.
- The optional `badge` is `aria-hidden="true"` because it's decorative — describe the badge state in surrounding text (e.g. "已上線" near a green dot).
- Decorative rings (`architect` / `civicLiker` / `both`) carry no semantic meaning to SR — surface community status separately if it's meaningful in the context.
- Image has lazy fallback on error; no broken-image icon.

## Implementation

- **React**: [`packages/react/src/components/Avatar/`](../../../packages/react/src/components/Avatar/)
- **Code Connect**: [`Avatar.figma.tsx`](../../../packages/react/src/components/Avatar/Avatar.figma.tsx) — Figma `Style` variant maps to `ring` prop, `logbook` boolean maps to `badge` slot.
- Public API: `Avatar` from `@matters/design-system-react`.

## Dual-track Judgment

- 結構軌（atomic component）

## Preview

![figma preview](./figma-preview.png)
