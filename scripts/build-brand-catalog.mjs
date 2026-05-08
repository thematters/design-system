#!/usr/bin/env node
/**
 * Build a categorized, machine-readable catalog from the CC & Branding Figma file.
 *
 * Outputs:
 *   - brand/catalogs/cc-branding-categories.json
 *   - docs/cc-branding-style-catalog.md
 *   - docs/cc-branding-newcomer-guide.md
 *
 * The script reads the shallow file cache created by extract-brand-figma.mjs.
 * When FIGMA_TOKEN is available, it also fetches selected representative frames
 * deeply enough to summarize fonts, colors, image fills, and text hierarchy.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { argv, cwd, exit } from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const FILE_KEY = "HQ5Y6bBc9dVDT99u8Qvkb5";
const SOURCE_DIR = path.join(ROOT, "brand", "sources", "figma", "cc-branding");
const CACHE_DIR = path.join(SOURCE_DIR, "cache");
const CATALOG_DIR = path.join(ROOT, "brand", "catalogs");
const CATALOG_JSON = path.join(CATALOG_DIR, "cc-branding-categories.json");
const CATALOG_MD = path.join(ROOT, "docs", "cc-branding-style-catalog.md");
const NEWCOMER_MD = path.join(ROOT, "docs", "cc-branding-newcomer-guide.md");
const PROMPTS_MD = path.join(ROOT, "docs", "cc-branding-image2-prompts.md");

await loadEnv(path.join(ROOT, ".env"));

const CATEGORY_DEFINITIONS = [
  {
    id: "getting-started",
    label: "新手指南",
    productLine: "Shared",
    purpose: "給初次使用 Matters 宣傳模板的人，理解尺寸、文字安全區、logo 與輸出流程。",
    pages: ["17:672"],
    sampleFrames: ["17:672"],
    notes: [
      "這一區不是主要出圖模板，而是操作與規則入口。",
      "Studio 應把它做成範本選擇前的 onboarding，而不是藏在文件裡。",
    ],
  },
  {
    id: "matters-town-core",
    label: "Matters.Town 社媒與站內公告",
    productLine: "Matters.Town",
    purpose: "站內發文、公告、社媒推播、cover、newsletter banner、blog cover。",
    pages: ["1271:4", "1107:4", "1981:2"],
    sampleFrames: ["1271:313", "1352:2", "1271:1182", "1981:3"],
    layoutFamilies: ["square-social-card", "site-cover-16-9", "newsletter-banner", "announcement-strip"],
    backgroundGuidance: [
      "用大面積品牌色、抽象幾何、低對比背景建立辨識度。",
      "站內公告與 cover 要保留清楚文字安全區，避免背景細節搶主標。",
      "Newsletter / banner 用窄幅橫向構圖，字數要短。"
    ],
    typographyGuidance: [
      "標題可用 serif 表現 editorial 語氣；metadata / CTA 用 sans。",
      "推播圖字級大、行數少，優先讓手機 feed 一眼讀完。",
      "封面類尺寸避免過多副標，主標與品牌標示應拉開層級。"
    ],
  },
  {
    id: "matters-town-quotes",
    label: "Matters.Town 文章金句",
    productLine: "Matters.Town",
    purpose: "文章摘句、作者語錄、精選分享。",
    pages: ["2:22", "1413:2"],
    sampleFrames: ["2:23", "1412:2", "1412:79", "1412:121"],
    layoutFamilies: ["quote-square", "image-quote-square", "multi-image-post"],
    backgroundGuidance: [
      "金句卡背景可以是純色、淡紋理或低對比影像。",
      "圖片版需加遮罩或留白，確保中文長句可讀。",
      "多圖 Post 適合拆成封面、金句、補充資訊三段。"
    ],
    typographyGuidance: [
      "金句本體用最大字級，作者與來源退到次層。",
      "嚴肅版可提高留白與 serif 比例；輕鬆版可用較活潑的色塊與框線。",
      "避免在 1200x1200 內塞完整段落，Studio 應限制行數。"
    ],
  },
  {
    id: "matters-town-campaigns",
    label: "Matters.Town 活動與產品宣傳",
    productLine: "Matters.Town",
    purpose: "年度問卷、散步活動、註冊登入、遊牧者計畫、Billboard、錢包託管等 campaign。",
    pages: [
      "1914:113",
      "2691:2",
      "578:4",
      "2750:2",
      "477:4",
      "1076:4",
      "1931:113",
      "1985:3",
      "2566:318",
      "3053:11",
      "2656:2",
      "3322:26",
      "4169:1405",
      "4179:124",
      "5532:146"
    ],
    sampleFrames: ["5536:566", "5536:692", "3470:81", "3322:27", "4200:219"],
    layoutFamilies: ["survey-carousel", "campaign-square", "story-vertical", "product-announcement"],
    backgroundGuidance: [
      "Campaign 可比一般社媒更有主題感，但仍要保留 Matters 紫綠或黑白系統。",
      "年度問卷與活動頁常見 IG 長圖、FB 方圖、站內 banner 同組輸出。",
      "產品宣傳要比社群活動更克制，避免像一次性海報而無法延展。"
    ],
    typographyGuidance: [
      "Campaign 主標要短；副標、日期、CTA 分區排列。",
      "多尺寸同組輸出時，先設計 square 或 IG portrait，再派生 banner。",
      "Studio 應提供欄位化輸入：活動名、日期、主標、副標、CTA、底圖。"
    ],
  },
  {
    id: "matters-lab-social",
    label: "Matters Lab 社媒與活動海報",
    productLine: "Matters Lab",
    purpose: "研究、社群活動、Twitter Space、Weekly AMA、side event、本週活動預告。",
    pages: ["760:4", "2059:111", "346:4", "17:4", "17:853", "457:4", "1078:26", "187:4", "17:671", "261:46", "2584:429"],
    sampleFrames: ["797:29", "346:5", "17:15", "2630:1523", "2059:684"],
    layoutFamilies: ["event-og", "speaker-poster", "weekly-schedule", "event-carousel"],
    backgroundGuidance: [
      "Matters Lab 可使用更強的實驗感、幾何、深色底、科技/公共議題意象。",
      "活動海報常需要 speaker、日期、平台與主題並列，背景必須退後。",
      "本週活動預告偏資訊密度，適合用固定卡片格線。"
    ],
    typographyGuidance: [
      "活動名、日期、speaker、平台要分成清楚層級。",
      "英文專有名詞和中文主標混排時，sans 字體優先，serif 只用於強調。",
      "Studio 應提供 event template：topic、date、time、speakers、host、link label。"
    ],
  },
  {
    id: "freewrite-core",
    label: "自由寫品牌模板",
    productLine: "自由寫",
    purpose: "好文推薦、文章金句、七日書題目、講座摘要、murmur、FB cover、newsletter cover。",
    pages: ["3902:223", "3501:230", "4973:26"],
    sampleFrames: ["3902:907", "3902:1027", "3946:73", "4008:296", "4010:751"],
    layoutFamilies: ["ig-recommendation", "ig-quote", "daily-prompt", "lecture-summary", "murmur-dialog"],
    backgroundGuidance: [
      "自由寫比 Matters.Town 更有文學活動感，適合插畫、季節色、紙張和閱讀意象。",
      "IG portrait 是主格式，底圖應優先服務 1080x1350。",
      "同一季主題內的底圖和色彩應成套，方便連續貼文。"
    ],
    typographyGuidance: [
      "主標/題目可用較大字級與高留白，支援長中文題目。",
      "好文推薦與講座摘要需要固定資訊區：作者、標題、摘要、推薦語。",
      "murmur / conversation 類模板應保留對話泡泡或段落節奏。"
    ],
  },
  {
    id: "freewrite-seasonal",
    label: "自由寫季節活動",
    productLine: "自由寫",
    purpose: "冬季、春季、夏季、秋季、周年慶、年度總結、問卷等成套活動物料。",
    pages: ["4198:1377", "4249:134", "4904:2", "4478:2", "4680:2", "5047:2", "5412:6972", "5495:2", "5495:203"],
    sampleFrames: ["4958:693", "5134:42", "5460:430", "5495:4", "4478:3"],
    layoutFamilies: ["seasonal-ig-series", "questionnaire-card", "anniversary-campaign", "summary-card"],
    backgroundGuidance: [
      "季節活動要把主視覺、色盤、插畫元素做成套件。",
      "同一季的題目卡、公告、banner 不應每張重新發明風格。",
      "問卷與總結類可以提高資訊密度，但仍要固定讀序。"
    ],
    typographyGuidance: [
      "長圖系列應使用一致標題位置與日期/題號位置。",
      "季節色可以換，但字體層級不要跟著改。",
      "Studio 應讓使用者先選 season kit，再選 output size。"
    ],
  },
  {
    id: "seven-day-book",
    label: "七日書",
    productLine: "自由寫 / 七日書",
    purpose: "七日書 logo、題目卡、月初宣傳、POAP。",
    pages: ["5646:972", "5646:2", "5646:982"],
    sampleFrames: ["5721:588", "5721:800", "5721:578", "5646:982"],
    layoutFamilies: ["daily-topic-square", "monthly-promo-portrait", "facebook-cover", "poap"],
    backgroundGuidance: [
      "七日書是自由寫底下最適合產品化的生成套件：題目、月份、天數可以結構化。",
      "題目卡多為 square，月初宣傳多為 portrait。",
      "POAP 與 logo 應獨立成 asset，不讓影像模型重畫。"
    ],
    typographyGuidance: [
      "題目卡需要非常穩定的題號、月份、題目文字階層。",
      "文字長短變化大，模板要有自動縮放與換行規則。",
      "Studio 應提供批次生成：一次輸入 7 題，輸出 7 張。"
    ],
  },
  {
    id: "the-space",
    label: "The Space",
    productLine: "The Space",
    purpose: "AMA 與社群活動海報。",
    pages: ["125:4"],
    sampleFrames: ["125:7"],
    layoutFamilies: ["event-og"],
    backgroundGuidance: ["The Space 目前樣本少，先歸入活動海報族群，保留獨立品牌欄位。"],
    typographyGuidance: ["先沿用 Matters Lab event hierarchy，再視後續素材補強。"],
  },
  {
    id: "traveloggers",
    label: "Traveloggers",
    productLine: "Traveloggers",
    purpose: "玩耍素材庫與旅行/社群活動視覺。",
    pages: ["17:852"],
    sampleFrames: [],
    layoutFamilies: ["asset-library"],
    backgroundGuidance: ["目前頁面偏素材庫，需後續挑選可生成化的 frame。"],
    typographyGuidance: ["先不要做成 Studio 預設模板，等素材庫整理完成。"],
  },
];

const STUDIO_USE_CASES = [
  {
    id: "quote-card",
    label: "文章金句",
    categories: ["matters-town-quotes", "freewrite-core"],
    requiredInputs: ["quote", "authorName", "sourceTitle", "brandLine"],
    recommendedOutputs: ["1200x1200", "1080x1350"],
  },
  {
    id: "event-poster",
    label: "活動海報",
    categories: ["matters-lab-social", "the-space"],
    requiredInputs: ["eventTitle", "date", "time", "speakers", "platform", "cta"],
    recommendedOutputs: ["1200x630", "1000x1000", "1080x1350"],
  },
  {
    id: "campaign-card",
    label: "Campaign 宣傳圖",
    categories: ["matters-town-campaigns", "freewrite-seasonal"],
    requiredInputs: ["campaignName", "headline", "deck", "cta", "background"],
    recommendedOutputs: ["1080x1080", "1080x1350", "688x160", "1200x460"],
  },
  {
    id: "seven-day-book-batch",
    label: "七日書批次題目卡",
    categories: ["seven-day-book"],
    requiredInputs: ["season", "month", "topics[]", "dayNumber"],
    recommendedOutputs: ["1080x1080", "1080x1350"],
  },
];

const CATEGORY_WORKFLOWS = {
  "getting-started": {
    inputs: ["category", "useCase", "outputSize"],
    steps: [
      "先選活動家族與需求，不直接從空白畫布開始。",
      "閱讀該類別的常用尺寸、文字安全區、logo 規則。",
      "若要改字或換圖，只改 template data；不要手動改最終 PNG。",
    ],
    layoutRules: ["新手指南本身不出圖，應變成 Studio onboarding 與欄位提示。"],
    prompt: "No image-generation prompt. This category is onboarding and usage guidance only.",
  },
  "matters-town-core": {
    inputs: ["headline", "summary", "cta", "background", "outputSize"],
    steps: [
      "先選輸出尺寸：站內發文 1594x900、社媒 1000x1000、OG 1200x630、banner 1600x613。",
      "把主標限制在 1-2 行，副標或 CTA 放在次層。",
      "選擇抽象幾何或低對比底圖，保留左側或中央文字安全區。",
      "套用 Matters logo、品牌色與 template spacing，輸出 PNG。",
    ],
    layoutRules: [
      "主標最大，品牌 lockup 與 CTA 放角落或底部。",
      "Newsletter / banner 不放長摘要。",
      "背景可有大面積色塊，但文字區要乾淨。"
    ],
    prompt:
      "Create a text-free Matters.Town social announcement background. Abstract digital commons, calm editorial geometry, teal or mint legacy references may appear but use modern Matters purple #7258FF and lime #C3F432 as accents. Leave a clean text-safe area on the left or center. No readable text, no logo, no UI screenshot, no QR code.",
  },
  "matters-town-quotes": {
    inputs: ["quote", "authorName", "sourceTitle", "tone", "background"],
    steps: [
      "先判斷嚴肅版、輕鬆版或圖片版。",
      "金句切成 3-6 行；作者與來源縮到次層。",
      "背景使用純色、紙感、淡紋理或低對比影像。",
      "檢查手機 feed 大小仍能讀完主句。"
    ],
    layoutRules: [
      "quote 是唯一視覺主角。",
      "作者與文章名不能搶過 quote。",
      "圖片版一定加遮罩或留白。"
    ],
    prompt:
      "Create a text-free square quote-card background for Matters.Town. Literary, reflective, suitable for Traditional Chinese long-form quote overlay. Use soft paper texture, subtle light, abstract reading or public conversation motifs. Keep the center or upper-left area calm and high contrast for large Chinese serif text. No words, no symbols that look like letters, no logo.",
  },
  "matters-town-campaigns": {
    inputs: ["campaignName", "headline", "deck", "date", "cta", "outputSet"],
    steps: [
      "先定義 campaign 主題與輸出組：IG、FB、站內 banner、newsletter。",
      "先設計 square 或 portrait 主視覺，再派生 banner。",
      "把日期、CTA、補充資訊分成固定欄位。",
      "用相同底圖語言批次輸出多尺寸。"
    ],
    layoutRules: [
      "campaign 主標短，副標與日期結構化。",
      "活動與產品宣傳比一般社媒更可主題化，但不破壞 Matters 系統。",
      "一組 campaign 內保持色盤與圖形元素一致。"
    ],
    prompt:
      "Create a text-free campaign background for Matters.Town. Contemporary civic writing platform, product announcement or annual survey mood, clean but warm. Use a coherent campaign visual system with purple #7258FF and lime #C3F432 accents, geometric blocks, paper or digital commons motifs. Leave clear safe areas for headline, date and CTA. No readable text, no UI, no logo.",
  },
  "matters-lab-social": {
    inputs: ["eventTitle", "date", "time", "speakers", "host", "platform", "cta"],
    steps: [
      "先選活動型態：Twitter Space、AMA、speaker poster、weekly schedule。",
      "建立資訊層級：活動名 > 日期時間 > speaker > host/platform > CTA。",
      "背景偏深色、科技、公共議題、幾何感，資訊區保持乾淨。",
      "講者多時改用格線，不壓縮主標。"
    ],
    layoutRules: [
      "活動資訊密度高，必須使用欄位化布局。",
      "一位/二位/三位/四位講者應有不同 variants。",
      "英文專名與中文混排時優先 sans。"
    ],
    prompt:
      "Create a text-free Matters Lab event poster background. Experimental research lab, open technology, public-interest infrastructure, web3 or digital society themes. Dark or high-contrast base with geometric networks, subtle gradients, and space for event title plus speaker metadata. Use purple #7258FF and lime #C3F432 accents. No readable text, no logos, no interface mockups.",
  },
  "freewrite-core": {
    inputs: ["format", "title", "authorName", "excerpt", "month", "cta"],
    steps: [
      "先選自由寫格式：好文推薦、文章金句、題目卡、講座摘要、murmur。",
      "以 1080x1350 IG portrait 為主，必要時派生 square 與 banner。",
      "背景使用文學、紙張、季節、插畫或閱讀意象。",
      "確保長中文題目可自動換行，不需要手動縮字。"
    ],
    layoutRules: [
      "自由寫比 Matters.Town 更文學、更季節化。",
      "題目與金句保留留白；講座摘要可增加資訊區。",
      "同系列必須保留一致的標題位置、月份與題號位置。"
    ],
    prompt:
      "Create a text-free Freewrite editorial background. Literary writing activity, seasonal reading, paper, notebook, soft illustration, intimate creative atmosphere. Use a coherent palette with subtle Matters purple and lime accents, but allow warmer seasonal colors. Leave generous space for vertical Traditional Chinese title overlay. No words, no logo, no UI.",
  },
  "freewrite-seasonal": {
    inputs: ["season", "month", "topic", "seriesName", "dateRange", "cta"],
    steps: [
      "先選 season kit：春、夏、秋、冬、周年、總結、問卷。",
      "建立同一季主視覺：色盤、插畫元素、背景材質、題號位置。",
      "一次設計題目卡、宣傳卡、cover、banner 的派生規則。",
      "批次輸出時只替換題目、月份、日期與 CTA。"
    ],
    layoutRules: [
      "季節色可以換，但文字層級不要改。",
      "題目卡與月初宣傳要看起來同系列。",
      "問卷與總結類可增加資訊密度，但仍要固定讀序。"
    ],
    prompt:
      "Create a text-free seasonal Freewrite campaign background. Choose a coherent seasonal illustration system: spring/summer/autumn/winter literary mood, reading, walking, notebooks, city textures, quiet creative life. Leave consistent title-safe areas for a series of Traditional Chinese posts. Use restrained Matters purple and lime accents. No readable text, no logo.",
  },
  "seven-day-book": {
    inputs: ["season", "month", "dayNumber", "topic", "batchTopics"],
    steps: [
      "先選月份與 season kit，再輸入 7 題。",
      "批次產生 7 張題目卡，固定題號、月份與題目位置。",
      "若產生月初宣傳，沿用同一底圖語言但加入活動說明欄位。",
      "POAP 與 logo 使用固定 asset，不交給影像模型重畫。"
    ],
    layoutRules: [
      "題號與題目是主角。",
      "同批七張需要相同底圖系統與穩定字級。",
      "題目長短變化大，template 必須支援自動縮放。"
    ],
    prompt:
      "Create a text-free Seven Day Book prompt-card background. A 7-day reading and writing challenge, literary, playful but calm, suitable for batch topic cards. Use a consistent series visual system with book, page, bookmark, calendar or quiet reading motifs. Leave a large clean area for day number and Traditional Chinese topic text. No readable text, no logo.",
  },
  "the-space": {
    inputs: ["eventTitle", "date", "time", "speaker", "platform"],
    steps: [
      "先沿用 event poster 流程，將 The Space 作為獨立品牌欄位。",
      "輸出 1200x630，保持活動主標與日期平台資訊清楚。",
      "樣本少，先作為 Matters Lab event template 的變體。"
    ],
    layoutRules: ["主標、speaker、日期平台三層即可，不做過度裝飾。"],
    prompt:
      "Create a text-free event background for The Space by Matters. Intimate online talk, open conversation, calm dark stage, subtle spatial geometry, enough safe area for event title and date. Use restrained purple and lime accents. No readable text, no logo.",
  },
  "traveloggers": {
    inputs: ["theme", "destination", "caption"],
    steps: [
      "目前先當素材庫，不作為 Studio 預設模板。",
      "待 Figma 有可出圖 frame 後，再補 square / portrait variants。",
    ],
    layoutRules: ["先保留分類與素材索引，不開放一鍵生成。"],
    prompt:
      "Create a text-free Traveloggers background. Travel writing, playful exploration, maps, postcards, routes, memory fragments, warm social journey atmosphere. Leave room for title and caption. No readable text, no logo.",
  },
};

function parseArgs(args) {
  const out = { fetchDeep: true };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--no-fetch") out.fetchDeep = false;
    else if (a === "--help" || a === "-h") out.help = true;
    else {
      console.error(`unknown arg: ${a}`);
      exit(2);
    }
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

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, "utf8"));
}

async function writeJson(p, data) {
  await fs.mkdir(path.dirname(p), { recursive: true });
  await fs.writeFile(p, `${JSON.stringify(data, null, 2)}\n`);
}

function figmaUrl(nodeId) {
  const suffix = nodeId ? `?node-id=${encodeURIComponent(nodeId.replace(":", "-"))}` : "";
  return `https://www.figma.com/design/${FILE_KEY}/CC---Branding${suffix}`;
}

function normalizeName(name) {
  return String(name || "").replace(/^.*↳\s*/, "").trim();
}

function sizeOf(node) {
  const box = node?.absoluteBoundingBox;
  if (!box) return null;
  return `${Math.round(box.width)}x${Math.round(box.height)}`;
}

function summarizeDirectFrames(pageNode) {
  const frames = (pageNode?.children || []).filter((child) =>
    ["FRAME", "SECTION", "COMPONENT", "INSTANCE"].includes(child.type)
  );
  const sizeCounts = countValues(frames.map(sizeOf).filter(Boolean));
  const frameList = frames.map((frame) => ({
    id: frame.id,
    name: frame.name,
    type: frame.type,
    size: sizeOf(frame),
    url: figmaUrl(frame.id),
  }));
  return {
    count: frames.length,
    commonSizes: topEntries(sizeCounts, 12).map(([size, count]) => ({ size, count })),
    frames: frameList,
  };
}

function countValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return counts;
}

function topEntries(map, n) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0]))).slice(0, n);
}

function walk(node, visit) {
  if (!node) return;
  visit(node);
  for (const child of node.children || []) walk(child, visit);
}

function rgbaToHex(color, opacity = 1) {
  if (!color) return null;
  const r = clamp255(color.r * 255);
  const g = clamp255(color.g * 255);
  const b = clamp255(color.b * 255);
  const a = typeof color.a === "number" ? color.a * opacity : opacity;
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  return a >= 0.995 ? hex : `${hex}/${Math.round(a * 100)}%`;
}

function clamp255(n) {
  return Math.max(0, Math.min(255, Math.round(n)));
}

function toHex(n) {
  return n.toString(16).padStart(2, "0");
}

function collectStyleStats(nodes) {
  const fontCounts = new Map();
  const fontSizeCounts = new Map();
  const colorCounts = new Map();
  const fillTypes = new Map();
  const textSamples = [];
  const textNodes = [];
  let imageFillCount = 0;
  let gradientFillCount = 0;

  for (const root of nodes) {
    walk(root, (node) => {
      if (node.type === "TEXT" && node.style) {
        const family = node.style.fontFamily || "Unknown";
        const weight = node.style.fontWeight ? String(node.style.fontWeight) : "";
        const fontKey = weight ? `${family} ${weight}` : family;
        fontCounts.set(fontKey, (fontCounts.get(fontKey) || 0) + 1);
        if (node.style.fontSize) {
          fontSizeCounts.set(node.style.fontSize, (fontSizeCounts.get(node.style.fontSize) || 0) + 1);
        }
        const text = String(node.characters || "").replace(/\s+/g, " ").trim();
        if (text && textSamples.length < 8) textSamples.push(text.slice(0, 80));
        textNodes.push({
          name: node.name,
          text: text.slice(0, 80),
          fontFamily: family,
          fontWeight: node.style.fontWeight || null,
          fontSize: node.style.fontSize || null,
          lineHeightPx: node.style.lineHeightPx || null,
        });
      }

      for (const fill of node.fills || []) {
        if (!fill.visible && fill.visible !== undefined) continue;
        fillTypes.set(fill.type, (fillTypes.get(fill.type) || 0) + 1);
        if (fill.type === "SOLID") {
          const hex = rgbaToHex(fill.color, fill.opacity ?? 1);
          if (hex) colorCounts.set(hex, (colorCounts.get(hex) || 0) + 1);
        }
        if (fill.type === "IMAGE") imageFillCount += 1;
        if (String(fill.type || "").includes("GRADIENT")) gradientFillCount += 1;
      }
    });
  }

  return {
    fonts: topEntries(fontCounts, 12).map(([font, count]) => ({ font, count })),
    fontSizes: topEntries(fontSizeCounts, 12).map(([fontSize, count]) => ({ fontSize, count })),
    colors: topEntries(colorCounts, 16).map(([color, count]) => ({ color, count })),
    fillTypes: topEntries(fillTypes, 8).map(([type, count]) => ({ type, count })),
    imageFillCount,
    gradientFillCount,
    textSamples,
    textNodeCount: textNodes.length,
  };
}

async function api(pathSuffix) {
  const token = process.env.FIGMA_TOKEN;
  if (!token) throw new Error("FIGMA_TOKEN missing");
  const res = await fetch(`https://api.figma.com${pathSuffix}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${pathSuffix}`);
  return res.json();
}

async function fetchDeepNodes(nodeIds, fetchDeep) {
  const outPath = path.join(CACHE_DIR, "catalog.deep-nodes.json");
  const existing = existsSync(outPath) ? await readJson(outPath) : {};
  if (!fetchDeep) return existing;
  if (!process.env.FIGMA_TOKEN) return existing;
  const unique = [...new Set(nodeIds)].filter(Boolean);
  const missing = unique.filter((id) => !existing[id]);
  if (missing.length === 0) return existing;

  const nodes = { ...existing };
  for (let i = 0; i < missing.length; i += 12) {
    const batch = missing.slice(i, i + 12);
    process.stdout.write(`fetching deep nodes ${i + 1}-${Math.min(i + batch.length, missing.length)}... `);
    const data = await api(
      `/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(batch.join(","))}&depth=7&geometry=paths`
    );
    for (const [id, entry] of Object.entries(data.nodes || {})) {
      if (entry?.document) nodes[id] = entry.document;
    }
    console.log("ok");
  }
  await writeJson(outPath, nodes);
  return nodes;
}

function inferStudioReadiness(category) {
  if (["getting-started", "traveloggers"].includes(category.id)) return "reference";
  if (["seven-day-book", "matters-town-quotes", "matters-lab-social", "freewrite-core"].includes(category.id)) {
    return "high";
  }
  return "medium";
}

function buildCatalog({ shallowFile, deepNodes }) {
  const pageMap = new Map((shallowFile.document?.children || []).map((node) => [node.id, node]));

  const categories = CATEGORY_DEFINITIONS.map((def) => {
    const sourcePages = def.pages.map((pageId) => {
      const node = pageMap.get(pageId);
      const summary = summarizeDirectFrames(node);
      return {
        id: pageId,
        name: normalizeName(node?.name || pageId),
        url: figmaUrl(pageId),
        childCount: node?.children?.length || 0,
        frameCount: summary.count,
        commonSizes: summary.commonSizes,
        frames: summary.frames,
      };
    });

    const deepSampleNodes = (def.sampleFrames || []).map((id) => deepNodes[id]).filter(Boolean);
    const styleStats = collectStyleStats(deepSampleNodes);
    const allSizes = new Map();
    for (const page of sourcePages) {
      for (const item of page.commonSizes) {
        allSizes.set(item.size, (allSizes.get(item.size) || 0) + item.count);
      }
    }

    return {
      id: def.id,
      label: def.label,
      productLine: def.productLine,
      purpose: def.purpose,
      studioReadiness: inferStudioReadiness(def),
      sourcePages,
      sampleFrames: (def.sampleFrames || []).map((id) => ({
        id,
        name: deepNodes[id]?.name || findFrameName(sourcePages, id),
        size: sizeOf(deepNodes[id]) || findFrameSize(sourcePages, id),
        url: figmaUrl(id),
      })),
      commonOutputSizes: topEntries(allSizes, 12).map(([size, count]) => ({ size, count })),
      layoutFamilies: def.layoutFamilies || [],
      typography: {
        extractedFromSamples: styleStats.fonts.length > 0,
        fonts: styleStats.fonts,
        fontSizes: styleStats.fontSizes,
        textSamples: styleStats.textSamples,
        textNodeCount: styleStats.textNodeCount,
        guidance: def.typographyGuidance || [],
      },
      backgrounds: {
        colors: styleStats.colors,
        fillTypes: styleStats.fillTypes,
        imageFillCount: styleStats.imageFillCount,
        gradientFillCount: styleStats.gradientFillCount,
        guidance: def.backgroundGuidance || [],
      },
      studioWorkflow: CATEGORY_WORKFLOWS[def.id] || null,
      notes: def.notes || [],
    };
  });

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    source: {
      name: "CC & Branding",
      fileKey: FILE_KEY,
      url: figmaUrl(),
    },
    categories,
    studioUseCases: STUDIO_USE_CASES,
  };
}

function findFrameName(sourcePages, id) {
  for (const page of sourcePages) {
    const frame = page.frames.find((item) => item.id === id);
    if (frame) return frame.name;
  }
  return null;
}

function findFrameSize(sourcePages, id) {
  for (const page of sourcePages) {
    const frame = page.frames.find((item) => item.id === id);
    if (frame) return frame.size;
  }
  return null;
}

function table(rows) {
  return rows.join("\n");
}

function formatList(items, fallback = "待補") {
  if (!items || items.length === 0) return fallback;
  return items.map((item) => `- ${item}`).join("\n");
}

function renderCatalogMarkdown(catalog) {
  const lines = [];
  lines.push("# CC & Branding 風格分類 Catalog");
  lines.push("");
  lines.push(`生成時間：${catalog.generatedAt}`);
  lines.push(`來源：[${catalog.source.name}](${catalog.source.url})`);
  lines.push("");
  lines.push("這份 catalog 將 Figma 既有宣傳設計依活動分類整理成 Matters Studio 可讀的版型、底圖、文字與輸出尺寸規則。");
  lines.push("");
  lines.push("## 分類總覽");
  lines.push("");
  lines.push("| 分類 | 產品線 | Studio 可產品化程度 | 主要尺寸 | Figma 頁數 |");
  lines.push("| --- | --- | --- | --- | ---: |");
  for (const category of catalog.categories) {
    lines.push(
      `| ${category.label} | ${category.productLine} | ${category.studioReadiness} | ${category.commonOutputSizes
        .slice(0, 4)
        .map((item) => `${item.size} (${item.count})`)
        .join("<br>")} | ${category.sourcePages.length} |`
    );
  }

  for (const category of catalog.categories) {
    lines.push("");
    lines.push(`## ${category.label}`);
    lines.push("");
    lines.push(category.purpose);
    lines.push("");
    lines.push(`- 產品線：${category.productLine}`);
    lines.push(`- Studio 可產品化程度：${category.studioReadiness}`);
    lines.push(`- 版型家族：${category.layoutFamilies.join(", ") || "待補"}`);
    lines.push("");
    lines.push("### Figma 頁面");
    lines.push("");
    lines.push("| 頁面 | Frames | 常見尺寸 |");
    lines.push("| --- | ---: | --- |");
    for (const page of category.sourcePages) {
      lines.push(
        `| [${page.name}](${page.url}) | ${page.frameCount} | ${page.commonSizes
          .slice(0, 5)
          .map((item) => `${item.size} x${item.count}`)
          .join("<br>")} |`
      );
    }
    lines.push("");
    lines.push("### 版型與底圖");
    lines.push("");
    lines.push(formatList(category.backgrounds.guidance));
    lines.push("");
    lines.push("從代表樣本抽出的底圖訊號：");
    lines.push("");
    lines.push(`- 圖片填色：${category.backgrounds.imageFillCount}`);
    lines.push(`- 漸層填色：${category.backgrounds.gradientFillCount}`);
    lines.push(
      `- 常見色彩：${
        category.backgrounds.colors
          .slice(0, 8)
          .map((item) => `${item.color} (${item.count})`)
          .join(", ") || "待補"
      }`
    );
    lines.push("");
    lines.push("### 字型與文字排版");
    lines.push("");
    lines.push(formatList(category.typography.guidance));
    lines.push("");
    lines.push("從代表樣本抽出的文字訊號：");
    lines.push("");
    lines.push(
      `- 字型：${
        category.typography.fonts
          .slice(0, 8)
          .map((item) => `${item.font} (${item.count})`)
          .join(", ") || "待補"
      }`
    );
    lines.push(
      `- 字級：${
        category.typography.fontSizes
          .slice(0, 10)
          .map((item) => `${item.fontSize}px (${item.count})`)
          .join(", ") || "待補"
      }`
    );
    if (category.typography.textSamples.length) {
      lines.push("- 文字樣本：");
      for (const sample of category.typography.textSamples.slice(0, 5)) lines.push(`  - ${sample}`);
    }
    lines.push("");
    if (category.studioWorkflow) {
      lines.push("### 標準化製圖流程");
      lines.push("");
      lines.push("必填 / 常用欄位：");
      lines.push("");
      lines.push(formatList(category.studioWorkflow.inputs || []));
      lines.push("");
      lines.push("流程：");
      lines.push("");
      lines.push(formatList(category.studioWorkflow.steps || []));
      lines.push("");
      lines.push("版型規則：");
      lines.push("");
      lines.push(formatList(category.studioWorkflow.layoutRules || []));
      lines.push("");
      lines.push("OpenAI Image 2 初始 prompt：");
      lines.push("");
      lines.push("```text");
      lines.push(category.studioWorkflow.prompt || "待補");
      lines.push("```");
      lines.push("");
    }
    lines.push("");
    lines.push("### 代表 Frame");
    lines.push("");
    if (category.sampleFrames.length) {
      lines.push("| Frame | 尺寸 | URL |");
      lines.push("| --- | --- | --- |");
      for (const frame of category.sampleFrames) {
        lines.push(`| ${frame.name || frame.id} | ${frame.size || "unknown"} | ${frame.url} |`);
      }
    } else {
      lines.push("尚未匯出代表 frame。");
    }
  }

  lines.push("");
  lines.push("## Matters Studio 用例");
  lines.push("");
  lines.push("| 用例 | 對應分類 | 必填欄位 | 建議輸出 |");
  lines.push("| --- | --- | --- | --- |");
  for (const useCase of catalog.studioUseCases) {
    lines.push(
      `| ${useCase.label} | ${useCase.categories.join(", ")} | ${useCase.requiredInputs.join(", ")} | ${useCase.recommendedOutputs.join(", ")} |`
    );
  }

  return `${lines.join("\n")}\n`;
}

function renderNewcomerGuide(catalog) {
  const lines = [];
  lines.push("# CC & Branding 新手指南");
  lines.push("");
  lines.push("當你要從既有 Figma 風格產生一張新的 Matters 圖，先照這份指南選分類、尺寸與生成方式。");
  lines.push("");
  lines.push("## 快速開始");
  lines.push("");
  lines.push("1. 先選活動家族：Matters.Town、Matters Lab、自由寫、七日書、The Space 或 Traveloggers。");
  lines.push("2. 再選需求：文章金句、活動海報、campaign 宣傳圖、季節系列、批次題目卡。");
  lines.push("3. 從該分類既有常用尺寸中選畫布，不要先發明新尺寸。");
  lines.push("4. 產生或選擇不含文字的底圖。");
  lines.push("5. 中文文字、logo、CTA 一律交給 template render，不放進 AI 生成圖片裡。");
  lines.push("");
  lines.push("## 我該選哪一類？");
  lines.push("");
  lines.push("| 需求 | 從這類開始 | 原因 |");
  lines.push("| --- | --- | --- |");
  lines.push("| 文章摘句或作者金句 | Matters.Town 文章金句 | 既有 1200x1200 金句模板最完整。 |");
  lines.push("| 研究活動 / AMA / 講者卡 | Matters Lab 社媒與活動海報 | 適合日期、講者、平台等高資訊密度。 |");
  lines.push("| 文學與寫作活動 | 自由寫品牌模板 | IG portrait 系統最完整，也有季節語氣。 |");
  lines.push("| 七日書題目批次生成 | 七日書 | 題目、月份、天數最適合結構化批次出圖。 |");
  lines.push("| 產品或 campaign 公告 | Matters.Town 活動與產品宣傳 | 含問卷、產品、campaign 與 banner 變體。 |");
  lines.push("");
  lines.push("## 常用尺寸規則");
  lines.push("");
  const sizeRows = catalog.categories
    .filter((category) => category.commonOutputSizes.length)
    .map((category) => `| ${category.label} | ${category.commonOutputSizes.slice(0, 5).map((item) => `${item.size} x${item.count}`).join("<br>")} |`);
  lines.push("| 分類 | 優先沿用這些既有尺寸 |");
  lines.push("| --- | --- |");
  lines.push(table(sizeRows));
  lines.push("");
  lines.push("## 文字規則");
  lines.push("");
  lines.push("- AI 生成圖保持無字。");
  lines.push("- 繁體中文文字用 template render，才能穩定控制換行、字重與 logo 位置。");
  lines.push("- 主標長度依版型限制：金句卡可承載較長文字；活動海報要短標題加結構化資訊。");
  lines.push("- Figma 樣本常見 `jf-jinxuan`、`Noto Serif TC`、`Noto Sans TC`；網頁端若沒有授權字體，需用 Noto 系列或已授權 webfont 做 fallback。");
  lines.push("- Serif 用於 editorial 強調；sans 用於 metadata、CTA、日期與欄位資訊。");
  lines.push("");
  lines.push("## 底圖規則");
  lines.push("");
  lines.push("- 底圖要留清楚文字安全區。");
  lines.push("- 紫色與萊姆綠要支撐分類語氣，不只是通用裝飾。");
  lines.push("- 產品 / campaign 可以更乾淨；自由寫與七日書可以更文學、季節化。");
  lines.push("- 不要要求影像模型畫 Matters logo、UI 截圖、QR code 或中文文案。");
  lines.push("");
  lines.push("## Matters Studio 介面契約");
  lines.push("");
  lines.push("Studio UI 應讀取 `brand/catalogs/cc-branding-categories.json`，並提供：");
  lines.push("");
  for (const useCase of STUDIO_USE_CASES) {
    lines.push(`- ${useCase.label}：欄位 ${useCase.requiredInputs.join(", ")}；輸出 ${useCase.recommendedOutputs.join(", ")}。`);
  }
  lines.push("");
  lines.push("生成流程應分兩步：先產生底圖，再用 HTML/CSS 做確定性排版。");
  return `${lines.join("\n")}\n`;
}

function renderPromptGuide(catalog) {
  const lines = [];
  lines.push("# CC & Branding Image 2 Prompt Guide");
  lines.push("");
  lines.push("Use these prompts as starting points for OpenAI `gpt-image-2` background generation.");
  lines.push("The generated image should stay text-free. Matters logo, Chinese copy, CTA, dates, and final layout are rendered by Studio templates.");
  lines.push("");
  lines.push("Canonical machine-readable source:");
  lines.push("");
  lines.push("- `brand/catalogs/cc-branding-categories.json` → `category.studioWorkflow.prompt`");
  lines.push("");
  lines.push("## Shared Negative Prompt");
  lines.push("");
  lines.push("```text");
  lines.push("No readable text. No pseudo letters. No logos. No fake Matters mark. No UI screenshots. No QR codes. No watermark. Leave a clear text-safe area for Traditional Chinese typography.");
  lines.push("```");
  lines.push("");
  lines.push("## Category Prompts");
  for (const category of catalog.categories) {
    lines.push("");
    lines.push(`### ${category.label}`);
    lines.push("");
    lines.push(`- Category ID: \`${category.id}\``);
    lines.push(`- Product line: ${category.productLine}`);
    lines.push(`- Primary sizes: ${category.commonOutputSizes.slice(0, 5).map((item) => item.size).join(", ") || "reference only"}`);
    lines.push("");
    lines.push("```text");
    lines.push(category.studioWorkflow?.prompt || "No prompt yet.");
    lines.push("```");
  }
  lines.push("");
  lines.push("## Prompt Rules");
  lines.push("");
  lines.push("- Generate only the background layer.");
  lines.push("- Put desired visual mood, motif, palette, and text-safe area in the prompt.");
  lines.push("- Do not ask the image model to draw Traditional Chinese text, Matters logo, QR codes, UI, dates, speaker names, or CTA.");
  lines.push("- After background generation, use Studio templates for final text layout and PNG export.");
  return `${lines.join("\n")}\n`;
}

function printHelp() {
  console.log(`
build-brand-catalog [--no-fetch]

Build categorized CC & Branding docs and JSON catalog.

Prerequisites:
  node scripts/extract-brand-figma.mjs cache

Options:
  --no-fetch   Do not fetch deep representative frame metadata; use cached deep nodes if present.
`);
}

const opts = parseArgs(argv.slice(2));
if (opts.help) {
  printHelp();
  exit(0);
}

const shallowFilePath = path.join(CACHE_DIR, "file.depth2.json");
if (!existsSync(shallowFilePath)) {
  console.error("Missing Figma cache. Run: node scripts/extract-brand-figma.mjs cache");
  exit(1);
}

const shallowFile = await readJson(shallowFilePath);
const sampleFrameIds = CATEGORY_DEFINITIONS.flatMap((category) => category.sampleFrames || []);
const deepNodes = await fetchDeepNodes(sampleFrameIds, opts.fetchDeep);
const catalog = buildCatalog({ shallowFile, deepNodes });
await writeJson(CATALOG_JSON, catalog);
await fs.writeFile(CATALOG_MD, renderCatalogMarkdown(catalog));
await fs.writeFile(NEWCOMER_MD, renderNewcomerGuide(catalog));
await fs.writeFile(PROMPTS_MD, renderPromptGuide(catalog));

console.log(`wrote ${path.relative(cwd(), CATALOG_JSON)}`);
console.log(`wrote ${path.relative(cwd(), CATALOG_MD)}`);
console.log(`wrote ${path.relative(cwd(), NEWCOMER_MD)}`);
console.log(`wrote ${path.relative(cwd(), PROMPTS_MD)}`);
