'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Award, Clock, Ticket, ArrowRight, X, ChevronRight, Users, PersonStanding, ClipboardList, Scale, Hotel } from 'lucide-react'

const ATHLETE_FORM = '/register'

const facts = [
  { icon: <Calendar size={16} />, label: 'Date', val: '29–30 August, 2026' },
  { icon: <MapPin size={16} />, label: 'Venue', val: 'Vientiane, Laos' },
  { icon: <Clock size={16} />, label: 'Registration', val: 'Open Now' },
  { icon: <Award size={16} />, label: 'Awards', val: 'Medals & E-Certificates for Top 4' },
]

const categories = ['Kata', 'Kumite', 'Team Kata', 'Team Kumite']

const registerLinks = [
  { label: 'Athlete Register', sub: 'All age categories & events', href: ATHLETE_FORM, Icon: PersonStanding },
  { label: 'Team Register', sub: 'Register your full team', href: '/register/team', Icon: Users },
  { label: 'Team Officials', sub: 'Delegates, coaches & officials', href: '/register/official', Icon: ClipboardList },
  { label: 'Referee Register', sub: 'WKF / AKF / National certified', href: '/register/referee', Icon: Scale },
  { label: 'Hotel Booking', sub: 'Official HQ hotel', href: '/register/hotel', Icon: Hotel },
]

export default function FeaturedTicket() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="tickets" className="relative py-16 sm:py-24 px-4 bg-[#0a0a0a] grid-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 60% at 50% 38%, rgba(200,16,46,0.13) 0%, transparent 62%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-condensed text-[11px] tracking-[4px] uppercase text-[#C9A84C] border border-[#C9A84C]/40 px-4 py-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] live-pulse" /> Registration Open
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl lg:text-7xl text-white tracking-widest">FEATURED <span className="text-[#C8102E]">EVENT</span></h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mx-auto mt-4" />
        </div>

        {/* Ticket card — clickable */}
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }}
          className="ticket group relative grid grid-cols-1 md:grid-cols-[340px_1fr] bg-[#141414] border border-[#C9A84C]/20 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#C8102E]/60 hover:shadow-[0_30px_80px_-30px_rgba(200,16,46,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E]"
        >
          {/* Poster */}
          <div className="relative overflow-hidden bg-black aspect-[5/7] md:aspect-auto md:min-h-[470px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/posterweb.jpeg" alt="Vientiane Open Karate Championships 2026 poster" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-5 left-0 bg-[#C8102E] text-white font-bebas text-lg sm:text-xl tracking-widest px-4 py-1.5 shadow-lg" style={{ clipPath: 'polygon(0 0,100% 0,calc(100% - 10px) 100%,0 100%)' }}>
              29–30 AUG 2026
            </div>
          </div>

          {/* Perforation notches (desktop) */}
          <span className="hidden md:block absolute top-[-13px] left-[340px] -translate-x-1/2 w-6 h-6 rounded-full bg-[#0a0a0a] z-20" />
          <span className="hidden md:block absolute bottom-[-13px] left-[340px] -translate-x-1/2 w-6 h-6 rounded-full bg-[#0a0a0a] z-20" />

          {/* Details */}
          <div className="relative p-6 sm:p-9 flex flex-col justify-center border-t border-dashed md:border-t-0 md:border-l md:border-dashed border-[#C9A84C]/30">
            <div className="font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-2">Vientiane Karate Federation presents</div>
            <h3 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide leading-[0.92] mb-5">
              VIENTIANE OPEN KARATE<br />CHAMPIONSHIPS <span className="text-[#C8102E]">2026</span>
            </h3>

            <div className="space-y-2.5 mb-6">
              {facts.slice(0, 3).map(d => (
                <div key={d.val} className="flex items-center gap-3 text-sm text-white/75">
                  <span className="text-[#C9A84C] flex-shrink-0">{d.icon}</span>{d.val}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-7">
              {['Kata', 'Kumite', 'U8 – Senior', 'WKF / AKF Rules'].map(c => (
                <span key={c} className="font-condensed text-[10px] tracking-[2px] uppercase bg-[#C8102E]/15 border border-[#C8102E]/30 text-[#C8102E] px-2.5 py-1">{c}</span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen(true) }}
                className="flex-1 inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-3.5 hover:bg-[#ff1a3a] transition-colors group/btn" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                <Ticket size={16} /> View & Register <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/events"
                onClick={(e) => e.stopPropagation()}
                className="flex-1 inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase border border-[#C9A84C] text-[#C9A84C] px-6 py-3.5 hover:bg-[#C9A84C]/10 transition-colors" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                Full Event Page
              </Link>
            </div>

            {/* hint */}
            <div className="mt-4 flex items-center gap-1.5 font-condensed text-[11px] tracking-[2px] uppercase text-white/35 group-hover:text-[#C9A84C] transition-colors">
              <span className="w-1 h-1 rounded-full bg-[#C8102E]" /> Click the ticket to read details
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/35 mt-5 font-condensed tracking-wide">Secure your spot — limited categories per athlete. Powered by VKF.</p>
      </div>

      {/* ── Detail Modal ───────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Event details">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-up" onClick={() => setOpen(false)} />

          {/* panel */}
          <div className="relative z-10 w-full sm:max-w-3xl max-h-screen sm:max-h-[90vh] overflow-y-auto bg-[#111] border border-[#C9A84C]/25 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] animate-fade-up">
            {/* sticky header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-7 py-4 bg-[#111]/95 backdrop-blur border-b border-[#C9A84C]/15">
              <div className="flex items-center gap-2 font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] live-pulse" /> Event Details
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close"
                className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
              {/* Poster */}
              <div className="relative bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/posterweb.jpeg" alt="Vientiane Open Karate Championships 2026 poster" className="w-full h-56 md:h-full object-cover object-top" />
                <div className="absolute top-4 left-0 bg-[#C8102E] text-white font-bebas text-base tracking-widest px-3 py-1" style={{ clipPath: 'polygon(0 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                  29–30 AUG 2026
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7">
                <div className="font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-1">Vientiane Karate Federation presents</div>
                <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide leading-[0.95] mb-4">
                  VIENTIANE OPEN KARATE CHAMPIONSHIPS <span className="text-[#C8102E]">2026</span>
                </h3>

                {/* facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                  {facts.map(f => (
                    <div key={f.label} className="flex items-start gap-3 bg-[#1a1a1a] border border-[#C9A84C]/12 px-3.5 py-2.5">
                      <span className="text-[#C9A84C] flex-shrink-0 mt-0.5">{f.icon}</span>
                      <div>
                        <div className="font-condensed text-[9px] tracking-[2px] uppercase text-[#C9A84C]/80">{f.label}</div>
                        <div className="text-sm text-white">{f.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* about */}
                <p className="text-sm text-white/65 leading-relaxed mb-5">
                  The Vientiane Open Karate Championships 2026 brings together athletes from across Laos and the region for two days of
                  Kata and Kumite competition. Open to every age group from Under&nbsp;8 to Senior, Male and Female, under official
                  WKF&nbsp;/&nbsp;AKF competition rules. Register your athletes, team, officials and referees below.
                </p>

                {/* categories */}
                <div className="mb-5">
                  <div className="font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-2 flex items-center gap-2"><Users size={14} /> Events &amp; Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                      <span key={c} className="font-condensed text-[10px] tracking-[2px] uppercase bg-[#C8102E]/15 border border-[#C8102E]/30 text-[#C8102E] px-2.5 py-1">{c}</span>
                    ))}
                    <span className="font-condensed text-[10px] tracking-[2px] uppercase bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] px-2.5 py-1">8 Age Groups · U8 → Senior</span>
                  </div>
                </div>

                {/* register */}
                <div className="font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-2 flex items-center gap-2"><Ticket size={14} /> Register</div>
                <div className="grid grid-cols-1 gap-2 mb-5">
                  {registerLinks.map(r => (
                    <a key={r.label} href={r.href} {...(r.href.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' })} onClick={() => { if (r.href.startsWith('/')) setOpen(false) }}
                      className="register-card flex items-center justify-between gap-3 bg-[#1a1a1a] border border-[#C9A84C]/12 p-3.5 transition-all duration-300 hover:border-[#C8102E] hover:-translate-y-0.5 group/r">
                      <span className="register-accent" />
                      <span className="relative z-10 flex items-center gap-3">
                        <span className="w-9 h-9 flex items-center justify-center bg-[#C8102E]/15 border border-[#C8102E]/30 flex-shrink-0 transition-all duration-300 group-hover/r:bg-[#C8102E] group-hover/r:scale-110"><r.Icon size={16} className="text-[#C9A84C] group-hover/r:text-white transition-colors"/></span>
                        <span>
                          <span className="block font-condensed text-sm tracking-widest uppercase text-white group-hover/r:text-[#C9A84C] transition-colors">{r.label}</span>
                          <span className="block text-xs text-white/45">{r.sub}</span>
                        </span>
                      </span>
                      <ChevronRight size={16} className="relative z-10 text-[#C9A84C] group-hover/r:translate-x-1 group-hover/r:text-[#C8102E] transition-all flex-shrink-0" />
                    </a>
                  ))}
                </div>

                <p className="text-xs text-white/35 leading-relaxed">
                  Entry fees are payable upon onsite registration. For full schedule, categories and hotel details, see the{' '}
                  <Link href="/events" onClick={() => setOpen(false)} className="text-[#C9A84C] hover:underline">full event page</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
