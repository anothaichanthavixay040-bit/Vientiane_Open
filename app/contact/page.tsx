import { Mail, Phone, MessageCircle, Facebook, MapPin, User } from 'lucide-react'

const registerLinks = [
  { label: 'Team Register', href: 'https://forms.gle/HjJ7qCe2ooNUHdSm9' },
  { label: 'Athlete Register', href: 'https://forms.gle/vevCSWHsHTQr8gfz6' },
  { label: 'Team Officials Register', href: 'https://forms.gle/qCAfm3iokE6q38NJA' },
  { label: 'Referee Register', href: 'https://forms.gle/MFmXHnZQ1csU1eo1A' },
  { label: 'Hotel Booking', href: 'https://forms.gle/WsJrt5LViMisrEZG8' },
]

export default function ContactPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <section className="relative py-20 sm:py-28 px-4 bg-[#0a0a0a] grid-bg">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 40% 50% at 20% 50%, rgba(200,16,46,0.1) 0%, transparent 60%)'}}/>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-4">Get In Touch</div>
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-widest">CONTACT <span className="text-[#C8102E]">US</span></h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mt-4"/>
        </div>
      </section>
      <section className="py-16 sm:py-24 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-6">Event Organizer</div>
            <div className="divide-y divide-white/05">
              {[
                { icon: <User size={16}/>, label: 'Organizer', val: 'Ms. Chansouda Phetsiriseng', link: undefined },
                { icon: <Mail size={16}/>, label: 'Email', val: 'chansouda.p@nuol.edu.la', link: 'mailto:chansouda.p@nuol.edu.la' },
                { icon: <Phone size={16}/>, label: 'Phone', val: '+856 20 88899887', link: 'tel:+85620888998877' },
                { icon: <MessageCircle size={16}/>, label: 'WhatsApp', val: '+856 20 22437711', link: 'https://wa.me/85620224377711' },
                { icon: <Facebook size={16}/>, label: 'Facebook', val: 'Vientiane Karate-Do Federation', link: 'https://facebook.com' },
                { icon: <MapPin size={16}/>, label: 'Venue', val: 'Vientiane Center Mall, Vientiane Capital, Laos', link: undefined },
              ].map(item => (
                <div key={item.label} className="py-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#C8102E]/12 border border-[#C8102E]/25 flex items-center justify-center text-[#C8102E] flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-condensed text-[10px] tracking-[3px] uppercase text-[#C9A84C] mb-1">{item.label}</div>
                    {item.link ? (
                      <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm sm:text-base text-white hover:text-[#C9A84C] transition-colors">{item.val}</a>
                    ) : (
                      <div className="text-sm sm:text-base text-white">{item.val}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-6">Quick Registration Links</div>
            <div className="space-y-2 mb-10">
              {registerLinks.map(r => (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between bg-[#1a1a1a] border border-[#C9A84C]/10 p-4 hover:border-[#C8102E]/50 hover:bg-[#C8102E]/05 transition-all group">
                  <span className="font-condensed text-sm tracking-widest uppercase text-white group-hover:text-[#C9A84C] transition-colors">{r.label}</span>
                  <span className="text-[#C9A84C] group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>
            <div className="bg-[#1a1a1a] border border-[#C9A84C]/12 p-6">
              <div className="font-condensed text-xs tracking-[4px] uppercase text-[#C9A84C] mb-3">Send Us a Message</div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">Contact Ms. Chansouda directly via email or WhatsApp for any enquiries about the championship.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="mailto:chansouda.p@nuol.edu.la" className="flex-1 font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-5 py-3 hover:bg-[#ff1a3a] transition-colors text-center" style={{clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)'}}>Email Now</a>
                <a href="https://wa.me/85620224377711" target="_blank" rel="noopener noreferrer" className="flex-1 font-condensed text-sm tracking-[3px] uppercase border border-[#C9A84C] text-[#C9A84C] px-5 py-3 hover:bg-[#C9A84C]/10 transition-colors text-center" style={{clipPath:'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)'}}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
