"use client";

import Image from "next/image";
import { ReactNode } from "react";

/** Brand mark — small, bottom-left. Real favicon + wordmark. */
export function BrandMark() {
  return (
    <div className="pointer-events-none absolute bottom-7 left-8 z-30 flex items-center gap-2.5 md:bottom-9 md:left-12">
      <Image
        src="/favicon.png"
        alt=""
        width={80}
        height={80}
        className="h-6 w-6 object-contain"
      />
      <span
        className="text-[11px] font-semibold text-[color:var(--color-cream)]"
        style={{ letterSpacing: "0.18em" }}
      >
        OPERPATH
      </span>
    </div>
  );
}

/**
 * Chapter kicker — clean numeric pair at bottom-right. Sans, small caps,
 * no italic flourish. Matches the modern-corporate tone.
 */
export function ChapterKicker({
  num,
  name,
}: {
  num: string;
  name: string;
}) {
  return (
    <div
      className="pointer-events-none absolute bottom-8 right-10 z-30 flex items-center gap-3 md:bottom-10 md:right-14"
      data-name={name}
    >
      <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-cream-muted)]">
        {name}
      </span>
      <span
        aria-hidden
        className="block h-[14px] w-px bg-[color:var(--color-cream-subtle)] opacity-60"
      />
      <span className="text-[12px] font-mono tabular text-[color:var(--color-cream)]">
        {num}
      </span>
    </div>
  );
}

/** Slide shell — chrome + content area. No tag, no progress bar. */
export function SlideShell({
  chapter,
  children,
  contentClassName = "",
  showBrand = true,
  showKicker = true,
}: {
  chapter: { num: string; name: string };
  children: ReactNode;
  contentClassName?: string;
  showBrand?: boolean;
  showKicker?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center px-6 py-16 md:px-14 md:py-20 ${contentClassName}`}
      >
        {children}
      </div>
      {showBrand && <BrandMark />}
      {showKicker && <ChapterKicker num={chapter.num} name={chapter.name} />}
    </div>
  );
}

/**
 * Minimal decorative overlay — a single faint hairline grid baseline.
 * Variants are accepted for API compatibility but render the same clean mark.
 */
export function BlueprintLight(_props: {
  variant?: "arc-right" | "arc-left" | "minimal" | "circles-right";
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* Single horizontal hairline — baseline grid, almost invisible */}
      <line
        x1="0"
        y1="840"
        x2="1600"
        y2="840"
        stroke="var(--color-cream)"
        strokeWidth="1"
        opacity="0.04"
      />
      <line
        x1="0"
        y1="160"
        x2="1600"
        y2="160"
        stroke="var(--color-cream)"
        strokeWidth="1"
        opacity="0.04"
      />
    </svg>
  );
}
