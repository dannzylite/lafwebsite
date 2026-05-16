import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from '@tanstack/react-router'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'What We Do',
    href: '/programs',
    children: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Youth Empowerment', href: '/programs#youth' },
      { label: 'Education', href: '/programs#education' },
      { label: 'Social Welfare', href: '/programs#welfare' },
      { label: 'Food Bank', href: '/programs#food' },
      { label: 'Street Initiatives', href: '/programs#street' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Get Involved',
    href: '/get-involved',
    children: [
      { label: 'Donate', href: '/get-involved#donate' },
      { label: 'Partner', href: '/get-involved#partner' },
      { label: 'Volunteer', href: '/get-involved#volunteer' },
      { label: 'Prayer Partner', href: '/get-involved#prayer' },
    ],
  },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isHome = location.pathname === '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome ? 'nav-scrolled' : 'bg-transparent'
        }`}
        style={{ background: scrolled || !isHome ? 'rgba(10,25,41,0.97)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/laf-logo.png"
                alt="Leke Adeboye Foundation"
                className="h-10 lg:h-12 w-auto flex-shrink-0"
              />
              <div className="hidden sm:block">
                <div className="font-display font-semibold text-white text-base leading-tight">Leke Adeboye</div>
                <div className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>FOUNDATION</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navLinks.map((link) => (
                <div key={link.href} className="relative group">
                  {link.children ? (
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      aria-expanded={openDropdown === link.label}
                    >
                      {link.label}
                      <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={link.href as any}
                      className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/10 block"
                      activeProps={{ className: 'text-white' }}
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.children && (
                    <div
                      className={`absolute top-full left-0 mt-1 w-52 rounded-xl shadow-2xl overflow-hidden transition-all duration-200 ${openDropdown === link.label ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                      style={{ background: 'var(--laf-navy)', border: '1px solid rgba(197,160,40,0.2)' }}
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="/get-involved#donate"
                className="ml-4 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}
              >
                Donate Now
              </a>
            </nav>

            {/* Mobile: Donate + Hamburger */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href="/get-involved#donate"
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}
              >
                Donate
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-md"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
        style={{ background: 'rgba(0,0,0,0.6)' }}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full lg:hidden flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--laf-navy)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(197,160,40,0.2)' }}>
          <div>
            <div className="font-display font-semibold text-white text-lg">Leke Adeboye</div>
            <div className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>FOUNDATION</div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Donate in drawer */}
        <div className="p-5">
          <a
            href="/get-involved#donate"
            className="block text-center px-5 py-3 rounded-lg font-semibold"
            style={{ background: 'var(--laf-gold)', color: 'var(--laf-navy)' }}
          >
            Donate Now
          </a>
        </div>
        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-5 pb-8">
          {navLinks.map((link) => (
            <div key={link.href} className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <a
                href={link.href}
                className="flex items-center py-3.5 text-base text-white/80 hover:text-white font-medium transition-colors"
              >
                {link.label}
              </a>
              {link.children && (
                <div className="pb-3 pl-4 space-y-2">
                  {link.children.slice(1).map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      className="block py-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Floating Donate button (mobile only, appears after scroll) */}
      <FloatingDonateButton />
    </>
  )
}

function FloatingDonateButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a
      href="/get-involved#donate"
      aria-label="Donate now"
      className={`fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 animate-float-pulse ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
      style={{ background: 'var(--laf-gold)' }}
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--laf-navy)' }}>
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
      </svg>
    </a>
  )
}
