# Matters Design System

Matters（馬特市，繁中創作社群，官方網址 [matters.town](https://matters.town)）的設計系統 monorepo。Repo 位置：`thematters/design-system`。

## 這個 repo 是做什麼的

前端 / 營運設計師交接後，我們需要一個集中、可被 Claude Code / Codex 等 Agent 讀寫的設計真相源（source of truth），取代原本 Figma + Google Drive + Notion 散落的作業方式。

從 Phase 1 起，這個 repo 同時是 **monorepo + UI Kit**：tokens 與 React 元件都會以 npm package（以及 vendored copy）的形式被產品端消費。

## 目前的四個交付桶

1. **宣傳圖模板**（運營可自助）— 繼承 CC & Branding Figma 模板，轉為可程式化產生的 OG-image / 社群圖模板
2. **前端改版** — 既有產品頁面的設計迭代（對應 `docs/issue-drafts.md` 中的 `status/in-progress` / `status/todo`）
3. **七日書 landing** — 季節性活動專屬 landing page
4. **Archive 視覺改版** — 站台的封存 / 歷史內容頁面視覺升級

## 三條消費路徑（並行）

| 路徑                         | 適合                                              | 入口                                                               |
| ---------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| **Vendored copy**            | Static landing pages、無 build pipeline 的純 HTML | [`docs/consume.md`](docs/consume.md)                               |
| **npm package**              | React 應用                                        | [`packages/react/README.md`](packages/react/README.md)             |
| **Copy-and-own**（Phase 2+） | Fork 自有版、不想跟 package 版本耦合              | [`scripts/scaffold-component.mjs`](scripts/scaffold-component.mjs) |

## 重要文件

- 📚 **[Storybook docs site](https://thematters.github.io/design-system/)** — Phase 3 起公開部署，含元件 stories + tokens 視覺化（colors / typography / spacing / shadows / brand）
- [`docs/architecture.md`](docs/architecture.md) — **Phase 1 起的 monorepo 結構與 phase plan**
- [`docs/consume.md`](docs/consume.md) — 三種消費方式
- [`docs/dual-track-workflow.md`](docs/dual-track-workflow.md) — 模板軌 vs. 結構軌的雙軌工作流
- [`docs/handoff-spec-template.md`](docs/handoff-spec-template.md) — 設計 → 開發的 handoff spec 範本
- [`docs/figma-inventory.md`](docs/figma-inventory.md) — 現有 Figma 檔案清單

## 目錄

```
packages/
├── tokens/             # 設計 tokens（canonical）
└── react/              # React 元件 library（@matters/design-system-react）
apps/
└── storybook/          # 元件 docs site（Phase 1 本機；Phase 3 上架）
components/             # 設計 spec：Figma 取出的 41 份 component reference
tokens/                 # tokens/dist/* — vendored copy 用的 back-compat 鏡射
docs/                   # 工作流、phase plan、handoff 規範
scripts/                # token 抽取、scaffold CLI
templates/              # 運營模板（Phase 6+）
.github/workflows/      # CI（lint / typecheck / test / build / storybook）
```

## 起步

```bash
# 一次裝好整個 monorepo
pnpm install

# 重新產生 tokens
pnpm build:tokens

# 跑 React 元件測試
pnpm --filter @matters/design-system-react test

# 開 Storybook
pnpm dev:storybook
```

需要 Node ≥ 20、pnpm ≥ 9。

## 狀態

| Phase       | Scope                                                         | 狀態           |
| ----------- | ------------------------------------------------------------- | -------------- |
| Phase 0     | Tokens v2 + 41 specs + Button vanilla impl                    | ✅ 已合 PR #29 |
| Phase 1     | Monorepo + Button (React) + Storybook + CI                    | ✅ 已合 PR #30 |
| Phase 2     | TextField + Dialog + Toast + scaffold CLI                     | ✅ 已合 PR #31 |
| **Phase 3** | **Storybook deploy + tokens docs site + freewrite isolation** | **🚧 本 PR**   |
| Phase 4     | ArticleCard + Avatar + Banner                                 | ⏳             |
| Phase 5     | npm publish + 版本治理 + visual regression                    | ⏳             |
| Phase 6+    | Operational templates                                         | ⏳             |

完整 phase plan 在 [`docs/architecture.md`](docs/architecture.md)。

## 背景資訊

- **產品域名**：[matters.town](https://matters.town)（Matters.Town 是站台正式品牌）
- **品牌色（PM 2026-04-24 拍板）**：canonical = `--color-brand-new-purple` (#7258FF) + `--color-brand-new-green` (#C3F432)。Legacy green/gold 只能作為遷移期使用。
- **前設計師交接檔**：存於上層目錄 `交接.md`、`已有設計項目待迭代.md`、`Matters.Town_-_Brand_Guidelines.pdf`、`Matters_Lab_-_Brand_Guidelines.pdf`
- **Figma Team**：Matters - Product Team（pro）、tech@matters.news Matters's team（starter）
