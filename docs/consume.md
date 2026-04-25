# Consuming the Matters Design System

> Three channels share the same source of truth. Pick one based on your
> consumer. The build writes to all relevant locations on every commit, so
> there's no drift.

## Which channel should I use?

```
你的情境是？
│
├─ Static landing / 純 HTML / 沒有 React build pipeline
│   └─▶ Vendored copy （§A）
│       e.g. matters-lifeboat、matters-fediverse-gateway
│       特性：cp 進去就好，git pull 升級，零 runtime dep
│
├─ React app / Next.js / Vite + React
│   └─▶ npm package （§B）
│       e.g. matters.town 主站、未來的 React 產品
│       特性：自動跟版、tree-shaking、TypeScript 補完、CSS Modules scoped
│
└─ 「我要 fork 一份元件原始碼自己改」
    └─▶ Copy-and-own CLI （§C）
        e.g. 一次性 marketing 站、要客製到認不出原樣的 component
        特性：拷貝 source、跟 design-system 版本解耦、消費者自己維護
```

| Channel       | Latency to update    | Customisation  | Build needed in consumer | Best for        |
| ------------- | -------------------- | -------------- | ------------------------ | --------------- |
| Vendored copy | manual `cp` + commit | low            | none                     | Static pages    |
| npm package   | `pnpm update`        | medium (props) | yes (Vite/Next/etc.)     | React apps      |
| Copy-and-own  | manual re-copy       | full (source)  | yes                      | Fork-and-modify |

不確定怎麼選？預設是 **vendored copy**（lifeboat / fediverse-gateway 都是這條）。React app 例外才用 npm package。Copy-and-own 是 escape hatch。

---

## §A — Vendored copy

最直接：把 `tokens/dist/` 跟你需要的 `components/<group>/<name>/impl.{css,html}` 拷貝進你 repo。不依賴 npm registry，consumer 不需要任何 build。

### 為什麼選 vendored copy

- ✅ 靜態頁（Cloudflare Pages、GitHub Pages、純 HTML）零成本接入
- ✅ 版本鎖在 commit sha — 那個 commit 的 `packages/tokens/tokens.json` 就是當下你綁定的 spec
- ✅ 不卡 npm publish 流程 / private registry 設定
- ❌ 缺：升級時要手動 cp（見 [§A.4 Updating](#a4-updating)）

### A.1 取 tokens

```bash
# 在 consumer repo 內執行
cp -r path/to/design-system/tokens/dist assets/matters-ds/tokens
```

或寫成腳本，搭配 git submodule / git subtree 也可以，但純 cp 最直接。

#### 用法 — CSS custom properties

`tokens.css` 把所有 token 攤平成 `:root` 內的 `--color-*` / `--space-*` / `--shadow-*` / `--font-family-*` 變數，外加 `.ds-text-*` typography utility classes。

```html
<link rel="stylesheet" href="/assets/matters-ds/tokens/tokens.css" />

<style>
  .hero {
    background: var(--color-brand-new-purple);
    color: var(--color-grey-white);
    padding: var(--space-sp32);
    border-radius: 16px;
    box-shadow: var(--shadow-shadow1);
  }
</style>

<h1 class="ds-text-system-h1-semibold">Matters</h1>
<p class="ds-text-article-body-regular">內文段落…</p>
```

#### 用法 — TypeScript / JavaScript

```ts
import { tokens, colorByPath } from "./assets/matters-ds/tokens/tokens";

console.log(tokens.color.brand.new.purple.value); // "#7258FF"
console.log(colorByPath["color.brand.new.purple"]); // "#7258FF"
```

#### 用法 — Tailwind CSS

```js
// tailwind.config.cjs
module.exports = {
  presets: [require("./assets/matters-ds/tokens/tailwind.preset.cjs")],
  // ...
};
```

之後可以直接 `bg-brand-new-purple`、`text-primary-700`、`p-sp16`。

### A.2 取 components（vanilla HTML/CSS 版）

每個元件的 vanilla 實作放在 `components/<group>/<name>/impl.{html,css}`。Consumer 想用，照樣 cp：

```bash
cp design-system/components/buttons/normal/impl.css \
   assets/matters-ds/components/button.css
```

```html
<link rel="stylesheet" href="/assets/matters-ds/tokens/tokens.css" />
<link rel="stylesheet" href="/assets/matters-ds/components/button.css" />

<button class="ds-btn ds-btn--primary ds-btn--large">送出</button>
<button class="ds-btn ds-btn--secondary ds-btn--medium">取消</button>
<button class="ds-btn ds-btn--tertiary ds-btn--small">了解更多</button>

<!-- icon-only 必須給 aria-label -->
<button class="ds-btn ds-btn--primary ds-btn--medium ds-btn--icon-only" aria-label="新增">
  <span class="ds-btn__icon">＋</span>
</button>
```

每個 component 的 `spec.md` 列出 variant axis、states、edge cases、a11y 注意；`impl.{html,css}` 是 vanilla 實作；`figma-preview.png` 是 Figma 視覺對照。

### A.3 哪些 component 已經有 vanilla impl

只有 `components/buttons/normal/` 有完整 vanilla 實作。其他元件目前**只有 spec**——如果你需要的 component 還沒有 `impl.{html,css}`，去 §B（npm package）拿 React 版，或是自己照 `spec.md` + `figma-preview.png` 寫 vanilla 版（願意的話 PR 過來，下個版會合進來）。

### A.4 Updating

```bash
# 在 design-system repo 內
git pull
node tokens/build.mjs   # 重建 tokens/dist/

# 在 consumer repo 內
cp -r path/to/design-system/tokens/dist assets/matters-ds/tokens
git diff assets/matters-ds/tokens   # 看哪些變了
```

可選：在 consumer repo 的 README 註明 sync 自哪個 commit sha：

```
matters-ds vendored from thematters/design-system @ <sha>
```

---

## §B — npm package（React）

給有 build pipeline 的 React 應用。Phase 1 起 ship `@matters/design-system-react`。

### B.1 安裝

```bash
pnpm add @matters/design-system-react @matters/design-system-tokens
# peer deps（你的 app 應該已經有）
pnpm add react react-dom
```

### B.2 用法

```tsx
// 通常在 app entry（main.tsx / _app.tsx / layout.tsx）import 一次
import "@matters/design-system-tokens/tokens.css";
import "@matters/design-system-react/styles.css";
```

```tsx
// 其他地方
import { Button } from "@matters/design-system-react";

export function LoginForm() {
  return (
    <form>
      {/* … inputs … */}
      <Button type="submit">登入</Button>
      <Button variant="secondary">取消</Button>
    </form>
  );
}
```

### B.3 哪些 component 已經有 React 版

| Component                           | Phase | Status |
| ----------------------------------- | ----- | ------ |
| `Button`                            | 1     | ✅     |
| `TextField`                         | 2     | 🚧     |
| `Dialog`                            | 2     | 🚧     |
| `Toast`                             | 2     | 🚧     |
| `ArticleCard` / `Avatar` / `Banner` | 4     | ⏳     |

完整 phase plan 在 [`docs/architecture.md`](architecture.md)。

### B.4 Updating

```bash
pnpm update @matters/design-system-react @matters/design-system-tokens
```

Major bump 會在 changelog 標出，依語意化版號處理。

---

## §C — Copy-and-own CLI

把 React 元件**原始碼**拷貝進你的 repo，從此跟 npm package 解耦——你自己負責後續維護與升級。

> Phase 2 上線。Phase 1 已預留 hook 在 [`scripts/scaffold-component.mjs`](../scripts/scaffold-component.mjs)。

### C.1 用法（規劃中）

```bash
pnpm dlx @matters/design-system-cli add Button --to ./src/components
```

執行後：

- `Button.tsx` + `Button.module.css` + `index.ts` 被拷貝到 `./src/components/Button/`
- Consumer 從此可以隨意改、加 props、改色、改 layout
- 拷貝瞬間是版本快照；之後不會自動跟版

### C.2 適合的場景

- 一次性 marketing 站，UX 跟主站差很多
- 客製需求超出 props 能涵蓋的範圍（要動 markup 結構）
- POC / 快速 prototype

### C.3 不適合的場景

- 主站、長期維護的產品 → 用 §B npm package
- 純靜態 landing → 用 §A vendored copy（更輕）

---

## 改寫風險與注意事項（三條都適用）

- **Brand color migration**：DS 1.5 內部仍多處引用 legacy green。Consumer 應以 `--color-brand-new-purple` / `--color-brand-new-green` 為 canonical（PM 2026-04-24 決議）。如果看到 component impl 裡還有 legacy 色號，那是 bug，請開 issue。
- **七日書專屬 palette**：`--color-freewrite-*` 只給 Freewrite / 七日書 landing page 用，其他頁不要套。
- **字體授權**：`PingFang TC` 是 Apple 系統字，網頁需 fallback；`Noto Serif TC` 走 Google Fonts 自由授權。
- **Token paths 過渡期**：`tokens/dist/` 跟 `packages/tokens/dist/` 內容一致，build 同時寫。新 consumer 用 npm package（吃 `packages/tokens/dist/`），舊 vendored consumer 繼續吃 `tokens/dist/`，不需要改任何路徑。
