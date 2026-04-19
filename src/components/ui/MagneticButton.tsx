"use client";

import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}

/**
 * Back-compat wrapper. New code should import `Button` directly.
 * Variant is inferred from whether the consumer passed dark/light classes,
 * so existing sections continue to render with their intended look.
 */
export function MagneticButton({
  children,
  className,
  href,
  strength,
  onClick,
}: MagneticButtonProps) {
  // Infer variant from legacy className hints so old call sites keep working.
  const cls = className ?? "";
  let variant: "primary" | "ink" | "ghost" = "ghost";
  if (/bg-\[#1a1a2e\]|text-white/.test(cls)) variant = "ink";
  if (/bg-emerald|bg-\[var\(--color-accent\)\]|btn-primary/.test(cls)) variant = "primary";
  if (/glass-dark|glass-panel|text-\[#495057\]|text-\[#5c6068\]/.test(cls)) variant = "ghost";

  return (
    <Button
      variant={variant}
      href={href}
      strength={strength}
      onClick={onClick}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}
