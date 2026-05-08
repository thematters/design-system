# OpenAI Image Generation Workflow

This repo uses OpenAI Image API for generated backgrounds and the local
template renderer for final typography and layout.

## Model

Default model: `gpt-image-2`.

OpenAI's current image-generation guide says the API can generate and edit
images from text prompts with GPT Image models, including `gpt-image-2`, and
that single-prompt generation is a good fit for the Image API:
<https://developers.openai.com/api/docs/guides/image-generation>.

Access note: `gpt-image-2` may require OpenAI Organization verification. If the
API returns an organization verification error, complete verification in the
OpenAI platform settings, or run a local fallback test with `--model
gpt-image-1` while waiting for access to propagate.

## Environment

Create `.env`:

```bash
OPENAI_API_KEY=...
FIGMA_TOKEN=...
```

Do not commit `.env`.

## Generate Background Only

```bash
pnpm image:background -- \
  --brief "A calm editorial background for a digital writing community" \
  --out templates/.generated/backgrounds/community.png \
  --size 2048x2048
```

Fallback test:

```bash
pnpm image:background -- \
  --model gpt-image-1 \
  --brief "A calm editorial background for a digital writing community" \
  --out templates/.generated/backgrounds/community.png \
  --size 1024x1024
```

The script composes the prompt from:

- `brand/style-profiles/matters-brand-v1.json`
- `brand/prompts/background.v1.md`
- the `--brief` text or job JSON

## Generate Final Campaign Visual

```bash
pnpm visual:create -- --job brand/jobs/background-card.example.json
```

When the job uses `background.mode = "generate"`, this creates:

1. a generated background PNG
2. a final rendered Matters visual with deterministic text and logo layout

When the job uses `background.mode = "asset"`, it skips the API call and uses
the `backgroundUrl` already present in the job data. This is useful for tests
and local dry runs.

## Recommended Pattern

Use the image model for:

- abstract editorial backgrounds
- atmospheric textures
- visual metaphors
- non-text illustration

Use templates for:

- Chinese text
- logo
- tag lines
- CTA
- layout and safe areas

This avoids fragile generated text and keeps the final output aligned with the
design system.
