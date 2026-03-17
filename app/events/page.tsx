import Link from 'next/link'
import { Calendar, MapPin, Clock, ChevronRight, Trophy, Hotel } from 'lucide-react'

const registerLinks = [
  { label: 'Team Register', sub: 'Register your full team', href: 'https://forms.gle/HjJ7qCe2ooNUHdSm9', emoji: '👥' },
  { label: 'Athlete Register', sub: 'USD 15 per athlete / category', href: 'https://docs.google.com/forms/d/e/1FAIpQLScG_45_BylxaqmIWfVU4IaEykOPIJ9h0Zhr9DczLCW_MwFlzA/viewform', emoji: '🥋' },
  { label: 'Team Officials', sub: 'Coaches & team management', href: 'https://forms.gle/qCAfm3iokE6q38NJA', emoji: '📋' },
  { label: 'Referee Register', sub: 'referees', href: 'https://forms.gle/MFmXHnZQ1csU1eo1A', emoji: '⚖️' },
  { label: 'Hotel Booking', sub: 'Official HQ hotel · Book by 30 Apr', href: 'https://forms.gle/WsJrt5LViMisrEZG8', emoji: '🏨' },
]

const schedule = [
  { date: '15 May, 2026', time: '10:00–17:00', activity: 'Arrival, Registration & Accreditation', place: '1st Floor, Vientiane Center Mall' },
  { date: '15 May, 2026', time: '17:00–18:00', activity: 'Weigh-In — All Categories', place: 'Vientiane Center Mall' },
  { date: '15 May, 2026', time: '18:00–19:00', activity: 'Coach Meeting & Drawing of Lots', place: 'Vientiane Center Mall' },
  { date: '16–17 May, 2026', time: 'TBA', activity: 'Competition Days', place: '1st Floor, Vientiane Center Mall' },
]

const categories = [
  { name: 'Seniors', age: '18+', female: ['-50kg','-55kg','-61kg','-68kg','+68kg'], male: ['-60kg','-67kg','-75kg','-84kg','+84kg'], extras: ['Kata','Team Kata','Team Kumite'], bout: '3:00 min' },
  { name: 'Under 21', age: '18–20', female: ['-50kg','-55kg','-61kg','-68kg','+68kg'], male: ['-55kg','-60kg','-67kg','-75kg','-84kg','+84kg'], extras: ['Kata'], bout: '3:00 min' },
  { name: 'Juniors', age: '16–17', female: ['-48kg','-53kg','-59kg','+59kg'], male: ['-55kg','-61kg','-68kg','-76kg','+76kg'], extras: ['Kata','Team Kata'], bout: '2:00 min' },
  { name: 'Cadets', age: '14–15', female: ['-47kg','-54kg','-61kg','+61kg'], male: ['-52kg','-57kg','-63kg','-70kg','+70kg'], extras: ['Kata','Team Kata'], bout: '2:00 min' },
  { name: 'Under 14', age: '12–13', female: ['-42kg','-47kg','-52kg','+52kg'], male: ['-45kg','-50kg','-55kg','+55kg'], extras: ['Kata','Team Kata'], bout: '1:30 min' },
  { name: 'Under 12', age: '10–11', female: ['-30kg','-35kg','-40kg','-44kg','+44kg'], male: ['-30kg','-35kg','-40kg','-45kg','+45kg'], extras: ['Kata','Team Kata (Mixed)'], bout: '1:30 min' },
  { name: 'Under 10', age: '8–9', female: ['-25kg','-30kg','-35kg','-40kg','+40kg'], male: ['-25kg','-30kg','-35kg','-40kg','+40kg'], extras: ['Kata','Team Kata (Mixed)'], bout: '1:00 min' },
  { name: 'Under 8', age: '7 & under', female: ['-25kg','-30kg','-35kg','-40kg','+40kg'], male: ['-25kg','-30kg','-35kg','-40kg','+40kg'], extras: ['Kata','Team Kata (Mixed)'], bout: '1:00 min' },
]

export default function EventsPage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 bg-[#0a0a0a] grid-bg overflow-hidden">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 50% 60% at 70% 50%, rgba(200,16,46,0.12) 0%, transparent 60%)'}}/>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-4">Competitions</div>
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-widest mb-2">UPCOMING <span className="text-[#C8102E]">EVENTS</span></h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mt-4"/>
        </div>
      </section>

      {/* Event card */}
      <section className="py-12 sm:py-20 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-[#1a1a1a] border border-[#C9A84C]/12 border-l-4 border-l-[#C8102E] mb-2">
            <div className="p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-white tracking-widest mb-3">VIENTIANE OPEN KARATE CHAMPIONSHIP 2026</div>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {[
                    { icon: <Calendar size={14}/>, val: '16–17 May, 2026' },
                    { icon: <MapPin size={14}/>, val: 'Vientiane Center Mall, Laos' },
                    { icon: <Clock size={14}/>, val: 'Registration closes: 10 April, 2026' },
                  ].map(m => (
                    <span key={m.val} className="flex items-center gap-1.5 font-condensed text-xs sm:text-sm text-white/60">
                      <span className="text-[#C9A84C]">{m.icon}</span>{m.val}
                    </span>
                  ))}
                </div>
              </div>
              <div className="font-condensed text-xs tracking-[3px] uppercase bg-[#C8102E] text-white px-4 py-2 flex-shrink-0" style={{clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)'}}>
                Open Now
              </div>
            </div>
          </div>

          {/* Info boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
            {[
              // { label: 'Rules', val: 'WKF / AKF', note: 'Latest competition rules apply' },
              { label: 'Categories', val: 'U8 to Senior', note: '8 age groups · Kata & Kumite' },
              { label: 'Age Reference', val: '16 May, 2026', note: 'Age calculated on first day' },
            ].map(b => (
              <div key={b.label} className="bg-[#1a1a1a] border border-[#C9A84C]/08 p-5">
                <div className="font-condensed text-[10px] tracking-[3px] text-[#C9A84C] uppercase mb-1">{b.label}</div>
                <div className="font-condensed text-lg sm:text-xl text-white font-semibold">{b.val}</div>
                <div className="text-xs text-white/40 mt-1">{b.note}</div>
              </div>
            ))}
          </div>

          {/* Registration */}
          <div className="mb-10">
            <div className="font-bebas text-2xl sm:text-3xl text-white tracking-widest mb-4">Registration Links</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {registerLinks.map(r => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#1a1a1a] border border-[#C9A84C]/12 p-4 hover:border-[#C8102E] hover:bg-[#C8102E]/05 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C8102E]/12 border border-[#C8102E]/25 flex items-center justify-center text-xl flex-shrink-0">{r.emoji}</div>
                    <div>
                      <div className="font-condensed text-sm tracking-widest uppercase text-white">{r.label}</div>
                      <div className="text-xs text-white/40 mt-0.5">{r.sub}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#C9A84C] group-hover:translate-x-1 transition-transform flex-shrink-0"/>
                </a>
              ))}
            </div>
            {/* Fees */}
            {/* <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div className="flex-1 bg-[#1a1a1a] border border-[#C9A84C]/12 p-5 flex items-center gap-4">
                <div className="font-bebas text-5xl text-[#C9A84C]">$15</div>
                <div><div className="font-condensed text-[10px] tracking-[3px] text-white/40 uppercase">Individual Event</div><div className="text-sm text-white/60">Per athlete / per category</div></div>
              </div>
              <div className="flex-1 bg-[#1a1a1a] border border-[#C9A84C]/12 p-5 flex items-center gap-4">
                <div className="font-bebas text-5xl text-[#C9A84C]">$30</div>
                <div><div className="font-condensed text-[10px] tracking-[3px] text-white/40 uppercase">Team Event</div><div className="text-sm text-white/60">Per team / per category</div></div>
              </div>
            </div> */}
          </div>

          {/* Schedule */}
          <div className="mb-10">
            <div className="font-bebas text-2xl sm:text-3xl text-white tracking-widest mb-4">Event Programme</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {schedule.map((s, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-[#C9A84C]/08 p-4 sm:p-5 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="font-condensed text-[10px] tracking-[2px] text-[#C9A84C] uppercase">{s.date}</div>
                    <div className="font-bebas text-xl text-[#C8102E] tracking-widest">{s.time}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white">{s.activity}</div>
                    <div className="text-xs text-white/40 mt-1">{s.place}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-10">
            <div className="font-bebas text-2xl sm:text-3xl text-white tracking-widest mb-4">Competition Categories</div>
            <div className="space-y-2">
              {categories.map(cat => (
                <details key={cat.name} className="group bg-[#1a1a1a] border border-[#C9A84C]/10">
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer select-none hover:bg-[#C8102E]/05 transition-colors list-none">
                    <div className="flex items-center gap-4">
                      <span className="font-condensed text-base sm:text-lg tracking-widest uppercase text-white">{cat.name}</span>
                      <span className="text-xs text-white/40">{cat.age}</span>
                      <span className="hidden sm:inline-block font-condensed text-[10px] tracking-[2px] text-[#C9A84C] bg-[#C9A84C]/10 px-2 py-0.5">{cat.bout}</span>
                    </div>
                    <span className="text-[#C9A84C] text-xs group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 border-t border-white/5">
                    {/* Extras */}
                    <div className="flex flex-wrap gap-2 mt-4 mb-4">
                      {cat.extras.map(e => (
                        <span key={e} className="font-condensed text-[10px] tracking-[2px] uppercase bg-[#C8102E]/15 border border-[#C8102E]/25 text-[#C8102E] px-2.5 py-1">{e}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="font-condensed text-[10px] tracking-[3px] uppercase text-[#C9A84C] mb-3 pb-2 border-b border-[#C9A84C]/20">Female Kumite</div>
                        <ul className="space-y-1.5">
                          {cat.female.map(w => (
                            <li key={w} className="flex items-center gap-2 text-sm text-white/65">
                              <span className="text-[#C8102E] text-xs">—</span> Individual Kumite {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-condensed text-[10px] tracking-[3px] uppercase text-[#C9A84C] mb-3 pb-2 border-b border-[#C9A84C]/20">Male Kumite</div>
                        <ul className="space-y-1.5">
                          {cat.male.map(w => (
                            <li key={w} className="flex items-center gap-2 text-sm text-white/65">
                              <span className="text-[#C8102E] text-xs">—</span> Individual Kumite {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="bg-gradient-to-r from-[#C9A84C]/08 to-[#C8102E]/08 border border-[#C9A84C]/20 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="text-4xl">🏅</div>
            <div>
              <div className="font-condensed text-sm tracking-[3px] uppercase text-[#C9A84C] mb-1">Awards & Prizes</div>
              <p className="text-sm text-white/70">Top 4 competitors in each category receive medals and certificates. All participants receive a participation certificate.</p>
            </div>
          </div>

          {/* Hotel */}
          <div className="bg-[#1a1a1a] border border-[#C9A84C]/12 p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex-1">
                <div className="font-condensed text-[10px] tracking-[3px] uppercase text-[#C9A84C] mb-2">Official HQ Hotel</div>
                <div className="font-bebas text-xl sm:text-2xl text-white tracking-widest mb-3">LANDMARK VIENTIANE LIFE CENTER HOTEL ★★★</div>
                <p className="text-sm text-white/60 leading-relaxed mb-4">Set in Vientiane, 1.9 km from Wat Sisaket. Features outdoor swimming pool, free parking, fitness centre. 100m walk to Parkson Mall and directly next to the competition venue (Vientiane Center Mall).</p>
                <div className="flex flex-wrap gap-3">
                  {[['$50','Single'], ['$60','Double'], ['$80','Triple']].map(([price, type]) => (
                    <div key={type} className="bg-[#111] border border-[#C9A84C]/15 px-4 py-3 text-center">
                      <div className="font-bebas text-2xl text-[#C9A84C]">{price}</div>
                      <div className="font-condensed text-[10px] tracking-[2px] uppercase text-white/40">{type}</div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/30 mt-3">★ Rates include breakfast · Must be reserved via OC before 30 April, 2026</p>
              </div>
              <div className="flex-shrink-0">
                <a href="https://forms.gle/WsJrt5LViMisrEZG8" target="_blank" rel="noopener noreferrer"
                  className="font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-3 hover:bg-[#ff1a3a] transition-colors block text-center" style={{clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)'}}>
                  Book Hotel
                </a>
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="mt-4 bg-[#1a1a1a] border border-white/05 p-5 text-xs text-white/40 leading-relaxed">
            <span className="font-condensed tracking-[2px] uppercase text-white/60 mr-2">Payment:</span>
            All entry fees payable upon onsite registration (30 April, 2026). Bank: ST Bank LTD (STB) · Beneficiary: Vientiane Karate Federation · Acct: 0010120006230 · Swift: STBDLALA. All bank charges borne by payer.
          </div>
        </div>
      </section>
    </div>
  )
}
