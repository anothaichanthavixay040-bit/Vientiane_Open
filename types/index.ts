export interface Athlete {
  id: string
  name: string
  country: string
  category: string
  weightClass: string
  gender: 'male' | 'female'
  qrCode: string
  checkedIn: boolean
  checkedInAt?: string
  teamName?: string
  bib: string
}

export interface CheckInEvent {
  athleteId: string
  athleteName: string
  category: string
  country: string
  timestamp: string
  status: 'success' | 'already_checked' | 'not_found'
}

export interface MatchResult {
  id: string
  category: string
  weightClass: string
  gender: string
  round: string
  redAthlete: string
  blueAthlete: string
  redScore: number
  blueScore: number
  winner?: string
  status: 'scheduled' | 'live' | 'completed'
  mat: number
  startTime?: string
}

export interface Category {
  name: string
  ageRange: string
  femaleWeights: string[]
  maleWeights: string[]
  hasTeamKata: boolean
  hasTeamKumite?: boolean
  boutDuration: string
}
