# 自由寫：徽章、徽章領取說明圖、Default Image

從 Figma `CC & Branding` page `↳ 自由寫：徽章、徽章領取說明圖、Default Image` (`3501:230`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `3501:230`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=3501-230
- Extracted: 2026-05-08
- 子節點：24

## 概念

自由寫的**站內徽章 + 領取說明圖 + Default Image**。徽章是用戶完成
活動後在 matters.town 個人頁顯示的視覺紀念，與 七日書 POAP（鏈上）
並行 — 一個是站內 metadata、一個是鏈上 NFT。

## 結構

⚠️ **詳細子節點結構尚未抽取** — Figma get_metadata 對此頁回傳 210 KB
（超過工具上限），且 use_figma 此次處於 read-only mode 無法 probe。
本 MANIFEST 只記錄 page-level 資訊，子節點層級分析延後到 Phase F
（建議當時用 use_figma 寫權限模式 + 分批 probe）。

從 page name 可推測 24 個子節點分三類：

1. **徽章本身** — 圓形或矩形紀念徽章（多版本，對應不同活動）
2. **徽章領取說明圖** — 教學用的 step-by-step illustration
3. **Default Image** — 用戶未設定頭像 / 封面時的 fallback

## 已抽出資產

- [`page-preview.png`](page-preview.png) — Page 全景縮圖 (1024×288)

## Phase F 待補

- 用 use_figma 寫權限模式（不在 read-only mode）逐個 frame probe
- 抽 24 個子節點為個別 PNG / SVG（依向量 vs raster 分流）
- 分類標記為 badge / illustration / default 三類
- 對照 `seven-day-book/poap/` 的鏈上版本，整理「站內 vs 鏈上」獎勵設計差異

## 周邊頁面

- 七日書 POAP `5646:982` — 鏈上版紀念徽章（已抽，2 tier reward system）
- 自由寫：品牌模板 `3902:223` — base brand visual
- 自由寫：用戶模板 `4973:26` — 用戶自助 Cover/Poster
