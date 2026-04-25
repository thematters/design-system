# Component: Toast

## Overview

DS 1.5 transient notification. A pill rendered at the bottom of the viewport, optionally with an inline action and a close button. Auto-dismisses after a timeout (default 5s); pauses on hover/focus to give the user time to read.

Four states map directly to function tokens; the **Normal** variant is the default Matters dark pill, the **Positive / Warn / Negative** variants paint with their respective semantic backgrounds.

## Source

- **Figma file**: Design System 1.5 (`JDKpHezhllOvJF42xbKcNN`)
- **Page**: Feedback
- **Type**: COMPONENT_SET
- **Node id**: `2341:14260`
- **Key**: `7f0f4068712a36d4e12679dfdd2909c6cf87faec`
- **Open in Figma**: https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=2341-14260

## Variants

The COMPONENT_SET has no exposed variant properties; structure is documented from the children:

| State    | Type      | action | Background                            | Node                       |
| -------- | --------- | ------ | ------------------------------------- | -------------------------- |
| Normal   | Lettering | on     | `--color-grey-black` `#333`           | `2235:13565`               |
| Normal   | Lettering | off    | `--color-grey-black`                  | `2341:14259`               |
| Positive | Lettering | on     | `--color-function-positive` `#5C9969` | `3445:3494`                |
| Positive | Lettering | off    | `--color-function-positive`           | `3445:3502`                |
| Warn     | Lettering | on     | `--color-function-warn` `#DBA34F`     | `3445:3474`                |
| Warn     | Lettering | off    | `--color-function-warn`               | `3445:3482`                |
| Negative | Lettering | on     | `--color-function-negative` `#C85C41` | `2341:14257`               |
| Negative | Lettering | off    | `--color-function-negative`           | `2341:14258`               |
| Normal   | Icon      | on     | various function colours              | `4525:1151/1207/1219/1231` |

The Icon variants in Figma show a generic chat-bubble + close X pair without text — useful for compact contexts. Phase 2 React port treats this as the `icon` prop on a Lettering toast (i.e. text + leading icon + optional close), which captures the common case. Pure-icon-no-text toasts are rare and can be added later if needed.

## Design Tokens Used

### Linked Figma styles → canonical tokens

| Figma style                      | Token / variable                                | Used for                      |
| -------------------------------- | ----------------------------------------------- | ----------------------------- |
| Grey Scale/Black (`FILL`)        | `--color-grey-black`                            | Normal background             |
| Grey Scale/White (`FILL`)        | `--color-grey-white`                            | text on coloured background   |
| System/Body 2/Regular (`TEXT`)   | 14px / lh 22 / PingFang TC 400                  | toast text                    |
| Grey Scale/White 60% (`FILL`)    | `rgba(255,255,255,0.7)` (action), `0.4` (split) | action label, split divider   |
| Function/Positive green (`FILL`) | `--color-function-positive`                     | Positive background `#5C9969` |
| Function/Warn yellow (`FILL`)    | `--color-function-warn`                         | Warn background `#DBA34F`     |
| Function/Negative red (`FILL`)   | `--color-function-negative`                     | Negative background `#C85C41` |

### Fonts seen in tree

- PingFang TC / 400 / 14px / lh 22 — toast text + action label

## States and Interactions

| Event / state            | Behaviour                                                                        |
| ------------------------ | -------------------------------------------------------------------------------- |
| Mount (enter)            | Slide-up + fade-in, 200ms cubic-bezier ease-out                                  |
| Auto-dismiss             | After `duration` ms (default 5000). `duration: 0` = sticky                       |
| Hover                    | Pauses the auto-dismiss timer; resumes on `mouseleave`                           |
| Focus inside toast       | Same pause behaviour, for keyboard users                                         |
| Action click             | Fires `action.onClick`. Action does NOT auto-dismiss the toast — caller decides. |
| Close click              | Dismisses immediately (animated exit, 160ms)                                     |
| Spam beyond `limit`      | Oldest toasts dropped without animating (avoids flicker storms)                  |
| Re-show with same `id`   | Existing toast is replaced in-place (dedupe pattern)                             |
| `prefers-reduced-motion` | Animations disabled; toasts appear/disappear instantly                           |

## Responsive Behavior

- Viewport: fixed at `bottom: 16px`, horizontally centered with `transform: translateX(-50%)`.
- `max-width: calc(100vw - 32px)` so toasts never overflow on narrow phones.
- Long text wraps; the toast height grows with content. No truncation.
- Stack direction: `flex-direction: column-reverse` so the newest toast sits at the bottom of the visual stack (closest to viewport edge).

## Edge Cases

- **No `<ToastProvider>`**: `useToast()` throws with a descriptive error so this fails loudly during development rather than silently no-op'ing.
- **SSR**: `<ToastProvider>` renders nothing on the server (portal target `document.body` is missing). First client effect mounts the viewport.
- **Multiple providers in one app**: technically supported (each maintains its own queue) but not recommended; pick one and put it at the app root.
- **Unmount during exit animation**: timers are cleared in cleanup; no stale state references.
- **`limit` reached mid-flight**: dropped toasts have their timers cleared; no memory leak.
- **Action without close**: rare but supported via `closable: false`; user must click the action or wait for auto-dismiss.

## Accessibility Notes

- Toasts render inside a `<div role="region" aria-label="通知">` viewport. The region announces additions via `aria-live`.
- `aria-live="polite"` on the viewport so additions announce.
- Negative toasts use `role="alert"` + `aria-live="assertive"` — they interrupt for urgent failures.
- Other variants use `role="status"` + `aria-live="polite"` — non-blocking.
- Close button has `aria-label="關閉"` (i18n via consumer override later if needed).
- Focus ring on action / close uses white outline against the coloured background — passes 3:1 contrast for both Normal (black bg) and function colour backgrounds.
- Auto-pause on hover/focus respects WCAG 2.2.1 Timing Adjustable.

## Implementation

- **React**: [`packages/react/src/components/Toast/`](../../../packages/react/src/components/Toast/)
- Public API: `<ToastProvider>`, `useToast()`, types `ToastInput` / `ToastVariant` from `@matters/design-system-react`
- Mount once at app root: `<ToastProvider><App /></ToastProvider>`
- Imperative show:
  ```tsx
  const { show } = useToast();
  show({ text: "已儲存", variant: "positive" });
  show({ text: "刪除完成", action: { label: "復原", onClick: undo } });
  ```
- Vendored copy: not provided — toast needs a runtime queue, which is awkward in vanilla CSS. Use the npm package.

## Dual-track Judgment

- 結構軌（compound component with imperative API + queue management）
- Not a copy-paste candidate: the runtime queue, dedupe, and timer management require a Provider. npm package is the only sensible distribution channel.

## Preview

![figma preview](./figma-preview.png)
