---
"@matters/design-system-react": patch
---

`ArticleCard`: also fix the Small variant's cover-vs-text alignment
(text wraps to 2 lines but cover stays 76px → cover hung at top with
empty space below). Switched `.content` from `align-items: flex-start`
to `align-items: center` so the cover vertically centers with the
text whether text is taller or shorter than cover.

Combined with the prior `min-height` fix on `.text`, both Big (text
shorter than cover) and Small (text taller than cover) variants now
render with the cover balanced relative to the text content.
