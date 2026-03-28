"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTA() {
  return (
    <section id="book" className="zone-light py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-3xl glass-dark p-10 text-center md:p-14">
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-display)] text-[#1a1a2e] md:text-4xl">
                Book a{" "}
                <span className="bg-gradient-to-r from-[#1a1a2e] to-[#868e96] bg-clip-text text-transparent">
                  personal consultation
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[#495057]">
                Describe your challenges to us — together, we&apos;ll explore
                how AI agents can transform your operations.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#495057]">
                {[
                  "Free 30-minute consultation",
                  "Live workflow assessment",
                  "No commitment required",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-emerald-500">
                      <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <MagneticButton
                  href="https://calendly.com/parkernuttall9/30min"
                  className="bg-[#1a1a2e] text-white text-base px-8 py-3.5 shadow-lg shadow-black/10 hover:shadow-black/20 hover:bg-[#2d3142]"
                >
                  Book a Call
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </MagneticButton>
              </div>
              <p className="mt-4 text-xs text-[#868e96]">
                Usually responds within 2 hours
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
