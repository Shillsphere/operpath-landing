"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: React.ReactNode[];
  className?: string;
  duration?: number;
  separator?: React.ReactNode;
  repeat?: number;
}

export function Marquee({
  items,
  className,
  duration = 48,
  separator,
  repeat = 2,
}: MarqueeProps) {
  const sep =
    separator ??
    (
      <span
        aria-hidden
        className="mx-6 inline-flex h-1 w-1 rounded-full bg-[var(--zone-fg-muted)]"
      />
    );

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${duration}s` }}
      >
        {Array.from({ length: repeat }).map((_, loop) => (
          <div key={loop} className="inline-flex items-center whitespace-nowrap">
            {items.map((item, i) => (
              <span key={`${loop}-${i}`} className="inline-flex items-center">
                {item}
                {sep}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
