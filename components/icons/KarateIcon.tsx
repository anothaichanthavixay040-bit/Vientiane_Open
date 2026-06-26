// Karate / martial-arts athlete icon — a figure throwing a high kick.
// Lucide has no martial-arts glyph, so we ship our own. Mirrors lucide's
// API (size / strokeWidth / className) and uses currentColor so it inherits
// text color (and the card's hover color) like any lucide icon.
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
      <circle cx="8" cy="4" r="2" />
      <path d="M8 6.2 L10 13" />
      <path d="M10 13 L8 21" />
      <path d="M10 13 L15 12 L22 9" />
      <path d="M9 8.5 L14.5 10.5" />
      <path d="M9 8.5 L5 11" />
    </svg>
  )
}
