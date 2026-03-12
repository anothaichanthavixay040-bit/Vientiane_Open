import { Shield, Target, Users, Globe } from 'lucide-react'

const pillars = [
  { icon: <Shield size={20} />, title: 'Discipline', desc: 'Building character through rigorous training and unwavering commitment to the martial arts way.' },
  { icon: <Target size={20} />, title: 'Excellence', desc: 'Striving for technical mastery and peak performance at every level of competition.' },
  { icon: <Users size={20} />, title: 'Community', desc: 'Empowering youth and strengthening Lao society through the universal language of sport.' },
  { icon: <Globe size={20} />, title: 'Integrity', desc: 'Upholding the values, ethics, and spirit of martial arts both on and off the tatami.' },
]

export default function AboutPage() {
  return (
    <div className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 bg-[#0a0a0a] grid-bg overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 30% 50%, rgba(200,16,46,0.12) 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-4">Who We Are</div>
          <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-white tracking-widest mb-2">ABOUT <span className="text-[#C8102E]">VKF</span></h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mx-auto mt-4 mb-8" />
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl mx-auto">
            The Vientiane Karate Federation — shaping champions, empowering communities, and elevating Lao martial arts on the world stage.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24 px-4 bg-[#111]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Emblem */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -top-4 -left-4 right-4 bottom-4 border border-[#C8102E]/20" />
              <div className="bg-[#1a1a1a] border border-[#C9A84C]/15 p-10 sm:p-14">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <svg viewBox="0 0 300 300" className="w-56 h-56 sm:w-72 sm:h-72 mx-auto">
                  <polygon points="150,10 270,80 270,220 150,290 30,220 30,80" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="2" />
                  <polygon points="150,40 245,95 245,205 150,260 55,205 55,95" fill="none" stroke="rgba(200,16,46,0.35)" strokeWidth="1.5" />
                  <circle cx="150" cy="150" r="70" fill="rgba(200,16,46,0.07)" stroke="rgba(200,16,46,0.45)" strokeWidth="2" />
                  <text x="150" y="128" textAnchor="middle" fontFamily="Bebas Neue, sans-serif" fontSize="42" fill="rgba(200,16,46,0.9)" letterSpacing="4">VKF</text>
                  <text x="150" y="160" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="10" fill="rgba(201,168,76,0.8)" letterSpacing="3">VIENTIANE</text>
                  <text x="150" y="177" textAnchor="middle" fontFamily="Barlow Condensed, sans-serif" fontSize="10" fill="rgba(201,168,76,0.8)" letterSpacing="3">KARATE FEDERATION</text>
                  <polygon points="150,62 155,76 170,76 158,85 163,99 150,91 137,99 142,85 130,76 145,76" fill="rgba(200,16,46,0.7)" />
                </svg>
                <blockquote className="text-center mt-6 text-[#C9A84C] italic text-sm border-l-2 border-[#C8102E] pl-4 ml-4 leading-relaxed">
                  "Discipline, Excellence, and Integrity — the foundation of every VKF champion."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-3">Our Mission</div>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest mb-2">BUILDING THE <span className="text-[#C8102E]">NEXT</span></h2>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-widest mb-6">GENERATION</h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8102E] to-[#C9A84C] mb-6" />
            <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
              <p>The Vientiane Karate Federation (VKF) is the official governing body dedicated to the promotion, development, and advancement of karate in the capital city of Laos.</p>
              <p>As a leading force in the nation's martial arts community, VKF plays a pivotal role in nurturing athletes of all ages and preparing them to represent Vientiane and Laos with pride and distinction on both national and international stages.</p>
              <p>Through our structured regional coaching programs and talent development initiatives, we are committed to building a new generation of martial artists who exemplify discipline, technical excellence, resilience, and integrity.</p>
              <p>VKF stands not only as a sporting organization, but also as a driver of youth empowerment and community engagement. With the support of valued partners and sponsors, we aim to expand opportunities, enhance training standards, and elevate the global presence of Lao athletes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 sm:py-24 px-4 bg-[#0a0a0a] grid-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="font-condensed text-xs tracking-[5px] text-[#C9A84C] uppercase mb-3">Core Values</div>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-widest">OUR <span className="text-[#C8102E]">PILLARS</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map(p => (
              <div key={p.title} className="bg-[#111] border border-white/5 border-l-4 border-l-[#C8102E] p-6 hover:border-[#C9A84C]/20 transition-colors">
                <div className="w-10 h-10 bg-[#C8102E]/15 border border-[#C8102E]/30 flex items-center justify-center text-[#C8102E] mb-4">{p.icon}</div>
                <div className="font-condensed text-sm tracking-[3px] uppercase text-[#C9A84C] mb-2">{p.title}</div>
                <p className="text-xs text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
