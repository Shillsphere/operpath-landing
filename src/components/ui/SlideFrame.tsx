"use client";

import { ReactNode } from "react";
import { Blueprint } from "./Blueprint";
import { ChapterKicker, SlideTag } from "./ChapterKicker";

type BlueprintVariant = "arc-right" | "arc-left" | "grid" | "radial" | "orbit";

export function SlideFrame({
  children,
  chapter,
  blueprint = "arc-right",
  tag,
  zone = "dark",
  scrollable = true,
  ambient = true,
  kickerAlign = "right",
}: {
  children: ReactNode;
  chapter: { num: string; name: string };
  blueprint?: BlueprintVariant;
  tag?: string;
  zone?: "dark" | "light";
  scrollable?: boolean;
  ambient?: boolean;
  kickerAlign?: "left" | "right";
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden film-grain ${
        zone === "light" ? "zone-light" : "zone-dark"
      }`}
    >
      {/* Ambient backdrop */}
      {ambient && zone === "dark" && (
        <>
          <div aria-hidden className="absolute inset-0 dot-field opacity-40" />
          <div
            aria-hidden
            className="vol-light pointer-events-none absolute left-[58%] top-[22%] h-[720px] w-[960px] -translate-x-1/2 opacity-35"
          />
          <div aria-hidden className="aurora opacity-60" />
        </>
      )}
      {ambient && zone === "light" && (
        <>
          <div aria-hidden className="absolute inset-0 dot-field opacity-60" />
          <div
            aria-hidden
            className="vol-light pointer-events-none absolute left-1/2 top-[10%] h-[400px] w-[720px] -translate-x-1/2 opacity-30"
          />
        </>
      )}

      {/* Blueprint overlay */}
      <Blueprint variant={blueprint} />

      {/* Corner crosshair marks */}
      <div className="corner-marks" aria-hidden>
        <span />
      </div>

      {/* Content — centered, constrained */}
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center px-6 md:px-14 py-24 md:py-28 ${
          scrollable ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        <div className="w-full max-w-6xl">{children}</div>
      </div>

      {/* Chrome */}
      {tag && <SlideTag>{tag}</SlideTag>}
      <ChapterKicker num={chapter.num} name={chapter.name} align={kickerAlign} />
    </div>
  );
}
