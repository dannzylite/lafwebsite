import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/get-involved')({
  component: GetInvolvedPage,
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

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
      <span className="font-sc text-xs tracking-widest uppercase" style={{ color: 'var(--laf-gold)' }}>{children}</span>
    </div>
  )
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="ml-2 px-2.5 py-1 rounded text-xs border font-medium transition-all"
      style={{ borderColor: 'var(--laf-gold)', color: 'var(--laf-gold)' }}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

const ngnAmounts = ['₦5,000', '₦10,000', '₦25,000', '₦50,000', '₦100,000']
const gbpAmounts = ['£10', '£25', '£50', '£100']

export default function GetInvolvedPage() {
  const [currency, setCurrency] = useState<'NGN' | 'GBP'>('NGN')
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null)
  const [partnerSubmitted, setPartnerSubmitted] = useState(false)
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false)

  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20" style={{ background: 'var(--laf-navy)', minHeight: '320px' }}>
        <div className="absolute inset-0 opacity-8">
          <img src="/assets/lightup-02.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'rgba(10,25,41,0.95)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="/" className="hover:text-white/70">Home</a> <span className="mx-2">/</span>
            <span style={{ color: 'var(--laf-gold)' }}>Get Involved</span>
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white">Get Involved</h1>
          <p className="mt-4 text-white/60 text-lg max-w-lg">Every contribution, at whatever scale, carries the mission forward.</p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[['Donate', '#donate'], ['Partner', '#partner'], ['Volunteer', '#volunteer'], ['Prayer', '#prayer']].map(([l, h]) => (
              <a key={h} href={h} className="px-5 py-2 rounded-full text-sm font-medium border transition-all hover:bg-white/10" style={{ borderColor: 'rgba(197,160,40,0.4)', color: 'var(--laf-gold)' }}>{l}</a>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate" className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SLabel>Give</SLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--laf-navy)' }}>Donate</h2>
            <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--laf-text)' }}>
              Your donation directly funds food drives, health outreaches, education scholarships, and infrastructure projects across Lagos. Every naira and pound makes a difference.
            </p>

            {/* Currency toggle */}
            <div className="flex gap-1 p-1 rounded-xl w-fit mb-8" style={{ background: 'var(--laf-border)' }}>
              {[['NGN', '🇳🇬 Naira'], ['GBP', '🇬🇧 Pounds']].map(([c, l]) => (
                <button key={c} onClick={() => { setCurrency(c as 'NGN' | 'GBP'); setSelectedAmount(null) }}
                  className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={currency === c ? { background: 'var(--laf-navy)', color: 'white' } : { color: 'var(--laf-muted)' }}>
                  {l}
                </button>
              ))}
            </div>

            {/* Amounts */}
            <div className="flex flex-wrap gap-3 mb-6">
              {(currency === 'NGN' ? ngnAmounts : gbpAmounts).map((a) => (
                <button key={a} onClick={() => setSelectedAmount(selectedAmount === a ? null : a)}
                  className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
                  style={selectedAmount === a
                    ? { background: 'var(--laf-gold)', color: 'var(--laf-navy)' }
                    : { background: 'var(--laf-white)', color: 'var(--laf-navy)', border: '2px solid var(--laf-border)' }}>
                  {a}
                </button>
              ))}
              <input type="text" placeholder="Custom amount" className="px-5 py-3 rounded-xl text-sm font-medium border-2 focus:outline-none" style={{ borderColor: 'var(--laf-border)', background: 'var(--laf-white)' }} />
            </div>

            {/* Bank details */}
            <div className="rounded-2xl p-8" style={{ background: 'var(--laf-navy)' }}>
              <h3 className="font-display text-2xl font-semibold text-white mb-6">Bank Transfer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { flag: '🇳🇬', label: 'NGN Account', account: '0040217552' },
                  { flag: '🇬🇧', label: 'GBP Account', account: '30085522' },
                ].filter((d) => currency === 'NGN' ? d.label.includes('NGN') : d.label.includes('GBP')).concat(
                  currency === 'NGN' ? [{ flag: '🇬🇧', label: 'GBP Account', account: '30085522' }] : [{ flag: '🇳🇬', label: 'NGN Account', account: '0040217552' }]
                ).slice(0, 2).map((d) => (
                  <div key={d.label} className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(197,160,40,0.2)' }}>
                    <span className="text-xl">{d.flag}</span>
                    <p className="font-sc text-xs tracking-widest mt-2 mb-3" style={{ color: 'var(--laf-gold)' }}>{d.label}</p>
                    <p className="text-white font-semibold">PremiumTrust Bank</p>
                    <p className="text-white/60 text-sm">Leke Adeboye Foundation</p>
                    <div className="flex items-center mt-2">
                      <p className="text-white font-mono text-lg">{d.account}</p>
                      <CopyBtn text={d.account} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-white/50 text-sm">
                After making a transfer, please send proof of payment to{' '}
                <a href="mailto:info@lekeadeboyefoundation.org" className="underline text-white/70">info@lekeadeboyefoundation.org</a>{' '}
                with your name, amount, and purpose.
              </p>
            </div>

            {/* Upload proof */}
            <div className="mt-8 rounded-2xl p-8" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
              <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Upload Proof of Payment</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full name" className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)' }} />
                  <input type="email" placeholder="Email address" className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)' }} />
                </div>
                <input type="text" placeholder="Amount donated" className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)' }} />
                <div className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer" style={{ borderColor: 'var(--laf-border)' }}>
                  <svg className="w-10 h-10 mx-auto mb-3" style={{ color: 'var(--laf-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm" style={{ color: 'var(--laf-muted)' }}>Click to upload or drag and drop</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--laf-muted)' }}>PNG, JPG, PDF up to 5MB</p>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl font-semibold" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                  Submit Proof of Payment
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARTNER */}
      <section id="partner" className="py-20 lg:py-28" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SLabel>Collaborate</SLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-4">Become a Partner</h2>
            <p className="text-white/65 text-base leading-relaxed mb-12 max-w-2xl">
              Partnerships multiply impact. Whether you are a corporation, NGO, faith organisation, or government body, there is a place for you in the work LAF is doing across Lagos.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {['Corporate', 'NGO / Civil Society', 'Government', 'Faith Organisation'].map((tier) => (
                <div key={tier} className="rounded-xl p-4 text-center" style={{ background: 'rgba(197,160,40,0.08)', border: '1px solid rgba(197,160,40,0.2)' }}>
                  <p className="text-sm font-semibold text-white">{tier}</p>
                </div>
              ))}
            </div>
            {partnerSubmitted ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(197,160,40,0.1)', border: '1px solid rgba(197,160,40,0.3)' }}>
                <p className="font-display text-3xl text-white mb-2">Thank you for reaching out.</p>
                <p className="text-white/65">Our partnerships team will be in touch within 48 hours.</p>
              </div>
            ) : (
              <form className="space-y-4 rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} onSubmit={(e) => { e.preventDefault(); setPartnerSubmitted(true) }}>
                <h3 className="font-display text-2xl font-semibold text-white mb-6">Partnership Enquiry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Organisation name" required className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                  <input type="text" placeholder="Contact person" required className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="email" placeholder="Email address" required className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                  <input type="tel" placeholder="Phone number" className="px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                </div>
                <select className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' }}>
                  <option>Partnership type</option>
                  <option>Corporate</option>
                  <option>NGO / Civil Society</option>
                  <option>Government</option>
                  <option>Faith Organisation</option>
                  <option>Individual Champion</option>
                </select>
                <textarea rows={4} placeholder="Tell us about your organisation and how you would like to partner..." className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none resize-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
                <button type="submit" className="w-full py-4 rounded-xl font-semibold" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                  Submit Enquiry
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* VOLUNTEER */}
      <section id="volunteer" className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SLabel>Serve</SLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--laf-navy)' }}>Volunteer</h2>
            <p className="text-base leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--laf-text)' }}>
              The heart of LAF has always been its volunteers. We are looking for people who are willing to show up, do the work, and carry the mission forward with their time and skills.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { title: 'Field Volunteers', desc: 'Outreach, food drives, health events' },
                { title: 'Skills Volunteers', desc: 'Medical, legal, teaching, technology' },
                { title: 'Administrative', desc: 'Coordination, logistics, communications' },
                { title: 'Mentors', desc: 'Youth development, entrepreneurship, education' },
              ].map((v) => (
                <div key={v.title} className="rounded-xl p-5" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
                  <h4 className="font-semibold text-sm mb-2" style={{ color: 'var(--laf-navy)' }}>{v.title}</h4>
                  <p className="text-xs" style={{ color: 'var(--laf-muted)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
            {volunteerSubmitted ? (
              <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(197,160,40,0.08)', border: '1px solid var(--laf-border)' }}>
                <p className="font-display text-3xl mb-2" style={{ color: 'var(--laf-navy)' }}>Thank you for signing up.</p>
                <p style={{ color: 'var(--laf-muted)' }}>Our volunteer coordinator will reach out within 48 hours.</p>
              </div>
            ) : (
              <form className="space-y-4 rounded-2xl p-8" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }} onSubmit={(e) => { e.preventDefault(); setVolunteerSubmitted(true) }}>
                <h3 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Volunteer Sign-Up</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full name" required className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)' }} />
                  <input type="email" placeholder="Email address" required className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)' }} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone number" className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)' }} />
                  <select className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)', color: 'var(--laf-muted)' }}>
                    <option>Skill area</option>
                    <option>Healthcare / Medicine</option>
                    <option>Education / Teaching</option>
                    <option>Technology</option>
                    <option>Communications / Media</option>
                    <option>Logistics / Operations</option>
                    <option>Finance / Accounting</option>
                    <option>General / Field work</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)', color: 'var(--laf-muted)' }}>
                    <option>Lagos LGA</option>
                    {['Amuwo Odofin', 'Ikeja', 'Mushin', 'Surulere', 'Oshodi', 'Alimosho', 'Isale Eko', 'Kosofe', 'Lagos Island', 'Other'].map((l) => <option key={l}>{l}</option>)}
                  </select>
                  <select className="px-4 py-3 rounded-xl text-sm border focus:outline-none" style={{ borderColor: 'var(--laf-border)', color: 'var(--laf-muted)' }}>
                    <option>Availability</option>
                    <option>Weekdays</option>
                    <option>Weekends</option>
                    <option>Both</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <textarea rows={4} placeholder="Tell us why you want to volunteer with LAF and what you hope to contribute..." className="w-full px-4 py-3 rounded-xl text-sm border focus:outline-none resize-none" style={{ borderColor: 'var(--laf-border)' }} />
                <button type="submit" className="w-full py-4 rounded-xl font-semibold" style={{ background: 'var(--laf-navy)', color: 'var(--laf-gold)' }}>
                  Submit Application
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* PRAYER */}
      <section id="prayer" className="py-20 lg:py-24" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <SLabel>Intercede</SLabel>
            <h2 className="font-display text-4xl font-semibold text-white mb-4">Prayer Partner</h2>
            <p className="text-white/65 text-lg leading-relaxed mb-10">
              We believe prayer moves mountains. The Leke Adeboye Foundation is sustained by more than resources; it is sustained by intercession. Join our prayer network and receive weekly updates from the field.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="flex-1 px-5 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(197,160,40,0.3)' }} />
              <button type="submit" className="px-6 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                Join Prayer Network
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
