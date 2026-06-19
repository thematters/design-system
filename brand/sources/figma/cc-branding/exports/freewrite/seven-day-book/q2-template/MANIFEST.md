# 自由寫：Q2 七日書的模板

從 Figma `CC & Branding` page `↳ 自由寫：Q2 七日書的模板` (`5646:2`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `5646:2`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5646-2
- Extracted: 2026-05-08

## 概念

七日書活動 Q2 期程的完整素材包 — 從季初預告 / 月初宣傳 / 站上封面 /
日題目卡（D1–D8）的 IG / FB / 站上三個渠道版型。是 freewrite 設計
資料庫中**最具示範性的「season-hero + day-prompt-card」組合**。

> 注：D1-D8 表面是「七日書」但有 8 個題目，第 8 題可能是 bonus 或
> alt-prompt — 待 Phase F 對照確認。

## 頁面結構（top-level）

| Node           | 類型    | 名稱           | 用途                  | 子節點 |
| -------------- | ------- | -------------- | --------------------- | ------ |
| `5646:4`       | SECTION | IG 模板        | IG 渠道完整模板       | ~14    |
| `5646:575`     | SECTION | 站上           | 站內封面圖容器        | 1      |
| `5721:2`       | SECTION | 改字           | IG 模板的改字版（v2） | ~14    |
| `5721:573`     | SECTION | 站上           | 站內封面圖（v2）      | 1      |
| `5646:578`     | SECTION | FB 模板        | FB 渠道完整模板       | ~22    |
| 多個獨立 frame | FRAME   | (各 templates) | FB 系列 + 改字版補充  | ~      |

## 元件命名規律（IG 模板 內部）

| 命名              | 數量 | 尺寸        | 用途                       |
| ----------------- | ---- | ----------- | -------------------------- |
| IG Post_1         | 多個 | 1080 × 1350 | 季初預告 / 月初宣傳        |
| IG Post_2         | 多個 | 1080 × 1350 | 季初預告變體 / 月度        |
| IG\_題目\_1 ~ \_8 | 8    | 1080 × 1350 | **D1–D8 day prompt cards** |

## 元件命名規律（FB 模板 內部）

| 命名                   | 數量 | 尺寸        | 用途                |
| ---------------------- | ---- | ----------- | ------------------- |
| FB Cover：一月         | 1    | 2500 × 925  | FB 月份封面 banner  |
| FB 季初預告\_四圖\_1~4 | 4    | 1080 × 1080 | 4 圖連續預告        |
| FB\_題目\_1 ~ \_8      | 8    | 1080 × 1080 | **D1–D8 (FB 方版)** |
| FB Post_1 ~ \_2        | 2-3  | 1080 × 1350 | 加碼預告 / 月初宣傳 |

## 站上封面

`5646:576` — 2000×2000 的 站上封面 frame，用於 matters.town 站內活動 banner。
為 freewrite landing page hero 的直接 source。

## 已抽出資產

- [`page-preview.png`](page-preview.png) — Page 全景縮圖 (843×1024)

## Phase F 待補（核心元件 spec 來源）

- **`components/freewrite/day-prompt-card/spec.md`**：抽 IG*題目\_1 ~ \_8 +
  FB*題目\_1 ~ \_8（共 16 frame），歸納 typography / layout / 變體
- **`components/freewrite/season-hero/spec.md`**：抽 站上封面 `5646:576`
  - IG Post_1 (季初預告)
- **`components/freewrite/activity-banner/spec.md`**：抽 FB Cover：一月
  `5646:579`

## 周邊頁面

- 自由寫：2026 春季主題 `5495:203` — 同期姊妹頁，社群素材專用
- 自由寫：2025 春季主題 `4249:134` — 上一年同期，用於版型迭代對照
- 七日書 Logo `5646:972` — 此頁所有題目卡上方使用
- 七日書 POAP `5646:982` — 完賽紀念
