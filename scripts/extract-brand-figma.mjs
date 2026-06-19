#!/usr/bin/env node
/**
 * Extract Matters promotional brand sources from Figma.
 *
 * Usage:
 *   node scripts/extract-brand-figma.mjs cache
 *   node scripts/extract-brand-figma.mjs inventory
 *   node scripts/extract-brand-figma.mjs render-node <node-id-or-url> --out brand/sources/figma/cc-branding/exports/node.png
 *   node scripts/extract-brand-figma.mjs render-all-frames --scale 0.5
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { argv, cwd, exit } from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEFAULT_FILE_KEY = "HQ5Y6bBc9dVDT99u8Qvkb5";
const DEFAULT_FILE_NAME = "CC & Branding";
const OUT_DIR = path.join(ROOT, "brand", "sources", "figma", "cc-branding");
const CACHE_DIR = path.join(OUT_DIR, "cache");
const EXPORT_DIR = path.join(OUT_DIR, "exports");
const ALL_EXPORT_DIR = path.join(EXPORT_DIR, "all-frames");
const CATALOG_JSON = path.join(ROOT, "brand", "catalogs", "cc-branding-categories.json");

await loadEnv(path.join(ROOT, ".env"));

const requestConfig = {
  attempts: Number(process.env.FIGMA_RETRY_ATTEMPTS) || 6,
  retryCapMs: Number(process.env.FIGMA_RETRY_CAP_MS) || 60_000,
};

function parseArgs(args) {
  const out = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--file-key") out.fileKey = args[++i];
    else if (a === "--out") out.out = args[++i];
    else if (a === "--out-dir") out.outDir = args[++i];
    else if (a === "--scale") out.scale = Number(args[++i]) || 2;
    else if (a === "--category") out.category = args[++i];
    else if (a === "--limit") out.limit = Number(args[++i]) || undefined;
    else if (a === "--batch-size") out.batchSize = Number(args[++i]) || 8;
    else if (a === "--delay-ms") out.delayMs = Number(args[++i]) || 1200;
    else if (a === "--attempts") out.attempts = Number(args[++i]) || undefined;
    else if (a === "--retry-cap-ms") out.retryCapMs = Number(args[++i]) || undefined;
    else if (a === "--manifest-only") out.manifestOnly = true;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a.startsWith("--")) {
      console.error(`unknown flag: ${a}`);
      exit(2);
    } else out._.push(a);
  }
  return out;
}

async function loadEnv(p) {
  if (!existsSync(p)) return;
  const txt = await fs.readFile(p, "utf8");
  for (const line of txt.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
}

function requireFigmaToken() {
  const token = process.env.FIGMA_TOKEN;
  if (!token) {
    console.error(
      "FIGMA_TOKEN missing. Copy .env.example to .env and add a Figma personal access token."
    );
    exit(1);
  }
  return token;
}

async function api(pathSuffix) {
  return apiWithRetry(pathSuffix);
}

async function apiWithRetry(pathSuffix, attempts = requestConfig.attempts) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    const res = await fetch(`https://api.figma.com${pathSuffix}`, {
      headers: { "X-Figma-Token": requireFigmaToken() },
    });
    if (res.ok) return res.json();
    const retryAfter = Number(res.headers.get("retry-after"));
    const retryable = res.status === 429 || res.status >= 500;
    lastError = new Error(`${res.status} ${res.statusText} on ${pathSuffix}`);
    if (!retryable || i === attempts - 1) throw lastError;
    const backoffMs = Math.min(
      requestConfig.retryCapMs,
      Number.isFinite(retryAfter) ? retryAfter * 1000 : 5000 * 2 ** i
    );
    console.warn(`  ! ${res.status} from Figma; retrying in ${Math.round(backoffMs / 1000)}s`);
    await sleep(backoffMs);
  }
  throw lastError;
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function normalizeNodeId(input) {
  const urlNode = String(input).match(/[?&]node-id=([^&]+)/);
  const raw = decodeURIComponent(urlNode ? urlNode[1] : String(input));
  return raw.replace("-", ":");
}

function slug(value) {
  return String(value || "untitled")
    .normalize("NFKD")
    .replace(/[^\w\u4e00-\u9fff.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80)
    .toLowerCase();
}

function figmaUrl(fileKey, nodeId) {
  const suffix = nodeId ? `?node-id=${encodeURIComponent(nodeId.replace(":", "-"))}` : "";
  return `https://www.figma.com/design/${fileKey}/CC---Branding${suffix}`;
}

async function cache(fileKey) {
  await ensureDir(CACHE_DIR);
  const tasks = [
    ["file.depth2", `/v1/files/${fileKey}?depth=2`],
    ["styles", `/v1/files/${fileKey}/styles`],
    ["components", `/v1/files/${fileKey}/components`],
    ["component_sets", `/v1/files/${fileKey}/component_sets`],
  ];

  for (const [name, suffix] of tasks) {
    process.stdout.write(`fetching ${name}... `);
    const data = await api(suffix);
    await fs.writeFile(path.join(CACHE_DIR, `${name}.json`), JSON.stringify(data, null, 2));
    console.log("ok");
  }
}

async function readCache(name) {
  return JSON.parse(await fs.readFile(path.join(CACHE_DIR, `${name}.json`), "utf8"));
}

function collectCanvases(file) {
  return (file.document?.children || []).map((node) => ({
    name: node.name,
    id: node.id,
    type: node.type,
    childCount: node.children?.length || 0,
  }));
}

async function inventory(fileKey) {
  const file = await readCache("file.depth2");
  const styles = await readCache("styles").catch(() => ({ meta: { styles: [] } }));
  const components = await readCache("components").catch(() => ({ meta: { components: [] } }));
  const componentSets = await readCache("component_sets").catch(() => ({
    meta: { component_sets: [] },
  }));
  const canvases = collectCanvases(file);

  const lines = [];
  lines.push("# CC & Branding Figma Inventory");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Source: [${DEFAULT_FILE_NAME}](${figmaUrl(fileKey)})`);
  lines.push(`File key: \`${fileKey}\``);
  lines.push("");
  lines.push("## Top-Level Pages");
  lines.push("");
  lines.push("| Page | Node | Children | URL |");
  lines.push("| --- | --- | ---: | --- |");
  for (const page of canvases) {
    lines.push(
      `| ${escapePipe(page.name)} | \`${page.id}\` | ${page.childCount} | ${figmaUrl(fileKey, page.id)} |`
    );
  }
  lines.push("");
  lines.push("## Published Inventory");
  lines.push("");
  lines.push(`- Styles: ${styles.meta?.styles?.length || 0}`);
  lines.push(`- Components: ${components.meta?.components?.length || 0}`);
  lines.push(`- Component sets: ${componentSets.meta?.component_sets?.length || 0}`);
  lines.push("");
  lines.push("## Next Extraction Step");
  lines.push("");
  lines.push("Export representative frames with:");
  lines.push("");
  lines.push("```bash");
  lines.push(
    "pnpm brand:figma -- render-node <node-id-or-figma-url> --out brand/sources/figma/cc-branding/exports/<name>.png"
  );
  lines.push("```");

  const out = path.join(OUT_DIR, "inventory.md");
  await fs.writeFile(out, `${lines.join("\n")}\n`);
  console.log(`wrote ${path.relative(cwd(), out)}`);
}

function escapePipe(value) {
  return String(value).replace(/\|/g, "\\|");
}

async function renderNode(fileKey, nodeInput, outPath, scale = 2) {
  const nodeId = normalizeNodeId(nodeInput);
  const data = await api(
    `/v1/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=png&scale=${scale}`
  );
  const url = data.images?.[nodeId];
  if (!url) throw new Error(`Figma did not return an image URL for node ${nodeId}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} while downloading rendered node`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const finalOut = path.resolve(
    outPath || path.join(EXPORT_DIR, `${nodeId.replace(":", "-")}.png`)
  );
  await ensureDir(path.dirname(finalOut));
  await fs.writeFile(finalOut, buffer);
  console.log(`wrote ${path.relative(cwd(), finalOut)}`);
}

async function renderAllFrames({
  fileKey,
  outDir,
  scale = 0.5,
  category,
  limit,
  batchSize = 8,
  delayMs = 1200,
  manifestOnly = false,
}) {
  const catalog = JSON.parse(await fs.readFile(CATALOG_JSON, "utf8"));
  const finalOutDir = path.resolve(outDir || ALL_EXPORT_DIR);
  await ensureDir(finalOutDir);

  const frames = [];
  for (const cat of catalog.categories || []) {
    if (category && cat.id !== category) continue;
    for (const page of cat.sourcePages || []) {
      for (const frame of page.frames || []) {
        frames.push({
          categoryId: cat.id,
          categoryLabel: cat.label,
          pageId: page.id,
          pageName: page.name,
          id: frame.id,
          name: frame.name,
          type: frame.type,
          size: frame.size,
          figmaUrl: frame.url || figmaUrl(fileKey, frame.id),
        });
      }
    }
  }

  const unique = [];
  const seen = new Set();
  for (const frame of frames) {
    if (seen.has(frame.id)) continue;
    seen.add(frame.id);
    unique.push(frame);
  }

  const selected = limit ? unique.slice(0, limit) : unique;
  const manifestPath = path.join(finalOutDir, "manifest.json");
  const previous = existsSync(manifestPath)
    ? JSON.parse(await fs.readFile(manifestPath, "utf8"))
    : { frames: [] };
  const manifestById = new Map((previous.frames || []).map((item) => [item.id, item]));
  for (const frame of selected) {
    if (manifestById.has(frame.id)) continue;
    const exportPath = exportPathForFrame(finalOutDir, frame);
    manifestById.set(frame.id, {
      ...frame,
      exportPath: path.relative(ROOT, exportPath),
      status: existsSync(exportPath) ? "exported" : "pending",
      scale,
      exportedAt: existsSync(exportPath) ? new Date().toISOString() : null,
    });
  }
  await writeManifest(manifestPath, catalog, [...manifestById.values()]);

  console.log(
    `exporting ${selected.length} frame(s) to ${path.relative(cwd(), finalOutDir)} @${scale}x`
  );
  if (manifestOnly) {
    console.log(`wrote ${path.relative(cwd(), manifestPath)}`);
    return;
  }

  for (let i = 0; i < selected.length; i += batchSize) {
    const batch = selected.slice(i, i + batchSize);
    const pending = batch.filter((frame) => {
      const exportPath = exportPathForFrame(finalOutDir, frame);
      return !existsSync(exportPath);
    });

    if (pending.length === 0) {
      console.log(`batch ${i + 1}-${i + batch.length}: already exported`);
      continue;
    }

    console.log(`batch ${i + 1}-${i + batch.length}: requesting ${pending.length} image URL(s)`);
    const data = await api(
      `/v1/images/${fileKey}?ids=${encodeURIComponent(pending.map((frame) => frame.id).join(","))}&format=png&scale=${scale}`
    );

    for (const frame of pending) {
      const url = data.images?.[frame.id];
      const exportPath = exportPathForFrame(finalOutDir, frame);
      const relExportPath = path.relative(ROOT, exportPath);
      if (!url) {
        manifestById.set(frame.id, {
          ...frame,
          exportPath: relExportPath,
          status: "missing-url",
          exportedAt: new Date().toISOString(),
        });
        continue;
      }

      await ensureDir(path.dirname(exportPath));
      const bytes = await downloadWithRetry(url);
      await fs.writeFile(exportPath, bytes);
      manifestById.set(frame.id, {
        ...frame,
        exportPath: relExportPath,
        status: "exported",
        scale,
        exportedAt: new Date().toISOString(),
      });
      console.log(`  wrote ${path.relative(cwd(), exportPath)}`);
    }

    await writeManifest(manifestPath, catalog, [...manifestById.values()]);
    if (i + batchSize < selected.length) await sleep(delayMs);
  }

  await writeManifest(manifestPath, catalog, [...manifestById.values()]);
  console.log(`wrote ${path.relative(cwd(), manifestPath)}`);
}

function exportPathForFrame(outDir, frame) {
  return path.join(
    outDir,
    slug(frame.categoryId),
    slug(frame.pageName),
    `${slug(frame.name)}__${frame.id.replace(":", "-")}.png`
  );
}

async function writeManifest(manifestPath, catalog, frames) {
  const sorted = frames.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  await fs.writeFile(
    manifestPath,
    `${JSON.stringify(
      {
        source: catalog.source,
        generatedAt: new Date().toISOString(),
        totalFrames: sorted.length,
        exportedFrames: sorted.filter((frame) => frame.status === "exported").length,
        frames: sorted,
      },
      null,
      2
    )}\n`
  );
}

async function downloadWithRetry(url, attempts = 5) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    const res = await fetch(url);
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    lastError = new Error(`${res.status} ${res.statusText} while downloading rendered node`);
    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || i === attempts - 1) throw lastError;
    await sleep(Math.min(30_000, 2000 * 2 ** i));
  }
  throw lastError;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function printHelp() {
  console.log(`
extract-brand-figma <command>

Commands:
  cache                         Fetch CC & Branding file metadata into brand/sources/figma/cc-branding/cache
  inventory                     Build a Markdown inventory from cached metadata
  render-node <node-id-or-url>   Export a Figma node as PNG
  render-all-frames              Export every catalogued frame as PNG and write a manifest

Options:
  --file-key <key>              Default: ${DEFAULT_FILE_KEY}
  --out <path>                  Output path for render-node
  --out-dir <path>              Output directory for render-all-frames
  --scale <n>                   PNG scale for render-node, default 2
                                render-all-frames default is 0.5
  --category <id>               Optional category id for render-all-frames
  --limit <n>                   Optional max frames for smoke tests
  --batch-size <n>              Figma image URL batch size, default 8
  --delay-ms <n>                Delay between batches, default 1200
  --attempts <n>                Retry attempts for Figma API calls, default 6
  --retry-cap-ms <n>            Max wait between Figma API retries, default 60000
  --manifest-only               Write manifest without calling the Figma image API

Requires:
  FIGMA_TOKEN in .env or shell environment
`);
}

const opts = parseArgs(argv.slice(2));
const [command, value] = opts._;
const fileKey = opts.fileKey || DEFAULT_FILE_KEY;

if (opts.attempts) requestConfig.attempts = opts.attempts;
if (opts.retryCapMs) requestConfig.retryCapMs = opts.retryCapMs;

if (opts.help || !command) {
  printHelp();
  exit(0);
}

if (command === "cache") await cache(fileKey);
else if (command === "inventory") await inventory(fileKey);
else if (command === "render-node") {
  if (!value) {
    console.error("render-node requires <node-id-or-url>");
    exit(2);
  }
  await renderNode(fileKey, value, opts.out, opts.scale);
} else if (command === "render-all-frames") {
  await renderAllFrames({
    fileKey,
    outDir: opts.outDir,
    scale: opts.scale || 0.5,
    category: opts.category,
    limit: opts.limit,
    batchSize: opts.batchSize,
    delayMs: opts.delayMs,
    manifestOnly: opts.manifestOnly,
  });
} else {
  console.error(`unknown command: ${command}`);
  printHelp();
  exit(2);
}
