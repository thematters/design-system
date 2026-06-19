# Component: 七日書 Logo

## Overview

七日書（Seven Day Book）活動專用 wordmark logo。由「七／日／書」三個
中文字組成，皆為自製 SVG path（非字型）。是七日書品牌**最高優先級
的視覺標誌**，出現在 POAP、所有日題目卡、landing page hero、社群圖。

## Source

- **Figma file**: CC & Branding (`HQ5Y6bBc9dVDT99u8Qvkb5`)
- **Page**: ↳ 七日書 Logo
- **Page node id**: `5646:972`
- **Open in Figma**: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5646-972

## Variants

| Variant | Fill 色   | Figma node | 用途                      |
| ------- | --------- | ---------- | ------------------------- |
| Dark    | `#333333` | `5646:973` | 淺底使用（預設）          |
| White   | `#ffffff` | `5646:978` | 深底使用（POAP 大滿貫等） |

兩個變體幾何完全一致（3 個 path，相同 anchor 座標），只 fill 色不同。

## Asset files

- [`brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/logo/seven-day-book-logo--dark.svg`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/logo/seven-day-book-logo--dark.svg) — 8.7 KB
- [`brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/logo/seven-day-book-logo--white.svg`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/logo/seven-day-book-logo--white.svg) — 8.7 KB
- viewBox: `0 0 259 119`，aspect ratio ≈ 2.18:1

## Path 分解

| Path 編號 | 角色             | x 區間（259 寬內） |
| --------- | ---------------- | ------------------ |
| 1         | 「七」字         | `0–88.6`           |
| 2         | 「書」字         | `158.0–259.0`      |
| 3         | 「日」字（中央） | `107.3–137.4`      |

## Tokens used

無變數綁定（fill 為 hard-coded `#333333` / `#ffffff`）。

建議 React port 整併為單一 SVG with `fill="currentColor"`，由 CSS 控
色：

```tsx
import LogoSvg from './seven-day-book-logo.svg?react';

<LogoSvg className="h-8 text-grey-darker" />        {/* 取代 dark 版 */}
<LogoSvg className="h-8 text-white" />              {/* 取代 white 版 */}
```

對應主 design-system token：

- Dark: `--color-grey-darker`（須核對與 `#333333` 是否一致）
- White: `#fff`（沒有專屬 token，用 raw value 即可）
- 七日書專屬綠/藍/紫風格不適用 — logo 是品牌中性符號，刻意脫離
  季節 palette

## Usage rules

- **最小尺寸 28 px 高**（259/119 ≈ 2.18 寬高比，對應約 60 px 寬以上）
  低於此尺寸時三字會糊掉。需更小可見度時改用「七」字單字版（待設計，
  目前不存在）
- **clear space**：logo 高度的 0.25× 環繞空間，不放任何元素
- **不可變色**：除 dark / white 兩變體外，不為季節調整 logo 顏色，
  以免和 brand canonical（紫 + 綠）混淆

## 周邊組件

- POAP `components/freewrite/poap/` — 中心使用此 logo
- Day prompt card `components/freewrite/day-prompt-card/` — 頂部右上 / 角標位置
- Season hero `components/freewrite/season-hero/` — 主視覺左上品牌標
