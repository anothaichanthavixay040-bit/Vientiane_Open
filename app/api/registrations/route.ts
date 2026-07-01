import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { REG_TYPES, REG_TYPE_KEYS, regToRow, rowToReg } from '@/lib/registrationTypes'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

function fail(e: unknown) {
  const message =
    e instanceof Error ? e.message
      : (e && typeof e === 'object' && 'message' in e) ? String((e as { message: unknown }).message)
        : 'Server error'
  return NextResponse.json({ error: message }, { status: 500 })
}

// CREATE — public registration, routed to the type's own table
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const cfg = REG_TYPES[body.type]
    if (!cfg) return NextResponse.json({ error: 'Invalid registration type' }, { status: 400 })
    for (const f of cfg.fields) {
      if (f.required && !String(body[f.key] ?? '').trim()) {
        return NextResponse.json({ error: `${f.label} is required` }, { status: 400 })
      }
    }
    const supabase = getSupabase()
    const row = regToRow(cfg.type, body)
    // Snapshot the selected team's name into the `team` column (for display),
    // alongside the team_registration_id FK.
    if (row.team_registration_id && ('team' in row || cfg.type === 'official' || cfg.type === 'hotel')) {
      const { data: team } = await supabase
        .from('team_registrations')
        .select('team_name')
        .eq('id', row.team_registration_id)
        .single()
      if (team) row.team = team.team_name
    }
    const { data, error } = await supabase.from(cfg.table).insert(row).select('*').single()
    if (error) throw error
    return NextResponse.json(rowToReg(cfg.type, data), { status: 201 })
  } catch (e) {
    return fail(e)
  }
}

// READ — merged list across all four tables (admin); optional ?type=
export async function GET(req: NextRequest) {
  try {
    const only = new URL(req.url).searchParams.get('type')
    const supabase = getSupabase()
    const types = only ? [only] : REG_TYPE_KEYS
    const results = await Promise.all(types.map(async t => {
      const cfg = REG_TYPES[t]
      if (!cfg) return []
      const { data, error } = await supabase.from(cfg.table).select('*').order('created_at', { ascending: false })
      if (error) throw error
      return (data ?? []).map(row => rowToReg(t, row))
    }))
    const merged = results.flat().sort((a, b) =>
      String(b.created_at).localeCompare(String(a.created_at)))
    return NextResponse.json(merged)
  } catch (e) {
    return fail(e)
  }
}

// DELETE — remove a registration (?id=…&type=…)
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    let id = url.searchParams.get('id') ?? undefined
    let type = url.searchParams.get('type') ?? undefined
    if (!id || !type) {
      const body = await req.json().catch(() => ({}))
      id = id || body.id
      type = type || body.type
    }
    const cfg = type ? REG_TYPES[type] : undefined
    if (!id || !cfg) return NextResponse.json({ error: 'id and valid type are required' }, { status: 400 })
    const supabase = getSupabase()
    const { error } = await supabase.from(cfg.table).delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ id, deleted: true })
  } catch (e) {
    return fail(e)
  }
}
