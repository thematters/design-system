# Component: Season Hero

## Overview

**季節主視覺 hero** — 每季活動的 landing page 首屏視覺，也用於 IG
季初預告 / FB Cover 月份封面 / 站內封面。是 freewrite 一年中**最具
辨識度的視覺資產**，每季新繪 1 張，沿用 1 季。

## Source

每季都有自己的 hero。涵蓋：

| Season      | Page        | 站上封面 / 主 hero frame                     | imageHash                |
| ----------- | ----------- | -------------------------------------------- | ------------------------ |
| 2024 冬季   | `4198:1377` | FB Cover ×3, IG Post 1-6 多版本              | 多種                     |
| 2025 春季   | `4249:134`  | FB\_題目\_1 (`4506:2`), IG Post_1 (`4311:2`) | `f178f939…`、`14a781fd…` |
| 2025 夏季   | `4904:2`    | IG Post_1, IG Post_2（5+5）                  | `e42d919d…`、`87049d6e…` |
| 2025 8-9 月 | `5047:2`    | 兩廳院官網配圖 1920×1440 (8/9 月各 7 個)     | `2c878196…`、`ae4c9b8f…` |
| 2025 秋季   | `5412:6972` | （引用 spring template）IG Post_1 多版本     | `14a781fd…` 等           |
| 2025 總結   | `5495:2`    | 主視覺（宣言大圖）`5495:4`                   | `e9e287cf…`              |
| 2026 春季   | `5495:203`  | IG Post_1 (`5598:2`)                         | `a942a797…`              |
| Q2 七日書   | `5646:2`    | 站上封面 `5646:576` (2000×2000)              | （未抽）                 |

> **共有 7+ 個獨立 hero variants，每個都是 1 張獨立的設計** — 不像
> day-prompt-card 是模板批量產出。

## Variants

### 主尺寸

| Aspect ratio    | 尺寸        | 渠道                          |
| --------------- | ----------- | ----------------------------- |
| 4:5 IG portrait | 1080 × 1350 | IG post / Q2 模板             |
| 1:1 square      | 1080 × 1080 | FB / 方形分享                 |
| 4:3 wide        | 1920 × 1440 | 兩廳院官網 / 大型橫向 banner  |
| 1:1 large       | 2000 × 2000 | 站上封面（matters.town 站內） |
| 27:10 banner    | 2500 × 925  | FB Cover                      |
| 4.3:1 short     | 688 × 160   | matters.town 圍爐 banner      |

## Asset files

每季 hero 都在對應 page 的 page-preview.png 內可見。逐張 PNG 抽取
延後到 Phase F 進階階段：

- [`brand/sources/figma/cc-branding/exports/freewrite/seasonal/`](../../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/) — 7 個季節資料夾
- [`brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/q2-template/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/q2-template/page-preview.png)

## Layout 結構

每個 hero 設計獨立、結構不一致。但共同 elements：

```
frame
├── 背景：IMAGE fill (季節主視覺，每季新繪)
├── 七日書 logo（多放右上 / 左上）
├── 季節 / 月份 TEXT label（jf-jinxuan）
├── 主標題 / 季節 slogan
└── 可選：作家頭像 / 季節插畫元素
```

## Tokens used

每季 hero 的色彩系統獨立。從各 page MANIFEST 整理：

| Season  | 主色推測（待 Phase F 抽 image dominant 色） |
| ------- | ------------------------------------------- |
| 2024 冬 | 冷色 / 深藍 + 白                            |
| 2025 春 | 綠 / 米白                                   |
| 2025 夏 | 綠 / 黃（從 imageHash 命名推測）            |
| 2025 秋 | （sharing spring）                          |
| 2026 春 | 春色（待抽）                                |

`docs/freewrite-design-system/seasonal-themes.md` 會編列每季完整
palette。

## Usage rules

- **每季只一張主 hero** — 不要為同一季產出多張競爭 hero
- 七日書 logo 出現位置 / 大小須一致跨季（用 dark 或 white 變體擇一）
- 主標題避免英文，**保持繁中為主**（freewrite 是繁中為母語的活動）
- 不可重複使用上一季的 hero — 每季視覺**必須有差異**以提示活動週期
- Hero 必須**繪製為 image，而非 SVG/CSS** — 這是 freewrite 視覺品牌
  「手感」的關鍵（與 day-prompt-card 的 LINEAR_GRADIENT 路線分流）

## Phase F / G 待補

1. 抽 7 個季節 page 的 hero 個別 PNG（站上封面 / IG Post_1 / 兩廳院配圖）
2. 在 `seasonal-themes.md` 列出每季：hero 預覽、主色、字型、調性
3. 設計 hero 模板輸入規格給 Matters Studio（Phase 9 已 spec），讓
   未來季節可由社群提案
4. 對照 `apps/page-templates/activity-landing/` 的 hero 區塊，產出
   landing-page-ready hero 規格表

## 周邊組件

- 七日書 Logo `components/freewrite/logo-seven-day-book/`
- Day prompt card `components/freewrite/day-prompt-card/` — 與 hero 用同期 imageHash
- Activity banner `components/freewrite/activity-banner/` — 站內 banner 是 hero 的縮小變體
- Participant wall `components/freewrite/participant-wall/` — 季末總結用
