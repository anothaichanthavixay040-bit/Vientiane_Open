'use client'
import { Check } from 'lucide-react'

// Event options an athlete can enter. Team events are split male / female.
export const EVENT_GROUPS = [
  { heading: 'Individual', options: ['Kumite', 'Kata'] },
  { heading: 'Team', options: ['Kumite Team (Male)', 'Kumite Team (Female)', 'Kata Team (Male)', 'Kata Team (Female)'] },
]

export function EventCheckboxes({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) =>
    onChange(value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt])

  return (
    <div className="space-y-4">
      {EVENT_GROUPS.map(g => (
        <div key={g.heading}>
          <div className="font-condensed text-[11px] tracking-[2px] uppercase text-[#C9A84C] mb-2">{g.heading}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {g.options.map(opt => {
              const on = value.includes(opt)
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => toggle(opt)}
                  aria-pressed={on}
                  className={`flex items-center gap-2.5 border px-3 py-2.5 text-left transition-colors ${on ? 'border-[#C8102E] bg-[#C8102E]/10' : 'border-[#C9A84C]/20 hover:border-[#C9A84C]/50'}`}
                >
                  <span className={`w-4 h-4 flex-shrink-0 flex items-center justify-center border transition-colors ${on ? 'bg-[#C8102E] border-[#C8102E]' : 'border-white/30'}`}>
                    {on && <Check size={12} className="text-white" />}
                  </span>
                  <span className="text-sm text-white">{opt}</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
