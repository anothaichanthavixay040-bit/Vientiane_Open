import FadeIn from './FadeIn'

const pillars = [
  { title: 'Discipline', text: 'Building character through rigorous training and commitment.' },
  { title: 'Excellence', text: 'Striving for technical mastery at every level of competition.' },
  { title: 'Integrity', text: 'Upholding the values and spirit of martial arts.' },
  { title: 'Community', text: 'Empowering youth and strengthening Lao society through sport.' },
]

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--dark2)',
        padding: '100px 48px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}
      className="about-grid"
    >
      {/* Visual */}
      <FadeIn>
        <div style={{ position: 'relative' }}>
          <div style={{
            background: 'var(--dark3)',
            border: '1px solid rgba(201,168,76,0.15)',
            position: 'relative',
          }}>
            <div style={{
              content: '',
              position: 'absolute', top: -12, left: -12, right: 12, bottom: 12,
              border: '1px solid rgba(200,16,46,0.3)',
              zIndex: 0,
            }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 40, display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* SVG Emblem */}
              <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
                <polygon points="150,10 270,80 270,220 150,290 30,220 30,80" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="2"/>
                <polygon points="150,40 245,95 245,205 150,260 55,205 55,95" fill="none" stroke="rgba(200,16,46,0.4)" strokeWidth="1.5"/>
                <circle cx="150" cy="150" r="70" fill="rgba(200,16,46,0.08)" stroke="rgba(200,16,46,0.5)" strokeWidth="2"/>
                <text x="150" y="130" textAnchor="middle" fontFamily="var(--font-bebas)" fontSize="40" fill="rgba(200,16,46,0.9)" letterSpacing="4">VKF</text>
                <text x="150" y="162" textAnchor="middle" fontFamily="var(--font-barlow-condensed)" fontSize="11" fill="rgba(201,168,76,0.8)" letterSpacing="3">VIENTIANE</text>
                <text x="150" y="180" textAnchor="middle" fontFamily="var(--font-barlow-condensed)" fontSize="11" fill="rgba(201,168,76,0.8)" letterSpacing="3">KARATE</text>
                <text x="150" y="198" textAnchor="middle" fontFamily="var(--font-barlow-condensed)" fontSize="11" fill="rgba(201,168,76,0.8)" letterSpacing="3">FEDERATION</text>
                <line x1="90" y1="115" x2="110" y2="115" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
                <line x1="190" y1="115" x2="210" y2="115" stroke="rgba(201,168,76,0.4)" strokeWidth="1"/>
                <polygon points="150,60 155,75 170,75 158,84 163,99 150,90 137,99 142,84 130,75 145,75" fill="rgba(200,16,46,0.6)"/>
              </svg>
              <p style={{
                fontStyle: 'italic', fontSize: 15, fontWeight: 300,
                color: 'var(--gold)', textAlign: 'center',
                borderLeft: '2px solid var(--red)',
                paddingLeft: 16, marginLeft: 16, lineHeight: 1.6,
              }}>
                "Discipline, Excellence, and Integrity — the foundation of every VKF champion."
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Text */}
      <FadeIn delay={150}>
        <div>
          <div style={{
            fontFamily: 'var(--font-barlow-condensed)',
            fontSize: 12, letterSpacing: 5, textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 12,
          }}>Who We Are</div>

          <h2 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: 3, color: 'white', marginBottom: 20, lineHeight: 1,
          }}>
            About <span style={{ color: 'var(--red)' }}>VKF</span>
          </h2>

          <div style={{ width: 60, height: 3, background: 'linear-gradient(to right, var(--red), var(--gold))', marginBottom: 32 }} />

          {[
            'The Vientiane Karate Federation (VKF) is the official governing body dedicated to the promotion, development, and advancement of karate in the capital city of Laos.',
            'As a leading force in the nation\'s martial arts community, VKF plays a pivotal role in nurturing athletes of all ages and preparing them to represent Vientiane and Laos with pride and distinction on both national and international stages.',
            'Through our structured regional coaching programs and talent development initiatives, we are committed to building a new generation of martial artists who exemplify discipline, technical excellence, resilience, and integrity.',
            'VKF stands not only as a sporting organization, but also as a driver of youth empowerment and community engagement. With the support of valued partners and sponsors, we aim to expand opportunities, enhance training standards, and elevate the global presence of Lao athletes.',
          ].map((p, i) => (
            <p key={i} style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.8, color: 'rgba(232,232,232,0.8)', marginBottom: 18 }}>{p}</p>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
            {pillars.map(p => (
              <div key={p.title} style={{
                background: 'var(--dark3)',
                border: '1px solid rgba(201,168,76,0.1)',
                borderLeft: '3px solid var(--red)',
                padding: '16px 20px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
                  color: 'var(--gold)', marginBottom: 4,
                }}>{p.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(232,232,232,0.6)', lineHeight: 1.5 }}>{p.text}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  )
}
