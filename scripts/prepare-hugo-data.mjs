import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const variant = process.argv[2] ?? "com";
const sources = {
  com: "site.json",
  cn: "site.cn.json",
};

if (!(variant in sources)) {
  throw new Error(`Unknown site variant: ${variant}. Expected com or cn.`);
}

const dataDir = resolve(root, "data");
await mkdir(dataDir, { recursive: true });
await copyFile(resolve(root, sources[variant]), resolve(dataDir, "site.json"));
console.log(`Prepared data/site.json for ${variant}`);
