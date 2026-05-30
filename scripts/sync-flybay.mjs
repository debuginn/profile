// Sync static assets from vendor/flybay/public/ → public/
// Copies only files that are missing or outdated (by mtime).
// Run automatically before `next dev` and `next build`.
//
// Usage: node scripts/sync-flybay.mjs

import { copyFile, stat } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(ROOT, "vendor/flybay/public");
const DEST = resolve(ROOT, "public");

// Extensions we want to sync
const EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".svg"]);

const files = readdirSync(SRC).filter((f) => EXTS.has(f.slice(f.lastIndexOf("."))));

let copied = 0;
for (const file of files) {
  const src = resolve(SRC, file);
  const dest = resolve(DEST, file);
  let needsCopy = true;
  try {
    const [ss, ds] = await Promise.all([stat(src), stat(dest)]);
    // Skip if dest is newer or same age
    if (ds.mtimeMs >= ss.mtimeMs) needsCopy = false;
  } catch {
    // dest doesn't exist → needs copy
  }
  if (needsCopy) {
    await copyFile(src, dest);
    console.log(`sync:flybay  ${file}`);
    copied++;
  }
}

if (copied === 0) {
  console.log("sync:flybay  up to date");
} else {
  console.log(`sync:flybay  ${copied} file(s) synced`);
}
