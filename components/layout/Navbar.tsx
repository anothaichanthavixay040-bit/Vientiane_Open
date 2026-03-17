'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  // { href: '/checkin', label: 'Check-In' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
    document.body.style.overflow = ''
  }, [pathname])

  const toggleMenu = () => {
    setOpen(p => {
      document.body.style.overflow = !p ? 'hidden' : ''
      return !p
    })
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#C9A84C]/30' : 'bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[#C9A84C]/10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Image
                src="/lo.png"
                alt="VKF Logo"
                width={44}
                height={44}
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
                priority
              />
              <div className="leading-tight">
                <div className="font-bebas text-white text-base sm:text-lg tracking-widest leading-none">VIENTIANE KARATE</div>
                <div className="font-condensed text-[#C9A84C] text-[10px] sm:text-xs tracking-[0.2em] uppercase">Federation</div>
              </div>
            </Link>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-8">
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className={`font-condensed text-sm tracking-widest uppercase transition-colors relative group ${pathname === l.href ? 'text-[#C9A84C]' : 'text-[#e8e8e8] hover:text-[#C9A84C]'}`}>
                    {l.label}
                    {l.href === '/results' && (
                      <span className="ml-1.5 inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#C8102E] rounded-full live-pulse" />
                      </span>
                    )}
                    <span className={`absolute -bottom-1 left-0 h-px bg-[#C9A84C] transition-all ${pathname === l.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/events" className="font-condensed text-xs tracking-widest uppercase bg-[#C8102E] text-white px-5 py-2.5 hover:bg-[#ff1a3a] transition-colors" style={{ clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' }}>
                Register Now
              </Link>
            </div>

            {/* Hamburger */}
            <button onClick={toggleMenu} className="lg:hidden p-2 text-white" aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-400 lg:hidden 
    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{
          top: '0', // แนะนำให้ใช้ 0 เพื่อให้เบลอทั้งหน้าจอจะดูพรีเมียมกว่า
          backgroundColor: 'rgba(10, 10, 10, 0.8)', // สีดำแบบโปร่งแสง 80%
          backdropFilter: open ? 'blur(12px)' : 'blur(0px)', // สั่งเบลอพื้นหลัง
          WebkitBackdropFilter: open ? 'blur(12px)' : 'blur(0px)', // รองรับ Safari
        }}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href}
            className={`font-bebas text-4xl tracking-widest transition-all duration-300 flex items-center gap-3 ${pathname === l.href ? 'text-[#C8102E]' : 'text-white hover:text-[#C9A84C]'}`}
            style={{ transitionDelay: `${i * 60}ms`, opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(20px)' }}
          >
            {l.label}
            {l.href === '/results' && <span className="w-2 h-2 bg-[#C8102E] rounded-full live-pulse" />}
          </Link>
        ))}
        <Link href="/events" onClick={() => { setOpen(false); document.body.style.overflow = '' }}
          className="mt-4 font-condensed text-sm tracking-widest uppercase bg-[#C8102E] text-white px-8 py-3 hover:bg-[#ff1a3a] transition-colors"
          style={{ clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' }}>
          Register Now
        </Link>
      </div>
    </>
  )
}
