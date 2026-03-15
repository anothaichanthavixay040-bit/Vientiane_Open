'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Scan, CheckCircle, XCircle, AlertCircle, Clock, Search, ExternalLink, Users, Activity } from 'lucide-react'
import Link from 'next/link'
import { Athlete, CheckInEvent } from '@/types'

export default function CheckInHubPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [log, setLog] = useState<CheckInEvent[]>([])
  const [stats, setStats] = useState({ total: 0, checkedIn: 0 })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'feed' | 'list'>('feed')
  const [manualId, setManualId] = useState('')
  const [result, setResult] = useState<{ status: string; message: string } | null>(null)
  const esRef = useRef<EventSource | null>(null)

  const fetchData = useCallback(async () => {
    const [athRes, logRes] = await Promise.all([fetch('/api/athletes'), fetch('/api/checkin')])
    if (athRes.ok) {
      const data: Athlete[] = await athRes.json()
      setAthletes(data)
      setStats({ total: data.length, checkedIn: data.filter(a => a.checkedIn).length })
    }
    if (logRes.ok) setLog(await logRes.json())
  }, [])

  useEffect(() => {
    fetchData()
    esRef.current = new EventSource('/api/stream')
    esRef.current.addEventListener('checkin', (e) => {
      const event: CheckInEvent = JSON.parse(e.data)
      setLog(prev => [event, ...prev].slice(0, 100))
    })
    esRef.current.addEventListener('athlete_update', (e) => {
      const updated: Athlete = JSON.parse(e.data)
      setAthletes(prev => prev.map(a => a.id === updated.id ? updated : a))
      setStats(prev => ({ ...prev, checkedIn: prev.checkedIn + 1 }))
    })
    return () => esRef.current?.close()
  }, [fetchData])

  const doCheckIn = async (qrCode: string) => {
    if (!qrCode.trim()) return
    try {
      const res = await fetch('/api/checkin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ qrCode }) })
      const data = await res.json()
      setResult({ status: data.status, message: data.status === 'success' ? `${data.athleteName} checked in!` : data.status === 'already_checked' ? `${data.athleteName} already checked in.` : 'Athlete not found.' })
      setTimeout(() => setResult(null), 3000)
    } catch {
      setResult({ status: 'error', message: 'Network error.' })
    }
  }

  const filteredAthletes = athletes.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.bib.includes(searchTerm)
  )

  const pct = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0

  return (
    <div className="pt-16 sm:pt-20 min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="bg-[#111] border-b border-[#C9A84C]/15 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-2">Real-Time System</div>
            <h1 className="font-bebas text-4xl sm:text-6xl text-white tracking-widest">ATHLETE <span className="text-[#C8102E]">CHECK-IN</span></h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-[#22c55e] rounded-full live-pulse" />
              <span className="font-condensed text-xs tracking-widest text-white/40">LIVE SYSTEM ACTIVE</span>
            </div>
          </div>

          {/* Big Scanner Launch Button */}
          <Link
            href="/checkin/scan"
            className="group flex items-center gap-4 bg-[#C8102E] hover:bg-[#ff1a3a] transition-all px-6 py-4 sm:px-8 sm:py-5 self-start sm:self-center"
            style={{ clipPath: 'polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)' }}
          >
            <div className="relative">
              <Scan size={28} className="text-white" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full live-pulse border-2 border-[#C8102E]" />
            </div>
            <div>
              <div className="font-bebas text-xl sm:text-2xl text-white tracking-[4px] leading-none">OPEN SCANNER</div>
              <div className="font-condensed text-[10px] tracking-[3px] text-white/60 uppercase mt-0.5">Full-screen QR mode</div>
            </div>
            <ExternalLink size={16} className="text-white/50 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#111] border border-[#C9A84C]/12 p-4 sm:p-6 text-center">
            <div className="font-bebas text-3xl sm:text-5xl text-white">{stats.total}</div>
            <div className="font-condensed text-[10px] sm:text-xs tracking-[3px] text-white/40 uppercase mt-1">Total</div>
          </div>
          <div className="bg-[#111] border border-[#22c55e]/30 p-4 sm:p-6 text-center">
            <div className="font-bebas text-3xl sm:text-5xl text-[#22c55e]">{stats.checkedIn}</div>
            <div className="font-condensed text-[10px] sm:text-xs tracking-[3px] text-white/40 uppercase mt-1">Checked In</div>
          </div>
          <div className="bg-[#111] border border-[#C8102E]/30 p-4 sm:p-6 text-center">
            <div className="font-bebas text-3xl sm:text-5xl text-[#C8102E]">{stats.total - stats.checkedIn}</div>
            <div className="font-condensed text-[10px] sm:text-xs tracking-[3px] text-white/40 uppercase mt-1">Pending</div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-[#111] border border-white/05 p-4 mb-6">
          <div className="flex justify-between font-condensed text-xs text-white/50 mb-2">
            <span>Check-In Progress</span>
            <span className="text-[#C9A84C]">{pct}%</span>
          </div>
          <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C8102E] to-[#22c55e] transition-all duration-700 rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Scanner CTA card */}
        {/* <div className="relative bg-gradient-to-r from-[#C8102E]/10 to-[#1a1a1a] border border-[#C8102E]/30 p-5 sm:p-6 mb-6 overflow-hidden">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
            <Scan size={120} />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-bebas text-2xl sm:text-3xl text-white tracking-widest mb-1">
                QR CODE SCANNER
              </div>
              <p className="text-sm text-white/50 font-condensed max-w-md">
                Opens a dedicated full-screen scanner page — no nav, no distractions. Point camera at athlete's QR code for instant check-in.
              </p>
            </div>
            <Link
              href="/checkin/scan"
              className="flex items-center gap-3 bg-[#C8102E] hover:bg-[#ff1a3a] transition-colors px-6 py-3.5 flex-shrink-0 group"
              style={{ clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}
            >
              <Scan size={18} className="text-white" />
              <span className="font-condensed text-sm tracking-[3px] uppercase text-white">Launch Scanner</span>
              <ExternalLink size={14} className="text-white/60 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div> */}

        {/* Quick manual check-in */}
        <div className="bg-[#111] border border-[#C9A84C]/12 p-4 sm:p-5 mb-6">
          <div className="font-condensed text-xs tracking-[4px] uppercase text-[#C9A84C] mb-3">Quick Manual Check-In</div>
          {result && (
            <div className={`mb-3 px-4 py-3 border flex items-center gap-3 text-sm font-condensed ${
              result.status === 'success' ? 'bg-[#22c55e]/10 border-[#22c55e]/40 text-[#22c55e]' :
              result.status === 'already_checked' ? 'bg-[#f59e0b]/10 border-[#f59e0b]/40 text-[#f59e0b]' :
              'bg-[#C8102E]/10 border-[#C8102E]/40 text-[#C8102E]'
            }`}>
              {result.status === 'success' ? <CheckCircle size={16}/> : result.status === 'already_checked' ? <AlertCircle size={16}/> : <XCircle size={16}/>}
              {result.message}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); doCheckIn(manualId); setManualId('') }} className="flex gap-2">
            <input
              value={manualId}
              onChange={e => setManualId(e.target.value)}
              placeholder="Enter Athlete ID or BIB number..."
              className="flex-1 bg-[#1a1a1a] border border-[#C9A84C]/15 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C8102E] placeholder-white/20 font-condensed"
            />
            <button
              type="submit"
              disabled={!manualId.trim()}
              className="bg-[#C8102E] text-white font-condensed text-xs tracking-[3px] uppercase px-5 py-3 hover:bg-[#ff1a3a] disabled:opacity-40 transition-all flex-shrink-0"
              style={{ clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
            >
              CHECK
            </button>
          </form>
          {/* Demo quick buttons */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="font-condensed text-[9px] tracking-[2px] text-white/20 uppercase self-center mr-1">BIBs:</span>
            {athletes.slice(0, 6).map(a => (
              <button
                key={a.id}
                onClick={() => doCheckIn(a.id)}
                className={`font-condensed text-[10px] tracking-widest px-2.5 py-1 border transition-colors ${
                  a.checkedIn
                    ? 'border-[#22c55e]/30 text-[#22c55e]/50 bg-[#22c55e]/05 cursor-default'
                    : 'border-white/10 text-white/50 hover:border-[#C9A84C]/50 hover:text-white'
                }`}
                disabled={a.checkedIn}
              >
                {a.bib} {a.checkedIn ? '✓' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Live Feed / Athlete List */}
        <div className="bg-[#111] border border-[#C9A84C]/10">
          <div className="flex border-b border-white/08">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 font-condensed text-xs tracking-[3px] uppercase px-5 py-3.5 border-b-2 transition-colors ${activeTab === 'feed' ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-transparent text-white/40 hover:text-white'}`}
            >
              <Activity size={12} />
              Live Feed
              {log.length > 0 && <span className="bg-[#C8102E] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bebas">{log.length}</span>}
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center gap-2 font-condensed text-xs tracking-[3px] uppercase px-5 py-3.5 border-b-2 transition-colors ${activeTab === 'list' ? 'border-[#C9A84C] text-[#C9A84C]' : 'border-transparent text-white/40 hover:text-white'}`}
            >
              <Users size={12} />
              Athlete List
              <span className="font-condensed text-[9px] text-white/30">{stats.checkedIn}/{stats.total}</span>
            </button>
          </div>

          {activeTab === 'feed' ? (
            /* Live check-in feed */
            <div>
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/04">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#C9A84C]" />
                  <span className="font-condensed text-xs tracking-widest uppercase text-white/50">Real-Time Activity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full live-pulse" />
                  <span className="font-condensed text-[10px] tracking-widest text-white/30">LIVE</span>
                </div>
              </div>
              <div className="divide-y divide-white/04 max-h-[480px] overflow-y-auto">
                {log.length === 0 ? (
                  <div className="py-16 text-center">
                    <Scan size={32} className="text-white/10 mx-auto mb-3" />
                    <div className="font-condensed text-xs tracking-[4px] text-white/25 uppercase">No check-ins yet</div>
                    <div className="font-condensed text-[10px] text-white/15 mt-1">Use the scanner or manual entry above</div>
                  </div>
                ) : (
                  log.map((entry, i) => (
                    <div key={i} className={`px-4 py-3.5 flex items-center gap-3 ${
                      entry.status === 'success' ? '' :
                      entry.status === 'already_checked' ? 'bg-[#f59e0b]/02' : 'bg-[#C8102E]/02'
                    }`}>
                      {entry.status === 'success'
                        ? <CheckCircle size={16} className="text-[#22c55e] flex-shrink-0" />
                        : entry.status === 'already_checked'
                        ? <AlertCircle size={16} className="text-[#f59e0b] flex-shrink-0" />
                        : <XCircle size={16} className="text-[#C8102E] flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="font-condensed text-sm text-white truncate">{entry.athleteName}</div>
                        <div className="flex flex-wrap gap-2 mt-0.5">
                          {entry.category && <span className="font-condensed text-[10px] text-white/35">{entry.category}</span>}
                          {entry.country && <span className="font-condensed text-[10px] text-[#C9A84C]">{entry.country}</span>}
                          <span className={`font-condensed text-[9px] tracking-[2px] uppercase ${
                            entry.status === 'success' ? 'text-[#22c55e]' :
                            entry.status === 'already_checked' ? 'text-[#f59e0b]' : 'text-[#C8102E]'
                          }`}>
                            {entry.status === 'success' ? 'Checked In' : entry.status === 'already_checked' ? 'Duplicate' : 'Not Found'}
                          </span>
                        </div>
                      </div>
                      <div className="text-[10px] text-white/25 font-condensed flex-shrink-0 tabular-nums">
                        {new Date(entry.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            /* Athlete list */
            <div>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/04">
                <Search size={13} className="text-white/30 flex-shrink-0" />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search name, country, category, BIB..."
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-white/20 font-condensed"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="text-white/30 hover:text-white flex-shrink-0">
                    <XCircle size={14} />
                  </button>
                )}
              </div>
              <div className="divide-y divide-white/04 max-h-[480px] overflow-y-auto">
                {filteredAthletes.map(a => (
                  <div key={a.id} className="px-4 py-3.5 flex items-center gap-3 hover:bg-white/01 transition-colors">
                    <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 font-bebas text-sm transition-colors ${a.checkedIn ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-white/05 text-white/30'}`}>
                      {a.checkedIn ? '✓' : a.bib}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-condensed text-sm text-white truncate">{a.name}</div>
                      <div className="flex flex-wrap gap-2 mt-0.5">
                        <span className="font-condensed text-[10px] text-white/35">{a.category}</span>
                        <span className="font-condensed text-[10px] text-[#C9A84C]">{a.weightClass}</span>
                        <span className="font-condensed text-[10px] text-white/35">{a.country}</span>
                        {a.teamName && <span className="font-condensed text-[10px] text-white/25">{a.teamName}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`font-condensed text-[9px] tracking-[2px] uppercase px-2 py-0.5 ${a.checkedIn ? 'bg-[#22c55e]/15 text-[#22c55e]' : 'bg-white/05 text-white/25'}`}>
                        {a.checkedIn ? 'IN' : 'PENDING'}
                      </span>
                      {!a.checkedIn && (
                        <button
                          onClick={() => doCheckIn(a.id)}
                          className="font-condensed text-[9px] tracking-widest uppercase bg-[#C8102E]/15 border border-[#C8102E]/25 text-[#C8102E] px-2 py-1 hover:bg-[#C8102E]/25 transition-colors"
                        >
                          CHECK IN
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {filteredAthletes.length === 0 && (
                  <div className="py-12 text-center font-condensed text-xs tracking-[3px] text-white/20 uppercase">No athletes found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
