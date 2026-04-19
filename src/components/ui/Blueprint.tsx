"use client";

import { motion } from "framer-motion";

type Variant = "arc-right" | "arc-left" | "grid" | "radial" | "orbit";

export function Blueprint({
  variant = "arc-right",
  active = true,
  className = "",
}: {
  variant?: Variant;
  active?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${active ? "blueprint-active" : ""} ${className}`}
    >
      <defs>
        <linearGradient id="bp-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="oklch(87% 0.19 160 / 0)" />
          <stop offset="50%" stopColor="oklch(87% 0.19 160 / 0.55)" />
          <stop offset="100%" stopColor="oklch(87% 0.19 160 / 0)" />
        </linearGradient>
        <filter id="bp-glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {variant === "arc-right" && <ArcRight />}
      {variant === "arc-left" && <ArcLeft />}
      {variant === "grid" && <GridFrame />}
      {variant === "radial" && <Radial />}
      {variant === "orbit" && <Orbit />}

      {/* Corner registration nodes (4px squares at key intersections) */}
      <g opacity="0.7">
        <rect x="174" y="174" width="5" height="5" className="blueprint-node" />
        <rect x="1262" y="174" width="5" height="5" className="blueprint-node" />
        <rect x="174" y="722" width="5" height="5" className="blueprint-node" />
        <rect x="1262" y="722" width="5" height="5" className="blueprint-node" />
      </g>

      {/* + crosshairs scattered */}
      <g className="blueprint-stroke" opacity="0.35">
        <Cross x={360} y={260} />
        <Cross x={720} y={180} />
        <Cross x={1080} y={280} />
        <Cross x={280} y={640} />
        <Cross x={1160} y={660} />
      </g>
    </svg>
  );
}

function Cross({ x, y, size = 8 }: { x: number; y: number; size?: number }) {
  return (
    <>
      <line x1={x - size} y1={y} x2={x + size} y2={y} />
      <line x1={x} y1={y - size} x2={x} y2={y + size} />
    </>
  );
}

function ArcRight() {
  return (
    <g>
      {/* Giant arc that frames the right half — like the SigmaAi copy-circle */}
      <motion.circle
        cx="1280"
        cy="280"
        r="360"
        className="blueprint-stroke blueprint-draw"
        pathLength="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="1280"
        cy="280"
        r="200"
        className="blueprint-stroke blueprint-draw"
        pathLength="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.35"
      />
      {/* Horizontal blueprint baseline */}
      <motion.line
        x1="40"
        y1="720"
        x2="1400"
        y2="720"
        className="blueprint-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.4"
      />
      {/* Vertical registration at right third */}
      <motion.line
        x1="960"
        y1="40"
        x2="960"
        y2="860"
        className="blueprint-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.3"
      />
    </g>
  );
}

function ArcLeft() {
  return (
    <g>
      <motion.circle
        cx="160"
        cy="620"
        r="420"
        className="blueprint-stroke blueprint-draw"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="160"
        cy="620"
        r="240"
        className="blueprint-stroke blueprint-draw"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.35"
      />
      <motion.line
        x1="40"
        y1="180"
        x2="1400"
        y2="180"
        className="blueprint-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.4"
      />
      <motion.line
        x1="480"
        y1="40"
        x2="480"
        y2="860"
        className="blueprint-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.3"
      />
    </g>
  );
}

function GridFrame() {
  return (
    <g className="blueprint-stroke" opacity="0.35">
      {[180, 360, 540, 720, 900, 1080, 1260].map((x) => (
        <motion.line
          key={x}
          x1={x}
          y1="60"
          x2={x}
          y2="840"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: x / 3000, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {[180, 360, 540, 720].map((y) => (
        <motion.line
          key={y}
          x1="60"
          y1={y}
          x2="1380"
          y2={y}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: y / 3000, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </g>
  );
}

function Radial() {
  return (
    <g className="blueprint-stroke" opacity="0.4">
      <motion.circle
        cx="720"
        cy="450"
        r="160"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="720"
        cy="450"
        r="280"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.5"
      />
      <motion.circle
        cx="720"
        cy="450"
        r="400"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.25"
      />
      <motion.line
        x1="40"
        y1="450"
        x2="1400"
        y2="450"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.line
        x1="720"
        y1="40"
        x2="720"
        y2="860"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </g>
  );
}

function Orbit() {
  return (
    <g className="blueprint-stroke" opacity="0.4">
      <motion.ellipse
        cx="720"
        cy="450"
        rx="580"
        ry="160"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.ellipse
        cx="720"
        cy="450"
        rx="580"
        ry="160"
        transform="rotate(30 720 450)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.5"
      />
      <motion.ellipse
        cx="720"
        cy="450"
        rx="580"
        ry="160"
        transform="rotate(-30 720 450)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        opacity="0.25"
      />
    </g>
  );
}
