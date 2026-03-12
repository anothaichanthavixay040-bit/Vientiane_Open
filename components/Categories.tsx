'use client'
import { useState } from 'react'

type Category = {
  label: string
  age: string
  female: string[]
  male: string[]
}

const categories: Category[] = [
  {
    label: 'Seniors', age: '18 years old & older',
    female: ['Individual Kata', 'Team Kata', 'Team Kumite', 'Individual Kumite -50kg', 'Individual Kumite -55kg', 'Individual Kumite -61kg', 'Individual Kumite -68kg', 'Individual Kumite +68kg'],
    male: ['Individual Kata', 'Team Kata', 'Team Kumite', 'Individual Kumite -55kg', 'Individual Kumite -60kg', 'Individual Kumite -67kg', 'Individual Kumite -75kg', 'Individual Kumite -84kg', 'Individual Kumite +84kg'],
  },
  {
    label: 'Under 21', age: '18–20 years old',
    female: ['Individual Kata', 'Individual Kumite -50kg', 'Individual Kumite -55kg', 'Individual Kumite -61kg', 'Individual Kumite -68kg', 'Individual Kumite +68kg'],
    male: ['Individual Kata', 'Individual Kumite -55kg', 'Individual Kumite -60kg', 'Individual Kumite -67kg', 'Individual Kumite -75kg', 'Individual Kumite -84kg', 'Individual Kumite +84kg'],
  },
  {
    label: 'Juniors', age: '16–17 years old',
    female: ['Individual Kata', 'Team Kata', 'Individual Kumite -48kg', 'Individual Kumite -53kg', 'Individual Kumite -59kg', 'Individual Kumite +59kg'],
    male: ['Individual Kata', 'Team Kata', 'Individual Kumite -55kg', 'Individual Kumite -61kg', 'Individual Kumite -68kg', 'Individual Kumite -76kg', 'Individual Kumite +76kg'],
  },
  {
    label: 'Cadets', age: '14–15 years old',
    female: ['Individual Kata', 'Team Kata', 'Individual Kumite -47kg', 'Individual Kumite -54kg', 'Individual Kumite -61kg', 'Individual Kumite +61kg'],
    male: ['Individual Kata', 'Team Kata', 'Individual Kumite -52kg', 'Individual Kumite -57kg', 'Individual Kumite -63kg', 'Individual Kumite -70kg', 'Individual Kumite +70kg'],
  },
  {
    label: 'Under 14', age: '12–13 years old',
    female: ['Individual Kata', 'Team Kata', 'Individual Kumite -42kg', 'Individual Kumite -47kg', 'Individual Kumite -52kg', 'Individual Kumite +52kg'],
    male: ['Individual Kata', 'Team Kata', 'Individual Kumite -45kg', 'Individual Kumite -50kg', 'Individual Kumite -55kg', 'Individual Kumite +55kg'],
  },
  {
    label: 'Under 12', age: '10–11 years old',
    female: ['Individual Kata', 'Team Kata (Mixed)', 'Individual Kumite -30kg', 'Individual Kumite -35kg', 'Individual Kumite -40kg', 'Individual Kumite -44kg', 'Individual Kumite +44kg'],
    male: ['Individual Kata', 'Individual Kumite -30kg', 'Individual Kumite -35kg', 'Individual Kumite -40kg', 'Individual Kumite -45kg', 'Individual Kumite +45kg'],
  },
  {
    label: 'Under 10', age: '8–9 years old',
    female: ['Individual Kata', 'Team Kata (Mixed)', 'Individual Kumite -25kg', 'Individual Kumite -30kg', 'Individual Kumite -35kg', 'Individual Kumite -40kg', 'Individual Kumite +40kg'],
    male: ['Individual Kata', 'Individual Kumite -25kg', 'Individual Kumite -30kg', 'Individual Kumite -35kg', 'Individual Kumite -40kg', 'Individual Kumite +40kg'],
  },
  {
    label: 'Under 8', age: '7 years old & under',
    female: ['Individual Kata', 'Team Kata (Mixed)', 'Individual Kumite -25kg', 'Individual Kumite -30kg', 'Individual Kumite -35kg', 'Individual Kumite -40kg', 'Individual Kumite +40kg'],
    male: ['Individual Kata', 'Individual Kumite -25kg', 'Individual Kumite -30kg', 'Individual Kumite -35kg', 'Individual Kumite -40kg', 'Individual Kumite +40kg'],
  },
]

export default function Categories() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ marginTop: 40 }}>
      <div style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: 28, letterSpacing: 3, color: 'white', marginBottom: 16,
      }}>Competition Categories</div>

      {categories.map((cat, i) => (
        <div
          key={i}
          style={{
            border: '1px solid rgba(201,168,76,0.12)',
            marginBottom: 8, overflow: 'hidden',
          }}
        >
          {/* Header */}
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%', background: open === i ? 'rgba(200,16,46,0.06)' : 'var(--dark2)',
              padding: '16px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', border: 'none',
              transition: 'background 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: 16, letterSpacing: 2, textTransform: 'uppercase', color: 'white',
              }}>{cat.label}</span>
              <span style={{ fontSize: 13, color: 'rgba(232,232,232,0.4)' }}>{cat.age}</span>
            </div>
            <span style={{
              color: 'var(--gold)', fontSize: 12,
              transform: open === i ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.3s', display: 'inline-block',
            }}>▼</span>
          </button>

          {/* Body */}
          {open === i && (
            <div style={{ padding: 24, background: 'rgba(0,0,0,0.3)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="cat-cols">
                {(['female', 'male'] as const).map(gender => (
                  <div key={gender}>
                    <div style={{
                      fontFamily: 'var(--font-barlow-condensed)',
                      fontSize: 12, letterSpacing: 3, textTransform: 'uppercase',
                      color: 'var(--gold)', marginBottom: 12,
                      paddingBottom: 8, borderBottom: '1px solid rgba(201,168,76,0.2)',
                    }}>{gender === 'female' ? 'Female' : 'Male'}</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {cat[gender].map((item, j) => (
                        <li key={j} style={{
                          fontSize: 13, color: 'rgba(232,232,232,0.7)',
                          padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                          display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                          <span style={{ color: 'var(--red)', fontSize: 10 }}>—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <style>{`@media(max-width:600px){ .cat-cols{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  )
}
