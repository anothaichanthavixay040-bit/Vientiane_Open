// Standalone self-check (kept out of the app bundle). Run: npx tsx lib/categories.selfcheck.ts
import { ageOn, categoryForAge, categoriesForAge } from './categories'

const eq = (a: unknown, b: unknown, m: string) => { if (a !== b) throw new Error(`${m}: ${a} !== ${b}`) }
eq(ageOn('2008-08-29'), 18, 'birthday on ref day counts')
eq(ageOn('2008-08-30'), 17, 'birthday after ref day does not count')
eq(categoryForAge(5), 'U6', '5→U6')
eq(categoryForAge(6), 'Under 8', '6→Under 8')
eq(categoryForAge(17), 'Juniors', '17→Juniors')
eq(categoryForAge(18), 'Under 21', '18→Under 21')
eq(categoryForAge(21), 'Seniors', '21→Seniors')

const eqArr = (a: string[], b: string[], m: string) => eq(a.join(','), b.join(','), m)
eqArr(categoriesForAge(17), ['Juniors'], '17 → Juniors only')
eqArr(categoriesForAge(18), ['Under 21', 'Seniors'], '18 → U21 or Seniors')
eqArr(categoriesForAge(20), ['Under 21', 'Seniors'], '20 → U21 or Seniors')
eqArr(categoriesForAge(21), ['Seniors'], '21 → Seniors only')
console.log('categories self-check ok')
