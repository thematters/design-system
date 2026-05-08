# CC & Branding Image 2 Prompt Guide

Use these prompts as starting points for OpenAI `gpt-image-2` background generation.
The generated image should stay text-free. Matters logo, Chinese copy, CTA, dates, and final layout are rendered by Studio templates.

Canonical machine-readable source:

- `brand/catalogs/cc-branding-categories.json` → `category.studioWorkflow.prompt`

## Shared Negative Prompt

```text
No readable text. No pseudo letters. No logos. No fake Matters mark. No UI screenshots. No QR codes. No watermark. Leave a clear text-safe area for Traditional Chinese typography.
```

## Category Prompts

### 新手指南

- Category ID: `getting-started`
- Product line: Shared
- Primary sizes: reference only

```text
No image-generation prompt. This category is onboarding and usage guidance only.
```

### Matters.Town 社媒與站內公告

- Category ID: `matters-town-core`
- Product line: Matters.Town
- Primary sizes: 1594x900, 1000x1000, 1500x500, 1594x907, 1200x206

```text
Create a text-free Matters.Town social announcement background. Abstract digital commons, calm editorial geometry, teal or mint legacy references may appear but use modern Matters purple #7258FF and lime #C3F432 as accents. Leave a clean text-safe area on the left or center. No readable text, no logo, no UI screenshot, no QR code.
```

### Matters.Town 文章金句

- Category ID: `matters-town-quotes`
- Product line: Matters.Town
- Primary sizes: 1200x1200, 2000x1333, 2000x1002

```text
Create a text-free square quote-card background for Matters.Town. Literary, reflective, suitable for Traditional Chinese long-form quote overlay. Use soft paper texture, subtle light, abstract reading or public conversation motifs. Keep the center or upper-left area calm and high contrast for large Chinese serif text. No words, no symbols that look like letters, no logo.
```

### Matters.Town 活動與產品宣傳

- Category ID: `matters-town-campaigns`
- Product line: Matters.Town
- Primary sizes: 1200x1200, 1080x1920, 1080x1080, 1000x1000, 610x233

```text
Create a text-free campaign background for Matters.Town. Contemporary civic writing platform, product announcement or annual survey mood, clean but warm. Use a coherent campaign visual system with purple #7258FF and lime #C3F432 accents, geometric blocks, paper or digital commons motifs. Leave clear safe areas for headline, date and CTA. No readable text, no UI, no logo.
```

### Matters Lab 社媒與活動海報

- Category ID: `matters-lab-social`
- Product line: Matters Lab
- Primary sizes: 1000x1000, 1200x678, 1200x900, 1200x1200, 1594x900

```text
Create a text-free Matters Lab event poster background. Experimental research lab, open technology, public-interest infrastructure, web3 or digital society themes. Dark or high-contrast base with geometric networks, subtle gradients, and space for event title plus speaker metadata. Use purple #7258FF and lime #C3F432 accents. No readable text, no logos, no interface mockups.
```

### 自由寫品牌模板

- Category ID: `freewrite-core`
- Product line: 自由寫
- Primary sizes: 1080x1350, 4096x4096, 688x160, 1080x1080, 2500x925

```text
Create a text-free Freewrite editorial background. Literary writing activity, seasonal reading, paper, notebook, soft illustration, intimate creative atmosphere. Use a coherent palette with subtle Matters purple and lime accents, but allow warmer seasonal colors. Leave generous space for vertical Traditional Chinese title overlay. No words, no logo, no UI.
```

### 自由寫季節活動

- Category ID: `freewrite-seasonal`
- Product line: 自由寫
- Primary sizes: 1080x1350, 1080x1080, 1920x1440, 2500x925, 688x160

```text
Create a text-free seasonal Freewrite campaign background. Choose a coherent seasonal illustration system: spring/summer/autumn/winter literary mood, reading, walking, notebooks, city textures, quiet creative life. Leave consistent title-safe areas for a series of Traditional Chinese posts. Use restrained Matters purple and lime accents. No readable text, no logo.
```

### 七日書

- Category ID: `seven-day-book`
- Product line: 自由寫 / 七日書
- Primary sizes: 1080x1080, 2000x2000, 1080x1350, 2279x2338, 259x119

```text
Create a text-free Seven Day Book prompt-card background. A 7-day reading and writing challenge, literary, playful but calm, suitable for batch topic cards. Use a consistent series visual system with book, page, bookmark, calendar or quiet reading motifs. Leave a large clean area for day number and Traditional Chinese topic text. No readable text, no logo.
```

### The Space

- Category ID: `the-space`
- Product line: The Space
- Primary sizes: 1200x630

```text
Create a text-free event background for The Space by Matters. Intimate online talk, open conversation, calm dark stage, subtle spatial geometry, enough safe area for event title and date. Use restrained purple and lime accents. No readable text, no logo.
```

### Traveloggers

- Category ID: `traveloggers`
- Product line: Traveloggers
- Primary sizes: reference only

```text
Create a text-free Traveloggers background. Travel writing, playful exploration, maps, postcards, routes, memory fragments, warm social journey atmosphere. Leave room for title and caption. No readable text, no logo.
```

## Prompt Rules

- Generate only the background layer.
- Put desired visual mood, motif, palette, and text-safe area in the prompt.
- Do not ask the image model to draw Traditional Chinese text, Matters logo, QR codes, UI, dates, speaker names, or CTA.
- After background generation, use Studio templates for final text layout and PNG export.
