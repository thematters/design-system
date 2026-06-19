# 七日書 POAP

從 Figma `CC & Branding` page `↳ 七日書 POAP` (`5646:982`) 抽出。

- File: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Page node: `5646:982`
- Open in Figma: https://www.figma.com/design/HQ5Y6bBc9dVDT99u8Qvkb5/CC---Branding?node-id=5646-982
- Extracted: 2026-05-08

## 概念

POAP = "Proof of Attendance Protocol"，七日書活動完賽 / 參加紀念區塊鏈
徽章。本頁含兩個獎勵層級：

- **參加獎**（participation prize）— 完成 1+ 篇即可獲得
- **大滿貫**（grand slam）— 連續完成 7 天

## Frames

| File                                                                       | Figma node | 尺寸      | 角色                     | 標題範例（content） |
| -------------------------------------------------------------------------- | ---------- | --------- | ------------------------ | ------------------- |
| [`operations-text-edit__5652-267.png`](operations-text-edit__5652-267.png) | `5652:267` | 2000×2000 | 參加獎模板（給營運改字） | 「氣味博物館」      |
| [`participation-prize__5658-2.png`](participation-prize__5658-2.png)       | `5658:2`   | 2000×2000 | 參加獎（已填好標題）     | 「數位雲端的我」    |
| [`grand-slam__5658-12.png`](grand-slam__5658-12.png)                       | `5658:12`  | 2000×2000 | 大滿貫（深底版）         | 「數位雲端的我」    |
| [`grand-slam-alt__5666-3.png`](grand-slam-alt__5666-3.png)                 | `5666:3`   | 2000×2000 | 大滿貫（替代版本）       | （內容待校對）      |

## 共用結構（每個 frame）

```
frame (2000×2000, IMAGE fill = textured background)
├── TEXT  「{季節主題名}」  jf-jinxuan Bold 220px  center  (top-half)
├── FRAME "Label"     單色矩形 button-like 區塊       (mid)
├── FRAME "Logo"      七日書 logo 容器                (top, 預設不可見 fill)
├── VECTOR "Vector 1" 左下角抽象 scribble  #0F76B7
└── VECTOR "Vector 2" 右上角抽象 scribble  #0F76B7
```

## Color tokens

| 角色           | 參加獎                | 大滿貫            |
| -------------- | --------------------- | ----------------- |
| 背景           | 紋理底圖（淺底）      | 紋理底圖（深底）  |
| 標題文字       | `#07294b`（深海軍藍） | `#ffffff`（白）   |
| Label 區塊填色 | `#0f76b7`（中藍）     | `#ffe367`（亮黃） |
| 裝飾 scribble  | `#0F76B7`             | `#0F76B7`         |

> 注意：背景圖以 Figma `imageHash` 引用（`7e04d167...` 用於參加獎與營運改字
> 樣板；`b28b5ace...` 用於 大滿貫）。原始紋理素材未在本層 commit
> （受 .gitignore `cache/` 規則阻擋）；要還原時從 Figma 點擊 frame 的 fill
> 直接 export 紋理 PNG，存至 `seven-day-book/poap/textures/`。

## Typography

| 場景 | Family               | Style | Size  | Color (參加獎/大滿貫) | Align  |
| ---- | -------------------- | ----- | ----- | --------------------- | ------ |
| 標題 | `jf-jinxuan`（金萱） | Bold  | 220px | `#07294b` / `#ffffff` | center |

字型注意：`jf-jinxuan` 為 justfont 商用字型。本 repo 不含字型檔；網站
端的 web font 與印刷端的 OTF 授權須由 Matters 走獨立合約。詳見
`docs/freewrite-design-system/typography.md`（Phase G 撰寫）。

## 裝飾向量

兩個抽象線條 scribble 重複出現在 4 個 frame 的左下與右上，幾何完全
一致（座標相同、僅 fill 沿用 `#0F76B7`）。已抽出為共用 SVG：

- [`decorative-scribble-bottom-left.svg`](decorative-scribble-bottom-left.svg) — `5658:10` 等價，656×490 viewBox
- [`decorative-scribble-top-right.svg`](decorative-scribble-top-right.svg) — `5658:11` 等價，718×409 viewBox

> 大滿貫 frame 的 Vector 1（`5658:20`）幾何**不同**於參加獎版（`5658:10`），
> 位置與形狀都改了 — 待 Phase F 補抽 `grand-slam-scribble-*.svg`。

## Phase F 待辦

- 抽 Logo container `5652:271 / 5658:6 / 5658:16` 內部結構（七日書 logo 在 POAP 內如何上色與縮放）
- 抽 Label container 內部（label 上的文字內容）
- 對照 `5666:3` 與 `5658:12` 兩版大滿貫的差異
- 校對 `5666:3` 內的標題文字（本次抽取輸出被截斷）

## 周邊連結

- 七日書 Logo `5646:972` — POAP 內部 Logo container 引用此 logo
- Q2 七日書模板 `5646:2` — 同期 landing 與題目卡素材
- 既有的 `--color-freewrite-*` opt-in palette（藍系）— POAP 用色與此一致風格
