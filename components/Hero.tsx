export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 80% at 70% 50%, rgba(200,16,46,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 40% 60% at 20% 80%, rgba(201,168,76,0.08) 0%, transparent 50%),
          linear-gradient(135deg, #0a0a0a 0%, #1a0808 50%, #0a0a0a 100%)
        `,
      }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Side decoration */}
      <div style={{
        position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
        opacity: 0.06, fontFamily: 'var(--font-bebas)',
        fontSize: 200, lineHeight: 1, color: 'var(--red)',
        writingMode: 'vertical-rl', userSelect: 'none', letterSpacing: 20,
        pointerEvents: 'none',
      }}
        className="hidden lg:block"
      >VKF</div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center', padding: '120px 24px 80px',
        maxWidth: 900,
      }}>
        <div
          className="animate-hero1"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-barlow-condensed)',
            fontSize: 12, letterSpacing: 4, textTransform: 'uppercase',
            color: 'var(--gold)',
            border: '1px solid rgba(201,168,76,0.4)',
            padding: '6px 18px', marginBottom: 28,
          }}
        >
          <span style={{ fontSize: 7 }}>◆</span>
          Official Governing Body · Laos
          <span style={{ fontSize: 7 }}>◆</span>
        </div>

        <h1
          className="animate-hero2"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(64px, 12vw, 130px)',
            lineHeight: 0.9,
            color: 'white', letterSpacing: 4, marginBottom: 12,
          }}
        >
          Vientiane<br />
          <span style={{ color: 'var(--red)' }}>Karate</span>
        </h1>

        <div
          className="animate-hero3"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            color: 'var(--gold)', letterSpacing: 8, marginBottom: 24,
          }}
        >Federation</div>

        <p
          className="animate-hero3"
          style={{
            fontSize: 16, fontWeight: 300, color: 'rgba(232,232,232,0.7)',
            maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7,
          }}
        >
          Developing champions, empowering youth, and elevating the spirit of karate across Laos and the world.
        </p>

        <div
          className="animate-hero4"
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#events"
            className="clip-skew"
            style={{
              background: 'var(--red)', color: 'white',
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: 14, letterSpacing: 3, textTransform: 'uppercase',
              padding: '14px 36px', textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.3s',
            }}
          >View Events</a>
          <a
            href="#about"
            className="clip-skew"
            style={{
              background: 'transparent', color: 'var(--gold)',
              fontFamily: 'var(--font-barlow-condensed)',
              fontSize: 14, letterSpacing: 3, textTransform: 'uppercase',
              padding: '13px 36px', border: '1px solid var(--gold)',
              textDecoration: 'none', display: 'inline-block',
            }}
          >About VKF</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        fontFamily: 'var(--font-barlow-condensed)',
        fontSize: 11, letterSpacing: 3, color: 'rgba(232,232,232,0.4)', textTransform: 'uppercase',
      }}>
        <div
          className="animate-scroll-pulse"
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)' }}
        />
        Scroll
      </div>
    </section>
  )
}
