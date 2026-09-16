# Profile

The source and deployment repository for `debuginn.com` and `debuginn.cn`.
The site uses Hugo with the `hugo-theme-debuginn` Git submodule. The theme pins
its FlyBay Hugo adapter as a nested submodule.

## Local development

```bash
npm run setup
npm run dev
```

The development and build commands also repair a missing theme or nested
FlyBay checkout automatically. Both submodules remain pinned to the exact
commits recorded by their parent repositories.

Build both production variants:

```bash
npm run build
npm run build:cn
```

The generated site is written to `dist/`. `site.json` supplies the `.com`
configuration and `site.cn.json` supplies the `.cn` configuration.

## Deployment

Pushes to `preview` build both variants without publishing. Pushes to `main`
build and publish the static output to the `com` and `cn` branches. Scheduled
runs refresh the latest blog entries before building.
