"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Capabilities — unified "custom automation for industrial distribution" story.
 *
 * Left: the flagship, shipped in production at CX Lighting. A weighted
 * hero card with its own stats strip and the specific exceptions we handle.
 *
 * Right: a quieter "what else we've built / can build" list — prior work
 * and shape of future engagements. Reads as one studio's practice, not a
 * catalog of four competing products.
 */

const PRIOR_WORK = [
  {
    title: "Ship-date intelligence",
    blurb:
      "Agents that log into vendor portals, pull ship-date changes, and reconcile them against the ERP — replacing the morning chase.",
  },
  {
    title: "Exception workflows",
    blurb:
      "Breakouts, RGAs, short-ships, credit-memo tracking. The cases your team handles by hand today, built to your specific process.",
  },
  {
    title: "Your manual process",
    blurb:
      "If a repetitive step eats hours every week and no SaaS has touched it, we'll scope it in 30 minutes and tell you honestly if we can automate it.",
  },
];

const RECEIVING_STATS = [
  { n: "1,283", label: "lines / week" },
  { n: "99.4%",  label: "first-pass match" },
  { n: "127ms",  label: "sheet sync" },
];

const RECEIVING_HANDLES = [
  "Vendor alias matching (Con-Tech ↔ Leviton)",
  "Quantity decomposition across slips",
  "Breakout / replacement / partial ship",
  "Google Sheets bookkeeping sync",
];

export function Capabilities() {
  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <SectionReveal>
        <div className="mb-10 max-w-3xl">
          <SectionLabel number="04" align="left">
            What we build
          </SectionLabel>
          <h2
            className="mt-3 font-[family-name:var(--font-editorial)] font-normal leading-[1.05] tracking-[-0.02em] text-[color:var(--color-cream)]"
            style={{ fontSize: "clamp(1.9rem, 1.3rem + 2.2vw, 3rem)" }}
          >
            Custom automation, built for one industry.
          </h2>
          <p
            className="mt-4 max-w-2xl text-[color:var(--color-cream-muted)]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            Every engagement is bespoke. We've shipped one system into
            production already; the rest of our practice is scoped against the
            manual work buried inside a distributor's ERP.
          </p>
        </div>
      </SectionReveal>

      <div className="grid gap-5 md:grid-cols-[1.35fr_1fr]">
        {/* Flagship — Receiving Automation, already live */}
        <SectionReveal delay={0.08}>
          <div className="lg-raised relative h-full rounded-2xl p-8 md:p-9">
            <div className="flex items-center justify-between">
              <span className="mono-label">Flagship · in production</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[color:var(--color-ember-core)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[color:var(--color-ember-core)]" />
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-ember-core)]" />
                </span>
                running daily
              </span>
            </div>

            <h3
              className="mt-5 font-[family-name:var(--font-editorial)] font-normal leading-tight tracking-[-0.01em] text-[color:var(--color-cream)]"
              style={{ fontSize: "clamp(1.5rem, 1.15rem + 1vw, 2rem)" }}
            >
              Receiving Automation.
            </h3>
            <p
              className="mt-3 max-w-lg text-[color:var(--color-cream-muted)]"
              style={{ fontSize: "0.95rem", lineHeight: 1.55 }}
            >
              Packing slips land in a watched folder, get parsed by AI, matched
              against open POs, and entered into the ERP end-to-end. Exceptions
              get routed; the tracking sheet updates itself.
            </p>

            {/* Stats strip */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[color:var(--color-hairline)] pt-5">
              {RECEIVING_STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-[family-name:var(--font-editorial)] leading-none tabular text-[color:var(--color-cream)]"
                    style={{ fontSize: "1.45rem" }}
                  >
                    {s.n}
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-cream-subtle)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Exception handling list */}
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {RECEIVING_HANDLES.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-[13px] text-[color:var(--color-cream-dim)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mt-0.5 flex-shrink-0 text-[color:var(--color-cream-muted)]"
                  >
                    <path
                      d="M3 7l3 3 5-6"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        {/* Secondary — "and we've also / we also build" */}
        <SectionReveal delay={0.14}>
          <div className="lg relative flex h-full flex-col rounded-2xl p-8 md:p-9">
            <span className="mono-label">Practice · scoped per engagement</span>

            <h3
              className="mt-5 font-[family-name:var(--font-editorial)] font-normal leading-tight tracking-[-0.01em] text-[color:var(--color-cream)]"
              style={{ fontSize: "clamp(1.25rem, 1rem + 0.6vw, 1.6rem)" }}
            >
              Adjacent builds.
            </h3>
            <p
              className="mt-2 text-[color:var(--color-cream-muted)]"
              style={{ fontSize: "0.92rem", lineHeight: 1.5 }}
            >
              Prior and active work across the same operational layer.
            </p>

            <ul className="mt-5 flex flex-1 flex-col divide-y divide-[color:var(--color-hairline-dim)]">
              {PRIOR_WORK.map((p) => (
                <li key={p.title} className="py-4 first:pt-0 last:pb-0">
                  <div className="text-[14px] font-medium text-[color:var(--color-cream)]">
                    {p.title}
                  </div>
                  <div
                    className="mt-1.5 text-[color:var(--color-cream-muted)]"
                    style={{ fontSize: "0.88rem", lineHeight: 1.5 }}
                  >
                    {p.blurb}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
