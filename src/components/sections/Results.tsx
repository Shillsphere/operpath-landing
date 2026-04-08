"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";

export function Results() {
  return (
    <section id="results" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionReveal>
          <div className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]">
              Proof
            </p>
            <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-display)] md:text-4xl">
              Production results
            </h2>
            <p className="mt-3 text-[var(--color-text-secondary)]">
              Live automation running daily for a major Midwest electrical
              distributor.
            </p>
          </div>
        </SectionReveal>

        {/* Quote */}
        <SectionReveal delay={0.2}>
          <a href="https://www.cxconnect.com/" target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden rounded-2xl glass-panel p-8 md:p-10 transition-all duration-300 hover:scale-[1.01] cursor-pointer">
            <div className="pointer-events-none absolute -top-6 left-4 font-[family-name:var(--font-display)] text-[120px] leading-none text-white/[0.04]">
              &ldquo;
            </div>
            <blockquote className="relative text-lg leading-relaxed text-[var(--color-text-secondary)] italic md:text-xl">
              We had a complex, multi-step receiving workflow that no single
              software could automate because it was too specific to how our team
              operates. Parker built us a custom solution that handles the entire
              process end-to-end and integrates directly into our support
              team&apos;s daily operations.
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              {/* Kyle headshot — falls back to initials if image missing */}
              <img
                src="/kyle.png"
                alt="Kyle Hanson"
                className="h-12 w-12 rounded-full object-cover border border-white/[0.1]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold font-[family-name:var(--font-display)]">
                  Kyle Hanson
                </p>
                <p className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                  CEO / President,{" "}
                  <img
                    src="/cx-logo.png"
                    alt="CX Lighting"
                    className="inline-block h-4 w-auto"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </p>
              </div>
            </div>
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
