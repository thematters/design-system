# 自由寫：品牌模板

從 Figma `CC & Branding` page `↳ 自由寫：品牌模板` (`3902:223`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `3902:223`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=3902-223
- Extracted: 2026-05-08
- 子節點：115（資料庫中**最大且最 canonical** 的 freewrite 頁）

## 概念

**這是 freewrite 的 mother template page** — 所有季節活動的版型、
站內配圖、newsletter cover 都從這頁衍生。命名以 **編號 1~6** 系統化
分類：

```
1. 好文精選推薦_IG    × 22  ← 編輯精選 carousel
2. 七日書題目_IG_1    × 35  ← 七日書 day prompt 主模板（最大組）
3. 文章金句_IG        × 18  ← 金句 carousel
4. 書後感關鍵字       × 2   ← 讀後 keyword
5. 講座摘要           × 6   ← 講座資訊卡
6. murmur             × 4   ← 站內隨筆 / 短語
```

> **「2. 七日書題目\_IG_1」共 35 個 instance** — 這是整個 freewrite
> 資料庫中最大的元件群，是 day-prompt-card 元件 spec 最 canonical 的來源。

## 結構分組

| 群組                | 數量 | 尺寸          | 主背景              | 用途                              |
| ------------------- | ---: | ------------- | ------------------- | --------------------------------- |
| 1. 好文精選推薦\_IG |   22 | 1080 × 1350   | 純白 `#ffffff`      | 編輯精選文章卡                    |
| 2. 七日書題目\_IG_1 |   35 | 1080 × 1350   | **GRADIENT_LINEAR** | 七日書 day prompt 主版            |
| 3. 文章金句\_IG     |   18 | 1080 × 1350   | `bcdfcf51…`         | 金句卡片                          |
| 4. 書後感關鍵字     |    2 | 1080 × 1350   | 純白                | 讀後感 keyword viz                |
| 5. 講座摘要         |    6 | 1080 × 1350   | `a5f8ee0c…`         | 講座資訊卡                        |
| 6. murmur           |    4 | 1080 × 1350   | `bb1f726b…`         | 站內隨筆                          |
| Avatar              |    7 | 1080 × 1080   | 純白                | 用戶頭像 placeholder              |
| FB Cover            |    7 | 2500 × 925    | `ea565a3a…`         | FB 封面                           |
| Newsletter Cover    |    2 | 600 × 200     | `8f832db8…`         | Email newsletter banner           |
| Conversation        |    6 | ~877 × varies | (透明)              | 對話泡泡（Conversation 元件）     |
| 標籤 TEXT           |   ~3 |               | `#333333`           | "Archive"、"Latest"、"運營改字用" |

## 重要設計選擇

### 七日書題目 (35 個版本) 用 LINEAR GRADIENT 背景

不像其他類別用 IMAGE fill 或純色，七日書 day prompt 是**程式可控的
線性漸層**。意味著：

- 35 個 frame 可能都是**同一個漸層配方**、只改文字（最有可能）
- 或是 35 個漸層變體 — 35 種色彩組合
- 待 Phase F 抽前 5 個 frame 的 fill `gradientStops` 確認

→ 這是 `components/freewrite/day-prompt-card/spec.md` 的核心 token：
**漸層**而非 image，相對 2024 冬之後的設計演進關鍵。

### 數字編號是版型秩序的契約

「1.」到「6.」是一套**有意識的設計分類學**。後續所有季節頁都從這 6
類取一個或多個版型加變體，這暗示：

- 季節頁設計 = 品牌模板 6 類 × 季節主題加成
- 設計師有一個內部知道的「6 類分類」mental model
- Phase G `docs/freewrite-design-system/component-index.md` 會把這 6 類
  作為頂層目錄分類

## 已抽出資產

- [`page-preview.png`](page-preview.png) — Page 全景縮圖 (875×1024)

## Phase F 待補（資料庫最重要的待辦）

1. **`components/freewrite/day-prompt-card/spec.md` 主源**：抽 35 個
   「2. 七日書題目\_IG_1」frame 的：
   - 共用 LINEAR_GRADIENT fill 的 stops
   - 內部 children 結構（推測：日期 / D1-7 標籤 / 題目主文 / 七日書 logo / 裝飾）
   - 跨 35 個 instance 的差異點（哪些是固定、哪些是變數）
2. 22 個「1. 好文精選推薦」frame → `freewrite-feature-article-card`
3. 18 個「3. 文章金句」frame → `freewrite-quote-card`
4. 6 個 Conversation frame → `freewrite-conversation` 對話泡泡元件
5. Newsletter Cover (600×200) → 跟主 design-system 既有 newsletter-header 比較

## 周邊頁面

- 全部其他 14 個自由寫 / 七日書 page 都是這頁的衍生 — 是整個資料庫的根
