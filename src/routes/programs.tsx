import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/programs')({
  component: ProgramsPage,
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

const sidebarLinks = [
  { id: 'youth', label: 'Youth Empowerment' },
  { id: 'education', label: 'Education' },
  { id: 'welfare', label: 'Social Welfare & Health' },
  { id: 'food', label: 'Food Bank' },
  { id: 'street', label: 'Street Initiatives' },
  { id: 'arts', label: 'Arts, Sports & Culture' },
  { id: 'business', label: 'Business & Enterprise' },
  { id: 'governance', label: 'Governance & Leadership' },
]

export default function ProgramsPage() {
  const [activeSection, setActiveSection] = useState('youth')

  useEffect(() => {
    const sections = sidebarLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
    }, { rootMargin: '-30% 0px -60% 0px' })
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20 flex items-center" style={{ background: 'var(--laf-navy)', minHeight: '360px' }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/sogunle-01.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'rgba(10,25,41,0.94)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="/" className="hover:text-white/70">Home</a> <span className="mx-2">/</span>
            <span style={{ color: 'var(--laf-gold)' }}>What We Do</span>
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white">Our Programmes</h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl">Six pillars of impact, one enduring mission.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="font-sc text-xs tracking-widest mb-4" style={{ color: 'var(--laf-gold)' }}>PROGRAMMES</p>
              {sidebarLinks.map((l) => (
                <a key={l.id} href={`#${l.id}`}
                  className="block px-4 py-2.5 rounded-lg text-sm transition-all duration-200"
                  style={activeSection === l.id
                    ? { background: 'rgba(197,160,40,0.1)', color: 'var(--laf-gold)', borderLeft: '3px solid var(--laf-gold)', fontWeight: 600 }
                    : { color: 'var(--laf-muted)', borderLeft: '3px solid transparent' }
                  }>
                  {l.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-24">

            {/* YOUTH EMPOWERMENT */}
            <section id="youth">
              <Reveal>
                <SLabel>Pillar 01</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Youth Empowerment</h2>
                <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--laf-text)' }}>
                  The next generation is not a problem to be managed. It is a resource to be invested in. LAF's youth empowerment work equips young Nigerians with the skills, mentorship, and platforms they need to lead with confidence and purpose.
                </p>

                {/* Kingsmen Conference Feature */}
                <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--laf-navy)' }}>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-start gap-6 flex-col sm:flex-row">
                      <div className="flex-1">
                        <span className="inline-block font-sc text-xs tracking-widest px-3 py-1 rounded-full mb-4" style={{ background: 'rgba(197,160,40,0.15)', color: 'var(--laf-gold)', border: '1px solid rgba(197,160,40,0.3)' }}>
                          UPCOMING EVENT
                        </span>
                        <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-2">Kingsmen and Kingsladies Conference 2026</h3>
                        <p className="font-sc text-xs tracking-widest mb-6" style={{ color: 'var(--laf-gold)' }}>THEME: "WHO THE CROWN FITS"</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                          {[
                            { label: 'Dates', value: 'July 9 – 11, 2026' },
                            { label: 'Age Range', value: '18 – 30 years' },
                            { label: 'Spaces', value: '100 only' },
                            { label: 'Registration', value: '₦50,000' },
                            { label: 'Includes', value: 'Accommodation & Feeding' },
                            { label: 'Organiser', value: 'Leke Adeboye Foundation' },
                          ].map((d) => (
                            <div key={d.label}>
                              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{d.label}</p>
                              <p className="text-sm font-semibold text-white mt-0.5">{d.value}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-white/65 text-sm leading-relaxed mb-8">
                          The annual Kingsmen and Kingsladies Conference is LAF's flagship youth empowerment event, gathering 100 exceptional young Nigerians aged 18 to 30 for three days of intensive leadership development, mentorship, and community building. Applicants must demonstrate character, potential, and a commitment to serving their communities.
                        </p>
                        <a href="https://kmklc.org" target="_blank" rel="noopener noreferrer"
                          className="inline-block px-8 py-3.5 rounded-xl font-semibold transition-all hover:opacity-90"
                          style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                          Apply Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* EDUCATION */}
            <section id="education">
              <Reveal>
                <SLabel>Pillar 02</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Education</h2>
                <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--laf-text)' }}>
                  Education is the most durable investment a community can make in itself. LAF's education programmes reach students at every stage of their academic journey, from secondary school to university.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Back to School Campaigns', desc: 'Annual supply drives for secondary school students across underserved communities in Lagos, covering books, uniforms, and school fees for those who need support most.' },
                    { title: 'Undergraduate Scholarships', desc: 'Merit-based and need-based scholarships for university students. We invest in both the high achievers who deserve recognition and the less privileged who need a hand to realise their potential.' },
                    { title: 'JAMB Support Programme', desc: 'Examination registration support, preparatory resources, and mentorship for students facing the critical transition from secondary school to tertiary education.' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl p-6 border" style={{ borderColor: 'var(--laf-border)', background: 'var(--laf-cream)' }}>
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(197,160,40,0.15)' }}>
                        <svg className="w-5 h-5" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--laf-navy)' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--laf-muted)' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* SOCIAL WELFARE & HEALTH */}
            <section id="welfare">
              <Reveal>
                <SLabel>Pillar 03</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Social Welfare & Health</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                  Access to healthcare and social support should not depend on postcode or income. LAF deploys free health outreaches, blood donation drives, and welfare interventions across Lagos communities throughout the year.
                </p>
                <div className="rounded-2xl p-8 lg:p-10" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                  <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--laf-navy)' }}>LASUTH Health Outreach — February 2026</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--laf-muted)' }}>Lagos University Teaching Hospital, Ikeja</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                    {[
                      { stat: '500+', label: 'Patients screened' },
                      { stat: '250+', label: 'Pints of blood donated' },
                      { stat: '12', label: 'Medical volunteers' },
                      { stat: '3', label: 'Specialist areas covered' },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="font-display text-3xl font-bold" style={{ color: 'var(--laf-gold)' }}>{s.stat}</p>
                        <p className="text-sm mt-1" style={{ color: 'var(--laf-muted)' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--laf-text)' }}>
                    In partnership with medical professionals, LAF organised a full-day health outreach offering free consultations, blood pressure checks, blood sugar screening, and a major blood donation drive. Hundreds of residents received care many had been deferring for months.
                  </p>
                </div>
              </Reveal>
            </section>

            {/* FOOD BANK */}
            <section id="food">
              <Reveal>
                <SLabel>Food Bank</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Food Bank & Food Drives</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                  Hunger does not wait for a convenient moment. LAF's food bank is a sustained commitment to ensuring that families across Lagos have access to nourishing meals, delivered with dignity and compassion.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="rounded-xl p-8" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                    <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--laf-navy)' }}>Want to contribute?</h3>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--laf-muted)' }}>
                      Whether you are an individual, a church, or a corporate organisation, there are several ways to support the food bank with items, funding, or logistics. Reach out to our team to discuss how you can partner with us.
                    </p>
                    <a href="/contact" className="inline-block px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                      Get in Touch
                    </a>
                  </div>
                  <div className="rounded-xl p-8" style={{ background: 'var(--laf-navy)' }}>
                    <h3 className="font-display text-2xl font-semibold mb-4 text-white">Corporate Food Donors</h3>
                    <p className="text-sm leading-relaxed text-white/65 mb-6">
                      Partner with LAF as a corporate food donor and extend your brand's social responsibility reach across Lagos communities. We offer structured corporate partnerships with reporting and recognition.
                    </p>
                    <a href="/get-involved#partner" className="inline-block px-6 py-3 rounded-xl font-semibold text-sm border-2" style={{ borderColor: 'var(--laf-gold)', color: 'var(--laf-gold)' }}>
                      Partner With Us
                    </a>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* STREET INITIATIVES */}
            <section id="street">
              <Reveal>
                <SLabel>Street Initiatives</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Street Outreach</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                  LAF takes the work to the streets, meeting people in their communities rather than waiting for them to come to us. Our street initiatives span Mushin, Ikeja, Amuwo Odofin, Sogunle, and beyond.
                </p>
                <div className="rounded-2xl p-10 text-center" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(197,160,40,0.15)' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--laf-navy)' }}>We are coming to your community soon</h3>
                  <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: 'var(--laf-muted)' }}>
                    Our street outreach programme is expanding across Lagos. If you would like to host or partner with LAF in your community, reach out to our team to discuss opportunities.
                  </p>
                  <a href="/contact" className="mt-6 inline-block px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                    Invite Us to Your Community
                  </a>
                </div>
              </Reveal>
            </section>

            {/* ARTS, SPORTS & CULTURE */}
            <section id="arts">
              <Reveal>
                <SLabel>Pillar 04</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Arts, Sports & Culture</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                  Identity matters. LAF's arts, sports and culture programming celebrates African heritage and builds confidence in communities through sport, creative expression, and cultural events that bring people together.
                </p>
                <div className="rounded-xl p-8 text-center" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                  <p className="font-display text-xl italic" style={{ color: 'var(--laf-navy)' }}>More activities being planned for 2026. Watch this space.</p>
                </div>
              </Reveal>
            </section>

            {/* BUSINESS & ENTERPRISE */}
            <section id="business">
              <Reveal>
                <SLabel>Pillar 06</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Business Hubs & Enterprise</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                  Economic empowerment is sustainable empowerment. LAF connects aspiring entrepreneurs to training, grants, and mentorship through the LAF Business Hub and the Millionaire Quest programme.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'LAF Business Hub', desc: 'A structured mentorship and training programme for early-stage entrepreneurs in Lagos, pairing participants with experienced business leaders and providing access to startup resources.' },
                    { title: 'Millionaire Quest', desc: 'LAF\'s flagship enterprise development initiative identifying and supporting the next generation of Nigerian entrepreneurs with seed funding, mentorship, and market access support.' },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl p-6" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                      <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--laf-navy)' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--laf-muted)' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </section>

            {/* GOVERNANCE */}
            <section id="governance">
              <Reveal>
                <SLabel>Pillar 05</SLabel>
                <h2 className="font-display text-4xl font-semibold mb-6" style={{ color: 'var(--laf-navy)' }}>Governance & Leadership</h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--laf-text)' }}>
                  The problems facing Nigeria's communities cannot be solved without a generation of young leaders who are equipped, ethical, and ready to serve. LAF invests in civic education, leadership summits, and responsible governance advocacy.
                </p>
                <div className="rounded-xl p-8 text-center" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                  <p className="font-display text-xl italic" style={{ color: 'var(--laf-navy)' }}>Governance and leadership programming launching in 2026.</p>
                </div>
              </Reveal>
            </section>

          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
