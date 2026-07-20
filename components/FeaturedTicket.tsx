'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Award, Clock, Ticket, X, ChevronRight, Users, ClipboardList, Scale, Hotel, Swords } from 'lucide-react'

const ATHLETE_FORM = '/register'

const facts = [
  { icon: <Calendar size={16} />, label: 'Date', val: '29–30 August, 2026' },
  { icon: <MapPin size={16} />, label: 'Venue', val: 'Vientiane Center Mall, Laos' },
  { icon: <Clock size={16} />, label: 'Registration', val: 'Open Now' },
  { icon: <Award size={16} />, label: 'Awards', val: 'Medals & E-Certificates for Top 4' },
]

const categories = ['Kata', 'Kumite', 'Team Kata', 'Team Kumite']

const registerLinks = [
  { label: 'Team Register', sub: 'Register your full team', href: '/register/team', Icon: Users },
  { label: 'Athlete Register', sub: 'All age categories & events', href: ATHLETE_FORM, Icon: Swords },
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

        {/* Event card — Ewent.la style, clickable */}
        <div
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }}
          className="group block max-w-sm mx-auto cursor-pointer focus:outline-none"
        >
          {/* Poster */}
          <div className="relative overflow-hidden border border-[#C9A84C]/15 bg-black transition-all duration-300 group-hover:border-[#C8102E]/60 group-hover:shadow-[0_20px_50px_-20px_rgba(200,16,46,0.55)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/posterweb.jpeg" alt="Vientiane Open Karate Championships 2026 poster" className="w-full aspect-[5/7] object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute top-3 left-0 bg-[#C8102E] text-white font-bebas text-sm tracking-widest px-3 py-1 shadow-lg" style={{ clipPath: 'polygon(0 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>29–30 AUG 2026</span>
          </div>

          {/* Info */}
          <div className="pt-4">
            <div className="font-condensed text-sm tracking-wide text-[#34d399]">Sat 29 – Sun 30 August, 2026</div>
            <h3 className="font-condensed text-lg sm:text-xl font-semibold uppercase tracking-wide text-white leading-snug mt-1 group-hover:text-[#C9A84C] transition-colors">
              Vientiane Open Karate Championships 2026
            </h3>
            <div className="flex items-start gap-1.5 text-sm text-white/55 mt-2">
              <MapPin size={15} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
              Vientiane Center Mall, Vientiane, Laos
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 font-condensed text-[11px] tracking-[2px] uppercase text-white/35 group-hover:text-[#C9A84C] transition-colors">
              <span className="w-1 h-1 rounded-full bg-[#C8102E]" /> Click for details &amp; registration
            </div>
          </div>
        </div>
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
                  Kata and Kumite competition. Open to every age group from Under&nbsp;6 to Senior, Male and Female, under official
                  WKF&nbsp;/&nbsp;AKF competition rules. Register your athletes, team, officials and referees below.
                </p>

                {/* categories */}
                <div className="mb-5">
                  <div className="font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-2 flex items-center gap-2"><Users size={14} /> Events &amp; Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(c => (
                      <span key={c} className="font-condensed text-[10px] tracking-[2px] uppercase bg-[#C8102E]/15 border border-[#C8102E]/30 text-[#C8102E] px-2.5 py-1">{c}</span>
                    ))}
                    <span className="font-condensed text-[10px] tracking-[2px] uppercase bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] px-2.5 py-1">9 Age Groups · U6 → Senior</span>
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
