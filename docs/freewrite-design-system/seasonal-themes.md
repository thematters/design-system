# Freewrite Seasonal Themes

每季主題的索引：hero、imageHash、tokens、調性、活動敘事角色。

## 季節索引

| Season                | Page node   | Hero IMAGE imageHash 範例     | 子節點數 | 敘事角色                                                  | 詳細 MANIFEST                                                                                                                 |
| --------------------- | ----------- | ----------------------------- | -------: | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 2024 冬               | `4198:1377` | 多種（pre-template）          |       30 | 萌芽前奏、首次有 freewrite 季節體系                       | [`seasonal/2024-winter/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2024-winter/MANIFEST.md)           |
| 2025 春               | `4249:134`  | `f178f939…`、`14a781fd…`      |     ~190 | **設計工程化的第一季**、SECTION 結構出現                  | [`seasonal/2025-spring/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-spring/MANIFEST.md)           |
| 2025 夏               | `4904:2`    | `e42d919d…`、`87049d6e…`      |       64 | 跨 6/7/8 月的多月活動                                     | [`seasonal/2025-summer/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summer/MANIFEST.md)           |
| 2025 8-9 月（兩廳院） | `5047:2`    | `2c878196…`、`ae4c9b8f…`      |  **166** | **freewrite 史上最大 campaign**，含 1920×1440 wide format | [`seasonal/2025-aug-sep-tcc/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-aug-sep-tcc/MANIFEST.md) |
| 2025 秋               | `5412:6972` | （引用春的 imageHash）        |       31 | 「用春天的模板」 — 版型穩定後的回收                       | [`seasonal/2025-autumn/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-autumn/MANIFEST.md)           |
| 2025 總結             | `5495:2`    | `e9e287cf…`（主視覺宣言大圖） |       36 | 年度回顧 + participant wall                               | [`seasonal/2025-summary/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-summary/MANIFEST.md)         |
| 2026 春               | `5495:203`  | `a942a797…`、`921287c6…`      |       77 | 新一年開季，sister page = Q2 七日書模板                   | [`seasonal/2026-spring/`](../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2026-spring/MANIFEST.md)           |

## 跨季節元件 reuse 表

| 元件             | 2024 冬 | 2025 春 | 2025 夏 | 2025 秋 | 2025 8-9 | 2025 總結 | 2026 春 |
| ---------------- | :-----: | :-----: | :-----: | :-----: | :------: | :-------: | :-----: |
| Day prompt card  |   ✅    |   ✅    |   ✅    |   ✅    |    ✅    |     —     |   ✅    |
| IG Post promo    |   ✅    |   ✅    |   ✅    |   ✅    |    ✅    |     —     |   ✅    |
| FB Cover         |   ✅    |   ✅    |   ✅    |   ✅    |    ✅    |     —     |   ✅    |
| 站上封面 (2000²) |    —    |    —    |    —    |    —    |    —     |     —     | ✅ (Q2) |
| 兩廳院 wide      |    —    |    —    |    —    |    —    |    ✅    |     —     |    —    |
| 作家講座         |    —    |    —    |    —    |    —    |    ✅    |     —     |    —    |
| 徵文版           |    —    |    —    |    —    |    —    |    ✅    |     —     |    —    |
| Participant wall |    —    |    —    |    —    |    —    |    —     |    ✅     |    —    |
| Writers wall     |    —    |    —    |    —    |    —    |    —     |    ✅     |    —    |

## 設計演進關鍵時刻

1. **2024 冬 → 2025 春**：**設計工程化** — 從平鋪 30 frame 到 SECTION
   分群、改字工作流出現、IG/FB 模板分流。版型抽象化從 0 到 1。

2. **2025 春 → 2025 夏**：跨月變體確立 — 一季 = 多月，每月 D1-D8。

3. **2025 夏 → 2025 秋**：**模板重用** — 「用春天的模板」是 freewrite
   設計**穩定**的最強信號。從這刻起設計師資源可以投到 hero / 內容
   而不是版型。

4. **2025 秋 → 2025 8-9（兩廳院）**：**對外品牌正式輸出** — 第一次
   有 1920×1440 wide format、作家講座、徵文版等聯名專屬版型。
   freewrite 從站內活動升級到能對接外部場館。

5. **2025 8-9 → 2025 總結**：**敘事節奏完成** — 一年活動配完整 8
   段年度回顧內容（hero / stats / writers / quotes / reflections /
   keywords / comments / CTA）。

6. **2025 總結 → 2026 春**：**新元件分流** — 2026 春的 SECTION 子節點
   數降回 16（2025 春是 42）— 更精煉的版型。並開出 sister page
   `Q2 七日書模板`，讓「七日書專屬」與「自由寫一般」素材分流。

## 為新季節做設計的 checklist

當設計師為下一季（2026 夏）做 hero / 模板時：

1. ✅ 看上一年同季（2025 夏）建立連續性參考
2. ✅ 看上一季（2026 春）保持品牌調性
3. ✅ 確認新 hero 在 2-3 個尺寸上 OK：1080×1350、1080×1080、2500×925
4. ✅ 寫一個 imageHash mapping 到當季 token 名
5. ✅ 在 `seasonal-themes.md` 表格新增一行
6. ✅ 在 `apps/storybook/src/tokens/Freewrite.mdx` 加 swatch（如新色）
7. ⚠️ 不要重新設計版型（除非有 PM/UX 同意） — 沿用既有 SECTION 結構
8. ⚠️ 不要新尺寸（除非有外部聯名要求）

## Phase F 進階待補

1. 用 `node-vibrant` 之類抽每張 hero 的 dominant color
2. 為每季加 `accent-color`、`mood`、`writer-list`、`activity-anchor` 欄位
3. 把 `dominant-color` 反向關聯回 token 提案表（[`color-usage.md`](color-usage.md)）

## 周邊文件

- [`layout-principles.md`](layout-principles.md) — 版型規則
- [`color-usage.md`](color-usage.md) — 色彩規則
- [`illustration-style.md`](illustration-style.md) — 插畫風格
- [`typography.md`](typography.md) — 字型規則
- [`component-index.md`](component-index.md) — 元件 spec 索引
