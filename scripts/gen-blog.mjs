// Pull the latest 8 posts from `blog.feedUrl` (RSS) and write them into
// `blog.posts` in both site.json and site.cn.json. Always overwrites — the
// feed is the source of truth, so newer entries replace stale snapshots.
//
// Usage: node scripts/gen-blog.mjs

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FILES = ["site.json", "site.cn.json"];
const LIMIT = 8;
const EXCERPT_LEN = 80;

const ENTITIES = { lt: "<", gt: ">", quot: '"', apos: "'", amp: "&", "#39": "'", nbsp: " " };

function decodeEntities(s) {
  return s.replace(/&(#?\w+);/g, (_, code) => ENTITIES[code] ?? `&${code};`);
}

function unwrapCdata(s) {
  const m = s.match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return m ? m[1] : s;
}

function pick(itemXml, tag) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);
  const m = itemXml.match(re);
  return m ? unwrapCdata(m[1]).trim() : "";
}

function stripHtml(html) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(html) {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : "";
}

function formatDate(rfc2822) {
  const d = new Date(rfc2822);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseFeed(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
  return items.map((raw) => {
    const title = decodeEntities(pick(raw, "title"));
    const link = pick(raw, "link");
    const date = formatDate(pick(raw, "pubDate"));
    const descHtml = decodeEntities(pick(raw, "description"));
    const image = firstImage(descHtml);
    const text = stripHtml(descHtml);
    const excerpt = text.length > EXCERPT_LEN ? `${text.slice(0, EXCERPT_LEN)}…` : text;
    return { title, link, date, image, excerpt };
  });
}

for (const file of FILES) {
  const path = resolve(ROOT, file);
  const json = JSON.parse(await readFile(path, "utf8"));
  const feedUrl = json.blog?.feedUrl;
  if (!feedUrl) {
    console.error(`[${file}] missing blog.feedUrl, skipping`);
    continue;
  }
  process.stdout.write(`[${file}] fetching ${feedUrl}\n`);
  const res = await fetch(feedUrl);
  if (!res.ok) throw new Error(`fetch failed (${res.status}) for ${feedUrl}`);
  const xml = await res.text();
  const posts = parseFeed(xml).slice(0, LIMIT);
  json.blog.posts = posts;
  await writeFile(path, JSON.stringify(json, null, 2) + "\n");
  console.log(`[${file}] wrote ${posts.length} posts`);
}
