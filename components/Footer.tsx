export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark)',
      borderTop: '1px solid rgba(201,168,76,0.15)',
      padding: '48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: 24,
    }} className="footer">
      <div>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, letterSpacing: 3, color: 'white', marginBottom: 6 }}>
          Vientiane <span style={{ color: 'var(--gold)' }}>Karate</span> Federation
        </div>
        <div style={{ fontSize: 13, color: 'rgba(232,232,232,0.3)' }}>
          © 2026 Vientiane Karate Federation · All rights reserved
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        {[
          { label: 'Home', href: '#hero' },
          { label: 'About', href: '#about' },
          { label: 'Events', href: '#events' },
          { label: 'Contact', href: '#contact' },
        ].map(l => (
          <a
            key={l.label}
            href={l.href}
            style={{
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
              color: 'rgba(232,232,232,0.4)', textDecoration: 'none',
              transition: 'color 0.3s',
            }}
            className="footer-link"
          >{l.label}</a>
        ))}
      </div>
      <style>{`
        .footer-link:hover{ color: var(--gold) !important; }
        @media(max-width:768px){ .footer{ flex-direction:column; align-items:flex-start; padding:32px 24px !important; } }
      `}</style>
    </footer>
  )
}
