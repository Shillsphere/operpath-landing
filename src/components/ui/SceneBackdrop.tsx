"use client";

/**
 * SceneBackdrop — near-black canvas with a slow-pulsing ember flair.
 *
 * Most of the time the page reads pure dark. Every ~14 seconds a warm
 * ember glow breathes in low-left and fades back out, giving the site a
 * quiet "heartbeat" instead of a constantly-warm atmosphere. Grain + paper
 * tooth keep the black from feeling flat.
 */
export function SceneBackdrop() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* Pure dark base — very slight green-tint so mint accents stay harmonious */}
      <div
        className="absolute inset-0"
        style={{ background: "#050807" }}
      />

      {/* Ember flair — breathes in/out on a long cycle.
          Positioned off-center so the warmth feels incidental, not branded. */}
      <div
        className="absolute hero-bg-flair"
        style={{
          left: "-4%",
          bottom: "-6%",
          width: "62%",
          height: "58%",
          background:
            "radial-gradient(ellipse 58% 55% at 50% 55%, rgba(255,122,60,0.35) 0%, rgba(200,86,31,0.12) 32%, transparent 70%)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Corner vignette — pulls focus inward */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 92%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Paper tooth — warm noise, soft-light blended, 3% opacity */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240' viewBox='0 0 240 240'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.88  0 0 0 0 0.72  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23p)'/></svg>")`,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Film grain — fine, 6% opacity, overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
