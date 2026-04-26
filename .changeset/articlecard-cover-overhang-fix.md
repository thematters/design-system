---
"@matters/design-system-react": patch
---

`ArticleCard`: fix cover image overhang when the title fits in a single
line. The text column now has `min-height` matching the cover size
(76px small / 106px big) with vertically centered content, so the cover
no longer orphans below the text on wider viewports.
