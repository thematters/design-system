# Freewrite Asset Exports

從 Figma `CC & Branding`（file key `HQ5Y6bBc9dVDT99u8Qvkb5`）抽出的
七日書 / 自由寫專屬視覺資產。

## 目錄 ↔ Figma 頁映射

| 目錄                                | Figma 頁                                 | Node id      | 子節點數 | Manifest category    |
| ----------------------------------- | ---------------------------------------- | ------------ | -------: | -------------------- |
| [`core/`](core/)                    | 自由寫：品牌模板                         | `3902:223`   |      115 | `freewrite-core`     |
| [`badges/`](badges/)                | 自由寫：徽章、徽章領取說明圖、Default    | `3501:230`   |       24 | `freewrite-core`     |
| [`survey-70/`](survey-70/)          | 自由寫：70 題問卷                        | `4478:2`     |       20 | `freewrite-core`     |
| [`anniversary/`](anniversary/)      | 自由寫：週年慶活動相關物料               | `4680:2`     |       50 | `freewrite-seasonal` |
| [`user-templates/`](user-templates/) | 自由寫：用戶使用的活動模板               | `4973:26`    |       12 | `freewrite-seasonal` |
| [`seasonal/2024-winter/`](seasonal/2024-winter/) | 自由寫：2024 冬季主題                  | `4198:1377`  |       30 | `freewrite-seasonal` |
| [`seasonal/2025-spring/`](seasonal/2025-spring/) | 自由寫：2025 春季主題                  | `4249:134`   |        9 | `freewrite-seasonal` |
| [`seasonal/2025-summer/`](seasonal/2025-summer/) | 自由寫：2025 夏季主題                  | `4904:2`     |       64 | `freewrite-seasonal` |
| [`seasonal/2025-aug-sep-tcc/`](seasonal/2025-aug-sep-tcc/) | 自由寫：2025 年 8、9月（兩廳院） | `5047:2`     |      166 | `freewrite-seasonal` |
| [`seasonal/2025-autumn/`](seasonal/2025-autumn/) | 自由寫：2025 秋天（用春天的模板）      | `5412:6972`  |       31 | `freewrite-seasonal` |
| [`seasonal/2025-summary/`](seasonal/2025-summary/) | 自由寫：2025 總結                      | `5495:2`     |       36 | `freewrite-seasonal` |
| [`seasonal/2026-spring/`](seasonal/2026-spring/) | 自由寫：2026 春季主題                  | `5495:203`   |        7 | `freewrite-seasonal` |
| [`seven-day-book/logo/`](seven-day-book/logo/) | 七日書 Logo                              | `5646:972`   |        2 | `seven-day-book`     |
| [`seven-day-book/q2-template/`](seven-day-book/q2-template/) | 自由寫：Q2 七日書的模板                  | `5646:2`     |       27 | `seven-day-book`     |
| [`seven-day-book/poap/`](seven-day-book/poap/) | 七日書 POAP                              | `5646:982`   |        4 | `seven-day-book`     |

**總計：15 頁、~597 子節點。** 與 [`brand/sources/figma/cc-branding/exports/all-frames/manifest.json`](../all-frames/manifest.json)
中的 freewrite-* / seven-day-book 479 個 frame 對齊（manifest 排除了
非 frame 類型的 vector/text/group）。

> 自由寫 section 還有一個 header node `3902:677`（標題「▶ 自由寫」），
> 子節點數 0、不抽取。

## 抽取狀態

- **Phase D（PNG bulk）**：使用 `pnpm brand:figma -- export-manifest --filter freewrite`，
  需要 `FIGMA_TOKEN`。完成後 PNG 會落在 `all-frames/<categoryId>/<page-slug>/`，
  並由 Phase D 收尾 script 整理到對應的 `exports/freewrite/<dir>/` 鏡射層。
- **Phase E（SVG / code / tokens）**：使用 MCP Figma 工具（`get_screenshot`、
  `get_design_context`、`get_variable_defs`），逐頁抽 vector 與設計 reference code。
  輸出檔型：`<frame-name>.svg`、`<frame-name>.tokens.json`、`<frame-name>.preview.png`。

每個目錄填好內容後會新增一份 `MANIFEST.md` 列出該目錄的檔案清單與抽取
時間戳。

## 命名規則

- frame 名稱去除特殊字元、轉 kebab-case：`七日書 D1 主題 A` → `seven-day-book-d1-theme-a`
- 同名 frame 加 node id 後綴：`hero__5646-972.png`
- SVG 輸出使用原 frame 名（保留中文 OK，UTF-8 安全）

## 不收進 git 的檔案

- 大尺寸（>2 MB）的單張 PNG / JPEG — 改放 `cache/` 或 R2
- Photoshop / Sketch 原始檔 — 不抽取
- 字型檔（.ttf / .otf）— 授權問題，僅在 `docs/freewrite-design-system/typography.md` 留指引
