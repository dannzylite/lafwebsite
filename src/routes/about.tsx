import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/about')({
  component: AboutPage,
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

const timeline = [
  { year: '2021', milestone: 'Foundation of grassroots outreach initiative in Mushin, Lagos. Small team. Big conviction.' },
  { year: '2022', milestone: 'First major food drive — over 5,000 families fed across Mushin and Amuwo Odofin.' },
  { year: '2023', milestone: 'Leke Adeboye Initiative (LAI) officially registered. Health outreach programmes launched.' },
  { year: '2024', milestone: 'Expanded to education and health pillars. JAMB scholarship programme launched. Blood donation drives begin.' },
  { year: '2025', milestone: 'Rebranded to Leke Adeboye Foundation (LAF). Youth Development Centre announced. 40,000+ lives reached.' },
  { year: '2026', milestone: 'RCCG Maternity Centre Renovation begins. ₦948M capital campaign launched. Kingsmen and Kingsladies Conference.' },
]

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* PAGE HERO */}
      <section className="relative pt-32 pb-20 flex items-center" style={{ background: 'var(--laf-navy)', minHeight: '360px' }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/lightup-02.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,25,41,0.98) 0%, rgba(10,25,41,0.88) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="/" className="hover:text-white/70 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span style={{ color: 'var(--laf-gold)' }}>About</span>
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white">Our Story</h1>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SLabel>The Beginning</SLabel>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-10" style={{ color: 'var(--laf-navy)' }}>
              Every life matters. Every community deserves hope.
            </h2>
            <div className="space-y-6 text-base lg:text-lg leading-relaxed" style={{ color: 'var(--laf-text)' }}>
              <p>
                The Leke Adeboye Foundation was born not from a strategy document or a boardroom decision, but from a simple act of service. In 2021, Leke Adeboye and a small group of committed volunteers began feeding families in Mushin, one of Lagos's most densely populated and underserved communities. There were no press releases, no fanfare. Just food, prayer, and the belief that responding to need is its own reward.
              </p>
              <blockquote className="my-10 pl-6 border-l-4 font-display text-2xl lg:text-3xl italic" style={{ borderColor: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                "Every life matters. Every community deserves hope."
              </blockquote>
              <p>
                That first food drive reached hundreds of families. It revealed something important: the need was vast, and so was the willingness of people to help carry it. Within months, the initiative had expanded, attracting volunteers, donors, and partners who saw what was possible when compassion met organisation.
              </p>
              <p>
                By 2023, the Leke Adeboye Initiative (LAI) was formally registered, giving structure to what had become a sustained community presence. Health outreaches followed. Then education. Then blood donation drives. Then enterprise support. The work kept growing because the need kept being real, and the people responding kept showing up.
              </p>
              <p>
                In 2025, LAI became the Leke Adeboye Foundation, a name that reflects the permanence of the commitment and the ambition of what comes next. Today, LAF is one of Lagos's most active faith-driven nonprofits, operating across communities from Amuwo Odofin to Ikeja, from Sogunle to Ebutemetta.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 lg:py-24" style={{ background: 'var(--laf-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>WHO WE ARE</span>
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
              </div>
              <h2 className="font-display text-4xl font-semibold" style={{ color: 'var(--laf-navy)' }}>Vision & Mission</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: 'VISION',
                title: 'Our Vision',
                text: 'A world where every community has the support, opportunity, and hope to thrive. Building thriving communities across Africa through hope, opportunity, and sustainable impact.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ),
              },
              {
                label: 'MISSION',
                title: 'Our Mission',
                text: 'To empower youth, restore hope, and build sustainable communities through faith-driven action, strategic partnerships, and compassionate service.',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                ),
              },
            ].map((item) => (
              <Reveal key={item.label}>
                <div className="h-full rounded-2xl p-10 border-t-4" style={{ borderTopColor: 'var(--laf-gold)', background: 'var(--laf-cream)', border: '1px solid var(--laf-border)', borderTop: '4px solid var(--laf-gold)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(197,160,40,0.12)', color: 'var(--laf-gold)' }}>
                    {item.icon}
                  </div>
                  <span className="font-sc text-xs tracking-widest mb-3 block" style={{ color: 'var(--laf-gold)' }}>{item.label}</span>
                  <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--laf-navy)' }}>{item.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--laf-text)' }}>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER'S NOTE */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <div className="text-center lg:text-left">
                <div className="inline-block mb-8">
                  <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 mx-auto lg:mx-0" style={{ borderColor: 'var(--laf-gold)' }}>
                    <img src="/assets/founder.jpeg" alt="Oluwagbemileke Adeboye, Founder" className="w-full h-full object-cover object-top" loading="lazy" />
                  </div>
                </div>
                <h3 className="font-display text-3xl font-semibold text-white mb-1">Oluwagbemileke Adeboye</h3>
                <p className="font-sc text-xs tracking-widest mb-6" style={{ color: 'var(--laf-gold)' }}>FOUNDER, LEKE ADEBOYE FOUNDATION</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>FOUNDER'S NOTE</span>
              </div>
              <div className="space-y-6 text-white/75 leading-relaxed text-base lg:text-lg">
                <p>
                  When we began in 2021, it was never about building an organisation. It was about responding to people in need, one meal, one prayer, one family at a time. What started quietly in Mushin has since grown into a movement of compassion, service, and hope reaching thousands of lives across communities.
                </p>
                <p>
                  The Leke Adeboye Foundation exists because we believe every life matters and every community deserves the opportunity to thrive. Through the dedication of volunteers, partners, donors, and countless individuals who have carried this vision with us, we have seen what is possible when compassion meets action.
                </p>
                <p>
                  But this is only the beginning.
                </p>
                <p>
                  From feeding programmes and healthcare interventions to education, youth development, and community infrastructure, our commitment remains the same: to restore hope, empower lives, and build sustainable impact that outlives us.
                </p>
                <p>
                  The road ahead is bigger than what is behind us, and what is behind us has already exceeded what we once imagined. We remain deeply committed to the work, deeply grateful for every hand that has helped carry it, and deeply hopeful about the future we are building together.
                </p>
                <p className="font-semibold text-white">The best work is still ahead.</p>
              </div>
              <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(197,160,40,0.2)' }}>
                <p className="font-display text-xl italic" style={{ color: 'var(--laf-gold)' }}>Oluwagbemileke Adeboye</p>
                <p className="text-sm mt-1 text-white/50">Founder, Leke Adeboye Foundation</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>OUR JOURNEY</span>
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
              </div>
              <h2 className="font-display text-4xl font-semibold" style={{ color: 'var(--laf-navy)' }}>Five Years of Growing Impact</h2>
            </div>
          </Reveal>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5" style={{ background: 'var(--laf-border)' }} />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <Reveal key={item.year}>
                  <div className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-row`}>
                    {/* Dot */}
                    <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 mt-1.5 z-10" style={{ background: 'var(--laf-gold)', borderColor: 'var(--laf-cream)' }} />
                    {/* Year */}
                    <div className={`hidden lg:flex w-1/2 ${i % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'} items-start`}>
                      <span className="font-display text-4xl font-bold" style={{ color: 'var(--laf-gold)', opacity: 0.5 }}>{item.year}</span>
                    </div>
                    {/* Content */}
                    <div className={`pl-16 lg:pl-0 w-full lg:w-1/2 ${i % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                      <span className="lg:hidden font-display text-3xl font-bold block mb-2" style={{ color: 'var(--laf-gold)', opacity: 0.6 }}>{item.year}</span>
                      <div className="rounded-xl p-6" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
                        <p className="text-base leading-relaxed" style={{ color: 'var(--laf-text)' }}>{item.milestone}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADS */}
      <section className="py-16 lg:py-20" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold text-white mb-4">Foundation Resources</h2>
            <p className="text-white/60 mb-10">Download our impact reports and foundation brochure.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {[
                { label: 'Download 2025 Impact Report', ext: 'PDF', primary: true },
                { label: 'Download Foundation Brochure', ext: 'PDF', primary: false },
              ].map((btn) => (
                <button key={btn.label} className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
                  style={btn.primary ? { background: 'var(--laf-gold)', color: 'var(--laf-navy)' } : { border: '2px solid rgba(255,255,255,0.3)', color: 'white' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  {btn.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
