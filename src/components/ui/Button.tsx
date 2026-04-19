"use client";

import { forwardRef, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ink" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  href?: string;
  target?: string;
  rel?: string;
  magnetic?: boolean;
  sheen?: boolean;
  arrow?: boolean;
  strength?: number;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary btn-sheen",
  ink: "btn-ink btn-sheen",
  ghost: "btn-ghost",
  link: "bg-transparent px-0 py-1 text-[var(--zone-fg)] hover:text-[var(--color-accent)] rounded-none",
};

const sizeClass: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    href,
    target,
    rel,
    magnetic = true,
    sheen,
    arrow = false,
    strength = 0.28,
    className,
    children,
    ...rest
  },
  ref
) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    setPos({ x, y });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  const classes = cn(
    "btn",
    variantClass[variant],
    sizeClass[size],
    sheen === false && "btn-sheen-off",
    className
  );

  const content = (
    <>
      {children}
      {arrow && (
        <svg
          className="btn-arrow"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden
        >
          <path
            d="M3 7.5h9m-3.5-3.5L12 7.5 8.5 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  const commonProps = {
    className: classes,
    ref: ref as never,
  };

  const Wrapper = (
    <motion.span
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 360, damping: 18, mass: 0.25 }}
      className="magnetic-wrap"
    >
      {href ? (
        <a href={href} target={target} rel={rel} {...commonProps}>
          {content}
        </a>
      ) : (
        <button {...(rest as React.ComponentPropsWithoutRef<"button">)} {...commonProps}>
          {content}
        </button>
      )}
    </motion.span>
  );

  return Wrapper;
});
