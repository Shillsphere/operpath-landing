"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ROWS = [
  { label: "Edge cases", old: "Whatever's on the roadmap", ours: "All of them" },
  { label: "Time to live", old: "Quarters", ours: "Weeks" },
  { label: "Who you talk to", old: "A sales rep, then a ticket queue", ours: "The team that built it" },
  { label: "When your process changes", old: "File a feature request", ours: "We ship an update" },
  { label: "Pricing", old: "Per seat, forever", ours: "Flat build fee, monthly support" },
];

export function Differentiator() {
  return (
    <div className="relative mx-auto w-full max-w-[1080px]">
      <SectionReveal>
        <div className="mb-10 max-w-3xl">
          <SectionLabel number="06" align="left">
            Why us
          </SectionLabel>
          <h2
            className="mt-3 font-[family-name:var(--font-editorial)] font-normal leading-[1.05] tracking-[-0.02em] text-[color:var(--color-cream)]"
            style={{ fontSize: "clamp(1.9rem, 1.3rem + 2.2vw, 3rem)" }}
          >
            Built for your business, not the average one.
          </h2>
          <p
            className="mt-4 max-w-2xl text-[color:var(--color-cream-muted)]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            The big SaaS tools are built for everyone — which means they fit
            no one. We build around how your team actually operates.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="lg-raised overflow-hidden rounded-2xl">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] items-center border-b border-[color:var(--color-hairline)] px-6 py-4">
            <span />
            <span className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-cream-muted)]">
              Off-the-shelf SaaS
            </span>
            <span className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-cream)]">
              OperPath
            </span>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.1fr_1fr_1fr] items-center gap-4 px-6 py-4 transition-colors hover:bg-[color:var(--color-cream)]/[0.02] ${
                i < ROWS.length - 1 ? "border-b border-[color:var(--color-hairline-dim)]" : ""
              }`}
            >
              <span className="text-[14px] font-medium text-[color:var(--color-cream)]">
                {row.label}
              </span>
              <span className="text-center text-[13.5px] text-[color:var(--color-cream-muted)] line-through decoration-[color:var(--color-cream-subtle)]/40">
                {row.old}
              </span>
              <span className="text-center text-[13.5px] text-[color:var(--color-cream)]">
                {row.ours}
              </span>
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}
