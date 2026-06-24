'use client'
import { useState, useEffect } from 'react'
import { MatchResult } from '@/types'

export default function AdminPage() {
  const [results, setResults] = useState<MatchResult[]>([])
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/results').then(r => r.json()).then(setResults)
  }, [])

  const update = async (id: string, patch: Partial<MatchResult>) => {
    setSaving(id)
    await fetch('/api/results', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...patch }) })
    setResults(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
    setSaving(null)
  }

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a] px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-2">Admin Panel</div>
          <h1 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest">SCORE <span className="text-[#C8102E]">MANAGEMENT</span></h1>
          <p className="text-sm text-white/40 mt-2 font-condensed">Update match scores in real-time. Changes broadcast instantly to all connected clients.</p>
        </div>

        <div className="space-y-4">
          {results.map(match => (
            <div key={match.id} className={`bg-[#111] border p-5 ${match.status === 'live' ? 'border-[#C8102E]/40' : 'border-[#C9A84C]/10'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="font-condensed text-sm tracking-widest uppercase text-white">{match.round} · {match.category} {match.weightClass} {match.gender}</div>
                  <div className="font-condensed text-xs text-white/40 mt-0.5">MAT {match.mat} · {match.startTime}</div>
                </div>
                <select value={match.status}
                  onChange={e => update(match.id, { status: e.target.value as MatchResult['status'] })}
                  className="bg-[#1a1a1a] border border-[#C9A84C]/20 text-white text-xs font-condensed tracking-widest uppercase px-3 py-2 focus:outline-none">
                  <option value="scheduled">UPCOMING</option>
                  <option value="live">LIVE</option>
                  <option value="completed">FINAL</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Red */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#C8102E] rounded-full flex-shrink-0"/>
                  <span className="font-condensed text-sm text-white flex-1">{match.redAthlete}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => update(match.id, { redScore: Math.max(0, match.redScore - 1) })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C8102E]/20 transition-colors font-bebas text-lg">−</button>
                    <span className="font-bebas text-3xl text-[#C8102E] w-10 text-center">{match.redScore}</span>
                    <button onClick={() => update(match.id, { redScore: match.redScore + 1 })} className="w-8 h-8 bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#22c55e]/20 transition-colors font-bebas text-lg">+</button>
                  </div>
                </div>
                {/* Blue */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#3b82f6] rounded-full flex-shrink-0"/>
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

              {saving === match.id && <div className="mt-2 font-condensed text-[10px] tracking-[3px] text-[#22c55e] uppercase">Broadcasting update...</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
