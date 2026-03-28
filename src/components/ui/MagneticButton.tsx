"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  href,
  strength = 0.3,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleLeave = () => setPosition({ x: 0, y: 0 });

  const Comp = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
      className="magnetic-wrap"
    >
      <Comp
        href={href}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300",
          className
        )}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
