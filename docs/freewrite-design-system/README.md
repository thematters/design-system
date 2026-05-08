# Freewrite Design System

七日書（Freewrite / 自由寫）品牌與活動的設計資料庫。

> **這份是子資料庫，不是獨立 repo。** 結構性元件、tokens、Storybook docs
> 都已內建在 `thematters/design-system` 主層；本資料夾補齊主層沒做的
> 自由寫專屬深層資料：歷季視覺資產、元件規格、排版原則、字型規則、
> 插畫風格。

## 入口

- [`docs/handoff-specs/seven-day-book-landing.md`](../handoff-specs/seven-day-book-landing.md)
  — 既有的七日書 landing handoff spec（Direction C 小鎮 Commons）
- [`apps/storybook/src/tokens/Freewrite.mdx`](../../apps/storybook/src/tokens/Freewrite.mdx)
  — 既有的 freewrite tokens 視覺化頁
- [`packages/tokens/dist/freewrite.css`](../../packages/tokens/dist/freewrite.css)
  — 既有的 `--color-freewrite-*` opt-in 色票
- [`apps/page-templates/activity-landing/`](../../apps/page-templates/activity-landing/)
  — 既有的活動 landing 範本（已寫死「七日書 2026 春」）

## 與主 design-system 的分工

| 主 design-system 已涵蓋               | 本資料夾補齊                     |
| ------------------------------------- | -------------------------------- |
| `--color-freewrite-*` 4 token         | 季節 accent / gradient 延伸      |
| 七日書 landing handoff spec（單版本） | 排版原則（從 16 頁 reverse-eng） |
| `activity-landing` Astro template     | 元件規格（七日書專用組件）       |
| Storybook freewrite tokens 頁         | 字型規則、繁簡使用、插畫風格     |

## 目錄

```
docs/freewrite-design-system/
├── README.md                 # 本檔
├── layout-principles.md      # 從 16 頁 reverse-engineer 出的版型原則
├── typography.md             # 字型、字級、行距、繁簡使用規則
├── color-usage.md            # 已有 freewrite.css 之外的延伸（季節 accent、漸層）
├── illustration-style.md     # 插畫風格（從各季 hero 歸納）
├── seasonal-themes.md        # 各季主題索引（hero 圖、色票、字、調性）
└── component-index.md        # 連到 components/freewrite/ 各 spec
```

對應的元件規格與素材匯出在：

- [`components/freewrite/`](../../components/freewrite/) — 元件 spec
- [`brand/sources/figma/cc-branding/exports/freewrite/`](../../brand/sources/figma/cc-branding/exports/freewrite/)
  — 由 Figma 抽出的 PNG / SVG 素材

## 資料源

主 Figma 來源：CC & Branding，file key `HQ5Y6bBc9dVDT99u8Qvkb5`。

涵蓋 **15 個自由寫 / 七日書 page**（不計 section header）。完整對應表見
[`brand/sources/figma/cc-branding/exports/freewrite/README.md`](../../brand/sources/figma/cc-branding/exports/freewrite/README.md)。

## Phase plan

| Phase | 內容                             | 狀態         |
| ----- | -------------------------------- | ------------ |
| A     | brand/ 子系統 baseline           | ✅ 已 commit  |
| C     | 目錄骨架 + 3 份索引              | 🚧 本 commit |
| D     | 479 freewrite frame PNG（REST）  | 📦 待 token   |
| E     | 16 頁 SVG / code / tokens（MCP） | 📝 待開始     |
| F     | 7 個元件 spec.md                 | 📝 待開始     |
| G     | 6 份原則 / 風格 / 字型 doc       | 📝 待開始     |
| H     | cross-link 既有 handoff/Storybook | 📝 待開始     |

完整 phase 進度由 todo list 維護。
