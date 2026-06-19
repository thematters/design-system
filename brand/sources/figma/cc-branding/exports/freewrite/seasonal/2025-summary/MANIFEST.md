# 自由寫：2025 總結

從 Figma `CC & Branding` page `↳ 自由寫：2025 總結` (`5495:2`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `5495:2`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5495-2
- Extracted: 2026-05-08
- 子節點：36 全部是 1080 × 1350 IG portrait

## 概念

自由寫 **2025 年度總結**素材集 — 全部以 IG portrait (1080×1350) 為原生
尺寸，是一系列**回顧型輪播圖**，由站內團隊向社群發布。

> **這頁是 `participant-wall` 元件的主要設計來源** — 12 個 "Comments
> Review" frame 共用 imageHash `62513104…`，每個 4 children，幾乎肯定
> 是用戶評論牆的版型。

## 結構分類

| 群組                   |   數量 | imageHash   | 子節點 | 角色                                   |
| ---------------------- | -----: | ----------- | ------ | -------------------------------------- |
| 主視覺（宣言大圖）     |      2 | `e9e287cf…` | 3      | hero 開場宣言                          |
| 數據圖                 |      2 | `d6280c5a…` | **16** | 統計 infographic                       |
| 邀約過的14位作家集結圖 |      2 | `fd423767…` | 15     | 14 作家名片牆                          |
| 作家金句圖             |      6 | `def63698…` | 3      | 名言金句卡（6 instance 同模板）        |
| 書後感文字圖           |      6 | `a1cbca62…` | 3      | 讀後感（6 instance 同模板）            |
| keywords 圖\_1         |      2 | `ad7c61d0…` | 15     | 關鍵字主題視覺（密集）                 |
| keywords 圖\_2         |      2 | `38971b02…` | 9      | 關鍵字主題視覺                         |
| keywords 圖\_3         |      2 | `02f674fa…` | 6      | 關鍵字主題視覺                         |
| **Comments Review**    | **12** | `62513104…` | 4      | **用戶評論牆 ← participant-wall 主源** |

> Comments Review × 12：12 instances 共用同一個 imageHash 與相同子節點
> 結構 — 強烈暗示這是**用戶評論的批量產出版型**：每個 frame 一條
> 用戶評論，4 個 children 可能對應 [背景紋理 / 評論文字 / 用戶頭像 /
>
> > 用戶名]。這是 `participant-wall` 元件的決定性樣本。

## 已抽出資產

- [`page-preview.png`](page-preview.png) — Page 全景縮圖 (1024×718)

## Phase F 待補（**這頁對 landing page 設計影響最大**）

1. **`components/freewrite/participant-wall/spec.md`** 主要 source ←
   抽 12 個 Comments Review frame 的子節點，歸納 4-slot template
2. 「邀約過的14位作家集結圖」的 15 children 結構 — 會是 landing 上
   作家集結牆的版型
3. 抽 9 種年度回顧視覺類別（hero + stats + writers + quotes + reflections
   - keywords + comments）— 這是**年度活動 landing page 的完整內容地圖**

## 對 freewrite landing page 的暗示

從 2025 總結看，七日書 / freewrite 的 **landing page 內容架構**應有：

1. Hero（主視覺宣言大圖）
2. 數據圖（活動成果 stats）
3. 作家集結牆（contributing writers）
4. 金句精選（quote carousel）
5. 讀後感（writer reflections）
6. 關鍵字（topic keywords）
7. **用戶評論牆（participant wall）** ← 12 frame 量級
8. CTA（下一季預告）

這 8 段對應 `apps/page-templates/activity-landing/` 既有的 hero /
participant wall / day prompts / entries grid / FAQ / CTA 結構，可
直接 mapping。

## 周邊頁面

- 自由寫：2025 春 / 夏 / 秋 / 8-9月 — 此頁總結這一年的活動
- 自由寫：品牌模板 `3902:223` — 視覺基底
