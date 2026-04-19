"use client";

import { motion } from "framer-motion";

export function ChapterKicker({
  num,
  name,
  tag,
  align = "right",
}: {
  num: string;
  name: string;
  tag?: string;
  align?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute bottom-10 z-20 flex items-end gap-4 ${
        align === "right" ? "right-10 md:right-14" : "left-10 md:left-14"
      }`}
    >
      {align === "right" && tag && (
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--zone-fg-muted)]">
          {tag}
        </span>
      )}
      <span className="block h-8 w-px bg-[var(--zone-hairline-bright)]" aria-hidden />
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--zone-fg-muted)]">
          chapter
        </span>
        <span className="font-[family-name:var(--font-editorial)] italic text-[28px] leading-none tracking-[-0.02em] text-[var(--zone-fg)]">
          {num}
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[var(--zone-fg-secondary)]">
          {name}
        </span>
      </div>
    </motion.div>
  );
}

export function SlideTag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`pointer-events-none absolute top-10 left-10 md:left-14 z-20 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--zone-fg-muted)] ${className}`}
    >
      <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
      {children}
    </motion.div>
  );
}
