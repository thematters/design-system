# Freewrite Layout Principles

從 15 個自由寫 / 七日書 Figma page reverse-engineer 出的版型原則。

## 1. 三組規格錨點（Three Spec Anchors）

freewrite 全部素材幾乎都落在三個尺寸群組之一：

| 群組      | 尺寸           | Aspect | 用途                                        |
| --------- | -------------- | ------ | ------------------------------------------- |
| **IG-P**  | 1080 × 1350    | 4:5    | IG portrait（main），day-prompt-card 主版   |
| **IG-S**  | 1080 × 1080    | 1:1    | IG/FB square，FB_題目，公告卡               |
| **FB-C**  | 2500 × 925     | 27:10  | FB Cover banner（月份封面）                 |
| **TCW**   | 1920 × 1440    | 4:3    | 兩廳院聯名（外部官網用，唯一橫式 wide）      |
| **POAP**  | 2000 × 2000    | 1:1    | 鏈上 NFT，站上封面                          |
| **MTB**   | 688 × 160      | 4.3:1  | matters.town 圍爐 banner                    |
| **NL**    | 600 × 200      | 3:1    | Newsletter header                           |

→ 設計時**不可創造新尺寸**，必須對齊既有 7 個。例外只有跨域聯名（如
兩廳院）需求新尺寸時，加入第 8 個並文件化。

## 2. 雙工作流分流：模板 vs. 主視覺

freewrite 設計工作流明確分兩條：

### A. 模板軌（template path）
- 主源：[`brand/sources/figma/cc-branding/exports/freewrite/core/`](../../brand/sources/figma/cc-branding/exports/freewrite/core/)
  （品牌模板 page，`3902:223`）
- 用 **LINEAR_GRADIENT** 背景（不是 raster）
- 35+ instance 共用 1 個 mother template，只改文字
- 給程式化生成（`pnpm template:render`）使用
- 對應元件：day-prompt-card、quote-card、feature-card

### B. 主視覺軌（hero path）
- 主源：每季 page 的 IG Post_1 / 站上封面 / FB Cover
- 用 **IMAGE fill**（每季新繪 raster），imageHash 為唯一識別
- 每季只 1-2 張 hero，不是模板
- 給設計師手動製作 + Matters Studio 引導用戶選用
- 對應元件：season-hero、activity-banner（站內 banner 是 hero 縮小版）

→ **這兩條軌不混用**。模板軌的元件 fill 不能改成 image；hero 軌的
視覺也不要嘗試改成 gradient。混用會破壞既有的 ops handoff workflow。

詳見 [`docs/dual-track-workflow.md`](../dual-track-workflow.md)（既有
主 design-system 的雙軌文件 — freewrite 是其最具體的應用）。

## 3. SECTION 分群結構（2025 春之後）

從 2024 冬 → 2025 春，發生**設計工程化**。之後所有季節頁採用：

```
page (TEXT 標題)
├── SECTION "IG 模板"        ← 主版本群組
├── SECTION "FB 模板"        ← 主版本群組
├── TEXT "運營改字用"        ← 改字工作流分隔
├── SECTION "IG 模板"        ← v2 改字版
├── SECTION "FB 模板"        ← v2 改字版
└── SECTION "日期更新版"     ← 月度日期更新（可選）
```

> 為什麼有 v1 + v2 改字版？v1 是設計師交付的乾淨版本；v2 是營運
> 改字的工作版本。發布前 v2 拿來輸出，v1 作為對照保留。

→ 寫 freewrite 新季節頁時，**必須遵守這個 SECTION 結構**，否則營運
無法接手改字。

## 4. 編號分類學（品牌模板的 6 類）

品牌模板（`3902:223`）的 frame 命名以 **`數字. 名稱_平台`** 規範化：

```
1. 好文精選推薦_IG    ← 編輯精選 carousel
2. 七日書題目_IG_1    ← day-prompt-card 主版（35 instance）
3. 文章金句_IG        ← quote carousel
4. 書後感關鍵字       ← 讀後 keyword viz
5. 講座摘要           ← 講座資訊卡
6. murmur             ← 站內隨筆
```

設計師心中有這 6 類 mental model。**新元件提案時必須對應到這 6 類
之一**，否則需先擴充編號（例如「7. 對話泡泡」），不要無命名亂加。

## 5. 改字工作流（営運手動編輯約束）

每個 season page 都有「**運營改字用**」TEXT 標籤，後接 v2 SECTION
讓營運：

- ✅ 可改：所有 TEXT 內文（季節主題、題目、月份、CTA）
- ✅ 可改：Logo container 內的選擇性元素（dark / white 切換）
- ❌ 不可改：背景 IMAGE（imageHash 鎖死）
- ❌ 不可改：Vector 裝飾（位置、形狀、色）
- ❌ 不可改：版型尺寸（sizes 鎖死）

→ 元件 spec.md 的 Usage rules 必須明確區分「可變」vs「鎖死」。

## 6. 七日書 logo 出現位置

跨 day-prompt-card / season-hero / POAP / activity-banner 觀察：

- **角落，不是中央** — logo 通常在右下、左上角
- **dark 變體用於淺底**、white 變體用於深底（POAP 大滿貫等）
- **不上色**（不為季節 palette 改色）
- **大小錨定**：在 1080×1350 frame 內 logo 約 80-120px 高（基準
  259/119 比例，等比縮放）

## 7. 字型一致性

**`jf-jinxuan` Bold** 是 freewrite 的主要 display 字型，覆蓋：

- POAP 標題（220px）
- Day prompt card 主題（推測 100-180px，待 Phase F 抽證）
- Season hero 標題

**繁中內文**用主 design-system 既有字型（Source Han Sans TC 或
平台預設）。jf-jinxuan **不下放到 body text** — 只用於 display。

## 8. 整年的視覺敘事節奏

從 2024 冬 → 2025 春/夏/秋 → 2025 總結 → 2026 春 看出 freewrite 把
一年作為一個敘事單位：

| 季節            | 敘事角色              |
| --------------- | --------------------- |
| 春              | 萌發 / 季初預告       |
| 夏              | 高峰 / 多月跨度       |
| 秋              | 沉澱（用春天模板）    |
| 8-9 月（兩廳院）| 對外聯名 / 高光時刻    |
| 冬              | 總結前奏              |
| 年度總結        | participant wall + writer wall + stats infographic |
| 週年慶          | 治療性反思（4 themes）|

→ 設計新季節活動時，需了解**這一季在年度敘事中的定位**，避免和
既有季節調性衝突。

## 8 個原則的源頭表

每條原則都來自具體 Figma 證據：

| 原則 | 主要證據                                  |
| ---- | ----------------------------------------- |
| 1    | 全部 15 page MANIFEST 尺寸統計            |
| 2    | 品牌模板 (LINEAR_GRADIENT) vs 季節 (IMAGE)|
| 3    | 2024 冬 (平鋪) vs 2025 春+ (SECTION)      |
| 4    | 品牌模板 6 類命名                          |
| 5    | 「運營改字用」TEXT 在 14/15 季節 page 出現 |
| 6    | logo Figma 抽出後的位置一致性              |
| 7    | POAP MANIFEST + 多季 IG 字型觀察           |
| 8    | 15 page name + 對應活動敘事                |
