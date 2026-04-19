"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { BlueprintScene } from "@/components/ui/BlueprintScene";

/**
 * HeroChapter — editorial two-column cover, modeled directly on the
 * reference composition the user chose (aerial industrial district).
 *
 *   ┌──────────────────────────────┬─────────────────────────┐
 *   │ — Field note · 01 · on …     │                         │
 *   │                              │                         │
 *   │ Production AI for            │   aerial container-yard │
 *   │ /industrial/                 │   scene, warm ember      │
 *   │ distributors.                │   windows scattered      │
 *   │                              │   across the grid        │
 *   │ subcopy (3 lines)            │                         │
 *   │                              │                         │
 *   │ [Book a scoping call]  [▶︎]   │                         │
 *   │                              │                         │
 *   │ + + + + + +                  │                         │
 *   │                              │                         │
 *   │ 1,283 lines/wk · 99.4% …     │                         │
 *   │                              │                         │
 *   │ OPERPATH          Overture·01│                         │
 *   └──────────────────────────────┴─────────────────────────┘
 */
export function HeroChapter() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Two-column grid — scene is ~55% on md+, the full right half */}
      <div className="relative z-10 grid h-full grid-cols-1 md:grid-cols-[1fr_1.2fr]">
        {/* ── LEFT — text stack, aligned from the top ── */}
        <div className="relative flex flex-col px-6 pb-6 pt-16 md:px-14 md:pb-12 md:pt-20 lg:pt-24">
          {/* Byline — editorial eyebrow */}
          <div
            className="editorial-rise byline"
            style={{ animationDelay: "0.15s", fontSize: "13px" }}
          >
            <span className="byline-rule" />
            Field note &nbsp;·&nbsp; 01 &nbsp;·&nbsp; on building for operators
          </div>

          {/* Headline */}
          <h1
            className="editorial-materialize editorial-display halation mt-5 leading-[0.98]"
            style={{
              fontSize: "clamp(2.6rem, 1.8vw + 2.6rem, 5rem)",
              animationDelay: "0.3s",
              maxWidth: "14ch",
            }}
          >
            <span className="text-editorial-gradient">
              Production AI for <br className="hidden sm:block" />
              <em>industrial</em> <br className="hidden sm:block" />
              distributors.
            </span>
          </h1>

          {/* Subcopy */}
          <p
            className="editorial-rise mt-5 max-w-[44ch] text-[color:var(--color-cream-muted)]"
            style={{
              fontSize: "14.5px",
              lineHeight: 1.58,
              animationDelay: "0.5s",
            }}
          >
            Custom AI agents for the messy, nuance-heavy processes already
            running inside your business. Automated around the way your team
            actually works.
          </p>

          {/* CTAs */}
          <div
            className="editorial-rise mt-7 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.7s" }}
          >
            <Button variant="primary" size="lg" href="#book" arrow>
              Book a scoping call
            </Button>
            <Button variant="ghost" size="lg" href="#process">
              Watch the process
            </Button>
          </div>

          {/* Push bottom row to the bottom */}
          <div className="flex-1" />

          {/* Bottom row — brand mark LEFT, chapter mark RIGHT */}
          <div
            className="editorial-rise flex items-end justify-between"
            style={{ animationDelay: "1.1s" }}
          >
            <div className="flex items-center gap-2.5">
              <Image
                src="/favicon.png"
                alt=""
                width={96}
                height={96}
                priority
                className="h-7 w-7 object-contain"
              />
              <span
                className="text-[12.5px] font-semibold text-[color:var(--color-cream)]"
                style={{ letterSpacing: "0.22em" }}
              >
                OPERPATH
              </span>
            </div>
            <div className="chapter-mark">
              <span className="chapter-mark__name">Overture</span>
              <span className="chapter-mark__bar" />
              <span className="chapter-mark__num">01</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT — aerial industrial district scene ── */}
        <div className="relative min-h-[360px] md:min-h-0">
          <BlueprintScene />
        </div>
      </div>
    </div>
  );
}
