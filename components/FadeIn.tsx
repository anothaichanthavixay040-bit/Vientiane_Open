'use client'
import { useEffect, useRef, ReactNode } from 'react'

export default function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className="fade-in-el" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
