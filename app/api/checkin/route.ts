import { NextRequest, NextResponse } from 'next/server'
import { athletes, checkInLog, broadcast } from '@/lib/store'
import { CheckInEvent } from '@/types'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { qrCode } = await req.json()
  const athlete = athletes.find(a => a.qrCode === qrCode || a.id === qrCode)
  
  let event: CheckInEvent
  
  if (!athlete) {
    event = { athleteId: qrCode, athleteName: 'Unknown', category: '', country: '', timestamp: new Date().toISOString(), status: 'not_found' }
    checkInLog.unshift(event)
    broadcast('checkin', event)
    return NextResponse.json(event, { status: 404 })
  }

  if (athlete.checkedIn) {
    event = { athleteId: athlete.id, athleteName: athlete.name, category: athlete.category, country: athlete.country, timestamp: new Date().toISOString(), status: 'already_checked' }
    checkInLog.unshift(event)
    broadcast('checkin', event)
    return NextResponse.json({ ...event, athlete }, { status: 200 })
  }

  athlete.checkedIn = true
  athlete.checkedInAt = new Date().toISOString()
  event = { athleteId: athlete.id, athleteName: athlete.name, category: athlete.category, country: athlete.country, timestamp: new Date().toISOString(), status: 'success' }
  checkInLog.unshift(event)
  broadcast('checkin', event)
  broadcast('athlete_update', athlete)
  
  return NextResponse.json({ ...event, athlete }, { status: 200 })
}

export async function GET() {
  return NextResponse.json(checkInLog)
}
