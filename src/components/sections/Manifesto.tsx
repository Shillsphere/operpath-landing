"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * Chapter 02 — editorial headline moment.
 * Mirrors the "Read the research. Skip the noise." layout but for OperPath.
 */
export function Manifesto() {
  return (
    <div className="relative grid h-full w-full grid-cols-1 items-center gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
      {/* LEFT — oversized headline */}
      <div>
        <div
          className="mono-label mb-8 flex items-center gap-2.5 editorial-rise"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-1 w-1 rounded-full bg-[color:var(--color-ember)]" />
          the manifesto
        </div>

        <h1
          className="editorial-rise font-[family-name:var(--font-display)] font-medium leading-[1.02] tracking-[-0.02em] text-[color:var(--color-cream)]"
          style={{
            fontSize: "clamp(2.75rem, 2rem + 4.5vw, 5.5rem)",
            fontFeatureSettings: '"ss01"',
            animationDelay: "0.3s",
          }}
        >
          <span className="block">Production AI for</span>
          <span className="block">
            <span
              className="font-[family-name:var(--font-editorial)] italic"
              style={{ color: "oklch(76% 0.21 40)", letterSpacing: "-0.01em" }}
            >
              industrial
            </span>{" "}
            distributors.
          </span>
        </h1>

        <div
          className="editorial-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.7s" }}
        >
          <Button variant="primary" size="lg" href="#book" arrow>
            See if we&apos;re a fit
          </Button>
          <Button variant="ghost" size="lg" href="#process">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 5l3 2-3 2V5z" fill="currentColor" />
            </svg>
            Watch the process
          </Button>
        </div>
      </div>

      {/* RIGHT — body copy nested in a large mint arc */}
      <div className="relative flex min-h-[380px] items-start md:min-h-[560px]">
        <svg
          aria-hidden
          viewBox="0 0 620 620"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <motion.path
            d="M 620 0 A 620 620 0 0 0 0 620"
            className="blueprint-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            d="M 620 0 A 520 520 0 0 0 100 520"
            className="blueprint-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.28 }}
            transition={{ duration: 2, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />
          {[
            [200, 420],
            [340, 420],
            [480, 420],
            [200, 540],
            [340, 540],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              className="blueprint-node"
            />
          ))}
          {[420, 540].map((y) => (
            <line
              key={y}
              x1="40"
              y1={y}
              x2="600"
              y2={y}
              className="blueprint-stroke"
              opacity="0.22"
            />
          ))}
        </svg>

        <div
          className="editorial-rise relative ml-auto max-w-[360px] pt-10 md:pt-16 md:pr-4 lg:pr-10"
          style={{ animationDelay: "0.9s" }}
        >
          <p
            className="font-[family-name:var(--font-display)] leading-[1.5] text-[color:var(--color-cream-dim)]"
            style={{ fontSize: "clamp(1rem, 0.88rem + 0.4vw, 1.15rem)" }}
          >
            For operators running industrial distribution, OperPath is the
            team that builds the custom agents no off-the-shelf tool will
            touch — the receiving, the exceptions, the tribal knowledge —
            so your people stop doing manual work and start{" "}
            <span
              className="font-[family-name:var(--font-editorial)] italic"
              style={{ color: "oklch(76% 0.21 40)" }}
            >
              directing
            </span>{" "}
            it.
          </p>
        </div>
      </div>
    </div>
  );
}
