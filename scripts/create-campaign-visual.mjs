#!/usr/bin/env node
/**
 * One-click campaign visual pipeline:
 * optional generated background -> deterministic Matters template render.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { argv, cwd, exit } from "node:process";
import { pathToFileURL } from "node:url";
import { renderTemplate } from "../services/render/src/render.mjs";
import { generateBackgroundImage } from "./generate-background.mjs";

function parseArgs(args) {
  const out = { job: "brand/jobs/background-card.example.json", scale: 1 };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--job") out.job = args[++i];
    else if (a === "--out") out.out = args[++i];
    else if (a === "--scale") out.scale = Number(args[++i]) || 1;
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a.startsWith("--")) {
      console.error(`unknown flag: ${a}`);
      exit(2);
    }
  }
  return out;
}

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf8"));
}

function toBrowserSrc(value, baseDir) {
  if (!value) return value;
  if (/^(https?:|file:|data:)/.test(value)) return value;
  return pathToFileURL(path.resolve(baseDir, value)).href;
}

async function createCampaignVisual({ job, out, scale = 1 }) {
  const jobPath = path.resolve(job);
  const spec = await readJson(jobPath);
  const data = { ...(spec.data || {}) };

  if (spec.background?.mode === "generate") {
    const generated = await generateBackgroundImage({
      brief: spec.background.brief,
      out: spec.background.out,
      model: spec.background.model,
      fallbackModel: spec.background.fallbackModel,
      size: spec.background.size,
      quality: spec.background.quality,
      textSafeArea: spec.background.textSafeArea,
    });
    data.backgroundUrl = pathToFileURL(generated.out).href;
  } else {
    data.backgroundUrl = toBrowserSrc(data.backgroundUrl, path.resolve("templates", spec.template));
  }

  const finalOut = path.resolve(out || spec.out || "templates/.generated/campaign-visual.png");
  await fs.mkdir(path.dirname(finalOut), { recursive: true });

  const rendered = await renderTemplate({
    name: spec.template,
    data,
    scale,
    onMissingKey: (key) => console.warn(`  ! placeholder {{${key}}} has no data - leaving blank`),
  });
  await fs.writeFile(finalOut, rendered.buffer);

  const metadataOut = `${finalOut}.json`;
  await fs.writeFile(
    metadataOut,
    JSON.stringify(
      {
        job: path.relative(cwd(), jobPath),
        template: spec.template,
        output: path.relative(cwd(), finalOut),
        data,
        renderedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );

  return { out: finalOut, metadata: metadataOut };
}

function printHelp() {
  console.log(`
create-campaign-visual --job <job.json> [--out <png>] [--scale <n>]

Example:
  pnpm visual:create -- --job brand/jobs/background-card.example.json
`);
}

const opts = parseArgs(argv.slice(2));
if (opts.help) {
  printHelp();
  exit(0);
}

createCampaignVisual(opts)
  .then((result) => {
    console.log(`wrote ${path.relative(cwd(), result.out)}`);
    console.log(`wrote ${path.relative(cwd(), result.metadata)}`);
  })
  .catch((err) => {
    console.error(err.message);
    exit(1);
  });
