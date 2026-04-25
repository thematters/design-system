# Component: Article Card

## Overview

The single most-used card on Matters: lists an article with author, summary, optional cover image, and (optionally) badges + a more-actions kebab. Used in the Follow feed, archive lists, search results, tag pages, and profile pages.

The Figma source has two sizes (Mobile/Small, Desktop/Big) and a placeholder skeleton state. The React port preserves both sizes and ships the skeleton via `placeholder={true}`.

**Design choice (Phase 4):** Matters business badges (編輯選擇 / 選集 / 七日書 / 圍爐) are NOT built-in props. They live in the `meta` slot, which accepts arbitrary `ReactNode`. Rationale: those badges change over time, and pinning them as DS API would force every business-logic change into a DS bump.

## Source

- **Figma file**: Design System 1.5 (`JDKpHezhllOvJF42xbKcNN`)
- **Page**: Card
- **Type**: COMPONENT_SET
- **Node id**: `4853:994`
- **Key**: `64e7d8959ef4341f682e6fcc1b1ca40059f71d54`
- **Open in Figma**: https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=4853-994

## Variants

| Property   | Default       | Options                  |
| ---------- | ------------- | ------------------------ |
| Type       | `Follow`      | `Follow`                 |
| State      | `Placeholder` | `Default`, `Placeholder` |
| Device     | `Mobile`      | `Mobile`, `Desktop`      |
| Photo Size | `Small`       | `Big`, `Small`           |

### Variant nodes

- `Type=Follow, State=Placeholder, Device=Mobile, Photo Size=Small` — node `4853:913`
- `Type=Follow, State=Default, Device=Mobile, Photo Size=Small` — node `4853:944`
- `Type=Follow, State=Placeholder, Device=Desktop, Photo Size=Big` — node `5073:1075`
- `Type=Follow, State=Default, Device=Desktop, Photo Size=Big` — node `5073:1026`

## Design Tokens Used

### Linked Figma styles → canonical tokens

| Figma style                      | Token / value                        | Used for                            |
| -------------------------------- | ------------------------------------ | ----------------------------------- |
| Grey Scale/Black (`FILL`)        | `--color-grey-black`                 | title text `#333`, author name      |
| Grey Scale/Grey Dark (`FILL`)    | `--color-grey-grey-darker` (closest) | summary text `#999c9d`              |
| Grey Scale/Grey (`FILL`)         | `--color-grey-grey`                  | timestamp `#b3b3b3`                 |
| Grey Scale/Grey Light (`FILL`)   | `--color-grey-grey-light`            | dashed border between cards `#ddd`  |
| Grey Scale/Grey Lighter (`FILL`) | `--color-grey-grey-lighter`          | placeholder skeleton bars `#f7f7f7` |
| System/Body 1/Medium (`TEXT`)    | 16px / lh 24 / PingFang TC 500       | title                               |
| System/Body 2/Regular (`TEXT`)   | 14px / lh 22 / PingFang TC 400       | summary                             |
| System/Small/Regular (`TEXT`)    | 12px / lh 18 / PingFang TC 400       | head row + footer meta              |
| Border-Noir 8% (`FILL`)          | `rgba(0,0,0,0.08)`                   | placeholder dashed border           |

### Fonts seen in tree

- PingFang TC / 500 / 16px / lh 24 — title
- PingFang TC / 400 / 14px / lh 22 — summary
- PingFang TC / 400 / 12px / lh 18 — head row + footer

## States and Interactions

| State / event       | Behaviour                                                                           |
| ------------------- | ----------------------------------------------------------------------------------- |
| Idle (Default)      | Static card; dashed border at the bottom separates it from the next card            |
| Hover (when `href`) | Title shifts to `--color-brand-new-purple` to signal it's clickable                 |
| Focus (when `href`) | 2px outline `--color-brand-new-purple`, 2px offset, 4px radius                      |
| Author block hover  | Author name shifts to brand purple — independent of card hover                      |
| Author block click  | Stops propagation so it doesn't trigger the parent card link (navigates to profile) |
| More button click   | Calls `onMoreClick`; preventDefault + stopPropagation so card link doesn't follow   |
| Placeholder         | Renders skeleton bars + cover box; pulses with 1.4s ease-in-out (respects RM)       |
| Cover absent        | Layout collapses — text takes full width                                            |

## Responsive Behavior

| Breakpoint      | Layout                                                                          |
| --------------- | ------------------------------------------------------------------------------- |
| `size="small"`  | 76px cover, 24px gap between text and cover, full container width (Figma 375px) |
| `size="big"`    | 106px cover, 48px gap between text and cover, container width (Figma 752px)     |
| Vertical rhythm | 20px padding top/bottom; gap 8px between head/content/footer                    |
| Title/summary   | 2-line clamp with ellipsis at all sizes                                         |

The component does not switch sizes itself based on viewport — the consumer picks the size via prop. (List pages typically render `small` on mobile and `big` on desktop via two different render branches.)

## Edge Cases

- **No cover image (`coverImageUrl` omitted)**: layout shrinks; title/summary stretch to full width.
- **No author avatar (`avatarUrl` omitted)**: Avatar falls back to initials.
- **No publish time (`publishedAt` omitted)**: the · separator is also hidden.
- **No meta + no `onMoreClick`**: the entire footer row disappears (no empty space).
- **Author with profile link inside a clickable card**: nested links — author link stops propagation so card click navigates to article, author click navigates to profile.
- **Long title/summary**: 2-line clamp with native `text-overflow: ellipsis` (via `-webkit-line-clamp`).
- **Placeholder while data loads**: render `<ArticleCard placeholder size="..." />` to occupy space + animate.
- **`meta` containing 七日書 tag**: the `--color-freewrite-*` palette is opt-in (Phase 3 isolation); pass plain text or use the canonical primary/secondary scales for non-Freewrite contexts. The Figma source uses the freewrite blue here, but the React port treats meta as user-rendered content so this rule is up to the consumer.

## Accessibility Notes

- Title rendered as `<h3>` for outline. Adjust via heading structure if cards live under a more nested heading.
- Cover image is treated as decorative when `coverImageAlt=""` (default) — the title carries meaning. Pass meaningful alt only when the image content matters (e.g. a chart article where the cover IS the chart).
- Card-level link wraps everything; nested links (author, more button) stop propagation so they remain independently navigable.
- Author block + name come first in DOM so SR users hear "豆泥, 3 分鐘前, 標題, 摘要…" — matches typical reading order.
- Placeholder skeleton has `role="status"` + `aria-busy="true"` + `aria-label="文章載入中"` so SR announces the loading state.
- More button is keyboard-accessible (`<button>`); icon is `aria-hidden`; the button itself has `aria-label="更多動作"`.
- Animation respects `prefers-reduced-motion: reduce` (skeleton stops pulsing).

## Implementation

- **React**: [`packages/react/src/components/ArticleCard/`](../../../packages/react/src/components/ArticleCard/)
- **Code Connect**: [`ArticleCard.figma.tsx`](../../../packages/react/src/components/ArticleCard/ArticleCard.figma.tsx) — separate mappings for Default and Placeholder states; `Device` variant maps to `size`.
- Public API: `ArticleCard` from `@matters/design-system-react`. Pass `placeholder={true}` for skeleton; otherwise pass content props.

## Dual-track Judgment

- 結構軌（含模板特徵，可能跨入模板軌；實作時再判定）

## Preview

![figma preview](./figma-preview.png)
