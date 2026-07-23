import Link from 'next/link'

const faqs = [
  {
    q: 'Can one athlete enter both Kata and Kumite?',
    a: 'Yes. In the Under 21 and Senior categories a competitor may register in 1 or 2 events. Younger categories may also enter Kata and Kumite where those events are offered for their age group.',
  },
  {
    q: 'How is an athlete’s age calculated?',
    a: 'Age is based on the FIRST day of competition — 29 August 2026. Please register the athlete in the category that matches their age on that date.',
  },
  {
    q: 'Which competition rules are used?',
    a: 'The latest WKF / AKF competition rules apply, unless otherwise notified by the Organizer or the Referee Commission in consultation with the WKF / AKF Executive Council.',
  },
  {
    q: 'What are the bout durations?',
    a: 'Senior Kumite 3:00 min · Cadet & Junior 2:00 min · U14 & U12 1:30 min · U10 & U8 1:00 min.',
  },
  {
    q: 'Do athletes bring their own protective equipment?',
    a: 'Yes. Competitors must bring their own WKF / AKF approved equipment (mitts, shin/instep guards, gum shield, etc.). The Organizing Committee has no obligation to provide equipment.',
  },
  {
    q: 'What happens if an athlete is over the weight limit at weigh-in?',
    a: 'Weigh-in is held on 28 August 2026 (17:00–18:00). Weight is verified against WKF / AKF rules; any weight issue is handled by the Organizing Committee at accreditation. Please contact the OC in advance if you have questions.',
  },
  {
    q: 'How much are the entry fees and how do I pay?',
    a: 'Individual event: USD 15 per athlete, per category. Team event: USD 30 per team, per category. Fees are payable to the Organizing Committee upon onsite registration (28 August 2026), or by bank transfer (see Payment below). All bank charges are borne by the payer.',
  },
  {
    q: 'When does registration close? Is on-site registration allowed?',
    a: 'Online registration closes on 15 August 2026. Teams are strongly encouraged to register and arrange payment before the deadline. Please complete registration online in advance rather than relying on the day of the event.',
  },
  {
    q: 'Do international teams need an Invitation Letter or visa support?',
    a: 'If you require an official Invitation Letter to support a visa application, please contact the Organizing Committee by email (vientianekaratefederation@gmail.com) well before the registration deadline.',
  },
  {
    q: 'What are the awards?',
    a: 'The top 4 competitors in each category receive medals and certificates. All participants receive a participation certificate.',
  },
  {
    q: 'Where is the venue and official hotel?',
    a: 'Competition venue: 1st Floor, Vientiane Center Mall, Vientiane Capital, Laos. Official HQ hotel: Landmark Vientiane Life Center Hotel (Single $50 / Double $60 / Triple $80, breakfast included) — reserve via the OC before 15 August 2026.',
  },
]

export default function FaqPage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 bg-[#0a0a0a] grid-bg overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 30% 50%, rgba(200,16,46,0.12) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-4">Help</div>
          <h1 className="font-bebas text-5xl sm:text-7xl text-white tracking-widest">FREQUENTLY ASKED <span className="text-[#C8102E]">QUESTIONS</span></h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mt-4" />
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 bg-[#111]">
        <div className="max-w-4xl mx-auto space-y-2">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-[#1a1a1a] border border-[#C9A84C]/10">
              <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer select-none hover:bg-[#C8102E]/5 transition-colors list-none">
                <span className="font-condensed text-sm sm:text-base tracking-wide text-white">{f.q}</span>
                <span className="text-[#C9A84C] text-xs group-open:rotate-180 transition-transform flex-shrink-0">▼</span>
              </summary>
              <div className="px-4 sm:px-5 pb-5 -mt-1 text-sm text-white/65 leading-relaxed border-t border-white/5 pt-4">{f.a}</div>
            </details>
          ))}

          <div className="mt-8 bg-[#1a1a1a] border border-[#C9A84C]/15 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <div className="font-condensed text-sm tracking-[3px] uppercase text-[#C9A84C] mb-1">Still have a question?</div>
              <p className="text-sm text-white/60">Contact the Organizing Committee — we’re happy to help.</p>
            </div>
            <Link href="/contact" className="sm:ml-auto font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-6 py-3 hover:bg-[#ff1a3a] transition-colors flex-shrink-0" style={{ clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
