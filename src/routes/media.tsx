import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/media')({
  component: MediaPage,
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

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="rounded-2xl p-16 text-center" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(197,160,40,0.12)' }}>
        <svg className="w-8 h-8" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--laf-navy)' }}>{label}</h3>
      <p className="text-sm" style={{ color: 'var(--laf-muted)' }}>Content coming soon. Check back for updates.</p>
    </div>
  )
}

const pressReleases = [
  { title: 'LAF to Complete RCCG Throne of Grace Maternity Renovation', date: 'May 2026', tag: 'Infrastructure' },
  { title: 'Kingsmen and Kingsladies Conference 2026 Announced', date: 'April 2026', tag: 'Youth' },
  { title: 'LAF Launches ₦948M Youth Development Centre Capital Campaign', date: 'March 2026', tag: 'Capital Campaign' },
  { title: 'Blood Donation Drive Yields 250+ Pints at LASUTH Outreach', date: 'March 2026', tag: 'Health' },
  { title: 'LAF Awards 200+ JAMB Scholarships to Lagos Students', date: 'September 2025', tag: 'Education' },
  { title: 'Sogunle School Renovation Completed Ahead of Schedule', date: 'December 2025', tag: 'Education' },
]

const impactReports = [
  { year: '2025', desc: 'Our most comprehensive report yet: 40,000+ lives, 150+ programmes, 6 pillars of impact.' },
  { year: '2024', desc: 'Marking the launch of education and health pillars. JAMB scholarships introduced.' },
  { year: '2023', desc: 'First year as formally registered LAI. Food drives reach 5,000 families.' },
  { year: '2022', desc: 'Grassroots origins: early food drives, prayer outreaches, first partnerships.' },
]

const tabs = ['Press Releases', 'Photo Gallery', 'Video Gallery', 'Impact Reports', 'News & Blog']

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState('Press Releases')

  return (
    <div style={{ background: 'var(--laf-white)' }}>
      <Header />

      {/* HERO */}
      <section className="relative pt-32 pb-20" style={{ background: 'var(--laf-navy)', minHeight: '320px' }}>
        <div className="absolute inset-0" style={{ background: 'rgba(10,25,41,0.97)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <a href="/" className="hover:text-white/70">Home</a> <span className="mx-2">/</span>
            <span style={{ color: 'var(--laf-gold)' }}>Media</span>
          </p>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white">Media & Resources</h1>
          <p className="mt-4 text-white/60 text-lg">Press releases, reports, and resources from the Leke Adeboye Foundation.</p>
        </div>
      </section>

      {/* TABS */}
      <div className="sticky top-16 z-30 shadow-sm" style={{ background: 'var(--laf-white)', borderBottom: '1px solid var(--laf-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-shrink-0 px-5 py-4 text-sm font-medium transition-all border-b-2"
                style={activeTab === tab
                  ? { borderBottomColor: 'var(--laf-gold)', color: 'var(--laf-navy)' }
                  : { borderBottomColor: 'transparent', color: 'var(--laf-muted)' }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Reveal>
          {activeTab === 'Press Releases' && (
            <div>
              <SLabel>Press Releases</SLabel>
              <div className="space-y-4">
                {pressReleases.map((p) => (
                  <div key={p.title} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl card-hover" style={{ background: 'var(--laf-cream)', border: '1px solid var(--laf-border)' }}>
                    <div>
                      <span className="text-xs font-semibold px-3 py-0.5 rounded-full text-white mb-3 inline-block" style={{ background: 'var(--laf-navy)' }}>{p.tag}</span>
                      <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--laf-navy)' }}>{p.title}</h3>
                      <p className="text-sm mt-1" style={{ color: 'var(--laf-muted)' }}>{p.date}</p>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-medium flex-shrink-0" style={{ color: 'var(--laf-gold)' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Photo Gallery' && <ComingSoon label="Photo Gallery" />}
          {activeTab === 'Video Gallery' && <ComingSoon label="Video Gallery" />}
          {activeTab === 'News & Blog' && <ComingSoon label="News & Blog" />}

          {activeTab === 'Impact Reports' && (
            <div>
              <SLabel>Impact Reports</SLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactReports.map((r) => (
                  <div key={r.year} className="rounded-2xl p-8 flex flex-col justify-between card-hover" style={{ background: 'var(--laf-navy)', minHeight: '220px' }}>
                    <div>
                      <span className="font-display text-5xl font-bold" style={{ color: 'var(--laf-gold)' }}>{r.year}</span>
                      <p className="mt-4 text-sm leading-relaxed text-white/65">{r.desc}</p>
                    </div>
                    <button className="mt-6 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--laf-gold)' }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>

      <Footer />
    </div>
  )
}
