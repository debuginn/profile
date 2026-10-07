// Refresh the closing-page photo pool from the site's existing public gallery.
// Run manually after updating home.backgrounds; production builds stay offline.
// Usage: node scripts/gen-closing-photos.mjs [--refresh]

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, rename, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = ['site.json', 'site.cn.json'];
const destination = resolve(root, 'public/closing/photos');
const manifestPath = resolve(root, 'docs/closing-photo-pool.json');
const refresh = process.argv.includes('--refresh');
const targetWidth = 720;
const targetHeight = 540;
const targetQuality = 76;
const maximumBytes = 100 * 1024;
const minimumPhotos = 9;
const sourceLimit = 25 * 1024 * 1024;

if (process.argv.slice(2).some(argument => argument !== '--refresh')) {
  throw new Error('Usage: node scripts/gen-closing-photos.mjs [--refresh]');
}

const configs = await Promise.all(files.map(async file => ({
  file,
  config: JSON.parse(await readFile(resolve(root, file), 'utf8')),
})));
const sources = Array.from(new Set(configs.flatMap(({ config }) => config.home?.backgrounds ?? [])));
let priorManifest = { photos: [] };
try {
  priorManifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const prior = new Map(priorManifest.photos.map(photo => [photo.source, photo]));
const completed = new Map();
const failures = [];
let nextIndex = 0;

await mkdir(destination, { recursive: true });
await mkdir(resolve(root, 'docs'), { recursive: true });

async function prepare(source) {
  const url = new URL(source);
  if (url.protocol !== 'https:') throw new Error('Gallery sources must use HTTPS');
  const hash = createHash('sha256').update(source).digest('hex').slice(0, 16);
  const publicPath = `/closing/photos/${hash}.webp`;
  const outputPath = resolve(root, 'public', publicPath.slice(1));
  const saved = prior.get(source);

  if (!refresh && saved?.src === publicPath) {
    try {
      const [info, file] = await Promise.all([sharp(outputPath).metadata(), stat(outputPath)]);
      if (info.format === 'webp' && info.width === targetWidth && info.height === targetHeight && file.size > 0 && file.size <= maximumBytes) {
        return { ...saved, width: info.width, height: info.height, bytes: file.size };
      }
    } catch (error) {
      if (error.code !== 'ENOENT' && !/missing|not found|Input file/i.test(error.message)) throw error;
    }
  }

  const response = await fetch(source, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (Number(response.headers.get('content-length')) > sourceLimit) throw new Error('Source exceeds 25 MiB');
  const input = Buffer.from(await response.arrayBuffer());
  if (input.length > sourceLimit) throw new Error('Source exceeds 25 MiB');

  let quality = targetQuality;
  let encoded;
  do {
    encoded = await sharp(input).rotate().resize({ width: targetWidth, height: targetHeight, fit: 'cover', position: 'centre' })
      .webp({ quality, effort: 6 }).toBuffer();
    if (encoded.length <= maximumBytes) break;
    quality -= 8;
  } while (quality >= 52);
  if (encoded.length > maximumBytes) throw new Error('Optimized image exceeds 100 KiB');

  const info = await sharp(encoded).metadata();
  const temporaryPath = `${outputPath}.${process.pid}.tmp`;
  await writeFile(temporaryPath, encoded);
  await rename(temporaryPath, outputPath);
  return {
    source,
    sourceSha256: createHash('sha256').update(input).digest('hex'),
    src: publicPath,
    width: info.width,
    height: info.height,
    quality,
    bytes: encoded.length,
  };
}

async function worker() {
  while (nextIndex < sources.length) {
    const index = nextIndex++;
    const source = sources[index];
    try {
      const photo = await prepare(source);
      completed.set(source, photo);
      console.log(`[${index + 1}/${sources.length}] ${photo.src}: ${photo.bytes} bytes`);
    } catch (error) {
      failures.push({ source, error: error.message });
      console.warn(`[${index + 1}/${sources.length}] ${source}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: Math.min(4, sources.length) }, worker));
if (completed.size < minimumPhotos) {
  throw new Error(`Only ${completed.size} usable photographs; site configuration was not changed`);
}

const photos = sources.filter(source => completed.has(source)).map(source => completed.get(source));
const manifest = {
  source: 'Existing home.backgrounds in site.json and site.cn.json',
  transform: { width: targetWidth, height: targetHeight, fit: 'cover', position: 'centre', startingWebpQuality: targetQuality, maximumFileBytes: maximumBytes },
  photos,
};
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

for (const { file } of configs) {
  // Re-read before writing so unrelated edits made during downloads survive.
  const path = resolve(root, file);
  const config = JSON.parse(await readFile(path, 'utf8'));
  if (!config.closing) throw new Error(`${file} has no closing section`);
  config.closing.photoPool = (config.home?.backgrounds ?? []).filter(source => completed.has(source))
    .map(source => completed.get(source).src);
  if (config.closing.photoPool.length < minimumPhotos) throw new Error(`${file} has fewer than nine photographs`);
  await writeFile(path, `${JSON.stringify(config, null, 2)}\n`);
}

console.log(`Prepared ${photos.length} local photographs (${photos.reduce((total, photo) => total + photo.bytes, 0)} bytes).`);
if (failures.length) console.warn(`${failures.length} unavailable sources were omitted; local fallback tiles remain unchanged.`);
