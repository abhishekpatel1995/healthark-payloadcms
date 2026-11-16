import Link from 'next/link'

const footerColumns = {
  company: {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Life at Healthark', href: '/about/life-at-healthark' },
      { label: 'Our Clients', href: '/about/clients' },
      { label: 'Careers', href: '/contact/careers' },
    ],
  },
  capabilities: {
    heading: 'Capabilities',
    links: [
      { label: 'Digital Health', href: '/capabilities/digital-health' },
      { label: 'Modeling & Forecasting', href: '/capabilities/modeling-forecasting' },
      { label: 'Medical Writing', href: '/capabilities/medical-writing' },
      { label: 'Artificial Intelligence', href: '/capabilities/artificial-intelligence' },
      { label: 'Business Intelligence', href: '/capabilities/business-intelligence' },
      { label: 'Mergers & Acquisitions', href: '/capabilities/mergers-acquisitions' },
      { label: 'Data Science & Analytics', href: '/capabilities/data-science-analytics' },
    ],
  },
  insights: {
    heading: 'Insights',
    links: [
      { label: 'Case Studies', href: '/insights/case-studies' },
      { label: 'Reports', href: '/insights/reports' },
      { label: 'Articles', href: '/insights/articles' },
      { label: 'Blogs', href: '/insights/blogs' },
      { label: 'Podcasts', href: '/insights/podcasts' },
      { label: 'Events', href: '/insights/events' },
      { label: 'Press Releases', href: '/insights/press-releases' },
      { label: 'Knowledge Series', href: '/insights/knowledge-series' },
    ],
  },
}

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/healthark-insights/',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/healthark_',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/healtharkinsights/',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/c/healtharkinsights',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/healtharkinsights',
    svg: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0C1B2D' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* Col 1: Brand + contact + social */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-0 mb-4">
              <span className="text-2xl font-bold text-white">Health</span>
              <span className="text-2xl font-bold text-accent">ark</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              A boutique healthcare and life sciences consulting firm delivering executable
              solutions since 2016 — combining domain expertise, scientific rigor, and
              advanced analytics.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-8">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/50 hover:text-accent transition-colors"
                >
                  {s.svg}
                </a>
              ))}
            </div>

            {/* Addresses */}
            <div className="space-y-4 text-sm text-white/55">
              <div>
                <p className="font-semibold text-white/80 mb-0.5">Ahmedabad</p>
                <p>821, Sun Avenue One, ManikBaug Road,<br />Ambawadi, Ahmedabad – 380015, India</p>
              </div>
              <div>
                <p className="font-semibold text-white/80 mb-0.5">Hyderabad</p>
                <p>Ikeva @ Orbit, Level 19, Knowledge City Rd,<br />Hyderabad – 500032, India</p>
              </div>
              <a href="mailto:contact@healthark.ai" className="hover:text-accent transition-colors block mt-2">
                contact@healthark.ai
              </a>
            </div>
          </div>

          {/* Col 2: Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {footerColumns.company.heading}
            </h3>
            <ul className="space-y-2.5">
              {footerColumns.company.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Capabilities */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {footerColumns.capabilities.heading}
            </h3>
            <ul className="space-y-2.5">
              {footerColumns.capabilities.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Insights */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {footerColumns.insights.heading}
            </h3>
            <ul className="space-y-2.5">
              {footerColumns.insights.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35">© 2025 Healthark. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-sm text-white/35 hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-sm text-white/35 hover:text-accent transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
