import Link from 'next/link'
import { Calendar, MapPin, Clock, Trophy, Users, Shield, ChevronRight, Zap } from 'lucide-react'

const stats = [
  { num: '2026', label: 'Championship Year' },
  { num: '6+', label: 'Age Categories' },
  { num: 'REWARD', label: 'MEDAL & E-CERTIFICATE' },
  { num: '16–17', label: 'May, Vientiane' },
]

const registerLinks = [
  { label: 'Team Register', sub: 'Register your full team', href: 'https://forms.gle/HjJ7qCe2ooNUHdSm9', icon: '👥' },
  { label: 'Athlete Register', sub: 'USD 15 / category', href: 'https://forms.gle/vevCSWHsHTQr8gfz6', icon: '🥋' },
  { label: 'Team Officials', sub: 'Coaches & management', href: 'https://forms.gle/qCAfm3iokE6q38NJA', icon: '📋' },
  { label: 'Referee Register', sub: 'WKF / AKF certified', href: 'https://forms.gle/MFmXHnZQ1csU1eo1A', icon: '⚖️' },
  { label: 'Hotel Booking', sub: 'Official HQ hotel', href: 'https://forms.gle/WsJrt5LViMisrEZG8', icon: '🏨' },
]

const features = [
  { icon: <Zap size={22} className="text-[#C8102E]"/>, title: 'Real-Time Check-In', desc: 'QR code scanning system — instant athlete check-in with live status updates across all devices.' },
  { icon: <Trophy size={22} className="text-[#C8102E]"/>, title: 'Live Results', desc: 'Match scores and standings update in real-time. Follow every bout as it happens.' },
  { icon: <Shield size={22} className="text-[#C8102E]"/>, title: 'WKF Certified', desc: 'Official WKF/AKF competition rules applied across all categories and age groups.' },
  { icon: <Users size={22} className="text-[#C8102E]"/>, title: '6 Age Categories', desc: 'From Under 6 to Senior — every age group, Kata and Kumite, Male and Female.' },
]

export default function HomePage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0808] to-[#0a0a0a]"/>
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(200,16,46,0.15) 0%, transparent 60%)'}}/>

        {/* Decorative text */}
        {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bebas text-[120px] sm:text-[180px] lg:text-[220px] text-[#C8102E]/05 leading-none select-none hidden sm:block" style={{writingMode:'vertical-rl', letterSpacing:'20px'}}>VKF</div> */}

        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 font-condensed text-[11px] sm:text-xs tracking-[4px] text-[#C9A84C] border border-[#C9A84C]/40 px-4 py-2 mb-6 sm:mb-8">
            <span>◆</span> OFFICIAL GOVERNING BODY · LAOS <span>◆</span>
          </div>

          <h1 className="font-bebas text-[72px] sm:text-[110px] lg:text-[140px] leading-[0.88] tracking-[3px] text-white mb-4" style={{animationDelay:'0.1s'}}>
            VIENTIANE<br/>
            <span className="text-[#C8102E]">KARATE</span>
          </h1>
          <div className="font-bebas text-3xl sm:text-5xl lg:text-6xl tracking-[8px] sm:tracking-[12px] text-[#C9A84C] mb-6">FEDERATION</div>

          <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
            Developing champions, empowering youth, and elevating the spirit of karate across Laos and the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/events" className="w-full sm:w-auto font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-8 py-3.5 hover:bg-[#ff1a3a] transition-colors text-center" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              View Events
            </Link>
            <Link href="/checkin" className="w-full sm:w-auto font-condensed text-sm tracking-[3px] uppercase border border-[#C9A84C] text-[#C9A84C] px-8 py-3.5 hover:bg-[#C9A84C]/10 transition-colors text-center" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              Athlete Check-In
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 font-condensed text-[10px] tracking-[3px]">
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent animate-pulse"/>
          SCROLL
        </div>
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#C8102E]">
        {stats.map(s => (
          <div key={s.num} className="py-6 sm:py-8 px-4 text-center border-r border-white/15 last:border-r-0 [&:nth-child(2)]:border-r-0 sm:[&:nth-child(2)]:border-r">
            <div className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">{s.num}</div>
            <div className="font-condensed text-[10px] sm:text-xs tracking-[2px] text-white/70 uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Event spotlight */}
      <section className="py-16 sm:py-24 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-3">Upcoming Event</div>
            <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white tracking-widest">Vientiane Open Karate Championship <span className="text-[#C8102E]">2026</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mx-auto mt-4"/>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { icon: <Calendar size={18}/>, label: 'Date', val: '16–17 May, 2026' },
              { icon: <MapPin size={18}/>, label: 'Venue', val: 'Vientiane Center Mall' },
              { icon: <Clock size={18}/>, label: 'Registration Closes', val: '31 April, 2026' },
            ].map(i => (
              <div key={i.label} className="bg-[#1a1a1a] border border-[#C9A84C]/12 p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#C8102E]/15 border border-[#C8102E]/30 flex items-center justify-center text-[#C8102E] flex-shrink-0">{i.icon}</div>
                <div>
                  <div className="font-condensed text-[10px] tracking-[3px] text-[#C9A84C] uppercase">{i.label}</div>
                  <div className="font-condensed text-sm sm:text-base text-white font-semibold mt-0.5">{i.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Register grid */}
          <div className="mb-8">
            <div className="font-bebas text-2xl sm:text-3xl text-white tracking-widest mb-5">Registration Links</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {registerLinks.map(r => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#1a1a1a] border border-[#C9A84C]/12 p-4 hover:border-[#C8102E] hover:bg-[#C8102E]/05 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#C8102E]/15 border border-[#C8102E]/30 flex items-center justify-center text-lg flex-shrink-0">{r.icon}</div>
                    <div>
                      <div className="font-condensed text-sm tracking-widest uppercase text-white">{r.label}</div>
                      <div className="text-xs text-white/40 mt-0.5">{r.sub}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#C9A84C] group-hover:translate-x-1 transition-transform flex-shrink-0"/>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1 bg-[#C9A84C]/08 border border-[#C9A84C]/20 p-5 flex items-center gap-4">
              <div className="text-3xl">🏅</div>
              <div><div className="font-condensed text-[10px] tracking-[3px] text-[#C9A84C] uppercase">Awards</div><div className="text-sm text-white/70">Top 4 receive medals & E-certificates</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Real-time */}
      <section className="py-16 sm:py-24 px-4 bg-[#0a0a0a] grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-3">Platform Features</div>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-widest">POWERED BY <span className="text-[#C8102E]">REAL-TIME</span></h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mx-auto mt-4"/>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => (
              <div key={f.title} className="bg-[#111] border border-[#C9A84C]/10 p-6 hover:border-[#C8102E]/40 transition-colors group">
                <div className="w-12 h-12 bg-[#C8102E]/10 border border-[#C8102E]/20 flex items-center justify-center mb-4 group-hover:bg-[#C8102E]/20 transition-colors">{f.icon}</div>
                <div className="font-condensed text-sm tracking-widest uppercase text-white mb-2">{f.title}</div>
                <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/checkin" className="font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-8 py-3.5 hover:bg-[#ff1a3a] transition-colors text-center" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              Go to Check-In
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
