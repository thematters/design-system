# CC & Branding Studio Workflow

This is the implementation contract for Matters Studio.

## Generation Model

Studio should not ask the image model to produce final designed posters.
The workflow is:

1. User chooses a use case and category.
2. Studio loads category rules from `cc-branding-categories.json`.
3. User fills structured fields.
4. Studio generates or selects a text-free background.
5. Studio renders final text, logo, spacing, and output size through templates.
6. User downloads PNG.

## Figma Frame Export

All CC & Branding frames are indexed from the catalog and exported through a
resumable manifest:

```bash
node scripts/extract-brand-figma.mjs render-all-frames --scale 0.5
```

Useful safe modes:

```bash
# Write the full export manifest without calling the Figma image API.
node scripts/extract-brand-figma.mjs render-all-frames --scale 0.5 --manifest-only

# Smoke-test one frame without waiting through long rate-limit retries.
node scripts/extract-brand-figma.mjs render-all-frames --scale 0.5 --limit 1 --attempts 1
```

The exporter writes
`brand/sources/figma/cc-branding/exports/all-frames/manifest.json`, skips files
that already exist, and can be re-run after Figma rate limits reset.

## Use Cases To Productize First

1. 文章金句
2. 活動海報
3. Campaign 宣傳圖
4. 七日書批次題目卡

These are the highest-return flows because they have clear inputs and strong
Figma precedent.

## UX Rules

- Start from "what do you need to make?", not from raw template names.
- Keep generated image and final layout as two separate steps.
- Show category examples before asking for fields.
- Keep an editable preview visible while filling fields.
- Never expose OpenAI API keys in the browser; call Studio Worker endpoints.
- Let the user use an existing background first, then offer AI generation as an optional background action.
- Batch mode is only for highly structured flows such as 七日書.
