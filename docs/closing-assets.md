# Archived Closing assets and merged Social footer

Social now supplies the final page in both site variants. Profile no longer mounts a standalone Closing section or contains a `closing` configuration. Its scattered logos, photo tiles, central contact entry, and contact fan are removed from the current page. The files in `public/closing/` and their source manifest remain in the repository as archived assets; this page merge does not delete them. Author photographs and existing identity assets were reused; no generated mockup was cropped into production assets.

Photographs were resized to 720 px wide and encoded as WebP at quality 78. Raster identity assets had transparent padding trimmed, were fitted within 320 × 320 px without enlargement, and were encoded as WebP at quality 88. The Apple SVG was copied unchanged. Rotation, contrast filters, and shadows were applied by the standalone section styles rather than baked into these files. The archived photos and logos remain sharp; pointer enlargement and the unblurred WeChat backdrop belonged to that former section's interaction.

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
| `homekit.webp` | Apple Developer HomeKit framework icon: https://developer.apple.com/assets/elements/icons/homekit/homekit-96x96_2x.png | `302d5bd3ad73eb8ef234dbe68f7210dbb7382cf4863d28eddc2e530138b99c45` |
| `skills.webp` | Deployed Skills site header logo: https://skills.debuginn.com/img/logo.png | `aa1e5cb6bc785a38f673cc09e5b9e0a93e4638d617d2eae2b16eabf24e7cabad` |
| `wechat-qr.jpg` | Existing Profile social QR: https://static.debuginn.com/20260529OjuRvn.jpg | `cbfc80d4fc749ee0d7a1e64baa1a4e29a7933b2c7a1402f6477fe0b2eb7b3de2` |

The temporary reference filenames identify the original approved design assets. Their hashes document the exact input files even after temporary files have been cleaned up.

The additional official reference sources are:

- Apple: the navigation mark from https://www.apple.com/.
- Mijia: the PNG in the current https://home.mi.com/ bundle, https://cdn.web-global.fds.api.mi-img.com/mijia/prod/home/main.ec78fdc73e.js.
- OpenHosts: https://raw.githubusercontent.com/debuginn/OpenHosts/main/OpenHosts/Resources/Assets.xcassets/AppIcon.appiconset/icon_1024x1024.png, from https://github.com/debuginn/OpenHosts.
- HomeKit: the dedicated framework icon referenced by `search_icon` on https://developer.apple.com/apple-home/ (the current destination of https://developer.apple.com/homekit/). Its 192 × 192 px PNG was trimmed to its transparent bounds and encoded at WebP quality 88 without enlargement; the deployed asset is 174 × 174 px with alpha transparency, 3,394 bytes.
- Skills: https://skills.debuginn.com/zh/ uses `/img/logo.png` in its deployed header, hero, and footer. The actual 1024 × 1024 px PNG has cyan, blue, and purple bars on a white rounded square with transparent corners. It was resized to 320 × 320 px and encoded at WebP quality 88 while preserving the original artwork, white face, and alpha transparency.

## Current configuration

Both site variants end with `id: social`, `type: social`, and enable the merged footer with `social.footer: { "enabled": true, "wordmark": "DEBUGINN" }`. The existing dynamic theme-version and copyright credits share one inline row above the large DEBUGINN wordmark. The wordmark supports light/dark appearance and the existing iridescent pointer effect. No separate Closing navigation item or contact entry is present.

Social retains its existing media-button CSS and interaction: circular buttons, background, shadows, hover follower counts, and WeChat QR. The original eleven links and their individual counts are unchanged, including the COM/CN-specific WeChat destinations. YouTube is appended with `icon: youtube`, the user-supplied https://www.youtube.com/@debuginn address, and six subscribers. The configured follower total is 4,748 in both variants, up from 4,742; no live subscriber lookup is implied. Theme release versions remain dynamic rather than being hardcoded in the Social configuration.

## Archived photo pool and contact assets

The former `closing.photoPool` used local, optimized derivatives from `home.backgrounds`. The archive contains nine distinct default photo tiles and a pool of unique images with their source URLs, hashes, dimensions, quality, and output sizes in `docs/closing-photo-pool.json`. Each derivative has a fixed 4:3 frame (720 × 540 px, centre cover crop) and at most 100 KiB, beginning at WebP quality 76. The existing `scripts/gen-closing-photos.mjs` is an archived preparation tool for that standalone layout; it is not part of the merged-footer build and should not be run to update the current Social page. Production build and deployment scripts do not invoke it or require gallery network access.

The former contact entry used the user's explicitly supplied `mailto:idebuginn@gmail.com`, with an email/WeChat/Telegram fan around the central logo. Those entry points are no longer mounted by Profile. The archived WeChat QR is the unmodified original 426 × 426 JPEG; the current Social QR interaction continues to use its existing configuration.
