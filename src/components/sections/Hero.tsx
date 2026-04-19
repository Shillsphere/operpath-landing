"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { SectionLabel } from "@/components/ui/SectionLabel";

/* ─── Mock data ─── */
const ERP_ROWS = [
  { id: 1, desc: "4FT LED PANEL 40W 4000K", cat: "2BLT4-40L-ADP", qty: 10, ordered: 10 },
  { id: 2, desc: "6IN LED DOWNLIGHT 15W", cat: "LDN6-30L-120", qty: 24, ordered: 24 },
  { id: 3, desc: "EXIT SIGN LED RED/GRN", cat: "LQMSW3R-EL-N", qty: 6, ordered: 6 },
  { id: 4, desc: "OCCUPANCY SENSOR WALL MT", cat: "OSW12-I0W", qty: 8, ordered: 8 },
];

const SLIP_LINES = [
  { item: "LED PANEL 4FT 40W 4000K", cat: "2BLT4-40L-ADP", qty: 10 },
  { item: "LED DOWNLIGHT 6IN 15W", cat: "LDN6-30L-120", qty: 24 },
  { item: "EXIT SIGN LED RED/GRN", cat: "LQMSW3R-EL-N", qty: 6 },
  { item: "OCCUPANCY SENSOR WALL", cat: "OSW12-I0W", qty: 8 },
];

const SHEET_ROWS = [
  { po: "PO-48291", so: "SO-127834", desc: "LED Panel 4FT", qty: 10, status: "Pending" },
  { po: "PO-48291", so: "SO-127834", desc: "Downlight 6IN", qty: 24, status: "Pending" },
  { po: "PO-48291", so: "SO-127834", desc: "Exit Sign LED", qty: 6, status: "Pending" },
  { po: "PO-48291", so: "SO-127834", desc: "Occupancy Sensor", qty: 8, status: "Pending" },
];

const SIGNAL_ITEMS = [
  <span key="a" className="font-mono text-[11px] tracking-wider text-white/40">
    <span className="text-[var(--color-accent)]">▲</span>&nbsp;slip <span className="tabular text-white/70">2,847</span> parsed
  </span>,
  <span key="b" className="font-mono text-[11px] tracking-wider text-white/40">
    PO-<span className="tabular text-white/70">48291</span> matched <span className="text-[var(--color-accent)]">99.4%</span>
  </span>,
  <span key="c" className="font-mono text-[11px] tracking-wider text-white/40">
    sheet sync <span className="tabular text-white/70">127ms</span>
  </span>,
  <span key="d" className="font-mono text-[11px] tracking-wider text-white/40">
    exception queue <span className="tabular text-white/70">0</span>
  </span>,
  <span key="e" className="font-mono text-[11px] tracking-wider text-white/40">
    vendor LEVITON · <span className="text-white/70">alias-verified</span>
  </span>,
  <span key="f" className="font-mono text-[11px] tracking-wider text-white/40">
    <span className="text-[var(--color-accent)]">●</span>&nbsp;agent online <span className="tabular text-white/70">03:42:17</span>
  </span>,
  <span key="g" className="font-mono text-[11px] tracking-wider text-white/40">
    uptime <span className="tabular text-white/70">99.97%</span>
  </span>,
  <span key="h" className="font-mono text-[11px] tracking-wider text-white/40">
    lines this week <span className="tabular text-white/70">1,283</span>
  </span>,
  <span key="i" className="font-mono text-[11px] tracking-wider text-white/40">
    reasoning · <span className="text-[var(--color-accent)]">live</span>
  </span>,
  <span key="j" className="font-mono text-[11px] tracking-wider text-white/40">
    breakout surgical · <span className="text-white/70">safe</span>
  </span>,
];

type RowState = "pending" | "scanning" | "verifying" | "filling" | "done";
type Phase = "slip" | "erp" | "sheets";

/* ═══════════════════════════════════════════════════════════════════
   Intro — Chapter 01. Editorial headline, minimal chrome.
   ═══════════════════════════════════════════════════════════════════ */
export function Intro() {
  return (
    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.1fr_1fr]">
      {/* LEFT — headline */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg-chip inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)]" />
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          <SectionLabel number="001" className="text-[var(--zone-fg-secondary)]">
            operating-layer automation
          </SectionLabel>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-balance font-[family-name:var(--font-display)] font-medium leading-[0.98] tracking-[-0.035em] text-[var(--color-cream)]"
          style={{ fontSize: "clamp(3rem, 2rem + 4.5vw, 5.25rem)" }}
        >
          <span className="block">Production AI for</span>
          <span className="block">
            industrial{" "}
            <span
              className="font-[family-name:var(--font-editorial)] italic text-[var(--color-ember)]"
              style={{ fontFeatureSettings: '"ss01"', letterSpacing: "-0.02em" }}
            >
              distributors.
            </span>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button variant="primary" size="lg" href="#book" arrow>
            See if we&apos;re a fit
          </Button>
          <Button variant="ghost" size="lg" href="#process">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M6 5l3 2-3 2V5z" fill="currentColor" />
            </svg>
            Watch the process
          </Button>
        </motion.div>
      </div>

      {/* RIGHT — body copy inside arc, editorial */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative md:pl-10"
      >
        <div className="relative">
          <p
            className="max-w-md leading-[1.55] text-[var(--zone-fg-secondary)]"
            style={{ fontSize: "var(--step-1)" }}
          >
            OperPath builds custom agents for the messy, nuance-heavy processes
            living inside your business — the ones no off-the-shelf tool will
            ever quite fit.
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--zone-fg-muted)]">
            <span className="block h-px w-10 bg-[var(--color-accent)]" />
            built inside a working distributor
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Process — Chapter 03. Cinematic stage with blueprint + ember glow.
   ═══════════════════════════════════════════════════════════════════ */
export function Process() {
  return (
    <div className="relative w-full">
      {/* Warm ember glow puddle anchoring the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 h-[520px] w-[1100px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(72% 0.035 230 / 0.18) 0%, oklch(72% 0.035 230 / 0.06) 35%, transparent 70%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProcessFlow />
      </motion.div>

      {/* Live signal marquee */}
      <div className="relative mt-8 rounded-full border border-[color:var(--color-hairline)] bg-[color:var(--color-sky-deep)]/70 backdrop-blur-md">
        <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 bg-transparent pr-3 font-[family-name:var(--font-editorial)] italic text-[11px] uppercase tracking-[0.28em] text-[color:var(--color-ember-core)]">
          · live ·
        </div>
        <div className="py-2 pl-24 pr-6 overflow-hidden rounded-full">
          <Marquee items={SIGNAL_ITEMS} duration={60} />
        </div>
      </div>
    </div>
  );
}

/* Legacy combined Hero (back-compat — not used by new SlidePager) */
export function Hero() {
  return (
    <>
      <div className="zone-light py-24">
        <Intro />
      </div>
      <div className="fade-to-dark h-24" />
      <div className="zone-dark py-24">
        <Process />
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Process Flow — cinematic multi-stage liquid-glass pipeline
   ═══════════════════════════════════════════════════════════════════ */

function ProcessFlow() {
  const [phase, setPhase] = useState<Phase>("slip");
  const [slipScanLine, setSlipScanLine] = useState(0);
  const [slipScanning, setSlipScanning] = useState(false);
  const [slipExtracted, setSlipExtracted] = useState<boolean[]>(SLIP_LINES.map(() => false));
  const [rowStates, setRowStates] = useState<RowState[]>(ERP_ROWS.map(() => "pending"));
  const [activeRow, setActiveRow] = useState(-1);
  const [typedQty, setTypedQty] = useState<string[]>(ERP_ROWS.map(() => ""));
  const [showCard, setShowCard] = useState(false);
  const [cardData, setCardData] = useState({ qty: 0, confidence: "0" });
  const [sheetUpdated, setSheetUpdated] = useState<boolean[]>(SHEET_ROWS.map(() => false));
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = useCallback(() => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  }, []);
  const sched = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeouts.current.push(id);
    return id;
  }, []);
  const typeQty = useCallback(
    (idx: number, val: string, onDone: () => void) => {
      let i = 0;
      const tick = () => {
        if (i <= val.length) {
          setTypedQty((p) => {
            const n = [...p];
            n[idx] = val.slice(0, i);
            return n;
          });
          i++;
          sched(tick, 72);
        } else onDone();
      };
      tick();
    },
    [sched]
  );

  const run = useCallback(() => {
    clear();
    setPhase("slip");
    setSlipScanning(false);
    setSlipScanLine(0);
    setSlipExtracted(SLIP_LINES.map(() => false));
    setRowStates(ERP_ROWS.map(() => "pending"));
    setActiveRow(-1);
    setTypedQty(ERP_ROWS.map(() => ""));
    setShowCard(false);
    setSheetUpdated(SHEET_ROWS.map(() => false));

    sched(() => {
      setSlipScanning(true);
      setSlipScanLine(0);
      let f = 0;
      const anim = () => {
        f++;
        setSlipScanLine((f / 50) * 100);
        if (f < 50) sched(anim, 30);
        else setSlipScanning(false);
      };
      anim();
    }, 600);

    SLIP_LINES.forEach((_, i) => {
      sched(() => {
        setSlipExtracted((p) => {
          const n = [...p];
          n[i] = true;
          return n;
        });
      }, 2200 + i * 400);
    });

    const erpStart = 4200;
    sched(() => setPhase("erp"), erpStart);

    ERP_ROWS.forEach((row, i) => {
      const base = erpStart + 400 + i * 2100;
      sched(() => {
        setActiveRow(i);
        setRowStates((p) => {
          const n = [...p];
          n[i] = "scanning";
          return n;
        });
      }, base);
      sched(() => {
        setRowStates((p) => {
          const n = [...p];
          n[i] = "verifying";
          return n;
        });
        setShowCard(true);
        setCardData({ qty: row.qty, confidence: (95 + Math.random() * 4.9).toFixed(1) });
      }, base + 380);
      sched(() => {
        setRowStates((p) => {
          const n = [...p];
          n[i] = "filling";
          return n;
        });
        typeQty(i, String(row.qty), () =>
          setRowStates((p) => {
            const n = [...p];
            n[i] = "done";
            return n;
          })
        );
      }, base + 1100);
      sched(() => {
        if (i === ERP_ROWS.length - 1) {
          setShowCard(false);
          setActiveRow(-1);
        }
      }, base + 1900);
    });

    const sheetStart = erpStart + 400 + ERP_ROWS.length * 2100 + 700;
    sched(() => setPhase("sheets"), sheetStart);
    SHEET_ROWS.forEach((_, i) => {
      sched(() => {
        setSheetUpdated((p) => {
          const n = [...p];
          n[i] = true;
          return n;
        });
      }, sheetStart + 400 + i * 500);
    });

    sched(run, sheetStart + 400 + SHEET_ROWS.length * 500 + 3000);
  }, [clear, sched, typeQty]);

  useEffect(() => {
    const id = setTimeout(run, 600);
    return () => {
      clearTimeout(id);
      clear();
    };
  }, [run, clear]);

  return (
    <div className="relative mx-auto" style={{ perspective: "2400px" }}>
      {/* Connecting flow lines (SVG) */}
      <FlowLines phase={phase} />

      {/* Main 3-stage flow */}
      <div
        className="relative flex items-center justify-center gap-6 lg:gap-10"
        style={{
          transform: "rotateX(5deg) rotateY(-3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Stage 1 — Slip */}
        <motion.div
          className="hidden md:block w-[280px] flex-shrink-0"
          style={{
            transform: "translateZ(-40px) translateY(18px) rotateY(7deg)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: phase === "slip" ? 1.02 : 0.96,
            opacity: phase === "slip" ? 1 : 0.5,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Floaty delay={0}>
            <GlassScreen
              label="packing_slip.pdf"
              badge={phase === "slip" ? "Scanning" : "Parsed"}
              active={phase === "slip"}
              stageIndex="01"
              stageName="ingest"
            >
              <div className="relative p-3.5">
                {slipScanning && (
                  <div
                    className="pointer-events-none absolute left-0 right-0 z-10 h-[2px]"
                    style={{
                      top: `${Math.min(slipScanLine, 100)}%`,
                      background:
                        "linear-gradient(90deg, transparent, oklch(88% 0.045 230 / 0.85), transparent)",
                      boxShadow: "0 0 28px 4px oklch(88% 0.045 230 / 0.5)",
                    }}
                  />
                )}
                <div className="mb-3 border-b border-white/[0.06] pb-2.5">
                  <div className="font-[family-name:var(--font-display)] text-[11px] font-semibold text-white/90">
                    VENDOR LEVITON MFG CO.
                  </div>
                  <div className="mt-0.5 font-mono text-[8.5px] text-white/35">
                    1247 INDUSTRIAL PKWY · MILWAUKEE WI 53214
                  </div>
                  <div className="mt-1 flex gap-4 font-mono text-[8.5px] tabular text-white/45">
                    <span>SO# 127834</span>
                    <span>03 · 28 · 2026</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {SLIP_LINES.map((line, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-md border px-2 py-1.5 text-[9px] transition-all duration-500 ${
                        slipExtracted[i]
                          ? "border-[var(--color-accent-soft)] bg-[var(--color-accent-wash)]"
                          : "border-transparent bg-white/[0.015]"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-mono text-[8px] font-medium text-white/85">
                          {line.item}
                        </div>
                        <div className="font-mono text-[7.5px] text-white/35">{line.cat}</div>
                      </div>
                      <div className="ml-2 text-right font-mono text-[9px] tabular font-medium text-white/80">
                        {line.qty}
                      </div>
                      {slipExtracted[i] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 22 }}
                          className="ml-1.5 text-[var(--color-accent)]"
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </GlassScreen>
          </Floaty>
        </motion.div>

        {/* Stage 2 — ERP (center) */}
        <motion.div
          className="w-full max-w-[580px] flex-shrink-0"
          style={{
            transform: "translateZ(40px)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: phase === "erp" ? 1.02 : 0.99,
            opacity: phase === "erp" ? 1 : 0.82,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Floaty delay={0.6}>
            <div className="relative">
              {/* Halo aura — ember-tinted when active */}
              <div
                aria-hidden
                className="absolute -inset-10 rounded-[32px] blur-3xl transition-opacity duration-700"
                style={{
                  background:
                    phase === "erp"
                      ? "radial-gradient(ellipse 55% 45% at 50% 45%, oklch(72% 0.035 230 / 0.14) 0%, transparent 65%)"
                      : "radial-gradient(ellipse 55% 45% at 50% 45%, var(--color-accent-glow) 0%, transparent 65%)",
                }}
              />
              <div className="lg-raised relative overflow-visible rounded-2xl">
                {/* Chrome */}
                <div className="flex items-center gap-3 rounded-t-2xl border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_oklch(60%_0.2_28_/_0.4)]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_oklch(80%_0.15_80_/_0.4)]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_oklch(70%_0.18_140_/_0.4)]" />
                  </div>
                  <div className="lg-chip flex flex-1 items-center gap-2 rounded-md px-2.5 py-1 font-mono text-[11px] text-white/45">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-50">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    erp.internal &nbsp;—&nbsp;&nbsp;dts management
                  </div>
                  <div className="lg-chip flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)]" />
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    </span>
                    agent online
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/[0.04] bg-white/[0.015]">
                  {["Order Entry", "DTS Management", "Purchasing", "Inventory"].map((tab) => (
                    <button
                      key={tab}
                      className={`relative px-4 py-2 text-[11px] font-medium transition-colors ${
                        tab === "DTS Management" ? "text-white/90" : "text-white/35 hover:text-white/60"
                      }`}
                    >
                      {tab}
                      {tab === "DTS Management" && (
                        <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent-glow)]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Info bar */}
                <div className="flex items-center gap-5 border-b border-white/[0.04] px-4 py-2 font-mono text-[11px] tabular">
                  <span>
                    <span className="text-white/35">job</span>{" "}
                    <span className="font-medium text-white/85">J-48291</span>
                  </span>
                  <span>
                    <span className="text-white/35">so#</span>{" "}
                    <span className="font-medium text-white/85">127834</span>
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 text-[var(--color-accent)]">
                    <span className="relative flex h-1 w-1">
                      <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)]" />
                      <span className="inline-flex h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                    </span>
                    processing
                  </span>
                </div>

                {/* Table */}
                <div className="relative overflow-hidden">
                  <table className="w-full table-fixed text-[11px]">
                    <colgroup>
                      <col className="w-[36px]" />
                      <col />
                      <col className="hidden sm:table-column w-[124px]" />
                      <col className="w-[44px]" />
                      <col className="w-[54px]" />
                      <col className="w-[104px]" />
                    </colgroup>
                    <thead>
                      <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                        {["#", "Description", "Catalog", "Ord", "Rcv", "Status"].map((h, i) => (
                          <th
                            key={h}
                            className={`px-3 py-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/35 ${
                              i === 2 ? "hidden sm:table-cell" : ""
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ERP_ROWS.map((row, i) => (
                        <tr
                          key={row.id}
                          className={`border-b border-white/[0.025] transition-colors duration-500 ${
                            activeRow === i
                              ? "bg-white/[0.04]"
                              : rowStates[i] === "done"
                              ? "bg-[var(--color-accent-wash)]"
                              : ""
                          }`}
                        >
                          <td className="px-3 py-2.5 font-mono tabular text-white/35">{row.id}</td>
                          <td className="px-3 py-2.5 font-mono text-[10.5px] text-white/85 truncate">
                            {row.desc}
                          </td>
                          <td className="hidden sm:table-cell px-3 py-2.5 font-mono text-[10.5px] text-white/40 truncate">
                            {row.cat}
                          </td>
                          <td className="px-3 py-2.5 font-mono tabular text-white/55">{row.ordered}</td>
                          <td className="px-3 py-2.5 font-mono tabular font-medium text-white/95">
                            {typedQty[i] || <span className="text-white/25">—</span>}
                            {rowStates[i] === "filling" && (
                              <span className="ml-[1px] inline-block h-3 w-[1px] bg-[var(--color-ember)] blink align-middle" />
                            )}
                          </td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-medium lg-chip ${
                                rowStates[i] === "done"
                                  ? "text-[var(--color-accent)]"
                                  : activeRow === i
                                  ? "text-white/80"
                                  : "text-white/40"
                              }`}
                            >
                              {rowStates[i] === "done" && (
                                <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                                  <path d="M1 4l2 2L7 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                              {rowStates[i] === "done"
                                ? "received"
                                : activeRow === i
                                ? "processing"
                                : "pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Satellite: verification card */}
              <motion.div
                initial={false}
                animate={{
                  opacity: showCard ? 1 : 0,
                  y: showCard ? 0 : 14,
                  scale: showCard ? 1 : 0.94,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg-raised absolute -bottom-14 -right-10 z-20 w-64 rounded-2xl p-4"
                style={{ transform: "translateZ(60px) rotateY(-6deg)" }}
              >
                <div className="mb-2.5 flex items-center justify-between border-b border-white/[0.06] pb-2">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/80">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[var(--color-accent)]">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M5 3v2l1.5 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    verification pass
                  </div>
                  <span className="font-mono text-[10px] tabular text-[var(--color-accent)]">
                    {cardData.confidence}%
                  </span>
                </div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <Row label="vendor" value="verified" good />
                  <Row label="qty" value={`${cardData.qty} units`} good />
                  <Row label="alias" value="leviton = con-tech" good />
                  <Row label="catalog" value="exact match" good />
                </div>
                <div className="mt-2.5 border-t border-white/[0.06] pt-2 text-[10px] text-white/55">
                  receiving → <span className="tabular text-white/90">{cardData.qty}</span>{" "}
                  <span className="text-white/40">units</span>
                </div>
              </motion.div>

              {/* Satellite: reasoning trace */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: phase === "erp" ? 0.95 : 0,
                  x: phase === "erp" ? 0 : -20,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="lg absolute -top-16 -left-8 z-20 w-52 rounded-xl p-3"
                style={{ transform: "translateZ(55px) rotateY(8deg)" }}
              >
                <div className="mb-2 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/65">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[var(--color-accent)]">
                    <path
                      d="M5 1v8M1 5h8"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  reasoning trace
                </div>
                <div className="space-y-1 font-mono text-[9px] text-white/50 leading-snug">
                  <p>· scan slip → 4 lines</p>
                  <p>· lookup PO-48291 → found</p>
                  <p>· vendor alias: <span className="text-[var(--color-accent)]">LEVITON</span></p>
                  <p>· match 4/4 candidates</p>
                  <p>· safe to receive</p>
                </div>
              </motion.div>
            </div>
          </Floaty>
        </motion.div>

        {/* Stage 3 — Sheets */}
        <motion.div
          className="hidden md:block w-[280px] flex-shrink-0"
          style={{
            transform: "translateZ(-40px) translateY(18px) rotateY(-7deg)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: phase === "sheets" ? 1.02 : 0.96,
            opacity: phase === "sheets" ? 1 : 0.5,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Floaty delay={1.2}>
            <GlassScreen
              label="receiving_tracker.gsheet"
              badge={
                phase === "sheets"
                  ? "Updating"
                  : sheetUpdated.every(Boolean)
                  ? "Synced"
                  : "Waiting"
              }
              active={phase === "sheets"}
              stageIndex="03"
              stageName="sync"
            >
              <div className="p-0">
                <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.01] px-3 py-1.5">
                  <div className="flex h-4 w-4 items-center justify-center rounded-[3px] bg-[#188038] shadow-[0_0_8px_oklch(60%_0.15_150_/_0.3)]">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <rect x="1" y="1" width="2.5" height="2.5" fill="white" />
                      <rect x="4.5" y="1" width="2.5" height="2.5" fill="white" />
                      <rect x="1" y="4.5" width="2.5" height="2.5" fill="white" />
                      <rect x="4.5" y="4.5" width="2.5" height="2.5" fill="white" />
                    </svg>
                  </div>
                  <span className="font-mono text-[9px] text-white/55">receiving_tracker_2026</span>
                </div>
                <div className="grid grid-cols-[1fr_0.7fr_0.5fr_0.75fr] border-b border-white/[0.04] font-mono text-[8px] font-medium uppercase tracking-[0.1em] text-white/35">
                  {["po#", "item", "qty", "status"].map((h) => (
                    <div
                      key={h}
                      className="border-r border-white/[0.03] bg-white/[0.015] px-2 py-1.5 last:border-r-0"
                    >
                      {h}
                    </div>
                  ))}
                </div>
                {SHEET_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr_0.7fr_0.5fr_0.75fr] border-b border-white/[0.025] text-[8px] transition-all duration-500 ${
                      sheetUpdated[i] ? "bg-[var(--color-accent-wash)]" : ""
                    }`}
                  >
                    <div className="border-r border-white/[0.03] px-2 py-1.5 font-mono text-[7.5px] text-white/70">
                      {row.po}
                    </div>
                    <div className="truncate border-r border-white/[0.03] px-2 py-1.5 text-white/75">
                      {row.desc}
                    </div>
                    <div className="border-r border-white/[0.03] px-2 py-1.5 text-center font-mono tabular text-white/85">
                      {row.qty}
                    </div>
                    <div className="px-2 py-1.5">
                      {sheetUpdated[i] ? (
                        <motion.span
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="inline-flex items-center gap-0.5 text-[7.5px] font-medium text-[var(--color-accent)]"
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path
                              d="M1.5 4l2 2L6.5 2"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          bot received
                        </motion.span>
                      ) : (
                        <span className="text-white/35">{row.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassScreen>
          </Floaty>
        </motion.div>
      </div>

      {/* Phase pager — editorial chapter style */}
      <div className="relative z-10 mt-10 flex items-center justify-center gap-4">
        {(["slip", "erp", "sheets"] as Phase[]).map((p, i) => (
          <div key={p} className="flex items-center gap-2.5">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                phase === p ? "text-[var(--color-accent)]" : "text-white/25"
              }`}
            >
              {["01", "02", "03"][i]}
            </span>
            <div
              className={`relative h-1 w-12 overflow-hidden rounded-full transition-colors duration-500 ${
                phase === p ? "bg-white/15" : "bg-white/[0.04]"
              }`}
            >
              {phase === p && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 2.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-accent), var(--color-ember))",
                    boxShadow: "0 0 14px var(--color-accent-glow)",
                  }}
                />
              )}
            </div>
            <span
              className={`font-mono text-[10.5px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                phase === p ? "text-white/85" : "text-white/30"
              }`}
            >
              {["ingest", "fill", "sync"][i]}
            </span>
            {i < 2 && <span aria-hidden className="mx-1 text-white/15">─</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Flow lines SVG with ember particles ─── */
function FlowLines({ phase }: { phase: Phase }) {
  const activeStage = phase === "slip" ? 0 : phase === "erp" ? 1 : 2;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      style={{ transform: "translateZ(0)" }}
    >
      <defs>
        <linearGradient id="flow-grad-mint" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(88% 0.045 230 / 0)" />
          <stop offset="50%" stopColor="oklch(88% 0.045 230 / 0.35)" />
          <stop offset="100%" stopColor="oklch(88% 0.045 230 / 0)" />
        </linearGradient>
        <linearGradient id="flow-grad-ember" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(72% 0.035 230 / 0)" />
          <stop offset="50%" stopColor="oklch(72% 0.035 230 / 0.5)" />
          <stop offset="100%" stopColor="oklch(72% 0.035 230 / 0)" />
        </linearGradient>
        <filter id="ember-glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Left connector: slip → erp */}
      <line
        x1="22%"
        y1="50%"
        x2="38%"
        y2="50%"
        stroke="url(#flow-grad-mint)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity={activeStage >= 1 ? 1 : 0.3}
      />
      {/* Right connector: erp → sheet */}
      <line
        x1="62%"
        y1="50%"
        x2="78%"
        y2="50%"
        stroke="url(#flow-grad-mint)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity={activeStage >= 2 ? 1 : 0.3}
      />
      {/* Ember particles traveling along paths when active */}
      {activeStage === 1 && (
        <>
          <circle r="3.5" fill="oklch(72% 0.035 230)" filter="url(#ember-glow)">
            <animate attributeName="cx" from="22%" to="38%" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50%" to="50%" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="oklch(88% 0.045 230)" filter="url(#ember-glow)">
            <animate attributeName="cx" from="22%" to="38%" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50%" to="50%" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      {activeStage === 2 && (
        <>
          <circle r="3.5" fill="oklch(72% 0.035 230)" filter="url(#ember-glow)">
            <animate attributeName="cx" from="62%" to="78%" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50%" to="50%" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="oklch(88% 0.045 230)" filter="url(#ember-glow)">
            <animate attributeName="cx" from="62%" to="78%" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="cy" from="50%" to="50%" dur="1.8s" begin="0.4s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ─── Floaty — slow physics float animation ─── */
function Floaty({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── GlassScreen — the unit of the process ─── */
function GlassScreen({
  children,
  label,
  active,
  badge,
  stageIndex,
  stageName,
}: {
  children: React.ReactNode;
  label: string;
  active: boolean;
  badge: string;
  stageIndex: string;
  stageName: string;
}) {
  return (
    <div className={`lg-raised overflow-hidden rounded-xl transition-shadow duration-700 ${active ? "ring-1 ring-[var(--color-accent-soft)]" : ""}`}>
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01] px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] tabular text-white/30">{stageIndex}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
            {stageName}
          </span>
        </div>
        <span
          className={`lg-chip inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[8.5px] font-medium uppercase tracking-[0.08em] ${
            active ? "text-[var(--color-accent)]" : "text-white/40"
          }`}
        >
          {active && <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />}
          {badge}
        </span>
      </div>
      <div className="flex items-center gap-1.5 border-b border-white/[0.04] bg-white/[0.005] px-3 py-1">
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#28c840]/60" />
        </div>
        <span className="ml-1.5 font-mono text-[9px] tracking-wide text-white/45">{label}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/45">{label}</span>
      <span className="inline-flex items-center gap-1.5 text-white/90">
        {good && (
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            className="text-[var(--color-accent)]"
          >
            <path
              d="M1 4l2 2L7 2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {value}
      </span>
    </div>
  );
}
