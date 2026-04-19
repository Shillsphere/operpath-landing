"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Results() {
  return (
    <div className="relative mx-auto flex w-full max-w-[1080px] flex-col items-center">
      <SectionReveal>
        <div className="max-w-3xl text-center">
          <SectionLabel number="03">The insight</SectionLabel>
          <h2
            className="mt-3 font-[family-name:var(--font-editorial)] font-normal leading-[1.06] tracking-[-0.02em] text-[color:var(--color-cream)]"
            style={{ fontSize: "clamp(1.9rem, 1.3rem + 2.2vw, 3rem)" }}
          >
            The layer no one&apos;s solving.
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-[color:var(--color-cream-muted)]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            Distributors spend millions on ERPs and layer specialized tools on
            top: Canals for invoice matching, Parspec for submittals, EDI for
            the big vendors. But the day-to-day work, the exceptions, the
            tribal knowledge living in people&apos;s heads, still gets done
            manually by experienced employees who should be doing higher-value
            work.
          </p>
          <p className="mt-5 text-[color:var(--color-cream)]" style={{ fontSize: "1.05rem" }}>
            That&apos;s the layer we own.
          </p>
        </div>
      </SectionReveal>

      {/* Testimonial — centered, calm, professional */}
      <SectionReveal delay={0.14}>
        <a
          href="https://www.cxconnect.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="lg-raised group relative mt-10 block overflow-hidden rounded-2xl px-8 py-9 text-center transition-all duration-500 hover:-translate-y-0.5 md:px-12"
        >
          <blockquote
            className="mx-auto max-w-[720px] text-[color:var(--color-cream)]"
            style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.45vw, 1.35rem)", lineHeight: 1.45 }}
          >
            &ldquo;A complex, multi-step receiving workflow that no single
            software could automate because it was too specific to how our
            team operates. Parker built us a custom solution that handles the
            entire process end-to-end and integrates directly into our support
            team&apos;s daily operations.&rdquo;
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-3 border-t border-[color:var(--color-hairline)] pt-5">
            <img
              src="/kyle.png"
              alt=""
              className="h-9 w-9 rounded-full border border-[color:var(--color-hairline-bright)] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <p className="text-[14px] font-medium text-[color:var(--color-cream)]">
              Kyle Hanson
            </p>
            <span
              aria-hidden
              className="block h-4 w-px bg-[color:var(--color-cream-subtle)] opacity-60"
            />
            <span className="text-[11.5px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-cream-muted)] transition-colors group-hover:text-[color:var(--color-cream)]">
              CEO · CX Lighting
            </span>
          </div>
        </a>
      </SectionReveal>
    </div>
  );
}
