# Component: 七日書 POAP

## Overview

七日書活動完賽 / 參加紀念**鏈上 NFT**（POAP = Proof of Attendance Protocol）。
方形 2000×2000，分**參加獎 / 大滿貫**兩個獎勵層級。和站內徽章
（`components/freewrite/badge/`）並行，一個是 metadata、一個是區塊鏈。

## Source

- **Figma file**: CC & Branding (`HQ5Y6bBc9dVDT99u8Qvkb5`)
- **Page**: ↳ 七日書 POAP
- **Page node id**: `5646:982`
- **Open in Figma**: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5646-982

## Variants

| Tier       | 顯示文字色 | Label 色  | 背景紋理 imageHash | 用途           | Figma node |
| ---------- | ---------- | --------- | ------------------ | -------------- | ---------- |
| 參加獎     | `#07294b`  | `#0f76b7` | `7e04d167…`        | 完成 1+ 篇即可 | `5658:2`   |
| 大滿貫     | `#ffffff`  | `#ffe367` | `b28b5ace…`        | 連續完賽 7 天  | `5658:12`  |
| 改字模板   | `#07294b`  | `#0f76b7` | `7e04d167…`        | 給營運改字     | `5652:267` |
| 大滿貫 alt | —          | —         | —                  | 大滿貫替代版   | `5666:3`   |

## Asset files

PNG 預覽（每張 ~1.4 MB，1024×1024）：

- [`participation-prize__5658-2.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/participation-prize__5658-2.png)
- [`grand-slam__5658-12.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/grand-slam__5658-12.png)
- [`grand-slam-alt__5666-3.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/grand-slam-alt__5666-3.png)
- [`operations-text-edit__5652-267.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/operations-text-edit__5652-267.png)

裝飾向量 SVG（重複出現於所有 frame）：

- [`decorative-scribble-bottom-left.svg`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/decorative-scribble-bottom-left.svg)
- [`decorative-scribble-top-right.svg`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/decorative-scribble-top-right.svg)

詳細 manifest：
[`brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/MANIFEST.md`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/MANIFEST.md)

## Layout 結構

```
frame 2000×2000
├── IMAGE fill (背景紋理 — tier 決定)
├── TEXT  「{季節主題}」  jf-jinxuan Bold 220px center  (top-half)
├── FRAME "Label" (815×210)  單色 button-like 矩形    (mid)
├── FRAME "Logo" (512×236)  ← 包 七日書 logo            (top)
├── VECTOR scribble bottom-left  #0F76B7
└── VECTOR scribble top-right    #0F76B7
```

## Tokens used

| 角色        | 參加獎                  | 大滿貫                | 對應 design-system token (待核對)           |
| ----------- | ----------------------- | --------------------- | ------------------------------------------- |
| 標題文字色  | `#07294b`               | `#ffffff`             | （未定）                                    |
| Label 填色  | `#0f76b7`               | `#ffe367`             | `--color-freewrite-text` (#1999D0) **不同** |
| 背景紋理    | imageHash `7e04d167…`   | imageHash `b28b5ace…` | 非 token，是 raster asset                   |
| 裝飾線      | `#0F76B7`               | `#0F76B7`             | （未定）                                    |
| 字型 family | `jf-jinxuan` Bold 220px | 同左                  | `--font-family-display` (待新增)            |

> 注意：POAP 的藍 `#0f76b7` 與既有 `--color-freewrite-text` (`#1999D0`)
> 是**不同色** — POAP 用了更深、更飽和的藍。這暗示 freewrite palette
> 該擴張 — `Phase G docs/freewrite-design-system/color-usage.md` 會
> 整理「opt-in 4 token 之外的 freewrite-extended palette」。

## Usage rules

- POAP 是**鏈上 NFT 視覺**，輸出後不可改 — 一旦鑄造，圖即定型
- **背景紋理必須使用原始 imageHash 對應的 PNG**（不可 AI 重新生成或
  替代）— 這是區塊鏈一致性要求
- 改字工作流：營運只能改 標題 TEXT、Label 內文、Logo container 內的
  選擇性元素。背景與裝飾線不可動
- 大滿貫 alt 變體（`5666:3`）的差異待 Phase F 進階對照

## 周邊組件

- 七日書 Logo `components/freewrite/logo-seven-day-book/` — POAP 內必含
- Badge `components/freewrite/badge/` — 站內版紀念物
- Season hero `components/freewrite/season-hero/` — 季節主視覺背景的紋理可能來自相同素材庫
