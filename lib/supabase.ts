import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Athlete, MatchResult } from '@/types'

// Server-side Supabase client. Uses the service-role key, so it bypasses RLS
// and is only ever created in API routes — never shipped to the browser.
// Created lazily so a missing env var fails at request time (with a clear
// message) instead of crashing the build.
export function getSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local (and in your Cloudflare Pages environment variables).'
    )
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/* ---------- row <-> app-type mappers ---------- */

type MatchRow = {
  id: string
  category: string
  weight_class: string
  gender: string
  round: string
  red_athlete: string
  blue_athlete: string
  red_score: number
  blue_score: number
  winner: string | null
  status: MatchResult['status']
  mat: number
  start_time: string | null
}

export function rowToMatch(r: MatchRow): MatchResult {
  return {
    id: r.id,
    category: r.category,
    weightClass: r.weight_class,
    gender: r.gender,
    round: r.round,
    redAthlete: r.red_athlete,
    blueAthlete: r.blue_athlete,
    redScore: r.red_score,
    blueScore: r.blue_score,
    winner: r.winner ?? undefined,
    status: r.status,
    mat: r.mat,
    startTime: r.start_time ?? undefined,
  }
}

// Map a partial app-shaped match to DB columns (only defined keys).
export function matchToRow(m: Partial<MatchResult>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  if (m.category !== undefined) row.category = m.category
  if (m.weightClass !== undefined) row.weight_class = m.weightClass
  if (m.gender !== undefined) row.gender = m.gender
  if (m.round !== undefined) row.round = m.round
  if (m.redAthlete !== undefined) row.red_athlete = m.redAthlete
  if (m.blueAthlete !== undefined) row.blue_athlete = m.blueAthlete
  if (m.redScore !== undefined) row.red_score = m.redScore
  if (m.blueScore !== undefined) row.blue_score = m.blueScore
  if (m.winner !== undefined) row.winner = m.winner || null
  if (m.status !== undefined) row.status = m.status
  if (m.mat !== undefined) row.mat = m.mat
  if (m.startTime !== undefined) row.start_time = m.startTime || null
  return row
}

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
  return row
}
