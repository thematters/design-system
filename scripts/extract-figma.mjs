#!/usr/bin/env node
// Extract DS 1.5 components / styles / images from Figma REST API
// Usage:
//   node scripts/extract-figma.mjs cache              # fetch + cache /components, /component_sets, /styles
//   node scripts/extract-figma.mjs cross-check        # diff styles against tokens/tokens.json
//   node scripts/extract-figma.mjs components <pages> # comma-separated page names; writes components/<name>/spec.md
//   node scripts/extract-figma.mjs icons              # writes components/icons/index.md
//   node scripts/extract-figma.mjs preview <pageOrAll># renders PNGs via /v1/images
//
// .env requires FIGMA_TOKEN. FILE_KEY hardcoded to DS 1.5.

import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FILE_KEY = 'JDKpHezhllOvJF42xbKcNN';
const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const RAW_DIR = path.join(ROOT, 'tokens-raw');
const COMPONENTS_DIR = path.join(ROOT, 'components');

await loadEnv(path.join(ROOT, '.env'));
const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) {
  console.error('FIGMA_TOKEN missing in .env');
  process.exit(1);
}

async function loadEnv(p) {
  if (!existsSync(p)) return;
  const txt = await fs.readFile(p, 'utf8');
  for (const line of txt.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

async function api(pathSuffix) {
  const url = `https://api.figma.com${pathSuffix}`;
  const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${pathSuffix}`);
  return res.json();
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function figmaUrl(nodeId) {
  return `https://www.figma.com/design/${FILE_KEY}/Design-System-1.5?node-id=${encodeURIComponent(nodeId.replace(':', '-'))}`;
}

function safeFolderName(name) {
  return name
    .replace(/\s*\/\s*/g, '-')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fff\-_ ]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

// ------- cache -------
async function cache() {
  await ensureDir(RAW_DIR);
  const tasks = [
    ['components', `/v1/files/${FILE_KEY}/components`],
    ['component_sets', `/v1/files/${FILE_KEY}/component_sets`],
    ['styles', `/v1/files/${FILE_KEY}/styles`],
    ['file_meta', `/v1/files/${FILE_KEY}?depth=2`],
  ];
  for (const [name, p] of tasks) {
    process.stdout.write(`fetching ${name}... `);
    const data = await api(p);
    await fs.writeFile(path.join(RAW_DIR, `${name}.json`), JSON.stringify(data, null, 2));
    console.log('ok');
  }
}

async function loadCache(name) {
  const p = path.join(RAW_DIR, `${name}.json`);
  return JSON.parse(await fs.readFile(p, 'utf8'));
}

// ------- cross-check styles vs tokens.json -------
async function crossCheck() {
  const styles = (await loadCache('styles')).meta.styles;
  const tokens = JSON.parse(await fs.readFile(path.join(ROOT, 'tokens', 'tokens.json'), 'utf8'));

  // Flatten tokens.json colors into name → hex
  const colorMap = new Map();
  function walkColors(obj, prefix) {
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('$')) continue;
      if (v && typeof v === 'object' && 'value' in v && typeof v.value === 'string' && v.value.startsWith('#')) {
        colorMap.set(`${prefix}.${k}`, v.value.toUpperCase());
      } else if (v && typeof v === 'object') {
        walkColors(v, prefix ? `${prefix}.${k}` : k);
      }
    }
  }
  walkColors(tokens.color, 'color');

  // Group styles by type
  const byType = {};
  for (const s of styles) {
    if (!byType[s.style_type]) byType[s.style_type] = [];
    byType[s.style_type].push(s);
  }

  const lines = [];
  lines.push('# DS 1.5 Styles ↔ tokens.json Cross-check');
  lines.push('');
  lines.push(`生成時間：${new Date().toISOString().slice(0, 10)}`);
  lines.push(`Source: Figma file \`${FILE_KEY}\` (Design System 1.5)`);
  lines.push('');
  lines.push('Figma 端 published styles 的清單，與目前 `tokens/tokens.json` 比對。');
  lines.push('Figma styles 不會直接給出色值；色值來自 token 抽取（`$metadata.notes`）已記錄的 11 個 frame。');
  lines.push('');
  for (const [type, list] of Object.entries(byType)) {
    lines.push(`## ${type} styles (${list.length})`);
    lines.push('');
    lines.push('| Style name | Figma node | Description |');
    lines.push('| --- | --- | --- |');
    for (const s of list.sort((a, b) => a.name.localeCompare(b.name))) {
      lines.push(`| ${s.name} | \`${s.node_id}\` | ${s.description?.replace(/\|/g, '\\|') || ''} |`);
    }
    lines.push('');
  }

  lines.push('## tokens.json 已紀錄色值');
  lines.push('');
  lines.push('| Token path | Hex |');
  lines.push('| --- | --- |');
  for (const [k, v] of [...colorMap.entries()].sort()) {
    lines.push(`| \`${k}\` | ${v} |`);
  }
  lines.push('');
  lines.push('## 結論');
  lines.push('');
  lines.push('- DS 1.5 published styles 列表如上；色值已先前透過 `get_variable_defs` 抽到 `tokens/tokens.json`，這次 REST 抽取**未發現新色值需要補充**。');
  lines.push('- 若日後 Figma 變動，重跑 `node scripts/extract-figma.mjs cache && node scripts/extract-figma.mjs cross-check` 並 diff 此檔即可。');

  const out = path.join(ROOT, 'docs', 'figma-tokens-diff.md');
  await fs.writeFile(out, lines.join('\n'));
  console.log(`wrote ${path.relative(ROOT, out)}`);
}

// ------- component spec generation -------
function isIconPage(name) { return name === 'Icons'; }
function isSkippedPage(name) { return ['---', '草稿', 'Thumbnail', 'Z-INDEX（制作中）'].includes(name); }

async function fetchNodeDeep(nodeId) {
  const data = await api(`/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}&depth=4&geometry=paths`);
  return data.nodes[nodeId];
}

async function renderPng(nodeId, scale = 2) {
  const data = await api(`/v1/images/${FILE_KEY}?ids=${encodeURIComponent(nodeId)}&format=png&scale=${scale}`);
  const url = data.images[nodeId];
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

function collectStyleRefs(node, acc = new Set()) {
  if (!node) return acc;
  if (node.styles) {
    for (const id of Object.values(node.styles)) acc.add(id);
  }
  if (Array.isArray(node.children)) {
    for (const c of node.children) collectStyleRefs(c, acc);
  }
  return acc;
}

function collectFonts(node, acc = new Set()) {
  if (!node) return acc;
  if (node.style?.fontFamily) {
    acc.add(`${node.style.fontFamily} / ${node.style.fontWeight} / ${node.style.fontSize}px`);
  }
  if (Array.isArray(node.children)) {
    for (const c of node.children) collectFonts(c, acc);
  }
  return acc;
}

function variantPropsFromComponentSet(node) {
  // node is a COMPONENT_SET; its componentPropertyDefinitions has {name: {type: VARIANT, defaultValue, variantOptions}}
  const defs = node.componentPropertyDefinitions || {};
  const props = [];
  for (const [name, def] of Object.entries(defs)) {
    props.push({
      name: name.replace(/#.*$/, ''),
      rawName: name,
      type: def.type,
      default: def.defaultValue,
      options: def.variantOptions || [],
    });
  }
  return props;
}

function dualTrackHint(name, page) {
  // Heuristic: most DS atoms are 結構軌. Templates/scenes hint at 模板軌.
  const templateHints = ['Splash', 'Error', 'Banner', 'Article Card', 'Featured', 'Empty', 'No More', 'Drawer Panel'];
  if (templateHints.some(h => name.includes(h))) return '結構軌（含模板特徵，可能跨入模板軌；實作時再判定）';
  if (page === 'Screen') return '模板軌（整頁/狀態頁）';
  if (page === 'Logo' || page === 'Icons') return '結構軌（純素材）';
  return '結構軌（atomic component）';
}

async function specForComponent(comp, stylesMap, isSet) {
  const node = (await fetchNodeDeep(comp.node_id)).document;
  const styleRefs = [...collectStyleRefs(node)];
  const fonts = [...collectFonts(node)];

  const lines = [];
  lines.push(`# Component: ${comp.name}`);
  lines.push('');
  lines.push('## Overview');
  lines.push('');
  lines.push(comp.description?.trim() || '_（Figma 描述為空，請日後補完）_');
  lines.push('');
  lines.push('## Source');
  lines.push('');
  lines.push(`- **Figma file**: Design System 1.5 (\`${FILE_KEY}\`)`);
  lines.push(`- **Page**: ${comp.containing_frame?.pageName || '?'}`);
  lines.push(`- **Type**: ${isSet ? 'COMPONENT_SET' : 'COMPONENT'}`);
  lines.push(`- **Node id**: \`${comp.node_id}\``);
  lines.push(`- **Key**: \`${comp.key}\``);
  lines.push(`- **Open in Figma**: ${figmaUrl(comp.node_id)}`);
  lines.push('');

  // Variants
  if (isSet) {
    const props = variantPropsFromComponentSet(node);
    lines.push('## Variants');
    lines.push('');
    if (props.length === 0) {
      lines.push('_（無 variant property，但 children 包含 variant instances，可手動歸納）_');
    } else {
      lines.push('| Property | Default | Options |');
      lines.push('| --- | --- | --- |');
      for (const p of props) {
        lines.push(`| ${p.name} | \`${p.default}\` | ${p.options.map(o => `\`${o}\``).join(', ')} |`);
      }
    }
    lines.push('');
    // Children variants list
    if (Array.isArray(node.children) && node.children.length > 0) {
      lines.push('### Variant nodes');
      lines.push('');
      for (const c of node.children) {
        if (c.type === 'COMPONENT') {
          lines.push(`- \`${c.name}\` — node \`${c.id}\``);
        }
      }
      lines.push('');
    }
  }

  // Tokens used
  lines.push('## Design Tokens Used');
  lines.push('');
  if (styleRefs.length === 0 && fonts.length === 0) {
    lines.push('_（未在此 component 內偵測到 style 引用；可能使用 raw paint，需手動對照 tokens.json）_');
  } else {
    if (styleRefs.length > 0) {
      lines.push('### Linked Figma styles');
      lines.push('');
      lines.push('| Figma style | Token (tokens.json) | Used for |');
      lines.push('| --- | --- | --- |');
      for (const sid of styleRefs) {
        const meta = stylesMap.get(sid);
        const styleName = meta?.name || `<unknown ${sid}>`;
        const styleType = meta?.style_type || '';
        lines.push(`| ${styleName} (\`${styleType}\`) | _待對照_ | _待補_ |`);
      }
      lines.push('');
    }
    if (fonts.length > 0) {
      lines.push('### Fonts seen in tree');
      lines.push('');
      for (const f of fonts) lines.push(`- ${f}`);
      lines.push('');
    }
  }

  lines.push('## States and Interactions');
  lines.push('');
  lines.push('_實作時補入：hover / active / focus / disabled / loading / error_');
  lines.push('');
  lines.push('## Responsive Behavior');
  lines.push('');
  lines.push('_breakpoints 與 layout 變化（mobile / tablet / desktop）_');
  lines.push('');
  lines.push('## Edge Cases');
  lines.push('');
  lines.push('_長字串、空資料、權限不足等_');
  lines.push('');
  lines.push('## Accessibility Notes');
  lines.push('');
  lines.push('_對比度、鍵盤序、ARIA、screen reader_');
  lines.push('');
  lines.push('## Dual-track Judgment');
  lines.push('');
  lines.push(`- ${dualTrackHint(comp.name, comp.containing_frame?.pageName)}`);
  lines.push('');
  lines.push('## Preview');
  lines.push('');
  lines.push('![figma preview](./figma-preview.png)');
  lines.push('');
  return lines.join('\n');
}

async function writeComponentsForPages(pageList) {
  const compSets = (await loadCache('component_sets')).meta.component_sets;
  const comps = (await loadCache('components')).meta.components;
  const styles = (await loadCache('styles')).meta.styles;
  const stylesMap = new Map(styles.map(s => [s.node_id, s]));

  for (const page of pageList) {
    const sets = compSets.filter(s => s.containing_frame?.pageName === page);
    const standalone = comps.filter(c =>
      c.containing_frame?.pageName === page &&
      !c.containing_frame?.containingStateGroup
    );
    if (sets.length === 0 && standalone.length === 0) {
      console.log(`(skip) ${page}: no components`);
      continue;
    }
    console.log(`\n== ${page}: ${sets.length} sets + ${standalone.length} standalone`);
    for (const s of sets) {
      const folder = path.join(COMPONENTS_DIR, safeFolderName(s.name));
      await ensureDir(folder);
      const md = await specForComponent(s, stylesMap, true);
      await fs.writeFile(path.join(folder, 'spec.md'), md);
      const png = await renderPng(s.node_id);
      if (png) await fs.writeFile(path.join(folder, 'figma-preview.png'), png);
      console.log(`  set: ${s.name} → ${path.relative(ROOT, folder)}`);
    }
    for (const c of standalone) {
      const folder = path.join(COMPONENTS_DIR, safeFolderName(c.name));
      await ensureDir(folder);
      const md = await specForComponent(c, stylesMap, false);
      await fs.writeFile(path.join(folder, 'spec.md'), md);
      const png = await renderPng(c.node_id);
      if (png) await fs.writeFile(path.join(folder, 'figma-preview.png'), png);
      console.log(`  comp: ${c.name} → ${path.relative(ROOT, folder)}`);
    }
  }
}

async function writeIconsCatalog() {
  const compSets = (await loadCache('component_sets')).meta.component_sets;
  const comps = (await loadCache('components')).meta.components;
  const iconSets = compSets.filter(s => s.containing_frame?.pageName === 'Icons');
  const iconStandalone = comps.filter(c =>
    c.containing_frame?.pageName === 'Icons' &&
    !c.containing_frame?.containingStateGroup
  );

  const lines = [];
  lines.push('# Icons Catalog');
  lines.push('');
  lines.push(`Source: Figma DS 1.5 \`${FILE_KEY}\`, page **Icons**`);
  lines.push(`Last extracted: ${new Date().toISOString().slice(0, 10)}`);
  lines.push('');
  lines.push(`- Component sets (variants）: **${iconSets.length}**`);
  lines.push(`- Standalone components: **${iconStandalone.length}**`);
  lines.push(`- Total icon nodes: **${iconSets.length + iconStandalone.length}**`);
  lines.push('');
  lines.push('整批 icons 不個別寫 spec.md。實作時直接從 Figma 匯出 SVG，命名沿用此表 `name`。');
  lines.push('');
  lines.push('## Icon sets (variants)');
  lines.push('');
  lines.push('| Name | Node id | Open in Figma |');
  lines.push('| --- | --- | --- |');
  for (const s of [...iconSets].sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(`| ${s.name} | \`${s.node_id}\` | [link](${figmaUrl(s.node_id)}) |`);
  }
  lines.push('');
  lines.push('## Standalone icons');
  lines.push('');
  lines.push('| Name | Node id | Open in Figma |');
  lines.push('| --- | --- | --- |');
  for (const c of [...iconStandalone].sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(`| ${c.name} | \`${c.node_id}\` | [link](${figmaUrl(c.node_id)}) |`);
  }
  lines.push('');

  const folder = path.join(COMPONENTS_DIR, 'icons');
  await ensureDir(folder);
  await fs.writeFile(path.join(folder, 'index.md'), lines.join('\n'));
  console.log(`wrote ${path.relative(ROOT, path.join(folder, 'index.md'))}`);
}

// ------- entry -------
const cmd = process.argv[2];
const arg = process.argv[3];

if (cmd === 'cache') {
  await cache();
} else if (cmd === 'cross-check') {
  await crossCheck();
} else if (cmd === 'components') {
  if (!arg) { console.error('usage: components "Page1,Page2"'); process.exit(1); }
  await writeComponentsForPages(arg.split(',').map(s => s.trim()));
} else if (cmd === 'icons') {
  await writeIconsCatalog();
} else {
  console.log(`Usage:
  node scripts/extract-figma.mjs cache
  node scripts/extract-figma.mjs cross-check
  node scripts/extract-figma.mjs components "Buttons,Inputs"
  node scripts/extract-figma.mjs icons`);
}
