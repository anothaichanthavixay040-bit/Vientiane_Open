// Config-driven registration forms for Team / Officials / Referee / Hotel.
// Each writes to the `registrations` table via /api/registrations.

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea'

export interface RegField {
  key: 'name' | 'email' | 'phone' | 'country' | 'organization' | 'role' | 'quantity' | 'notes'
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: string[]
  full?: boolean // span full width
}

export interface RegTypeConfig {
  type: 'team' | 'official' | 'referee' | 'hotel'
  title: string
  emoji: string
  blurb: string
  fields: RegField[]
}

export const REG_TYPES: Record<string, RegTypeConfig> = {
  team: {
    type: 'team',
    title: 'Team Registration',
    emoji: '👥',
    blurb: 'Register your club or national team for the championship.',
    fields: [
      { key: 'organization', label: 'Team / Club Name', type: 'text', required: true, placeholder: 'e.g. Vientiane Karate Club', full: true },
      { key: 'name', label: 'Team Manager / Contact Person', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'country', label: 'Country', type: 'text', placeholder: 'e.g. LAO' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
      { key: 'quantity', label: 'Number of Athletes', type: 'number', placeholder: 'e.g. 8' },
      { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Anything we should know?', full: true },
    ],
  },
  official: {
    type: 'official',
    title: 'Team Officials Registration',
    emoji: '📋',
    blurb: 'Register coaches, team managers, doctors and delegates.',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'role', label: 'Role', type: 'select', required: true, options: ['Coach', 'Team Manager', 'Team Doctor', 'Delegate', 'Other'] },
      { key: 'organization', label: 'Team / Club', type: 'text', placeholder: 'Team or club' },
      { key: 'country', label: 'Country', type: 'text', placeholder: 'e.g. LAO' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
    ],
  },
  referee: {
    type: 'referee',
    title: 'Referee Registration',
    emoji: '⚖️',
    blurb: 'For WKF / AKF / National certified referees and judges.',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'role', label: 'Certification Level', type: 'select', required: true, options: ['WKF Certified', 'AKF Certified', 'National Certified'] },
      { key: 'notes', label: 'License / Certificate No.', type: 'text', placeholder: 'e.g. WKF-12345' },
      { key: 'country', label: 'Country', type: 'text', placeholder: 'e.g. LAO' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
    ],
  },
  hotel: {
    type: 'hotel',
    title: 'Hotel Booking',
    emoji: '🏨',
    blurb: 'Reserve a room at the official HQ hotel (book before 30 April).',
    fields: [
      { key: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Full name' },
      { key: 'role', label: 'Room Type', type: 'select', required: true, options: ['Single — $50', 'Double — $60', 'Triple — $80'] },
      { key: 'quantity', label: 'Number of Rooms', type: 'number', placeholder: 'e.g. 1' },
      { key: 'notes', label: 'Check-in → Check-out', type: 'text', placeholder: 'e.g. 28 Aug → 31 Aug', full: true },
      { key: 'organization', label: 'Team / Club', type: 'text', placeholder: 'Team or club (optional)' },
      { key: 'email', label: 'Email', type: 'email', placeholder: 'name@email.com' },
      { key: 'phone', label: 'Phone / WhatsApp', type: 'tel', placeholder: '+856 …' },
    ],
  },
}

export const REG_TYPE_KEYS = Object.keys(REG_TYPES)
