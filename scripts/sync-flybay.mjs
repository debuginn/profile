// Sync flyBay submodule + static assets
// 1. Pull latest submodule code (vendor/flybay)
// 2. Copy image assets from vendor/flybay/public/ → public/
//
// Usage: node scripts/sync-flybay.mjs

import { copyFile, stat } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SUBMODULE = resolve(ROOT, "vendor/flybay");
const SRC = resolve(ROOT, "vendor/flybay/public");
const DEST = resolve(ROOT, "public");

// 1. Update submodule to latest main
console.log("sync:flybay  updating submodule...");
try {
  execSync("git -C vendor/flybay fetch origin main", { cwd: ROOT, stdio: "pipe" });
  const behind = execSync("git -C vendor/flybay rev-list HEAD..origin/main --count", { cwd: ROOT, stdio: "pipe", encoding: "utf-8" }).trim();
  if (behind !== "0") {
    execSync("git -C vendor/flybay merge origin/main --ff-only", { cwd: ROOT, stdio: "pipe" });
    console.log(`sync:flybay  submodule updated (+${behind} commits)`);
  } else {
    console.log("sync:flybay  submodule up to date");
  }
} catch (e) {
  console.warn("sync:flybay  submodule update failed:", e.message?.split("\n")[0]);
}

// 2. Sync image assets
const EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".svg"]);
const files = readdirSync(SRC).filter((f) => EXTS.has(f.slice(f.lastIndexOf("."))));

let copied = 0;
for (const file of files) {
  const srcPath = resolve(SRC, file);
  const destPath = resolve(DEST, file);
  let needsCopy = true;
  try {
    const [ss, ds] = await Promise.all([stat(srcPath), stat(destPath)]);
    if (ds.mtimeMs >= ss.mtimeMs) needsCopy = false;
  } catch {
    // dest doesn't exist → needs copy
  }
  if (needsCopy) {
    await copyFile(srcPath, destPath);
    console.log(`sync:flybay  ${file}`);
    copied++;
  }
}

if (copied === 0) {
  console.log("sync:flybay  assets up to date");
} else {
  console.log(`sync:flybay  ${copied} asset(s) synced`);
}
