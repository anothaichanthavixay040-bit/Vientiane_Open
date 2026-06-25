import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { REG_TYPE_KEYS } from '@/lib/registrationTypes'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

function fail(e: unknown) {
  const message =
    e instanceof Error ? e.message
      : (e && typeof e === 'object' && 'message' in e) ? String((e as { message: unknown }).message)
        : 'Server error'
  return NextResponse.json({ error: message }, { status: 500 })
}

const ALLOWED = ['type', 'name', 'email', 'phone', 'country', 'organization', 'role', 'quantity', 'notes'] as const

// CREATE — public registration
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!REG_TYPE_KEYS.includes(body.type)) return NextResponse.json({ error: 'Invalid registration type' }, { status: 400 })
    if (!body.name || !String(body.name).trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const row: Record<string, unknown> = {}
    for (const k of ALLOWED) if (body[k] !== undefined && body[k] !== '') row[k] = body[k]
    if (row.quantity !== undefined) row.quantity = Number(row.quantity) || null

    const supabase = getSupabase()
    const { data, error } = await supabase.from('registrations').insert(row).select('*').single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (e) {
    return fail(e)
  }
}

// READ — list registrations (admin); optional ?type=
export async function GET(req: NextRequest) {
  try {
    const type = new URL(req.url).searchParams.get('type')
    const supabase = getSupabase()
    let q = supabase.from('registrations').select('*').order('created_at', { ascending: false })
    if (type) q = q.eq('type', type)
    const { data, error } = await q
    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (e) {
    return fail(e)
  }
}

// DELETE — remove a registration (?id=…)
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url)
    let id = url.searchParams.get('id') ?? undefined
    if (!id) { const body = await req.json().catch(() => ({})); id = body.id }
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    const supabase = getSupabase()
    const { error } = await supabase.from('registrations').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ id, deleted: true })
  } catch (e) {
    return fail(e)
  }
}
