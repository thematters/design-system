#!/usr/bin/env node
// Build packages/tokens/tokens.json -> dist/{tokens.css, tokens.ts, tailwind.preset.cjs}.
//
// Dual output:
//   1. packages/tokens/dist/  (canonical npm-package consumption)
//   2. tokens/dist/           (legacy vendored-copy consumption; kept for back-compat
//                              until all consumers migrate to the package)
//
// No npm dependencies; Node 20+ only.
//
// Usage:
//   node packages/tokens/build.mjs    (preferred)
//   node tokens/build.mjs             (forwarder shim, also works)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "..", "..");

const TOKENS = path.join(HERE, "tokens.json");
const DIST_PRIMARY = path.join(HERE, "dist");
const DIST_LEGACY = path.join(REPO_ROOT, "tokens", "dist");

const tokens = JSON.parse(await fs.readFile(TOKENS, "utf8"));
await fs.mkdir(DIST_PRIMARY, { recursive: true });
await fs.mkdir(DIST_LEGACY, { recursive: true });

// ----- helpers -----
function kebab(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}
function flat(obj, prefix = []) {
  const out = [];
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "value" in v) {
      out.push({ path: [...prefix, k], value: v.value, description: v.description });
    } else if (v && typeof v === "object") {
      out.push(...flat(v, [...prefix, k]));
    }
  }
  return out;
}
function cssVar(parts) {
  return "--" + parts.map(kebab).join("-");
}

async function writeBoth(relName, contents) {
  await fs.writeFile(path.join(DIST_PRIMARY, relName), contents);
  await fs.writeFile(path.join(DIST_LEGACY, relName), contents);
  console.log(`wrote packages/tokens/dist/${relName} + tokens/dist/${relName}`);
}

// Freewrite tokens are isolated into a separate stylesheet (see below).
// Phase 3: stripped from main tokens.css so product code can't accidentally
// reference --color-freewrite-* without an explicit opt-in.
const FREEWRITE_KEY = "freewrite";

// ----- tokens.css -----
const cssLines = [];
cssLines.push("/* Auto-generated from packages/tokens/tokens.json. Do not edit by hand. */");
cssLines.push("/* Run `node packages/tokens/build.mjs` to regenerate. */");
cssLines.push("/* Note: --color-freewrite-* tokens live in freewrite.css (opt-in only). */");
cssLines.push(":root {");

// colors (excluding freewrite)
const { [FREEWRITE_KEY]: freewriteColors, ...productColors } = tokens.color;
const colors = flat(productColors, ["color"]);
cssLines.push("  /* color */");
for (const t of colors) cssLines.push(`  ${cssVar(t.path)}: ${t.value};`);

// spacing
cssLines.push("");
cssLines.push("  /* spacing (8pt grid + 2-unit fine-grain) */");
for (const t of flat(tokens.spacing, ["space"])) cssLines.push(`  ${cssVar(t.path)}: ${t.value};`);

// effects
cssLines.push("");
cssLines.push("  /* effects (shadow / blur) */");
for (const t of flat(tokens.effect, ["shadow"])) cssLines.push(`  ${cssVar(t.path)}: ${t.value};`);

// typography primitives
cssLines.push("");
cssLines.push("  /* typography primitives */");
cssLines.push(
  `  --font-family-ui: ${tokens.typography.fontFamily.ui.value}, system-ui, sans-serif;`
);
cssLines.push(`  --font-family-reading: ${tokens.typography.fontFamily.reading.value}, serif;`);

cssLines.push("}");

// typography utility classes (System / Article scales)
cssLines.push("");
cssLines.push("/* Typography utility classes. */");
cssLines.push('/* Usage: <h1 class="ds-text-system-h1-semibold">…</h1> */');
function emitTextClass(scope, name, weight, def) {
  const cls = `.ds-text-${kebab(scope)}-${kebab(name)}-${kebab(weight)}`;
  cssLines.push(`${cls} {`);
  cssLines.push(
    `  font-family: ${def.fontFamily}, ${
      scope === "article" && (name === "title" || name === "summary")
        ? "serif"
        : "system-ui, sans-serif"
    };`
  );
  cssLines.push(`  font-weight: ${def.fontWeight};`);
  cssLines.push(`  font-size: ${def.fontSize};`);
  cssLines.push(`  line-height: ${def.lineHeight};`);
  if (def.letterSpacing && def.letterSpacing !== "0")
    cssLines.push(`  letter-spacing: ${def.letterSpacing}px;`);
  cssLines.push("}");
}
for (const [name, weights] of Object.entries(tokens.typography.system)) {
  if (name.startsWith("$")) continue;
  for (const [w, def] of Object.entries(weights)) emitTextClass("system", name, w, def);
}
for (const [name, weights] of Object.entries(tokens.typography.article)) {
  if (name.startsWith("$")) continue;
  for (const [w, def] of Object.entries(weights)) emitTextClass("article", name, w, def);
}

await writeBoth("tokens.css", cssLines.join("\n") + "\n");

// ----- freewrite.css (isolated, opt-in only) -----
// Reserved for the 七日書 / Freewrite landing page. Product surfaces must
// not import this. The values are also present in `tokens.ts` (full tree)
// for documentation / inspection purposes, but are NOT bundled into
// tokens.css automatically.
if (freewriteColors) {
  const fwLines = [];
  fwLines.push("/* Auto-generated from packages/tokens/tokens.json. Do not edit by hand. */");
  fwLines.push("/* Freewrite (七日書) tokens — opt-in. Import only on Freewrite surfaces. */");
  fwLines.push("");
  fwLines.push(":root {");
  for (const t of flat(freewriteColors, ["color", FREEWRITE_KEY])) {
    fwLines.push(`  ${cssVar(t.path)}: ${t.value};`);
  }
  fwLines.push("}");
  await writeBoth("freewrite.css", fwLines.join("\n") + "\n");
}

// ----- tokens.ts -----
const ts = [
  "// Auto-generated from packages/tokens/tokens.json. Do not edit by hand.",
  "// Run `node packages/tokens/build.mjs` to regenerate.",
  "",
  `export const tokens = ${JSON.stringify(tokens, null, 2)} as const;`,
  "",
  "export type Tokens = typeof tokens;",
  "",
  '// Convenience flat color map keyed by dot-path (e.g. "color.brand.new.purple")',
  "export const colorByPath: Record<string, string> = {",
];
for (const t of flat(tokens.color, ["color"])) {
  ts.push(`  ${JSON.stringify(t.path.join("."))}: ${JSON.stringify(t.value)},`);
}
ts.push("};");
ts.push("");

await writeBoth("tokens.ts", ts.join("\n"));

// ----- tailwind.preset.cjs -----
function tailwindColorTree(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "value" in v) {
      out[kebab(k)] = v.value;
    } else if (v && typeof v === "object") {
      out[kebab(k)] = tailwindColorTree(v);
    }
  }
  return out;
}
const tw = {
  theme: {
    extend: {
      colors: tailwindColorTree(tokens.color),
      spacing: Object.fromEntries(
        Object.entries(tokens.spacing)
          .filter(([k]) => !k.startsWith("$"))
          .map(([k, v]) => [k, v.value])
      ),
      boxShadow: Object.fromEntries(
        Object.entries(tokens.effect)
          .filter(([k]) => !k.startsWith("$"))
          .map(([k, v]) => [kebab(k), v.value])
      ),
      fontFamily: {
        ui: [tokens.typography.fontFamily.ui.value, "system-ui", "sans-serif"],
        reading: [tokens.typography.fontFamily.reading.value, "serif"],
      },
    },
  },
};
const twCjs = [
  "// Auto-generated from packages/tokens/tokens.json. Do not edit by hand.",
  "// Run `node packages/tokens/build.mjs` to regenerate.",
  "",
  '/** @type {import("tailwindcss").Config} */',
  `module.exports = ${JSON.stringify(tw, null, 2)};`,
  "",
];
await writeBoth("tailwind.preset.cjs", twCjs.join("\n"));

console.log("\ndone.");
