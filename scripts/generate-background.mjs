#!/usr/bin/env node
/**
 * Generate a text-free Matters background through OpenAI Image API.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { argv, cwd, exit } from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const DEFAULT_STYLE_PROFILE = path.join(ROOT, "brand", "style-profiles", "matters-brand-v1.json");
const DEFAULT_RECIPE = path.join(ROOT, "brand", "prompts", "background.v1.md");

await loadEnv(path.join(ROOT, ".env"));

export async function loadEnv(p) {
  if (!existsSync(p)) return;
  const txt = await fs.readFile(p, "utf8");
  for (const line of txt.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].trim();
  }
}

function parseArgs(args) {
  const out = {
    model: "gpt-image-2",
    size: "2048x2048",
    quality: "auto",
    out: "templates/.generated/backgrounds/background.png",
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--brief") out.brief = args[++i];
    else if (a === "--prompt-file") out.promptFile = args[++i];
    else if (a === "--out") out.out = args[++i];
    else if (a === "--model") out.model = args[++i];
    else if (a === "--fallback-model") out.fallbackModel = args[++i];
    else if (a === "--size") out.size = args[++i];
    else if (a === "--quality") out.quality = args[++i];
    else if (a === "--help" || a === "-h") out.help = true;
    else if (a.startsWith("--")) {
      console.error(`unknown flag: ${a}`);
      exit(2);
    } else {
      out.brief = out.brief ? `${out.brief} ${a}` : a;
    }
  }
  return out;
}

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf8"));
}

export async function composeBackgroundPrompt({ brief, promptFile, textSafeArea } = {}) {
  const style = await readJson(DEFAULT_STYLE_PROFILE);
  const recipe = await fs.readFile(DEFAULT_RECIPE, "utf8");

  let jobPrompt = "";
  if (promptFile) {
    const resolved = path.resolve(promptFile);
    if (resolved.endsWith(".json")) {
      const job = await readJson(resolved);
      jobPrompt = job.background?.brief || job.brief || job.prompt || "";
      textSafeArea = textSafeArea || job.background?.textSafeArea;
    } else {
      jobPrompt = await fs.readFile(resolved, "utf8");
    }
  }

  const finalBrief = brief || jobPrompt;
  if (!finalBrief) throw new Error("A background brief is required. Use --brief or --prompt-file.");

  return [
    recipe.trim(),
    "",
    "## Brand Profile",
    `Palette: ${JSON.stringify(style.palette.canonical)}`,
    `Typography note: ${style.typography.notes.join(" ")}`,
    `Composition: ${style.composition.principles.join(" ")}`,
    `Background rules: ${style.imageGeneration.backgroundRules.join(" ")}`,
    "",
    "## Job Brief",
    finalBrief.trim(),
    "",
    "## Text Safe Area",
    textSafeArea || style.composition.safeAreas.square,
  ].join("\n");
}

export async function generateBackgroundImage({
  brief,
  promptFile,
  out,
  model = "gpt-image-2",
  fallbackModel,
  size = "2048x2048",
  quality = "auto",
  textSafeArea,
} = {}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY missing. Add it to .env or the shell environment.");
  }

  const prompt = await composeBackgroundPrompt({ brief, promptFile, textSafeArea });
  const payload = {
    model,
    prompt,
    size,
    quality,
    n: 1,
  };

  let activeModel = model;
  let res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let json = await res.json().catch(() => ({}));
  const shouldRetry =
    !res.ok &&
    fallbackModel &&
    /verified|verification|organization/i.test(json.error?.message || "");
  if (shouldRetry) {
    activeModel = fallbackModel;
    res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, model: fallbackModel }),
    });
    json = await res.json().catch(() => ({}));
  }

  if (!res.ok) {
    const message = json.error?.message || `${res.status} ${res.statusText}`;
    throw new Error(`OpenAI image generation failed: ${message}`);
  }

  const image = json.data?.[0];
  if (!image?.b64_json && !image?.url) {
    throw new Error("OpenAI image generation returned no b64_json or url.");
  }

  let bytes;
  if (image.b64_json) {
    bytes = Buffer.from(image.b64_json, "base64");
  } else {
    const imageRes = await fetch(image.url);
    if (!imageRes.ok) throw new Error(`Failed to download generated image: ${imageRes.status}`);
    bytes = Buffer.from(await imageRes.arrayBuffer());
  }

  const finalOut = path.resolve(out || "templates/.generated/backgrounds/background.png");
  await fs.mkdir(path.dirname(finalOut), { recursive: true });
  await fs.writeFile(finalOut, bytes);
  await fs.writeFile(
    `${finalOut}.json`,
    JSON.stringify(
      {
        model: activeModel,
        requestedModel: model,
        fallbackModel: fallbackModel || null,
        size,
        quality,
        prompt,
        createdAt: new Date().toISOString(),
      },
      null,
      2
    )
  );

  return { out: finalOut, metadata: `${finalOut}.json`, prompt };
}

function printHelp() {
  console.log(`
generate-background [options]

Options:
  --brief <text>          Background brief
  --prompt-file <path>    Markdown prompt or job JSON
  --out <path>            Output PNG path
  --model <model>         Default: gpt-image-2
  --fallback-model <model> Retry on organization verification errors
  --size <WxH>            Default: 2048x2048
  --quality <value>       Default: auto

Example:
  pnpm image:background -- --brief "A calm digital commons background" --out templates/.generated/backgrounds/community.png
`);
}

async function main() {
  const opts = parseArgs(argv.slice(2));
  if (opts.help) {
    printHelp();
    return;
  }
  const result = await generateBackgroundImage(opts);
  console.log(`wrote ${path.relative(cwd(), result.out)}`);
  console.log(`wrote ${path.relative(cwd(), result.metadata)}`);
}

if (argv[1] && path.resolve(argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err.message);
    exit(1);
  });
}
