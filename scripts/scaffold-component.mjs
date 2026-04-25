#!/usr/bin/env node
// scaffold-component — copy a Matters DS React component into a consumer repo.
//
// Usage (from the consumer repo):
//   node path/to/design-system/scripts/scaffold-component.mjs <Name> [--to <dir>] [--name <NewName>]
//
// Or, run from inside the design-system repo to dry-run:
//   node scripts/scaffold-component.mjs Button
//
// What it does:
//   1. Locates packages/react/src/components/<Name>/ in this repo.
//   2. Copies <Name>.tsx, <Name>.module.css, index.ts into <to>/<NewName>/.
//   3. Renames the symbol if --name differs from --component (Button → MyButton).
//   4. Reminds the consumer to import @matters/design-system-tokens/tokens.css
//      somewhere globally (CSS vars are required for the copied styles to work).
//
// Skips: tests + stories. Consumers can run those from the upstream package
// or copy them manually.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { argv, exit, cwd } from "node:process";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DS_ROOT = path.resolve(HERE, "..");
const COMPONENTS_DIR = path.join(DS_ROOT, "packages", "react", "src", "components");

const args = argv.slice(2);

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--to") {
      out.to = argv[++i];
    } else if (a === "--name") {
      out.name = argv[++i];
    } else if (a === "--help" || a === "-h") {
      out.help = true;
    } else if (a.startsWith("--")) {
      console.error(`unknown flag: ${a}`);
      exit(2);
    } else {
      out._.push(a);
    }
  }
  return out;
}

const opts = parseArgs(args);

if (opts.help || opts._.length === 0) {
  console.log(`
Matters Design System — scaffold-component

Copy a React component source from @matters/design-system-react into a
consumer repo so the consumer owns the source thereafter.

Usage:
  node scripts/scaffold-component.mjs <Name> [--to <dir>] [--name <NewName>]

Args:
  <Name>             Component to copy. Available: ${(await listComponents()).join(", ")}.

Options:
  --to <dir>         Destination dir. Default: ./src/components in CWD.
  --name <NewName>   Rename the component. Default: same as <Name>.
  -h, --help         Show this message.

Example:
  cd my-app
  node ../design-system/scripts/scaffold-component.mjs Button --to ./src/ui

After copying, ensure your app imports the tokens stylesheet once:
  import "@matters/design-system-tokens/tokens.css";
`);
  exit(0);
}

const [componentName] = opts._;
const newName = opts.name ?? componentName;
const destBase = opts.to ?? path.join(cwd(), "src", "components");
const sourceDir = path.join(COMPONENTS_DIR, componentName);
const destDir = path.join(destBase, newName);

// ---- main ----
try {
  await fs.access(sourceDir);
} catch {
  console.error(
    `❌ Component "${componentName}" not found in design-system. Available: ${(await listComponents()).join(", ")}`
  );
  exit(1);
}

await fs.mkdir(destDir, { recursive: true });

const filesToCopy = [
  { src: `${componentName}.tsx`, dest: `${newName}.tsx` },
  { src: `${componentName}.module.css`, dest: `${newName}.module.css` },
  { src: `index.ts`, dest: `index.ts` },
];

const skipped = [];
for (const { src, dest } of filesToCopy) {
  const srcPath = path.join(sourceDir, src);
  const destPath = path.join(destDir, dest);
  let exists = false;
  try {
    await fs.access(srcPath);
    exists = true;
  } catch {
    /* missing */
  }
  if (!exists) {
    skipped.push(src);
    continue;
  }
  let contents = await fs.readFile(srcPath, "utf8");
  if (newName !== componentName) {
    // Naive rename — string substitution. Works for our component layouts
    // (each component file references its own name + module CSS).
    const re = new RegExp(`\\b${escapeRegex(componentName)}\\b`, "g");
    contents = contents.replace(re, newName);
    contents = contents.replace(
      new RegExp(`./${escapeRegex(componentName)}.module.css`, "g"),
      `./${newName}.module.css`
    );
  }
  await fs.writeFile(destPath, contents);
  console.log(`✓ wrote ${path.relative(cwd(), destPath)}`);
}

if (skipped.length) {
  console.log(`⚠ skipped (not present in source): ${skipped.join(", ")}`);
}

console.log(`
Done.

Next steps in the consumer:
  1. Make sure tokens are loaded once (e.g. in your app entry):
       import "@matters/design-system-tokens/tokens.css";
  2. Use the copied component:
       import { ${newName} } from "${path.relative(cwd(), destDir)}";
  3. Tests / stories were not copied. To get those, browse:
       packages/react/src/components/${componentName}/${componentName}.test.tsx
       packages/react/src/components/${componentName}/${componentName}.stories.tsx
`);

// ---- helpers ----
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function listComponents() {
  try {
    const entries = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
    return entries.filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
}
