# Freewrite Typography

freewrite 字型 / 字級 / 行距 / 繁簡使用規則。

## 字型（Font Families）

### 主 display 字型：jf-jinxuan（justfont 金萱）

繁體中文商用字型，由 justfont 出品。freewrite 全部 display 文字都
使用 jf-jinxuan，包括：

- POAP 標題（`07294b` / 白）220px Bold
- Day prompt card 季節主題 / 題目主文
- Season hero 標題
- 週年慶金句圖

**用途約束**：

- ✅ Display：標題、題目、季節主題、金句、品牌字
- ❌ Body：內文、UI 標籤、按鈕、表單
- ❌ 英文：金萱無拉丁字母設計，英文字必須切換到主 design-system 預設

### Body 字型：跟主 design-system

freewrite 內的內文（題目卡裡的補充說明、participant wall 的用戶評論）
**沿用主 design-system 預設**：

- 繁中：Source Han Sans TC / 蘋方 / 思源黑體
- 英文：（主 design-system token 待核對）

不在 freewrite 域內覆寫 body 字型 — 否則和 matters.town 一般文章
頁失去視覺連續性。

## 字型授權與 commit 規則

### 不要 commit 字型檔到 repo

`jf-jinxuan` 為**商用授權字型**：

- Web font: 由 justfont 提供 CDN，產品端使用其 web font URL
- 印刷 / 出版品：須單獨購買 OTF 授權
- 此 repo **不含** `.ttf` / `.otf` / `.woff` 字型檔

當前狀況：matters.town 已購買 jf-jinxuan 商用授權（2024 起）。
具體 license 證明文件由 ops 保管，repo 只引用 web font URL。

### Web font 載入

待 Phase F 進階補：產品端的 jf-jinxuan @font-face / `<link>` 載入規則
應寫進 `packages/tokens/dist/freewrite.css` 的延伸版本，而非 inline。

## 字級（Type Scale）

從 Figma 抽出的具體字級樣本：

| 場景                         | Family     | Style    | Size             | Source                                    |
| ---------------------------- | ---------- | -------- | ---------------- | ----------------------------------------- |
| POAP 標題                    | jf-jinxuan | Bold     | 220 px           | `5658:2` 數位雲端的我                     |
| Page TEXT 標題（如 2025 春） | （未抽）   | （未抽） | 預估 96-120 px   | 各 season page TEXT                       |
| Day prompt card 主題（推測） | jf-jinxuan | Bold     | 約 80-140 px     | `3902:223` 35 instance（待 Phase F 抽證） |
| Body / 補充                  | 主系統     | Regular  | 16-24 px         | 元件 spec 各 children                     |
| Newsletter cover 標題        | （待抽）   | （待抽） | （待抽）         | `3947:1697`                               |
| Banner 文字                  | （待抽）   | （待抽） | 24-40 px（推測） | 688×160 banner                            |

→ 待 Phase F 抽 `3902:223` 內 day prompt card 的 children 字級後，
此表會擴充為完整 type scale。

## 行距 / 字距（Leading / Tracking）

待 Phase F 進階抽取。已知初步觀察：

- jf-jinxuan Bold 220px 用於 POAP 時無明顯 letter-spacing 調整（justfont
  原始字型已含合適間距）
- 4-5 個字以內的標題（如「氣味博物館」）通常 **center align**
- 跨多行的題目可能會用 `1.4-1.6` line-height

## 繁簡轉換規則

freewrite 為**繁中 native 活動**，所有對外素材**必須繁體中文**：

- ✅ 繁體：matters.town 用戶以台/港繁中為主，所有 Figma 素材 OCR 確認皆為繁體
- ❌ 簡體：除特定大陸聯名活動外，不發簡體版本
- ⚠️ 中港台用詞差異：題目主文須避免兩岸/兩岸三地用詞差異（如「視頻 / 影片」），
  以**台灣用語為母版本**

### 跨語言版本

如需英文 / 日文版（七日書曾考慮日文小規模版本，未落地）：

- **字型須切換**到該語言對應字型
- **不可保留 jf-jinxuan**（金萱僅支援繁中）
- 英文版用 Inter / Source Sans 等開源字型，不要新增商用授權成本

## 使用限制

### 不要做的事

1. **不要用金萱排版內文**（會降低可讀性、提高字型授權成本）
2. **不要為季節活動換 display 字型**（jf-jinxuan 是品牌一致性錨點）
3. **不要把字型加進 body text token**（會影響 matters.town 全站效能）
4. **不要在 React port 寫死字型 family** — 用 `--font-family-display`
   token 引用，方便未來換 family

### 該做的事

1. 標題使用 jf-jinxuan Bold
2. 內文沿用主系統字型
3. 商用 license 證明 / web font URL 統一管理（ops 保管）

## Phase F 待補

1. 抽 `3902:223` 35 個 day-prompt-card 的 typography（預期均為金萱）
2. 抽 各 season page 「2025 春季主題」TEXT 字級
3. 整理 token 到 `packages/tokens/dist/freewrite-typography.css`
   （可選的延伸 token 包）

## 參考

- [既有 Phase 3 freewrite isolation](../../packages/tokens/build.mjs)
  — 主 design-system 的 freewrite tokens 隔離邏輯
- [Storybook Freewrite typography 待新增](../../apps/storybook/src/tokens/Freewrite.mdx)
  — 目前只有色票，待擴張字型頁
