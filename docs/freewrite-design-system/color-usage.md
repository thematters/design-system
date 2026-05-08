# Freewrite Color Usage

freewrite 用色規則與既有 `--color-freewrite-*` opt-in palette 的延伸。

## 既有的 4 個 token（已 ship）

主 design-system 的 [`packages/tokens/dist/freewrite.css`](../../packages/tokens/dist/freewrite.css)
已 ship 4 個 opt-in token（PM 2026-04-24 拍板，見 `packages/tokens/tokens.json`）：

| Token                                | Value     | 用途                                                   |
| ------------------------------------ | --------- | ------------------------------------------------------ |
| `--color-freewrite-background`       | `#F0F9FE` | 七日書 landing 區塊淺底                                |
| `--color-freewrite-text`             | `#1999D0` | CTA hover、次要 accent、強調文字（≥18pt 時可用）       |
| `--color-freewrite-text-dark`        | `#045898` | **主 CTA 按鈕底色、連結色、eyebrow、今日高亮、focus ring**（11.5:1 AAA） |
| `--color-freewrite-border`           | （待補）  | （需從 packages/tokens/tokens.json 確認）              |

這 4 個 token 是 [`docs/handoff-specs/seven-day-book-landing.md`](../handoff-specs/seven-day-book-landing.md)
Direction C 小鎮 Commons 設計的依據。

## 從 Figma 抽出的延伸色（**not yet token**）

從 15 個 freewrite page 的 Figma 檔抽出，**主 design-system 4 token
之外的真實使用色**：

### POAP 系統色（鏈上）

POAP 用了和 freewrite 標準藍**不同**的藍：

| 角色             | 從 Figma 抽出色 | 既有 token 的接近色          | 差異          |
| ---------------- | --------------- | ---------------------------- | ------------- |
| POAP 文字深藍    | `#07294b`       | `--color-freewrite-text-dark` (`#045898`) | **更深、更暗** |
| POAP Label 中藍  | `#0f76b7`       | `--color-freewrite-text` (`#1999D0`)      | **更深** |
| POAP 裝飾線藍    | `#0F76B7`       | 同上                                       | 同上     |
| POAP 大滿貫亮黃  | `#ffe367`       | （無）                                     | 唯一暖色 |

→ 建議延伸 token：

```
--color-freewrite-poap-text     #07294b
--color-freewrite-poap-accent   #0f76b7
--color-freewrite-poap-highlight #ffe367
```

### 週年慶治療性主題色

[`brand/sources/figma/cc-branding/exports/freewrite/anniversary/MANIFEST.md`](../../brand/sources/figma/cc-branding/exports/freewrite/anniversary/MANIFEST.md)
記載 4 個主題反思 frame 共用 imageHash `85bb0af6c…`。色彩待 Phase F
進階抽 image dominant color 後補：

- 感到重生、獲得治癒
- 理解自己、面對自己
- 陪伴
- 獲得指引（探險、感到自由）

### 季節 hero 主色（每季獨立）

每季 hero 用 IMAGE fill，色彩不在 token 系統中（imageHash 唯一識別）。
但 dominant color 可作為「季節 accent」延伸 token：

| Season    | imageHash 觀察      | 推測主色          | 預擬 token                         |
| --------- | ------------------- | ----------------- | ---------------------------------- |
| 2024 冬   | （多 imageHash）    | 深藍 / 白         | `--color-freewrite-season-2024-winter` |
| 2025 春   | `f178f939…` 等      | 淺綠 / 米白       | `--color-freewrite-season-2025-spring` |
| 2025 夏   | `e42d919d…`         | 綠 / 黃           | `--color-freewrite-season-2025-summer` |
| 2025 秋   | `1ffa4466…`         | （沿用春）         | `--color-freewrite-season-2025-autumn` |
| 2026 春   | `a942a797…`         | 春色（待抽）       | `--color-freewrite-season-2026-spring` |

→ Phase F 進階抽每張 hero 的 dominant color 後，這套 token 才能落實。

## 推薦的擴張策略

不要把 freewrite 從 4 個 token 一次擴成 30 個。建議分批：

### 批次 1：POAP 系統色（高優先）

POAP 是 freewrite 對外**永久存在的鏈上資產**，色彩不能漂移。建議
立刻加入 3 個 token：`poap-text` / `poap-accent` / `poap-highlight`。

### 批次 2：季節 accent（中優先）

每季新增 1 個 `season-{year}-{quarter}` token，由設計師於季初
defining。同期 Storybook freewrite 頁加 swatch grid。

### 批次 3：週年慶 / 總結 / 兩廳院 等專屬主題（低優先）

這些是 1 次性 campaign，加 token 反而增加 maintenance 成本。改用
**inline custom property** 或在元件 spec 寫死即可。

## 用色限制（不要做的事）

1. **不要把 brand canonical（`#7258FF` 紫 + `#C3F432` 綠）放到 freewrite
   surface**。這兩色是 matters.town 主品牌色，freewrite 為不同域。
2. **不要在 freewrite 內用 `--color-freewrite-*` 之外的 brand palette**。
   Phase 3 的 isolation 設計刻意把 freewrite 隔離，避免品牌溢出。
3. **不要為 day-prompt-card 的 LINEAR_GRADIENT 換成 brand 紫綠**。
   gradient 設計屬於 freewrite 域，與 brand canonical 不同色域。
4. **不要新增半透明灰 alpha 變體**而不文件化 — 跨季節會 drift。

## A11Y 對比度（既有規範）

`--color-freewrite-text-dark` (`#045898`) on white = **11.5:1**（AAA）。

擴張 token 必須通過：

- text on background：≥ 4.5:1（AA）
- text 18pt+ 或 14pt bold：≥ 3:1（AA Large）
- non-text UI：≥ 3:1

POAP 文字 `#07294b` on light texture（待 dominant color 確認）對比度
**估計 13:1+**（AAA）。POAP `#ffffff` on dark grand-slam texture 對比
度需驗證。

## 參考

- [`packages/tokens/tokens.json`](../../packages/tokens/tokens.json)
  — token canonical 來源
- [`apps/storybook/src/tokens/Freewrite.mdx`](../../apps/storybook/src/tokens/Freewrite.mdx)
  — Storybook 視覺化頁
- [`docs/handoff-specs/seven-day-book-landing.md`](../handoff-specs/seven-day-book-landing.md)
  — Direction C 用色決定
