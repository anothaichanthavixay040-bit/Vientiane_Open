const stats = [
  { num: '2026', label: 'Championship Year' },
  { num: '6+', label: 'Age Categories' },
  { num: 'WKF', label: 'Certified Rules' },
  { num: '16–17', label: 'May, Vientiane' },
]

export default function Stats() {
  return (
    <div
      style={{
        background: 'var(--red)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
      className="grid-cols-2 sm:grid-cols-4"
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: '36px 24px', textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 52, color: 'white', letterSpacing: 2, lineHeight: 1,
          }}>{s.num}</div>
          <div style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontSize: 12, letterSpacing: 3, color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase', marginTop: 4,
          }}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
