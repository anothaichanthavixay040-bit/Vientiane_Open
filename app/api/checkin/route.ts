import { NextRequest, NextResponse } from 'next/server'
import { broadcast } from '@/lib/store'
import { getSupabase, rowToAthlete } from '@/lib/supabase'
import { CheckInEvent } from '@/types'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

function fail(e: unknown) {
  const message =
    e instanceof Error ? e.message
      : (e && typeof e === 'object' && 'message' in e) ? String((e as { message: unknown }).message)
        : 'Server error'
  return NextResponse.json({ error: message }, { status: 500 })
}

async function logCheckin(supabase: ReturnType<typeof getSupabase>, event: CheckInEvent) {
  await supabase.from('checkins').insert({
    // athlete_id is a FK to athletes.id — for "not_found" scans there is no
    // matching athlete, so store null (the scanned code stays in athlete_name).
    athlete_id: event.status === 'not_found' ? null : event.athleteId,
    athlete_name: event.athleteName,
    category: event.category,
    country: event.country,
    status: event.status,
  })
}

// POST — check an athlete in by QR code / id
export async function POST(req: NextRequest) {
  try {
    const { qrCode } = await req.json()
    const supabase = getSupabase()

    const { data: rows, error } = await supabase
      .from('athletes')
      .select('*')
      .or(`qr_code.eq.${qrCode},id.eq.${qrCode}`)
      .limit(1)
    if (error) throw error
    const athleteRow = rows?.[0]

    if (!athleteRow) {
      const event: CheckInEvent = { athleteId: qrCode, athleteName: `Unknown (${qrCode})`, category: '', country: '', timestamp: new Date().toISOString(), status: 'not_found' }
      await logCheckin(supabase, event)
      broadcast('checkin', event)
      return NextResponse.json(event, { status: 404 })
    }

    const athlete = rowToAthlete(athleteRow)

    if (athlete.checkedIn) {
      const event: CheckInEvent = { athleteId: athlete.id, athleteName: athlete.name, category: athlete.category, country: athlete.country, timestamp: new Date().toISOString(), status: 'already_checked' }
      await logCheckin(supabase, event)
      broadcast('checkin', event)
      return NextResponse.json({ ...event, athlete }, { status: 200 })
    }

    const checkedInAt = new Date().toISOString()
    const { data: upd, error: updErr } = await supabase
      .from('athletes')
      .update({ checked_in: true, checked_in_at: checkedInAt })
      .eq('id', athlete.id)
      .select('*')
      .single()
    if (updErr) throw updErr
    const updated = rowToAthlete(upd)

    const event: CheckInEvent = { athleteId: updated.id, athleteName: updated.name, category: updated.category, country: updated.country, timestamp: checkedInAt, status: 'success' }
    await logCheckin(supabase, event)
    broadcast('checkin', event)
    broadcast('athlete_update', updated)

    return NextResponse.json({ ...event, athlete: updated }, { status: 200 })
  } catch (e) {
    return fail(e)
  }
}

// GET — recent check-in log
export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('checkins')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
    if (error) throw error
    const log: CheckInEvent[] = (data ?? []).map(r => ({
      athleteId: r.athlete_id ?? '',
      athleteName: r.athlete_name ?? '',
      category: r.category ?? '',
      country: r.country ?? '',
      timestamp: r.created_at,
      status: r.status,
    }))
    return NextResponse.json(log)
  } catch (e) {
    return fail(e)
  }
}
