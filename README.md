# Profile

The source and deployment repository for `debuginn.com` and `debuginn.cn`.
The site uses Hugo with the `hugo-theme-debuginn` Git submodule. The theme pins
its FlyBay Hugo adapter as a nested submodule. Profile versions Plural's
generated distribution directly at `extensions/plural`.

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

## Plural extension

The multi-region account and asset navigation Hero is maintained in Plural,
including its brand lockup, three actions, announcement bar, and branded orb.
Profile renders the maintained embed component through Plural's Hugo adapter;
it does not maintain a second copy of the design. The Plural website keeps its
own original full-width homepage layout, independent of this embed.

Plural is a private source repository. `extensions/plural` contains only the
generated Hugo adapter, JavaScript, CSS, data, and required images. It is a
versioned distribution rather than an additional Git submodule; do not edit
its generated files manually.

The `plural` section is configured in both site variants. Change its position
in `sections` to reorder it. The `extensions.plural` object configures its
enabled state, layout, adapter partial, target site URL, and asset namespaces:

```json
"plural": {
  "enabled": true,
  "layout": "fullbleed",
  "partial": "debuginn/extensions/plural.html",
  "data": "plural.hero",
  "assetBase": "/plural-assets",
  "bundleBase": "/plural",
  "href": "https://plural.debuginn.com",
  "styles": ["css/plural-extension.css"]
}
```

`hugo.toml` mounts Plural's layouts, assets, static files, and data. Its public
images are served under `/plural-assets/`, while the adapter bundle uses
`/plural/`. The extension scopes its styles to `.page-screen-plural` and loads
its interactive code when the section approaches the viewport.

`layout: "fullbleed"` is the default presentation: its background fills the
entire Profile screen, with no outer card border, rounded corners, or shadow.
The text, actions, announcement, and orbital artwork stay in a centered
1152px content area; narrow or short screens can scroll inside the section.
Set `layout: "contained"` to use the previous inset card layout. Both variants
share the same configuration, markup, theme, and interactions.

Set `extensions.plural.enabled` to `false` to hide the section and its page
navigation dot. The variant preparation step removes disabled extension
sections from the generated data without changing either source configuration.

To update the extension, run this command from the Plural source repository:

```bash
npm run export:profile -- --destination /absolute/path/to/profile/extensions/plural
```

The exporter builds from Plural's single maintained Hero component and records
the source commit and configuration hash in the distribution manifest. Verify
both Profile variants, then commit the generated distribution with the host
changes so local builds and CI use exactly the same files. Deployment builds
consume these committed artifacts; they do not require access to Plural's
private source repository or an additional deploy key.

## Deployment

Pushes to `preview` build both variants without publishing. Pushes to `main`
build and publish the static output to the `com` and `cn` branches. Scheduled
runs refresh the latest blog entries before building.
