"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

const PROMISES = [
  "30-minute scoping call",
  "Honest fit assessment",
  "Rough price on the call",
];

export function CTA() {
  return (
    <div className="relative mx-auto w-full max-w-[880px]">
      <SectionReveal>
        <div className="lg-raised relative overflow-hidden rounded-3xl p-10 text-center md:p-14">
          <SectionLabel number="07">Book a call</SectionLabel>

          <h2
            className="mt-5 font-[family-name:var(--font-editorial)] font-normal leading-[1.05] tracking-[-0.02em] text-[color:var(--color-cream)]"
            style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.2rem)" }}
          >
            Is OperPath a fit for your business?
          </h2>

          <p
            className="mx-auto mt-5 max-w-xl text-[color:var(--color-cream-muted)]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            If you have a manual, repetitive process eating up your team&apos;s
            time, book a 30-minute call. We&apos;ll walk through your workflow,
            tell you honestly whether we can automate it, and — if we can —
            give you a rough scope and price on the call.
          </p>

          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              href="https://calendly.com/parkernuttall9/30min"
              target="_blank"
              rel="noopener noreferrer"
              arrow
            >
              Book a call
            </Button>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12.5px] text-[color:var(--color-cream-muted)]">
            {PROMISES.map((p, i) => (
              <span key={p} className="inline-flex items-center gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-[color:var(--color-cream-dim)]"
                >
                  <path
                    d="M2.5 6l2.5 2.5L10 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {p}
                {i < PROMISES.length - 1 && (
                  <span aria-hidden className="ml-4 h-3 w-px bg-[color:var(--color-cream-subtle)] opacity-40 md:block" />
                )}
              </span>
            ))}
          </div>

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-cream-subtle)]">
            Currently scoping engagements for Q3 2026
          </p>
        </div>
      </SectionReveal>
    </div>
  );
}
