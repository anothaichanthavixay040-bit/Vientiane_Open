import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

// Public, minimal list of registered teams (id + name only) for the team
// dropdowns on the registration forms. No contact details are exposed.
export async function GET() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase
      .from('team_registrations')
      .select('id, team_name')
      .order('team_name', { ascending: true })
    if (error) throw error
    return NextResponse.json((data ?? []).map(t => ({ id: t.id, name: t.team_name })))
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
