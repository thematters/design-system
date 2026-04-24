# Templates

運營（Ops / Marketing）使用的模板集合。

## Source of Truth

Figma `CC & Branding`（fileKey: `HQ5Y6bBc9dVDT99u8Qvkb5`）。原本運營會用自己的帳號登入 Figma 複製修改；此處要把「可程式化」的模板抽出來做成資料驅動版本。

## 模板類型

- 社群圖（IG post / story、Threads 縮圖、Twitter card）
- 活動宣傳圖（七日書、徵文、主題週）
- OG-image（文章分享縮圖）
- Email newsletter header

## OG-image generator plan

1. 模板以 HTML/CSS + 變數（title / author / tag / cover）描述
2. `scripts/og.ts` 用 satori 或 playwright 把模板 render 成 PNG
3. 接到站台文章頁，上傳時自動產生預設 OG

## 現況

Phase 0：尚未填入任何模板。下一步先手動從 CC & Branding 挑 1–2 個高頻模板轉成 HTML 版本作 PoC。
