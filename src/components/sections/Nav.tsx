"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      // Detect which zone we're in by checking bg color at nav position
      const el = document.elementFromPoint(window.innerWidth / 2, 40);
      const zone = el?.closest(".zone-light");
      setDark(!zone && window.scrollY > 300);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? "bg-[#131416]/80 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-white/80 backdrop-blur-2xl border-b border-black/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="OperPath"
            width={480}
            height={204}
            className={`h-9 w-auto transition-all duration-500 group-hover:opacity-70 ${dark ? "invert brightness-200" : ""}`}
            priority
            unoptimized
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "Capabilities", "Results"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className={`text-sm transition-colors duration-500 ${
                dark ? "text-[#5c6068] hover:text-white" : "text-[#868e96] hover:text-[#1a1a2e]"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <MagneticButton
          href="#book"
          className={`shadow-sm transition-all duration-500 ${
            dark
              ? "bg-white/[0.08] text-white border border-white/[0.1] hover:bg-white/[0.12]"
              : "bg-[#1a1a2e] text-white hover:bg-[#2d3142]"
          }`}
        >
          Book a Call
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
