# Freewrite Component Index

所有 freewrite 專屬元件規格的索引。

## 元件清單

| 元件                                                                    | 主 Figma 來源                  | Spec                                                                                    | 狀態    |
| ----------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------- | ------- |
| [七日書 Logo](../../components/freewrite/logo-seven-day-book/spec.md)   | `5646:972` 七日書 Logo         | [`logo-seven-day-book/spec.md`](../../components/freewrite/logo-seven-day-book/spec.md) | ✅ 完整 |
| [POAP](../../components/freewrite/poap/spec.md)                         | `5646:982` 七日書 POAP         | [`poap/spec.md`](../../components/freewrite/poap/spec.md)                               | ✅ 完整 |
| [Badge](../../components/freewrite/badge/spec.md)                       | `3501:230` 徽章                | [`badge/spec.md`](../../components/freewrite/badge/spec.md)                             | ⚠️ 概要 |
| [Day Prompt Card](../../components/freewrite/day-prompt-card/spec.md)   | `3902:223` "2." (35), Q2, 70題 | [`day-prompt-card/spec.md`](../../components/freewrite/day-prompt-card/spec.md)         | ✅ 完整 |
| [Participant Wall](../../components/freewrite/participant-wall/spec.md) | `5495:2` Comments Review (12)  | [`participant-wall/spec.md`](../../components/freewrite/participant-wall/spec.md)       | ✅ 完整 |
| [Season Hero](../../components/freewrite/season-hero/spec.md)           | 7 季節 page                    | [`season-hero/spec.md`](../../components/freewrite/season-hero/spec.md)                 | ✅ 完整 |
| [Activity Banner](../../components/freewrite/activity-banner/spec.md)   | 週年慶 / 兩廳院 / 用戶模板     | [`activity-banner/spec.md`](../../components/freewrite/activity-banner/spec.md)         | ✅ 完整 |

## 與品牌模板 6 類的對應

freewrite 品牌模板（`3902:223`）的編號 1-6 分類學跟此 7 個元件的關係：

| 品牌模板分類            |   數量 | 對應元件                                                     |
| ----------------------- | -----: | ------------------------------------------------------------ |
| 1. 好文精選推薦\_IG     |     22 | （未開 spec — 推測歸屬於主 design-system feature-card 範疇） |
| **2. 七日書題目\_IG_1** | **35** | **`components/freewrite/day-prompt-card/`** ← 主源           |
| 3. 文章金句\_IG         |     18 | （未開 spec — quote-card 候選元件）                          |
| 4. 書後感關鍵字         |      2 | （未開 spec — keyword-viz 候選元件）                         |
| 5. 講座摘要             |      6 | （未開 spec — 兩廳院 page 也有作家講座變體，可合併）         |
| 6. murmur               |      4 | （未開 spec — 站內隨筆元件）                                 |
| Avatar                  |      7 | （subset of badge/default-image 範疇）                       |
| FB Cover                |      7 | **`components/freewrite/season-hero/` 變體**                 |
| Newsletter Cover        |      2 | （主 design-system 已有 `templates/newsletter-header/`）     |
| Conversation            |      6 | （未開 spec — 對話泡泡候選元件）                             |

→ **Phase G 後續工作建議**：開 4 個新元件 spec：

1. `freewrite-quote-card`（品牌模板 3.）
2. `freewrite-feature-article-card`（品牌模板 1.）
3. `freewrite-keyword-viz`（品牌模板 4.）
4. `freewrite-conversation`（品牌模板 Conversation）

## 元件之間的依賴

```
七日書 Logo
   ↓ 必含
POAP, Day Prompt Card, Season Hero, Activity Banner

Season Hero
   ↓ 縮小變體
Activity Banner

Day Prompt Card
   ↓ 多月變體
跨 7 季節 page

Participant Wall
   ↓ 與 ArticleCard meta slot 概念上姊妹
   → 實作時可考慮共用 React 基類

Badge ↔ POAP
   双向關係：站內 vs 鏈上
```

## 元件 / 版型 reuse 矩陣

哪個元件出現在哪些 page：

|             | logo | POAP | Badge | Day Prompt | Participant | Season Hero | Activity Banner |
| ----------- | :--: | :--: | :---: | :--------: | :---------: | :---------: | :-------------: |
| 七日書 Logo |  ✅  |  ✅  |       |     ✅     |             |     ✅      |       ✅        |
| 七日書 POAP |      |  ✅  |       |            |             |             |                 |
| 徽章 page   |      |      |  ✅   |            |             |             |                 |
| 品牌模板    |      |      |       |   ✅(35)   |             |             |                 |
| Q2 模板     |  ✅  |      |       |   ✅(16)   |             |     ✅      |                 |
| 70 題       |      |      |       |   ✅(20)   |             |             |                 |
| 各季節 page |      |      |       |     ✅     |             |     ✅      |                 |
| 週年慶      |      |      |       |            |             |             |       ✅        |
| 兩廳院      |      |      |       |     ✅     |             |     ✅      |       ✅        |
| 用戶模板    |      |      |       |            |             |             |      ✅(6)      |
| 2025 總結   |      |      |       |            |   ✅(12)    |     ✅      |                 |
| 2026 春     |      |      |       |     ✅     |             |     ✅      |                 |

## 對 七日書 landing page 改版的優先順序

從元件成熟度（spec 完整度）+ 出現頻率排序，七日書 landing 改版時
**優先處理**：

1. **Day Prompt Card**（最常見、規格最清晰，35+ instance）
2. **Season Hero**（landing first impression）
3. **Participant Wall**（最有 social proof 力道、12 instance 證據）
4. **七日書 Logo**（必有，但元件已穩定）
5. POAP（如 landing 含 reward 段）
6. Activity Banner（landing → matters.town 站內路徑）
7. Badge（如 landing 引用站內徽章）

## 周邊文件

- [`layout-principles.md`](layout-principles.md) — 版型規則
- [`typography.md`](typography.md) — 字型規則
- [`color-usage.md`](color-usage.md) — 色彩規則
- [`illustration-style.md`](illustration-style.md) — 插畫風格
- [`seasonal-themes.md`](seasonal-themes.md) — 各季索引
- [`README.md`](README.md) — 總覽入口
