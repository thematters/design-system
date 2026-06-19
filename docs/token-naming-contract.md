# Token 命名契約與穩定性政策

> 對象：`@matters/design-system-tokens` 的維護者與消費端（產品工程、vendored 使用者）。
> 目的：在 Matters 2.0 品牌遷移仍在進行、token 名稱與數值都在 churn 的情況下，
> 定義「**哪一層可以動、怎麼動、什麼時候凍結**」，讓套件可以安全地對外發布。

## 為什麼需要這份契約

一旦套件上了 npm，**token 的「名稱」就是 public API**。消費端綁的是名稱——
CSS custom property（`--color-primary-600`）、TS 的 `colorByPath["color.primary.600"]`、
Tailwind key。**改數值**消費端無感（換個 hex 而已）；**改名稱或移除 token** 會直接讓
消費端的樣式失效，是 breaking change。

但 Matters 正處於 2.0 品牌遷移：`brand.legacy`（墨綠 #0D6763）→ `brand.new`
（紫 #7258FF / 萊姆綠 #C3F432），值與名稱都還在動（PM 2026-04-24 決議）。
這份契約把 token 分層、把「churn」侷限在不影響公開 API 的那一層。

## 兩層模型

| 層級                    | 內容                                                                                                        | 穩定性                            | 消費端可否直接綁 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------- |
| **Primitive（原始層）** | `color.brand.legacy.*`、`color.brand.new.*`                                                                 | 隨 2.0 遷移 churn，**不保證穩定** | ❌ 不要直接綁    |
| **Semantic（語意層）**  | `color.primary/secondary/info/attention`、`color.grey`、`color.function`、`typography`、`spacing`、`effect` | 名稱相對穩定，值可微調            | ✅ 只綁這層      |

語意層的存在，就是為了把 primitive 的 churn 藏在底下。消費端綁 `--color-primary-600`，
不管底層的紫色階怎麼搬、品牌怎麼從綠換到紫，消費端的 import 都不用動。

## 實際 namespace（以 `packages/tokens/tokens.json` 為準）

> ⚠️ 這份清單是 build 出來、真正會進 `dist/` 的內容。任何文件（含 README）若與此不符，
> 以 `tokens.json` 為準——文件要修正，不是 tokens 要遷就文件。

| Namespace            | Keys                                                                                | 性質                                               |
| -------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| `color.brand.legacy` | `green*`、`gold*`、`yellowLighter`                                                  | primitive，遷移期保留，**完成後移除**              |
| `color.brand.new`    | `purple`、`green`                                                                   | primitive，2.0 canonical（可能被 re-point）        |
| `color.primary`      | `0`–`900`（紫色階）                                                                 | **semantic**，主色                                 |
| `color.secondary`    | `0`–`900`                                                                           | semantic                                           |
| `color.info`         | `0`–`900`                                                                           | semantic                                           |
| `color.attention`    | `0`–`900`                                                                           | semantic（警示／錯誤色階）                         |
| `color.grey`         | `black, greyDarker, greyDark, grey, greyLight, greyHover, greyLighter, white, noir` | semantic                                           |
| `color.function`     | `positive, warn, negative, negativeDark, heart, topUp, topUpDarker, insufficient`   | semantic 狀態色（**單值，非 0–900 色階**）         |
| `color.decorative`   | `brown, orange, yellow, green, purple, pink, red`                                   | semantic 裝飾色                                    |
| `color.external`     | `likeCoin`                                                                          | 第三方品牌色                                       |
| `color.freewrite`    | `background, text, textDark, label`                                                 | **隔離**：七日書專用，獨立 `freewrite.css`，opt-in |
| `typography`         | `fontFamily`、`system.*`、`article.*`                                               | semantic                                           |
| `spacing`            | `sp0`–`sp32`（8pt grid + 2-unit 細階）                                              | semantic                                           |
| `effect`             | `shadow-1`–`shadow-4`                                                               | semantic                                           |

## 變更分級（對應 semver）

| 變更                       | 範例                                                | semver（1.0 後） | semver（0.x 期間）    |
| -------------------------- | --------------------------------------------------- | ---------------- | --------------------- |
| 微調數值，語意不變         | `primary.600` 換個 hex                              | PATCH            | PATCH                 |
| 新增 token                 | 新增 `decorative.teal`                              | MINOR            | MINOR / PATCH         |
| 標記 deprecate（舊名保留） | `attention` → 同時提供 `error` 別名                 | MINOR            | MINOR                 |
| **改名／移除／改語意**     | `attention` 直接改成 `error`、移除 `brand.legacy.*` | **MAJOR**        | **MINOR**（0.x 允許） |

## 版本政策

1. **維持 `0.x` 直到 2.0 遷移收斂、且語意層名稱凍結。** 0.x 期間 semver 允許 minor 帶
   breaking——我們刻意利用這點：遷移期的改名屬「**預期內的 breaking**」。
2. 0.x 期間，消費端應**鎖定窄版本範圍**（見下方消費端指南），不要用 `^`。
3. **切 `1.0` 的條件（exit criteria）**——四項全滿足才升：
   - [ ] `color.brand.legacy.*` 已從所有產品 surface 移除（遷移完成）；
   - [ ] 語意層名稱定稿（本契約的 namespace 表凍結）；
   - [ ] README / 本契約 / `tokens.json` 三者零漂移（見「待 reconcile」）；
   - [ ] 至少一個產品 surface 完整改吃語意層並上線驗證過。

## 消費端指南

```css
/* ✅ DO — 綁語意層 */
.btn {
  background: var(--color-primary-600);
  color: var(--color-grey-white);
}
.error {
  color: var(--color-function-negative);
}
.card {
  box-shadow: var(--shadow-shadow-2);
  padding: var(--space-sp8) var(--space-sp16);
}

/* ❌ DON'T — 綁 primitive，遷移後會消失或變義 */
.btn-bad {
  background: var(--color-brand-legacy-green-green);
}
```

- 七日書以外的任何 surface **不要**碰 `--color-freewrite-*`（它根本不在 `tokens.css` 裡）。
- **鎖版本**（0.x 期間鎖 minor）：

  ```jsonc
  // package.json
  "dependencies": {
    "@matters/design-system-tokens": "~0.3.0"  // 允許 0.3.x patch，擋掉 0.4 的改名
  }
  ```

## 待 reconcile（升 1.0 前要做的決策）

1. **README ↔ tokens.json 漂移（本 PR 已修文件）**：`packages/tokens/README.md` 曾把語意色階
   寫成 `success / warn / error`，但實際只有 `primary / secondary / info / attention` 四個
   0–900 色階，狀態色在 `function.*`。本 PR 已把 README 改成符合實況。
   **未決策**：要不要反過來把 tokens 真的改名成 `success/error`（較符合業界慣例）——這是
   PM／設計決策，且屬 breaking，應在 0.x 期間一次做完。
2. **`green` 一名兩義**：`brand.new.green`（#C3F432 萊姆）vs `brand.legacy.green`（#0D6763 墨綠）
   同叫 "green" 卻完全不同色，遷移期容易誤用。遷移完成移除 legacy 後自然解決。
3. **`function.warn`（單值）與 `attention`（0–900 色階）語意重疊**：未來可能要二選一或明確分工。

---

相關文件：[`packages/tokens/README.md`](../packages/tokens/README.md)、
[`docs/architecture.md`](./architecture.md)、[`docs/releasing.md`](./releasing.md)。
