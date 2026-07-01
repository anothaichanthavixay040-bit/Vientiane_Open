import { NextRequest, NextResponse } from 'next/server'
import { broadcast } from '@/lib/store'
import { getSupabase, rowToAthlete, athleteToRow } from '@/lib/supabase'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

function fail(e: unknown) {
  const message =
    e instanceof Error ? e.message
      : (e && typeof e === 'object' && 'message' in e) ? String((e as { message: unknown }).message)
        : 'Server error'
  return NextResponse.json({ error: message }, { status: 500 })
}

// READ — list all athletes
export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .order('bib', { ascending: true })
    if (error) throw error
    return NextResponse.json((data ?? []).map(rowToAthlete))
  } catch (e) {
    return fail(e)
  }
}

// CREATE — add an athlete
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const name = String(body.name ?? '').trim()
    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 })
    const supabase = getSupabase()

    // Block duplicate names (case-insensitive) — applies to public form and admin.
    const { data: existing, error: dupErr } = await supabase
      .from('athletes')
      .select('id')
      .ilike('name', name)
      .limit(1)
    if (dupErr) throw dupErr
    if (existing && existing.length) {
      return NextResponse.json({ error: `An athlete named “${name}” is already registered.` }, { status: 409 })
    }

    const row = athleteToRow({ ...body, name })
    // Best-effort link to a registered team (team hub) by matching team name.
    if (row.team_name) {
      const { data: team } = await supabase
        .from('team_registrations')
        .select('id')
        .ilike('team_name', String(row.team_name))
        .limit(1)
      if (team && team[0]) row.team_registration_id = team[0].id
    }
    // Default the QR code to the athlete id by inserting first, then patching if absent.
    const { data, error } = await supabase.from('athletes').insert(row).select('*').single()
    if (error) throw error
    let athlete = rowToAthlete(data)
    if (!athlete.qrCode) {
      const { data: upd } = await supabase
        .from('athletes')
        .update({ qr_code: athlete.id })
        .eq('id', athlete.id)
        .select('*')
        .single()
      if (upd) athlete = rowToAthlete(upd)
    }
    broadcast('athlete_update', athlete)
    return NextResponse.json(athlete, { status: 201 })
  } catch (e) {
    return fail(e)
  }
}

// UPDATE — edit an athlete
export async function PATCH(req: NextRequest) {
  try {
    const { id, ...patch } = await req.json()
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('athletes')
      .update(athleteToRow(patch))
      .eq('id', id)
      .select('*')
      .single()
    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const athlete = rowToAthlete(data)
    broadcast('athlete_update', athlete)
    return NextResponse.json(athlete)
  } catch (e) {
    return fail(e)
  }
}

// DELETE — remove an athlete (?id=... or { id } body)
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    let id = url.searchParams.get('id') ?? undefined
    if (!id) {
      const body = await req.json().catch(() => ({}))
      id = body.id
    }
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    const supabase = getSupabase()
    const { error } = await supabase.from('athletes').delete().eq('id', id)
    if (error) throw error
    broadcast('athlete_delete', { id })
    return NextResponse.json({ id, deleted: true })
  } catch (e) {
    return fail(e)
  }
}
