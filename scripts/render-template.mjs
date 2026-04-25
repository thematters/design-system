#!/usr/bin/env node
/**
 * render-template — turn a Matters DS HTML/CSS template into a PNG.
 *
 * Usage:
 *   node scripts/render-template.mjs <template-name>
 *     [--data <path-to-json>]    (default: templates/<name>/data.example.json)
 *     [--out <path-to-png>]      (default: templates/.example-output/<name>.png)
 *     [--scale <number>]         (output @2x for retina; default 1)
 *
 * Pipeline:
 *   1. Read templates/<name>/template.html + data JSON
 *   2. Substitute {{key}} placeholders
 *   3. Read <meta name="ds-template-size" content="WxH"> for viewport
 *   4. Open in Playwright Chromium with that viewport, wait for fonts +
 *      images to settle, screenshot the body's first child element
 *   5. Write PNG
 *
 * Why screenshot a specific element instead of fullPage:
 *   - The .tpl-canvas div has the exact declared dimensions; fullPage
 *     would include page chrome / scrollbars / margin
 *   - Element screenshot also handles rounded corners / overflow:hidden
 *     correctly without cropping the wrong region
 *
 * Requires Playwright + Chromium installed:
 *   pnpm install
 *   pnpm exec playwright install chromium
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { argv, exit, cwd } from "node:process";
import { chromium } from "@playwright/test";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "..");
const TEMPLATES = path.join(REPO_ROOT, "templates");

function parseArgs(argv) {
  const out = { _: [], scale: 1 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--data") out.data = argv[++i];
    else if (a === "--out") out.out = argv[++i];
    else if (a === "--scale") out.scale = Number(argv[++i]) || 1;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a.startsWith("--")) {
      console.error(`unknown flag: ${a}`);
      exit(2);
    } else out._.push(a);
  }
  return out;
}

const opts = parseArgs(argv.slice(2));

if (opts.help || opts._.length === 0) {
  const list = (await safeReaddir(TEMPLATES))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => !n.startsWith(".") && n !== "shared")
    .join(", ");
  console.log(`
render-template <template> [--data <json>] [--out <png>] [--scale <n>]

Available templates: ${list || "(none)"}

Examples:
  node scripts/render-template.mjs og-image
  node scripts/render-template.mjs og-image --data my.json --out hero.png
  node scripts/render-template.mjs social-card --scale 2
`);
  exit(0);
}

const [name] = opts._;
const templateDir = path.join(TEMPLATES, name);
const templateHtml = path.join(templateDir, "template.html");

try {
  await fs.access(templateHtml);
} catch {
  console.error(`✗ template not found: ${templateHtml}`);
  console.error(`  expected layout: templates/<name>/template.html`);
  exit(1);
}

const dataPath = opts.data ?? path.join(templateDir, "data.example.json");
let data = {};
try {
  data = JSON.parse(await fs.readFile(dataPath, "utf8"));
} catch (err) {
  console.error(`✗ failed to read data file ${dataPath}: ${err.message}`);
  exit(1);
}

const outPath = opts.out ?? path.join(TEMPLATES, ".example-output", `${name}.png`);
await fs.mkdir(path.dirname(outPath), { recursive: true });

// ---- substitute placeholders ----
let html = await fs.readFile(templateHtml, "utf8");
html = html.replace(/\{\{(\w+)\}\}/g, (m, key) => {
  if (!(key in data)) {
    console.warn(`  ! placeholder {{${key}}} has no data — leaving blank`);
    return "";
  }
  // Minimal HTML-escape for safety. JSON should already be string-coerceable.
  return String(data[key])
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
});

// ---- extract canvas size ----
const sizeMatch = html.match(
  /<meta\s+name=["']ds-template-size["']\s+content=["'](\d+)x(\d+)["']/i
);
if (!sizeMatch) {
  console.error(`✗ template ${name} missing <meta name="ds-template-size" content="WxH">`);
  exit(1);
}
const width = Number(sizeMatch[1]);
const height = Number(sizeMatch[2]);

// ---- write substituted HTML to a temp file so the browser can resolve
// relative paths (../shared/tokens.css etc.) ----
const tempHtmlPath = path.join(templateDir, ".rendered.html");
await fs.writeFile(tempHtmlPath, html);

// ---- launch browser ----
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: opts.scale,
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
            })
        )
    );
  });

  // Find the canvas element (first .tpl-canvas) and screenshot just it.
  const canvas = await page.locator(".tpl-canvas").first();
  await canvas.screenshot({ path: outPath, type: "png" });

  console.log(`✓ wrote ${path.relative(cwd(), outPath)}  (${width}×${height} @${opts.scale}x)`);
} finally {
  await context.close();
  await browser.close();
  // Clean up the temp HTML file
  try {
    await fs.unlink(tempHtmlPath);
  } catch {
    /* ignore */
  }
}

// ---- helpers ----
async function safeReaddir(p) {
  try {
    return await fs.readdir(p, { withFileTypes: true });
  } catch {
    return [];
  }
}
