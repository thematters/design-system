# Phase 9 — Matters Studio (spec)

> Status: **draft / not started**. This file is the spec for review before
> any code lands. Push back on any stack / scope choice; I'll iterate.
>
> Once this doc is merged, the actual implementation lands across a new
> repo `thematters/matters-studio` (separate from this DS repo).

---

## Why a Studio at all

Phases 0–8 built a **library** (tokens, React components, image templates,
slide theme, page-template starters). Library = "raw materials". Anyone
who can run `pnpm` can use it.

But Matters has roles where `pnpm` is not the primary tool:

- PM drafting an event landing
- Editor writing a newsletter header
- Marketing producing a Threads share image
- Community manager coordinating a 七日書 launch

For these roles, the library is **invisible**. They'll keep using Figma

- Canva + Google Slides because those tools have a UI matched to their
  workflow.

**Studio = the UI layer that exposes the library to non-engineers.**

```
Library (Phases 0–8)         Studio (Phase 9)            People
-----------------------      ---------------------       --------
tokens / components     ─┐
templates (image)        ├─►  one web app:        ──►   PM, editor,
slide-theme             │     dashboard +              marketing,
page-template starters  │     forms +                  community managers
render service          │     AI helper
                       ─┘     download / deploy
```

---

## Three user goals (the user's words, restated)

> **a.** 要做新網頁時，可以直接用 design system 自動部署設計 UI/UX
> **b.** 宣傳圖、簡報可以自動生成（網頁版）
> **c.** 未來主站要改內容時，可以自動修改

Mapped to deliverables:

| Goal                            | Studio feature                                                                               | Backed by (existing)                |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------- |
| **a**                           | Page wizard: pick template → fill form → preview → deploy to Cloudflare Pages with one click | `apps/page-templates/` (Phase 8b)   |
| **b1** OG / social / newsletter | Image form: template + JSON fields → live preview → download PNG                             | `services/render/` (Phase 7)        |
| **b2** Slides                   | Markdown editor + live Slidev preview + export PDF                                           | `apps/slide-theme/` (Phase 8a)      |
| **c** Site content edits        | Form-driven content editor that opens a PR against `thematters/matters-town`                 | (matters.town content layout — TBD) |

(c) is more involved than (a) and (b) because we don't yet know how
matters.town main stores content (DB? Git-as-CMS? Headless API?). I'll
spec (c) as Phase 10+ once we have that picture. **MVP focus: (a) + (b).**

---

## Stack recommendation

| Layer                      | Pick                                                                                         | Reason                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Frontend                   | **Vite + React 19 + TypeScript**                                                             | Matches lifeboat & DS React package. Team's existing skill. Fast HMR.                                               |
| Routing                    | **TanStack Router**                                                                          | Type-safe, file-based, no React-Router foot-guns.                                                                   |
| State                      | **TanStack Query** for server state, `useState` for forms                                    | No Redux. No Zustand. Forms are local; render results come from the backend.                                        |
| Styling                    | **CSS Modules + `@matters/design-system-tokens` CSS vars**                                   | Same as the React package. Consistent.                                                                              |
| Components                 | **`@matters/design-system-react`** (npm package, once published) or vendored copy until then | Re-use Button / TextField / Dialog / Toast / Avatar / Banner / ArticleCard.                                         |
| Backend                    | **Hono on Cloudflare Workers**                                                               | Edge-deployed, free tier huge. Same Hono runtime as `services/render/` so the API surface is consistent.            |
| Heavy renders (Playwright) | **Existing `services/render/` deployed to Fly.io**                                           | Workers can't run Playwright. Studio Workers proxy POST /render to Fly.                                             |
| AI                         | **Anthropic Claude via Workers binding**                                                     | Studio backend calls Claude API; user never sees a key. Streaming via SSE.                                          |
| Auth                       | **Cloudflare Access** (zero-config, allow `*@matters.town`)                                  | No code, no JWT plumbing, role-based via groups in CF dashboard.                                                    |
| Persistence                | **Cloudflare KV** for drafts, **Cloudflare R2** for rendered PNGs                            | Free tier covers initial usage.                                                                                     |
| Deploy                     | **Cloudflare Pages** (frontend) + **Workers** (API) + **Fly.io** (render service)            | Same place we already deploy lifeboat / fediverse-gateway.                                                          |
| Repo                       | **New repo: `thematters/matters-studio`**                                                    | Studio is product-shaped (UI + auth + persistence). DS repo is library-shaped (no auth, no DB). Different cadences. |

### Why not Next.js?

Next.js is the obvious default but:

- App Router is heavier than what Studio needs
- RSC + Server Actions add cognitive load for a small app
- Vercel deploy is fine but we already use Cloudflare for everything else (lifeboat, fediverse-gateway, soon render service)
- Switching a 4-person team between "Vite at lifeboat" and "Next at Studio" creates friction

### Why not Astro?

Astro is great for content-first marketing pages (we're using it for
page-templates in Phase 8b). But Studio is form-heavy + interactive +
needs real-time preview. Astro islands work but feel forced.
SvelteKit / Remix have similar trade-offs against existing team skill.

### What we lose with Vite + React

- No SSR (Studio is internal — irrelevant)
- No file-based routing magic (TanStack Router gives this back)
- No "framework-blessed" data layer (TanStack Query covers it)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│  Browser  (studio.matters.town, Cloudflare Access-gated)            │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Vite + React 19 + TanStack Router                            │   │
│  │ - Dashboard                                                   │   │
│  │ - /og-image  (form → preview → download)                     │   │
│  │ - /social-card                                                │   │
│  │ - /newsletter-header                                          │   │
│  │ - /landing/activity  (form → preview → "Deploy to Pages")    │   │
│  │ - /slides  (Markdown editor → live Slidev preview)           │   │
│  │ - /ai-helper  (titles / summaries / CTAs)                    │   │
│  └─────────────────────────┬────────────────────────────────────┘   │
└────────────────────────────┼─────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│  Cloudflare Workers  (api.studio.matters.town, Hono)                │
│  - POST /render-image          → proxy to Fly render service         │
│  - POST /deploy-page           → CF Pages Direct Upload API          │
│  - POST /ai/suggest-title      → Anthropic Claude (streaming)        │
│  - GET / POST /drafts          → CF KV                               │
│  - GET /assets                 → CF R2 (rendered PNG cache)          │
└──────┬──────────────────┬─────────────────────────┬──────────────────┘
       │                  │                         │
       ▼                  ▼                         ▼
┌──────────────┐  ┌────────────────────┐  ┌──────────────────────────┐
│  Fly.io      │  │  Anthropic API     │  │  Cloudflare Pages        │
│  render      │  │  (claude-4.7-      │  │  (Direct Upload)         │
│  service     │  │   sonnet)          │  │                          │
│              │  │                    │  │  → studio-output-        │
│  HTML→PNG    │  │  text suggestions  │  │     <hash>.pages.dev     │
└──────────────┘  └────────────────────┘  └──────────────────────────┘
```

### What's in Studio (frontend)

- Dashboard with 3-tile entry: 「做圖」/「做頁」/「做簡報」
- Each tile leads to a wizard:
  - Step 1: pick template / starter
  - Step 2: fill form (with AI-assisted suggestions ✨)
  - Step 3: preview (live)
  - Step 4: action — download PNG, deploy page, or export PDF

### What's in Studio backend (CF Workers)

- Stateless thin layer
- Most "work" is proxied: render → Fly, AI → Anthropic, page deploy → CF Pages API
- Handles:
  - Auth context (CF Access JWT verification)
  - Rate limiting (CF Workers Durable Objects)
  - Draft persistence (CF KV)
  - Asset cache (CF R2 for rendered PNGs, CDN-fronted)

---

## MVP scope (Phase 9.1)

**Smallest useful slice — 1.5 weeks of work**:

1. Repo + auth scaffolding
2. Dashboard with one tile: **OG Image**
3. OG Image wizard: form (tag / topic / title / summary / author / avatar) → live preview → download PNG
4. AI helper button next to **title** field: "Polish my title" → 3 suggestions

That's it. No landing page, no slides, no draft saving. Just: replace
the CLI workflow `pnpm template:render og-image --data x.json --out y.png`
with a web form.

If MVP works (PMs use it instead of asking eng to render), we expand.

### Phase 9.2 (next two weeks)

5. Social card + newsletter header tiles (same shape as OG Image)
6. Slides tile: Markdown editor + Slidev iframe preview + export PDF
7. Draft saving (CF KV)

### Phase 9.3 (a month out)

8. Landing page wizard (activity-landing starter, deploy to CF Pages)
9. Coming-soon + about-page wizards

### Phase 10+ (deferred — needs main-site context)

10. Goal (c): matters.town main-site content editor

---

## What stays in design-system repo

Nothing changes here. design-system continues to ship:

- Tokens (canonical source)
- React components
- Image templates + library
- Slide theme
- Page-template starters
- Render service

Studio **consumes** all of these via npm and HTTP. design-system stays
library-pure. Studio stays product-shaped. Two repos, one source of
truth.

---

## Concrete next moves (after this spec is approved)

1. Create `thematters/matters-studio` repo (or `mashbean/matters-studio` for the bootstrap if private)
2. Vite + React + TanStack Router skeleton
3. Cloudflare Pages connection + custom domain `studio.matters.town`
4. Cloudflare Access policy: allow `*@matters.town`
5. CF Workers (`api.studio.matters.town`) with Hono boilerplate
6. Wire `POST /render-image` → existing render service (deployed wherever)
7. Build OG Image wizard
8. Wire AI helper (title suggestions)
9. Ship MVP, dogfood internally, iterate

Each step ~half-day. Total MVP ~1.5 weeks.

---

## Open questions for you to decide

| Question        | Default I'd pick if you don't reply           | Why                                                         |
| --------------- | --------------------------------------------- | ----------------------------------------------------------- |
| Repo name       | `matters-studio`                              | Maps to `studio.matters.town`                               |
| Repo owner      | `thematters/`                                 | Org-owned for discoverability                               |
| Repo visibility | **public**                                    | DS is public, Studio is companion. Hides nothing important. |
| Subdomain       | `studio.matters.town`                         | Already provisioned for `matters.town` zone presumably      |
| Auth allowlist  | `*@matters.town` + `mashbean@gmail.com`       | All staff + you                                             |
| AI provider     | Anthropic Claude (via API key in Workers env) | We have access; quality matches the writing tone            |
| MVP scope       | OG Image only                                 | Smallest dogfoodable surface                                |

If any of those land wrong for Matters' constraints, push back on this
PR. Once merged, I start on `thematters/matters-studio` repo creation.

---

## What this spec is NOT

- A commitment to a launch date — it's a plan, not a release
- A replacement for Figma / Canva — Studio targets recurring patterns
  (OG, slides, landings); novel design work still happens in Figma
- A commitment to (c) goal in MVP — that's Phase 10+, after MVP proves
  the model

Comments / pushback welcome on this PR.
