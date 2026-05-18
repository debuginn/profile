// Generate base64 LQIP placeholders for every URL in `home.backgrounds`
// and write them into `home.backgroundsThumb` (paired by index) for both
// site.json and site.cn.json. Idempotent: cached entries are reused.
//
// Usage: node scripts/gen-lqip.mjs

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FILES = ["site.json", "site.cn.json"];
const TARGET_WIDTH = 32;
const QUALITY = 45;

const cache = new Map();

async function lqipFor(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch failed (${res.status}) for ${url}`);
  const input = Buffer.from(await res.arrayBuffer());
  const out = await sharp(input)
    .rotate()
    .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();
  const dataUri = `data:image/jpeg;base64,${out.toString("base64")}`;
  cache.set(url, dataUri);
  return dataUri;
}

for (const file of FILES) {
  const path = resolve(ROOT, file);
  const json = JSON.parse(await readFile(path, "utf8"));
  const urls = json.home?.backgrounds ?? [];
  const existing = json.home?.backgroundsThumb ?? [];
  const out = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (existing[i]) {
      out.push(existing[i]);
      cache.set(url, existing[i]);
      continue;
    }
    process.stdout.write(`[${file}] ${i + 1}/${urls.length} ${url}\n`);
    out.push(await lqipFor(url));
  }
  json.home.backgroundsThumb = out;
  await writeFile(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`wrote ${file} (${out.length} thumbs)`);
}
