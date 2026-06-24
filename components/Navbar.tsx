'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: 70,
          background: 'rgba(10,10,10,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(201,168,76,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 48px',
          transition: 'border-color 0.3s',
        }}
      >
        {/* Logo */}
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div
            style={{
              width: 42, height: 42,
              background: 'var(--red)',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-bebas)', fontSize: 16, color: 'white', letterSpacing: 1,
              flexShrink: 0,
            }}
          >VKF</div>
          <div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, letterSpacing: 2, color: 'white', lineHeight: 1.1 }}>
              Vientiane Karate
            </div>
            <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, color: 'var(--gold)', textTransform: 'uppercase' }}>
              Federation
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  fontFamily: 'var(--font-barlow-condensed)',
                  fontSize: 14, letterSpacing: 2, textTransform: 'uppercase',
                  color: 'var(--light)', textDecoration: 'none',
                }}
                className="nav-link"
              >{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#events"
          className="clip-skew-sm hidden md:inline-block"
          style={{
            background: 'var(--red)', color: 'white',
            fontFamily: 'var(--font-barlow-condensed)',
            fontSize: 13, letterSpacing: 2, textTransform: 'uppercase',
            padding: '9px 22px', textDecoration: 'none',
          }}
        >Register Now</a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{ display: 'flex', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          className="flex md:hidden"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 24, height: 2, background: 'var(--light)', display: 'block' }} />
          ))}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed', top: 70, left: 0, right: 0, bottom: 0, zIndex: 99,
          background: 'rgba(10,10,10,0.97)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 32,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s ease',
        }}
      >
        {links.map(l => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 36, letterSpacing: 4, color: 'white', textDecoration: 'none',
            }}
          >{l.label}</a>
        ))}
      </div>

      <style>{`
        .nav-link { position: relative; padding-bottom: 4px; transition: color 0.3s; }
        .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--gold); transition:width 0.3s; }
        .nav-link:hover { color: var(--gold) !important; }
        .nav-link:hover::after { width: 100%; }
      `}</style>
    </>
  )
}
