# @matters/design-system-render-service

HTTP wrapper around the Phase 6 [template renderer](../../docs/templates.md).
POST a JSON body, get a PNG.

This is a **skeleton**: works end-to-end for one template at a time
and has clear extension points, but is NOT production-ready. Auth,
rate limiting, S3 upload, structured logging, and per-template request
schema validation are deferred to Phase 8+. Deploy when matters.town
backend is ready to auto-generate OG images.

## Endpoints

| Method | Path                | Body                                                 | Response                |
| ------ | ------------------- | ---------------------------------------------------- | ----------------------- |
| POST   | `/render/:template` | JSON matching `data.example.json` + optional `scale` | `image/png`             |
| GET    | `/healthz`          | —                                                    | `200 ok` (`text/plain`) |

`:template` is the directory name under [`templates/`](../../templates).
Currently: `og-image`, `social-card`, `newsletter-header`.

`scale` (optional, default `1`) accepts `1` or `2`. `2` produces a
retina PNG at twice the canvas DPR.

### Errors

| Status | Body                                            | When                                  |
| ------ | ----------------------------------------------- | ------------------------------------- |
| 400    | `{"error":"invalid_json"}`                      | Body is not valid JSON                |
| 400    | `{"error":"invalid_scale", ...}`                | `scale` is not 1 or 2                 |
| 404    | `{"error":"template_not_found","template":"x"}` | `templates/<x>/template.html` missing |
| 500    | `{"error":"render_failed","message":"..."}`     | Playwright threw                      |

## Local dev

```bash
# from monorepo root
pnpm install
pnpm exec playwright install chromium     # one-time
pnpm --filter @matters/design-system-render-service build
pnpm --filter @matters/design-system-render-service start
```

Then from another terminal:

```bash
curl -X POST http://localhost:3000/render/og-image \
  -H "Content-Type: application/json" \
  -d @templates/og-image/data.example.json \
  -o /tmp/og.png
```

## Deploy with Docker

```bash
# build context must be the monorepo root
docker build -f services/render/Dockerfile -t matters-render .
docker run --rm -p 3000:3000 matters-render

# probe
curl http://localhost:3000/healthz
```

Base image: `mcr.microsoft.com/playwright:v1.48.0-jammy` — ships
Chromium + Linux deps, so cold-start doesn't reinstall anything.

## Configuration

| Env var       | Default | Notes                                                  |
| ------------- | ------- | ------------------------------------------------------ |
| `PORT`        | `3000`  | HTTP port                                              |
| `CORS_ORIGIN` | unset   | When set, sends `Access-Control-Allow-Origin: <value>` |

## Architecture

```
HTTP request
   ↓
Hono router  (src/index.ts)
   ↓
renderInBrowser()  (src/render.mjs ← single source of truth, also used by CLI)
   ↓
Playwright Chromium  (one Browser per process, fresh Context per request)
   ↓
PNG buffer
```

The same `render.mjs` library is what `scripts/render-template.mjs`
(the CLI) calls. Don't fork the implementation.

## NOT included (Phase 8+)

- Auth (API tokens / mTLS / signed requests)
- Per-IP or per-token rate limiting
- Per-template request schema validation — today the caller is trusted
  to send the right shape; missing keys render as empty strings with
  no error
- Image upload to S3 / R2 / IPFS — caller currently has to take the
  PNG bytes and upload them itself
- Structured logging / metrics / tracing
- Concurrency limits — Playwright will happily fork unlimited contexts
- Smart caching (today every request renders fresh)

When matters.town backend wires this up, those become real concerns.
