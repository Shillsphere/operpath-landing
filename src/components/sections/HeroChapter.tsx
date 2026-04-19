"use client";

import { Button } from "@/components/ui/Button";
import { OperPathGlyph } from "@/components/ui/Glyph";

/**
 * Chapter 01 — executive hero.
 *
 * Small wordmark at top, serif display headline (used here as the only
 * editorial flourish), tight sans subtitle, two CTAs, a single live-status
 * pill. Plain, professional, confident.
 */
export function HeroChapter() {
  return (
    <div className="relative mx-auto flex w-full max-w-[1080px] flex-col items-center text-center">
      {/* Small corner-style wordmark — no glass pill, no flourish */}
      <div className="editorial-rise flex items-center gap-2.5">
        <OperPathGlyph size={22} className="text-[color:var(--color-cream)]" />
        <span className="text-[15px] font-medium tracking-[-0.005em] text-[color:var(--color-cream)]">
          OperPath
        </span>
      </div>

      {/* Status pill — understated, proves we're real + running */}
      <div
        className="editorial-rise mt-9 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-hairline-bright)] bg-[color:var(--color-cream)]/[0.04] px-3 py-1 text-[11.5px] font-medium tracking-[0.02em] text-[color:var(--color-cream-muted)] backdrop-blur-md"
        style={{ animationDelay: "0.15s" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-ember-core)]" />
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-ember-core)]" />
        </span>
        Live in production at CX Lighting
      </div>

      {/* Headline — reference-style editorial serif with ivory→ember gradient.
          Fraunces variable axes (opsz 144 / SOFT 100) carry the Canela-like
          high-contrast feel; italicized tail echoes the reference's "noise". */}
      <h1
        className="editorial-rise editorial-display text-editorial-gradient mt-7 leading-[1.02]"
        style={{
          fontSize: "clamp(2.5rem, 1.6rem + 4.2vw, 5rem)",
          animationDelay: "0.3s",
        }}
      >
        Production AI for <br className="hidden sm:block" />
        <em>industrial</em> distributors.
      </h1>

      {/* Subtitle — plain sans, executive summary, no italic gimmick */}
      <p
        className="editorial-rise mt-6 max-w-[620px] text-[color:var(--color-cream-muted)]"
        style={{
          fontSize: "clamp(1rem, 0.95rem + 0.3vw, 1.15rem)",
          lineHeight: 1.55,
          animationDelay: "0.5s",
        }}
      >
        We build custom AI agents for the messy, nuance-heavy processes
        already running inside your business. Receiving, exceptions, vendor
        follow-ups — automated around the way your team actually works.
      </p>

      <div
        className="editorial-rise mt-10 flex flex-wrap items-center justify-center gap-3"
        style={{ animationDelay: "0.7s" }}
      >
        <Button variant="primary" size="lg" href="#book" arrow>
          Book a scoping call
        </Button>
        <Button variant="ghost" size="lg" href="#process">
          Watch a live workflow
        </Button>
      </div>

      {/* Supporting trust row — quiet, not shouty */}
      <div
        className="editorial-rise mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12.5px] text-[color:var(--color-cream-subtle)]"
        style={{ animationDelay: "0.9s" }}
      >
        <span className="tabular">
          <span className="text-[color:var(--color-cream-muted)]">1,283</span>{" "}
          lines processed / wk
        </span>
        <span aria-hidden className="h-3 w-px bg-[color:var(--color-cream-subtle)] opacity-40" />
        <span className="tabular">
          <span className="text-[color:var(--color-cream-muted)]">99.4%</span>{" "}
          first-pass match
        </span>
        <span aria-hidden className="h-3 w-px bg-[color:var(--color-cream-subtle)] opacity-40" />
        <span className="tabular">
          <span className="text-[color:var(--color-cream-muted)]">2 wks</span>{" "}
          to first prototype
        </span>
      </div>
    </div>
  );
}
