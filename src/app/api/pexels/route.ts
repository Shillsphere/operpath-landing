import { NextResponse } from "next/server";
import {
  searchPhotos,
  searchVideos,
  curatedPhotos,
  type PexelsOrientation,
  type PexelsSize,
} from "@/lib/pexels";

/**
 * GET /api/pexels
 *   ?q=<query>         — search photos (default)
 *   &kind=photos|videos|curated
 *   &orientation=landscape|portrait|square
 *   &size=large|medium|small
 *   &color=#ff6a22     — hex or named color (photos only)
 *   &per_page=N        — default 12, clamped 1..40
 *   &page=N            — default 1
 *
 * Keeps PEXELS_API_KEY server-side. Results are edge-cached for 1h by
 * default via the Next fetch revalidate config inside `lib/pexels`.
 */

export const runtime = "nodejs";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q")?.trim() || "";
  const kind = (url.searchParams.get("kind") || "photos").toLowerCase();
  const orientation = url.searchParams.get("orientation") as PexelsOrientation | null;
  const size = url.searchParams.get("size") as PexelsSize | null;
  const color = url.searchParams.get("color") ?? undefined;
  const perPage = clamp(
    Number(url.searchParams.get("per_page") ?? 12) || 12,
    1,
    40,
  );
  const page = clamp(Number(url.searchParams.get("page") ?? 1) || 1, 1, 500);

  try {
    if (kind === "curated") {
      const data = await curatedPhotos({ perPage, page });
      return NextResponse.json(data);
    }
    if (kind === "videos") {
      if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });
      const data = await searchVideos({
        query: q,
        perPage,
        page,
        orientation: orientation ?? undefined,
        size: size ?? undefined,
      });
      return NextResponse.json(data);
    }
    // photos (default)
    if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });
    const data = await searchPhotos({
      query: q,
      perPage,
      page,
      orientation: orientation ?? undefined,
      size: size ?? undefined,
      color,
    });
    return NextResponse.json(data);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
