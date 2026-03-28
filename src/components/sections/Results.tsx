"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

const STATS = [
  { value: 10, suffix: "+", label: "Hours saved daily" },
  { value: 98, suffix: "%", label: "Verification accuracy" },
  { value: 0, suffix: "", label: "Manual touchpoints" },
  { value: 24, suffix: "/7", label: "Uptime capability" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (target === 0) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Results() {
  return (
    <section id="results" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
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

        {/* Stats Grid */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.08}>
              <div className="relative overflow-hidden rounded-2xl glass-panel p-6 text-center">
                {/* Subtle top glow */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/20 to-transparent" />
                <div className="text-4xl font-bold tracking-tight font-[family-name:var(--font-display)] text-[var(--color-text)] md:text-5xl">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                  {stat.label}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

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
