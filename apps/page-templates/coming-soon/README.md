# Coming Soon Starter

Astro static-site starter for **single-screen coming-soon / waitlist** pages —
launch teasers, beta sign-ups, holding pages.

Single-screen, centered, with countdown + email capture.

## What you edit

Just **`src/content/page.ts`** — brand label, eyebrow, headline, lead copy,
launch timestamp, waitlist endpoint, footer.

## Sections shipped

- Brand mark (top-center)
- Eyebrow tagline (with pulse dot)
- Big serif headline
- Lead paragraph
- **Countdown timer** (vanilla JS, runs to `launchAt`; set to `null` to hide)
- **Email waitlist form** (POSTs to `waitlist.endpoint`; set to `null` to hide)
- Footer with social links

## Wiring up the waitlist

The form sends `application/x-www-form-urlencoded` to `waitlist.endpoint` via
`fetch` with `mode: "no-cors"` (so it works for opaque-response endpoints like
Buttondown, Mailchimp, etc.). The submit handler always shows the success
message unless `fetch` itself throws — for stronger validation, add server-side
double-opt-in.

Examples:

```ts
// Buttondown
endpoint: "https://buttondown.email/api/emails/embed-subscribe/<your-handle>";

// Mailchimp embedded form
endpoint: "https://<dc>.list-manage.com/subscribe/post?u=<u>&id=<id>";

// Netlify Forms — set endpoint to "/" and add data-netlify="true" on the
// form; you'll need to flip a toggle in src/components/EmailWaitlistForm.astro.

// Self-hosted (recommended): your own Worker / Lambda that accepts
// `email=...` and writes to a list.
endpoint: "https://api.example.com/waitlist";
```

To disable the form entirely, set `waitlist.enabled = false`.

## Local dev

```bash
pnpm install
pnpm dev          # → http://localhost:4321
pnpm build        # → dist/
pnpm typecheck
```

## Deploy

`dist/` is plain static HTML. See the
[activity-landing README](../activity-landing/README.md#deploy) for
Cloudflare Pages / GitHub Pages / Netlify recipes — they apply identically.

## Tokens

Tokens are vendored at `src/styles/vendor/tokens.css`. Re-vendor with:

```bash
cp packages/tokens/dist/tokens.css \
  apps/page-templates/coming-soon/src/styles/vendor/tokens.css
```
