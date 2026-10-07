import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
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
const sourcePath = resolve(root, sources[variant]);
const outputPath = resolve(dataDir, "site.json");
const config = JSON.parse(await readFile(sourcePath, "utf8"));
const sections = config.sections ?? [];
const activeSections = sections.filter((section) => {
  if (section.type !== "extension" && section.type !== "flybay") return true;
  const moduleName = section.module ?? section.extension ?? section.id;
  return config.extensions?.[moduleName]?.enabled !== false;
});

if (activeSections.length === sections.length) {
  await copyFile(sourcePath, outputPath);
} else {
  config.sections = activeSections;
  await writeFile(outputPath, `${JSON.stringify(config, null, 2)}\n`);
}
console.log(`Prepared data/site.json for ${variant}`);
