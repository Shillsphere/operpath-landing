"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  max = 6,
  scale = 1,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const reduce = useReducedMotion();

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || reduce) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setRotate({ x: (y - 0.5) * -max, y: (x - 0.5) * max });
    setGlarePos({ x: x * 100, y: y * 100 });
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
  };

  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: rotate.x || rotate.y ? scale : 1,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20, mass: 0.6 }}
      style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(520px circle at ${glarePos.x}% ${glarePos.y}%, color-mix(in oklch, var(--color-accent) 14%, transparent) 0%, transparent 55%)`,
          }}
        />
      )}
    </motion.div>
  );
}
