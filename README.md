# Matters Design System

Matters（馬特市，繁中創作社群，官方網址 [matters.town](https://matters.town)）的設計系統 monorepo。Repo 位置：`thematters/design-system`（private）。

## 這個 repo 是做什麼的

前端 / 營運設計師交接後，我們需要一個集中、可被 Claude Code / Codex 等 Agent 讀寫的設計真相源（source of truth），取代原本 Figma + Google Drive + Notion 散落的作業方式。

## 目前的四個交付桶

1. **宣傳圖模板**（運營可自助）— 繼承 CC & Branding Figma 模板，轉為可程式化產生的 OG-image / 社群圖模板
2. **前端改版** — 既有產品頁面的設計迭代（對應 `docs/issue-drafts.md` 中的 `status/in-progress` / `status/todo`）
3. **七日書 landing** — 季節性活動專屬 landing page
4. **Archive 視覺改版** — 站台的封存 / 歷史內容頁面視覺升級

## 重要文件

- [`docs/dual-track-workflow.md`](docs/dual-track-workflow.md) — 模板軌 vs. 結構軌的雙軌工作流
- [`docs/handoff-spec-template.md`](docs/handoff-spec-template.md) — 設計 → 開發的 handoff spec 範本
- [`docs/figma-inventory.md`](docs/figma-inventory.md) — 現有 Figma 檔案清單（人類可讀）

## 目錄

```
tokens/      # 設計 tokens（由 Figma Design System 1.5 / 2.0 抽取）
components/  # 鏡射 Figma Components
templates/   # 運營模板（來源：CC & Branding）
docs/        # 工作流、handoff 規範、Figma 清單
scripts/     # 自動化：token 抽取、OG-image 產生
```

## 狀態

Phase 0 — Bootstrap。
- `tokens/tokens.json` v2 完成（color / typography / spacing / effect，全部來自 DS 1.5 Figma）
- `docs/handoff-specs/article-page-redesign.md` — pilot handoff spec
- components / templates 尚未填入

## 背景資訊

- **產品域名**：[matters.town](https://matters.town)（Matters.Town 是站台正式品牌）
- **前設計師交接檔**：存於上層目錄 `交接.md`、`已有設計項目待迭代.md`、`Matters.Town_-_Brand_Guidelines.pdf`、`Matters_Lab_-_Brand_Guidelines.pdf`
- **Figma Team**：Matters - Product Team（pro）、tech@matters.news Matters's team（starter）

