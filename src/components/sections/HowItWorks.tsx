"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const STEPS = [
  {
    num: "01",
    title: "Shadow",
    kicker: "Week 1",
    desc: "We spend a week inside your operation, sitting next to the person who does the work today. Every exception, every workaround, every tribal rule gets documented.",
  },
  {
    num: "02",
    title: "Build",
    kicker: "Weeks 2 – 5",
    desc: "We ship a working prototype in weeks, not months. You see it run against real data from day one.",
  },
  {
    num: "03",
    title: "Deploy",
    kicker: "Weeks 6 – 8",
    desc: "Your team gets a simple interface to control the agent, review its work, and flag edge cases. People stop doing the work and start managing it.",
  },
  {
    num: "04",
    title: "Expand",
    kicker: "Ongoing",
    desc: "Once one process runs, the next is faster. We work through your automation backlog together — receiving, then returns, then expediting, then whatever's next.",
  },
];

export function HowItWorks() {
  return (
    <div className="relative mx-auto w-full max-w-[1200px]">
      <SectionReveal>
        <div className="mb-10 max-w-3xl">
          <SectionLabel number="05" align="left">
            How we work
          </SectionLabel>
          <h2
            className="mt-3 font-[family-name:var(--font-editorial)] font-normal leading-[1.05] tracking-[-0.02em] text-[color:var(--color-cream)]"
            style={{ fontSize: "clamp(1.9rem, 1.3rem + 2.2vw, 3rem)" }}
          >
            Four phases. One embedded team.
          </h2>
          <p
            className="mt-4 max-w-2xl text-[color:var(--color-cream-muted)]"
            style={{ fontSize: "1rem", lineHeight: 1.55 }}
          >
            Every distributor is different — which is why off-the-shelf fails
            here. We pair with one person who knows how the work actually runs,
            and build around the nuance that matters.
          </p>
        </div>
      </SectionReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <SectionReveal key={step.num} delay={i * 0.05}>
            <div className="lg relative flex h-full flex-col rounded-2xl p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono tabular text-[11px] text-[color:var(--color-cream-subtle)]">
                  {step.num}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-cream-muted)]">
                  {step.kicker}
                </span>
              </div>
              <h3
                className="mt-5 font-[family-name:var(--font-editorial)] font-normal leading-tight tracking-[-0.01em] text-[color:var(--color-cream)]"
                style={{ fontSize: "1.35rem" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-2.5 text-[color:var(--color-cream-muted)]"
                style={{ fontSize: "0.9rem", lineHeight: 1.5 }}
              >
                {step.desc}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}
