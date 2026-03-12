'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, Scan, X, RotateCcw, Keyboard, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Athlete } from '@/types'

type ScanResult = {
  status: 'success' | 'already_checked' | 'not_found' | 'error'
  athlete?: Athlete
  message: string
  name?: string
}

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [manualMode, setManualMode] = useState(false)
  const [manualId, setManualId] = useState('')
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [scanCount, setScanCount] = useState(0)
  const [lastScanTime, setLastScanTime] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const resultTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const manualInputRef = useRef<HTMLInputElement>(null)
  const lastScannedRef = useRef<string>('')
  const scanCooldownRef = useRef(false)

  const doCheckIn = useCallback(async (qrCode: string) => {
    if (!qrCode.trim() || isProcessing || scanCooldownRef.current) return
    if (qrCode === lastScannedRef.current) return

    scanCooldownRef.current = true
    lastScannedRef.current = qrCode
    setIsProcessing(true)

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode: qrCode.trim() })
      })
      const data = await res.json()
      const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

      if (data.status === 'success') {
        setResult({ status: 'success', athlete: data.athlete, message: `${data.athleteName} checked in!`, name: data.athleteName })
        setScanCount(p => p + 1)
        setLastScanTime(now)
      } else if (data.status === 'already_checked') {
        setResult({ status: 'already_checked', athlete: data.athlete, message: `${data.athleteName} already checked in.`, name: data.athleteName })
      } else {
        setResult({ status: 'not_found', message: `ID "${qrCode}" not found in system.` })
      }
    } catch {
      setResult({ status: 'error', message: 'Network error. Check connection.' })
    }

    setIsProcessing(false)

    if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current)
    resultTimeoutRef.current = setTimeout(() => {
      setResult(null)
      lastScannedRef.current = ''
      scanCooldownRef.current = false
    }, 4000)
  }, [isProcessing])

  // QR scanning using canvas (jsQR-compatible approach)
  const startScanning = useCallback(async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setScanning(true)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      setCameraError(msg.includes('Permission') || msg.includes('NotAllowed')
        ? 'Camera permission denied. Please allow camera access and try again.'
        : 'Could not access camera. Use manual entry instead.')
    }
  }, [])

  const stopScanning = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setScanning(false)
  }, [])

  useEffect(() => {
    return () => {
      stopScanning()
      if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current)
    }
  }, [stopScanning])

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (manualId.trim()) {
      doCheckIn(manualId.trim())
      setManualId('')
    }
  }

  const dismissResult = () => {
    if (resultTimeoutRef.current) clearTimeout(resultTimeoutRef.current)
    setResult(null)
    lastScannedRef.current = ''
    scanCooldownRef.current = false
  }

  const resultConfig = result ? {
    success: { bg: 'bg-[#22c55e]', text: 'text-white', icon: <CheckCircle size={36} />, label: 'CHECK-IN SUCCESS' },
    already_checked: { bg: 'bg-[#f59e0b]', text: 'text-white', icon: <AlertCircle size={36} />, label: 'ALREADY CHECKED IN' },
    not_found: { bg: 'bg-[#C8102E]', text: 'text-white', icon: <XCircle size={36} />, label: 'NOT FOUND' },
    error: { bg: 'bg-[#6b7280]', text: 'text-white', icon: <XCircle size={36} />, label: 'ERROR' },
  }[result.status] : null

  return (
    // Full-screen isolated page — covers entire viewport including nav
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-white/08 flex-shrink-0 z-10">
        <Link href="/checkin" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
          <ChevronLeft size={18} />
          <span className="font-condensed text-xs tracking-[3px] uppercase">Back</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vkf-logo.png" alt="VKF" className="w-8 h-8 object-contain flex-shrink-0" />
          <span className="font-bebas text-white text-sm tracking-widest">ATHLETE SCANNER</span>
          <div className="flex items-center gap-1.5 ml-2">
            <span className={`w-2 h-2 rounded-full ${scanning ? 'bg-[#22c55e] live-pulse' : 'bg-white/20'}`} />
            <span className="font-condensed text-[10px] tracking-[3px] text-white/40 uppercase">{scanning ? 'LIVE' : 'IDLE'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-bebas text-lg text-[#22c55e] leading-none">{scanCount}</div>
            <div className="font-condensed text-[9px] tracking-[2px] text-white/30 uppercase">scanned</div>
          </div>
          <button
            onClick={() => { setManualMode(p => !p); setTimeout(() => manualInputRef.current?.focus(), 100) }}
            className={`p-2 border transition-colors ${manualMode ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C]' : 'border-white/10 text-white/40 hover:text-white'}`}
            title="Toggle manual entry"
          >
            <Keyboard size={16} />
          </button>
        </div>
      </div>

      {/* Main scanner area */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">

        {/* Camera feed */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${scanning ? 'opacity-100' : 'opacity-0'}`}
          muted
          playsInline
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Dark overlay when not scanning */}
        {!scanning && (
          <div className="absolute inset-0 bg-[#0a0a0a] grid-bg flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <Scan size={80} className="text-white/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#C8102E]/30 rounded-full animate-ping" />
              </div>
            </div>
            <div className="font-bebas text-2xl text-white/30 tracking-[6px]">SCANNER READY</div>
          </div>
        )}

        {/* Scanning overlay frame */}
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Dark vignette */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)'
            }} />
            {/* Scan frame */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
              {/* Corner markers */}
              {[
                'top-0 left-0 border-t-3 border-l-3',
                'top-0 right-0 border-t-3 border-r-3',
                'bottom-0 left-0 border-b-3 border-l-3',
                'bottom-0 right-0 border-b-3 border-r-3',
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 sm:w-10 sm:h-10 ${cls}`} style={{
                  borderColor: isProcessing ? '#f59e0b' : '#C9A84C',
                  borderWidth: '3px',
                  transition: 'border-color 0.3s'
                }} />
              ))}
              {/* Scan line */}
              <div className="absolute left-2 right-2 h-0.5 opacity-80 scan-line" style={{
                background: `linear-gradient(to right, transparent, ${isProcessing ? '#f59e0b' : '#C8102E'}, transparent)`,
                boxShadow: `0 0 8px ${isProcessing ? '#f59e0b' : '#C8102E'}`
              }} />
              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-4 h-0.5 bg-white" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-0.5 h-4 bg-white" />
              </div>
            </div>
            {/* Label */}
            <div className="absolute bottom-24 sm:bottom-28 font-condensed text-xs tracking-[4px] text-white/60 uppercase">
              {isProcessing ? 'Processing...' : 'Align QR code within frame'}
            </div>
          </div>
        )}

        {/* Result overlay — big, clear, covers camera */}
        {result && resultConfig && (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center gap-6 z-20 ${resultConfig.bg} bg-opacity-95 cursor-pointer`}
            onClick={dismissResult}
            style={{ animation: 'fadeIn 0.2s ease' }}
          >
            <div className={resultConfig.text}>{resultConfig.icon}</div>
            <div className={`font-bebas text-3xl sm:text-4xl tracking-[4px] ${resultConfig.text}`}>{resultConfig.label}</div>

            {result.athlete && (
              <div className="text-center px-6">
                <div className={`font-bebas text-4xl sm:text-5xl tracking-widest ${resultConfig.text} mb-2`}>
                  {result.athlete.name}
                </div>
                <div className="flex justify-center flex-wrap gap-3 mt-1">
                  {[
                    result.athlete.category,
                    result.athlete.weightClass,
                    result.athlete.gender.toUpperCase(),
                    result.athlete.country,
                    `BIB #${result.athlete.bib}`
                  ].map(tag => (
                    <span key={tag} className="font-condensed text-xs tracking-[3px] uppercase bg-black/20 text-white/80 px-3 py-1">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {!result.athlete && (
              <div className={`font-condensed text-sm tracking-widest ${resultConfig.text} opacity-80`}>
                {result.message}
              </div>
            )}

            <div className={`font-condensed text-xs tracking-[4px] uppercase ${resultConfig.text} opacity-50 mt-4`}>
              Tap anywhere to dismiss
            </div>
          </div>
        )}

        {/* Manual entry overlay */}
        {manualMode && (
          <div className="absolute inset-x-0 bottom-0 bg-[#111]/98 backdrop-blur border-t border-[#C9A84C]/20 p-5 z-30">
            <div className="max-w-sm mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="font-condensed text-sm tracking-[3px] uppercase text-white">Manual Entry</span>
                <button onClick={() => setManualMode(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>
              <form onSubmit={handleManualSubmit} className="flex gap-2">
                <input
                  ref={manualInputRef}
                  value={manualId}
                  onChange={e => setManualId(e.target.value)}
                  placeholder="Athlete ID or BIB number..."
                  className="flex-1 bg-[#1a1a1a] border border-[#C9A84C]/25 text-white text-base px-4 py-3 focus:outline-none focus:border-[#C8102E] placeholder-white/20 font-condensed"
                  style={{ fontSize: '16px' }} // prevent iOS zoom
                />
                <button
                  type="submit"
                  disabled={!manualId.trim() || isProcessing}
                  className="bg-[#C8102E] text-white font-condensed text-xs tracking-[3px] uppercase px-5 py-3 hover:bg-[#ff1a3a] disabled:opacity-40 transition-all flex-shrink-0"
                  style={{ clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
                >
                  {isProcessing ? '...' : 'CHECK'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex-shrink-0 bg-[#0a0a0a] border-t border-white/08 safe-area-pb">
        {cameraError && (
          <div className="mx-4 mt-3 bg-[#C8102E]/10 border border-[#C8102E]/30 px-4 py-3 text-xs text-[#C8102E] font-condensed text-center tracking-wide">
            {cameraError}
          </div>
        )}

        <div className="flex items-center gap-3 p-4">
          {/* Main scan button */}
          <button
            onClick={scanning ? stopScanning : startScanning}
            className={`flex-1 font-condensed text-sm tracking-[4px] uppercase py-4 transition-all flex items-center justify-center gap-3 ${
              scanning
                ? 'bg-[#C8102E] text-white hover:bg-[#ff1a3a]'
                : 'bg-[#C9A84C] text-black hover:bg-[#f0c060]'
            }`}
            style={{ clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}
          >
            {scanning ? (
              <><span className="w-3 h-3 border-2 border-white rounded-sm bg-white/30" /> Stop Scanner</>
            ) : (
              <><Scan size={18} /> Start Camera</>
            )}
          </button>

          {/* Manual toggle */}
          <button
            onClick={() => { setManualMode(p => !p); setTimeout(() => manualInputRef.current?.focus(), 100) }}
            className={`py-4 px-5 border font-condensed text-xs tracking-[3px] uppercase transition-colors flex items-center gap-2 flex-shrink-0 ${
              manualMode
                ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10 text-[#C9A84C]'
                : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'
            }`}
          >
            <Keyboard size={16} />
            <span className="hidden sm:inline">Manual</span>
          </button>

          {/* Reset last scan */}
          {lastScannedRef.current && (
            <button
              onClick={() => { lastScannedRef.current = ''; scanCooldownRef.current = false }}
              className="py-4 px-4 border border-white/10 text-white/30 hover:text-white hover:border-white/30 transition-colors flex-shrink-0"
              title="Reset scan cooldown"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>

        {/* Stats strip */}
        {lastScanTime && (
          <div className="px-4 pb-3 flex items-center gap-2 justify-center">
            <CheckCircle size={12} className="text-[#22c55e]" />
            <span className="font-condensed text-[10px] tracking-[3px] text-white/30 uppercase">
              Last scan: {lastScanTime} · Total today: {scanCount}
            </span>
          </div>
        )}
      </div>

      <style jsx global>{`
        /* Hide main navbar on this page */
        nav { display: none !important; }
        footer { display: none !important; }
        main { padding: 0 !important; }
        body { overflow: hidden; }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
    </div>
  )
}
