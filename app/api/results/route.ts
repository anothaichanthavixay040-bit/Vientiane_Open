import { NextRequest, NextResponse } from 'next/server'
import { broadcast } from '@/lib/store'
import { getSupabase, rowToMatch, matchToRow } from '@/lib/supabase'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

function fail(e: unknown) {
  const message = e instanceof Error ? e.message : 'Server error'
  return NextResponse.json({ error: message }, { status: 500 })
}

// READ — list all matches
export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('start_time', { ascending: true })
    if (error) throw error
    return NextResponse.json((data ?? []).map(rowToMatch))
  } catch (e) {
    return fail(e)
  }
}

// CREATE — add a new match
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.redAthlete || !body.blueAthlete || !body.category) {
      return NextResponse.json({ error: 'category, redAthlete and blueAthlete are required' }, { status: 400 })
    }
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('matches')
      .insert(matchToRow(body))
      .select('*')
      .single()
    if (error) throw error
    const match = rowToMatch(data)
    broadcast('result_update', match)
    return NextResponse.json(match, { status: 201 })
  } catch (e) {
    return fail(e)
  }
}

// UPDATE — change scores / status / winner / details
export async function PATCH(req: NextRequest) {
  try {
    const { id, ...patch } = await req.json()
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('matches')
      .update(matchToRow(patch))
      .eq('id', id)
      .select('*')
      .single()
    if (error) throw error
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const match = rowToMatch(data)
    broadcast('result_update', match)
    return NextResponse.json(match)
  } catch (e) {
    return fail(e)
  }
}

// DELETE — remove a match (?id=... or { id } body)
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
    const { error } = await supabase.from('matches').delete().eq('id', id)
    if (error) throw error
    broadcast('result_delete', { id })
    return NextResponse.json({ id, deleted: true })
  } catch (e) {
    return fail(e)
  }
}
