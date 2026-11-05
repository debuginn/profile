# Profile repository guide

`debuginn.com` and `debuginn.cn` are Hugo static sites. The retired Next.js implementation and root-level static HTML pages have been removed; do not reintroduce them as the production entry point. The standalone `hugo-theme-debuginn` is pinned as a Git submodule, with the FlyBay Hugo adapter pinned inside that theme. `extensions/plural` is a committed distribution generated from Plural, not editable source.

## Local commands

- `npm run setup` — initialize the pinned submodules.
- `npm run dev` — prepare the COM data and start the Hugo development server.
- `npm run build` — prepare and build COM into `dist/`.
- `npm run build:cn` — prepare and build CN into `dist/`.
- `npm run gen:blog` — fetch recent blog posts into both source JSON files; the deployment workflow runs this before building.
- `npm run gen:lqip` — fill in missing background thumbnails for both source JSON files; this helper requires the remaining `sharp` npm dependency.

The build scripts call `scripts/ensure-hugo-submodules.mjs` and `scripts/prepare-hugo-data.mjs`. `site.json` and `site.cn.json` are the two source configurations; the generated `data/site.json` is ignored. Update both variants when changing their shared schema.

## Source of truth

- Hugo pages and behavior: `themes/hugo-theme-debuginn/`; the parent repository points to an exact theme commit. Do not edit a detached submodule checkout directly: work on a named theme branch/worktree, then update the parent gitlink deliberately.
- Profile-specific config and integrations: `hugo.toml`, `layouts/`, `site.json`, `site.cn.json`, `public/`, and `extensions/plural/`.
- FlyBay design and assets: the theme's nested FlyBay Hugo adapter; do not copy old Next.js components back into Profile.
- Plural design: the Plural source project; regenerate `extensions/plural` with its exporter, then verify both Profile variants.
- A small subset of the old Bootstrap Cover template styles remains in the active theme CSS. These layout rules are in use; Bootstrap CSS/JS is not loaded.

## Deployment

`.github/workflows/deploy.yml` builds COM and CN on pushes to `preview` or `main`. Only `main` publishes `dist/` to the `com` and `cn` deployment branches. Scheduled runs refresh blog data and skip the build if it has not changed. Day-to-day changes go to `dev`; merging to `main` requires the user's approval. Verify both site variants before proposing a release.
