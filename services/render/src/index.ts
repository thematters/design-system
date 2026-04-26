/**
 * @matters/design-system-render-service
 *
 * Skeleton HTTP wrapper around the Phase 6 template renderer.
 *
 *   POST /render/:template   →  PNG bytes
 *   GET  /healthz            →  "ok"
 *
 * Production hardening (auth, rate limits, S3 upload, request schema
 * validation, structured logging) is intentionally deferred to Phase 8+.
 */
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { chromium, type Browser } from "@playwright/test";
import {
  renderInBrowser,
  resolveTemplate,
  TemplateNotFoundError,
} from "./render.mjs";

const PORT = Number(process.env.PORT ?? 3000);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "";

const app = new Hono();

// Optional permissive CORS — only when CORS_ORIGIN is configured.
if (CORS_ORIGIN) {
  app.use("*", async (c, next) => {
    c.header("Access-Control-Allow-Origin", CORS_ORIGIN);
    c.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    c.header("Access-Control-Allow-Headers", "Content-Type");
    if (c.req.method === "OPTIONS") {
      return c.body(null, 204);
    }
    await next();
  });
}

app.get("/healthz", (c) => c.text("ok"));

// One browser per process. Lazy-launched on first render so /healthz
// stays cheap and the readiness probe can poke before Chromium is up.
let browserPromise: Promise<Browser> | null = null;
function getBrowser(): Promise<Browser> {
  if (!browserPromise) {
    browserPromise = chromium.launch();
  }
  return browserPromise;
}

app.post("/render/:template", async (c) => {
  const name = c.req.param("template");

  let resolved;
  try {
    resolved = await resolveTemplate(name);
  } catch (err) {
    if (err instanceof TemplateNotFoundError) {
      return c.json({ error: "template_not_found", template: name }, 404);
    }
    throw err;
  }

  let body: Record<string, unknown>;
  try {
    body = (await c.req.json()) as Record<string, unknown>;
  } catch {
    return c.json({ error: "invalid_json" }, 400);
  }

  const { scale: rawScale, ...data } = body;
  let scale = 1;
  if (rawScale !== undefined) {
    const n = Number(rawScale);
    if (!Number.isFinite(n) || (n !== 1 && n !== 2)) {
      return c.json(
        { error: "invalid_scale", message: "scale must be 1 or 2" },
        400,
      );
    }
    scale = n;
  }

  try {
    const browser = await getBrowser();
    const { buffer } = await renderInBrowser({
      browser,
      templateDir: resolved.templateDir,
      templateHtml: resolved.templateHtml,
      data,
      scale,
    });
    c.header("Content-Type", "image/png");
    c.header("Content-Length", String(buffer.length));
    // Hono's c.body() type narrows on a few primitives; convert the
    // Node Buffer to an ArrayBuffer slice so it picks the right overload.
    return c.body(
      buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      ) as ArrayBuffer,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // eslint-disable-next-line no-console
    console.error(`[render] ${name} failed:`, message);
    return c.json({ error: "render_failed", message }, 500);
  }
});

const server = serve({ fetch: app.fetch, port: PORT }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`[render-service] listening on :${info.port}`);
});

// Graceful shutdown: close the browser if it was launched.
async function shutdown(signal: string) {
  // eslint-disable-next-line no-console
  console.log(`[render-service] received ${signal}, shutting down`);
  server.close();
  if (browserPromise) {
    try {
      const b = await browserPromise;
      await b.close();
    } catch {
      /* ignore */
    }
  }
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
