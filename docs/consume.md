# Consuming the Matters Design System

本 repo 採 **vendored copy** 散布：consumer landing page 直接把 `tokens/dist/` 與需要的 `components/<page>/<name>/impl.{css,html}` 複製進自己的 repo。不依賴 npm registry，無外部 build dependency。

## 為什麼選 vendored copy

- ✅ 靜態頁（Cloudflare Pages、GitHub Pages、純 HTML）零成本接入
- ✅ 版本鎖在 commit sha — 對應的 design 規範就在那筆 commit 的 `tokens/tokens.json`
- ✅ 不卡 npm publish 流程 / private registry 設定
- ❌ 缺：升級時要手動同步（見下方 Updating）

## 1. 取 tokens

複製整個 `tokens/dist/` 目錄到 consumer repo。建議放在 `assets/matters-ds/` 或 `vendor/matters-ds/`。

```bash
# 在 consumer repo 內執行
cp -r path/to/design-system/tokens/dist assets/matters-ds/tokens
```

或寫成腳本，搭配 git submodule / git subtree 也可以，但純 cp 最直接。

### 用法 — CSS custom properties

`tokens.css` 把所有 token 攤平成 `:root` 內的 `--color-*` / `--space-*` / `--shadow-*` / `--font-family-*` 變數，外加 `.ds-text-*` typography utility classes。

```html
<link rel="stylesheet" href="/assets/matters-ds/tokens/tokens.css">

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

### 用法 — TypeScript / JavaScript

```ts
import { tokens, colorByPath } from './assets/matters-ds/tokens/tokens';

console.log(tokens.color.brand.new.purple.value); // "#7258FF"
console.log(colorByPath['color.brand.new.purple']); // "#7258FF"
```

### 用法 — Tailwind CSS

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('./assets/matters-ds/tokens/tailwind.preset.cjs')],
  // ...
};
```

之後可以直接 `bg-brand-new-purple`、`text-primary-700`、`p-sp16`。

## 2. 取 components（pilot：Button）

目前先實作 `components/buttons/normal/`（DS 1.5 Buttons/Normal）。其他 component 之後陸續補。Consumer 想用，照樣 cp：

```bash
cp design-system/components/buttons/normal/impl.css \
   assets/matters-ds/components/button.css
```

```html
<link rel="stylesheet" href="/assets/matters-ds/tokens/tokens.css">
<link rel="stylesheet" href="/assets/matters-ds/components/button.css">

<button class="ds-btn ds-btn--primary ds-btn--large">送出</button>
<button class="ds-btn ds-btn--secondary ds-btn--medium">取消</button>
<button class="ds-btn ds-btn--tertiary ds-btn--small">了解更多</button>

<!-- icon-only 必須給 aria-label -->
<button class="ds-btn ds-btn--primary ds-btn--medium ds-btn--icon-only" aria-label="新增">
  <span class="ds-btn__icon">＋</span>
</button>
```

每個 component 的 `spec.md` 列出該 component 的 variant axis、states、edge cases、a11y 注意；`impl.{html,css}` 是 vanilla 實作；`figma-preview.png` 是 Figma 視覺對照。

## 3. Updating（升級到新版 design system）

```bash
# 在 design-system repo 內
git pull
node tokens/build.mjs   # 重建 tokens/dist/

# 在 consumer repo 內
cp -r path/to/design-system/tokens/dist assets/matters-ds/tokens
git diff assets/matters-ds/tokens   # 看哪些變了
```

可選：在 consumer repo 的 `package.json` 或 README 註明 sync 自哪個 commit sha：

```
matters-ds vendored from thematters/design-system @ <sha>
```

## 4. 改寫風險

- **Brand color migration**：DS 1.5 內部仍多處引用 legacy green。Consumer 應以 `--color-brand-new-purple` / `--color-brand-new-green` 為 canonical（PM 2026-04-24 決議）；如果看到 component impl 裡還有 legacy 色號，那是 bug，請開 issue
- **七日書專屬 palette**：`--color-freewrite-*` 只給 Freewrite landing page 用，其他頁不要套
- **字體授權**：`PingFang TC` 是 Apple 系統字，網頁需 fallback；`Noto Serif TC` 走 Google Fonts 自由授權
