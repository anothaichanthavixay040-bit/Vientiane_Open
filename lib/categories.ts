import { Category } from '@/types'

// Categories & weight classes — per the official Bulletin V2
// (Vientiane Open Karate Championships 2026).
export const categories: Category[] = [
  {
    name: 'Seniors', ageRange: '18 & older',
    femaleWeights: ['-50kg','-55kg','-61kg','-68kg','+68kg'],
    maleWeights: ['-55kg','-60kg','-67kg','-75kg','-84kg','+84kg'],
    hasTeamKata: true, hasTeamKumite: true, boutDuration: '3:00 min'
  },
  {
    name: 'Under 21', ageRange: '18–20',
    femaleWeights: ['-50kg','-55kg','-61kg','-68kg','+68kg'],
    maleWeights: ['-55kg','-60kg','-67kg','-75kg','-84kg','+84kg'],
    hasTeamKata: false, boutDuration: '3:00 min'
  },
  {
    name: 'Juniors', ageRange: '16–17',
    femaleWeights: ['-48kg','-53kg','-59kg','+59kg'],
    maleWeights: ['-55kg','-61kg','-68kg','-76kg','+76kg'],
    hasTeamKata: true, hasTeamKumite: true, boutDuration: '2:00 min'
  },
  {
    name: 'Cadets', ageRange: '14–15',
    femaleWeights: ['-47kg','-54kg','-61kg','+61kg'],
    maleWeights: ['-52kg','-57kg','-63kg','-70kg','+70kg'],
    hasTeamKata: true, boutDuration: '2:00 min'
  },
  {
    name: 'Under 14', ageRange: '12–13',
    femaleWeights: ['-42kg','-47kg','-52kg','+52kg'],
    maleWeights: ['-45kg','-50kg','-55kg','+55kg'],
    hasTeamKata: true, boutDuration: '1:30 min'
  },
  {
    name: 'Under 12', ageRange: '10–11',
    femaleWeights: ['-30kg','-35kg','-40kg','-44kg','+44kg'],
    maleWeights: ['-30kg','-35kg','-40kg','-45kg','+45kg'],
    hasTeamKata: true, boutDuration: '1:30 min'
  },
  {
    name: 'Under 10', ageRange: '8–9',
    femaleWeights: ['-25kg','-30kg','-35kg','-40kg','+40kg'],
    maleWeights: ['-25kg','-30kg','-35kg','-40kg','+40kg'],
    hasTeamKata: true, boutDuration: '1:00 min'
  },
  {
    name: 'Under 8', ageRange: '6–7',
    femaleWeights: ['-25kg','-30kg','-35kg','-40kg','+40kg'],
    maleWeights: ['-25kg','-30kg','-35kg','-40kg','+40kg'],
    hasTeamKata: true, boutDuration: '1:00 min'
  },
  {
    name: 'U6', ageRange: '5 & under',
    femaleWeights: ['-20kg','-30kg','+30kg'],
    maleWeights: ['-20kg','-30kg','+30kg'],
    hasTeamKata: false, boutDuration: '1:00 min'
  },
]

// Age is calculated on the competition's first day (Bulletin V2).
export const AGE_REFERENCE = '2026-08-29'

// Age in whole years as of the reference date — a birthday that falls after
// the reference date this year does not count yet.
export function ageOn(dob: string, ref: string = AGE_REFERENCE): number | null {
  if (!dob) return null
  const b = new Date(dob), r = new Date(ref)
  if (isNaN(b.getTime()) || isNaN(r.getTime())) return null
  let age = r.getFullYear() - b.getFullYear()
  if (r.getMonth() < b.getMonth() || (r.getMonth() === b.getMonth() && r.getDate() < b.getDate())) age--
  return age
}

// Deterministic, non-overlapping age → category. Boundaries are inclusive going
// up: reach the next band's minimum age and you move up — no free choice.
export function categoryForAge(age: number): string {
  if (age <= 5) return 'U6'
  if (age <= 7) return 'Under 8'
  if (age <= 9) return 'Under 10'
  if (age <= 11) return 'Under 12'
  if (age <= 13) return 'Under 14'
  if (age <= 15) return 'Cadets'
  if (age <= 17) return 'Juniors'
  if (age <= 20) return 'Under 21'
  return 'Seniors'
}
