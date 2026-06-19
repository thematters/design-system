# Component: Activity Banner

## Overview

**站內活動 banner / 公告欄** — 在 matters.town 站內導引用戶到活動
入口的橫式 banner。是 freewrite 中最 utilitarian 的元件，不是行銷
hero、是站內 navigation 的一部分。

## Source

幾個 page 都有 activity-banner 變體：

| Source                     | Frame           | 尺寸      | imageHash   |
| -------------------------- | --------------- | --------- | ----------- |
| 自由寫：週年慶 `4680:2`    | 活動頁banner ×2 | 688 × 160 | `187a64e3…` |
| 自由寫：週年慶 `4680:2`    | 公告欄 ×1       | 688 × 112 | `f4c5d3d4…` |
| 自由寫：兩廳院 `5047:2`    | 活動頁banner ×5 | 688 × 160 | `a351328b…` |
| 自由寫：用戶模板 `4973:26` | Cover ×6        | 688 × 160 | 6 種不同    |

→ **688 × 160** 是 matters.town 圍爐 / 個人頁封面 banner 的固定規格。

## Variants

| Variant         | 尺寸      | 用途                                      |
| --------------- | --------- | ----------------------------------------- |
| Activity banner | 688 × 160 | 活動入口 banner（多季 / 多活動）          |
| 公告欄          | 688 × 112 | 站內公告（更小、更簡潔）                  |
| 用戶 Cover      | 688 × 160 | 用戶可選的圍爐 banner（活動推廣後可下載） |

## Asset files

- [`brand/sources/figma/cc-branding/exports/freewrite/anniversary/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/anniversary/page-preview.png) — 含 banner 視圖
- [`brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-aug-sep-tcc/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/seasonal/2025-aug-sep-tcc/page-preview.png) — 兩廳院 banner 視圖
- [`brand/sources/figma/cc-branding/exports/freewrite/user-templates/page-preview.png`](../../../brand/sources/figma/cc-branding/exports/freewrite/user-templates/page-preview.png) — 6 個用戶 banner

## Layout 結構

```
frame 688 × 160 (or 688 × 112 公告欄)
├── 背景：IMAGE fill（活動主視覺、簡化版）
├── TEXT 標題（短，<10 中文字）
├── TEXT 副標 / CTA（更小，可選）
└── 可選：七日書 logo（右下 / 左上）
```

## Tokens used

待 Phase F 進階抽取。預期 banner 字型較**小**（24-40px）而非 hero 的
220px，因 banner 必須在 small viewport / sidebar 也清晰可讀。

## Usage rules

- **688 × 160 是 matters.town 站內固定規格** — 不可改尺寸，否則會
  被站內 layout 切掉或留白
- 文字必須**至少 24 px**（最小 mobile readable size），考慮到圍爐
  下方還會疊用戶頭像、勿放重要資訊在底部 24 px
- Banner image 區的**主視覺須左偏**（右側留給可能疊加的 site UI）
- 公告欄（688×112）字型應更精簡，**只放單一訊息**

## 與 user-templates 的關係

`user-templates/` page 提供 **6 個 ready-to-use 用戶 Cover** — 用戶
可從中選一個用為自己圍爐的 banner，**這 6 張就是 freewrite 設計師
製作的「activity-banner pack 1」**。

未來 Matters Studio（Phase 9 spec）應提供：

- 一個 banner 編輯器讓用戶從 freewrite-bg-pack-1 選背景
- 自填標題、副標
- 直接用為個人圍爐 banner

## Phase F 進階待補

1. 抽 6 張 user-templates Cover 的個別 PNG → freewrite-banner-pack-1
2. 抽 688 × 112 公告欄結構 → 單獨子元件 `activity-announcement`
3. 對照活動頁 banner（兩廳院 `a351328b…` 與週年慶 `187a64e3…` ） 看
   兩個大型 campaign 用同一套規格 / 不同 imageHash 的設計選擇

## 周邊組件

- Season hero `components/freewrite/season-hero/` — banner 是 hero 的 站內小版本
- Day prompt card `components/freewrite/day-prompt-card/` — banner 引用戶到 day prompt 的入口
- Badge `components/freewrite/badge/` — 用戶完成活動後得到 banner + badge 雙獎勵
