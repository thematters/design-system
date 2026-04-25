# Component: Banner

## Overview

A single carousel slide: full-bleed background image + title overlay + optional pagination indicator dots. Used on the home page hero, campaign launches (e.g. Logbook 創作接龍), and seasonal landing surfaces.

The Figma source models a slide in isolation; the surrounding carousel logic (auto-advance, swipe, prev/next buttons) is the consumer's responsibility. Pass `currentSlide` + `totalSlides` for the inline indicator.

## Source

- **Figma file**: Design System 1.5 (`JDKpHezhllOvJF42xbKcNN`)
- **Page**: Others
- **Type**: COMPONENT_SET
- **Node id**: `5251:1856`
- **Key**: `d3311a967c05859bf3bb33ad4b422f5828d9343a`
- **Open in Figma**: https://www.figma.com/design/JDKpHezhllOvJF42xbKcNN/Design-System-1.5?node-id=5251-1856

## Variants

| Property | Default   | Options             |
| -------- | --------- | ------------------- |
| Device   | `Desktop` | `Desktop`, `Mobile` |

`Mobile` differs only by tighter padding (12px vs 16px) and shorter min-height (90px vs 100px). The React port uses a single `compact` boolean rather than two device variants — the layout otherwise stretches to its container.

### Variant nodes

- `Device=Desktop` — node `5251:1829`
- `Device=Mobile` — node `5251:1857`

## Design Tokens Used

| Element                        | Token / value                                                         |
| ------------------------------ | --------------------------------------------------------------------- |
| Title text                     | `--color-grey-white` on dark scrim                                    |
| Title typography               | 16px / lh 24 / PingFang TC 500                                        |
| Subtitle (extra, not in Figma) | `--color-grey-white` at 80% opacity                                   |
| Indicator dot (idle)           | `rgba(255,255,255,0.4)`                                               |
| Indicator dot (active)         | `--color-grey-white`                                                  |
| Border radius                  | 8px                                                                   |
| Image scrim (added in React)   | `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)` |

The dark scrim is **not** in the Figma source — added in React so white text remains readable on any background image (Figma always shows a known image).

## States and Interactions

| State / event       | Behaviour                                                                          |
| ------------------- | ---------------------------------------------------------------------------------- |
| Idle                | Static slide; image sits behind a dark scrim; title and indicators on top          |
| Hover (when `href`) | Native link semantics; visual change is consumer's choice (cursor changes to hand) |
| Focus (when `href`) | 2px white outline at 2px offset (visible against dark scrim)                       |
| Mid-carousel        | Active dot is opaque white; other dots at 40% white                                |

## Responsive Behavior

- Width stretches 100% of container — wrap in a fixed-width parent for the Figma 264px / 387px sizes.
- Min-height 100px (default) / 90px (`compact`).
- Title clamps at 2 lines with ellipsis; longer titles need shorter copy.

## Edge Cases

- **No `imageSrc`**: Banner needs a background image to look right. Pass at minimum a solid-colour data URL or a placeholder.
- **`imageAlt=""`** (default): image is treated as decorative, hidden from SR tree. The title carries meaning.
- **`imageAlt="..."` (provided)**: image is described; SR users hear both image and title. Use this only when the image conveys content (e.g. event poster).
- **Single slide carousel** (`totalSlides=1`): indicator hidden — single dots are confusing.
- **No carousel** (`totalSlides` omitted): indicator hidden entirely.
- **Long subtitle**: not clamped; can grow vertically.

## Accessibility Notes

- Title rendered as `<h3>` so it lands in the document outline appropriately. If used at top of page, wrap or override.
- Indicator is an `<ol>` with `aria-label="Slide N of M"`; active dot has `aria-current="true"`.
- When `href` is provided, the entire card is a single link — keyboard users tab once; SR announces title + subtitle as the link name.
- When no `href`, the banner is a passive `<div>`; surrounding interactivity (e.g. parent carousel buttons) handles navigation.
- Decorative scrim and dots are not in the a11y tree.

## Implementation

- **React**: [`packages/react/src/components/Banner/`](../../../packages/react/src/components/Banner/)
- **Code Connect**: [`Banner.figma.tsx`](../../../packages/react/src/components/Banner/Banner.figma.tsx) — Figma `Device=Mobile` maps to `compact=true`.
- Public API: `Banner` from `@matters/design-system-react`. Renders as `<a>` if `href` is set, otherwise `<div>`.

## Dual-track Judgment

- 結構軌（atomic component for product surfaces）
- The Figma source is also used as a Promotion-template starting point (campaign banners). Operations team should fork the React story and hardcode their image + title rather than reaching for a separate template — keeps designs traceable to the same DS component.

## Preview

![figma preview](./figma-preview.png)
