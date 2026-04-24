# Tokens

設計 tokens（色彩、字體、間距、圓角、陰影、動畫曲線等）。

## Source of Truth

- **Figma Design System 1.5** — `JDKpHezhllOvJF42xbKcNN`
- **Matters 2.0 Colors** — `wzoAKeR1Aa5PFx7zXdyLIT`（2.0 色盤升級預留）

## 產生流程（Phase 0 規劃）

```
Figma Variables ──[Figma MCP get_variable_defs]──▶ tokens-raw/*.json
                                                          │
                                               [scripts/transform.ts]
                                                          ▼
                                                  tokens/tokens.json   (本資料夾)
                                                          │
                                                     ├── CSS vars
                                                     └── Tailwind preset
```

`tokens-raw/` 列在 `.gitignore`：只保留 transform 過的正式版本。

## 現況

`tokens.json` 尚未產生。Phase 0 的任務：先手動從 Design System 1.5 抽一個最小可用子集（brand color、text color、font-size、spacing），跑起端到端 pipeline 後再補齊。
