## Handoff Spec: 作品頁排版優化 (Article Page Layout)

### Overview

**用戶價值**：讓讀者進到作品頁時，能夠專心閱讀內容、被作者留下，而不是被頭部的作者卡、標籤、翻譯按鈕、右側推薦閱讀等雜訊分散注意力，導致提早跳出。

**為什麼要改**（引用 backlog 痛點）：現有作品頁「內容過度擁擠，推薦閱讀內容、作者資訊、圍爐資訊在優先級上面沒有獲得適當分配」、「可點擊的按鈕過多，也會導致注意力分散」，同時行距字距、字級字形缺乏規範（見 `已有設計項目待迭代.md` 第 62–64 行「概述」）。

- **來源 issue**：(待創建)
- **Track**：Structural（屬於跨元件的版面動線調整 + typography 規範重整，無法僅靠模板軌自助完成）
- **Figma**：https://figma.com/design/gs3w7fKdHqk9u1nnDxPYlZ/作品頁
- **Backlog 原文**：`已有設計項目待迭代.md` 第 50–610 行
- **PM**：mashbean（繁中社群站台總經理）

---

### Problem Summary (from backlog analysis)

對應 `已有設計項目待迭代.md` 第 70–175 行的 8 個問題：

1. **問題 1 – 閱讀動線不順暢**：用戶進頁的心智順序是「內容 → 作者 / 圍爐 / 標籤 → 衍生作品」，但目前版面沒有對應此優先級，導致讀者分心或提早跳出。
2. **問題 2 – 作者資訊碎片化**：固定頁首的一行作者簡介空間太小、資訊不夠，用戶實際會跳到作者頁才決定是否追蹤，放在作品頁首反而佔據不該佔的視覺重量。
3. **問題 3 – 標籤位置容易送客**：標籤現在位於內文之前、橫向滑動、沒有數量上限，容易讓讀者一進來就點走。
4. **問題 4 – 找不到哪些是能點擊的工具**：日期、翻譯、分布式入口、標籤混在一起，新用戶分不清哪個可點，翻譯按鈕被忽略尤其嚴重。
5. **問題 5 – 推薦閱讀比作者的其他作品更搶眼**：站方推薦讓讀者意識到「我在 Matters 看文章」而不是「我在這位作者的空間看文章」，不利留存。
6. **問題 6 – 摘要樣式不夠舒適，空間感不足**：摘要左側貼齊直線造成版型跑掉感，僅以黃色引號區分，段落感弱。
7. **問題 7 – 內文文字顏色過多，樣式擁擠紊亂**：大量綠色連結、圖片描述無行數限制、雙 Divider、bulleted/numbered list 混用導致閱讀體驗差。
8. **問題 8 – 版面中的線條過多**：Divider、三欄分隔線、Header、Toolbar 邊框多重疊加，整體有「侷促感」。

---

### Optimization Directions

對應 `已有設計項目待迭代.md` 第 264–605 行的 8 個優化方向：

1. **優化 1 – 閱讀動線**：改為 主要作品內容 → 作者的其他創作 → 作者的推薦 → 回應 → 站方推薦閱讀。
2. **優化 2 – 減去不必要的資訊露出**：拿掉頁首的作者自介，只保留作者名稱 + 圍爐名稱；完整作者資訊留到作者頁。
3. **優化 3 – 標籤收合，放在內文末端**：標籤移到內文之後、單行顯示、超過上限收合成「展開」；編輯器端逐步限縮到約 5 個。
4. **優化 4 – 資訊 vs 工具分開**：作者 / 圍爐 / 發布與編輯日期歸為「資訊」；翻譯 / 分布式入口歸為「工具」按鈕；加間距、摘要弱化。
5. **優化 5 – 注意力歸還作者**：站方推薦閱讀從右側固定移到文末、標籤下移、回應收合為前三則（＊待議）。
6. **優化 6 – 摘要保留喘息空間**：摘要用明體字、弱化顏色 / 字重、去除彩度，讓它像引言而非主視覺。
7. **優化 7 – Typography 規範重整**：H1/H2 改 Noto Serif TC、內文 PingFang TC 18px、明確行距段距與顏色，見下方 Design Tokens。
8. **優化 8 – 清除不必要的視覺干擾**：減少三欄分隔線、Divider（改圓點）、Header / Toolbar 邊線、Footer 跳轉與多餘顏色。

---

### Layout

**整體結構（由上而下，desktop）**：

1. **Header / Toolbar**（全站共用；本頁需降低邊框存在感）
2. **標題區**：H1 作品標題（`typography.article.title.desktop` = Noto Serif TC / 32 / 54 / weight 600 / letter-spacing 1.2；mobile 改用 `typography.article.title.mobile` = 24 / 36 / 600）
3. **作者資訊區（精簡版）**：作者頭像 + 名稱 + 圍爐名稱；**拿掉自介 / 追蹤按鈕**（優化 2）。名稱使用 `typography.system.body1.semibold`，圍爐名稱用 `typography.system.body2.regular`
4. **工具列**：翻譯 / 分布式入口（按鈕型態，與資訊列視覺分離）（優化 4）。按鈕文字 `typography.system.body2.medium`
5. **資訊列**：發布日期、編輯日期（純文字，不可點擊外觀；`typography.system.small.regular` + `color.grey.greyDarker`）
6. **摘要區**（可選；`typography.article.summary.desktop` = Noto Serif TC / 20 / 35 / 400，mobile 18 / 30；色 `color.grey.greyDarker`；低存在感）
7. **正文**（`typography.article.body.regular` = PingFang TC / 17 / line-height 1.75；粗體換 `article.body.semibold`；段落間距取 `sp32`）
8. **標籤區**（內文結尾後；預設單行、超過上限收合）（優化 3）。標籤文字 `typography.system.body2.regular`
9. **作者的其他作品**（優先於站方推薦）（優化 1、5）
10. **作者的推薦 / 關聯作品**
11. **回應（前三則 + 展開）**（優化 5；＊前三則收合策略待議）
12. **站方推薦閱讀**（從右側固定 → 搬到文末）（優化 5）
13. **Footer**（精簡，減少跳轉連結）（優化 8）

**版面變化重點**：

- 三欄 → 單欄為主，右側固定推薦欄移除
- 欄間與 Header / Toolbar 的分隔線全面弱化或移除（優化 8）

---

### Design Tokens Used

以下 token 路徑皆參照 `design-system-scaffold/tokens/tokens.json` (v2, 2026-04-24 extraction)，PM 已確認色彩使用 **new palette**（Matters 2.0 方向）。

**Color**

| Token path                 | Value   | Usage                                                   |
| -------------------------- | ------- | ------------------------------------------------------- |
| `color.brand.new.purple`   | #7258FF | 主要 brand；focus ring (2px outline)                    |
| `color.primary.600`        | #735BF3 | 連結 default（底線 + 文字色，取代 legacy 綠 `#098D88`） |
| `color.primary.500`        | #9280F5 | 連結 hover / active                                     |
| `color.primary.0`          | #F5F3FF | 摘要 / 引用區塊背景（候選，待 Figma 確認）              |
| `color.grey.black`         | #333333 | H1 / 正文主文字（取代 backlog 中 `#222222`，DS 無此值） |
| `color.grey.greyDarker`    | #808080 | 摘要文字、代碼文字、引用文字、日期（優化 6、7）         |
| `color.grey.grey`          | #B3B3B3 | 圖片 / 影片 / 音源描述文字（優化 7）                    |
| `color.grey.greyLight`     | #DDDDDD | Divider 圓點、次級分隔（優化 7、8）                     |
| `color.grey.greyLighter`   | #F7F7F7 | 摘要區或工具列背景（候選）                              |
| `color.grey.white`         | #FFFFFF | 頁面底色                                                |
| `color.brand.legacy.green` | #0D6763 | **僅遷移過渡允許**；新代碼一律用 `color.primary.600`    |

**Typography**

| Token path                            | Value                                  | Usage                             |
| ------------------------------------- | -------------------------------------- | --------------------------------- |
| `typography.fontFamily.ui`            | PingFang TC                            | UI / 正文 / 系統文字              |
| `typography.fontFamily.reading`       | Noto Serif TC                          | 作品標題 + 摘要（僅此二者用明體） |
| `typography.article.title.desktop`    | Noto Serif TC / 32 / 54 / 600 / ls 1.2 | ArticleTitle (H1) 桌機            |
| `typography.article.title.mobile`     | Noto Serif TC / 24 / 36 / 600 / ls 1.2 | ArticleTitle (H1) 手機            |
| `typography.article.summary.desktop`  | Noto Serif TC / 20 / 35 / 400          | Summary 桌機                      |
| `typography.article.summary.mobile`   | Noto Serif TC / 18 / 30 / 400          | Summary 手機                      |
| `typography.article.header.desktopH2` | PingFang TC / 28 / 1.7 / 600           | 正文內 H2 桌機                    |
| `typography.article.header.mobileH2`  | PingFang TC / 21 / 1.7 / 600           | 正文內 H2 手機                    |
| `typography.article.header.desktopH3` | PingFang TC / 22 / 1.7 / 600           | 正文內 H3 桌機                    |
| `typography.article.header.mobileH3`  | PingFang TC / 19 / 1.7 / 600           | 正文內 H3 手機                    |
| `typography.article.body.regular`     | PingFang TC / 17 / 1.75 / 400          | 正文段落（替換 backlog 中 18px）  |
| `typography.article.body.semibold`    | PingFang TC / 17 / 1.75 / 600          | 正文 Bold                         |
| `typography.article.body.medium`      | PingFang TC / 17 / 1.75 / 500          | 正文中等字重                      |
| `typography.article.comment.regular`  | PingFang TC / 15 / 1.75 / 400          | 回應內文                          |
| `typography.article.comment.medium`   | PingFang TC / 15 / 1.75 / 500          | 回應強調                          |
| `typography.system.body1.semibold`    | PingFang TC / 16 / 24 / 600            | 作者名稱、按鈕文字                |
| `typography.system.body2.regular`     | PingFang TC / 14 / 22 / 400            | Meta 次要文字、標籤               |
| `typography.system.body2.medium`      | PingFang TC / 14 / 22 / 500            | ToolbarActions 按鈕 label         |
| `typography.system.small.regular`     | PingFang TC / 12 / 18 / 400            | 發布 / 編輯日期、最小輔助文字     |

**Spacing**（8-point grid + 2-unit fine-grain；無 18 / 36 值，需由 type scale 派生）

| Token path     | Value | Usage                                                                         |
| -------------- | ----- | ----------------------------------------------------------------------------- |
| `spacing.sp4`  | 4px   | 極小內間距（icon + label 間）                                                 |
| `spacing.sp8`  | 8px   | 相鄰 meta 元素（日期 / 工具列內）                                             |
| `spacing.sp12` | 12px  | 作者資訊區內部                                                                |
| `spacing.sp16` | 16px  | 段內 rhythm（取代 backlog 18px；17 × 1.75 = 29.75 本就在 body lineHeight 內） |
| `spacing.sp32` | 32px  | 大垂直節奏：段落間、section 分界（取代 backlog 36px）                         |

**Effect（elevation）**

| Token path           | Value                                    | Usage                                   |
| -------------------- | ---------------------------------------- | --------------------------------------- |
| `effect.shadow1`     | 0 4px 8px rgba(0,0,0,0.08)               | 卡片類輕度陰影（RecommendationCard）    |
| `effect.dropdown`    | 0 4px 16px rgba(0,0,0,0.12)              | TagList 展開 / 工具列彈出               |
| `effect.dropdownNew` | 0 12px 24px + 0 2px 12px                 | 新版下拉（若採用 new palette 對應元件） |
| `effect.actionBar`   | 0 2px 4px + 0 -2px 12px, blur(24px)      | 行動版底部固定工具列                    |
| `effect.drawer`      | -8px 0 56px rgba(0,0,0,0.08), blur(24px) | 側邊抽屜（分享 / 目錄，若有）           |
| `effect.collection`  | inset + multi-layer                      | 圍爐卡（若顯示 collection card）        |

> 禁止 hard-code 值：所有字體、色彩、陰影都已有對應 token。間距若需要非 `sp{n}` 的值，請先在 PR 新增 token 而非寫死 px。

---

### Components

本頁涉及元件（以 `components/` 未來落位命名）：

1. **ArticleTitle (H1)** — `typography.article.title.desktop` (Noto Serif TC 32/54/600 ls 1.2) / `typography.article.title.mobile` (24/36/600) / color `color.grey.black` (#333)
2. **AuthorInline (精簡版)** — avatar + name + circle name；**不含 follow button、不含 bio**（優化 2）
3. **ToolbarActions** — 翻譯按鈕、分布式入口按鈕（button variant）
4. **MetaInfo** — 發布日期、編輯日期（純 text，低對比）
5. **Summary / Blockquote** — `typography.article.summary.desktop` (Noto Serif TC 20/35/400) / `.mobile` (18/30/400) / color `color.grey.greyDarker` (#808080) / 背景候選 `color.primary.0` (#F5F3FF)
6. **ArticleBody**（rich content container）
   - Paragraph、Bold（weight 600）、Italic、Strikethrough、Underline
   - InlineCode（Space Mono / 15 / 24 / `color.grey.greyDarker`）
   - Quote（`color.grey.greyDarker`）
   - BulletedList / NumberedList（段首縮進）
   - Link（底線 + `color.primary.600`，取代 legacy 綠）
   - Image / Video / Audio / JSFiddle Caption（PingFang / 300 / 12 / 16 / `color.grey.grey`，**最多一行**）
   - Divider（圓點，取代線條）
7. **TagList** — 內文末端、單行、超過上限顯示「展開」（優化 3）
8. **RecommendationCard (作者其他作品)**
9. **RecommendationCard (作者推薦)**
10. **ResponseList** — 前三則預設 + 展開（＊待議）
11. **SiteRecommendationCard (站方推薦閱讀)** — 文末

---

### States and Interactions

- **翻譯 / 分布式入口按鈕**：default / hover / active / focus（鍵盤）/ disabled；hover 用 `color.primary.500`，focus ring 用 `color.brand.new.purple`。
- **連結（內文）**：default 有底線 + `color.primary.600`；hover 換 `color.primary.500`；visited 目前 backlog 未規範——見 Open Questions。
- **TagList 收合（優化 3 關鍵）**：
  - 標籤單行顯示；當渲染超出容器寬度時（或超過 N 個，N 待 PM 決定），尾端出現「展開全部」
  - 展開後改為多行顯示，出現「收合」
  - 桌機 / 手機行為一致，**不採用橫向拖曳**
- **回應展開**：預設顯示前三則，點「查看全部回應」展開。
- **圖 / 影 / 音描述 overflow**：僅一行，超出用 `text-overflow: ellipsis`（CSS `-webkit-line-clamp: 1`）。

---

### Responsive Behavior

Backlog 沒有明列 breakpoints；沿用 DS 既有 breakpoints（若無，則需新增——見 Open Questions）。

- **Desktop (≥1024px)**：單欄置中，左右留白；原本的右側推薦欄移除。
- **Tablet (768–1023px)**：同桌機單欄；字級保持 18px；左右 padding 縮減。
- **Mobile (<768px)**：
  - H1 字級是否縮小？backlog 未指定 → Open Question
  - 工具列是否改 icon only？backlog 未指定 → Open Question
  - TagList 行為不變（單行 + 展開）
  - Header / Toolbar 邊線在手機 pop-up 尤需弱化（問題 8 點名）

---

### Edge Cases

- **標籤很多（>N）**：單行截斷 + 展開（優化 3）
- **內文很長**：維持 18px / 36px 行距；不出現性能退化；TOC / 段落綱要 backlog 未要求（雖然引用方格子時提到過，但 PM 未納入本次）
- **無摘要**：整個摘要區塊不渲染，正文直接緊接作者資訊 / 工具列（間距需設計）— Open Question
- **無推薦（作者沒有其他作品 / 沒有推薦 / 沒有回應）**：區塊是否整個隱藏？還是顯示空狀態？backlog 未規範 → Open Question
- **載入中**：skeleton 樣式 backlog 未規範 → Open Question
- **舊作品資料殘留**：編輯器歷史產出的多 Divider、emoji list、超長圖片描述——問題 7 明確點名，需要 server-side / render-time 的清理策略 → Open Question
- **翻譯不可用 / 分布式入口不可用**：按鈕 disabled 還是隱藏？→ Open Question

---

### Accessibility Notes

- **對比度**：正文 `#333` on `#fff` 約 12.6:1（AAA ✅）；摘要 `#808080` on `#fff` 約 4.6:1（AA 正常文字臨界，4.5:1 為下限；優化 6 要弱化需留意不跨線）；圖片描述 `#B3B3B3` on `#fff` 約 2.85:1（**未達 AA**）→ 見 Open Questions。
- **鍵盤順序**：標題 → 作者資訊 → 工具列按鈕 → 資訊列 → 摘要 → 正文 → 標籤 → 作者其他作品 → 作者推薦 → 回應 → 站方推薦。
- **ARIA**：
  - `<article>` 包正文
  - 摘要可用 `<blockquote>` 或 `role="doc-epigraph"`
  - TagList 展開用 `aria-expanded` + `aria-controls`
  - 回應展開同上
- **Screen reader**：圖片 `alt`、caption 用 `<figcaption>`；代碼段落使用 `<code>`。
- **Focus ring**：使用 `color.brand.new.purple` (#7258FF) 2px outline，勿僅靠顏色區分。
- **CJK**：正文 18px 為 backlog 驗證過的中文閱讀尺寸；letter-spacing H1 為 1.2px，注意 line-break 不要切在標點符號前。
- **prefers-reduced-motion**：任何收合展開動畫需尊重。

---

### Open Questions (for PM + Dev)

> **已解決**（2026-04-24 tokens.json v2 抽取 + PM 裁示）：
>
> - ~~H1 typography 衝突~~ → 採 `typography.article.title.desktop` (Noto Serif TC 32/54 600)；backlog 的 36/54/700 是舊 mockup，以 DS 1.5 Figma 為準
> - ~~正文 token 缺口~~ → 採 `typography.article.body.regular` (PingFang TC 17/1.75 400)
> - ~~Noto Serif TC 未在 fontFamily~~ → v2 已有 `typography.fontFamily.reading`（ui/reading 雙字體）
> - ~~Spacing scale 不足~~ → v2 已有完整 `sp0/2/4/6/8/10/12/14/16/32`
> - ~~連結色選 primary.600 還是 brand.new.purple~~ → PM 裁示用 `color.primary.600` (#735BF3)，brand token 留作 logo/核心品牌用
> - ~~H1 色 #222222~~ → 採 `color.grey.black` (#333333)；DS 沒有 #222
> - Space Mono 需求僅在 backlog 某一條引註，實際是否使用需 PM 確認（見 Q1）
> - ~~摘要 / 引用背景~~ → 採 `color.primary.0` (#F5F3FF) 作為強調（與品牌紫一致）；純中性場景才用 `color.grey.greyLighter`

**A. Tokens / Design System 仍待確認**

1. **是否引入 Space Mono**（僅 backlog 一處提及，code block / caption 未明）？若要，需新增 `typography.fontFamily.mono`。
2. **摘要 / 引用**的完整 treatment（邊界、留白、引號樣式）—— Figma 原檔需要人眼對照，本 spec 作者無法看 base64 圖。

**B. Backlog 未規範的 UX 決策**

3. **TagList 收合門檻 N**：backlog 只說「5 個以上算多」「編輯器逐步限縮到 5 個左右」——runtime 顯示上限固定 5，還是動態偵測寬度？
4. **回應前三則展開策略（優化 5）**：backlog 註記「＊待議」——本次 pilot 是否實作？
5. **空狀態 / 載入中 / 離線**樣式 backlog 未規範。
6. **Mobile H1 是否縮小、工具列是否 icon-only**。
7. **翻譯 / 分布式入口 disabled** 時：隱藏 or 灰階？
8. **連結 visited 色**——需要獨立 token 還是沿用 `color.primary.700`？

**C. 無法從 md 直接讀取的內容**

9. Backlog 大量插圖以 `![][image1]`~`![][image37]` base64 形式嵌入，**可能有版面細節（間距、相對位置、摘要邊界、原型佈局）僅在圖片裡**。建議 PM 同步開 Figma prototype（`作品頁` 主檔 + backlog 引用的 typography proto）對照本 spec 逐點確認。
10. Backlog 引用兩個 Figma proto 連結（已有設計項目待迭代.md 第 56–58、260–262 行），**需與 `作品頁` 主檔比對是否最新**。

**D. 軌道分類（Dual-Track）** — 待 PM 確認

11. 草案建議：
    - **結構軌**：優化 1（動線）、優化 3（TagList 新收合元件）、優化 5（右欄移除 → 單欄）、優化 7 任何新增 typography 樣式、優化 8（三欄分隔線移除）
    - **模板軌**：優化 2（拿掉自介 prop / follow button prop）、優化 4（現有元件位置調動）、優化 6（Summary prop 改 variant）
    - 請 PM 最終裁示。
