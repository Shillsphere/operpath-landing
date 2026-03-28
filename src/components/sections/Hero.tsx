"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

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

type RowState = "pending" | "scanning" | "verifying" | "filling" | "done";
type Phase = "slip" | "erp" | "sheets";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* White hero zone */}
      <div className="zone-light pt-24 pb-4 md:pt-32 md:pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.03] px-3.5 py-1.5 text-xs font-medium text-[#636870]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1a1a2e] opacity-50" />
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#1a1a2e]" />
            </span>
            AI Workflow Automation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em] font-[family-name:var(--font-display)] text-[#1a1a2e]"
          >
            Your ERP runs on{" "}
            <span className="bg-gradient-to-r from-[#1a1a2e] via-[#6b7280] to-[#9ca3af] bg-clip-text text-transparent">
              autopilot.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg text-lg leading-relaxed text-[#495057]"
          >
            We build AI agents that take over manual data entry in your business
            software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 pt-2"
          >
            <MagneticButton
              href="#book"
              className="bg-[#1a1a2e] text-white shadow-lg shadow-black/10 hover:shadow-black/20 hover:bg-[#2d3142]"
            >
              Book a Call
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 7.5h9m-3.5-3.5L12 7.5 8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#how-it-works"
              className="glass-dark relative text-[#495057] hover:text-[#1a1a2e]"
            >
              See How It Works
            </MagneticButton>
          </motion.div>
        </div>
      </div>
      </div>

      {/* Fade white → dark */}
      <div className="fade-to-dark h-24 md:h-36" />

      {/* Browser demo in the dark zone */}
      <div className="relative pb-16 md:pb-24 -mt-12">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <TripleScreenDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Triple Screen Demo ─── */
function TripleScreenDemo() {
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

  const clear = useCallback(() => { timeouts.current.forEach(clearTimeout); timeouts.current = []; }, []);
  const sched = useCallback((fn: () => void, ms: number) => { const id = setTimeout(fn, ms); timeouts.current.push(id); return id; }, []);
  const typeQty = useCallback((idx: number, val: string, onDone: () => void) => {
    let i = 0;
    const tick = () => { if (i <= val.length) { setTypedQty(p => { const n = [...p]; n[idx] = val.slice(0, i); return n; }); i++; sched(tick, 80); } else onDone(); };
    tick();
  }, [sched]);

  const run = useCallback(() => {
    clear();
    // Reset all
    setPhase("slip");
    setSlipScanning(false); setSlipScanLine(0);
    setSlipExtracted(SLIP_LINES.map(() => false));
    setRowStates(ERP_ROWS.map(() => "pending"));
    setActiveRow(-1); setTypedQty(ERP_ROWS.map(() => ""));
    setShowCard(false);
    setSheetUpdated(SHEET_ROWS.map(() => false));

    // ── Phase 1: Packing slip scan ──
    sched(() => {
      setSlipScanning(true); setSlipScanLine(0);
      let f = 0;
      const anim = () => { f++; setSlipScanLine((f / 50) * 100); if (f < 50) sched(anim, 30); else setSlipScanning(false); };
      anim();
    }, 600);

    // Extract lines
    SLIP_LINES.forEach((_, i) => {
      sched(() => setSlipExtracted(p => { const n = [...p]; n[i] = true; return n; }), 2200 + i * 400);
    });

    // ── Phase 2: ERP fill ──
    const erpStart = 4200;
    sched(() => setPhase("erp"), erpStart);

    ERP_ROWS.forEach((row, i) => {
      const base = erpStart + 400 + i * 2200;
      sched(() => { setActiveRow(i); setRowStates(p => { const n = [...p]; n[i] = "scanning"; return n; }); }, base);
      sched(() => {
        setRowStates(p => { const n = [...p]; n[i] = "verifying"; return n; });
        setShowCard(true);
        setCardData({ qty: row.qty, confidence: (95 + Math.random() * 4.9).toFixed(1) });
      }, base + 400);
      sched(() => {
        setRowStates(p => { const n = [...p]; n[i] = "filling"; return n; });
        typeQty(i, String(row.qty), () => setRowStates(p => { const n = [...p]; n[i] = "done"; return n; }));
      }, base + 1200);
      sched(() => { if (i === ERP_ROWS.length - 1) { setShowCard(false); setActiveRow(-1); } }, base + 2000);
    });

    // ── Phase 3: Sheet update ──
    const sheetStart = erpStart + 400 + ERP_ROWS.length * 2200 + 800;
    sched(() => setPhase("sheets"), sheetStart);
    SHEET_ROWS.forEach((_, i) => {
      sched(() => setSheetUpdated(p => { const n = [...p]; n[i] = true; return n; }), sheetStart + 400 + i * 500);
    });

    // Restart
    sched(run, sheetStart + 400 + SHEET_ROWS.length * 500 + 3000);
  }, [clear, sched, typeQty]);

  useEffect(() => { const id = setTimeout(run, 600); return () => { clearTimeout(id); clear(); }; }, [run, clear]);

  return (
    <div
      className="relative mx-auto"
      style={{ perspective: "1800px" }}
    >
      {/* 3D Container — slight tilt */}
      <div
        className="relative flex items-start justify-center gap-5 lg:gap-7"
        style={{
          transform: "rotateX(4deg) rotateY(-2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* ── Screen 1: Packing Slip Scan ── */}
        <div
          className="w-[280px] flex-shrink-0 hidden md:block"
          style={{ transform: "translateZ(-30px) rotateY(6deg)", transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ opacity: phase === "slip" ? 1 : 0.55, scale: phase === "slip" ? 1 : 0.97 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenFrame
              label="Packing Slip"
              active={phase === "slip"}
              badge={phase === "slip" ? "Scanning..." : "Complete"}
              badgeColor={phase === "slip" ? "blue" : "green"}
            >
              <div className="relative p-3">
                {/* Scan line */}
                {slipScanning && (
                  <div
                    className="pointer-events-none absolute left-0 right-0 h-[2px] z-10"
                    style={{
                      top: `${Math.min(slipScanLine, 100)}%`,
                      background: "linear-gradient(90deg, transparent, #6b7280, #9ca3af, transparent)",
                      boxShadow: "0 0 16px rgba(107,114,128,0.4)",
                    }}
                  />
                )}
                {/* Slip header */}
                <div className="mb-3 border-b border-[var(--color-border-subtle)] pb-2">
                  <div className="text-[10px] font-semibold font-[family-name:var(--font-display)] text-[var(--color-text)]">
                    OperPath
                  </div>
                  <div className="text-[8px] text-[var(--color-text-muted)] mt-0.5">
                    Ship To: 1247 Industrial Pkwy, Milwaukee WI 53214
                  </div>
                  <div className="flex gap-4 mt-1 text-[8px] text-[var(--color-text-muted)]">
                    <span>SO# SO-127834</span>
                    <span>Date: 03/28/2026</span>
                  </div>
                </div>
                {/* Line items */}
                <div className="space-y-1.5">
                  {SLIP_LINES.map((line, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[8px] transition-all duration-500 ${
                        slipExtracted[i]
                          ? "bg-white/[0.05] border border-white/[0.08]"
                          : "bg-[var(--color-surface-raised)] border border-transparent"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[var(--color-text)] truncate font-[family-name:var(--font-mono)] text-[7.5px]">
                          {line.item}
                        </div>
                        <div className="text-[var(--color-text-muted)] text-[7px]">{line.cat}</div>
                      </div>
                      <div className="ml-2 text-right">
                        <span className="font-medium">{line.qty}</span>
                      </div>
                      {slipExtracted[i] && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
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
            </ScreenFrame>
          </motion.div>
        </div>

        {/* ── Screen 2: ERP (Center, Primary) ── */}
        <div
          className="w-full max-w-[520px] flex-shrink-0"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ opacity: phase === "erp" ? 1 : 0.7, scale: phase === "erp" ? 1 : 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gray-400/15 via-transparent to-gray-300/10 blur-sm" />
              <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/20 overflow-visible">
                {/* Chrome */}
                <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5 rounded-t-2xl">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex flex-1 items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-[var(--color-text-muted)] font-[family-name:var(--font-mono)]">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-40">
                      <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1" />
                    </svg>
                    &nbsp;
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    AI Agent Active
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/[0.04] bg-white/[0.02]">
                  {["Order Entry", "DTS Management", "Purchasing", "Inventory"].map(tab => (
                    <button key={tab} className={`px-4 py-2 text-[11px] font-medium transition-colors ${tab === "DTS Management" ? "border-b-2 border-white/30 text-white/80 bg-white/[0.03]" : "text-[var(--color-text-muted)]"}`}>{tab}</button>
                  ))}
                </div>

                {/* Info bar */}
                <div className="flex items-center gap-5 border-b border-[var(--color-border-subtle)] px-4 py-2 text-[11px]">
                  <span><span className="text-[var(--color-text-muted)]">Job:</span> <span className="font-medium">J-48291</span></span>
                  <span><span className="text-[var(--color-text-muted)]">SO#:</span> <span className="font-medium">SO-127834</span></span>
                  <span className="ml-auto flex items-center gap-1.5 text-[var(--color-accent)]">
                    <span className="relative flex h-1 w-1">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
                      <span className="inline-flex h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                    </span>
                    Processing...
                  </span>
                </div>

                {/* Table */}
                <div className="relative overflow-hidden">
                  <table className="w-full table-fixed text-[11px]">
                    <colgroup>
                      <col className="w-[28px]" />
                      <col />
                      <col className="hidden sm:table-column w-[110px]" />
                      <col className="w-[42px]" />
                      <col className="w-[52px]" />
                      <col className="w-[72px]" />
                    </colgroup>
                    <thead>
                      <tr className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)]/30 text-[var(--color-text-muted)]">
                        <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">#</th>
                        <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Description</th>
                        <th className="hidden sm:table-cell px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Cat #</th>
                        <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Ord</th>
                        <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Rcvd</th>
                        <th className="px-3 py-2 text-left font-medium text-[10px] uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ERP_ROWS.map((row, i) => (
                        <tr key={row.id} className={`border-b border-[var(--color-border-subtle)]/50 transition-colors duration-500 ${activeRow === i ? "bg-white/[0.04]" : rowStates[i] === "done" ? "bg-emerald-500/[0.04]" : ""}`}>
                          <td className="px-3 py-2.5 text-[var(--color-text-muted)]">{row.id}</td>
                          <td className="px-3 py-2.5 font-[family-name:var(--font-mono)] text-[10.5px] truncate">{row.desc}</td>
                          <td className="hidden sm:table-cell px-3 py-2.5 text-[var(--color-text-muted)] font-[family-name:var(--font-mono)] text-[10.5px] truncate">{row.cat}</td>
                          <td className="px-3 py-2.5 text-[var(--color-text-muted)]">{row.ordered}</td>
                          <td className="px-3 py-2.5 font-medium text-[#2d3142] font-[family-name:var(--font-mono)]">
                            {typedQty[i] || <span className="text-[var(--color-text-muted)]">—</span>}
                            {rowStates[i] === "filling" && <span className="inline-block w-[1px] h-3 bg-[#495057] animate-pulse ml-[1px]" />}
                          </td>
                          <td className="px-3 py-2.5">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap ${rowStates[i] === "done" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : activeRow === i ? "bg-white/[0.06] text-white/60 border border-white/[0.08]" : "bg-[var(--color-surface-raised)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]"}`}>
                              {rowStates[i] === "done" ? "Received" : activeRow === i ? "Processing" : "Pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Frosted glass AI card */}
              <motion.div
                initial={false}
                animate={{ opacity: showCard ? 1 : 0, y: showCard ? 0 : 8, scale: showCard ? 1 : 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-8 -right-8 z-20 w-52 rounded-xl p-3 shadow-xl shadow-black/[0.06]"
                style={{
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  WebkitBackdropFilter: "blur(24px) saturate(1.6)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <div className="mb-2 flex items-center gap-1.5 border-b border-black/5 pb-2 text-[10px] font-semibold text-[#2d3142]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6 3.5v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  AI Verification
                </div>
                <div className="space-y-1 text-[10px]">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                    <span className="text-emerald-500 font-bold text-[11px]">&#10003;</span>
                    Vendor: <strong className="text-[var(--color-text)]">Verified</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                    <span className="text-emerald-500 font-bold text-[11px]">&#10003;</span>
                    Qty: <strong className="text-[var(--color-text)]">{cardData.qty} units</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                    <span className="text-emerald-500 font-bold text-[11px]">&#10003;</span>
                    Match: <strong className="text-[var(--color-text)]">{cardData.confidence}%</strong>
                  </div>
                  <div className="mt-1.5 border-t border-black/5 pt-1.5 text-[#495057]">
                    Receiving →{" "}
                    <strong className="text-[#2d3142] font-[family-name:var(--font-mono)]">{cardData.qty} units</strong>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Screen 3: Google Sheets ── */}
        <div
          className="w-[280px] flex-shrink-0 hidden md:block"
          style={{ transform: "translateZ(-30px) rotateY(-6deg)", transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ opacity: phase === "sheets" ? 1 : 0.55, scale: phase === "sheets" ? 1 : 0.97 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenFrame
              label="Tracking Sheet"
              active={phase === "sheets"}
              badge={phase === "sheets" ? "Updating..." : sheetUpdated.every(Boolean) ? "Synced" : "Waiting"}
              badgeColor={sheetUpdated.every(Boolean) ? "green" : phase === "sheets" ? "blue" : "gray"}
            >
              <div className="p-0">
                {/* Sheet header bar */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/[0.04] border-b border-emerald-500/10">
                  <div className="h-4 w-4 rounded-sm bg-[#188038] flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <rect x="1" y="1" width="2.5" height="2.5" fill="white" />
                      <rect x="4.5" y="1" width="2.5" height="2.5" fill="white" />
                      <rect x="1" y="4.5" width="2.5" height="2.5" fill="white" />
                      <rect x="4.5" y="4.5" width="2.5" height="2.5" fill="white" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-medium text-emerald-400/80">Receiving Tracker 2026</span>
                </div>
                {/* Column headers */}
                <div className="grid grid-cols-[1fr_0.7fr_0.5fr_0.7fr] text-[7.5px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border)]">
                  <div className="px-2 py-1.5 border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)]">PO#</div>
                  <div className="px-2 py-1.5 border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)]">Item</div>
                  <div className="px-2 py-1.5 border-r border-[var(--color-border-subtle)] bg-[var(--color-surface-raised)]">Qty</div>
                  <div className="px-2 py-1.5 bg-[var(--color-surface-raised)]">Status</div>
                </div>
                {/* Data rows */}
                {SHEET_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-[1fr_0.7fr_0.5fr_0.7fr] text-[8px] border-b border-[var(--color-border-subtle)]/50 transition-all duration-500 ${
                      sheetUpdated[i] ? "bg-emerald-500/[0.04]" : ""
                    }`}
                  >
                    <div className="px-2 py-1.5 border-r border-[var(--color-border-subtle)]/50 font-[family-name:var(--font-mono)] text-[7.5px]">{row.po}</div>
                    <div className="px-2 py-1.5 border-r border-[var(--color-border-subtle)]/50 truncate">{row.desc}</div>
                    <div className="px-2 py-1.5 border-r border-[var(--color-border-subtle)]/50 text-center">{row.qty}</div>
                    <div className="px-2 py-1.5">
                      {sheetUpdated[i] ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-0.5 text-emerald-400 font-medium text-[7.5px]"
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l2 2L6.5 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Bot Received
                        </motion.span>
                      ) : (
                        <span className="text-[var(--color-text-muted)]">{row.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScreenFrame>
          </motion.div>
        </div>
      </div>

      {/* Phase label */}
      <div className="flex justify-center mt-8 gap-8">
        {(["slip", "erp", "sheets"] as Phase[]).map((p, i) => (
          <div key={p} className="flex items-center gap-2">
            <div className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${phase === p ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}`} />
            <span className={`text-xs font-medium transition-colors duration-500 ${phase === p ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}`}>
              {["Document Scan", "ERP Entry", "Sheet Sync"][i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Reusable screen frame for side panels ─── */
function ScreenFrame({
  children,
  label,
  active,
  badge,
  badgeColor,
}: {
  children: React.ReactNode;
  label: string;
  active: boolean;
  badge: string;
  badgeColor: "blue" | "green" | "gray";
}) {
  const colors = {
    blue: "bg-white/[0.06] text-white/60 border-white/[0.08]",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    gray: "bg-white/[0.04] text-[var(--color-text-muted)] border-white/[0.06]",
  };

  return (
    <div className={`rounded-xl border bg-white/[0.03] backdrop-blur-lg shadow-lg transition-shadow duration-500 overflow-hidden ${active ? "border-white/[0.1] shadow-xl shadow-black/20" : "border-white/[0.06] shadow-black/15"}`}>
      {/* Mini chrome */}
      <div className="flex items-center justify-between border-b border-white/[0.05] bg-white/[0.02] px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/70" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/70" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#28c840]/70" />
          </div>
          <span className="text-[9px] font-medium text-[var(--color-text-muted)] ml-1">{label}</span>
        </div>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[8px] font-medium border ${colors[badgeColor]}`}>
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}
