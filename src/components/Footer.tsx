export default function Footer() {
  return (
    <footer style={{ background: 'var(--laf-navy)' }} className="text-white">
      {/* Bank details band */}
      <div className="border-b" style={{ borderColor: 'rgba(197,160,40,0.2)', background: 'rgba(197,160,40,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <span className="font-sc text-xs tracking-widest" style={{ color: 'var(--laf-gold)' }}>GIVE TODAY</span>
            <h3 className="font-display text-2xl text-white mt-1">Support the Mission</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(197,160,40,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🇳🇬</span>
                <span className="font-sc text-xs tracking-wider" style={{ color: 'var(--laf-gold)' }}>NGN ACCOUNT</span>
              </div>
              <p className="text-white font-semibold">PremiumTrust Bank</p>
              <p className="text-white/70 text-sm">Leke Adeboye Foundation</p>
              <p className="text-white font-mono text-lg mt-1">0040217552</p>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(197,160,40,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🇬🇧</span>
                <span className="font-sc text-xs tracking-wider" style={{ color: 'var(--laf-gold)' }}>GBP ACCOUNT</span>
              </div>
              <p className="text-white font-semibold">PremiumTrust Bank</p>
              <p className="text-white/70 text-sm">Leke Adeboye Foundation</p>
              <p className="text-white font-mono text-lg mt-1">30085522</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/laf-logo.png"
                alt="Leke Adeboye Foundation"
                className="h-10 w-auto flex-shrink-0"
              />
              <div>
                <div className="font-display font-semibold text-white text-sm">Leke Adeboye Foundation</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Empowering youth, restoring hope, and building sustainable communities across Lagos and beyond since 2021.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com/lekeadeboyefoundation', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Facebook', href: 'https://facebook.com/lekeadeboyefoundation', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { label: 'YouTube', href: 'https://youtube.com/@lekeadeboyefoundation', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-100 opacity-60"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-sc text-xs tracking-widest mb-5" style={{ color: 'var(--laf-gold)' }}>QUICK LINKS</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Our Projects', href: '/projects' },
                { label: 'Get Involved', href: '/get-involved' },
                { label: 'Media', href: '/media' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div>
            <h4 className="font-sc text-xs tracking-widest mb-5" style={{ color: 'var(--laf-gold)' }}>PROGRAMS</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Youth Empowerment', href: '/programs#youth' },
                { label: 'Education', href: '/programs#education' },
                { label: 'Social Welfare', href: '/programs#welfare' },
                { label: 'Arts, Sports & Culture', href: '/programs#arts' },
                { label: 'Food Bank', href: '/programs#food' },
                { label: 'Business Hubs', href: '/programs#business' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h4 className="font-sc text-xs tracking-widest mb-5" style={{ color: 'var(--laf-gold)' }}>CONNECT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Lagos, Nigeria
              </li>
              <li>
                <a href="mailto:info@lekeadeboyefoundation.org" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@lekeadeboyefoundation.org
                </a>
              </li>
              <li>
                <a href="tel:+2347062594160" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--laf-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +234 706 259 4160
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            &copy; 2026 Leke Adeboye Foundation. Empowering Youth. Restoring Hope.
          </p>
          <div className="flex gap-5">
            <a href="/privacy" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
