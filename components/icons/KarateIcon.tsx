// Combat-karate punch icon — a clenched fist. Lucide has no fist glyph, so
// we ship our own. Mirrors lucide's API (size / strokeWidth / className) and
// uses currentColor so it inherits text color (and the card's hover color).
type IconProps = { size?: number; strokeWidth?: number; className?: string }

export function KarateIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* knuckles */}
      <circle cx="8" cy="8.4" r="1.5" />
      <circle cx="10.7" cy="8.1" r="1.5" />
      <circle cx="13.4" cy="8.1" r="1.5" />
      <circle cx="16" cy="8.4" r="1.5" />
      {/* fist mass */}
      <rect x="6.6" y="8.2" width="10.8" height="8" rx="2.6" />
      {/* thumb across the front */}
      <rect x="6.4" y="10.6" width="5.4" height="2.7" rx="1.35" />
      {/* wrist */}
      <rect x="8.6" y="15" width="6.8" height="6" rx="1.7" />
    </svg>
  )
}
