# Closing section assets

All runtime assets are served from `public/closing/`. No remote image request or private FlyBay submodule is required by this section. Author photographs and existing identity assets were reused; no generated mockup was cropped into production assets.

Photographs were resized to 720 px wide and encoded as WebP at quality 78. Raster identity assets had transparent padding trimmed, were fitted within 320 × 320 px without enlargement, and were encoded as WebP at quality 88. The Apple SVG was copied unchanged. Filters, blur, rotation, and shadows belong to the section styles rather than being baked into these files.

| Runtime file | Original source | Original SHA-256 |
| --- | --- | --- |
| `dusk.webp` | Author photograph: https://static.debuginn.com/202303120016035.jpeg | `23c5a3320a97aa3a98b3a7ba7b1bd3ac3968f05c0952836c8314d4181e660bb5` |
| `lake.webp` | Author photograph: https://static.debuginn.com/202303120017184.jpeg | `9dbe9913a82bc68ce4ef836e98201b2695e5f0551db6ba7174c18911021cf3c7` |
| `debuginn.webp` | Existing Profile asset: public/debuginn-logo.webp | `2c9e8dbc1561b7360d97dc9669bcbdfefcc3c5eac103f348cbcbdb7f0897442c` |
| `flybay.webp` | Existing Profile asset: public/flybay-icon.png | `88c334743abf2bb26ef409a0733960c801aecfb6b56d9ff8e2db914932c061ff` |
| `plural.webp` | Existing Plural extension asset: extensions/plural/public/brand/duoyuanpai-mark-700.webp | `e73b70a93c101b4a2ae8e752d0815e3c8fef8323099c47a9280ebd4c0b8ce98f` |
| `iassets.webp` | Existing Profile asset: public/iassets-logo.png | `d8495516002dd4fc92c52f19dd9a1478c4d12324125084dc3ea23b561b205168` |
| `xiaomi.webp` | Approved design reference: footer-xiaomi-current-logo-mi2.png; source https://s02.mifile.cn/assets/static/image/logo-mi2.png | `2a29192e4a4e0c3f23efb87b0b070be5f3eb8cdddfd3353f5e48960a90f752f0` |
| `mijia.webp` | Approved design reference: footer-mijia-logo-official.png | `83d3feff7c67b09df0c658228e3d23cb8da0fae7347ee866bd8da29f080c4111` |
| `apple.svg` | Approved design reference: footer-apple-official.svg | `86fd3a54dc7d36f7e5c60c39a9fd2b5ec300dc7a129aea26f5633caa08559aab` |
| `openhosts.webp` | Approved OpenHosts project design reference: footer-openhosts-official-logo.png | `bcda4c0930fd867aa59fa1dcba93683f124e537120c92a1aa7fb2be1a3b65123` |

The temporary reference filenames identify the original approved design assets. Their hashes document the exact input files even after temporary files have been cleaned up.

The additional official reference sources are:

- Apple: the navigation mark from https://www.apple.com/.
- Mijia: the PNG in the current https://home.mi.com/ bundle, https://cdn.web-global.fds.api.mi-img.com/mijia/prod/home/main.ec78fdc73e.js.
- OpenHosts: https://raw.githubusercontent.com/debuginn/OpenHosts/main/OpenHosts/Resources/Assets.xcassets/AppIcon.appiconset/icon_1024x1024.png, from https://github.com/debuginn/OpenHosts.

## Configuration

`closing.items` contains photo/logo entries with local `src`, descriptive `alt`, percentage center coordinates `x` and `y`, percentage viewport `width`, and `rotation` in degrees. The last section has `id: closing`, `type: closing`, and its own navigation entry.

`closing.photoPool` contains local, optimized derivatives from the existing `home.backgrounds` gallery. The client shuffles this pool and selects different photographs for the fixed photo tiles; positions, rotations, and logos remain unchanged. The original two local images in `closing.items` remain fallback sources.

To update the pool after adding gallery photographs, install the normal project dependencies and run `node scripts/gen-closing-photos.mjs`. Previously prepared files are reused, so a repeated run can complete without image downloads. Use `--refresh` only when intentionally regenerating existing photographs. The script writes at least nine usable images before updating the configuration and records each source URL, source hash, dimensions, quality, and output size in `docs/closing-photo-pool.json`. Photos use a fixed 4:3 frame (720 × 540 px, centre cover crop) and at most 100 KiB each, beginning at WebP quality 76. Commit the resulting local assets, manifest, and configuration together. Production build and deployment scripts do not invoke this generator or require gallery network access.

The contact entry uses `mailto:idebuginn@gmail.com`, explicitly supplied by the user for this page. The site footer partial supplies its existing release version dynamically; the closing configuration does not hardcode a version.
