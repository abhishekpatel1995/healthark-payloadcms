'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navItems = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'About', href: '/healthark-testing' },
      { label: 'Contact', href: '/healthark-contact' },
      { label: 'Blog', href: '/blogs' },
    ],
    // children: [
    //   { label: 'Overview', href: '/about' },
    //   { label: 'Leadership', href: '/about/leadership' },
    //   { label: 'Life at Healthark', href: '/about/life-at-healthark' },
    //   { label: 'Clients', href: '/about/clients' },
    // ],
  },
  {
    label: 'Business Units',
    href: '/business-units',
    children: [
      { label: 'Growth Advisory', href: '/business-units/growth-advisory' },
      { label: 'Real World Evidence', href: '/business-units/real-world-evidence' },
      { label: 'Digital Transformation', href: '/business-units/digital-transformation' },
    ],
  },
  {
    label: 'Capabilities',
    href: '/capabilities',
    children: [
      { label: 'Digital Health', href: '/capabilities/digital-health' },
      { label: 'Modeling & Forecasting', href: '/capabilities/modeling-forecasting' },
      { label: 'Medical Writing', href: '/capabilities/medical-writing' },
      { label: 'Artificial Intelligence', href: '/capabilities/artificial-intelligence' },
      { label: 'Business Intelligence & Reporting', href: '/capabilities/business-intelligence' },
      { label: 'Mergers & Acquisitions', href: '/capabilities/mergers-acquisitions' },
      { label: 'Talent Acquisition', href: '/capabilities/talent-acquisition' },
      { label: 'Compliance', href: '/capabilities/compliance' },
      { label: 'Data Science & Analytics', href: '/capabilities/data-science-analytics' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    children: [
      { label: 'Curie', href: '/solutions/curie' },
      { label: 'Digital Therapeutics', href: '/solutions/digital-therapeutics' },
      { label: 'Global Capability Centres (GCC)', href: '/solutions/gcc' },
      { label: 'Market Access', href: '/solutions/market-access' },
      { label: 'Elevate', href: '/solutions/elevate' },
      { label: 'Activate', href: '/solutions/activate' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    children: [
      { label: 'Case Studies', href: '/insights/case-studies' },
      { label: 'Reports', href: '/insights/reports' },
      { label: 'Articles', href: '/insights/articles' },
      { label: 'Blogs', href: '/insights/blogs' },
      { label: 'Podcasts', href: '/insights/podcasts' },
      { label: 'Events', href: '/insights/events' },
      { label: 'Infographics', href: '/insights/infographics' },
      { label: 'Frameworks', href: '/insights/frameworks' },
      { label: 'Press Releases', href: '/insights/press-releases' },
      { label: 'Coffee Table Books', href: '/insights/coffee-table-books' },
      { label: 'Knowledge Series', href: '/insights/knowledge-series' },
    ],
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-border/40'
          : 'bg-white shadow-sm border-b border-border'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 flex-shrink-0">
            <span className="text-2xl font-bold tracking-tight text-primary">Health</span>
            <span className="text-2xl font-bold tracking-tight text-accent">ark</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-body hover:text-primary transition-colors rounded-md"
                >
                  {item.label}
                  <svg className="w-3 h-3 text-muted group-hover:text-primary transition-colors mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 ease-out z-50">
                  <div className="bg-white/95 backdrop-blur-sm border border-border rounded-xl shadow-xl min-w-60 py-1.5 overflow-hidden">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center px-4 py-2.5 text-sm text-body hover:bg-surface hover:text-primary transition-colors underline-slide"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              // href="/contact"
              href="/healthark-contact"
              className="hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <button
              className="lg:hidden p-2 rounded-md text-body hover:text-primary hover:bg-surface transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white overflow-y-auto max-h-[80vh]">
          <div className="px-4 py-3 space-y-0.5">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-body hover:text-primary hover:bg-surface rounded-lg transition-colors"
                  onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                >
                  {item.label}
                  <svg
                    className={`w-4 h-4 text-muted transition-transform duration-200 ${openSection === item.label ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSection === item.label && (
                  <div className="ml-4 mt-0.5 mb-1 space-y-0.5 border-l-2 border-border pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-muted hover:text-primary transition-colors rounded-md"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 pb-1">
              <Link
                href="/contact"
                className="block text-center px-4 py-3 text-sm font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
