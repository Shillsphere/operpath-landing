"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { TiltCard } from "@/components/ui/TiltCard";

const STEPS = [
  {
    num: "01",
    title: "Document Intake",
    desc: "Packing slips, invoices, and POs arrive as PDFs or emails. Our AI reads them using computer vision — every line item, quantity, and vendor extracted instantly.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <path d="M8 13h4M8 16h6" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "AI Verification",
    desc: "Cross-references every line against your ERP. Vendor aliases, truncated descriptions, partial shipments — edge cases handled like a trained employee.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "System Integration",
    desc: "Connects via native API when available, and controls the browser to fill the gaps. Data enters your ERP through the same paths your team uses.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M7 12h4v4H7z" />
        <path d="M14 10h4M14 14h3" />
        <circle cx="18" cy="7" r="1.5" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Complete",
    desc: "Tracking sheets updated. Status synced. Your team sees the work done — zero touchpoints, zero errors. The agent handles the next document.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 12l4 4 6-8" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
              The Process
            </p>
            <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-display)] md:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              From document to data entry in seconds. No human touchpoints.
            </p>
          </div>
        </SectionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <SectionReveal key={step.num} delay={i * 0.08}>
              <TiltCard className="group h-full rounded-2xl glass-panel relative p-6 transition-all duration-300">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-[var(--color-border)] font-[family-name:var(--font-display)] transition-colors group-hover:text-[var(--color-accent)]/15">
                    {step.num}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold font-[family-name:var(--font-display)]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {step.desc}
                </p>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
