'use client'
import { useState, useEffect, useRef } from 'react'
import { Trophy, Zap, Clock, Filter } from 'lucide-react'
import { MatchResult } from '@/types'

const statusColors = {
  live: 'bg-[#C8102E] text-white',
  completed: 'bg-[#22c55e]/20 text-[#22c55e]',
  scheduled: 'bg-white/10 text-white/50',
}

const statusLabel = { live: 'LIVE', completed: 'FINAL', scheduled: 'UPCOMING' }

export default function ResultsPage() {
  const [results, setResults] = useState<MatchResult[]>([])
  const [filter, setFilter] = useState<'all' | 'live' | 'completed' | 'scheduled'>('all')
  const [catFilter, setCatFilter] = useState('all')
  const [flashIds, setFlashIds] = useState<Set<string>>(new Set())
  const esRef = useRef<EventSource | null>(null)

  const fetchResults = async () => {
    const res = await fetch('/api/results')
    if (res.ok) setResults(await res.json())
  }

  useEffect(() => {
    fetchResults()
    esRef.current = new EventSource('/api/stream')
    esRef.current.addEventListener('result_update', (e) => {
      const updated: MatchResult = JSON.parse(e.data)
      setResults(prev => prev.map(r => r.id === updated.id ? updated : r))
      setFlashIds(prev => new Set([...prev, updated.id]))
      setTimeout(() => setFlashIds(prev => { const n = new Set(prev); n.delete(updated.id); return n }), 600)
    })
    return () => esRef.current?.close()
  }, [])

  const categories = ['all', ...Array.from(new Set(results.map(r => r.category)))]
  const filtered = results.filter(r =>
    (filter === 'all' || r.status === filter) &&
    (catFilter === 'all' || r.category === catFilter)
  )
  const liveCount = results.filter(r => r.status === 'live').length
  const completedCount = results.filter(r => r.status === 'completed').length

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-[#111] border-b border-[#C9A84C]/15 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-3">Real-Time</div>
              <h1 className="font-bebas text-4xl sm:text-6xl text-white tracking-widest">LIVE <span className="text-[#C8102E]">RESULTS</span></h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-bebas text-3xl text-[#C8102E]">{liveCount}</div>
                <div className="font-condensed text-[10px] tracking-[2px] text-white/40 uppercase">Live Now</div>
              </div>
              <div className="w-px h-10 bg-white/10"/>
              <div className="text-center">
                <div className="font-bebas text-3xl text-[#22c55e]">{completedCount}</div>
                <div className="font-condensed text-[10px] tracking-[2px] text-white/40 uppercase">Completed</div>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <span className="w-2 h-2 bg-[#C8102E] rounded-full live-pulse"/>
                <span className="font-condensed text-xs tracking-widest text-white/40">LIVE</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {(['all', 'live', 'completed', 'scheduled'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`font-condensed text-xs tracking-[3px] uppercase px-4 py-2 transition-colors flex-shrink-0 ${filter === f ? 'bg-[#C8102E] text-white' : 'bg-[#111] border border-white/10 text-white/50 hover:text-white'}`}
                style={{clipPath:'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)'}}>
                {f === 'all' ? 'All Matches' : statusLabel[f]}
                {f === 'live' && liveCount > 0 && <span className="ml-1.5 bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded-full">{liveCount}</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`font-condensed text-xs tracking-[2px] uppercase px-3 py-2 transition-colors flex-shrink-0 ${catFilter === c ? 'bg-[#C9A84C]/20 border border-[#C9A84C]/50 text-[#C9A84C]' : 'bg-[#111] border border-white/08 text-white/40 hover:text-white'}`}>
                {c === 'all' ? 'All Categories' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Live matches hero */}
        {filter !== 'completed' && filter !== 'scheduled' && results.filter(r => r.status === 'live').length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-[#C8102E] rounded-full live-pulse"/>
              <span className="font-condensed text-sm tracking-widest uppercase text-[#C8102E]">Live Right Now</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.filter(r => r.status === 'live').map(match => (
                <MatchCard key={match.id} match={match} flash={flashIds.has(match.id)} large/>
              ))}
            </div>
          </div>
        )}

        {/* All matches */}
        <div className="space-y-3">
          {filtered.filter(r => r.status !== 'live' || filter !== 'all').map(match => (
            <MatchCard key={match.id} match={match} flash={flashIds.has(match.id)}/>
          ))}
          {filter === 'all' && filtered.filter(r => r.status === 'live').length > 0 && (
            <div className="space-y-3">
              {filtered.filter(r => r.status === 'live').map(match => null)}
            </div>
          )}
          {filtered.length === 0 && (
            <div className="py-20 text-center text-white/30 font-condensed text-sm tracking-widest">No matches found for selected filters.</div>
          )}
        </div>
      </div>
    </div>
  )
}

function MatchCard({ match, flash, large = false }: { match: MatchResult; flash: boolean; large?: boolean }) {
  return (
    <div className={`bg-[#111] border transition-all duration-300 ${
      match.status === 'live' ? 'border-[#C8102E]/50' : 'border-[#C9A84C]/10'
    } ${flash ? 'score-flash' : ''} ${large ? 'p-5 sm:p-6' : 'p-4'}`}>
      {/* Match header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-condensed text-[10px] tracking-[3px] uppercase px-2.5 py-1 ${statusColors[match.status]}`}>
            {match.status === 'live' && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 live-pulse"/>}
            {statusLabel[match.status]}
          </span>
          <span className="font-condensed text-xs text-white/50">{match.category} · {match.gender} · {match.weightClass}</span>
        </div>
        <div className="flex items-center gap-2 text-right">
          <span className="font-condensed text-[10px] tracking-[2px] text-white/30">MAT {match.mat}</span>
          {match.startTime && <span className="font-condensed text-[10px] text-white/30">{match.startTime}</span>}
        </div>
      </div>

      <div className="font-condensed text-[10px] tracking-[2px] text-white/30 uppercase mb-3">{match.round}</div>

      {/* Score display */}
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Red athlete */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <div className="w-3 h-3 bg-[#C8102E] rounded-full flex-shrink-0"/>
            <span className={`font-condensed ${large ? 'text-sm sm:text-base' : 'text-sm'} text-white leading-tight`}>{match.redAthlete}</span>
          </div>
          {match.winner === match.redAthlete && (
            <span className="font-condensed text-[9px] tracking-[2px] uppercase text-[#C9A84C]">🏆 Winner</span>
          )}
        </div>

        {/* Score */}
        <div className="text-center">
          {match.status === 'scheduled' ? (
            <div className="font-bebas text-2xl sm:text-3xl text-white/20 tracking-widest">VS</div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <div className={`font-bebas ${large ? 'text-4xl sm:text-5xl' : 'text-3xl'} text-[#C8102E] transition-all`}>{match.redScore}</div>
              <div className="font-condensed text-white/20 text-lg">:</div>
              <div className={`font-bebas ${large ? 'text-4xl sm:text-5xl' : 'text-3xl'} text-[#3b82f6] transition-all`}>{match.blueScore}</div>
            </div>
          )}
        </div>

        {/* Blue athlete */}
        <div className="text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-end gap-2 mb-1">
            <span className={`font-condensed ${large ? 'text-sm sm:text-base' : 'text-sm'} text-white leading-tight`}>{match.blueAthlete}</span>
            <div className="w-3 h-3 bg-[#3b82f6] rounded-full flex-shrink-0"/>
          </div>
          {match.winner === match.blueAthlete && (
            <span className="font-condensed text-[9px] tracking-[2px] uppercase text-[#C9A84C]">🏆 Winner</span>
          )}
        </div>
      </div>
    </div>
  )
}
