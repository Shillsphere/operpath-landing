/**
 * Pexels — typed server-side client.
 *
 * Reads PEXELS_API_KEY from the server environment (Next auto-loads
 * `.env.local`). Never import this module from client components:
 * the key must not ship to the browser.
 *
 * For client-side use, go through the API route at
 * `src/app/api/pexels/route.ts` which proxies search requests.
 */

const API = "https://api.pexels.com/v1";
const API_VIDEOS = "https://api.pexels.com/videos";

// ────────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────────

export type PexelsOrientation = "landscape" | "portrait" | "square";
export type PexelsSize = "large" | "medium" | "small";

export type PexelsPhotoSrc = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSrc;
  alt: string;
};

export type PexelsSearchResponse = {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page?: string;
  prev_page?: string;
};

export type PexelsVideoFile = {
  id: number;
  quality: "hd" | "sd" | "hls" | string;
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
};

export type PexelsVideo = {
  id: number;
  width: number;
  height: number;
  duration: number;
  url: string;
  image: string;
  avg_color: string | null;
  user: { id: number; name: string; url: string };
  video_files: PexelsVideoFile[];
};

export type PexelsVideoSearchResponse = {
  total_results: number;
  page: number;
  per_page: number;
  videos: PexelsVideo[];
  next_page?: string;
  prev_page?: string;
};

// ────────────────────────────────────────────────────────────────────────────
// Core fetch
// ────────────────────────────────────────────────────────────────────────────

function getKey(): string {
  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    throw new Error(
      "PEXELS_API_KEY is not set. Add it to landing-page-next/.env.local.",
    );
  }
  return key;
}

async function pexelsGet<T>(
  url: string,
  init?: { revalidate?: number },
): Promise<T> {
  const res = await fetch(url, {
    headers: { Authorization: getKey() },
    // Cache on the Next server by default for 1 hour — override per-call.
    next: { revalidate: init?.revalidate ?? 3600 },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Pexels ${res.status} ${res.statusText}: ${body.slice(0, 200)}`,
    );
  }
  return (await res.json()) as T;
}

// ────────────────────────────────────────────────────────────────────────────
// Public API
// ────────────────────────────────────────────────────────────────────────────

export type SearchPhotosOptions = {
  query: string;
  perPage?: number;
  page?: number;
  orientation?: PexelsOrientation;
  size?: PexelsSize;
  /** Hex (e.g. "#ff6a22") or one of red/orange/yellow/green/turquoise/blue/violet/pink/brown/black/gray/white */
  color?: string;
  /** Cache revalidation window in seconds; default 1 hour. */
  revalidate?: number;
};

export async function searchPhotos(
  opts: SearchPhotosOptions,
): Promise<PexelsSearchResponse> {
  const qs = new URLSearchParams({
    query: opts.query,
    per_page: String(opts.perPage ?? 10),
  });
  if (opts.page) qs.set("page", String(opts.page));
  if (opts.orientation) qs.set("orientation", opts.orientation);
  if (opts.size) qs.set("size", opts.size);
  if (opts.color) qs.set("color", opts.color);
  return pexelsGet<PexelsSearchResponse>(`${API}/search?${qs}`, {
    revalidate: opts.revalidate,
  });
}

export async function getPhoto(
  id: number | string,
  opts?: { revalidate?: number },
): Promise<PexelsPhoto> {
  return pexelsGet<PexelsPhoto>(`${API}/photos/${id}`, opts);
}

export type CuratedOptions = {
  perPage?: number;
  page?: number;
  revalidate?: number;
};

export async function curatedPhotos(
  opts: CuratedOptions = {},
): Promise<PexelsSearchResponse> {
  const qs = new URLSearchParams({ per_page: String(opts.perPage ?? 15) });
  if (opts.page) qs.set("page", String(opts.page));
  return pexelsGet<PexelsSearchResponse>(`${API}/curated?${qs}`, {
    revalidate: opts.revalidate,
  });
}

export type SearchVideosOptions = {
  query: string;
  perPage?: number;
  page?: number;
  orientation?: PexelsOrientation;
  size?: PexelsSize;
  revalidate?: number;
};

export async function searchVideos(
  opts: SearchVideosOptions,
): Promise<PexelsVideoSearchResponse> {
  const qs = new URLSearchParams({
    query: opts.query,
    per_page: String(opts.perPage ?? 10),
  });
  if (opts.page) qs.set("page", String(opts.page));
  if (opts.orientation) qs.set("orientation", opts.orientation);
  if (opts.size) qs.set("size", opts.size);
  return pexelsGet<PexelsVideoSearchResponse>(
    `${API_VIDEOS}/search?${qs}`,
    { revalidate: opts.revalidate },
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Attribution helpers (Pexels guideline)
// ────────────────────────────────────────────────────────────────────────────

export function attributionLine(p: PexelsPhoto | PexelsVideo): string {
  if ("photographer" in p) {
    return `Photo by ${p.photographer} on Pexels`;
  }
  return `Video by ${p.user.name} on Pexels`;
}

export function attributionHref(p: PexelsPhoto | PexelsVideo): string {
  if ("photographer_url" in p) return p.photographer_url;
  return p.user.url;
}
