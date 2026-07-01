'use client'
import { useState, useEffect, useCallback } from 'react'
import { Athlete } from '@/types'
import { categories } from '@/lib/categories'
import { EventCheckboxes } from '@/components/EventCheckboxes'
import { Plus, Pencil, Trash2, X, Save, AlertTriangle, Users, CheckCircle2, ClipboardList, Search } from 'lucide-react'

type Registration = {
  id: string; type: string; name: string; email?: string; phone?: string;
  country?: string; organization?: string; role?: string; quantity?: number; notes?: string;
  status: string; created_at: string
}

/* ---------- helpers ---------- */
const inputCls = 'w-full bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm font-condensed px-3 py-2 focus:outline-none focus:border-[#C8102E]'
const labelCls = 'font-condensed text-[10px] tracking-[2px] uppercase text-[#C9A84C] mb-1 block'
const catNames = categories.map(c => c.name)

const norm = (s: string) => s.toLowerCase().replace(/s\b/, '').replace('under', 'u').replace(/\s+/g, '')
function weightsFor(catName: string, gender: string): string[] {
  const cat = categories.find(c => norm(c.name) === norm(catName || ''))
  const list = cat ? (gender === 'female' ? cat.femaleWeights : cat.maleWeights) : []
  if (list.length) return list
  const all = new Set<string>()
  categories.forEach(c => [...c.femaleWeights, ...c.maleWeights].forEach(w => all.add(w)))
  return Array.from(all)
}
const withCurrent = (opts: string[], cur?: string) => (cur && !opts.includes(cur) ? [cur, ...opts] : opts)

type AthleteForm = Athlete
const blankAthlete = (): AthleteForm => ({
  id: '', name: '', country: '', category: 'Seniors', weightClass: '', gender: 'male', qrCode: '', checkedIn: false, teamName: '', bib: '', events: '', dateOfBirth: '', passportNo: '',
})

export default function AdminPage() {
  const [tab, setTab] = useState<'athletes' | 'registrations'>('athletes')
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [athleteForm, setAthleteForm] = useState<AthleteForm | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [query, setQuery] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [genderFilter, setGenderFilter] = useState('all')

  const q = query.trim().toLowerCase()
  const has = (v: unknown) => String(v ?? '').toLowerCase().includes(q)
  // category options from athletes actually present (fallback to official list)
  const athleteCats = Array.from(new Set(athletes.map(a => a.category).filter(Boolean)))
  const filteredAthletes = athletes.filter(a =>
    (!q || [a.name, a.teamName, a.country, a.category, a.weightClass, a.gender, a.passportNo, a.dateOfBirth, a.events, a.bib].some(has)) &&
    (catFilter === 'all' || a.category === catFilter) &&
    (genderFilter === 'all' || a.gender === genderFilter)
  )
  const filteredRegistrations = q
    ? registrations.filter(r => [r.name, r.type, r.organization, r.role, r.email, r.phone, r.country, r.notes].some(has))
    : registrations

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [aRes, rRes] = await Promise.all([fetch('/api/athletes'), fetch('/api/registrations')])
      const aData = await aRes.json().catch(() => null)
      const rData = await rRes.json().catch(() => null)
      if (!aRes.ok || !Array.isArray(aData)) { setError(aData?.error || 'Failed to load athletes'); setAthletes([]) }
      else { setAthletes(aData); setError(null) }
      if (rRes.ok && Array.isArray(rData)) setRegistrations(rData)
    } catch { setError('Could not reach the server') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const setAF = (patch: Partial<AthleteForm>) => setAthleteForm(f => f ? { ...f, ...patch } : f)

  const submitAthlete = async () => {
    if (!athleteForm) return
    if (!athleteForm.name) { setError('Athlete name is required'); return }
    const dup = athletes.find(a => a.name.trim().toLowerCase() === athleteForm.name.trim().toLowerCase() && a.id !== athleteForm.id)
    if (dup) { setError(`An athlete named "${athleteForm.name}" already exists (bib ${dup.bib || '—'}). Edit that one instead.`); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/athletes', { method: athleteForm.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(athleteForm) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Save failed'); return }
      setAthleteForm(null); setError(null); await load()
    } catch { setError('Save failed') } finally { setSubmitting(false) }
  }
  const deleteAthlete = async (id: string) => {
    if (!confirm('Delete this athlete?')) return
    setAthletes(prev => prev.filter(a => a.id !== id))
    try { const res = await fetch(`/api/athletes?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); if (!res.ok) { await load() } } catch { await load() }
  }
  const deleteRegistration = async (id: string, type: string) => {
    if (!confirm('Delete this registration?')) return
    setRegistrations(prev => prev.filter(r => r.id !== id))
    try { const res = await fetch(`/api/registrations?id=${encodeURIComponent(id)}&type=${encodeURIComponent(type)}`, { method: 'DELETE' }); if (!res.ok) { await load() } } catch { await load() }
  }

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-2">Admin Panel</div>
          <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">EVENT <span className="text-[#C8102E]">MANAGEMENT</span></h1>
        </div>

        {/* tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {([['athletes', 'Athletes', <Users key="u" size={15} />], ['registrations', 'Registrations', <ClipboardList key="r" size={15} />]] as const).map(([id, label, icon]) => (
            <button key={id} onClick={() => { setTab(id); setError(null); setAthleteForm(null) }}
              className={`inline-flex items-center gap-2 font-condensed text-sm tracking-[2px] uppercase px-4 py-3 -mb-px border-b-2 transition-colors ${tab === id ? 'border-[#C8102E] text-white' : 'border-transparent text-white/40 hover:text-white'}`}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Search + filters */}
        {!loading && (
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]/70 pointer-events-none" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={tab === 'athletes' ? 'Search athletes — name, team, country, passport…' : 'Search registrations — name, type, org, email…'}
                className="w-full bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm pl-9 pr-9 py-2.5 focus:outline-none focus:border-[#C8102E] transition-colors"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><X size={15} /></button>
              )}
            </div>
            {tab === 'athletes' && (
              <div className="flex gap-3">
                <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                  className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm px-3 py-2.5 focus:outline-none focus:border-[#C8102E] transition-colors">
                  <option value="all">All categories</option>
                  {athleteCats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}
                  className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm px-3 py-2.5 focus:outline-none focus:border-[#C8102E] transition-colors">
                  <option value="all">All genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 bg-[#C8102E]/10 border border-[#C8102E]/40 text-white px-4 py-3 mb-6">
            <AlertTriangle size={18} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
            <div className="text-sm">{error}</div>
            <button onClick={() => setError(null)} className="ml-auto text-white/50 hover:text-white"><X size={16} /></button>
          </div>
        )}

        {loading && <div className="text-center text-white/40 font-condensed tracking-widest py-16">Loading…</div>}

        {/* ============ ATHLETES ============ */}
        {!loading && tab === 'athletes' && (
          <>
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-white/40 font-condensed">Enter each athlete once and classify by category &amp; weight. Duplicate names are blocked.</p>
              <button onClick={() => { setAthleteForm(blankAthlete()); setError(null) }} className="inline-flex items-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-3 hover:bg-[#ff1a3a] transition-colors" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                <Plus size={16} /> New Athlete
              </button>
            </div>

            {athleteForm && (
              <div className="bg-[#111] border border-[#C9A84C]/25 p-5 sm:p-6 mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="font-condensed text-sm tracking-[3px] uppercase text-white">{athleteForm.id ? 'Edit Athlete' : 'New Athlete'}</div>
                  <button onClick={() => setAthleteForm(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div><label className={labelCls}>Full Name</label><input className={inputCls} value={athleteForm.name} onChange={e => setAF({ name: e.target.value })} placeholder="Athlete name" /></div>
                  <div><label className={labelCls}>Team</label><input className={inputCls} value={athleteForm.teamName || ''} onChange={e => setAF({ teamName: e.target.value })} placeholder="Club / team" /></div>
                  <div><label className={labelCls}>Country</label><input className={inputCls} value={athleteForm.country} onChange={e => setAF({ country: e.target.value })} placeholder="LAO" /></div>
                  <div><label className={labelCls}>Date of Birth</label><input type="date" className={inputCls} style={{ colorScheme: 'dark' }} value={athleteForm.dateOfBirth || ''} onChange={e => setAF({ dateOfBirth: e.target.value })} /></div>
                  <div><label className={labelCls}>Passport / ID No.</label><input className={inputCls} value={athleteForm.passportNo || ''} onChange={e => setAF({ passportNo: e.target.value })} placeholder="Passport / ID" /></div>
                  <div><label className={labelCls}>Category</label>
                    <select className={inputCls} value={athleteForm.category} onChange={e => setAF({ category: e.target.value, weightClass: '' })}>
                      {withCurrent(catNames, athleteForm.category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Gender</label>
                    <select className={inputCls} value={athleteForm.gender} onChange={e => setAF({ gender: e.target.value as Athlete['gender'], weightClass: '' })}>
                      <option value="male">Male</option><option value="female">Female</option>
                    </select>
                  </div>
                  <div><label className={labelCls}>Weight Class</label>
                    <select className={inputCls} value={athleteForm.weightClass} onChange={e => setAF({ weightClass: e.target.value })}>
                      <option value="">Select weight…</option>
                      {withCurrent(weightsFor(athleteForm.category, athleteForm.gender), athleteForm.weightClass).map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <label className={labelCls}>Events</label>
                  <EventCheckboxes
                    value={(athleteForm.events || '').split(',').map(s => s.trim()).filter(Boolean)}
                    onChange={arr => setAF({ events: arr.join(', ') })}
                  />
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={submitAthlete} disabled={submitting} className="inline-flex items-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-2.5 hover:bg-[#ff1a3a] transition-colors disabled:opacity-50"><Save size={15} /> {submitting ? 'Saving…' : athleteForm.id ? 'Save Changes' : 'Create Athlete'}</button>
                  <button onClick={() => setAthleteForm(null)} className="font-condensed text-sm tracking-[3px] uppercase border border-white/20 text-white/70 px-5 py-2.5 hover:bg-white/5 transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {athletes.length === 0 && !error ? (
              <div className="text-center text-white/40 font-condensed tracking-widest py-16">No athletes yet. Click “New Athlete”.</div>
            ) : filteredAthletes.length === 0 ? (
              <div className="text-center text-white/40 font-condensed tracking-widest py-16">No athletes match your search / filters.</div>
            ) : (
              <div className="overflow-x-auto border border-[#C9A84C]/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#111] text-left font-condensed text-[10px] tracking-[2px] uppercase text-[#C9A84C]">
                      <th className="px-4 py-3">Name</th><th className="px-4 py-3 hidden sm:table-cell">Team</th>
                      <th className="px-4 py-3 hidden md:table-cell">DOB</th><th className="px-4 py-3 hidden md:table-cell">Passport</th>
                      <th className="px-4 py-3">Category</th><th className="px-4 py-3">Weight</th><th className="px-4 py-3 hidden lg:table-cell">Events</th><th className="px-4 py-3 hidden sm:table-cell">Status</th><th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAthletes.map(a => (
                      <tr key={a.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-white">{a.name} <span className="text-white/30 text-xs">{a.country}</span></td>
                        <td className="px-4 py-3 text-white/60 hidden sm:table-cell">{a.teamName || '—'}</td>
                        <td className="px-4 py-3 text-white/60 hidden md:table-cell text-xs whitespace-nowrap">{a.dateOfBirth || '—'}</td>
                        <td className="px-4 py-3 text-white/60 hidden md:table-cell text-xs">{a.passportNo || '—'}</td>
                        <td className="px-4 py-3 text-white/80">{a.category} <span className="text-white/40 text-xs uppercase">{a.gender}</span></td>
                        <td className="px-4 py-3"><span className="font-condensed text-xs tracking-widest uppercase bg-[#C8102E]/15 border border-[#C8102E]/30 text-[#C8102E] px-2 py-1">{a.weightClass || '—'}</span></td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs text-white/55 max-w-[220px]">{a.events || '—'}</td>
                        <td className="px-4 py-3 hidden sm:table-cell">{a.checkedIn ? <span className="inline-flex items-center gap-1 text-[#22c55e] text-xs"><CheckCircle2 size={14} /> In</span> : <span className="text-white/30 text-xs">—</span>}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 justify-end">
                            <button onClick={() => { setAthleteForm({ ...blankAthlete(), ...a, teamName: a.teamName || '', bib: a.bib || '' }); setError(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }} title="Edit" className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"><Pencil size={14} /></button>
                            <button onClick={() => deleteAthlete(a.id)} title="Delete" className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ============ REGISTRATIONS ============ */}
        {!loading && tab === 'registrations' && (
          <>
            <p className="text-sm text-white/40 font-condensed mb-5">Team, officials, referee and hotel submissions from the public registration forms.</p>
            {registrations.length === 0 && !error ? (
              <div className="text-center text-white/40 font-condensed tracking-widest py-16">No registrations yet.</div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="text-center text-white/40 font-condensed tracking-widest py-16">No registrations match “{query}”.</div>
            ) : (
              <div className="overflow-x-auto border border-[#C9A84C]/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#111] text-left font-condensed text-[10px] tracking-[2px] uppercase text-[#C9A84C]">
                      <th className="px-4 py-3">Type</th><th className="px-4 py-3">Name</th><th className="px-4 py-3 hidden sm:table-cell">Org / Role</th>
                      <th className="px-4 py-3 hidden md:table-cell">Contact</th><th className="px-4 py-3 hidden lg:table-cell">Notes</th><th className="px-4 py-3">Date</th><th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map(r => (
                      <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.02] align-top">
                        <td className="px-4 py-3"><span className="font-condensed text-[10px] tracking-widest uppercase bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] px-2 py-1">{r.type}</span></td>
                        <td className="px-4 py-3 text-white">{r.name}{r.country ? <span className="text-white/30 text-xs"> · {r.country}</span> : null}{r.quantity ? <span className="text-white/40 text-xs"> · ×{r.quantity}</span> : null}</td>
                        <td className="px-4 py-3 text-white/60 hidden sm:table-cell">{r.organization || '—'}{r.role ? <span className="block text-[#C8102E] text-xs">{r.role}</span> : null}</td>
                        <td className="px-4 py-3 text-white/60 hidden md:table-cell text-xs">{r.email || '—'}{r.phone ? <span className="block">{r.phone}</span> : null}</td>
                        <td className="px-4 py-3 text-white/50 hidden lg:table-cell text-xs max-w-[180px] truncate">{r.notes || '—'}</td>
                        <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end">
                            <button onClick={() => deleteRegistration(r.id, r.type)} title="Delete" className="w-8 h-8 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
