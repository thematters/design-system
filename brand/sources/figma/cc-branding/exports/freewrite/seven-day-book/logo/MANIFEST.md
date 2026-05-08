# 七日書 Logo

從 Figma `CC & Branding` page `↳ 七日書 Logo` (`5646:972`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `5646:972`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5646-972
- Extracted: 2026-05-08

## Frames

| File                                | Figma node  | 尺寸     | Fill 色   | 用途              |
| ----------------------------------- | ----------- | -------- | --------- | ----------------- |
| [`seven-day-book-logo--dark.svg`](seven-day-book-logo--dark.svg)   | `5646:973` | 259×119 | `#333333` | 淺底使用（預設） |
| [`seven-day-book-logo--white.svg`](seven-day-book-logo--white.svg) | `5646:978` | 259×119 | `#ffffff` | 深底使用         |

兩個 frame 幾何完全一致（3 個 path、相同節點座標），只有 fill 顏色
不同。SVG 內部以原座標保留，可直接 `<img>` 或 inline 使用；若要程式化
換色，建議改用 `currentColor`（見下節）。

## Path 分解

| Path 編號 | 角色                | x 區間（在 259 寬內）          |
| --------- | ------------------- | ------------------------------ |
| 1         | 「七」字            | `0–88.6`                       |
| 2         | 「書」字            | `158.0–259.0`                  |
| 3         | 「日」字（中央）    | `107.3–137.4`                  |

注：第 3 個 path（「日」）是 paths 中體型最小的，作為三字關鍵節奏點。
若做小尺寸 favicon 版（< 60px 寬），可把第 3 path 簡化或加粗以避免糊掉。

## Token 化建議（給 Phase F spec.md 用）

- 預設色 `#333333` 對應主 design-system 的 `--color-grey-darker`（須核對 token canonical）
  - 不直接用 `--color-freewrite-text-dark`（`#045898`）— 因為這個 logo 是
    純黑灰、不帶藍，是七日書品牌的「中性」表現
- White variant 對應 `#fff`
- 為了 React port，建議改成單一 SVG 用 `fill="currentColor"`，由 CSS 控色
  （見 `components/freewrite/logo-seven-day-book/spec.md` Phase F 補完）

## 周邊頁面

- 七日書 POAP `5646:982` — 同系列，用此 logo 為主視覺
- 自由寫：Q2 七日書的模板 `5646:2` — landing 與題目卡用此 logo
- 兩廳院系列 `5047:2` — 七日書 × 兩廳院聯名版本（待抽取後對照是否有變體）

## 預覽

- [`page-preview.png`](page-preview.png) — Figma page 級截圖（624×119，dark + white 並排）
