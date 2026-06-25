'use client'
import { useState, useEffect, useCallback } from 'react'
import { MatchResult } from '@/types'
import { Plus, Pencil, Trash2, X, Save, AlertTriangle } from 'lucide-react'

type FormState = Omit<MatchResult, 'redScore' | 'blueScore'> & { redScore: number; blueScore: number }

const blankForm = (): FormState => ({
  id: '', category: 'Senior', weightClass: '', gender: 'male', round: '', redAthlete: '', blueAthlete: '',
  redScore: 0, blueScore: 0, status: 'scheduled', mat: 1, startTime: '', winner: '',
})

const inputCls = 'w-full bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-sm font-condensed px-3 py-2 focus:outline-none focus:border-[#C8102E]'
const labelCls = 'font-condensed text-[10px] tracking-[2px] uppercase text-[#C9A84C] mb-1 block'

export default function AdminPage() {
  const [results, setResults] = useState<MatchResult[]>([])
  const [saving, setSaving] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState | null>(null) // null = closed
  const [submitting, setSubmitting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/results')
      const data = await res.json()
      if (!res.ok || !Array.isArray(data)) {
        setError(data?.error || 'Failed to load matches')
        setResults([])
      } else {
        setError(null)
        setResults(data)
      }
    } catch {
      setError('Could not reach the server')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  // Inline update (scores, status, winner)
  const update = async (id: string, patch: Partial<MatchResult>) => {
    setSaving(id)
    setResults(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r)) // optimistic
    try {
      const res = await fetch('/api/results', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...patch }) })
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || 'Update failed'); await load() }
    } catch { setError('Update failed'); await load() }
    finally { setSaving(null) }
  }

  // Create / edit via form
  const submitForm = async () => {
    if (!form) return
    if (!form.category || !form.redAthlete || !form.blueAthlete) { setError('Category, Red athlete and Blue athlete are required'); return }
    setSubmitting(true)
    const isEdit = !!form.id
    try {
      const res = await fetch('/api/results', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Save failed'); return }
      setForm(null)
      setError(null)
      await load()
    } catch { setError('Save failed') }
    finally { setSubmitting(false) }
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this match? This cannot be undone.')) return
    setResults(prev => prev.filter(r => r.id !== id)) // optimistic
    try {
      const res = await fetch(`/api/results?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!res.ok) { const d = await res.json().catch(() => ({})); setError(d.error || 'Delete failed'); await load() }
    } catch { setError('Delete failed'); await load() }
  }

  const set = (patch: Partial<FormState>) => setForm(f => f ? { ...f, ...patch } : f)

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-2">Admin Panel</div>
            <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">MATCH <span className="text-[#C8102E]">MANAGEMENT</span></h1>
            <p className="text-sm text-white/40 mt-2 font-condensed">Create, edit, score and delete matches. Saved to Supabase; live scores broadcast to connected clients.</p>
          </div>
          <button onClick={() => { setForm(blankForm()); setError(null) }}
            className="inline-flex items-center justify-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-3 hover:bg-[#ff1a3a] transition-colors flex-shrink-0"
            style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>
            <Plus size={16} /> New Match
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-[#C8102E]/10 border border-[#C8102E]/40 text-white px-4 py-3 mb-6">
            <AlertTriangle size={18} className="text-[#C8102E] flex-shrink-0 mt-0.5" />
            <div className="text-sm">{error}</div>
            <button onClick={() => setError(null)} className="ml-auto text-white/50 hover:text-white"><X size={16} /></button>
          </div>
        )}

        {/* Create / Edit form */}
        {form && (
          <div className="bg-[#111] border border-[#C9A84C]/25 p-5 sm:p-6 mb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="font-condensed text-sm tracking-[3px] uppercase text-white">{form.id ? 'Edit Match' : 'New Match'}</div>
              <button onClick={() => setForm(null)} className="text-white/50 hover:text-white"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div><label className={labelCls}>Round</label><input className={inputCls} value={form.round} onChange={e => set({ round: e.target.value })} placeholder="Quarter Final" /></div>
              <div><label className={labelCls}>Category</label><input className={inputCls} value={form.category} onChange={e => set({ category: e.target.value })} placeholder="Senior" /></div>
              <div><label className={labelCls}>Weight Class</label><input className={inputCls} value={form.weightClass} onChange={e => set({ weightClass: e.target.value })} placeholder="-67kg" /></div>
              <div><label className={labelCls}>Gender</label>
                <select className={inputCls} value={form.gender} onChange={e => set({ gender: e.target.value })}>
                  <option value="male">Male</option><option value="female">Female</option>
                </select>
              </div>
              <div><label className={labelCls}>Mat</label><input type="number" min={1} className={inputCls} value={form.mat} onChange={e => set({ mat: Number(e.target.value) })} /></div>
              <div><label className={labelCls}>Start Time</label><input className={inputCls} value={form.startTime || ''} onChange={e => set({ startTime: e.target.value })} placeholder="09:00" /></div>
              <div><label className={labelCls}>Red Athlete</label><input className={inputCls} value={form.redAthlete} onChange={e => set({ redAthlete: e.target.value })} placeholder="Name" /></div>
              <div><label className={labelCls}>Blue Athlete</label><input className={inputCls} value={form.blueAthlete} onChange={e => set({ blueAthlete: e.target.value })} placeholder="Name" /></div>
              <div><label className={labelCls}>Status</label>
                <select className={inputCls} value={form.status} onChange={e => set({ status: e.target.value as MatchResult['status'] })}>
                  <option value="scheduled">Upcoming</option><option value="live">Live</option><option value="completed">Final</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={submitForm} disabled={submitting}
                className="inline-flex items-center gap-2 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-2.5 hover:bg-[#ff1a3a] transition-colors disabled:opacity-50">
                <Save size={15} /> {submitting ? 'Saving…' : form.id ? 'Save Changes' : 'Create Match'}
              </button>
              <button onClick={() => setForm(null)} className="font-condensed text-sm tracking-[3px] uppercase border border-white/20 text-white/70 px-5 py-2.5 hover:bg-white/5 transition-colors">Cancel</button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-white/40 font-condensed tracking-widest py-16">Loading matches…</div>
        ) : results.length === 0 && !error ? (
          <div className="text-center text-white/40 font-condensed tracking-widest py-16">No matches yet. Click “New Match” to add one.</div>
        ) : (
          <div className="space-y-4">
            {results.map(match => (
              <div key={match.id} className={`bg-[#111] border p-5 ${match.status === 'live' ? 'border-[#C8102E]/40' : 'border-[#C9A84C]/10'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="font-condensed text-sm tracking-widest uppercase text-white">{match.round} · {match.category} {match.weightClass} {match.gender}</div>
                    <div className="font-condensed text-xs text-white/40 mt-0.5">MAT {match.mat}{match.startTime ? ` · ${match.startTime}` : ''}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={match.status}
                      onChange={e => update(match.id, { status: e.target.value as MatchResult['status'] })}
                      className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-xs font-condensed tracking-widest uppercase px-3 py-2 focus:outline-none">
                      <option value="scheduled">UPCOMING</option>
                      <option value="live">LIVE</option>
                      <option value="completed">FINAL</option>
                    </select>
                    <button onClick={() => { setForm({ ...blankForm(), ...match, winner: match.winner || '', startTime: match.startTime || '' }); setError(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                      title="Edit" className="w-9 h-9 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 transition-colors"><Pencil size={15} /></button>
                    <button onClick={() => remove(match.id)} title="Delete"
                      className="w-9 h-9 flex items-center justify-center bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Red */}
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#C8102E] rounded-full flex-shrink-0" />
                    <span className="font-condensed text-sm text-white flex-1">{match.redAthlete}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => update(match.id, { redScore: Math.max(0, match.redScore - 1) })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C8102E]/20 transition-colors font-bebas text-lg">−</button>
                      <span className="font-bebas text-3xl text-[#C8102E] w-10 text-center">{match.redScore}</span>
                      <button onClick={() => update(match.id, { redScore: match.redScore + 1 })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#22c55e]/20 transition-colors font-bebas text-lg">+</button>
                    </div>
                  </div>
                  {/* Blue */}
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#3b82f6] rounded-full flex-shrink-0" />
                    <span className="font-condensed text-sm text-white flex-1">{match.blueAthlete}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => update(match.id, { blueScore: Math.max(0, match.blueScore - 1) })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C8102E]/20 transition-colors font-bebas text-lg">−</button>
                      <span className="font-bebas text-3xl text-[#3b82f6] w-10 text-center">{match.blueScore}</span>
                      <button onClick={() => update(match.id, { blueScore: match.blueScore + 1 })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#22c55e]/20 transition-colors font-bebas text-lg">+</button>
                    </div>
                  </div>
                </div>

                {match.status === 'completed' && (
                  <div className="mt-4">
                    <select value={match.winner || ''}
                      onChange={e => update(match.id, { winner: e.target.value })}
                      className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-xs font-condensed px-3 py-2 w-full focus:outline-none">
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
      </div>
    </div>
  )
}
