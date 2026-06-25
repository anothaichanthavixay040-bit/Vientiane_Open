// Config-driven registration forms for Team / Officials / Referee / Hotel.
// Each type writes to its OWN Supabase table (see supabase/schema.sql).
// `table` = destination table; each field's `column` = destination column.

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea'

export interface RegField {
  key: 'name' | 'email' | 'phone' | 'country' | 'organization' | 'role' | 'quantity' | 'notes'
  column: string            // DB column this field maps to
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
  full?: boolean
}

export interface RegTypeConfig {
  type: 'team' | 'official' | 'referee' | 'hotel'
  table: string
  title: string
  emoji: string
  blurb: string
  fields: RegField[]
}

export const REG_TYPES: Record<string, RegTypeConfig> = {
  team: {
    type: 'team',
    table: 'team_registrations',
    title: 'Team Registration',
    emoji: '👥',
    blurb: 'Register your club or national team for the championship.',
    fields: [
      { key: 'organization', column: 'team_name', label: 'Team / Club Name', type: 'text', required: true, placeholder: 'e.g. Vientiane Karate Club', full: true },
      { key: 'name', column: 'manager_name', label: 'Team Manager / Contact Person', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'country', column: 'country', label: 'Country', type: 'text', placeholder: 'e.g. LAO' },
      { key: 'email', column: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', column: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
      { key: 'quantity', column: 'athletes_count', label: 'Number of Athletes', type: 'number', placeholder: 'e.g. 8' },
      { key: 'notes', column: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Anything we should know?', full: true },
    ],
  },
  official: {
    type: 'official',
    table: 'official_registrations',
    title: 'Team Officials Registration',
    emoji: '📋',
    blurb: 'Register coaches, team managers, doctors and delegates.',
    fields: [
      { key: 'name', column: 'full_name', label: 'Full Name', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'role', column: 'role', label: 'Role', type: 'select', required: true, options: ['Coach', 'Team Manager', 'Team Doctor', 'Delegate', 'Other'] },
      { key: 'organization', column: 'team', label: 'Team / Club', type: 'text', placeholder: 'Team or club' },
      { key: 'country', column: 'country', label: 'Country', type: 'text', placeholder: 'e.g. LAO' },
      { key: 'email', column: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', column: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
    ],
  },
  referee: {
    type: 'referee',
    table: 'referee_registrations',
    title: 'Referee Registration',
    emoji: '⚖️',
    blurb: 'For WKF / AKF / National certified referees and judges.',
    fields: [
      { key: 'name', column: 'full_name', label: 'Full Name', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'role', column: 'certification_level', label: 'Certification Level', type: 'select', required: true, options: ['WKF Certified', 'AKF Certified', 'National Certified'] },
      { key: 'notes', column: 'license_no', label: 'License / Certificate No.', type: 'text', placeholder: 'e.g. WKF-12345' },
      { key: 'country', column: 'country', label: 'Country', type: 'text', placeholder: 'e.g. LAO' },
      { key: 'email', column: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', column: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
    ],
  },
  hotel: {
    type: 'hotel',
    table: 'hotel_bookings',
    title: 'Hotel Booking',
    emoji: '🏨',
    blurb: 'Reserve a room at the official HQ hotel (book before 30 April).',
    fields: [
      { key: 'name', column: 'full_name', label: 'Full Name', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'role', column: 'room_type', label: 'Room Type', type: 'select', required: true, options: ['Single — $50', 'Double — $60', 'Triple — $80'] },
      { key: 'quantity', column: 'rooms_count', label: 'Number of Rooms', type: 'number', placeholder: 'e.g. 1' },
      { key: 'notes', column: 'dates', label: 'Check-in → Check-out', type: 'text', placeholder: 'e.g. 28 Aug → 31 Aug', full: true },
      { key: 'organization', column: 'team', label: 'Team / Club', type: 'text', placeholder: 'Team or club (optional)' },
      { key: 'email', column: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', column: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
    ],
  },
}

export const REG_TYPE_KEYS = Object.keys(REG_TYPES)

// form values -> DB row for the type's table
export function regToRow(type: string, values: Record<string, unknown>): Record<string, unknown> {
  const cfg = REG_TYPES[type]
  const row: Record<string, unknown> = {}
  for (const f of cfg.fields) {
    const v = values[f.key]
    if (v === undefined || v === '') continue
    row[f.column] = f.type === 'number' ? (Number(v) || null) : v
  }
  return row
}

// DB row -> unified shape used by the admin Registrations tab
export function rowToReg(type: string, row: Record<string, unknown>) {
  const cfg = REG_TYPES[type]
  const out: Record<string, unknown> = { id: row.id, type, status: row.status, created_at: row.created_at }
  for (const f of cfg.fields) out[f.key] = row[f.column] ?? undefined
  return out
}
