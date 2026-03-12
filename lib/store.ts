// In-memory store simulating a real-time database
// In production, replace with Firebase/Supabase/Pusher

import { Athlete, CheckInEvent, MatchResult } from '@/types'

// SSE subscribers
const subscribers: Map<string, (data: string) => void> = new Map()

export function subscribe(id: string, cb: (data: string) => void) {
  subscribers.set(id, cb)
}
export function unsubscribe(id: string) {
  subscribers.delete(id)
}
export function broadcast(event: string, data: unknown) {
  const msg = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  subscribers.forEach(cb => cb(msg))
}

// Athletes store
export const athletes: Athlete[] = [
  { id:'ATH001', name:'Somchai Phommavong', country:'LAO', category:'Senior', weightClass:'-67kg', gender:'male', qrCode:'ATH001', checkedIn:false, bib:'101', teamName:'Vientiane A' },
  { id:'ATH002', name:'Khamla Soudaly', country:'LAO', category:'Senior', weightClass:'-60kg', gender:'male', qrCode:'ATH002', checkedIn:false, bib:'102', teamName:'Vientiane A' },
  { id:'ATH003', name:'Bouavanh Keodara', country:'LAO', category:'Junior', weightClass:'-61kg', gender:'female', qrCode:'ATH003', checkedIn:false, bib:'201', teamName:'Vientiane B' },
  { id:'ATH004', name:'Daovone Sihalath', country:'THA', category:'Senior', weightClass:'-75kg', gender:'male', qrCode:'ATH004', checkedIn:false, bib:'103', teamName:'Bangkok A' },
  { id:'ATH005', name:'Nittaya Phetsavanh', country:'THA', category:'Senior', weightClass:'-55kg', gender:'female', qrCode:'ATH005', checkedIn:false, bib:'301', teamName:'Bangkok A' },
  { id:'ATH006', name:'Manh Nguyen', country:'VIE', category:'Cadet', weightClass:'-57kg', gender:'male', qrCode:'ATH006', checkedIn:false, bib:'401', teamName:'Hanoi' },
  { id:'ATH007', name:'Sokha Pich', country:'CAM', category:'U14', weightClass:'-50kg', gender:'male', qrCode:'ATH007', checkedIn:false, bib:'501', teamName:'Phnom Penh' },
  { id:'ATH008', name:'Mei Lin', country:'CHN', category:'Senior', weightClass:'-50kg', gender:'female', qrCode:'ATH008', checkedIn:false, bib:'302', teamName:'Kunming' },
  { id:'ATH009', name:'Ryo Tanaka', country:'JPN', category:'Senior', weightClass:'-84kg', gender:'male', qrCode:'ATH009', checkedIn:false, bib:'104', teamName:'Osaka' },
  { id:'ATH010', name:'Park Jisu', country:'KOR', category:'Junior', weightClass:'-55kg', gender:'male', qrCode:'ATH010', checkedIn:false, bib:'202', teamName:'Seoul' },
]

// Check-in log
export const checkInLog: CheckInEvent[] = []

// Match results
export const matchResults: MatchResult[] = [
  { id:'M001', category:'Senior', weightClass:'-67kg', gender:'male', round:'Quarter Final', redAthlete:'Somchai Phommavong', blueAthlete:'Ryo Tanaka', redScore:4, blueScore:2, winner:'Somchai Phommavong', status:'completed', mat:1, startTime:'09:00' },
  { id:'M002', category:'Senior', weightClass:'-75kg', gender:'male', round:'Quarter Final', redAthlete:'Daovone Sihalath', blueAthlete:'Manh Nguyen', redScore:3, blueScore:3, status:'live', mat:2, startTime:'09:30' },
  { id:'M003', category:'Senior', weightClass:'-55kg', gender:'female', round:'Semi Final', redAthlete:'Nittaya Phetsavanh', blueAthlete:'Mei Lin', redScore:0, blueScore:0, status:'scheduled', mat:1, startTime:'10:00' },
  { id:'M004', category:'Junior', weightClass:'-61kg', gender:'female', round:'Final', redAthlete:'Bouavanh Keodara', blueAthlete:'Park Jisu', redScore:0, blueScore:0, status:'scheduled', mat:3, startTime:'11:00' },
  { id:'M005', category:'Cadet', weightClass:'-57kg', gender:'male', round:'Semi Final', redAthlete:'Sokha Pich', blueAthlete:'Khamla Soudaly', redScore:0, blueScore:0, status:'scheduled', mat:2, startTime:'11:30' },
]
