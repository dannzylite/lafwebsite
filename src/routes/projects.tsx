import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/projects')({
  component: ProjectsPage,
})

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal()
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`}>{children}</div>
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="ml-2 px-2 py-0.5 rounded text-xs border transition-all" style={{ borderColor: 'var(--laf-gold)', color: 'var(--laf-gold)' }}>
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

type Project = {
  title: string
  category: string
  year: number
  location: string
  outcome: string
  tag?: string
  img: string | null
  featured?: boolean
}

const allProjects: Project[] = [
  { title: 'LightUp Ikeja Initiative', category: 'Community', year: 2026, location: 'Ikeja, Lagos', outcome: 'Hundreds of families reached with food and support', img: '/assets/lightup-01.jpeg' },
  { title: 'Jesus in the Park', category: 'Community', year: 2025, location: 'Ikeja, Lagos', outcome: 'Thousands served at the park outreach', img: '/assets/lightup-04.jpeg' },
  { title: 'LASUTH Health Outreach', category: 'Health', year: 2026, location: 'Ikeja, Lagos', outcome: '500+ patients screened, consultations provided', img: null },
  { title: 'Blood Donation Drive', category: 'Health', year: 2026, location: 'Lagos', outcome: '250+ pints of blood donated', img: null },
  { title: 'Sogunle School Renovation', category: 'Education', year: 2025, location: 'Sogunle, Lagos', outcome: 'School fully rehabilitated for students', img: '/assets/sogunle-01.jpg' },
  { title: 'JAMB Scholarship Awards', category: 'Education', year: 2025, location: 'Lagos', outcome: '200+ scholarships awarded to students', img: null },
  { title: 'Project Habun', category: 'Youth', year: 2024, location: 'Lagos', outcome: 'Youth capacity building programme', img: null },
  { title: 'Millionaire Quest', category: 'Enterprise', year: 2024, location: 'Lagos', outcome: 'Entrepreneurs trained and supported', img: null },
  { title: 'LAF Youth Development Centre', category: 'Infrastructure', year: 2026, location: 'Amuwo Odofin, Lagos', outcome: 'In progress: ₦948M capital campaign', img: '/assets/laf-dev-center.png', featured: true },
  { title: 'RCCG Maternity Centre Renovation', category: 'Infrastructure', year: 2026, location: 'Ebutemetta, Lagos', outcome: 'Renovation to serve hundreds of mothers', img: '/assets/maternity-04.jpeg' },
]

const categories = ['All', 'Community', 'Health', 'Education', 'Youth', 'Enterprise', 'Infrastructure']
const years = ['All', '2026', '2025', '2024']

const tagColors: Record<string, string> = {
  Community: '#C5A028', Health: '#0A7A5A', Education: '#1a3a5c',
  Youth: '#7c3aed', Enterprise: '#b45309', Infrastructure: '#374151',
}

export default function ProjectsPage() {
  const [catFilter, setCatFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')

  const filtered = allProjects.filter((p) => {
    const matchCat = catFilter === 'All' || p.category === catFilter
    const matchYear = yearFilter === 'All' || String(p.year) === yearFilter
    return matchCat && matchYear
  })

  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20" style={{ background: 'var(--laf-navy)', minHeight: '360px' }}>
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/maternity-01.jpeg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'rgba(10,25,41,0.94)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="/" className="hover:text-white/70">Home</a> <span className="mx-2">/</span>
            <span style={{ color: 'var(--laf-gold)' }}>Projects</span>
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white">Our Projects</h1>
          <p className="mt-4 text-white/60 text-lg">Every project is a story. Every story is a life changed.</p>
        </div>
      </section>

      {/* CAPITAL CAMPAIGN BANNER */}
      <section className="py-12" style={{ background: 'var(--laf-gold)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <span className="font-sc text-xs tracking-widest block mb-2" style={{ color: 'rgba(10,25,41,0.6)' }}>CAPITAL CAMPAIGN</span>
              <h2 className="font-display text-3xl font-semibold" style={{ color: 'var(--laf-navy)' }}>LAF Youth Development Centre, Amuwo Odofin</h2>
              <p className="mt-2 text-sm" style={{ color: 'rgba(10,25,41,0.7)' }}>Target: ₦948,000,000 &bull; Status: In Progress (35% funded)</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center flex-shrink-0">
              <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(10,25,41,0.1)' }}>
                <p className="font-mono font-bold" style={{ color: 'var(--laf-navy)' }}>
                  PremiumTrust Bank &bull; Leke Adeboye Foundation
                </p>
                <div className="flex gap-4 mt-1">
                  <span>NGN: <strong>0040217552</strong><CopyBtn text="0040217552" /></span>
                  <span>GBP: <strong>30085522</strong><CopyBtn text="30085522" /></span>
                </div>
              </div>
              <a href="/get-involved#donate" className="px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap" style={{ background: 'var(--laf-navy)', color: 'var(--laf-gold)' }}>
                Donate to This Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div>
              <p className="font-sc text-xs tracking-wider mb-2" style={{ color: 'var(--laf-gold)' }}>FOCUS</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button key={c} onClick={() => setCatFilter(c)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                    style={catFilter === c
                      ? { background: 'var(--laf-navy)', color: 'white' }
                      : { background: 'var(--laf-cream)', color: 'var(--laf-muted)', border: '1px solid var(--laf-border)' }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="font-sc text-xs tracking-wider mb-2" style={{ color: 'var(--laf-gold)' }}>YEAR</p>
              <div className="flex flex-wrap gap-2">
                {years.map((y) => (
                  <button key={y} onClick={() => setYearFilter(y)}
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
                    style={yearFilter === y
                      ? { background: 'var(--laf-gold)', color: 'var(--laf-navy)' }
                      : { background: 'var(--laf-cream)', color: 'var(--laf-muted)', border: '1px solid var(--laf-border)' }}>
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl" style={{ color: 'var(--laf-muted)' }}>No projects match these filters.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((p) => (
              <Reveal key={p.title}>
                <div className="break-inside-avoid group rounded-2xl overflow-hidden card-hover mb-6" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                  {p.img ? (
                    <div className="relative overflow-hidden" style={{ height: p.featured ? '280px' : '200px' }}>
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {p.featured && (
                        <span className="absolute top-4 left-4 font-sc text-xs tracking-widest px-3 py-1 rounded-full" style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}>
                          CAPITAL CAMPAIGN
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="h-36 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--laf-navy), #1a3a5c)' }}>
                      <span className="font-display text-3xl font-light" style={{ color: 'var(--laf-gold)' }}>LAF</span>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-3 py-0.5 rounded-full text-white" style={{ background: tagColors[p.category] || 'var(--laf-navy)' }}>{p.category}</span>
                      <span className="text-xs" style={{ color: 'var(--laf-muted)' }}>{p.year}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-1" style={{ color: 'var(--laf-navy)' }}>{p.title}</h3>
                    <p className="text-xs mb-3" style={{ color: 'var(--laf-muted)' }}>{p.location}</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--laf-gold)' }}>{p.outcome}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
