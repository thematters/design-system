# Component: Participant Wall

## Overview

活動結束的**用戶評論 / 參與者牆**。在年度總結 / 季末回顧 socially
showcase 用戶留言、感言、引用。最 canonical 的源是 2025 總結頁的
**12 個 "Comments Review" frame**（共用 imageHash 與 4-slot template）。

## Source

- **Figma file**: CC & Branding (`HQ5Y6bBc9dVDT99u8Qvkb5`)
- **Page**: ↳ 自由寫：2025 總結
- **Page node id**: `5495:2`
- **Frame ids**: `5563:2`、`5573:114/132/150/168/188`、`5563:18`、`5573:26/42/61/97/205`（共 12 frame）
- **共用 imageHash**: `62513104e8a20ce731b4d689dffb894581c6c5b7`
- **Open in Figma**: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5495-2

## Variants

12 個 instance 全部規格一致（1080 × 1350，4 children 每個），只**內容
（評論 / 用戶名 / 頭像）**不同。

## Asset files

- [`brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summary/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summary/page-preview.png)
- [`brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summary/MANIFEST.md`](../../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summary/MANIFEST.md)

## Layout 結構（推測自 4 children）

```
frame 1080 × 1350
├── IMAGE fill 背景紋理 (imageHash 62513104…)
├── TEXT 用戶評論主文（quote）— 大字級
├── 用戶頭像 (Avatar) — 圓形或方形
└── TEXT 用戶名稱 + 可能含日期
```

> **這 4 children 配置與 ArticleCard（`components/card/article-card/`）
> 的 author / content / meta slots 概念類似** — 在 React port 時可
> 考慮共用 `<UserQuoteCard>` 元件，再以 freewrite-specific styling
> override。

## Tokens used

待 Phase F 進階抽取確認。預期：

- 背景：IMAGE imageHash（2025 總結專屬）
- 文字：可能用 `--color-grey-darker` 或 `--color-freewrite-text-dark`
- 用戶名：較小字級，灰階
- Avatar 邊框：可能 1px solid grey 或無邊框

## Variant patterns

### 集結圖 vs. 評論牆

2025 總結頁中還有「邀約過的 14 位作家集結圖」frame (`5495:40`)，這是
另一種 participant wall variant — **多人聚合**型（14 位作家排成 grid），
非單人 quote。可以視為 `participant-wall` 的 \*\*layout="grid-multi"`vs.`layout="single-quote"` 兩種模式。

## Usage rules

- 不可隨機打亂 — 排序對應活動敘事節奏（首尾 anchor 重要評論）
- 用戶頭像必須**對齊 avatar canonical**（`components/freewrite/badge/`
  Default Image fallback）
- 引用文字長度建議 30-80 中文字 — 太短失去感染力、太長破壞 grid 一致性
- 避免引用敏感性內容；發布前需要用戶授權

## 與 landing page 的關係

從 [`docs/handoff-specs/seven-day-book-landing.md`](../../../docs/handoff-specs/seven-day-book-landing.md) 既有的「participant wall」
設計區塊，這個元件是直接 mapping：

- Figma 源：2025 總結 12 個 Comments Review
- Landing page：`apps/page-templates/activity-landing/` 的 participant
  wall 區塊
- Production：實際渲染從 matters.town DB 拉用戶評論動態填入

## Phase F 進階待補

1. 抽 `5563:2` 第一個 Comments Review frame 的 4 children → 確認 slot 定義
2. 抽 「邀約過的 14 位作家集結圖」`5495:40` 的 15 children → 多人 grid layout
3. 對照 ArticleCard `meta` slot 看 React port 能否共用基類

## 周邊組件

- ArticleCard `components/card/article-card/` — 概念上的姊妹元件
- Avatar pattern (in 品牌模板 7 個 Avatar frame) — 用戶頭像規格
- Activity banner `components/freewrite/activity-banner/` — 引導到 participant wall 的入口
