/**
 * OperPathGlyph — the real "op" monogram used as the brand mark.
 *
 * Two linked rings (the "o" on the left, the "p" head on the right) plus a
 * short descender hanging from the right ring. Rendered with `currentColor`
 * so the parent can set hue via Tailwind `text-*` utilities.
 *
 * Used inline with the OPERPATH wordmark in chrome and the footer. For the
 * hero centerpiece, see the animated draw-in version inside BlueprintScene.
 */
export function OperPathGlyph({
  size = 32,
  className = "",
  strokeWidth = 6,
}: {
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  // viewBox: 100 wide × 62 tall fits the op ligature + descender with padding.
  // Aspect ratio preserved via explicit width/height on the <svg>.
  const aspect = 100 / 62;
  return (
    <svg
      width={size * aspect}
      height={size}
      viewBox="0 0 100 62"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      {/* Left ring — the "o" */}
      <circle cx="22" cy="22" r="16" />
      {/* Right ring — head of the "p" */}
      <circle cx="50" cy="22" r="16" />
      {/* Descender — tail of the "p" */}
      <line x1="66" y1="22" x2="66" y2="56" />
    </svg>
  );
}
