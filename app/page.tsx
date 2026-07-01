import Link from 'next/link'
import FeaturedTicket from '@/components/FeaturedTicket'
import Countdown from '@/components/Countdown'

export default function HomePage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden grid-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0808] to-[#0a0a0a]"/>
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 60% 70% at 70% 50%, rgba(200,16,46,0.15) 0%, transparent 60%)'}}/>

        {/* Decorative text */}
        {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bebas text-[120px] sm:text-[180px] lg:text-[220px] text-[#C8102E]/5 leading-none select-none hidden sm:block" style={{writingMode:'vertical-rl', letterSpacing:'20px'}}>VKF</div> */}

        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 font-condensed text-[11px] sm:text-xs tracking-[4px] text-[#C9A84C] border border-[#C9A84C]/40 px-4 py-2 mb-6 sm:mb-8">
            <span>◆</span> OFFICIAL GOVERNING BODY · LAOS <span>◆</span>
          </div>

          <h1 className="font-bebas text-[72px] sm:text-[110px] lg:text-[140px] leading-[0.88] tracking-[3px] text-white mb-4" style={{animationDelay:'0.1s'}}>
            VIENTIANE<br/>
            <span className="text-[#C8102E]">KARATE</span>
          </h1>
          <div className="font-bebas text-3xl sm:text-5xl lg:text-6xl tracking-[8px] sm:tracking-[12px] text-[#C9A84C] mb-6">FEDERATION</div>

          <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
            Developing champions, empowering youth, and elevating the spirit of karate across Laos and the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link href="/events" className="w-full sm:w-auto font-condensed text-sm tracking-[3px] uppercase bg-[#C8102E] text-white px-8 py-3.5 hover:bg-[#ff1a3a] transition-colors text-center" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              View Events
            </Link>
            {/* <Link href="/checkin" className="w-full sm:w-auto font-condensed text-sm tracking-[3px] uppercase border border-[#C9A84C] text-[#C9A84C] px-8 py-3.5 hover:bg-[#C9A84C]/10 transition-colors text-center" style={{clipPath:'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)'}}>
              Athlete Check-In
            </Link> */}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 font-condensed text-[10px] tracking-[3px]">
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A84C]/60 to-transparent animate-pulse"/>
          SCROLL
        </div>
      </section>

      {/* Countdown to registration deadline */}
      <Countdown />

      {/* Featured Event — Ticket (opens detail modal) */}
      <FeaturedTicket />

    </div>
  )
}
