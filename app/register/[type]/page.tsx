'use client'
import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { REG_TYPES, RegField } from '@/lib/registrationTypes'
import { CheckCircle2, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react'

const inputCls = 'w-full bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors'
const labelCls = 'font-condensed text-[11px] tracking-[2px] uppercase text-[#C9A84C] mb-1.5 block'

export default function RegisterTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params)
  const cfg = REG_TYPES[type]
  if (!cfg) notFound()

  const [values, setValues] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => setValues(prev => ({ ...prev, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    for (const f of cfg.fields) {
      if (f.required && !values[f.key]?.trim()) { setError(`${f.label} is required.`); return }
    }
    setSubmitting(true); setError(null)
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: cfg.type, ...values }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error || 'Registration failed. Please try again.'); return }
      setDone(true); setValues({})
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const renderField = (f: RegField) => {
    const common = { value: values[f.key] || '', required: f.required }
    return (
      <div key={f.key} className={f.full ? 'sm:col-span-2' : ''}>
        <label className={labelCls}>{f.label} {f.required && <span className="text-[#C8102E]">*</span>}</label>
        {f.type === 'select' ? (
          <select className={inputCls} {...common} onChange={e => set(f.key, e.target.value)}>
            <option value="">Select…</option>
            {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : f.type === 'textarea' ? (
          <textarea className={inputCls} rows={3} {...common} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)} />
        ) : (
          <input className={inputCls} type={f.type} {...common} placeholder={f.placeholder} onChange={e => set(f.key, e.target.value)} />
        )}
      </div>
    )
  }

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a]">
      <section className="relative py-16 sm:py-20 px-4 bg-[#0a0a0a] grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(200,16,46,0.13) 0%, transparent 62%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-3">{cfg.emoji}</div>
          <h1 className="font-bebas text-5xl sm:text-6xl text-white tracking-widest">{cfg.title.split(' ').slice(0, -1).join(' ')} <span className="text-[#C8102E]">{cfg.title.split(' ').slice(-1)}</span></h1>
          <p className="text-sm text-white/50 mt-3 max-w-md mx-auto">{cfg.blurb}</p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          {done ? (
            <div className="bg-[#111] border border-[#22c55e]/30 p-8 sm:p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={32} className="text-[#22c55e]" />
              </div>
              <h2 className="font-bebas text-3xl text-white tracking-widest mb-2">Registration Received</h2>
              <p className="text-sm text-white/60 mb-6">Your {cfg.type} registration has been submitted. The organizing committee will be in touch to confirm.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setDone(false)} className="inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-3 hover:bg-[#ff1a3a] transition-colors" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>Submit Another</button>
                <Link href="/events" className="inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase border border-[#C9A84C] text-[#C9A84C] px-6 py-3 hover:bg-[#C9A84C]/10 transition-colors" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>View Event</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-[#111] border border-[#C9A84C]/15 p-6 sm:p-8">
              {error && (
                <div className="flex items-start gap-3 bg-[#C8102E]/10 border border-[#C8102E]/40 text-white px-4 py-3 mb-6">
                  <AlertTriangle size={18} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
                  <div className="text-sm">{error}</div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {cfg.fields.map(renderField)}
              </div>
              <button type="submit" disabled={submitting}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-4 hover:bg-[#ff1a3a] transition-colors disabled:opacity-50 group"
                style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <>Complete Registration <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
              <p className="text-xs text-white/35 mt-4 text-center">
                Looking to register an athlete? <Link href="/register" className="text-[#C9A84C] hover:underline">Athlete registration →</Link>
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
