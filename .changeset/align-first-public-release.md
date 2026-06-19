---
"@matters/design-system-tokens": minor
"@matters/design-system-react": minor
---

對齊兩個 linked 套件版本，作為**首個公開（npm）發布**。

此前 `tokens@0.2.0` 與 `react@0.2.2` 因早期分開 bump 而版本不一致，且從未真正
發布到 npm（過去每次 Release CI 因 `NPM_TOKEN` 未設定而 clean-skip）。本次 minor
bump 讓兩者對齊到同一版本，作為乾淨的 v1 起點。

隨附：新增 [`docs/token-naming-contract.md`](../docs/token-naming-contract.md)
（token 命名契約與 0.x 穩定性政策），並修正 `packages/tokens/README.md` 中
語意色階的文件漂移（`success/warn/error` → 實際的 `attention` + `function.*`）。

> 消費端注意：0.x 期間 token 名稱可能隨 2.0 品牌遷移改名，請鎖定窄版本範圍
> （`~0.3.0`）。詳見命名契約。
