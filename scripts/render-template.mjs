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
 * Implementation lives in services/render/src/render.mjs — this script
 * is just the CLI shell around it. The same library powers the HTTP
 * render service, so there is exactly one renderer in the repo.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { argv, exit, cwd } from "node:process";
import {
  renderTemplate,
  resolveTemplate,
  listTemplates,
  TemplateNotFoundError,
  TEMPLATES_DIR,
} from "../services/render/src/render.mjs";

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
  const list = (await listTemplates()).join(", ");
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

let resolved;
try {
  resolved = await resolveTemplate(name);
} catch (err) {
  if (err instanceof TemplateNotFoundError) {
    console.error(
      `✗ template not found: ${path.join(TEMPLATES_DIR, name, "template.html")}`,
    );
    console.error(`  expected layout: templates/<name>/template.html`);
    exit(1);
  }
  throw err;
}

const dataPath =
  opts.data ?? path.join(resolved.templateDir, "data.example.json");
let data = {};
try {
  data = JSON.parse(await fs.readFile(dataPath, "utf8"));
} catch (err) {
  console.error(`✗ failed to read data file ${dataPath}: ${err.message}`);
  exit(1);
}

const outPath =
  opts.out ?? path.join(TEMPLATES_DIR, ".example-output", `${name}.png`);
await fs.mkdir(path.dirname(outPath), { recursive: true });

const { buffer, width, height, scale } = await renderTemplate({
  name,
  data,
  scale: opts.scale,
  onMissingKey: (key) =>
    console.warn(`  ! placeholder {{${key}}} has no data — leaving blank`),
});

await fs.writeFile(outPath, buffer);

console.log(
  `✓ wrote ${path.relative(cwd(), outPath)}  (${width}×${height} @${scale}x)`,
);
