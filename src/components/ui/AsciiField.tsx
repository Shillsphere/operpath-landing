"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AsciiFieldProps {
  className?: string;
  rows?: number;
  cols?: number;
  density?: number;
  animate?: boolean;
}

const GLYPHS = ["·", "˙", "∙", "∙", "∘", "⋅", "+", "×", "·", "·", "·"];

/**
 * Decorative ASCII dot-field. Animated variant slowly scrambles glyphs on a
 * timer — like a CRT idle pattern. Pure decoration, aria-hidden.
 */
export function AsciiField({
  className,
  rows = 20,
  cols = 70,
  density = 0.4,
  animate = true,
}: AsciiFieldProps) {
  const [text, setText] = useState<string>(() =>
    build(rows, cols, density, 1)
  );

  useEffect(() => {
    if (!animate) return;
    let frame = 0;
    const id = window.setInterval(() => {
      frame++;
      setText(build(rows, cols, density, frame));
    }, 420);
    return () => window.clearInterval(id);
  }, [animate, rows, cols, density]);

  return (
    <pre
      aria-hidden
      className={cn("ascii-field pointer-events-none select-none", className)}
    >
      {text}
    </pre>
  );
}

function build(rows: number, cols: number, density: number, seed: number) {
  let out = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = ((r * 31 + c * 7 + seed * 13) % 101) / 101;
      if (n < density) {
        out += GLYPHS[(r + c + seed) % GLYPHS.length];
      } else {
        out += " ";
      }
    }
    out += "\n";
  }
  return out;
}
