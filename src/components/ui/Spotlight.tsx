"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a child; writes CSS vars --mx / --my on mousemove so the `.spotlight`
 * pseudo-element glow follows the cursor.
 */
export function Spotlight({ children, className, ...rest }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn("spotlight", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
