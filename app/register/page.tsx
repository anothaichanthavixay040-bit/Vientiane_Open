'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { categories, ageOn, categoriesForAge, AGE_REFERENCE } from '@/lib/categories'
import { EventCheckboxes } from '@/components/EventCheckboxes'
import { CheckCircle2, AlertTriangle, ArrowRight, Loader2, Check } from 'lucide-react'

type Team = { id: string; name: string }

const inputCls = 'w-full bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C8102E] transition-colors'
const labelCls = 'font-condensed text-[11px] tracking-[2px] uppercase text-[#C9A84C] mb-1.5 block'

// weight list derived from category + gender (tolerant of Senior↔Seniors etc.)
const norm = (s: string) => s.toLowerCase().replace(/s\b/, '').replace('under', 'u').replace(/\s+/g, '')
function weightsFor(catName: string, gender: string): string[] {
  const cat = categories.find(c => norm(c.name) === norm(catName || ''))
  return cat ? (gender === 'female' ? cat.femaleWeights : cat.maleWeights) : []
}

type Form = {
  name: string; gender: 'male' | 'female'; dateOfBirth: string; passportNo: string;
  country: string; teamRegistrationId: string;
  events: string[]; weightClass: string; category: string
}
const blank: Form = { name: '', gender: 'male', dateOfBirth: '', passportNo: '', country: '', teamRegistrationId: '', events: ['Kumite'], weightClass: '', category: '' }

export default function RegisterPage() {
  const [form, setForm] = useState<Form>(blank)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null) // registered athlete name
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    fetch('/api/teams').then(r => r.json()).then(d => { if (Array.isArray(d)) setTeams(d) }).catch(() => {})
  }, [])

  const set = (patch: Partial<Form>) => setForm(f => ({ ...f, ...patch }))
  const age = form.dateOfBirth ? ageOn(form.dateOfBirth) : null
  const catOptions = age != null ? categoriesForAge(age) : []   // eligible categories for this age
  const canPickCategory = catOptions.length > 1
  // From 18 up the athlete may enter Under 21, Seniors, or both — honour whatever
  // valid picks are stored, defaulting to the first option. Kept in catOptions order.
  const chosen = form.category.split(',').map(s => s.trim()).filter(c => catOptions.includes(c))
  const selectedCats = chosen.length ? catOptions.filter(c => chosen.includes(c)) : catOptions.slice(0, 1)
  const category = selectedCats.join(', ')   // what we store/submit (may be both divisions)
  const primaryCat = selectedCats[0] || ''   // Under 21 & Seniors share weights
  const needsWeight = form.events.includes('Kumite')        // only individual Kumite has a weight class
  const weights = weightsFor(primaryCat, form.gender)

  // Toggle a division on/off, keeping at least one selected (18+ may pick both).
  const toggleCat = (c: string) => {
    const on = selectedCats.includes(c)
    const next = catOptions.filter(x => (x === c ? !on : selectedCats.includes(x)))
    if (!next.length) return   // never leave zero divisions selected
    set({ category: next.join(', '), weightClass: '' })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { setError('Please enter the athlete’s full name.'); return }
    if (!form.dateOfBirth || !category) { setError('Please enter a valid date of birth.'); return }
    if (!form.events.length) { setError('Please select at least one event.'); return }
    if (needsWeight && !form.weightClass) { setError('Please select a weight class for Kumite.'); return }
    setSubmitting(true); setError(null)
    try {
      const res = await fetch('/api/athletes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Category is derived from age; weight class only applies to individual Kumite.
        body: JSON.stringify({ ...form, category, weightClass: needsWeight ? form.weightClass : '', events: form.events.join(', ') }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) { setError(data.error || 'Registration failed. Please try again.'); return }
      setDone(form.name.trim())
      setForm(blank)
    } catch {
      setError('Could not reach the server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <section className="relative py-16 sm:py-20 px-4 bg-[#0a0a0a] grid-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 40%, rgba(200,16,46,0.13) 0%, transparent 62%)' }} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 font-condensed text-[11px] tracking-[4px] uppercase text-[#C9A84C] border border-[#C9A84C]/40 px-4 py-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8102E] live-pulse" /> Vientiane Open 2026
          </div>
          <h1 className="font-bebas text-5xl sm:text-6xl text-white tracking-widest">ATHLETE <span className="text-[#C8102E]">REGISTRATION</span></h1>
          <p className="text-sm text-white/50 mt-3 max-w-md mx-auto">Register an athlete for the championship. Your details are saved securely and confirmed by the organizing committee.</p>
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
              <p className="text-sm text-white/60 mb-6"><span className="text-white font-semibold">{done}</span> has been registered. The organizing committee will confirm your entry.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setDone(null)} className="inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-3 hover:bg-[#ff1a3a] transition-colors" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>Register Another</button>
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
                <div className="sm:col-span-2">
                  <label className={labelCls}>Full Name <span className="text-[#C8102E]">*</span> <span className="text-white/30 normal-case tracking-normal">— as in passport</span></label>
                  <input className={inputCls} value={form.name} onChange={e => set({ name: e.target.value })} placeholder="e.g. Somchai Phommavong" required />
                </div>
                <div>
                  <label className={labelCls}>Date of Birth <span className="text-[#C8102E]">*</span></label>
                  <input type="date" className={inputCls} style={{ colorScheme: 'dark' }} value={form.dateOfBirth} onChange={e => set({ dateOfBirth: e.target.value, weightClass: '' })} max={AGE_REFERENCE} required />
                </div>
                <div>
                  <label className={labelCls}>Passport / ID No.</label>
                  <input className={inputCls} value={form.passportNo} onChange={e => set({ passportNo: e.target.value })} placeholder="Passport or national ID" />
                </div>
                <div>
                  <label className={labelCls}>Gender <span className="text-[#C8102E]">*</span></label>
                  <select className={inputCls} value={form.gender} onChange={e => set({ gender: e.target.value as Form['gender'], weightClass: '' })}>
                    <option value="male">Male</option><option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Country</label>
                  <input className={inputCls} value={form.country} onChange={e => set({ country: e.target.value })} placeholder="e.g. LAO" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Team / Club</label>
                  <select className={inputCls} value={form.teamRegistrationId} onChange={e => set({ teamRegistrationId: e.target.value })}>
                    <option value="">{teams.length ? 'Individual / no team' : 'No teams registered yet'}</option>
                    {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                  {teams.length === 0 && (
                    <p className="text-xs text-white/35 mt-1.5">Belong to a team? Register it first via <Link href="/register/team" className="text-[#C9A84C] hover:underline">Team Registration</Link>.</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Category <span className="text-white/30 normal-case tracking-normal">{canPickCategory ? '— choose one or both divisions (age qualifies for both)' : `— auto-assigned from age on ${AGE_REFERENCE}`}</span></label>
                  {canPickCategory ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {catOptions.map(c => {
                          const on = selectedCats.includes(c)
                          return (
                            <button type="button" key={c} onClick={() => toggleCat(c)} aria-pressed={on}
                              className={`flex items-center gap-2.5 border px-3 py-2.5 text-left transition-colors ${on ? 'border-[#C8102E] bg-[#C8102E]/10' : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/50'}`}>
                              <span className={`w-4 h-4 flex-shrink-0 flex items-center justify-center border transition-colors ${on ? 'bg-[#C8102E] border-[#C8102E]' : 'border-white/30'}`}>
                                {on && <Check size={12} className="text-white" />}
                              </span>
                              <span className="text-sm text-white">{c}</span>
                            </button>
                          )
                        })}
                      </div>
                      <p className="text-xs text-white/35 mt-1.5">Age {age} on {AGE_REFERENCE} — enter Under 21, Seniors, or both.</p>
                    </>
                  ) : (
                    <div className={`${inputCls} flex items-center justify-between ${category ? '' : 'text-white/40'}`}>
                      <span>{category || 'Enter date of birth first…'}</span>
                      {category && <span className="font-condensed text-[11px] tracking-[2px] uppercase text-[#C9A84C]">Age {age}</span>}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Events <span className="text-[#C8102E]">*</span> <span className="text-white/30 normal-case tracking-normal">— choose one or more</span></label>
                  <EventCheckboxes value={form.events} onChange={events => set({ events, weightClass: '' })} />
                </div>

                {/* Weight class only applies to individual Kumite */}
                {needsWeight ? (
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Weight Class <span className="text-[#C8102E]">*</span></label>
                    <select className={inputCls} value={form.weightClass} onChange={e => set({ weightClass: e.target.value })} required disabled={!category}>
                      <option value="">{category ? 'Select weight…' : 'Enter date of birth first…'}</option>
                      {weights.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className="sm:col-span-2 flex items-center gap-2 text-xs text-white/40 bg-[#1a1a1a] border border-white/5 px-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" /> No individual Kumite selected — no weight class needed.
                  </div>
                )}
              </div>

              <button type="submit" disabled={submitting}
                className="mt-7 w-full inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-4 hover:bg-[#ff1a3a] transition-colors disabled:opacity-50 group"
                style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <>Complete Registration <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>

              <p className="text-xs text-white/35 mt-4 text-center leading-relaxed">
                Registering a team, official, referee or hotel? Use the{' '}
                <Link href="/events" className="text-[#C9A84C] hover:underline">event page links</Link>.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
