import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</div>
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [enquiryType, setEnquiryType] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20" style={{ background: 'var(--laf-navy)', minHeight: '300px' }}>
        <div className="absolute inset-0" style={{ background: 'rgba(10,25,41,0.97)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="/" className="hover:text-white/70">Home</a> <span className="mx-2">/</span>
            <span style={{ color: 'var(--laf-gold)' }}>Contact</span>
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white">Contact Us</h1>
          <p className="mt-4 text-white/60 text-lg">We would love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* FORM */}
            <div className="lg:col-span-3">
              <Reveal>
                {submitted ? (
                  <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(197,160,40,0.15)' }}>
                      <svg className="w-8 h-8" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-display text-3xl font-semibold mb-3" style={{ color: 'var(--laf-navy)' }}>Thank you!</h2>
                    <p className="text-base leading-relaxed" style={{ color: 'var(--laf-muted)' }}>
                      We will be in touch within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl p-8 lg:p-10" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                      <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>SEND A MESSAGE</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--laf-text)' }}>Full name</label>
                        <input type="text" required placeholder="Amaka Okafor" className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-yellow-400 transition-colors" style={{ borderColor: 'var(--laf-border)' }} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--laf-text)' }}>Email address</label>
                        <input type="email" required placeholder="amaka@example.com" className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-yellow-400 transition-colors" style={{ borderColor: 'var(--laf-border)' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--laf-text)' }}>Phone number <span className="text-xs font-normal" style={{ color: 'var(--laf-muted)' }}>(optional)</span></label>
                      <input type="tel" placeholder="+234 000 000 0000" className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-yellow-400 transition-colors" style={{ borderColor: 'var(--laf-border)' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--laf-text)' }}>Enquiry type</label>
                      <select required value={enquiryType} onChange={(e) => setEnquiryType(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-yellow-400 transition-colors" style={{ borderColor: 'var(--laf-border)', color: enquiryType ? 'var(--laf-text)' : 'var(--laf-muted)' }}>
                        <option value="">Select enquiry type</option>
                        <option>General Enquiry</option>
                        <option>Donation / Payment</option>
                        <option>Partnership</option>
                        <option>Volunteering</option>
                        <option>Media / Press</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--laf-text)' }}>Message</label>
                      <textarea rows={5} required placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:border-yellow-400 transition-colors resize-none" style={{ borderColor: 'var(--laf-border)' }} />
                    </div>
                    <button type="submit" className="w-full py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90" style={{ background: 'var(--laf-navy)', color: 'var(--laf-gold)' }}>
                      Send Message
                    </button>
                  </form>
                )}
              </Reveal>
            </div>

            {/* INFO PANEL */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="rounded-2xl p-8" style={{ background: 'var(--laf-navy)' }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                    <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>CONTACT INFORMATION</span>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(197,160,40,0.15)' }}>
                        <svg className="w-5 h-5" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">Location</p>
                        <p className="text-white/60 text-sm mt-1">Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(197,160,40,0.15)' }}>
                        <svg className="w-5 h-5" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">Email</p>
                        <a href="mailto:info@lekeadeboyefoundation.org" className="text-white/60 text-sm mt-1 block hover:text-white transition-colors">info@lekeadeboyefoundation.org</a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(197,160,40,0.15)' }}>
                        <svg className="w-5 h-5" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">Phone</p>
                        <a href="tel:+2347062594160" className="text-white/60 text-sm mt-0.5 block hover:text-white transition-colors">+234 706 259 4160</a>
                        <a href="tel:+2348090936032" className="text-white/60 text-sm mt-0.5 block hover:text-white transition-colors">+234 809 093 6032</a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <p className="font-sc text-xs tracking-widest mb-4" style={{ color: 'var(--laf-gold)' }}>BANK DETAILS</p>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-white/40 text-xs">NGN Account</p>
                        <p className="text-white font-mono">0040217552</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs">GBP Account</p>
                        <p className="text-white font-mono">30085522</p>
                      </div>
                      <p className="text-white/40 text-xs">PremiumTrust Bank &bull; Leke Adeboye Foundation</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <p className="font-sc text-xs tracking-widest mb-4" style={{ color: 'var(--laf-gold)' }}>RESPONSE TIME</p>
                    <p className="text-white/60 text-sm">We aim to respond to all enquiries within 48 hours during business days.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
