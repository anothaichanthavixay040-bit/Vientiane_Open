// Karate / martial-arts athlete icon — a figure throwing a straight punch
// from a forward stance. Lucide has no martial-arts glyph, so we ship our
// own. Mirrors lucide's API (size / strokeWidth / className) and uses
// currentColor so it inherits text color (and the card's hover color).
type IconProps = { size?: number; strokeWidth?: number; className?: string }

export function KarateIcon({ size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="4" r="2" />
      <path d="M9 6 L10 12.5" />
      <path d="M10 12.5 L15.5 21" />
      <path d="M10 12.5 L5 21" />
      <path d="M10 8 L18 8.5" />
      <path d="M10 8 L6.5 10.5" />
    </svg>
  )
}
