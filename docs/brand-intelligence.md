# Matters Brand Intelligence Workflow

This repo now treats Matters promotional design as a versioned system:
Figma remains the design source, while this repo stores the extracted rules,
templates, prompts, and repeatable generation jobs.

## Canonical Repo Decision

Use `thematters/design-system`, not a new repo.

Reason: this repo already owns tokens, operational templates, Storybook, and the
HTML-to-PNG render service. Promotional image generation is a direct extension
of that system; splitting it into a new repo would create two visual truth
sources.

## What We Learn From Existing Materials

| Layer                                     | Stored as                                                | Owner                  |
| ----------------------------------------- | -------------------------------------------------------- | ---------------------- |
| Brand source files                        | `docs/figma-inventory.md`, `brand/sources/**`            | Design system          |
| Color, typography, spacing rules          | `tokens/**`, `brand/style-profiles/**`                   | Design system          |
| Activity categories and template families | `brand/catalogs/**`, `docs/cc-branding-style-catalog.md` | Design system / Studio |
| Repeatable image prompts                  | `brand/prompts/**`                                       | Design system          |
| One-click generation jobs                 | `brand/jobs/**`                                          | Ops / design           |
| Deterministic layout                      | `templates/**`                                           | Design system          |

## Current Primary Source

`CC & Branding`

- Figma file key: `HQ5Y6bBc9dVDT99u8Qvkb5`
- Local source descriptor: `brand/sources/figma/cc-branding/source.json`
- Extraction script: `scripts/extract-brand-figma.mjs`

The browser URL may return 403 from automation. Use the Figma REST API with a
personal access token instead:

```bash
cp .env.example .env
# add FIGMA_TOKEN=...
pnpm brand:figma -- cache
pnpm brand:figma -- inventory
pnpm brand:catalog
```

## Generation Contract

The default pipeline is:

```bash
pnpm visual:create -- --job brand/jobs/background-card.example.json
```

For generated backgrounds, change the job to:

```json
{
  "background": {
    "mode": "generate",
    "brief": "A thoughtful editorial background...",
    "size": "2048x2048"
  }
}
```

Then run with `OPENAI_API_KEY` in `.env`.

## Why Text Is Not Generated Inside The Image

Generated text is still less reliable than HTML/CSS for Chinese typography,
line breaks, logo placement, and exact brand marks. The image model should
produce the background; this repo should render the final text and layout.

That gives us:

- repeatable typography
- correct Matters logo usage
- predictable safe areas
- reusable templates for many campaigns
- reviewable diffs in GitHub

## Review Checklist

Before publishing a generated visual:

- Text is readable at mobile social-feed size.
- No generated pseudo text, fake logos, or UI artifacts remain in the background.
- Purple/green accents support the message instead of becoming decoration only.
- The final PNG can be regenerated from a committed job file.
- The Figma source or prompt profile is cited in the job metadata.
