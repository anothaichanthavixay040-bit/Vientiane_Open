import { Category } from '@/types'

export const categories: Category[] = [
  {
    name: 'Seniors', ageRange: '18+',
    femaleWeights: ['-50kg','-55kg','-61kg','-68kg','+68kg'],
    maleWeights: ['-60kg','-67kg','-75kg','-84kg','+84kg'],
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
    hasTeamKata: true, boutDuration: '2:00 min'
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
    name: 'Under 8', ageRange: '7 & under',
    femaleWeights: ['-25kg','-30kg','-35kg','-40kg','+40kg'],
    maleWeights: ['-25kg','-30kg','-35kg','-40kg','+40kg'],
    hasTeamKata: true, boutDuration: '1:00 min'
  },
]
