# Freewrite Components

七日書 / 自由寫 專用元件規格。本層只放 spec.md + figma-preview.png，
React 實作（若需要）會在 [`packages/react/src/components/`](../../packages/react/src/components/)。

## 與主 design-system 的關係

| 共享主 design-system                                                               | 本層獨立                                      |
| ---------------------------------------------------------------------------------- | --------------------------------------------- |
| Button、TextField、Dialog、Toast、Avatar、Banner、ArticleCard 等 [primitives](../) | 七日書/自由寫專屬視覺元件（多為一次性活動圖） |

當 ArticleCard 出現七日書 badge 時，主 design-system 約定其 `meta` slot
渲染 `--color-freewrite-*` 文字，而非把七日書 badge 寫死進 props
（見 [`components/card/article-card/spec.md`](../card/article-card/spec.md)）。

## 元件清單

| 元件                                           | 用途                               | Figma 主源                           | 狀態       |
| ---------------------------------------------- | ---------------------------------- | ------------------------------------ | ---------- |
| [`logo-seven-day-book/`](logo-seven-day-book/) | 七日書專用 logo（不是自由寫 logo） | 七日書 Logo `5646:972`               | 📝 待 spec |
| [`poap/`](poap/)                               | 七日書 POAP（區塊鏈紀念徽章）      | 七日書 POAP `5646:982`               | 📝 待 spec |
| [`badge/`](badge/)                             | 自由寫一般徽章 + Default Image     | 徽章頁 `3501:230`                    | 📝 待 spec |
| [`day-prompt-card/`](day-prompt-card/)         | 每日題目卡（D1–D7 + 70 題版本）    | Q2 模板 `5646:2`、70 題 `4478:2`     | 📝 待 spec |
| [`participant-wall/`](participant-wall/)       | 參與者牆（活動結束總結用）         | 2025 總結 `5495:2`                   | 📝 待 spec |
| [`season-hero/`](season-hero/)                 | 季節主視覺 hero（landing 用）      | 7 個季節 page                        | 📝 待 spec |
| [`activity-banner/`](activity-banner/)         | 活動宣傳橫幅 / 社群方圖            | 品牌模板 `3902:223`、週年慶 `4680:2` | 📝 待 spec |

## Spec 格式

每個元件目錄含：

- `spec.md` — 對齊既有元件 spec 格式（見 [`components/buttons/tab-item/spec.md`](../buttons/tab-item/spec.md)）
  - Overview / Source / Variants / Variant nodes / Tokens used / Notes
- `figma-preview.png` — 從 Figma 直接匯出的元件預覽

實作時優先採用 Figma source 的命名與節點 id，不擅自改名。

## 命名規則

- 元件目錄使用 kebab-case，**不**包含 `freewrite-` 前綴（已在 `freewrite/` 命名空間內）
- 例外：`logo-seven-day-book` 必須加前綴以與主 design-system 的 `logo/` 區別
- 季節變體統一在 `season-hero/spec.md` 內以 variants 表格列出，不開個別資料夾
