"use client";

/**
 * Scene backdrop — modern executive neutral.
 *
 * A calm graphite canvas with a single almost-imperceptible radial lift
 * toward the top-center, plus a fine grain overlay for depth. No stars,
 * no ember horizon, no cinematic halation.
 */
export function SceneBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 55% at 50% 0%,
            oklch(22% 0.006 260 / 0.55) 0%,
            transparent 60%),
          linear-gradient(180deg,
            oklch(15% 0.003 260) 0%,
            oklch(14% 0.003 260) 100%)
        `,
      }}
    >
      {/* Cool corner fall-off — keeps focus at slide center */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 50%,
            transparent 55%,
            oklch(10% 0.003 260 / 0.45) 90%,
            oklch(8%  0.003 260 / 0.7)  100%)`,
        }}
      />

      {/* Fine grain — modern tactile depth, ~6% opacity */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
