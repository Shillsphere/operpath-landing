"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";

const ROWS = [
  { label: "Setup time", old: "3-6 months", ours: "2-8 weeks" },
  { label: "Decision making", old: "Rule-based scripts", ours: "AI reasoning" },
  { label: "Edge cases", old: "Breaks on exceptions", ours: "Handles like a human" },
  { label: "Integration", old: "Requires full IT project", ours: "API + browser, no migration" },
  { label: "Who builds it", old: "Outsourced team", ours: "The founder, directly" },
];

export function Differentiator() {
  return (
    <section>
      <div className="fade-to-light h-24 md:h-32" />
      <div className="zone-light py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#495057]">
                Why Us
              </p>
              <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-display)] text-[#1a1a2e] md:text-4xl">
                Not another RPA tool
              </h2>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl glass-dark relative">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-black/[0.05] bg-black/[0.02] px-6 py-3">
                <span className="text-xs font-medium text-[#868e96]" />
                <span className="text-center text-xs font-medium text-[#868e96]">
                  Enterprise RPA
                </span>
                <span className="text-center text-xs font-semibold text-[#1a1a2e]">
                  OperPath
                </span>
              </div>
              {/* Rows */}
              {ROWS.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 items-center px-6 py-4 ${
                    i < ROWS.length - 1 ? "border-b border-black/[0.04]" : ""
                  }`}
                >
                  <span className="text-sm font-medium text-[#495057]">
                    {row.label}
                  </span>
                  <span className="text-center text-sm text-[#868e96]">
                    {row.old}
                  </span>
                  <span className="text-center text-sm font-medium text-emerald-600">
                    {row.ours}
                  </span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
