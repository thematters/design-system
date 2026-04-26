# OG image template

1200 × 630 share card for an article. Used as the `og:image` /
`twitter:image` for sharing matters.town articles on Threads / Twitter /
Mastodon / Slack.

## Input schema

| Field             | Type   | Required | Notes                                          |
| ----------------- | ------ | -------- | ---------------------------------------------- |
| `tag`             | string | yes      | Short label, ≤ 4 chars (e.g. "創作", "區塊鏈") |
| `topic`           | string | no       | Sub-label (e.g. "深度長文", "活動")            |
| `title`           | string | yes      | Article title; clamps at 3 lines               |
| `summary`         | string | no       | Dek; clamps at 2 lines                         |
| `authorName`      | string | yes      | Display name                                   |
| `authorHandle`    | string | yes      | matters.town handle (no `@`)                   |
| `authorAvatarUrl` | url    | yes      | Square avatar; resized to 56×56                |

## Render

```bash
pnpm template:render og-image \
  --data templates/og-image/data.example.json \
  --out /tmp/og.png
```

Or quick:

```bash
pnpm template:render og-image
# → templates/.example-output/og-image.png
```

## Visual notes

- Title in Noto Serif TC 64/80 (literary feel)
- Body in Noto Sans TC
- Subtle vertical gradient from white to `--color-primary-0` (lightest purple) — gives the card a Matters identity without overpowering the title
- Lime green tag chip — primary brand accent
- Two-circle Matters mark in the bottom-right corner

## Design alignment

Pulls colors / spacing from `packages/tokens/dist/tokens.css`. Don't
hard-code values — change the token, regenerate, all templates updated.
