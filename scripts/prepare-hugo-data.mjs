import { execFileSync } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const themeDir = resolve(root, "themes/hugo-theme-debuginn");
const revision = execFileSync(
  "git",
  ["-C", themeDir, "describe", "--tags", "--always", "--dirty"],
  { encoding: "utf8" },
).trim();
const releaseVersion = revision.match(/^v?\d+\.\d+\.\d+/)?.[0];
const version = releaseVersion
  ? ` ${releaseVersion.startsWith("v") ? releaseVersion : `v${releaseVersion}`}`
    : ` @${revision}`;

const siteData = JSON.parse(
  await readFile(resolve(root, sources[variant]), "utf8"),
);
siteData.site.footerCredit.version = version;

await mkdir(dataDir, { recursive: true });
await writeFile(
  resolve(dataDir, "site.json"),
  `${JSON.stringify(siteData, null, 2)}\n`,
);
console.log(`Prepared data/site.json for ${variant} with theme ${revision}`);
