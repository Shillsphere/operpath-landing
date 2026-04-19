"use client";

import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

/**
 * CSS-based reveal. Previously used framer-motion `useInView` but that
 * was unreliable inside the custom vertical slide-pager viewport.
 * Now renders on mount with a CSS keyframe + delay — works everywhere.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
}: SectionRevealProps) {
  return (
    <div
      className={cn("editorial-rise", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
