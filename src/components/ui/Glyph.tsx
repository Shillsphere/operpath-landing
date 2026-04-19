/**
 * Inline SVG brand glyph. Six-point star with a recessed diamond core — reads
 * as a node/compass mark, visually rhymes with the SigmaAi icon in the
 * reference but is a different geometry so it's ours.
 */
export function OperPathGlyph({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
    >
      {/* Six-point star */}
      <path
        d="M16 1.8
           L19.2 11.4
           L29 11.4
           L21.1 17.3
           L24.3 26.9
           L16 21
           L7.7 26.9
           L10.9 17.3
           L3 11.4
           L12.8 11.4 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        opacity="0.92"
      />
      {/* Inner diamond — structural, a tiny "path node" */}
      <path
        d="M16 10.4 L20.4 16 L16 21.6 L11.6 16 Z"
        fill="currentColor"
        opacity="0.88"
      />
    </svg>
  );
}
