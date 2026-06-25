'use client'
import { useState, useEffect, useCallback } from 'react'
import { MatchResult, Athlete } from '@/types'
import { categories } from '@/lib/categories'
import { Plus, Pencil, Trash2, X, Save, AlertTriangle, Swords, Users, CheckCircle2 } from 'lucide-react'

/* ---------- helpers ---------- */
const inputCls = 'w-full bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm font-condensed px-3 py-2 focus:outline-none focus:border-[#C8102E]'
const labelCls = 'font-condensed text-[10px] tracking-[2px] uppercase text-[#C9A84C] mb-1 block'
const catNames = categories.map(c => c.name)

// Match athlete -> official weight list, tolerant of naming (Senior↔Seniors, U14↔Under 14)
const norm = (s: string) => s.toLowerCase().replace(/s\b/, '').replace('under', 'u').replace(/\s+/g, '')
function weightsFor(catName: string, gender: string): string[] {
  const cat = categories.find(c => norm(c.name) === norm(catName || ''))
  const list = cat ? (gender === 'female' ? cat.femaleWeights : cat.maleWeights) : []
  if (list.length) return list
  const all = new Set<string>()
  categories.forEach(c => [...c.femaleWeights, ...c.maleWeights].forEach(w => all.add(w)))
  return Array.from(all)
}
// ensure a current value is always selectable even if not in the option list
const withCurrent = (opts: string[], cur?: string) => (cur && !opts.includes(cur) ? [cur, ...opts] : opts)

/* ---------- form types ---------- */
type MatchForm = MatchResult
type AthleteForm = Athlete

const blankMatch = (): MatchForm => ({
  id: '', category: 'Seniors', weightClass: '', gender: 'male', round: '', redAthlete: '', blueAthlete: '',
  redScore: 0, blueScore: 0, status: 'scheduled', mat: 1, startTime: '', winner: '',
})
const blankAthlete = (): AthleteForm => ({
  id: '', name: '', country: '', category: 'Seniors', weightClass: '', gender: 'male', qrCode: '', checkedIn: false, teamName: '', bib: '',
})

export default function AdminPage() {
  const [tab, setTab] = useState<'matches' | 'athletes'>('matches')
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  const [matchForm, setMatchForm] = useState<MatchForm | null>(null)
  const [athleteForm, setAthleteForm] = useState<AthleteForm | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [mRes, aRes] = await Promise.all([fetch('/api/results'), fetch('/api/athletes')])
      const mData = await mRes.json().catch(() => null)
      const aData = await aRes.json().catch(() => null)
      if (!mRes.ok || !Array.isArray(mData)) { setError(mData?.error || 'Failed to load matches'); setMatches([]) }
      else { setMatches(mData) }
      if (aRes.ok && Array.isArray(aData)) setAthletes(aData)
      if ((mRes.ok && Array.isArray(mData))) setError(null)
    } catch { setError('Could not reach the server') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  /* ---------- match actions ---------- */
  const updateMatch = async (id: string, patch: Partial<MatchResult>) => {
    setSaving(id)
    setMatches(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
    try {
      const res = await fetch('/api/results', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...patch }) })
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || 'Update failed'); await load() }
    } catch { setError('Update failed'); await load() }
    finally { setSaving(null) }
  }
  const submitMatch = async () => {
    if (!matchForm) return
    if (!matchForm.category || !matchForm.redAthlete || !matchForm.blueAthlete) { setError('Category, Red athlete and Blue athlete are required'); return }
    if (matchForm.redAthlete === matchForm.blueAthlete) { setError('Red and Blue must be different athletes'); return }
    setSubmitting(true)
    try {
      const res = await fetch('/api/results', { method: matchForm.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(matchForm) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Save failed'); return }
      setMatchForm(null); setError(null); await load()
    } catch { setError('Save failed') } finally { setSubmitting(false) }
  }
  const deleteMatch = async (id: string) => {
    if (!confirm('Delete this match?')) return
    setMatches(prev => prev.filter(r => r.id !== id))
    try { const res = await fetch(`/api/results?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); if (!res.ok) { await load() } } catch { await load() }
  }

  /* ---------- athlete actions ---------- */
  const submitAthlete = async () => {
    if (!athleteForm) return
    if (!athleteForm.name) { setError('Athlete name is required'); return }
    // protect data: block duplicate names (except when editing the same record)
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

  const setMF = (patch: Partial<MatchForm>) => setMatchForm(f => f ? { ...f, ...patch } : f)
  const setAF = (patch: Partial<AthleteForm>) => setAthleteForm(f => f ? { ...f, ...patch } : f)

  // pick an athlete in the match form -> auto classify category/weight/gender from their record
  const pickMatchAthlete = (side: 'red' | 'blue', name: string) => {
    const a = athletes.find(x => x.name === name)
    const patch: Partial<MatchForm> = side === 'red' ? { redAthlete: name } : { blueAthlete: name }
    if (a && side === 'red') { patch.category = a.category; patch.weightClass = a.weightClass; patch.gender = a.gender }
    setMF(patch)
  }

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="mb-6">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-2">Admin Panel</div>
          <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">EVENT <span className="text-[#C8102E]">MANAGEMENT</span></h1>
        </div>

        {/* tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10">
          {([['matches', 'Matches', <Swords key="s" size={15} />], ['athletes', 'Athletes', <Users key="u" size={15} />]] as const).map(([id, label, icon]) => (
            <button key={id} onClick={() => { setTab(id); setError(null); setMatchForm(null); setAthleteForm(null) }}
              className={`inline-flex items-center gap-2 font-condensed text-sm tracking-[2px] uppercase px-4 py-3 -mb-px border-b-2 transition-colors ${tab === id ? 'border-[#C8102E] text-white' : 'border-transparent text-white/40 hover:text-white'}`}>
              {icon} {label}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-[#C8102E]/10 border border-[#C8102E]/40 text-white px-4 py-3 mb-6">
            <AlertTriangle size={18} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
            <div className="text-sm">{error}</div>
            <button onClick={() => setError(null)} className="ml-auto text-white/50 hover:text-white"><X size={16} /></button>
          </div>
        )}

        {loading && <div className="text-center text-white/40 font-condensed tracking-widest py-16">Loading…</div>}

        {/* ============ MATCHES ============ */}
        {!loading && tab === 'matches' && (
          <>
            <div className="flex justify-between items-center mb-5">
              <p className="text-sm text-white/40 font-condensed">Pick athletes from the roster — names are never re-typed, so data stays consistent.</p>
              <button onClick={() => { setMatchForm(blankMatch()); setError(null) }} disabled={athletes.length === 0}
                className="inline-flex items-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-3 hover:bg-[#ff1a3a] transition-colors disabled:opacity-40" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
                <Plus size={16} /> New Match
              </button>
            </div>
            {athletes.length === 0 && <div className="text-sm text-[#C9A84C] mb-5">Add athletes first (Athletes tab) — matches are built from the roster.</div>}

            {matchForm && (
              <div className="bg-[#111] border border-[#C9A84C]/25 p-5 sm:p-6 mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="font-condensed text-sm tracking-[3px] uppercase text-white">{matchForm.id ? 'Edit Match' : 'New Match'}</div>
                  <button onClick={() => setMatchForm(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div><label className={labelCls}>Red Athlete</label>
                    <select className={inputCls} value={matchForm.redAthlete} onChange={e => pickMatchAthlete('red', e.target.value)}>
                      <option value="">Select athlete…</option>
                      {athletes.map(a => <option key={a.id} value={a.name}>{a.name} · {a.weightClass} · {a.teamName || a.country}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Blue Athlete</label>
                    <select className={inputCls} value={matchForm.blueAthlete} onChange={e => pickMatchAthlete('blue', e.target.value)}>
                      <option value="">Select athlete…</option>
                      {athletes.map(a => <option key={a.id} value={a.name}>{a.name} · {a.weightClass} · {a.teamName || a.country}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Round</label><input className={inputCls} value={matchForm.round} onChange={e => setMF({ round: e.target.value })} placeholder="Quarter Final" /></div>
                  <div><label className={labelCls}>Category <span className="text-white/30">(auto)</span></label>
                    <select className={inputCls} value={matchForm.category} onChange={e => setMF({ category: e.target.value, weightClass: '' })}>
                      {withCurrent(catNames, matchForm.category).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Gender <span className="text-white/30">(auto)</span></label>
                    <select className={inputCls} value={matchForm.gender} onChange={e => setMF({ gender: e.target.value, weightClass: '' })}>
                      <option value="male">Male</option><option value="female">Female</option>
                    </select>
                  </div>
                  <div><label className={labelCls}>Weight Class <span className="text-white/30">(auto)</span></label>
                    <select className={inputCls} value={matchForm.weightClass} onChange={e => setMF({ weightClass: e.target.value })}>
                      <option value="">—</option>
                      {withCurrent(weightsFor(matchForm.category, matchForm.gender), matchForm.weightClass).map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Mat</label><input type="number" min={1} className={inputCls} value={matchForm.mat} onChange={e => setMF({ mat: Number(e.target.value) })} /></div>
                  <div><label className={labelCls}>Start Time</label><input className={inputCls} value={matchForm.startTime || ''} onChange={e => setMF({ startTime: e.target.value })} placeholder="09:00" /></div>
                  <div><label className={labelCls}>Status</label>
                    <select className={inputCls} value={matchForm.status} onChange={e => setMF({ status: e.target.value as MatchResult['status'] })}>
                      <option value="scheduled">Upcoming</option><option value="live">Live</option><option value="completed">Final</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={submitMatch} disabled={submitting} className="inline-flex items-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-2.5 hover:bg-[#ff1a3a] transition-colors disabled:opacity-50"><Save size={15} /> {submitting ? 'Saving…' : matchForm.id ? 'Save Changes' : 'Create Match'}</button>
                  <button onClick={() => setMatchForm(null)} className="font-condensed text-sm tracking-[3px] uppercase border border-white/20 text-white/70 px-5 py-2.5 hover:bg-white/5 transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {matches.length === 0 && !error ? (
              <div className="text-center text-white/40 font-condensed tracking-widest py-16">No matches yet.</div>
            ) : (
              <div className="space-y-4">
                {matches.map(match => (
                  <div key={match.id} className={`bg-[#111] border p-5 ${match.status === 'live' ? 'border-[#C8102E]/40' : 'border-[#C9A84C]/10'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="font-condensed text-sm tracking-widest uppercase text-white">{match.round} · {match.category} {match.weightClass} {match.gender}</div>
                        <div className="font-condensed text-xs text-white/40 mt-0.5">MAT {match.mat}{match.startTime ? ` · ${match.startTime}` : ''}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select value={match.status} onChange={e => updateMatch(match.id, { status: e.target.value as MatchResult['status'] })} className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-xs font-condensed tracking-widest uppercase px-3 py-2 focus:outline-none">
                          <option value="scheduled">UPCOMING</option><option value="live">LIVE</option><option value="completed">FINAL</option>
                        </select>
                        <button onClick={() => { setMatchForm({ ...blankMatch(), ...match, winner: match.winner || '', startTime: match.startTime || '' }); setError(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }} title="Edit" className="w-9 h-9 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"><Pencil size={15} /></button>
                        <button onClick={() => deleteMatch(match.id)} title="Delete" className="w-9 h-9 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors"><Trash2 size={15} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-[#C8102E] rounded-full flex-shrink-0" />
                        <span className="font-condensed text-sm text-white flex-1">{match.redAthlete}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateMatch(match.id, { redScore: Math.max(0, match.redScore - 1) })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C8102E]/20 transition-colors font-bebas text-lg">−</button>
                          <span className="font-bebas text-3xl text-[#C8102E] w-10 text-center">{match.redScore}</span>
                          <button onClick={() => updateMatch(match.id, { redScore: match.redScore + 1 })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#22c55e]/20 transition-colors font-bebas text-lg">+</button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-[#3b82f6] rounded-full flex-shrink-0" />
                        <span className="font-condensed text-sm text-white flex-1">{match.blueAthlete}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateMatch(match.id, { blueScore: Math.max(0, match.blueScore - 1) })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C8102E]/20 transition-colors font-bebas text-lg">−</button>
                          <span className="font-bebas text-3xl text-[#3b82f6] w-10 text-center">{match.blueScore}</span>
                          <button onClick={() => updateMatch(match.id, { blueScore: match.blueScore + 1 })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#22c55e]/20 transition-colors font-bebas text-lg">+</button>
                        </div>
                      </div>
                    </div>
                    {match.status === 'completed' && (
                      <div className="mt-4">
                        <select value={match.winner || ''} onChange={e => updateMatch(match.id, { winner: e.target.value })} className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-xs font-condensed px-3 py-2 w-full focus:outline-none">
                          <option value="">Select Winner</option>
                          <option value={match.redAthlete}>{match.redAthlete} (Red)</option>
                          <option value={match.blueAthlete}>{match.blueAthlete} (Blue)</option>
                        </select>
                      </div>
                    )}
                    {saving === match.id && <div className="mt-2 font-condensed text-[10px] tracking-[3px] text-[#22c55e] uppercase">Saving…</div>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

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
                  <div><label className={labelCls}>Bib No.</label><input className={inputCls} value={athleteForm.bib || ''} onChange={e => setAF({ bib: e.target.value })} placeholder="101" /></div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={submitAthlete} disabled={submitting} className="inline-flex items-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-2.5 hover:bg-[#ff1a3a] transition-colors disabled:opacity-50"><Save size={15} /> {submitting ? 'Saving…' : athleteForm.id ? 'Save Changes' : 'Create Athlete'}</button>
                  <button onClick={() => setAthleteForm(null)} className="font-condensed text-sm tracking-[3px] uppercase border border-white/20 text-white/70 px-5 py-2.5 hover:bg-white/5 transition-colors">Cancel</button>
                </div>
              </div>
            )}

            {athletes.length === 0 && !error ? (
              <div className="text-center text-white/40 font-condensed tracking-widest py-16">No athletes yet. Click “New Athlete”.</div>
            ) : (
              <div className="overflow-x-auto border border-[#C9A84C]/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#111] text-left font-condensed text-[10px] tracking-[2px] uppercase text-[#C9A84C]">
                      <th className="px-4 py-3">Bib</th><th className="px-4 py-3">Name</th><th className="px-4 py-3 hidden sm:table-cell">Team</th>
                      <th className="px-4 py-3">Category</th><th className="px-4 py-3">Weight</th><th className="px-4 py-3 hidden sm:table-cell">Status</th><th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {athletes.map(a => (
                      <tr key={a.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-bebas text-lg text-[#C9A84C]">{a.bib || '—'}</td>
                        <td className="px-4 py-3 text-white">{a.name} <span className="text-white/30 text-xs">{a.country}</span></td>
                        <td className="px-4 py-3 text-white/60 hidden sm:table-cell">{a.teamName || '—'}</td>
                        <td className="px-4 py-3 text-white/80">{a.category} <span className="text-white/40 text-xs uppercase">{a.gender}</span></td>
                        <td className="px-4 py-3"><span className="font-condensed text-xs tracking-widest uppercase bg-[#C8102E]/15 border border-[#C8102E]/30 text-[#C8102E] px-2 py-1">{a.weightClass || '—'}</span></td>
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
      </div>
    </div>
  )
}
