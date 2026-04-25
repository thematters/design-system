# Social card template

1080 × 1080 square share card. Quote-forward — designed for IG post,
Threads, FB, Mastodon. Pulls a memorable line from an article + the
author's handle.

## Input schema

| Field             | Type   | Required | Notes                                               |
| ----------------- | ------ | -------- | --------------------------------------------------- |
| `eyebrow`         | string | yes      | Top-left context (e.g. "本週精選", "活動 #2026 春") |
| `quote`           | string | yes      | The pull quote; clamps at 6 lines (~120 CJK chars)  |
| `authorName`      | string | yes      | Display name                                        |
| `authorHandle`    | string | yes      | matters.town handle (no `@`)                        |
| `authorAvatarUrl` | url    | yes      | Square avatar; resized to 64×64                     |

## Visual notes

- Black background with subtle purple+lime radial accents in opposite corners
- Quote in Noto Serif TC, big and centered, with lime green CJK quote brackets
- Avatar ring in lime green to echo the quote brackets
- "matters.town" footer in lime — single brand cue per surface

## Render

```bash
pnpm template:render social-card
```
