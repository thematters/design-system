# Component: Freewrite Badge

## Overview

自由寫**站內徽章**（站內 metadata，非鏈上 NFT），與七日書 POAP
（`components/freewrite/poap/`）並行。包含徽章本體、領取說明圖、以及
未設定頭像時的 Default Image。

> ⚠️ Phase E 抽取時 Figma get_metadata 對此頁回傳 210 KB（超過工具
> 上限），且 Plugin API 處於 read-only mode 無法 probe。本 spec 為
> **概要級** — 詳細 24 個子節點結構待 Phase F 進階階段補完。

## Source

- **Figma file**: CC & Branding (`HQ5Y6bBc9dVDT99u8Qvkb5`)
- **Page**: ↳ 自由寫：徽章、徽章領取說明圖、Default Image
- **Page node id**: `3501:230`
- **Open in Figma**: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=3501-230

## Variants（推測）

頁名暗示三類，共 24 個子節點：

| Type                | 推測數量 | 用途                                         |
| ------------------- | -------: | -------------------------------------------- |
| Badge（徽章）       |     ~14 | 完成各活動的紀念徽章（多季節版本）           |
| 領取說明圖           |      ~6 | step-by-step 教學圖                          |
| Default Image       |      ~4 | 用戶未設定頭像 / 封面時的 fallback            |

## Asset files

- [`brand/sources/figma/cc-branding/exports/freewrite/badges/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/badges/page-preview.png) — Page 全景（1024×288）
- [`brand/sources/figma/cc-branding/exports/freewrite/badges/MANIFEST.md`](../../../brand/sources/figma/cc-branding/exports/freewrite/badges/MANIFEST.md)

## Tokens used

待 Phase F 進階階段抽取後補。預期會包含：

- `--color-freewrite-text-dark` (#045898) — 徽章文字主色
- `--color-freewrite-background` (#F0F9FE) — 徽章淺底
- `--color-grey-light` / `--color-grey-lighter` — 灰階配色
- 字型：可能採 `jf-jinxuan` 或主 design-system 字型

## Usage rules

待補。已知限制：

- 徽章顯示在 matters.town 用戶個人頁，metadata 級（非 NFT）
- Default Image 用於未上傳頭像的 fallback — **必須符合站內整體 grid
  美感**，不可使用過於鮮明的色彩
- 領取說明圖為**輔助 UX**，不是行銷素材，不採活動 hero 配色

## Phase F 待補（高優先）

1. 用 use_figma write 模式（避開 read-only）逐個 frame probe `3501:230` 24 個 children
2. 拆分為三類 sub-components：
   - `components/freewrite/badge/badge-item/` — 單個徽章
   - `components/freewrite/badge/redemption-guide/` — 領取說明
   - `components/freewrite/badge/default-image/` — fallback
3. 對照 POAP（鏈上版）做差異表

## 周邊組件

- POAP `components/freewrite/poap/` — 鏈上版本
- Activity banner `components/freewrite/activity-banner/` — 引導用戶領徽章的活動入口
