# Newsletter header

600 × 200 banner for the top of email newsletters. Brand-forward —
purple gradient + lime corner accent — reinforces visual identity in
the inbox where Matters competes with everything else.

## Input schema

| Field         | Type   | Required | Notes                                           |
| ------------- | ------ | -------- | ----------------------------------------------- |
| `eyebrow`     | string | yes      | Newsletter name (e.g. "Matters Weekly")         |
| `title`       | string | yes      | Issue headline; clamps at 2 lines               |
| `issueDate`   | string | yes      | Locale-formatted date string (renders verbatim) |
| `issueNumber` | string | yes      | "Vol. 142" / "第 142 期"                        |

## Visual notes

- Brand purple gradient (top-left → bottom-right darker)
- Lime green decorative corner circle (clipped) at bottom-right
- Title in Noto Serif TC for editorial feel
- 2-line title clamp because email clients vary in width tolerance

## Render

```bash
pnpm template:render newsletter-header
```
