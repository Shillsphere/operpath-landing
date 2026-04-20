#!/usr/bin/env node
/**
 * pexels.mjs — CLI wrapper around the Pexels API.
 *
 * Loads PEXELS_API_KEY from .env.local (or the environment) and provides
 * quick search + download helpers that fit the landing-page workflow:
 *
 *   Search photos (compact table output):
 *     node scripts/pexels.mjs search "industrial warehouse night"
 *     node scripts/pexels.mjs search "warehouse" --orientation landscape --per-page 12
 *
 *   Search + auto-download the top N results to public/pexels/:
 *     node scripts/pexels.mjs grab "warehouse at night" --count 3
 *     node scripts/pexels.mjs grab "warehouse" --orientation portrait --size original
 *
 *   Download one photo by its Pexels ID:
 *     node scripts/pexels.mjs get 1234567 --size large2x
 *
 *   Curated photos (editorial pick feed):
 *     node scripts/pexels.mjs curated --per-page 15
 *
 *   Videos (for potential hero loops):
 *     node scripts/pexels.mjs videos "warehouse night"
 *
 *   Pretty-print the last response for debugging:
 *     node scripts/pexels.mjs search "foo" --json
 *
 * Downloads land in `public/pexels/<id>-<slug>.<ext>` so they're
 * immediately usable as `<Image src="/pexels/123-warehouse.jpg" />`.
 * A sidecar `<basename>.credit.json` records the photographer info
 * (Pexels attribution guideline).
 *
 * Default size is `large2x` (~2560px wide) which is the sweet spot
 * for hero backgrounds at retina resolution without hitting 5MB+.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ────────────────────────────────────────────────────────────────────────────
// Config + env loading
// ────────────────────────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

async function loadDotenvLocal() {
  try {
    const raw = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // Missing .env.local is fine — env can supply the key directly
  }
}

await loadDotenvLocal();

const API_KEY = process.env.PEXELS_API_KEY;
if (!API_KEY) {
  console.error(
    "ERROR: PEXELS_API_KEY not found. Set it in .env.local or export it.",
  );
  process.exit(1);
}

const API = "https://api.pexels.com/v1";
const API_VIDEOS = "https://api.pexels.com/videos";
const DOWNLOAD_DIR = path.join(ROOT, "public", "pexels");

// ────────────────────────────────────────────────────────────────────────────
// Arg parsing — tiny flag parser so we don't need a dep
// ────────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const [, , cmd, ...rest] = argv;
  const positional = [];
  const flags = {};
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = rest[i + 1];
      if (!next || next.startsWith("--")) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i++;
      }
    } else {
      positional.push(a);
    }
  }
  return { cmd, positional, flags };
}

// ────────────────────────────────────────────────────────────────────────────
// HTTP helper
// ────────────────────────────────────────────────────────────────────────────

async function pexelsFetch(url) {
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Pexels ${res.status} ${res.statusText} for ${url}\n${body.slice(0, 400)}`,
    );
  }
  return res.json();
}

// ────────────────────────────────────────────────────────────────────────────
// Download helper — fetch + save + attribution sidecar
// ────────────────────────────────────────────────────────────────────────────

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function extFromUrl(url) {
  const u = new URL(url);
  const m = u.pathname.match(/\.(jpe?g|png|webp|gif|mp4|mov)$/i);
  return m ? `.${m[1].toLowerCase()}` : ".jpg";
}

async function downloadPhoto(photo, sizeKey = "large2x") {
  const srcUrl = photo.src?.[sizeKey] || photo.src?.large2x || photo.src?.original;
  if (!srcUrl) throw new Error(`no src[${sizeKey}] on photo ${photo.id}`);

  await fs.mkdir(DOWNLOAD_DIR, { recursive: true });

  const slug = slugify(photo.alt || photo.photographer || String(photo.id));
  const base = `${photo.id}-${slug}`;
  const ext = extFromUrl(srcUrl);
  const imgPath = path.join(DOWNLOAD_DIR, `${base}${ext}`);
  const creditPath = path.join(DOWNLOAD_DIR, `${base}.credit.json`);

  const res = await fetch(srcUrl);
  if (!res.ok) throw new Error(`download failed: ${res.status} ${res.statusText}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(imgPath, buf);

  const credit = {
    id: photo.id,
    url: photo.url,
    alt: photo.alt,
    photographer: photo.photographer,
    photographer_url: photo.photographer_url,
    size: sizeKey,
    src_url: srcUrl,
    downloaded_at: new Date().toISOString(),
  };
  await fs.writeFile(creditPath, JSON.stringify(credit, null, 2));

  return {
    imgPath,
    publicPath: `/pexels/${path.basename(imgPath)}`,
    credit,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Output formatters
// ────────────────────────────────────────────────────────────────────────────

function printPhotoRow(p) {
  const alt = (p.alt || "").slice(0, 54).padEnd(56);
  const dims = `${p.width}x${p.height}`.padEnd(11);
  const shooter = (p.photographer || "").slice(0, 22).padEnd(22);
  const avg = (p.avg_color || "").padEnd(8);
  console.log(`${String(p.id).padEnd(9)} ${dims} ${avg} ${shooter} ${alt}`);
}

function printPhotoTable(photos) {
  const header = `${"id".padEnd(9)} ${"wxh".padEnd(11)} ${"avg".padEnd(8)} ${"photographer".padEnd(22)} alt`;
  console.log(header);
  console.log("-".repeat(header.length + 40));
  for (const p of photos) printPhotoRow(p);
}

// ────────────────────────────────────────────────────────────────────────────
// Commands
// ────────────────────────────────────────────────────────────────────────────

async function cmdSearch({ positional, flags }) {
  const query = positional.join(" ");
  if (!query) throw new Error(`usage: search "query" [--orientation landscape|portrait|square] [--per-page N]`);

  const qs = new URLSearchParams({ query, per_page: String(flags["per-page"] || 10) });
  if (flags.orientation) qs.set("orientation", flags.orientation);
  if (flags.size) qs.set("size", flags.size); // large | medium | small
  if (flags.color) qs.set("color", flags.color);

  const data = await pexelsFetch(`${API}/search?${qs}`);
  if (flags.json) return console.log(JSON.stringify(data, null, 2));

  console.log(`Pexels search "${query}" — ${data.total_results} total, showing ${data.photos.length}`);
  console.log();
  printPhotoTable(data.photos);
  console.log();
  console.log(`Download: node scripts/pexels.mjs get <id> [--size large2x|original|large|medium]`);
}

async function cmdCurated({ flags }) {
  const qs = new URLSearchParams({ per_page: String(flags["per-page"] || 15) });
  if (flags.page) qs.set("page", String(flags.page));
  const data = await pexelsFetch(`${API}/curated?${qs}`);
  if (flags.json) return console.log(JSON.stringify(data, null, 2));
  console.log(`Pexels curated — showing ${data.photos.length}`);
  console.log();
  printPhotoTable(data.photos);
}

async function cmdGet({ positional, flags }) {
  const id = positional[0];
  if (!id) throw new Error(`usage: get <photoId> [--size large2x|original|large|medium|small|portrait|landscape|tiny]`);
  const photo = await pexelsFetch(`${API}/photos/${id}`);
  const size = flags.size || "large2x";
  const { publicPath, credit } = await downloadPhoto(photo, size);
  console.log(`saved: ${publicPath}`);
  console.log(`credit: "${credit.photographer}" (${credit.photographer_url})`);
}

async function cmdGrab({ positional, flags }) {
  const query = positional.join(" ");
  if (!query) throw new Error(`usage: grab "query" [--count N] [--size ...] [--orientation ...]`);
  const count = Number(flags.count || 1);
  const size = flags.size || "large2x";

  const qs = new URLSearchParams({ query, per_page: String(Math.max(count, 1)) });
  if (flags.orientation) qs.set("orientation", flags.orientation);
  const data = await pexelsFetch(`${API}/search?${qs}`);
  if (!data.photos?.length) {
    console.log(`no results for "${query}"`);
    return;
  }
  for (const photo of data.photos.slice(0, count)) {
    const { publicPath, credit } = await downloadPhoto(photo, size);
    console.log(`saved: ${publicPath} — "${credit.photographer}"`);
  }
}

async function cmdVideos({ positional, flags }) {
  const query = positional.join(" ");
  if (!query) throw new Error(`usage: videos "query" [--per-page N] [--orientation ...]`);
  const qs = new URLSearchParams({ query, per_page: String(flags["per-page"] || 10) });
  if (flags.orientation) qs.set("orientation", flags.orientation);
  const data = await pexelsFetch(`${API_VIDEOS}/search?${qs}`);
  if (flags.json) return console.log(JSON.stringify(data, null, 2));

  console.log(`Pexels videos "${query}" — ${data.total_results} total, showing ${data.videos.length}`);
  console.log();
  for (const v of data.videos) {
    const mp4 = v.video_files.find((f) => f.file_type === "video/mp4" && f.quality === "hd")
      || v.video_files.find((f) => f.file_type === "video/mp4")
      || v.video_files[0];
    console.log(
      `${String(v.id).padEnd(9)} ${String(v.duration + "s").padEnd(5)} ${String(v.width + "x" + v.height).padEnd(11)} ${v.user.name}`,
    );
    console.log(`  page: ${v.url}`);
    if (mp4) console.log(`  mp4:  ${mp4.link}  (${mp4.width}x${mp4.height} ${mp4.quality})`);
    console.log();
  }
}

async function cmdHelp() {
  console.log(`
Pexels CLI — helper for searching and downloading stock photos / video.

Commands:
  search "query" [flags]          Search photos; prints a table.
  grab   "query" [flags]          Search + download top result(s) to public/pexels.
  get    <photoId>  [--size ...]  Download a single photo by its Pexels id.
  curated            [--per-page] Pexels' curated editorial feed.
  videos "query" [flags]          Search videos (returns mp4 links).
  help                            Show this text.

Common flags:
  --orientation  landscape | portrait | square
  --size         original | large2x | large | medium | small | portrait | landscape | tiny
  --per-page     N (default 10)
  --count        N (grab only: how many to download)
  --color        hex like #ff6a22 (search only)
  --json         dump the raw JSON response

Downloads save to public/pexels/<id>-<slug>.<ext> and write a
<basename>.credit.json sidecar with photographer attribution.
`);
}

// ────────────────────────────────────────────────────────────────────────────
// Dispatch
// ────────────────────────────────────────────────────────────────────────────

const COMMANDS = {
  search: cmdSearch,
  grab: cmdGrab,
  get: cmdGet,
  curated: cmdCurated,
  videos: cmdVideos,
  help: cmdHelp,
  "--help": cmdHelp,
  "-h": cmdHelp,
};

const { cmd, positional, flags } = parseArgs(process.argv);
if (!cmd) {
  await cmdHelp();
  process.exit(0);
}
const handler = COMMANDS[cmd];
if (!handler) {
  console.error(`Unknown command: ${cmd}`);
  await cmdHelp();
  process.exit(1);
}
try {
  await handler({ positional, flags });
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
