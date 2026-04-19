"use client";

import { motion } from "framer-motion";

/**
 * Opening brand moment — the animated OperPath mark inside a large
 * glass pill, floating in the atmospheric night. Orbit lines draw in,
 * the mark blooms, the wordmark types in below.
 */
export function LogoReveal() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Concentric blueprint rings orbiting the brand pill */}
      <svg
        aria-hidden
        viewBox="0 0 900 900"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute h-[min(90vh,900px)] w-[min(90vh,900px)]"
      >
        {[180, 260, 340, 420].map((r, i) => (
          <motion.circle
            key={r}
            cx="450"
            cy="450"
            r={r}
            className="blueprint-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 - i * 0.08 }}
            transition={{
              pathLength: { duration: 2.2, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1.4, delay: 0.4 + i * 0.15 },
            }}
          />
        ))}
        {/* Registration nodes on the outer ring */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r = 340;
          const x = 450 + Math.cos(rad) * r;
          const y = 450 + Math.sin(rad) * r;
          return (
            <motion.rect
              key={deg}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              className="blueprint-node"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}
      </svg>

      {/* Ember halo underneath the pill */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[340px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, oklch(70% 0.19 42 / 0.45) 0%, oklch(65% 0.17 38 / 0.15) 32%, transparent 65%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* The glass pill */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="lg-pill-hero flex items-center gap-5 rounded-full px-10 py-6 md:gap-6 md:px-14 md:py-8"
        >
          <LogoMark />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-display)] text-[clamp(2rem,1.5rem+2.5vw,3.25rem)] font-medium leading-none tracking-[-0.02em] text-[color:var(--color-cream)]"
          >
            OperPath
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Breath under-line — subtle tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="absolute bottom-[18%] left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[color:var(--color-cream-muted)]"
      >
        <span className="block h-px w-10 bg-[color:var(--color-ember)]" />
        production ai · operating layer
        <span className="block h-px w-10 bg-[color:var(--color-ember)]" />
      </motion.div>
    </div>
  );
}

/* The OperPath mark — custom SVG, animated glyph reveal */
function LogoMark() {
  return (
    <motion.svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      initial={{ rotate: -90, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="shrink-0"
    >
      <defs>
        <linearGradient id="opm-fill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(84% 0.09 165)" />
          <stop offset="100%" stopColor="oklch(70% 0.19 42)" />
        </linearGradient>
        <filter id="opm-glow">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Outer pentagon ring */}
      <motion.polygon
        points="23,3 42,16 35,38 11,38 4,16"
        stroke="oklch(92% 0.03 85 / 0.55)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner gradient chevron / path */}
      <motion.path
        d="M14 24 L20 30 L32 18"
        stroke="url(#opm-fill)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Inner dot — node */}
      <motion.circle
        cx="23"
        cy="23"
        r="1.5"
        fill="oklch(70% 0.19 42)"
        filter="url(#opm-glow)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.9 }}
      />
    </motion.svg>
  );
}
