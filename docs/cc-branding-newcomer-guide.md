# CC & Branding 新手指南

當你要從既有 Figma 風格產生一張新的 Matters 圖，先照這份指南選分類、尺寸與生成方式。

## 快速開始

1. 先選活動家族：Matters.Town、Matters Lab、自由寫、七日書、The Space 或 Traveloggers。
2. 再選需求：文章金句、活動海報、campaign 宣傳圖、季節系列、批次題目卡。
3. 從該分類既有常用尺寸中選畫布，不要先發明新尺寸。
4. 產生或選擇不含文字的底圖。
5. 中文文字、logo、CTA 一律交給 template render，不放進 AI 生成圖片裡。

## 我該選哪一類？

| 需求                    | 從這類開始                  | 原因                                    |
| ----------------------- | --------------------------- | --------------------------------------- |
| 文章摘句或作者金句      | Matters.Town 文章金句       | 既有 1200x1200 金句模板最完整。         |
| 研究活動 / AMA / 講者卡 | Matters Lab 社媒與活動海報  | 適合日期、講者、平台等高資訊密度。      |
| 文學與寫作活動          | 自由寫品牌模板              | IG portrait 系統最完整，也有季節語氣。  |
| 七日書題目批次生成      | 七日書                      | 題目、月份、天數最適合結構化批次出圖。  |
| 產品或 campaign 公告    | Matters.Town 活動與產品宣傳 | 含問卷、產品、campaign 與 banner 變體。 |

## 常用尺寸規則

| 分類                        | 優先沿用這些既有尺寸                                                             |
| --------------------------- | -------------------------------------------------------------------------------- |
| Matters.Town 社媒與站內公告 | 1594x900 x13<br>1000x1000 x6<br>1500x500 x3<br>1594x907 x3<br>1200x206 x2        |
| Matters.Town 文章金句       | 1200x1200 x40<br>2000x1333 x8<br>2000x1002 x5                                    |
| Matters.Town 活動與產品宣傳 | 1200x1200 x111<br>1080x1920 x39<br>1080x1080 x18<br>1000x1000 x17<br>610x233 x14 |
| Matters Lab 社媒與活動海報  | 1000x1000 x68<br>1200x678 x32<br>1200x900 x30<br>1200x1200 x27<br>1594x900 x22   |
| 自由寫品牌模板              | 1080x1350 x87<br>4096x4096 x12<br>688x160 x8<br>1080x1080 x7<br>2500x925 x7      |
| 自由寫季節活動              | 1080x1350 x202<br>1080x1080 x32<br>1920x1440 x14<br>2500x925 x9<br>688x160 x7    |
| 七日書                      | 1080x1080 x13<br>2000x2000 x4<br>1080x1350 x3<br>2279x2338 x2<br>259x119 x2      |
| The Space                   | 1200x630 x1                                                                      |

## 文字規則

- AI 生成圖保持無字。
- 繁體中文文字用 template render，才能穩定控制換行、字重與 logo 位置。
- 主標長度依版型限制：金句卡可承載較長文字；活動海報要短標題加結構化資訊。
- Figma 樣本常見 `jf-jinxuan`、`Noto Serif TC`、`Noto Sans TC`；網頁端若沒有授權字體，需用 Noto 系列或已授權 webfont 做 fallback。
- Serif 用於 editorial 強調；sans 用於 metadata、CTA、日期與欄位資訊。

## 底圖規則

- 底圖要留清楚文字安全區。
- 紫色與萊姆綠要支撐分類語氣，不只是通用裝飾。
- 產品 / campaign 可以更乾淨；自由寫與七日書可以更文學、季節化。
- 不要要求影像模型畫 Matters logo、UI 截圖、QR code 或中文文案。

## Matters Studio 介面契約

Studio UI 應讀取 `brand/catalogs/cc-branding-categories.json`，並提供：

- 文章金句：欄位 quote, authorName, sourceTitle, brandLine；輸出 1200x1200, 1080x1350。
- 活動海報：欄位 eventTitle, date, time, speakers, platform, cta；輸出 1200x630, 1000x1000, 1080x1350。
- Campaign 宣傳圖：欄位 campaignName, headline, deck, cta, background；輸出 1080x1080, 1080x1350, 688x160, 1200x460。
- 七日書批次題目卡：欄位 season, month, topics[], dayNumber；輸出 1080x1080, 1080x1350。

生成流程應分兩步：先產生底圖，再用 HTML/CSS 做確定性排版。
