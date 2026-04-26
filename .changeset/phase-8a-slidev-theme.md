---
---

Phase 8a: add `apps/slide-theme/` — a private Slidev theme + 3 example decks
that render Markdown presentations in the Matters visual language.

The package is `@matters/slide-theme-slidev`, marked `private: true`. It is
not published to npm and does not affect any of the existing
`@matters/design-system-{tokens,react}` versions. Slidev (`@slidev/cli`,
`@slidev/types`) is declared as an optional peer dependency so consumers can
run via `pnpm dlx @slidev/cli` or `npx @slidev/cli` without a workspace
install.

Includes 4 layouts (`default`, `cover`, `two-column`, `full-image`) and 3
real example decks (product pitch, 七日書 2026 春 啟動會, internal Q1
review with KPI table). Tokens (`tokens.css`) and brand SVGs are reused
directly from the existing monorepo, so the theme stays aligned with the
React component library and the OG-image / social-card templates from
Phase 6.
