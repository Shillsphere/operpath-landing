"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";
import { TiltCard } from "@/components/ui/TiltCard";

const CAPS = [
  {
    title: "Shipment Receiving",
    desc: "PDF packing slip to verified ERP entry. Zero clicks required.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="16" height="14" rx="2" />
        <path d="M2 7h16" />
        <path d="M6 11h3M6 14h5" />
      </svg>
    ),
  },
  {
    title: "Purchase Orders",
    desc: "Supplier quotes parsed and POs created inside your ERP automatically.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
        <path d="M7 7h6M7 10h6M7 13h4" />
      </svg>
    ),
  },
  {
    title: "Invoice Processing",
    desc: "3-way matching, AP entry, and reconciliation on autopilot.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="2" width="14" height="16" rx="2" />
        <path d="M7 6h6M7 9.5h6M7 13h3" />
        <path d="M13 13l1 1 2-2.5" />
      </svg>
    ),
  },
  {
    title: "Order Entry",
    desc: "Customer POs converted to sales orders without human input.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v16M2 10h16" />
        <rect x="4" y="4" width="12" height="12" rx="2" />
      </svg>
    ),
  },
  {
    title: "Cross-System Sync",
    desc: "ERP to sheets, CRM to ERP, vendor portals — bidirectionally connected.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 8l4-4 4 4" />
        <path d="M8 4v12" />
        <path d="M16 12l-4 4-4-4" />
        <path d="M12 16V4" />
      </svg>
    ),
  },
  {
    title: "Data Verification",
    desc: "AI audits every entry against source documents in real-time.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7" />
        <path d="M7 10l2 2 4-4" />
      </svg>
    ),
  },
];

export function Capabilities() {
  return (
    <section id="capabilities">
      <div className="fade-to-light h-24 md:h-32" />
      <div className="zone-light py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <div className="mb-16 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#495057]">
                Capabilities
              </p>
              <h2 className="text-3xl font-bold tracking-tight font-[family-name:var(--font-display)] text-[#1a1a2e] md:text-4xl">
                What we automate
              </h2>
              <p className="mt-3 text-[#495057]">
                If your team does it in a browser or ERP, we can automate it.
              </p>
            </div>
          </SectionReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPS.map((cap, i) => (
              <SectionReveal key={cap.title} delay={i * 0.06}>
                <TiltCard className="group h-full rounded-2xl glass-dark relative p-6 transition-all duration-300">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-[#495057] transition-colors group-hover:bg-[#1a1a2e] group-hover:text-white">
                    {cap.icon}
                  </div>
                  <h4 className="mb-1.5 text-[15px] font-semibold font-[family-name:var(--font-display)] text-[#1a1a2e]">
                    {cap.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#495057]">
                    {cap.desc}
                  </p>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
      <div className="fade-to-dark h-24 md:h-32" />
    </section>
  );
}
