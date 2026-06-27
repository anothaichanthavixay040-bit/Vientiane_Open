import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Athlete } from '@/types'

// Server-side Supabase client. Uses the service-role key, so it bypasses RLS
// and is only ever created in API routes — never shipped to the browser.
// Created lazily so a missing env var fails at request time (with a clear
// message) instead of crashing the build.
export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  // New Supabase "secret key" (sb_secret_...) or the legacy service_role key.
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY in .env.local (and in your Cloudflare Pages environment variables).'
    )
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/* ---------- row <-> app-type mappers ---------- */

type AthleteRow = {
  id: string
  name: string
  country: string
  category: string
  weight_class: string
  gender: 'male' | 'female'
  qr_code: string
  checked_in: boolean
  checked_in_at: string | null
  team_name: string | null
  bib: string | null
  events: string | null
}

export function rowToAthlete(r: AthleteRow): Athlete {
  return {
    id: r.id,
    name: r.name,
    country: r.country,
    category: r.category,
    weightClass: r.weight_class,
    gender: r.gender,
    qrCode: r.qr_code,
    checkedIn: r.checked_in,
    checkedInAt: r.checked_in_at ?? undefined,
    teamName: r.team_name ?? undefined,
    bib: r.bib ?? '',
    events: r.events ?? undefined,
  }
}

export function athleteToRow(a: Partial<Athlete>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  if (a.name !== undefined) row.name = a.name
  if (a.country !== undefined) row.country = a.country
  if (a.category !== undefined) row.category = a.category
  if (a.weightClass !== undefined) row.weight_class = a.weightClass
  if (a.gender !== undefined) row.gender = a.gender
  if (a.qrCode !== undefined) row.qr_code = a.qrCode
  if (a.checkedIn !== undefined) row.checked_in = a.checkedIn
  if (a.checkedInAt !== undefined) row.checked_in_at = a.checkedInAt || null
  if (a.teamName !== undefined) row.team_name = a.teamName || null
  if (a.bib !== undefined) row.bib = a.bib || null
  if (a.events !== undefined) row.events = a.events || null
  return row
}
