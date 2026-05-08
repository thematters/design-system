# Matters Brand Intelligence

This folder is the machine-readable layer for Matters promotional design:
source Figma files, extracted visual rules, prompt recipes, and one-click
generation jobs.

## Source Boundary

The primary source is Figma `CC & Branding`, file key
`HQ5Y6bBc9dVDT99u8Qvkb5`.

The public Figma URL may not be readable from automation because Figma pages
often require a logged-in browser. Automated extraction therefore uses the
Figma REST API with `FIGMA_TOKEN`.

## Folder Map

| Path | Purpose |
| --- | --- |
| `sources/figma/cc-branding/` | Cached Figma metadata and exported node images. Raw cache is ignored until intentionally committed. |
| `style-profiles/` | Machine-readable visual rules learned from brand assets. |
| `prompts/` | Prompt recipes for OpenAI image generation. |
| `jobs/` | One-click generation job files. |

## Working Model

The generation flow separates image and typography:

1. Use OpenAI Image API to create a text-free background or illustration.
2. Use repo templates to apply Matters typography, logo, spacing, and layout.
3. Render the final asset through the same HTML-to-PNG renderer used by ops
   templates.

This keeps words and layout deterministic while still using image generation
for atmospheric or editorial backgrounds.

