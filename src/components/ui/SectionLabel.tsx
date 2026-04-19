"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  number?: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

/**
 * Section eyebrow — sans, small, uppercase, spaced. Modern-corporate, no
 * italic / small-caps flourish. Number is rendered as a tabular mono-style
 * tag to the right.
 */
export function SectionLabel({
  number,
  children,
  className,
  align = "center",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em]",
        "text-[color:var(--color-cream-muted)]",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
    >
      {number && (
        <span className="tabular text-[color:var(--color-cream-subtle)]">
          {number}
        </span>
      )}
      {number && (
        <span aria-hidden className="h-px w-4 bg-[color:var(--color-cream-subtle)] opacity-60" />
      )}
      <span>{children}</span>
    </div>
  );
}
