/**
 * Phase 6 template renderer — pure library form.
 *
 * Single source of truth for "HTML template + JSON data → PNG buffer".
 * Used by:
 *   - scripts/render-template.mjs (CLI)
 *   - services/render/src/index.ts (HTTP service)
 *
 * The CLI handles file I/O + arg parsing around this; the service
 * handles HTTP + a long-lived browser around this.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// services/render/src/ → repo root is ../../..
export const REPO_ROOT = path.resolve(HERE, "..", "..", "..");
export const TEMPLATES_DIR = path.join(REPO_ROOT, "templates");

/**
 * Substitute {{key}} placeholders with HTML-escaped data values.
 * Missing keys become empty string with an optional warning callback.
 */
export function substitutePlaceholders(html, data, onMissing) {
  return html.replace(/\{\{(\w+)\}\}/g, (_m, key) => {
    if (!(key in data)) {
      if (onMissing) onMissing(key);
      return "";
    }
    return String(data[key])
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  });
}

export class TemplateNotFoundError extends Error {
  constructor(name) {
    super(`template not found: ${name}`);
    this.name = "TemplateNotFoundError";
    this.template = name;
  }
}

/**
 * Find templates/<name>/template.html on disk. Throws TemplateNotFoundError
 * if missing — used by the HTTP layer to map to a 404.
 */
export async function resolveTemplate(name) {
  const templateDir = path.join(TEMPLATES_DIR, name);
  const templateHtml = path.join(templateDir, "template.html");
  try {
    await fs.access(templateHtml);
  } catch {
    throw new TemplateNotFoundError(name);
  }
  return { templateDir, templateHtml };
}

/**
 * Parse <meta name="ds-template-size" content="WxH"> from HTML.
 * Returns { width, height } or throws.
 */
export function extractCanvasSize(html) {
  const m = html.match(
    /<meta\s+name=["']ds-template-size["']\s+content=["'](\d+)x(\d+)["']/i,
  );
  if (!m) {
    throw new Error(
      'template missing <meta name="ds-template-size" content="WxH">',
    );
  }
  return { width: Number(m[1]), height: Number(m[2]) };
}

/**
 * Render a single template inside an existing browser. Caller owns the
 * browser lifecycle, so the server can launch once and reuse.
 *
 * For a one-shot render, see renderTemplate().
 */
export async function renderInBrowser({
  browser,
  templateDir,
  templateHtml,
  data,
  scale = 1,
  onMissingKey,
}) {
  const rawHtml = await fs.readFile(templateHtml, "utf8");
  const html = substitutePlaceholders(rawHtml, data, onMissingKey);
  const { width, height } = extractCanvasSize(html);

  // Write substituted HTML to a temp file alongside the template so the
  // browser can resolve relative <link> hrefs (../shared/tokens.css etc.).
  // Unique per-call so parallel renders don't collide.
  const tempName = `.rendered.${process.pid}.${Date.now()}.${Math.random()
    .toString(36)
    .slice(2, 8)}.html`;
  const tempHtmlPath = path.join(templateDir, tempName);
  await fs.writeFile(tempHtmlPath, html);

  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
  });
  const page = await context.newPage();

  try {
    await page.goto(pathToFileURL(tempHtmlPath).href, {
      waitUntil: "networkidle",
    });

    // Settle: fonts + images
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await Promise.all(
        Array.from(document.images)
          .filter((i) => !i.complete)
          .map(
            (i) =>
              new Promise((resolve) => {
                i.addEventListener("load", () => resolve(undefined), {
                  once: true,
                });
                i.addEventListener("error", () => resolve(undefined), {
                  once: true,
                });
              }),
          ),
      );
    });

    const canvas = page.locator(".tpl-canvas").first();
    const buffer = await canvas.screenshot({ type: "png" });
    return { buffer, width, height, scale };
  } finally {
    await context.close();
    try {
      await fs.unlink(tempHtmlPath);
    } catch {
      /* ignore */
    }
  }
}

/**
 * One-shot render: launch a browser, render, close.
 *
 * Convenience wrapper used by the CLI. Don't use this in the HTTP
 * service hot path — it pays the ~1s browser-launch cost per call.
 */
export async function renderTemplate({ name, data, scale = 1, onMissingKey }) {
  const { templateDir, templateHtml } = await resolveTemplate(name);
  const browser = await chromium.launch();
  try {
    return await renderInBrowser({
      browser,
      templateDir,
      templateHtml,
      data,
      scale,
      onMissingKey,
    });
  } finally {
    await browser.close();
  }
}

/**
 * List available templates by directory name.
 * Skips dotfiles, "shared", README.md, etc.
 */
export async function listTemplates() {
  let entries;
  try {
    entries = await fs.readdir(TEMPLATES_DIR, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => !n.startsWith(".") && n !== "shared");
}
