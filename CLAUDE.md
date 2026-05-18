# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (defaults to the `com` variant).
- `npm run build` — produce the static export in `out/`. Set `SITE_VARIANT` to choose locale: `SITE_VARIANT=com npm run build` or `SITE_VARIANT=cn npm run build`. Anything other than `cn` resolves to `com`.
- `npm run start` — serve a previously built app (rarely useful here since `next.config.ts` sets `output: "export"`).
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next/core-web-vitals` + `/typescript`).
- No test runner is configured.

## Architecture

This is a Next.js 16 App Router site exported as static HTML and deployed to GitHub Pages. The whole product is a single full-bleed scrollable page composed of four sections, parameterized by JSON so the same code ships two variants.

### Variant system (com / cn)

`next.config.ts` exposes `SITE_VARIANT` to the client. `src/lib/config.ts` imports both `site.json` and `site.cn.json` at build time and picks one based on `SITE_VARIANT`. **Never read `process.env.SITE_VARIANT` from components** — go through `src/lib/config.ts` (re-exported as the default of `src/lib/config`) so the right JSON is bundled. Types for the JSON shape live in `src/lib/config.ts` (`SiteConfig`, `SectionDef`, `InstitutionCard`, etc.); update both JSON files together when changing schema.

### Page composition

`src/app/page.tsx` is the single client page. It:

1. Calls `usePageVM(PAGE_IDS, config.home.backgrounds)` (in `src/viewmodels/usePageVM.ts`) to get `activePage`, two independently-randomized background URLs (`bgUrl` for the home section, `bgUrlSocial` for the social section), and a hitokoto string fetched from `v1.hitokoto.cn`.
2. Maps `config.sections` (declared in JSON) to one of four section components (`HomeSection`, `IAssetsSection`, `FlyBaySection`, `SocialSection`) by `section.type`. To add a section, extend the `SectionType` union in `src/lib/config.ts`, add a JSON entry, and add a branch in `page.tsx`.
3. Decides the `Header` tone (`light`/`dark`) by sampling the active background image's average luminance through a 32×32 canvas — needed because backgrounds are random and arbitrary. The header only renders on the first and last sections.
4. Renders a global page-down chevron pointing at `config.sections[activeIdx + 1]` and a `PageDots` rail driven by the same section list.

### Active-section tracking

`usePageVM` syncs `activePage` from two sources: the URL hash (`hashchange`) and an `IntersectionObserver` rooted at `.page-stack` watching each section element. Section ids in the JSON must match the DOM ids the section components render. The `.page-stack` container is the scroll root (see `globals.css`) — sections do not scroll the window.

### Static assets and legacy CSS

The site still pulls Bootstrap 3 + jQuery from `public/static/` (loaded as `<Script>` in `src/app/layout.tsx`) and uses `cover.css` for layout primitives. Don't delete these; section markup depends on Bootstrap utility classes. Section-specific images live under `public/assets/`. `index.html` and `404.html` at the repo root are legacy artifacts and are not part of the Next.js build.

### Deployment

`.github/workflows/deploy.yml` runs on pushes to `main` and builds twice in parallel — once with `SITE_VARIANT=com` (deployed via `peaceiris/actions-gh-pages` to the `com` branch) and once with `SITE_VARIANT=cn` (to the `cn` branch). Both use `force_orphan: true`, so each branch is rewritten on every deploy. Day-to-day work happens on `dev`; merge to `main` to ship.

### Path alias

`@/*` resolves to `src/*` (see `tsconfig.json`). Existing code uses relative imports — match the surrounding file's style rather than mixing.
