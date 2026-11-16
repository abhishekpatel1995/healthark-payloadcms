import React from 'react'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/AnimateOnScroll'
import { CountUp } from '@/components/CountUp'

// ─── Hero visual ──────────────────────────────────────────────────────────────

function HeroVisual() {
  return (
    <div className="relative hidden lg:flex items-center justify-center py-12 min-h-[400px]">
      {/* Pulsing background glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: 'radial-gradient(circle, rgba(0,168,150,0.15) 0%, transparent 68%)' }}
      />

      {/* Rotating dashed outer ring */}
      <div className="absolute w-[392px] h-[392px] rounded-full border-2 border-dashed border-white/[0.06] animate-orbit-ring pointer-events-none" />

      {/* Main outer circle */}
      <div
        className="relative w-[340px] h-[340px] rounded-full border border-white/[0.07] flex items-center justify-center"
        style={{
          background:
            'radial-gradient(130% 130% at 40% -10%, rgba(27,95,173,0.22) 0%, rgba(0,168,150,0.06) 100%)',
        }}
      >
        {/* Inner ring */}
        <div className="absolute inset-10 rounded-full border border-accent/15" />

        {/* Centre icon */}
        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect x="20" y="6" width="8" height="36" rx="2" fill="rgba(0,168,150,0.15)" stroke="rgba(0,168,150,0.65)" strokeWidth="1.5" />
            <rect x="6" y="20" width="36" height="8" rx="2" fill="rgba(0,168,150,0.15)" stroke="rgba(0,168,150,0.65)" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="5" fill="none" stroke="rgba(0,168,150,0.9)" strokeWidth="1.5" />
            <path d="M8 38 L14 32 L20 35 L28 26 L34 30 L40 22"
              stroke="rgba(27,95,173,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Orbital dots */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-accent/50" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/50" />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/40" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/40" />
      </div>

      {/* Floating badge 1 */}
      <div className="absolute top-14 -right-2">
        <div
          className="animate-float rounded-xl border border-white/15 px-4 py-2.5"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-xs font-bold text-accent">28+ Clients</p>
          <p className="text-[11px] text-white/50 mt-0.5">Global network</p>
        </div>
      </div>

      {/* Floating badge 2 */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-4">
        <div
          className="animate-float-b rounded-xl border border-white/15 px-4 py-2.5"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-xs font-bold text-white/80">100+ Years</p>
          <p className="text-[11px] text-white/50 mt-0.5">Combined expertise</p>
        </div>
      </div>

      {/* Floating badge 3 */}
      <div className="absolute bottom-16 -left-2">
        <div
          className="animate-float-c rounded-xl border border-white/15 px-4 py-2.5"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}
        >
          <p className="text-xs font-bold text-white/80">Est. 2016</p>
          <p className="text-[11px] text-accent mt-0.5">Top strategy alumni</p>
        </div>
      </div>
    </div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative flex items-center min-h-[680px]"
      style={{ background: 'linear-gradient(135deg, #0C1B2D 0%, #0C1B2D 55%, #0d2d52 100%)' }}
    >
      {/* Teal glow right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 40%, rgba(0,168,150,0.12) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-[1fr_460px] gap-12 items-center">

          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-accent text-sm font-medium mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Healthcare &amp; Life Sciences Consulting
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] tracking-tight mb-6">
              Transforming Healthcare<br />
              Through{' '}
              <span className="text-gradient-brand">Intelligence</span>{' '}
              and Innovation
            </h1>

            <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
              A boutique consulting firm serving the global healthcare and life sciences industry.
              We combine domain expertise, scientific rigour, and advanced analytics to deliver
              executable solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/capabilities"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
              >
                Explore Our Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right: visual */}
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}

// ─── Featured Cards ───────────────────────────────────────────────────────────

const featuredItems = [
  {
    tag: 'AI Platform',
    title: 'One Platform. Many Domains. Infinite Possibilities.',
    desc: "Healthark's Curie AI platform brings intelligent automation to healthcare consulting workflows.",
    href: '/solutions/curie',
    color: '#1B5FAD',
  },
  {
    tag: 'Whitepaper',
    title: 'Winning the Decade of Life Sciences & Healthcare GCC Growth in India',
    desc: 'Our latest report in collaboration with the Government of Telangana.',
    href: '/insights/reports',
    color: '#00A896',
  },
  {
    tag: 'Market Report',
    title: 'Global Obesity Market Outlook 2025 and Beyond',
    desc: 'Comprehensive analysis of the obesity therapeutics landscape, pipeline, and market opportunities.',
    href: '/insights/reports',
    color: '#1B5FAD',
  },
  {
    tag: 'Summit',
    title: 'RWEsearch & Health Innovation Summit 2025',
    desc: 'All sessions are now live on YouTube. Explore insights that shaped the event.',
    href: '/insights/events',
    color: '#00A896',
  },
]

function FeaturedCards() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredItems.map((item, i) => (
            <AnimateOnScroll key={item.title} delay={i * 80}>
              <Link
                href={item.href}
                className="group bg-white rounded-xl p-6 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-widest mb-3 px-2.5 py-1 rounded-full inline-flex w-fit text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.tag}
                </div>
                <h3 className="text-sm font-semibold text-heading leading-snug mb-3 group-hover:text-primary transition-colors flex-1 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                  Read more
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About / Mission ──────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">Who We Are</p>
        <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-6 leading-tight tracking-tight">
          Healthark helps healthcare and life sciences companies modernise strategy,
          accelerate evidence generation, and harness digital innovation.
        </h2>
        <p className="text-lg text-muted leading-relaxed mb-12 max-w-3xl mx-auto">
          Founded in 2016 by consultants from top-tier strategy firms, we bring together 100+
          years of cumulative experience across consulting, pharma, medicine, medical devices,
          digital health, and public health — united by a relentless focus on delivering
          executable solutions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 text-left">
          {[
            { label: 'Strategy & Research', desc: 'Market assessments, competitive intelligence, and growth advisory.' },
            { label: 'Digital Health', desc: 'AI, data science, and technology transformation for healthcare.' },
            { label: 'Real World Evidence', desc: 'RWD diligence, analytics, and evidence generation across the care continuum.' },
          ].map((pillar) => (
            <div key={pillar.label} className="pl-5 border-l-2 border-accent">
              <h4 className="text-sm font-semibold text-primary mb-2">{pillar.label}</h4>
              <p className="text-sm text-muted leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Learn more about us
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

// ─── Services Grid ────────────────────────────────────────────────────────────

const services = [
  {
    title: 'Growth Advisory',
    desc: 'Market assessments using primary research and data analytics to answer focused strategic questions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: 'Real World Evidence',
    desc: 'Deep RWD diligence and analytics for both the commercial and medical continuum.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: 'Digital Health',
    desc: 'Digital landscape analysis across 2,000+ companies for specific therapeutic areas and diseases.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    title: 'Modeling & Forecasting',
    desc: 'Fact-based decision support through market sizing and revenue forecasting for in-market and pipeline assets.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Artificial Intelligence',
    desc: 'AI-driven analysis including voice analytics, NLP, image analytics, and IoT-based solutions.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    ),
  },
  {
    title: 'Medical Writing',
    desc: 'In-house physicians delivering scientific writing, physician communications, and patient education.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: 'Business Intelligence',
    desc: 'Interactive dashboards and reports using Power BI and Tableau for real-time decision support.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    title: 'Data Science & Analytics',
    desc: 'Claims data analysis and healthcare analytics for insurers, health systems, and data companies.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: 'KOL Identification',
    desc: 'KOL data sourcing, validation, and prioritisation across segments and geographies.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
]

function ServicesSection() {
  return (
    <section className="bg-surface-2 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">What We Do</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-heading mb-4 tracking-tight">Our Capabilities</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Domain expertise, decades of experience, and a passion for client success — delivering
            real results for healthcare and life sciences companies worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <AnimateOnScroll key={svc.title} delay={i * 55}>
              <div className="group bg-white rounded-xl p-6 border border-border hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-300 h-full cursor-pointer">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(27,95,173,0.12) 0%, rgba(0,168,150,0.08) 100%)',
                  }}
                >
                  {svc.icon}
                </div>
                <h3 className="text-base font-semibold text-heading mb-2 tracking-tight">{svc.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{svc.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-colors text-sm"
          >
            View All Capabilities
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

const stats = [
  { value: '2016', label: 'Established' },
  { value: '250+', label: 'Projects Completed' },
  { value: '28+', label: 'Clients Served' },
  { value: '60', label: 'Countries Reached' },
]

function StatsSection() {
  return (
    <section className="relative bg-primary py-20 overflow-hidden">
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-8 px-6 ${i < stats.length - 1 ? 'lg:border-r border-white/10' : ''}`}
            >
              <p className="text-5xl lg:text-6xl font-bold text-white mb-3 tabular-nums tracking-tight">
                <CountUp end={stat.value} />
              </p>
              <p className="text-xs font-semibold text-white/55 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

const caseStudyGradients = [
  'linear-gradient(135deg, #1B5FAD 0%, #00A896 100%)',
  'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)',
  'linear-gradient(135deg, #00A896 0%, #0C1B2D 100%)',
]

const caseStudies = [
  {
    tag: 'Medical Tourism',
    date: 'March 2026',
    title: 'Healthcare Content Development for Medical Tourism Organisation',
    href: '/insights/case-studies',
  },
  {
    tag: 'Real World Data',
    date: 'January 2026',
    title: 'Unlocking Clinical Insights from De-identified Real-World Data',
    href: '/insights/case-studies',
  },
  {
    tag: 'Market Entry',
    date: 'October 2025',
    title: 'Enabling UK Biotech Entry with Market, Regulatory & Financial Insights',
    href: '/insights/case-studies',
  },
]

function CaseStudiesSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Case Studies</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-heading max-w-xl leading-tight tracking-tight">
              We help clients anticipate and act with insight and speed
            </h2>
          </div>
          <Link
            href="/insights/case-studies"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            See all case studies
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <AnimateOnScroll key={cs.title} delay={i * 100}>
              <Link
                href={cs.href}
                className="group flex flex-col bg-surface rounded-xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
              >
                {/* Thumbnail */}
                <div
                  className="relative h-44 overflow-hidden flex-shrink-0"
                  style={{ background: caseStudyGradients[i] }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
                  >
                    <span className="text-[11px] font-bold text-white/90 uppercase tracking-widest">
                      {cs.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-muted mb-3">{cs.date}</p>
                  <h3 className="text-sm font-semibold text-heading leading-snug mb-4 group-hover:text-primary transition-colors flex-1 tracking-tight">
                    {cs.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                    Read more
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Insights / Podcasts ──────────────────────────────────────────────────────

const waveHeights = [30, 58, 44, 72, 38, 62, 50, 78, 42, 66, 34, 74, 56, 46, 68, 40, 60, 52, 76, 36]

const podcasts = [
  {
    season: 'RWD/RWE Club',
    title: 'Real World Wednesdays: Insights from the Current RWD/RWE Landscape',
    desc: 'The RWD & RWE Club promotes active conversation on the creation and use of real-world data for generating evidence in clinical research and market access.',
    href: '/insights/podcasts',
  },
  {
    season: 'Season 2 · Episode 5',
    title: 'Real-World Evidence for Improving Access to Treatments',
    desc: 'Dr. Purav Gandhi (CEO) in conversation with Dan Housman, Co-founder and CTO of Graticule, on leveraging RWE to improve patient access.',
    href: '/insights/podcasts',
  },
  {
    season: 'Season 2 · Episode 4',
    title: 'Democratising Access to Fertility Care with MedTech',
    desc: 'Mukesh Nayak (Head of Marketing) interviews Marty Gauvin, CEO of Fertilis, on how MedTech is expanding fertility care access globally.',
    href: '/insights/podcasts',
  },
]

function InsightsSection() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Podcast</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-heading tracking-tight">
              Healthcare Innovation Podcast
            </h2>
          </div>
          <Link
            href="/insights/podcasts"
            className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            All episodes
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {podcasts.map((ep, i) => (
            <AnimateOnScroll key={ep.title} delay={i * 100}>
              <Link
                href={ep.href}
                className="group flex flex-col bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
              >
                {/* Thumbnail */}
                <div
                  className="relative h-36 flex-shrink-0 overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)' }}
                >
                  <div className="absolute inset-0 flex items-center justify-center gap-[3px] px-8">
                    {waveHeights.map((h, idx) => (
                      <div
                        key={idx}
                        className="w-1 rounded-full bg-white/20 flex-shrink-0"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-accent/60 bg-accent/15 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                      <svg className="w-5 h-5 text-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 px-4 py-2.5"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}
                  >
                    <p className="text-[11px] font-bold text-accent uppercase tracking-widest">{ep.season}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-heading leading-snug mb-3 group-hover:text-primary transition-colors flex-1 tracking-tight">
                    {ep.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mb-4">{ep.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                    Listen now
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Clients marquee ──────────────────────────────────────────────────────────

const clients = [
  'Eli Lilly', 'Pfizer', 'Gilead Sciences', 'Boehringer Ingelheim',
  'Johnson & Johnson', 'Roche', 'Abbott', 'Novartis', 'IBM Watson Health',
]

function ClientsSection() {
  return (
    <section className="bg-white py-16 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-muted">
          Trusted by leading healthcare companies worldwide
        </p>
      </div>

      {/* Infinite marquee */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
        />

        <div className="flex items-center animate-marquee" style={{ width: 'max-content' }}>
          {[...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="text-base font-semibold whitespace-nowrap flex-shrink-0 mx-10"
              style={{ color: 'rgba(15,23,42,0.32)' }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/about/clients"
          className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5"
        >
          View all clients
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

// ─── Contact CTA ──────────────────────────────────────────────────────────────

function ContactCTA() {
  return (
    <section className="bg-accent py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
          Ready to transform your healthcare business?
        </h2>
        <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto">
          Partner with Healthark and get access to best-in-class talent, robust processes, and
          cutting-edge technology tailored to the healthcare and life sciences industry.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-accent hover:bg-white/90 font-semibold rounded-lg transition-colors"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/capabilities"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCards />
      <AnimateOnScroll><AboutSection /></AnimateOnScroll>
      <ServicesSection />
      <StatsSection />
      <AnimateOnScroll><CaseStudiesSection /></AnimateOnScroll>
      <AnimateOnScroll><InsightsSection /></AnimateOnScroll>
      <AnimateOnScroll><ClientsSection /></AnimateOnScroll>
      <AnimateOnScroll><ContactCTA /></AnimateOnScroll>
    </>
  )
}
