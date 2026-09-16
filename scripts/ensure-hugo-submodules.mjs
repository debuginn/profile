import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  "themes/hugo-theme-debuginn/layouts/index.html",
  "themes/hugo-theme-debuginn/extensions/flybay/hugo/layouts/partials/debuginn/extensions/flybay.html",
  "themes/hugo-theme-debuginn/extensions/flybay/hugo/static/flybay/flybay.js",
];

async function missingFiles() {
  const checks = await Promise.all(
    requiredFiles.map(async (path) => {
      try {
        await access(resolve(root, path), constants.R_OK);
        return null;
      } catch {
        return path;
      }
    }),
  );
  return checks.filter(Boolean);
}

let missing = await missingFiles();

if (missing.length > 0) {
  console.log("Preparing pinned Hugo theme and FlyBay submodules...");
  execFileSync("git", ["submodule", "update", "--init", "--recursive"], {
    cwd: root,
    stdio: "inherit",
  });
  missing = await missingFiles();
}

if (missing.length > 0) {
  throw new Error(
    `Submodule setup is incomplete. Missing: ${missing.join(", ")}. Run npm run setup and retry.`,
  );
}
