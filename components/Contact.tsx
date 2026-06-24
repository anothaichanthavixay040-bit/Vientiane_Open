'use client'
import { useState } from 'react'
import FadeIn from './FadeIn'

const contactItems = [
  { icon: '👤', label: 'Event Organizer', value: 'Ms. Chansouda Phetsiriseng', href: null },
  { icon: '✉️', label: 'Email', value: 'chansouda.p@nuol.edu.la', href: 'mailto:chansouda.p@nuol.edu.la' },
  { icon: '📞', label: 'Phone', value: '+856 20 88899887', href: 'tel:+85620888998877' },
  { icon: '💬', label: 'WhatsApp', value: '+856 20 22437711', href: 'https://wa.me/85620224377711' },
  { icon: '📘', label: 'Facebook', value: 'Vientiane Karate-Do Federation', href: 'https://facebook.com' },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!name || !email || !message) { alert('Please fill in all required fields.'); return }
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    window.location.href = `mailto:chansouda.p@nuol.edu.la?subject=${encodeURIComponent('[VKF Website] ' + (subject || 'General Enquiry'))}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <section id="contact" style={{ background: 'var(--dark2)', padding: '100px 48px' }} className="contact-section">
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="contact-grid">

        {/* Left */}
        <div>
          <FadeIn><div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 12, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Get In Touch</div></FadeIn>
          <FadeIn delay={80}><h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: 3, color: 'white', marginBottom: 20 }}>Contact <span style={{ color: 'var(--red)' }}>Us</span></h2></FadeIn>
          <FadeIn delay={160}><div style={{ width: 60, height: 3, background: 'linear-gradient(to right, var(--red), var(--gold))', marginBottom: 32 }} /></FadeIn>

          {contactItems.map((item, i) => (
            <FadeIn key={item.label} delay={i * 60}>
              <div style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                marginBottom: 28, paddingBottom: 28,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: 'rgba(200,16,46,0.12)',
                  border: '1px solid rgba(200,16,46,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ fontSize: 15, color: 'white', textDecoration: 'none', transition: 'color 0.3s' }}
                      className="contact-link"
                    >{item.value}</a>
                  ) : (
                    <div style={{ fontSize: 15, color: 'white' }}>{item.value}</div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Right - Form */}
        <FadeIn delay={200}>
          <div style={{ background: 'var(--dark3)', border: '1px solid rgba(201,168,76,0.1)', padding: 36 }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, letterSpacing: 3, color: 'white', marginBottom: 24 }}>Send a Message</div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,232,232,0.5)', marginBottom: 8 }}>Full Name</label>
              <input className="vkf-input" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,232,232,0.5)', marginBottom: 8 }}>Email Address</label>
              <input className="vkf-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,232,232,0.5)', marginBottom: 8 }}>Subject</label>
              <select className="vkf-input" value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="">Select a topic</option>
                <option>General Enquiry</option>
                <option>Registration Help</option>
                <option>Referee Application</option>
                <option>Hotel Booking</option>
                <option>Sponsorship</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-barlow-condensed)', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(232,232,232,0.5)', marginBottom: 8 }}>Message</label>
              <textarea className="vkf-input" placeholder="Your message..." rows={5} value={message} onChange={e => setMessage(e.target.value)} style={{ resize: 'vertical' }} />
            </div>

            <button
              onClick={handleSubmit}
              className="clip-skew"
              style={{
                width: '100%',
                background: 'var(--red)', color: 'white',
                fontFamily: 'var(--font-barlow-condensed)',
                fontSize: 14, letterSpacing: 3, textTransform: 'uppercase',
                padding: 14, border: 'none', cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >Send Message</button>

            {sent && (
              <div style={{
                marginTop: 12,
                background: 'rgba(0,160,0,0.1)', border: '1px solid rgba(0,200,0,0.3)',
                padding: '12px 16px', textAlign: 'center',
                fontSize: 14, color: '#80ff80',
              }}>✓ Message sent! We will get back to you soon.</div>
            )}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media(max-width:900px){
          .contact-section{ padding: 72px 24px !important; }
          .contact-grid{ grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        .contact-link:hover{ color: var(--gold) !important; }
      `}</style>
    </section>
  )
}
