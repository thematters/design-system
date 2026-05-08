# Freewrite Illustration Style

從 15 個 freewrite / 七日書 page 的 hero / 背景 / 裝飾元素歸納的
插畫風格特徵。

## 1. 兩種視覺語彙

### A. 抽象 scribble（裝飾向量）

POAP frame 的兩個裝飾向量是 freewrite 抽象視覺語彙的**最 canonical
範例**：

- 線條：自由曲線、像鋼筆連寫的抽象 scribble
- 色彩：mid-blue `#0F76B7`
- 用途：角落裝飾、不主導畫面
- 幾何：viewBox 656×490 / 718×409，非對稱、有「手感」

→ [`brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/decorative-scribble-bottom-left.svg`](../../brand/sources/figma/cc-branding/exports/freewrite/seven-day-book/poap/decorative-scribble-bottom-left.svg)
是這個風格的 reference SVG。

新插畫須**保留這種「人手書寫感」**，避免過於幾何 / 規則 / 
illustration-y 的 vector style。

### B. 紋理化 raster 背景（imageHash 系列）

季節 hero、POAP 背景、user-templates Cover 都用 IMAGE fill 而非
SVG。觀察特徵：

- **不是純色** — 都有微紋理（紙張、雜訊、漸層、模糊筆觸等）
- **柔和飽和度** — 避開過鮮豔的色彩
- **留白為主** — 主視覺通常上半部留空，給文字置入

對應 imageHash 範例：

- `7e04d167…`（POAP 參加獎）— 淺色紋理、可能米白底
- `b28b5ace…`（POAP 大滿貫）— 深色紋理
- `e42d919d…`（2025 夏）— 綠調
- `1ffa4466…`（2025 秋 IG_題目）— 秋調
- `85bb0af6…`（週年慶 4 themes）— 治療性氛圍

## 2. 風格 do's

### Do

1. **保留手寫 / 手繪感** — POAP scribble、文字書法感
2. **柔和色域** — 中飽和、避免過於鮮明
3. **留白 + 紋理** — 不要用純色 flat
4. **季節辨識度** — 每季 hero 須有獨特色彩 / 元素，但用相同的「手感」
5. **七日書 logo 角落定位** — 不放中央，避免和主視覺競爭

### Don't

1. **不要扁平向量插畫**（flat illustration like Vecteezy / unDraw）—
   freewrite 屬於文學寫作社群，扁平商業插畫破壞調性
2. **不要 emoji-style 插畫**（圓角、漸層、皮克斯感）
3. **不要使用 stock photo**（人臉、城市等真實照片）— 失去手感
4. **不要太多元素**（busy）— freewrite 是 contemplative 寫作活動，
   視覺須安靜
5. **不要全頁覆滿紋理** — 必須留空間給文字

## 3. 7+ 個季節 hero 的視覺特徵

從 15 個 page 的 page-preview.png 整理（細節見每個 page 的 MANIFEST）：

| Season               | 觀察                                              |
| -------------------- | ------------------------------------------------- |
| 2024 冬              | 深冷色，每張 hero 獨立背景（pre-engineering 期）   |
| 2025 春              | 春色淺綠 + 米白，**設計工程化開始**               |
| 2025 夏              | 綠調主導，跨月變體（6/7/8 月）                     |
| 2025 秋              | **使用春天模板**，只換 imageHash，無新插畫        |
| 2025 8-9（兩廳院）    | 多了 1920×1440 wide format，外部聯名所以視覺更formal |
| 2025 總結            | 主視覺（宣言大圖）`5495:4` — 年度敘事 hero        |
| 2026 春              | 春色（待抽 dominant color）                        |

→ 設計新季節 hero 時，建議參照前一年同季 hero 而非當前所有 hero
平均，以保持季節辨識度。

## 4. user-templates 的 6 張背景包（freewrite-bg-pack-1）

[`brand/sources/figma/cc-branding/exports/freewrite/user-templates/MANIFEST.md`](../../brand/sources/figma/cc-branding/exports/freewrite/user-templates/MANIFEST.md)
記載 6 個 ready-to-use Cover 各有獨立 imageHash。

這 6 張可視為 **freewrite 的 background asset pack 1**，已經被「正式
發布」給用戶 / 站方使用。Phase F 進階待從 image-2 prompt 反推這 6
張的 generation params。

## 5. AI 背景圖的 prompt 起點

[`docs/cc-branding-image2-prompts.md`](../cc-branding-image2-prompts.md)
（baseline commit 已加）內有 OpenAI Image 2 的 freewrite 分類起點
prompt。當設計師需要新插畫時：

1. 先看 [`brand/sources/figma/cc-branding/exports/freewrite/`](../../brand/sources/figma/cc-branding/exports/freewrite/)
   有沒有可用的既有素材
2. 沒有就用 `pnpm visual:create` + `templates/ai-background-card/` 從
   AI 生成
3. AI 生成後**必須由設計師 review** — AI 容易給出 flat illustration
   或 over-saturated 結果，違反此處的 style do/don't

## 6. 對 freewrite landing page 的暗示

從 2025 總結頁觀察，七日書 landing 的視覺敘事應有：

```
[hero]                  ← season-hero（手感、留白、季節色）
[stats infographic]     ← 數據圖：手繪數字 / 微表格
[writers wall]          ← 邀約過的 14 位作家集結圖（grid 名片）
[quote carousel]        ← 作家金句圖（黑底大字）
[reflection cards]      ← 書後感文字圖
[keywords hero]         ← keywords 主題視覺
[participant wall]      ← Comments Review × N
[CTA]                   ← 下一季預告 banner
```

每個 section 對應的視覺語言已在 `2025-summary` MANIFEST 中標出。

## Phase F 進階待補

1. 抽每個季節 hero 的 dominant color（用 `node-vibrant` 或類似）
2. 整理 `freewrite-bg-pack-1` 6 張的 image-2 prompts
3. 加入 Storybook 一個「Illustrations / Hero gallery」頁面，集中
   所有季節 hero 預覽

## 參考

- [`templates/ai-background-card/`](../../templates/ai-background-card/)
  — AI 背景圖生成 + Matters typography overlay 的 pipeline
- [`scripts/generate-background.mjs`](../../scripts/generate-background.mjs)
- [`docs/cc-branding-image2-prompts.md`](../cc-branding-image2-prompts.md)
