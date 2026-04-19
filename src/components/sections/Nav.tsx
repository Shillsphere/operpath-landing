"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Insight", href: "#insight" },
  { label: "Method", href: "#how-it-works" },
  { label: "What we build", href: "#capabilities" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 8);
      const el = document.elementFromPoint(window.innerWidth / 2, 42);
      const zone = el?.closest(".zone-light");
      setOnLight(Boolean(zone));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? onLight
            ? "bg-[oklch(96%_0.012_85_/_0.6)] backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_-1px_0_oklch(16%_0.02_250_/_0.06),inset_0_1px_0_oklch(100%_0_0_/_0.8),0_1px_2px_oklch(16%_0.02_250_/_0.05),0_20px_40px_-20px_oklch(16%_0.02_250_/_0.15)]"
            : "bg-[oklch(13%_0.008_250_/_0.55)] backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_-1px_0_oklch(100%_0_0_/_0.05),inset_0_1px_0_oklch(100%_0_0_/_0.08),0_1px_2px_oklch(0%_0_0_/_0.3),0_20px_40px_-20px_oklch(0%_0_0_/_0.5)]"
          : "bg-transparent"
      )}
    >
      {/* hairline ticker: micro live signal */}
      <div
        className={cn(
          "absolute inset-x-0 -top-px h-px transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 outline-none"
          aria-label="OperPath home"
        >
          <Image
            src="/logo.png"
            alt=""
            width={480}
            height={204}
            priority
            unoptimized
            className={cn(
              "h-8 w-auto transition-all duration-500 group-hover:opacity-80",
              onLight ? "" : "invert brightness-[2]"
            )}
          />
          <span className="hidden sm:inline text-[10px] font-mono tracking-[0.18em] uppercase text-[var(--zone-fg-muted)]">
            operating&nbsp;layer
          </span>
        </a>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors duration-300",
                onLight
                  ? "text-[var(--zone-fg-secondary)] hover:text-[var(--zone-fg)]"
                  : "text-[var(--zone-fg-secondary)] hover:text-white"
              )}
            >
              <span className="relative">
                {item.label}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 hover:scale-x-100"
                  style={{ transitionProperty: "transform, opacity" }}
                />
              </span>
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono",
              onLight ? "text-[var(--zone-fg-muted)]" : "text-[var(--zone-fg-muted)]"
            )}
          >
            <span className="kbd">⌘</span>
            <span className="kbd">K</span>
          </span>
          <Button
            variant={onLight ? "ink" : "primary"}
            size="sm"
            href="#book"
            arrow
          >
            Book a call
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
