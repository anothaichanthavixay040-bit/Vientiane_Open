import FadeIn from './FadeIn'
import Categories from './Categories'

const registerLinks = [
  { label: 'Team Register', sub: 'Register your full team', href: 'https://forms.gle/HjJ7qCe2ooNUHdSm9', icon: 'team' },
  { label: 'Athlete Register', sub: 'USD 15 per athlete / category', href: 'https://forms.gle/vevCSWHsHTQr8gfz6', icon: 'athlete' },
  { label: 'Team Officials', sub: 'Coaches & team management', href: 'https://forms.gle/qCAfm3iokE6q38NJA', icon: 'official' },
  { label: 'Referee Register', sub: 'WKF / AKF certified', href: 'https://forms.gle/MFmXHNZQ1csU1eo1A', icon: 'referee' },
  { label: 'Hotel Booking', sub: 'Official HQ hotel · Book by 30 Apr', href: 'https://forms.gle/WsJrt5LViMisrEZG8', icon: 'hotel' },
]

const schedule = [
  { date: '15 May, 2026', time: '10:00–17:00', activity: 'Arrival, Registration & Accreditation', place: '1st Floor, Vientiane Center Mall' },
  { date: '15 May, 2026', time: '17:00–18:00', activity: 'Weigh-In — All Categories', place: 'Vientiane Center Mall' },
  { date: '15 May, 2026', time: '18:00–19:00', activity: 'Coach Meeting & Drawing Lots', place: 'Vientiane Center Mall' },
  { date: '16–17 May', time: 'TBA', activity: 'Competition Days', place: '1st Floor, Vientiane Center Mall' },
]

function Icon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    team: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    athlete: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    official: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    referee: <><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></>,
    hotel: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[type]}
    </svg>
  )
}

export default function Events() {
  return (
    <section id="events" style={{ background: 'var(--dark)', padding: '100px 48px' }} className="events-section">
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn><div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 12, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Competitions</div></FadeIn>
        <FadeIn delay={80}><h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: 3, color: 'white', marginBottom: 20 }}>Upcoming <span style={{ color: 'var(--red)' }}>Events</span></h2></FadeIn>
        <FadeIn delay={160}><div style={{ width: 60, height: 3, background: 'linear-gradient(to right, var(--red), var(--gold))', marginBottom: 48 }} /></FadeIn>

        <FadeIn delay={200}>
          <div style={{
            background: 'var(--dark3)',
            border: '1px solid rgba(201,168,76,0.12)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Left accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: 'linear-gradient(to bottom, var(--red), var(--gold))' }} />

            {/* Event Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--dark2), rgba(200,16,46,0.08))',
              padding: '36px 48px',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 24,
              borderBottom: '1px solid rgba(201,168,76,0.1)',
            }} className="event-header">
              <div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 36, letterSpacing: 3, color: 'white', marginBottom: 8 }}>
                  Vientiane Open Karate Championship 2026
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { icon: 'cal', text: '16–17 May, 2026' },
                    { icon: 'pin', text: 'Vientiane Center Mall, Laos' },
                    { icon: 'clk', text: 'Registration closes: 10 April, 2026' },
                  ].map(m => (
                    <span key={m.text} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-barlow-condensed)',
                      fontSize: 14, letterSpacing: 1, color: 'rgba(232,232,232,0.7)',
                    }}>{m.text}</span>
                  ))}
                </div>
              </div>
              <div className="clip-skew-sm" style={{
                background: 'var(--red)',
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
                color: 'white', padding: '6px 16px', whiteSpace: 'nowrap', alignSelf: 'flex-start',
              }}>Open Now</div>
            </div>

            {/* Event Body */}
            <div style={{ padding: '36px 48px' }} className="event-body">

              {/* Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }} className="info-grid">
                {[
                  { label: 'Rules', val: 'WKF / AKF', note: 'Latest competition rules apply' },
                  { label: 'Categories', val: 'U6 to Senior', note: '6 age groups · Kata & Kumite' },
                  { label: 'Age Reference', val: '16 May, 2026', note: 'Age calculated on first competition day' },
                ].map(b => (
                  <div key={b.label} style={{ background: 'var(--dark2)', border: '1px solid rgba(201,168,76,0.08)', padding: 24 }}>
                    <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{b.label}</div>
                    <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 18, fontWeight: 600, color: 'white', lineHeight: 1.3 }}>{b.val}</div>
                    <div style={{ fontSize: 12, color: 'rgba(232,232,232,0.4)', marginTop: 4 }}>{b.note}</div>
                  </div>
                ))}
              </div>

              {/* Registration Links */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, letterSpacing: 3, color: 'white', marginBottom: 20 }}>Registration Links</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
                  {registerLinks.map(r => (
                    <a
                      key={r.label}
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reg-btn"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        background: 'var(--dark2)',
                        border: '1px solid rgba(201,168,76,0.15)',
                        padding: '18px 24px', textDecoration: 'none',
                        transition: 'all 0.3s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{
                          width: 36, height: 36,
                          background: 'rgba(200,16,46,0.15)',
                          border: '1px solid rgba(200,16,46,0.3)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Icon type={r.icon} />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', color: 'white' }}>{r.label}</div>
                          <div style={{ fontSize: 12, color: 'rgba(232,232,232,0.4)', marginTop: 2 }}>{r.sub}</div>
                        </div>
                      </div>
                      <span className="reg-arrow" style={{ color: 'var(--gold)', fontSize: 18, flexShrink: 0, transition: 'transform 0.3s' }}>→</span>
                    </a>
                  ))}
                </div>

                {/* Fees */}
                {/* <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
                  {[{ amt: '$15', label: 'Individual event / per athlete' }, { amt: '$30', label: 'Team event / per team' }].map(f => (
                    <div key={f.amt} style={{
                      background: 'var(--dark2)', border: '1px solid rgba(201,168,76,0.12)',
                      padding: '20px 28px', flex: 1, minWidth: 180,
                    }}>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 42, color: 'var(--gold)', letterSpacing: 2, lineHeight: 1 }}>{f.amt}</div>
                      <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, color: 'rgba(232,232,232,0.5)', textTransform: 'uppercase', marginTop: 4 }}>{f.label}</div>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Awards */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(200,16,46,0.06))',
                border: '1px solid rgba(201,168,76,0.15)',
                padding: '24px 32px',
                display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap',
              }}>
                <span style={{ fontSize: 36 }}>🥇</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gold)' }}>Awards &amp; Prizes</h4>
                  <p style={{ fontSize: 14, color: 'rgba(232,232,232,0.6)', marginTop: 4 }}>Top 4 in each category receive medals &amp; certificates · All participants receive participation certificates</p>
                </div>
              </div>

              {/* Schedule */}
              <div style={{ marginTop: 40 }}>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, letterSpacing: 3, color: 'white', marginBottom: 20 }}>Event Programme</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2, border: '1px solid rgba(201,168,76,0.1)' }}>
                  {schedule.map((s, i) => (
                    <div key={i} style={{
                      background: 'var(--dark2)', padding: '20px 24px',
                      display: 'flex', gap: 16, alignItems: 'flex-start',
                      border: '1px solid rgba(201,168,76,0.06)',
                    }}>
                      <div style={{ minWidth: 80 }}>
                        <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 2, color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 4 }}>{s.date}</div>
                        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: 'var(--red)', letterSpacing: 1 }}>{s.time}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, color: 'var(--light)', lineHeight: 1.4 }}>{s.activity}</div>
                        <div style={{ fontSize: 12, color: 'rgba(232,232,232,0.4)', marginTop: 4 }}>{s.place}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <Categories />

              {/* Hotel */}
              <div style={{
                background: 'var(--dark2)',
                border: '1px solid rgba(201,168,76,0.12)',
                padding: '28px 32px', marginTop: 40,
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start',
              }} className="hotel-grid">
                <div>
                  <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Official Headquarters Hotel</div>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, letterSpacing: 2, color: 'white', marginBottom: 8 }}>Landmark Vientiane Life Center Hotel</div>
                  <p style={{ fontSize: 14, color: 'rgba(232,232,232,0.6)', lineHeight: 1.6, marginBottom: 16 }}>
                    Located just next to the Vientiane Center Mall (competition venue). Features an outdoor swimming pool, free private parking, and fitness centre. 1.9 km from Wat Sisaket, 100m walk to Parkson Mall.
                  </p>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[{ price: '$50', type: 'Single' }, { price: '$60', type: 'Double' }, { price: '$80', type: 'Triple' }].map(r => (
                      <div key={r.type} style={{
                        background: 'var(--dark3)', border: '1px solid rgba(201,168,76,0.15)',
                        padding: '8px 16px', textAlign: 'center',
                      }}>
                        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: 'var(--gold)', display: 'block' }}>{r.price}</span>
                        <span style={{ fontSize: 11, color: 'rgba(232,232,232,0.4)', textTransform: 'uppercase', letterSpacing: 2 }}>{r.type}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(232,232,232,0.4)', marginTop: 12 }}>★ Rates include breakfast · Must book via OC before 30 April, 2026</div>
                </div>
                <div style={{
                  background: 'var(--dark3)', border: '1px solid rgba(201,168,76,0.15)',
                  padding: '12px 16px', textAlign: 'center', alignSelf: 'flex-start',
                }}>
                  <div style={{ color: 'var(--gold)', fontSize: 18 }}>★★★</div>
                  <div style={{ fontSize: 12, color: 'rgba(232,232,232,0.4)', marginTop: 4, letterSpacing: 2 }}>HQ Hotel</div>
                  <a
                    href="https://forms.gle/WsJrt5LViMisrEZG8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clip-skew-sm"
                    style={{
                      display: 'block', marginTop: 12,
                      background: 'var(--red)', color: 'white',
                      fontFamily: 'var(--font-barlow-condensed)',
                      fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
                      padding: '8px 16px', textDecoration: 'none', textAlign: 'center',
                    }}
                  >Book Now</a>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media(max-width:900px){
          .events-section{ padding: 72px 24px !important; }
          .event-header{ padding: 24px !important; }
          .event-body{ padding: 24px !important; }
          .info-grid{ grid-template-columns: 1fr 1fr !important; }
          .hotel-grid{ grid-template-columns: 1fr !important; }
        }
        @media(max-width:600px){
          .info-grid{ grid-template-columns: 1fr !important; }
        }
        .reg-btn:hover{ border-color: var(--red) !important; background: rgba(200,16,46,0.06) !important; transform: translateX(4px); }
        .reg-btn:hover .reg-arrow{ transform: translateX(4px); }
      `}</style>
    </section>
  )
}
