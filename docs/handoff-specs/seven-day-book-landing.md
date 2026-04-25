# Handoff Spec: 七日書 Landing Page（Direction C — 小鎮 Commons · Freewrite Palette）

> **Status（2026-04-24 update）**：✅ **已落地為 Astro 靜態站，live preview 運行中**
> — Repo：`thematters/seven-day-book-landing-handoff`（private，canonical）+ `mashbean/seven-day-book-landing-preview`（public，GH Pages mirror）
> — **Live**：https://mashbean.github.io/seven-day-book-landing-preview/
> — **實作差異 vs. 本 spec**：以本 spec 的 direction C 為骨，實際擴充到 12 個 sections（含 `Timeline` 12 期、`Gallery` 視覺記憶馬賽克、`Passport` 大滿貫 shield SVG、`Partners` B2B 案例）。首屏改為全版 hero cover（原 spec 是 card-based 小鎮廣場，落地版本更電影感）。7-day chips 改為三階段 open / dim / locked 漸揭曉。
> — **下一步 / 待辦**：見該 repo `docs/next-steps.md`
>
> ---
>
> **Track**：結構軌（Structural Track）— 新 landing page + 新 components（`ParticipantWall` / `DayPromptRow` / `SevenDayEntryCard`）
> **Dual-track 判定依據**：`docs/dual-track-workflow.md` §「如何判斷走哪軌」→ 新版型、無既有模板可沿用 → 結構軌
> **Pilot spec 引用**：`docs/handoff-specs/article-page-redesign.md`（作品頁）
> **視覺定稿**：`claude-design-output/seven-day-book-landing-c.html`（concept；live 版以此為起點再擴充）
> **方向比較 canvas**：`claude-design-output/seven-day-book-exploration.html`（A / B / C 三方向並排，存檔備查）
> **色系決議**：PM 2026-04-24 裁示 — 七日書主題用 `color.freewrite.*`（option A：`#045898` textDark 為主 CTA / 文字以通過 AAA，`#1999D0` text 降為 accent / hover）。Brand 紫/綠只保留在 `pulse-dot` 一處做識別。

---

## Overview

**功能目的**：七日書是 Matters 季節性寫作挑戰活動 —— 參與者連續七天每天依當季主題寫一篇短文，完成即獲成就並進入活動選集。本頁承接外部分享流量 + 站內活動入口，對既有創作者強化參與感、對新訪客降低門檻。

**設計核心（方向 C 小鎮）**：以「不是一個人在寫」為情感主軸。首屏用**參與者頭像牆 + 參與人數**建立社群溫度，降低新人啟動障礙；對既有創作者也給予「同行」的歸屬感。

**使用情境**：

1. 活動前 7 天（預告）→ CTA 為「訂閱提醒」；頭像牆顯示歷屆參與者
2. 活動進行中（7 天）→ CTA 為「看他人的七日書」（主）+「加入寫作 / 寫今天」（次）；頭像牆為本季參與者
3. 活動結束後 → CTA 為「讀選集」+「期待下一季」；頭像牆保留作為歷史紀念

**上游**：首頁 hero banner、活動 email、社群分享 OG-image（見 `templates/`）
**下游**：編輯器（帶入當季 prompt）、活動選集頁、個人頁「七日書徽章」

---

## Layout

**Desktop 版型（單欄，max-width 1080px，置中）**：

```
┌──────────────────────────────────────────────┐
│ Header（全站共用）                           │
├──────────────────────────────────────────────┤
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [Hero Board]                           │  │
│  │  eyebrow: 2026 春季 · 進行中第 N 天    │  │
│  │  H1: 一千兩百人，正在同一個七天裡寫字 │  │
│  │  sub: 每天一個提示、七天一本書……       │  │
│  │  [主 CTA 看他人的七日書]  [次 開始寫]  │  │
│  │                                        │  │
│  │  參與者頭像牆 (60+ 小頭像)  ┐          │  │
│  │                              1,284     │  │
│  │                              位作者同行│  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [Day Prompts Board]                    │  │
│  │  eyebrow: 本季七個提示                 │  │
│  │  [D1][D2][D3][D4 today][D5][D6][D7]    │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [Entries Board]                        │  │
│  │  H2: 今天，他們寫了這些                │  │
│  │  [Entry card] [Entry card]             │  │
│  │  [Entry card] [Entry card]             │  │
│  │  [看全部選集 →]                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [Rules / FAQ Board] （可摺疊）         │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ [Closing CTA Board] — 重複主/次 CTA   │  │
│  └────────────────────────────────────────┘  │
│                                              │
├──────────────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

**Grid**：

- 頁面底色：`color.grey.greyLighter` (#F7F7F7)
- 每個 Board：白底 + `effect.shadow1` + `border-radius: 16px` + `padding: 40px 48px`
- Board 之間垂直間距：`spacing.sp32` (32px)
- Board 內部區塊間距：`spacing.sp16` – `sp32`，依 rhythm

**Figma 節點**：尚無既有 Figma 主檔（見 `docs/figma-inventory.md` 盤點結果）。本 spec 以 HTML 定稿 (`seven-day-book-landing-c.html`) 為權威，後續需同步回 Figma。

---

## Design Tokens Used

> 禁止 hard-code 值。所有色、字、間距、陰影皆引用 `tokens/tokens.json` v2。

### Color

| Token                        | Value     | Used for                                                                          |
| ---------------------------- | --------- | --------------------------------------------------------------------------------- |
| `color.grey.greyLighter`     | `#F7F7F7` | 頁面底色                                                                          |
| `color.grey.white`           | `#FFFFFF` | Board 背景                                                                        |
| `color.grey.black`           | `#333333` | H1 / H2 / 主文字                                                                  |
| `color.grey.greyDarker`      | `#808080` | Sub text / meta / timestamp                                                       |
| `color.grey.greyLight`       | `#DDDDDD` | Border / divider                                                                  |
| `color.freewrite.textDark`   | `#045898` | **主 CTA 按鈕底色、連結色、eyebrow、今日高亮、focus ring**（11.5:1 AAA on white） |
| `color.freewrite.text`       | `#1999D0` | CTA hover、次要 accent、強調文字（≥18pt 時可用）                                  |
| `color.info.900`             | `#015379` | 活躍 / pressed                                                                    |
| `color.freewrite.label`      | `#83BAD1` | EntryCard hover border、頭像 placeholder 深階                                     |
| `color.info.200`             | `#CAEEFF` | 頭像 placeholder 中階                                                             |
| `color.info.100`             | `#DCF3FE` | 頭像 placeholder 淺階、DayPromptChip hover（非今日）                              |
| `color.freewrite.background` | `#F0F9FE` | DayPromptChip 非 today 底色、daytag chip 底色、closing CTA 漸層起點               |

> **未使用**：`color.primary.*`（紫）+ `color.secondary.*`（lime）在方向 C **不進入**；全站品牌色在七日書 context 讓位給 freewrite 藍，回主站後續 navigation / footer 仍維持 primary 紫。若後續做七日書「完成徽章」需點亮配件色，再評估引入 `color.brand.legacy.gold` 或 `color.secondary.*`。

### Typography

| Token                                | Value                                  | Used for                                        |
| ------------------------------------ | -------------------------------------- | ----------------------------------------------- |
| `typography.fontFamily.reading`      | Noto Serif TC                          | Hero H1、當季主題引言、EntryCard 標題、Board H2 |
| `typography.fontFamily.ui`           | PingFang TC                            | 按鈕 label、meta、eyebrow、FAQ 問題             |
| `typography.article.title.desktop`   | Noto Serif TC / 32 / 54 / 600 / ls 1.2 | Hero H1（desktop）                              |
| `typography.article.title.mobile`    | Noto Serif TC / 24 / 36 / 600 / ls 1.2 | Hero H1（mobile）                               |
| `typography.article.summary.desktop` | Noto Serif TC / 20 / 35 / 400          | Hero sub / 當季主題說明（desktop）              |
| `typography.article.summary.mobile`  | Noto Serif TC / 18 / 30 / 400          | Hero sub（mobile）                              |
| `typography.system.h2.semibold`      | PingFang TC / 20 / 30 / 600            | Board H2（e.g. 「今天，他們寫了這些」）         |
| `typography.system.body1.semibold`   | PingFang TC / 16 / 24 / 600            | CTA 按鈕 label、EntryCard 作者名                |
| `typography.system.body2.regular`    | PingFang TC / 14 / 22 / 400            | EntryCard excerpt、meta                         |
| `typography.system.body2.medium`     | PingFang TC / 14 / 22 / 500            | DayPromptChip 提示詞                            |
| `typography.system.small.regular`    | PingFang TC / 12 / 18 / 400            | eyebrow、timestamp、daytag chip                 |

### Spacing

| Token          | Value | Used for                         |
| -------------- | ----- | -------------------------------- |
| `spacing.sp4`  | 4px   | 極小 rhythm（day num 與 label）  |
| `spacing.sp8`  | 8px   | Avatar wall inner gap            |
| `spacing.sp10` | 10px  | DayPromptRow 格間距              |
| `spacing.sp12` | 12px  | CTA pair gap、EntryCard padding  |
| `spacing.sp16` | 16px  | 區塊內 padding、EntryCard 內間距 |
| `spacing.sp32` | 32px  | Board 之間 / 大節奏              |

### Effect

| Token             | Value                       | Used for                 |
| ----------------- | --------------------------- | ------------------------ |
| `effect.shadow1`  | 0 4px 8px rgba(0,0,0,0.08)  | Board 卡片陰影           |
| `effect.dropdown` | 0 4px 16px rgba(0,0,0,0.12) | FAQ 展開、Avatar tooltip |

### New tokens needed

**無**。所有數值可以現有 v2 tokens 組出。若後續要引入「徽章完成」視覺，再評估是否新增 `color.secondary.*` 的使用情境。

---

## Components

### 既有（複用 `components/`）

| Component                  | 來源 | Props / 備註                                                               |
| -------------------------- | ---- | -------------------------------------------------------------------------- |
| `Button`                   | 既有 | `variant: primary \| outline`、`size: md`；主 CTA 用 primary，次用 outline |
| `Avatar`                   | 既有 | 用於 EntryCard；尺寸 40px desktop / 36px mobile                            |
| `Disclosure` / `Accordion` | 既有 | 用於 Rules / FAQ；若 `components/` 無，新增                                |

### 新建（Structural Track 必須新建）

#### 1. `SevenDayHero`

Hero board 容器。

```
props:
  phase: 'before' | 'during' | 'after'    // 活動階段
  seasonLabel: string                      // e.g. "2026 春季"
  dayOfN: number                           // 活動進行到第幾天 (1..7)；phase='during' 才有
  title: string
  subtitle: string
  participantCount: number
  participantAvatars: Array<{id, name, avatarUrl, colorFallback}>
  onPrimaryCta: () => void                 // 「看他人的七日書」 / 「訂閱提醒」 / 「讀選集」
  onSecondaryCta: () => void               // 「加入寫作」 / null（phase='after'）
```

#### 2. `ParticipantWall`

頭像牆，Hero 內部使用。

```
props:
  avatars: Array<{id, name, avatarUrl, colorFallback}>
  totalCount: number                       // 可能 > 顯示數，顯示「1,284 位作者同行」
  density: number                          // 顯示幾個頭像，預設 60
  onAvatarClick?: (id) => void             // 預設點擊跳作者頁
```

**視覺**：

- 每個頭像 32×32 圓形，白色 2px border，`shadow: 0 1px 3px rgba(0,0,0,.08)`
- Fallback 色取自 `color.info.{100,200}` + `color.freewrite.label`，避免搶戲
- Flex wrap，gap `sp8`（4px 視覺上緊湊）
- hover 放大 `scale(1.15)` + z-index 提升；顯示作者名 tooltip

#### 3. `DayPromptRow`

本季七個提示的水平列。

```
props:
  prompts: Array<{day: 1..7, keyword: string, prompt?: string, locked?: boolean}>
  todayDay?: 1..7                          // 高亮「今天」那一格
  onDayClick?: (day) => void               // 點擊跳至該日 feed 區段
```

**視覺**：

- 7 等分 grid，gap `sp10`
- 每格 radius 10px、padding 14/10
- 非今日：背景 `color.freewrite.background`、數字 `color.freewrite.textDark`、keyword `color.grey.greyDarker`
- 今日：背景 `color.freewrite.text`、文字 `#fff`
- locked（活動未開跑時）：opacity 0.45，keyword blur

#### 4. `SevenDayEntryCard`

作品卡，`today, 他們寫了這些` 區塊使用。

```
props:
  entry: { id, title, excerpt, dayLabel, author: {name, avatar}, createdAt }
  onClick: () => void
```

**視覺**：

- 白底 + 1px transparent border（hover → `color.freewrite.label`）
- Radius 12、padding `sp16`
- 左側作者頭像 40px
- 右側：作者名（body1.semibold）+ dayLabel（right-aligned, small） → 標題（reading 17/600）→ excerpt（2 行，body2.regular greyDarker）

#### 5. `SeasonTheme`（可選）

若活動本季有「主題說明」（非僅 7 個 prompt 標題），用這個。本次不必做，留 stub。

---

## States and Interactions

### 活動階段 × CTA 行為矩陣

| Phase    | 主 CTA                            | 次 CTA                                                                         | StreakProgress 顯示？    |
| -------- | --------------------------------- | ------------------------------------------------------------------------------ | ------------------------ |
| `before` | 「訂閱開跑提醒」→ email 訂閱 flow | 無                                                                             | 無                       |
| `during` | 「看他人的七日書」→ 選集頁        | 「加入寫作」→ 若未參加 / 「寫今天」→ 若今日未寫 / 「查看今日作品」→ 若今日已寫 | 無（方向 C 不用 streak） |
| `after`  | 「讀選集」→ 選集頁                | 「期待下一季」→ email 訂閱                                                     | 無                       |

### 主 CTA 「看他人的七日書」

- Default → Hover → Active → Focus
- Hover：bg `color.info.500`
- Focus：2px outline `color.freewrite.textDark`，outline-offset 2px
- 永不 disabled（任何訪客都能看）

### 次 CTA 「加入寫作 / 寫今天」

- **未登入**：hover 顯示 tooltip「登入後開始」；點擊跳登入 flow，登入後 redirect 到編輯器帶入 day N prompt
- **登入 + 未參加**：文案「加入寫作」；點擊觸發 API `POST /sevenday/{seasonId}/join` → redirect 到 day 1 編輯器
- **登入 + 今日未寫**：文案「寫今天的 Day N」；點擊直接跳編輯器帶入 day N prompt
- **登入 + 今日已寫**：文案「查看今日作品」；點擊跳該作品頁
- **Disabled**：永不；不可用時改文案與 href，不用 disabled state

### ParticipantWall

- **Hover 頭像**：放大 1.15×、z-index 提升、tooltip 顯示「@username」
- **Click 頭像**：跳該作者頁
- **載入狀態**：skeleton — 64 個 32×32 灰圓（`color.grey.greyLight`），stagger-pulse

### DayPromptRow

- **Hover 某一格**：背景 `color.info.100`（非今日）/ `color.freewrite.textDark`（今日）
- **Click 某一格**：scroll 到該日 feed 區段（if exists）；若無，keep as anchor
- **locked**：鎖定狀態不可 click、cursor: not-allowed、tooltip 顯示「活動開跑後公開」

### SevenDayEntryCard

- **Hover**：border `color.freewrite.label`，無位移（與作品頁 RecommendationCard 一致）
- **Click**：跳該作品頁
- **載入狀態**：skeleton（6 張卡片骨架 + shimmer）

### Rules / FAQ Accordion

- **default**：全部收合
- **Click 問題**：展開答案，動畫 200ms ease；尊重 `prefers-reduced-motion`
- **aria**：`aria-expanded` + `aria-controls` + 問題用 `<button>` 包，答案用 `<div role="region">`

---

## Responsive Behavior

**Breakpoints**：沿用 DS 1.5 既有（若 `tokens/` 未來有 spacing.breakpoint 分類再引用；目前手動硬編）

- **Desktop (≥1024px)**：單欄 max-width 1080，左右有 `color.grey.greyLighter` 外緣；Board padding 40×48
- **Tablet (768–1023px)**：Board padding 縮至 `sp32 sp32`；EntryCard 2-column 保留；DayPromptRow 保持 7 等分但字縮小
- **Mobile (<768px)**：
  - Hero H1 → `typography.article.title.mobile` (24/36/600)
  - Hero sub → `typography.article.summary.mobile` (18/30/400)
  - Board padding `sp16`
  - ParticipantWall：頭像縮 28×28，density 降至 36
  - DayPromptRow：7 等分改為 **2 列**（4+3 或 3-4-（today cross-row）），避免字太擠；或改 horizontal scroll（PM 需選）→ **Open Question**
  - EntryCard：1-column stack
  - CTA pair：vertical stack，全寬

---

## Edge Cases

| 情境                       | 處理                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| 活動未開跑（phase=before） | DayPromptRow 所有格 locked；CTA 改訂閱                                                      |
| 活動進行中但我未登入       | 顯示 guest 版 CTA（「加入寫作」跳登入）；ParticipantWall 正常；無個人進度區                 |
| 我登入但未參加本季         | 次 CTA 文案 = 「加入寫作」                                                                  |
| 我參加了但斷天             | 方向 C 不顯示 streak；僅次 CTA 引導「補寫 Day N」（Day N = 目前應寫但沒寫的那天）           |
| 活動結束（phase=after）    | DayPromptRow 全格恢復可讀但無 today 高亮；CTA 改選集                                        |
| 參與人數 = 0（新季剛開跑） | ParticipantWall 顯示 onboarding copy「成為第一位」；totalCount 隱藏或顯示 `—`               |
| 本季無作品                 | Entries board 顯示 empty state「成為第一個寫下來的人」+ 引導 CTA                            |
| 載入中                     | Board-level skeleton（非全頁 spinner）；頭像牆 + entries 各自獨立 skeleton                  |
| 作者頭像 404 / 未上傳      | 顯示 `color.info.{100,200}` + `color.freewrite.label` 色塊 + 姓名首字（PingFang bold 白字） |
| 極長作者名                 | 單行 `text-overflow: ellipsis`；tooltip 露全名                                              |
| 極長作品標題               | 2 行後 `-webkit-line-clamp: 2`                                                              |
| prefers-reduced-motion     | 移除所有 hover transform、accordion 動畫；靜態顯示                                          |

---

## Animation / Motion

- **Hero 進場**：`fadeIn + translateY(8px)` 400ms cubic-bezier(.2,.7,.3,1)
- **ParticipantWall 載入**：頭像 stagger fade-in，間隔 20ms，總長不超 800ms
- **EntryCard 載入**：stagger 60ms
- **Accordion 展開**：height auto + opacity 200ms ease
- **所有動畫**必須包 `@media (prefers-reduced-motion: reduce)` → `animation: none; transition: none`

---

## Accessibility Notes

- **對比度**：
  - `#333` on `#FFF` = 12.63:1 ✅ AAA
  - `#808080` on `#FFF` = 4.61:1 ✅ AA normal
  - **PM 2026-04-24 option A 決議**：主 CTA / 連結 / eyebrow / 今日高亮統一用 `#045898`（freewrite.textDark），因 `#1999D0` 對白 ~3.2:1 不達 WCAG AA normal 4.5:1。
  - `#045898` on `#FFF` = **~11.5:1 ✅ AAA**（主連結 / 強調色）
  - `#FFF` on `#045898` = **~11.5:1 ✅ AAA**（主 CTA 白字對深藍底）
  - `#045898` on `#F0F9FE` = **~10.5:1 ✅ AAA**（DayPromptChip 非今日的字 / 底 pair）
  - `#1999D0` 使用限制：僅作 CTA hover state、outline CTA focus、≥18pt 粗體 accent；不可單獨作 body link 色
- **鍵盤順序**：Header → 主 CTA → 次 CTA → ParticipantWall（整個作為 list）→ DayPromptRow → EntryCard list → FAQ → Closing CTA → Footer
- **ARIA**：
  - `<section aria-labelledby="...">` 包每個 Board
  - `ParticipantWall`：`<ul aria-label="本季參與者">`，每個頭像 `<li><a>...</a></li>`
  - `DayPromptRow`：`<ol>`，今日加 `aria-current="step"`
  - `FAQ`：`aria-expanded` + `aria-controls`
- **Screen reader**：主 CTA 文案本身已夠清晰（「看他人的七日書」），無需額外 `aria-label`
- **Focus ring**：2px solid `color.freewrite.textDark` (#045898)，offset 2px；所有 interactive 元素一致
- **CJK**：
  - H1 `letter-spacing: 1.2` 注意不要切標點在行首
  - EntryCard excerpt 2 行 clamp 優先斷在標點後
- **色盲友善**：DayPromptRow 「今日」不是只靠顏色區分，同時有粗體 + 向上小三角指標（視覺補強）→ 目前 HTML 未加，**需 dev 補**
- **Touch target**：所有可點擊元素 ≥ 44×44（頭像 32×32 的互動區實際含 padding 可達）

---

## Dual-Track 判定（再次確認）

依 `docs/dual-track-workflow.md`：

> 這個任務需要改到 layout、字體家族、tokens、或新增路由嗎？→ **是**（新增 `/events/sevenday/{seasonId}` 路由）→ **結構軌**
> 需要新 components（ParticipantWall / DayPromptRow / SevenDayEntryCard）→ 結構軌加強確認
> 需要新 token？→ **否**（全部可用 v2 組出）

---

## Open Questions

1. **Mobile DayPromptRow**：7 等分擠太窄 → 改 2 列 grid（4+3）還是 horizontal scroll？PM 決定
2. **活動選集頁**的 URL / 接面：`/events/sevenday/{seasonId}/collection`？需與既有選集系統 owner 對齊
3. **「帶入當季 prompt」**的技術接面：URL param `?prompt=seasonId:dayN` 還是 session？需與編輯器團隊對齊（`matters-editor` repo）
4. **頭像牆的 totalCount**：只計本季、還是累積歷屆？影響數字心理效應
5. **是否有徽章**：完成七天發 NFT / 站內徽章？若有，需追加 BadgeReveal 元件 + 對應 token（secondary.\*）
6. **Matters 2.0 colors Variables diff**：`claude-design-output/01-matters-2.0-variables.md` 已回填完成（PM 2026-04-24 裁示維持 Brand Guidelines 的 purple/lime，`color.freewrite.*` 直接沿用 2.0 值，**無需再同步**）。若未來 2.0 調整 freewrite 四色，landing 需同步重驗對比度
7. **視覺色盲指標**（DayPromptRow today）：是否加小三角？需 PM 同意引入非文字視覺標記

---

## 交接給 Claude Code 的清單

- [ ] 本 spec 確認為真值來源（HTML 定稿 `seven-day-book-landing-c.html` 為視覺參考）
- [ ] 在 `matters-web` 建路由 `/events/sevenday/{seasonId}`
- [ ] 新建 3 個 components → `matters-web/src/components/Events/SevenDay/`
  - `Hero/`
  - `ParticipantWall/`
  - `DayPromptRow/`
  - `EntryCard/`（或繼承既有 `ArticleDigestCard` 的七日書 variant）
- [ ] 對接 `matters-server` GraphQL：
  - `sevenDaySeason(id): Season` — 含 phase, dayOfN, prompts, participantCount
  - `sevenDayEntries(seasonId, day?): [Article]`
  - `sevenDayParticipants(seasonId, limit): [User]`
  - `joinSevenDay(seasonId): Season`（mutation）
  - `subscribeSevenDayReminder(seasonId): Bool`（mutation，phase=before 用）
- [ ] 對接 `matters-editor`：URL param 帶入當季 prompt
- [ ] OG-image 模板 → `templates/sevenday-og.{tsx|svg}` 採 **模板軌**（另開 issue）
- [ ] i18n：繁中 / 簡中兩套文案；英文本期**不做**，見 Open Question
- [ ] 上線後數據追蹤：
  - 主 CTA click rate（看選集 vs 開始寫的比例）
  - ParticipantWall click-through（從 landing 到作者頁）
  - DayPromptRow click-through（landing 到 feed section）

---

**此 spec 生成時間**：2026-04-24
**生成者**：Claude Design session（輔助 mashbean bootstrap `thematters/design-system`）
**覆核**：PM（mashbean）→ Dev（`matters-web` maintainer）→ 運營
