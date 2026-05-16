import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function AnimatedStat({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(ease * target))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

function Countdown({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const [done, setDone] = useState(false)
  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now()
      if (diff <= 0) { setDone(true); return }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])
  if (done) return <p className="text-white font-display text-2xl font-semibold">This milestone has been reached.</p>
  return (
    <div className="flex gap-4 sm:gap-6">
      {[['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']].map(([k, label]) => (
        <div key={k} className="countdown-unit">
          <span className="countdown-number">{String(time[k as keyof typeof time]).padStart(2, '0')}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  )
}

const testimonials = [
  { text: "Before the food drive, I did not know where my next meal would come from. LAF gave my family more than food; they gave us dignity.", name: "Adunola B.", location: "Mushin, Lagos", program: "Food Bank" },
  { text: "The scholarship changed everything for me. I could not have afforded the fees. Today I am in university studying engineering.", name: "Chukwuemeka O.", location: "Amuwo Odofin, Lagos", program: "Education" },
  { text: "After the health outreach, my mother got treatment she had been putting off for years. The nurses were kind and professional. I am forever grateful.", name: "Hajiya R.", location: "Sogunle, Lagos", program: "Health Outreach" },
]

function QuoteRotator() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => { setActive((a) => (a + 1) % testimonials.length); setFading(false) }, 400)
    }, 6000)
    return () => clearInterval(id)
  }, [])
  const q = testimonials[active]
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div style={{ transition: 'opacity 0.4s ease', opacity: fading ? 0 : 1 }}>
        <svg className="w-10 h-8 mx-auto mb-6 opacity-25" style={{ color: 'var(--laf-gold)' }} viewBox="0 0 40 28" fill="currentColor">
          <path d="M0 28V17.5C0 7.833 5.833 2 17.5 0L18.98 3C13.48 4.567 10.4 7.433 9.74 11.5H17.5V28H0zm22.5 0V17.5C22.5 7.833 28.333 2 40 0L41.48 3C35.98 4.567 32.9 7.433 32.24 11.5H40V28H22.5z"/>
        </svg>
        <p className="font-display text-2xl sm:text-3xl lg:text-4xl italic leading-relaxed mb-8" style={{ color: 'var(--laf-navy)' }}>
          "{q.text}"
        </p>
        <p className="font-semibold" style={{ color: 'var(--laf-navy)' }}>{q.name}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--laf-muted)' }}>{q.location} &bull; {q.program}</p>
      </div>
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="w-2.5 h-2.5 rounded-full transition-all duration-300" style={{ background: i === active ? 'var(--laf-gold)' : 'var(--laf-border)' }} aria-label={`Quote ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="ml-2 px-2 py-0.5 rounded text-xs border transition-all hover:bg-yellow-100"
      style={{ borderColor: 'var(--laf-gold)', color: 'var(--laf-gold)' }}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</div>
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
      <span className="font-sc text-xs tracking-widest uppercase" style={{ color: 'var(--laf-gold)' }}>{children}</span>
    </div>
  )
}

function CookieBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (!localStorage.getItem('laf-cookies')) setVisible(true) }, [])
  if (!visible) return null
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4" style={{ background: 'var(--laf-navy)', borderTop: '1px solid rgba(197,160,40,0.3)' }}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/70 text-sm">We use cookies to improve your experience on this site.</p>
        <div className="flex gap-3">
          <button onClick={() => { localStorage.setItem('laf-cookies', '0'); setVisible(false) }} className="text-white/50 text-sm hover:text-white">Decline</button>
          <button onClick={() => { localStorage.setItem('laf-cookies', '1'); setVisible(false) }} className="px-5 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>Accept</button>
        </div>
      </div>
    </div>
  )
}

const stats = [
  { target: 40000, suffix: '+', label: 'Lives Fed' },
  { target: 10000, suffix: '+', label: 'Health Beneficiaries' },
  { target: 200, suffix: '+', label: 'Scholarships Awarded' },
  { target: 250, suffix: '+', label: 'Pints of Blood Donated' },
  { target: 10, suffix: 'M+', label: 'Naira in Grants' },
  { target: 150, suffix: '+', label: 'Programs Delivered' },
]

const pillars = [
  { num: '01', title: 'Youth Empowerment', desc: 'Equipping the next generation with skills, mentorship, and platforms to lead. From the Kingsmen and Kingsladies Conference to skills training and community leadership programmes.', href: '/programs#youth' },
  { num: '02', title: 'Education', desc: 'Back-to-school campaigns for secondary students, undergraduate scholarships for high achievers and the less privileged. Investing in futures, one student at a time.', href: '/programs#education' },
  { num: '03', title: 'Social Welfare & Health', desc: 'Free health outreaches, blood donation drives, and direct welfare interventions meeting communities where they are with compassion and professionalism.', href: '/programs#welfare' },
  { num: '04', title: 'Arts, Sports & Culture', desc: 'Celebrating African identity through sport, creative expression, and cultural programming that builds confidence and a sense of belonging in communities.', href: '/programs#arts' },
  { num: '05', title: 'Governance & Leadership', desc: 'Preparing young Nigerians to lead with integrity through civic education, leadership summits, and responsible governance advocacy across Lagos.', href: '/programs#governance' },
  { num: '06', title: 'Business Hubs & Enterprise', desc: 'Connecting aspiring entrepreneurs to training, grants, and mentorship through the LAF Business Hub and the Millionaire Quest initiative.', href: '/programs#business' },
]

const projects = [
  { title: 'LightUp Ikeja Initiative', tag: 'Community', date: 'January 2026', stat: 'Hundreds of families reached', img: '/assets/lightup-01.jpeg' },
  { title: 'LASUTH Health Outreach', tag: 'Health', date: 'February 2026', stat: '500+ patients screened', img: null },
  { title: 'Sogunle School Renovation', tag: 'Education', date: 'December 2025', stat: 'School fully rehabilitated', img: '/assets/sogunle-01.jpg' },
  { title: 'Jesus in the Park', tag: 'Community', date: 'December 2025', stat: 'Thousands served at the park', img: '/assets/lightup-04.jpeg' },
  { title: 'Blood Donation Drive', tag: 'Health', date: 'March 2026', stat: '250+ pints donated', img: null },
  { title: 'JAMB Scholarship Awards', tag: 'Education', date: '2025', stat: '200+ scholarships awarded', img: null },
]

const tagColors: Record<string, string> = {
  Community: '#C5A028',
  Health: '#0A7A5A',
  Education: '#1a3a5c',
}

export default function HomePage() {
  const maternityDate = new Date('2026-05-03T08:00:00')

  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5" style={{ opacity: 0.35 }}>
            <div className="overflow-hidden"><img src="/assets/lightup-01.jpeg" alt="" className="w-full h-full object-cover scale-110" /></div>
            <div className="overflow-hidden row-span-2"><img src="/assets/maternity-01.jpeg" alt="" className="w-full h-full object-cover scale-110" /></div>
            <div className="overflow-hidden"><img src="/assets/lightup-02.jpeg" alt="" className="w-full h-full object-cover scale-110" /></div>
            <div className="overflow-hidden"><img src="/assets/sogunle-01.jpg" alt="" className="w-full h-full object-cover scale-110" /></div>
            <div className="overflow-hidden"><img src="/assets/lightup-04.jpeg" alt="" className="w-full h-full object-cover scale-110" /></div>
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,25,41,0.94) 0%, rgba(10,25,41,0.86) 50%, rgba(10,25,41,0.93) 100%)' }} />
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: 'var(--laf-gold)' }} />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20">
          <div className="animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <span className="inline-block font-sc text-xs tracking-widest mb-8 px-4 py-1.5 rounded-full border" style={{ color: 'var(--laf-gold)', borderColor: 'rgba(197,160,40,0.35)', background: 'rgba(197,160,40,0.08)' }}>
              EST. 2021 &bull; LAGOS, NIGERIA
            </span>
          </div>
          <h1 className="font-display font-semibold text-white leading-tight mb-6 animate-fade-up" style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', animationDelay: '0.35s', animationFillMode: 'both' }}>
            Restoring Hope.<br />
            <span style={{ color: 'var(--laf-gold)' }}>One Community</span><br />
            at a Time.
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.55s', animationFillMode: 'both' }}>
            Since 2021, we have touched over 40,000 lives across Lagos and beyond through education, health, food support, and community development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <a href="/get-involved#donate" className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:opacity-90 hover:shadow-xl" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
              Donate Now
            </a>
            <a href="#impact" className="px-8 py-4 rounded-xl font-semibold text-base border-2 text-white transition-all duration-300 hover:bg-white/10" style={{ borderColor: 'rgba(255,255,255,0.45)' }}>
              See Our Impact
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-chevron">
          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section id="impact" className="py-16 lg:py-20" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
              <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>THE NUMBERS</span>
              <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-semibold">The Scale of What We Have Done</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {stats.map((s, i) => (
              <div key={i} className="text-center px-2">
                <div className="font-display font-bold mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--laf-gold)' }}>
                  <AnimatedStat target={s.target} suffix={s.suffix} />
                </div>
                <p className="text-white/60 text-sm leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src="/assets/lightup-01.jpeg" alt="LAF community outreach" className="w-full object-cover" style={{ height: '480px' }} loading="lazy" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden lg:block">
                  <img src="/assets/sogunle-02.jpg" alt="School Initiative" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="absolute top-0 left-0 w-1 h-32 rounded-r" style={{ background: 'var(--laf-gold)' }} />
              </div>
            </RevealSection>
            <RevealSection>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="font-display font-semibold leading-tight mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--laf-navy)' }}>
                What began as grassroots outreach has become something much larger.
              </h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--laf-text)' }}>
                <p>In 2021, a small group of volunteers began feeding families in Mushin, Lagos. No fanfare. No institution. Just food, prayer, and the conviction that every life matters. That conviction became the Leke Adeboye Foundation.</p>
                <p>From those early food drives, LAF grew into a multi-pillar organisation spanning health outreach, education scholarships, youth development, and community infrastructure across Lagos. What was once the Leke Adeboye Initiative formally became the Foundation in 2025, a name reflecting both the depth of the work and the breadth of the vision.</p>
                <p>Today, LAF operates across communities from Amuwo Odofin to Sogunle, from Ikeja to Ebutemetta, building a Lagos where no community is left behind.</p>
              </div>
              <blockquote className="mt-8 pl-5 border-l-2 italic font-display text-xl" style={{ borderColor: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                "Defend the weak and the fatherless." — Psalm 82:3
              </blockquote>
              <a href="/about" className="mt-8 inline-flex items-center gap-2 font-semibold transition-all hover:gap-3 duration-200" style={{ color: 'var(--laf-gold)' }}>
                Read the Full Story
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* SIX PILLARS */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>WHAT WE DO</span>
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold" style={{ color: 'var(--laf-navy)' }}>Six pathways. One mission.</h2>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <RevealSection key={p.num}>
                <a href={p.href} className="group block h-full rounded-2xl p-8 card-hover border" style={{ borderColor: 'var(--laf-border)', background: 'var(--laf-cream)' }}>
                  <span className="font-display text-5xl font-light" style={{ color: 'var(--laf-gold)', opacity: 0.5 }}>{p.num}</span>
                  <h3 className="font-display text-2xl font-semibold mt-3 mb-3" style={{ color: 'var(--laf-navy)' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--laf-muted)' }}>{p.desc}</p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2" style={{ color: 'var(--laf-gold)' }}>
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </a>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <SectionLabel>Recent Impact</SectionLabel>
                <h2 className="font-display text-4xl lg:text-5xl font-semibold" style={{ color: 'var(--laf-navy)' }}>Stories from the ground.</h2>
              </div>
              <a href="/projects" className="font-semibold flex items-center gap-2 whitespace-nowrap text-sm" style={{ color: 'var(--laf-gold)' }}>
                View All Projects <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <RevealSection key={i}>
                <div className="group rounded-2xl overflow-hidden card-hover" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
                  {p.img ? (
                    <div className="relative h-52 overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-52 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--laf-navy), #1a3a5c)' }}>
                      <span className="font-display text-4xl font-light" style={{ color: 'var(--laf-gold)' }}>LAF</span>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 text-white" style={{ background: tagColors[p.tag] || 'var(--laf-navy)' }}>{p.tag}</span>
                    <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--laf-navy)' }}>{p.title}</h3>
                    <p className="text-xs mb-3" style={{ color: 'var(--laf-muted)' }}>{p.date}</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--laf-gold)' }}>{p.stat}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* MATERNITY COUNTDOWN */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/assets/maternity-03.jpeg" alt="Maternity Centre Renovation" className="w-full object-cover" style={{ height: '420px' }} loading="lazy" />
              </div>
            </RevealSection>
            <RevealSection>
              <span className="inline-block font-sc text-xs tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(197,160,40,0.15)', color: 'var(--laf-gold)', border: '1px solid rgba(197,160,40,0.3)' }}>COMING SOON</span>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-2 leading-snug">
                RCCG Throne of Grace Maternity Centre Renovation
              </h2>
              <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>Ebutemetta, Lagos</p>
              <Countdown targetDate={maternityDate} />
              <p className="mt-8 text-white/65 text-sm leading-relaxed">
                This renovation will transform the maternity ward, providing better facilities for mothers and newborns in one of Lagos's most underserved communities. When complete, it will serve hundreds of families annually.
              </p>
              <a href="/get-involved#donate" className="mt-8 inline-block px-8 py-3.5 rounded-xl font-semibold transition-all hover:opacity-90" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                Support This Project
              </a>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* YOUTH DEV CENTRE */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-cream)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <SectionLabel>Capital Campaign</SectionLabel>
              <h2 className="font-display font-semibold leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--laf-navy)' }}>
                The LAF Youth Development Centre
              </h2>
              <p className="mb-2" style={{ color: 'var(--laf-muted)' }}>Amuwo Odofin, Lagos</p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                Our most ambitious project yet. A dedicated space for youth training, community enterprise, healthcare, and leadership development serving thousands annually across Lagos.
              </p>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-sc text-xs tracking-wider" style={{ color: 'var(--laf-gold)' }}>CAMPAIGN PROGRESS</span>
                  <span className="font-semibold text-sm" style={{ color: 'var(--laf-navy)' }}>35% funded</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--laf-border)' }}>
                  <div className="progress-bar h-full rounded-full" style={{ width: '35%' }} />
                </div>
                <p className="mt-2 text-sm" style={{ color: 'var(--laf-muted)' }}>Target: ₦948,000,000</p>
              </div>
              <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--laf-white)', border: '1px solid var(--laf-border)' }}>
                <h4 className="font-sc text-xs tracking-wider mb-4" style={{ color: 'var(--laf-gold)' }}>GIVE DIRECTLY</h4>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Bank', value: 'PremiumTrust Bank', copy: false },
                    { label: 'Account Name', value: 'Leke Adeboye Foundation', copy: false },
                    { label: 'NGN Account', value: '0040217552', copy: true },
                    { label: 'GBP Account', value: '30085522', copy: true },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-4">
                      <span style={{ color: 'var(--laf-muted)' }}>{r.label}</span>
                      <div className="flex items-center">
                        <span className={r.copy ? 'font-mono font-semibold' : 'font-medium'}>{r.value}</span>
                        {r.copy && <CopyBtn text={r.value} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a href="/get-involved#donate" className="inline-block px-8 py-3.5 rounded-xl font-semibold transition-all hover:opacity-90" style={{ background: 'var(--laf-navy)', color: 'var(--laf-gold)' }}>
                Join the Campaign
              </a>
            </RevealSection>
            <RevealSection>
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/assets/laf-dev-center.png" alt="LAF Youth Development Centre" className="w-full object-cover" style={{ height: '480px' }} loading="lazy" />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
                <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>VOICES</span>
                <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
              </div>
              <h2 className="font-display text-4xl font-semibold" style={{ color: 'var(--laf-navy)' }}>What communities say</h2>
            </div>
            <QuoteRotator />
          </RevealSection>
        </div>
      </section>

      {/* NEWSLETTER + CTA */}
      <section className="py-20 lg:py-28" style={{ background: 'var(--laf-navy)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
              <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>STAY CONNECTED</span>
              <div className="w-12 h-0.5" style={{ background: 'var(--laf-gold)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mb-4">Stay close to the mission.</h2>
            <p className="text-white/60 mb-10 text-lg">Monthly updates from the field: stories, impact reports, and ways to engage.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-16" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" className="flex-1 px-5 py-3.5 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(197,160,40,0.3)' }} />
              <button type="submit" className="px-6 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>Subscribe</button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Donate Now', href: '/get-involved#donate', primary: true },
                { label: 'Become a Partner', href: '/get-involved#partner', primary: false },
                { label: 'Volunteer', href: '/get-involved#volunteer', primary: false },
              ].map((btn) => (
                <a key={btn.label} href={btn.href} className="block py-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
                  style={btn.primary ? { background: 'var(--laf-gold)', color: 'var(--laf-navy)' } : { border: '2px solid rgba(255,255,255,0.3)', color: 'white' }}>
                  {btn.label}
                </a>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      <CookieBanner />
      <Footer />
    </div>
  )
}
