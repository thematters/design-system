# 自由寫：70 題問卷

從 Figma `CC & Branding` page `↳ 自由寫：70 題問卷` (`4478:2`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `4478:2`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=4478-2
- Extracted: 2026-05-08

## 概念

「70 題問卷」— 自由寫的長題庫活動，由 20 張 IG portrait 卡片發布。
每張平均 3-4 題，卡片以序號排序（問卷 1 → 問卷 20）。

## 結構（20 frames，極度規律）

- 全部是 **`1080 × 1350` IG portrait** 尺寸
- 全部共用 **同一張背景** `imageHash 62323df0a8271efd1c0eed81e9052367fff48444`
- 每個 frame 4 個 children — 推測：標題 / 序號 / 題目 list / decoration
- 命名規律：「問卷 N」（N = 1…20）

| 系列        | Frame ids                                             | 子節點數 |
| ----------- | ----------------------------------------------------- | -------- |
| 問卷 1–10   | `4478:3`, `:149`, `:187`, `:225`, `:263`, `:301`, `:339`, `:377`, `:415`, `:453` | 4 each |
| 問卷 11–20  | `4491:41`, `:79`, `:117`, `:155`, `:193`, `:231`, `:269`, `:307`, `:345`, `:383`  | 4 each |

> 序號跨越兩個 namespace（`4478` 與 `4491`） — 推測是不同時間點分批新增。
> 設計 token 與版型維持完全一致。

## 已抽出資產

- [`page-preview.png`](page-preview.png) — Page 全景縮圖 (1024×378)

## Phase F 待補

- 抽單張代表卡（建議 `4478:3` 問卷 1）抽 children 4 個 layer 的 typography
  + 位置；推導 day-prompt-card 元件 spec
- 這頁是 `components/freewrite/day-prompt-card/spec.md` 的最佳資料來源
  — 20 張同模板可確認 spec 約束範圍（哪些是固定、哪些可變）

## 周邊頁面

- 自由寫：Q2 七日書的模板 `5646:2` — 七日書一週版的 day prompt card（相對短版）
- 70 題問卷是「長活動版」、Q2 模板是「七日活動版」、可在 spec 一起對照
