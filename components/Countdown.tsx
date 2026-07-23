'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

// Registration deadline — 15 August 2026 (end of day, local).
const DEADLINE = new Date('2026-08-15T23:59:59+07:00').getTime()

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  }
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const closed = now !== null && now >= DEADLINE
  const t = parts((now ?? DEADLINE) < DEADLINE ? DEADLINE - (now ?? DEADLINE) : 0)
  const units: [number, string][] = [[t.days, 'Days'], [t.hours, 'Hrs'], [t.mins, 'Min'], [t.secs, 'Sec']]

  return (
    <section className="relative px-4 py-10 sm:py-12 bg-[#0a0a0a] border-y border-[#C9A84C]/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 font-condensed text-[11px] tracking-[3px] uppercase text-[#C9A84C] mb-2">
            <Clock size={14} /> {closed ? 'Registration Closed' : 'Registration Closes In'}
          </div>
          <div className="font-condensed text-sm text-white/60">
            Deadline <span className="text-white font-semibold">15 August 2026</span> · Online only — please register early.
          </div>
        </div>

        {closed ? (
          <div className="font-bebas text-3xl sm:text-4xl text-[#C8102E] tracking-widest">REGISTRATION CLOSED</div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-4">
            {units.map(([val, label], i) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <div className="text-center min-w-[54px] sm:min-w-[64px] bg-[#141414] border border-[#C9A84C]/20 px-2 py-2.5">
                  <div className="font-bebas text-3xl sm:text-4xl text-white tracking-wider tabular-nums">{now === null ? '––' : String(val).padStart(2, '0')}</div>
                  <div className="font-condensed text-[9px] sm:text-[10px] tracking-[2px] uppercase text-[#C9A84C]/80 mt-0.5">{label}</div>
                </div>
                {i < units.length - 1 && <span className="font-bebas text-2xl sm:text-3xl text-[#C8102E]/60">:</span>}
              </div>
            ))}
          </div>
        )}

        {!closed && (
          <Link href="/register" className="inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-3.5 hover:bg-[#ff1a3a] transition-colors group flex-shrink-0" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
            Register Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </section>
  )
}
