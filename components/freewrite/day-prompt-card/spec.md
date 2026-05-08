# Component: Day Prompt Card

## Overview

**七日書 / 自由寫的核心元件** — 每日題目卡片。一個活動週期 = 7 天 ×
1 題目卡 + 1 預告 + 1 月初宣傳，是 freewrite 資料庫**出現次數最多
的版型**。

## Source

主源是兩頁：

| Source                             | Frame 數 | Node id      |
| ---------------------------------- | --------: | ------------ |
| 自由寫：品牌模板（**主 mother**）   | **35**   | `3902:223` "2. 七日書題目_IG_1" 群 |
| 自由寫：Q2 七日書的模板             |   16     | `5646:2` IG_題目_1~8 + FB_題目_1~8 |
| 自由寫：70 題問卷                   |   20     | `4478:2` 問卷 1~20             |
| 各季節頁 (2024冬 / 2025春/夏/秋)    |   多版本  | 每季 ~8 frame (D1-D8)         |

跨整個 freewrite Figma file，**day-prompt-card variant 累計 100+ 個**。

## Variants

### 主 IG 版本（1080 × 1350）

| Variant     | 背景型態          | imageHash 範例     | 用途                |
| ----------- | ----------------- | ------------------ | ------------------- |
| 品牌模板    | LINEAR_GRADIENT   | （無 image）       | 主版型，最 canonical |
| 2025 春     | IMAGE             | （未抽 hash）      | 春季主視覺          |
| 2025 夏     | IMAGE             | `e42d919d…`        | 夏季綠調            |
| 2025 秋     | IMAGE             | `1ffa4466…`        | 秋季調              |
| Q2 (2026春) | IMAGE             | `a942a797…`        | 2026 春             |
| 70 題       | IMAGE（共用一張） | `62323df0…`        | 70 題長活動         |

### FB 方版（1080 × 1080）

幾乎一一對應 IG 版本，但比例改方形。

## Asset files

- [`brand/sources/figma/cc-branding/exports/freewrite/core/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/core/page-preview.png)（含 35 個 mother variants）
- 各季節 page-preview.png 內亦可見此元件
- [`brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/q2-template/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/q2-template/page-preview.png)

## Layout 結構（推測，待 Phase F 進階驗證）

```
frame 1080 × 1350
├── 背景：LINEAR_GRADIENT (品牌模板) 或 IMAGE fill (季節版)
├── TEXT  日序 「D1」...「D7」          頂部 / 角標
├── TEXT  季節主題（如「2026 春」）     上方
├── TEXT  題目（如「寫給未來自己」）   主視覺，最大字級
├── 七日書 logo                       底部 / 右下，dark 或 white 變體
└── decoration：scribble / 紋理         角落或全 frame
```

## Tokens used

| 角色             | 品牌模板      | 季節版                          |
| ---------------- | ------------- | ------------------------------- |
| 背景             | LINEAR_GRADIENT (stops 待 Phase F probe) | IMAGE imageHash |
| 主題目文字色     | （待抽）      | 視季節 imageHash 而定            |
| 題目字型         | （待抽）— 預期 `jf-jinxuan` Bold | 同      |
| 日序徽章背景     | （待抽）      | 通常與題目色相反或加 alpha       |

## Usage rules

- 1080×1350 是 IG portrait 標準，1080×1080 是 FB 方形 — **根據渠道
  選變體**，不要硬塞錯尺寸
- 題目文字長度需控制在 ~20 中文字以內（觀察 70 題 / Q2 主版本）
- D1-D7 七日書活動以 7 為固定週期；70 題則跳過 D 序，改用 1-20 編號
  跨多月份
- 品牌模板（mother）**用漸層背景而非 image**，這是設計師留給程式
  化生成的設計約束 — 跟 image fill 路線是**兩種獨立工作流**

## Phase F 待補（**最重要**）

1. 抽 `3902:223` "2. 七日書題目_IG_1" 前 5 個 frame 的：
   - LINEAR_GRADIENT stops 與角度
   - children 的 typography（字級、字型、color）
   - 35 個 instance 的 diff（文字 vs. 漸層 vs. 排版）
2. 抽 70 題問卷 `4478:2` 第 1 frame 的 4 children → 推導極簡版 layout
3. 抽 Q2 模板 IG_題目_1 → IG_題目_8 8 個 → D1-D8 完整 layout 約束
4. 整合為一份 layout map，於 `docs/freewrite-design-system/layout-principles.md` 引用

## 周邊組件

- 七日書 Logo `components/freewrite/logo-seven-day-book/` — 必含
- Season hero `components/freewrite/season-hero/` — 同期搭配的 hero
- Activity banner `components/freewrite/activity-banner/` — 通往 day prompt 的入口
