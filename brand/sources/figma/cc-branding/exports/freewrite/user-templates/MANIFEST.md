# 自由寫：用戶使用的活動模板

從 Figma `CC & Branding` page `↳ 自由寫：用戶使用的活動模板` (`4973:26`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `4973:26`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=4973-26
- Extracted: 2026-05-08

## 概念

**給用戶（matters.town 站民）自助使用**的活動素材模板。和其他 freewrite
頁不同，這頁的版型已是「成品」、不是模板半成品 — 每個 frame 用獨立的
`imageHash` 背景圖。

## 結構（12 frames）

| 區塊   | 數量 | 尺寸        | 用途                                  |
| ------ | ---: | ----------- | ------------------------------------- |
| Cover  |    6 | 688 × 160   | Matters.town 圍爐 / 個人頁封面 banner |
| Poster |    6 | 1200 × 1200 | 方形社群分享圖                        |

每個 Cover / Poster 各有獨立的 `imageHash`（12 個不同背景圖）：

| Frame ID   | 名稱   | 尺寸        | imageHash   |
| ---------- | ------ | ----------- | ----------- |
| `4973:27`  | Cover  | 688 × 160   | `9bd17a98…` |
| `4973:35`  | Cover  | 688 × 160   | `a1cdaa76…` |
| `4973:43`  | Cover  | 688 × 160   | `32d5d87e…` |
| `4973:51`  | Cover  | 688 × 160   | `8a825079…` |
| `4973:59`  | Cover  | 688 × 160   | `fb725cb2…` |
| `4973:67`  | Cover  | 688 × 160   | `caf6d3de…` |
| `4973:75`  | Poster | 1200 × 1200 | `8003f049…` |
| `4973:87`  | Poster | 1200 × 1200 | `ee5d3fe7…` |
| `4973:99`  | Poster | 1200 × 1200 | `89e40cd6…` |
| `4973:111` | Poster | 1200 × 1200 | `43659905…` |
| `4973:123` | Poster | 1200 × 1200 | `d98cc3d7…` |
| `4973:135` | Poster | 1200 × 1200 | `eed2ece3…` |

## 已抽出資產

- [`page-preview.png`](page-preview.png) — Page 全景縮圖 (1024×206)

> Cover (688×160) 對應 Matters.town 圍爐 banner 規格；Poster (1200×1200)
> 對應 social card 1080+ 規格。後續抽 hero 圖時應一張張個別匯出 PNG，
> 並在元件 spec `components/freewrite/activity-banner/` 標註尺寸用途。

## Phase F 待補

- 抽 6 張 Cover + 6 張 Poster 為個別 PNG（commit 進此目錄）
- 把這 12 個背景視為 `freewrite-bg-pack-1` 主題包
- 在 `docs/freewrite-design-system/illustration-style.md` 歸納風格特徵
- 對照 `templates/ai-background-card/` 的 OpenAI 背景圖 pipeline 看
  能否從這 12 張用 image-2 prompt 反推風格參數

## 周邊頁面

- 自由寫：品牌模板 `3902:223` — base brand template
- 自由寫：週年慶 `4680:2` — 大型活動素材，與此頁形成「平日模板 vs 大活動」對比
