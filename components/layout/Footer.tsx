import Link from 'next/link'
import { Mail, Phone, MessageCircle, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#C9A84C]/15 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-bebas text-2xl text-white tracking-widest mb-1">VIENTIANE <span className="text-[#C9A84C]">KARATE</span></div>
            <div className="font-bebas text-2xl text-white tracking-widest mb-4">FEDERATION</div>
            <p className="text-sm text-white/50 leading-relaxed">Official governing body for karate in Vientiane Capital, Laos.</p>
          </div>
          {/* Quick links */}
          <div>
            <div className="font-condensed text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Quick Links</div>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About VKF'], ['/events', 'Events'], ['/checkin', 'Athlete Check-In']].map(([href,label]) => (
                <li key={href}><Link href={href} className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors font-condensed tracking-wide">{label}</Link></li>
              ))}
            </ul>
          </div>
          {/* Register */}
          <div>
            <div className="font-condensed text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Registration</div>
            <ul className="space-y-2">
              {[
                ['https://forms.gle/HjJ7qCe2ooNUHdSm9','Team Register'],
                ['https://forms.gle/vevCSWHsHTQr8gfz6','Athlete Register'],
                ['https://forms.gle/qCAfm3iokE6q38NJA','Team Officials'],
                ['https://forms.gle/MFmXHnZQ1csU1eo1A','Referee Register'],
                ['https://forms.gle/WsJrt5LViMisrEZG8','Hotel Booking'],
              ].map(([href, label]) => (
                <li key={label}><a href={href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors font-condensed tracking-wide">{label}</a></li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <div className="font-condensed text-xs tracking-widest uppercase text-[#C9A84C] mb-4">Contact</div>
            <ul className="space-y-3">
              <li><a href="mailto:chansouda.p@nuol.edu.la" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#C9A84C] transition-colors"><Mail size={14}/> chansouda.p@nuol.edu.la</a></li>
              <li><a href="tel:+85620888998877" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#C9A84C] transition-colors"><Phone size={14}/> +856 20 88899887</a></li>
              <li><a href="https://wa.me/85620224377711" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#C9A84C] transition-colors"><MessageCircle size={14}/> +856 20 22437711</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#C9A84C] transition-colors"><Facebook size={14}/> Vientiane Karate-Do Federation</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30 font-condensed tracking-wide">© 2026 Vientiane Karate Federation. All rights reserved.</p>
          <p className="text-xs text-white/20 font-condensed">WKF / AKF Certified Championship</p>
        </div>
      </div>
    </footer>
  )
}
