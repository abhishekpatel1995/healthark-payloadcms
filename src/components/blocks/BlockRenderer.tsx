import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page, Media, Service, CaseStudy, Insight, Client } from '@/payload-types'
import { CountUp } from '@/components/CountUp'
import { AccordionClient } from '@/components/blocks/AccordionClient'
import { VideoEmbed } from '@/components/blocks/VideoEmbed'
import { ContactFormClient } from '@/components/blocks/ContactFormClient'
import { FeatureScrollClient } from '@/components/blocks/FeatureScrollClient'
import { MetricsBarClient } from '@/components/blocks/MetricsBarClient'
import { BentoBlock } from '@/components/blocks/BentoBlock'
import { CarouselBlock } from '@/components/blocks/CarouselBlock'
import { NewsListBlock } from '@/components/blocks/NewsListBlock'
import { IntroVideoBlock } from '@/components/blocks/IntroVideoBlock'
import { BandWithImageBlock } from '@/components/blocks/BandWithImageBlock'
import { TypewriterSpan } from '@/components/TypewriterSpan'
import { TickerBlock as TickerBlockComponent } from '@/components/blocks/TickerBlock'

// ─── Types ────────────────────────────────────────────────────────────────────

type LayoutBlock = NonNullable<Page['layout']>[number]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveMedia(field: unknown): Media | null {
  if (!field || typeof field !== 'object') return null
  return field as Media
}

function imgProps(field: unknown) {
  const m = resolveMedia(field)
  if (!m?.url) return null
  return { src: m.url, width: m.width ?? 800, height: m.height ?? 600, alt: m.alt ?? '' }
}

// ─── Lexical rich-text → HTML ─────────────────────────────────────────────────
// Converts Payload's Lexical JSON format to safe HTML for rendering.

type LexicalNode = {
  type: string
  text?: string
  format?: number
  tag?: string
  url?: string
  newTab?: boolean
  listType?: string
  language?: string
  children?: LexicalNode[]
  [k: string]: unknown
}

function lexicalNodeToHtml(node: LexicalNode): string {
  if (node.type === 'text') {
    let t = (node.text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const fmt = node.format ?? 0
    if (fmt & 1)  t = `<strong>${t}</strong>`
    if (fmt & 2)  t = `<em>${t}</em>`
    if (fmt & 8)  t = `<u>${t}</u>`
    if (fmt & 4)  t = `<s>${t}</s>`
    if (fmt & 16) t = `<code style="background:#F1F5F9;padding:1px 5px;border-radius:4px;font-size:0.875em">${t}</code>`
    return t
  }
  if (node.type === 'linebreak') return '<br />'
  if (node.type === 'horizontalrule') return '<hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0" />'

  const inner = (node.children ?? []).map(lexicalNodeToHtml).join('')

  switch (node.type) {
    case 'root':
    case 'paragraph':
      return `<p style="margin:0 0 16px;line-height:1.7;color:#334155">${inner}</p>`
    case 'heading': {
      const tag = node.tag ?? 'h2'
      const sizes: Record<string, string> = {
        h1: 'font-size:2rem', h2: 'font-size:1.5rem', h3: 'font-size:1.25rem',
        h4: 'font-size:1.1rem', h5: 'font-size:1rem', h6: 'font-size:0.9rem',
      }
      return `<${tag} style="${sizes[tag] ?? ''};font-weight:700;letter-spacing:-0.02em;margin:0 0 12px;color:#0F172A;line-height:1.25">${inner}</${tag}>`
    }
    case 'list':
      return node.listType === 'number'
        ? `<ol style="margin:0 0 16px;padding-left:1.5rem;color:#334155">${inner}</ol>`
        : `<ul style="margin:0 0 16px;padding-left:1.5rem;color:#334155">${inner}</ul>`
    case 'listitem':
      return `<li style="margin-bottom:6px;line-height:1.6">${inner}</li>`
    case 'link': {
      const href = (node.url as string) ?? '#'
      const target = node.newTab ? ' target="_blank" rel="noopener noreferrer"' : ''
      return `<a href="${href}"${target} style="color:#1B5FAD;text-decoration:underline">${inner}</a>`
    }
    case 'quote':
      return `<blockquote style="border-left:3px solid #00A896;padding:12px 20px;margin:0 0 16px;background:#F8F9FA;color:#475569;font-style:italic">${inner}</blockquote>`
    case 'code':
      return `<pre style="background:#0F172A;color:#e2e8f0;padding:16px 20px;border-radius:8px;overflow-x:auto;font-size:0.85rem;margin:0 0 16px"><code>${inner}</code></pre>`
    default:
      return inner
  }
}

function renderLexical(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as { root?: LexicalNode }).root
  if (!root) return ''
  return (root.children ?? []).map(lexicalNodeToHtml).join('')
}

// ─── Block: Hero ──────────────────────────────────────────────────────────────

function HeroBlock(block: Extract<LayoutBlock, { blockType: 'hero' }>) {
  const { heading, subtext, heroImage, ctaPrimary, ctaSecondary, variant, eyebrowLabel,
    headingAnimation, subtextAnimation, imageAnimation, ctaAnimation, rotatingWords } = block
  const image = imgProps(heroImage)

  const bgStyle: React.CSSProperties =
    variant === 'dark'
      ? { background: 'linear-gradient(135deg, #0C1B2D 0%, #0d2d52 100%)' }
      : variant === 'primary'
      ? { background: 'linear-gradient(135deg, #1B5FAD 0%, #144A8A 100%)' }
      : { background: '#F8F9FA' }

  const isDark = variant !== 'light'
  const textColor = isDark ? '#fff' : '#0F172A'
  const subtextColor = isDark ? 'rgba(255,255,255,0.65)' : '#64748b'

  const words = (rotatingWords ?? []).map((r) => r.word).filter(Boolean) as string[]
  const hasRotating = words.length > 0
  // text-reveal / word-by-word manipulate innerHTML — unsafe when TypewriterSpan is inside h1
  const safeHeadingAnim =
    hasRotating && (headingAnimation === 'text-reveal' || headingAnimation === 'word-by-word')
      ? 'fade-up'
      : headingAnimation

  return (
    <section className="relative flex items-center min-h-[480px]" style={bgStyle}>
      {isDark && (
        <div
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 40%, rgba(0,168,150,0.12) 0%, transparent 65%)' }}
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className={`grid ${image ? 'lg:grid-cols-[1fr_460px]' : ''} gap-12 items-center`}>
          <div>
            {eyebrowLabel && (
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6 ${isDark ? 'bg-white/10 text-accent' : 'bg-accent/10 text-accent'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {eyebrowLabel}
              </div>
            )}
            <h1
              className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-5"
              style={{ color: textColor }}
              {...(safeHeadingAnim && safeHeadingAnim !== 'none' ? { 'data-anim': safeHeadingAnim } : {})}
            >
              {heading}
              {hasRotating && (
                <>
                  {' '}
                  <TypewriterSpan words={words} />
                </>
              )}
            </h1>
            {subtext && (
              <p
                className="text-lg leading-relaxed mb-8 max-w-xl"
                style={{ color: subtextColor }}
                {...(subtextAnimation && subtextAnimation !== 'none' ? { 'data-anim': subtextAnimation } : {})}
              >
                {subtext}
              </p>
            )}
            {(ctaPrimary?.label || ctaSecondary?.label) && (
              <div
                className="flex flex-wrap gap-4"
                {...(ctaAnimation && ctaAnimation !== 'none' ? { 'data-anim': ctaAnimation } : {})}
              >
                {ctaPrimary?.label && (
                  <Link
                    href={ctaPrimary.url ?? '#'}
                    className="btn-shimmer inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    {ctaPrimary.label}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
                {ctaSecondary?.label && (
                  <Link
                    href={ctaSecondary.url ?? '#'}
                    className={`inline-flex items-center gap-2 px-7 py-3.5 border-2 font-semibold rounded-lg transition-colors ${
                      isDark
                        ? 'border-white/30 text-white hover:bg-white/10'
                        : 'border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          {image && (
            <div
              className="hidden lg:block"
              data-parallax="0.15"
              {...(imageAnimation && imageAnimation !== 'none' ? { 'data-anim': imageAnimation } : {})}
            >
              <Image
                {...image}
                className="rounded-2xl object-cover shadow-2xl"
                style={{ width: '100%', height: 'auto' }}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Rich Text Content ─────────────────────────────────────────────────

function ContentBlock(block: Extract<LayoutBlock, { blockType: 'content' }>) {
  const { richText, width, contentAnimation } = block
  const html = renderLexical(richText)
  const maxW = width === 'full' ? 'max-w-7xl' : width === 'narrow' ? 'max-w-2xl' : 'max-w-3xl'

  return (
    <section className="bg-white py-16">
      <div className={`${maxW} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          {...(contentAnimation && contentAnimation !== 'none' ? { 'data-anim': contentAnimation } : {})}
        />
      </div>
    </section>
  )
}

// ─── Block: Stats ─────────────────────────────────────────────────────────────

function StatsBlock(block: Extract<LayoutBlock, { blockType: 'stats' }>) {
  const { heading, stats = [], variant = 'primary', headingAnimation, statsAnimation } = block
  const bgMap: Record<string, string> = {
    primary: '#1B5FAD',
    dark: '#0C1B2D',
    accent: '#00A896',
    surface: '#F8F9FA',
  }
  const bg = bgMap[variant ?? 'primary'] ?? '#1B5FAD'
  const isDark = variant !== 'surface'

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: bg }}>
      {isDark && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <p
            className={`text-center text-sm font-semibold uppercase tracking-widest mb-10 ${isDark ? 'text-white/50' : 'text-muted'}`}
            {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
          >
            {heading}
          </p>
        )}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          {...(statsAnimation && statsAnimation !== 'none' ? { 'data-anim-group': statsAnimation } : {})}
        >
          {(stats ?? []).map((stat, i) => (
            <div
              key={stat.id ?? i}
              className={`text-center py-8 px-6 ${i < (stats?.length ?? 0) - 1 ? 'lg:border-r border-white/10' : ''}`}
            >
              <p className={`text-5xl lg:text-6xl font-bold mb-3 tabular-nums tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}>
                <CountUp end={stat.value} />
              </p>
              <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-white/55' : 'text-muted'}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Services Grid ─────────────────────────────────────────────────────

async function ServicesGridBlock(block: Extract<LayoutBlock, { blockType: 'servicesGrid' }>) {
  const { heading, subheading, filter = 'all', limit = 9, showCTA = true, headingAnimation, cardsAnimation } = block

  const payload = await getPayload({ config: configPromise })
  const where = filter && filter !== 'all' ? { category: { equals: filter } } : undefined
  const result = await payload.find({
    collection: 'services',
    where,
    limit: limit ?? 9,
    sort: 'order',
    depth: 1,
  }).catch(() => ({ docs: [] as Service[] }))

  const services = result.docs

  return (
    <section className="bg-surface-2 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {heading && (
            <>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">What We Do</p>
              <h2
                className="text-3xl lg:text-4xl font-bold text-heading mb-4 tracking-tight"
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            </>
          )}
          {subheading && <p className="text-lg text-muted max-w-2xl mx-auto">{subheading}</p>}
        </div>

        {services.length === 0 ? (
          <p className="text-center text-muted py-10 text-sm">No services found. Add services in the admin panel.</p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            {...(cardsAnimation && cardsAnimation !== 'none' ? { 'data-anim-group': cardsAnimation } : {})}
          >
            {services.map((svc) => {
              const thumb = imgProps(svc.featuredImage)
              return (
                <Link
                  key={svc.id}
                  href={`/capabilities/${svc.slug}`}
                  className="card-glow group flex flex-col bg-white rounded-xl border border-border hover:-translate-y-1.5 hover:border-primary/20 transition-all duration-300 h-full overflow-hidden"
                >
                  {thumb ? (
                    <div className="relative h-40 flex-shrink-0 overflow-hidden">
                      <Image
                        {...thumb}
                        width={undefined as unknown as number}
                        height={undefined as unknown as number}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="p-6 pb-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-primary mb-1"
                        style={{ background: 'linear-gradient(135deg, rgba(27,95,173,0.12) 0%, rgba(0,168,150,0.08) 100%)' }}
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2 block">{svc.category}</span>
                    <h3 className="text-base font-semibold text-heading mb-2 tracking-tight group-hover:text-primary transition-colors">{svc.title}</h3>
                    <p className="text-sm text-muted leading-relaxed flex-1">{svc.excerpt}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary mt-4">
                      Learn more
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {showCTA && (
          <div className="text-center mt-10">
            <Link href="/capabilities" className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-colors text-sm">
              View All Capabilities
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Block: Case Studies ──────────────────────────────────────────────────────

const CS_GRADIENTS = [
  'linear-gradient(135deg, #1B5FAD 0%, #00A896 100%)',
  'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)',
  'linear-gradient(135deg, #00A896 0%, #0C1B2D 100%)',
]

async function CaseStudiesBlock(block: Extract<LayoutBlock, { blockType: 'caseStudies' }>) {
  const { heading, subheading, selectionMode = 'latest', items, limit = 3, showCTA = true, headingAnimation, cardsAnimation } = block

  const payload = await getPayload({ config: configPromise })
  let caseStudies: CaseStudy[] = []

  if (selectionMode === 'manual' && Array.isArray(items) && items.length > 0) {
    caseStudies = items
      .map((item) => (typeof item === 'object' ? (item as CaseStudy) : null))
      .filter(Boolean) as CaseStudy[]
  } else {
    const result = await payload.find({
      collection: 'case-studies',
      limit: limit ?? 3,
      sort: '-publishedDate',
      depth: 1,
    }).catch(() => ({ docs: [] as CaseStudy[] }))
    caseStudies = result.docs
  }

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">Case Studies</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-heading max-w-xl leading-tight tracking-tight"
              {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
            >
              {heading ?? 'We help clients anticipate and act with insight and speed'}
            </h2>
            {subheading && <p className="text-muted mt-3 max-w-xl">{subheading}</p>}
          </div>
          {showCTA && (
            <Link href="/insights/case-studies" className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              See all case studies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {caseStudies.length === 0 ? (
          <p className="text-center text-muted py-10 text-sm">No case studies yet. Add them in the admin panel.</p>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...(cardsAnimation && cardsAnimation !== 'none' ? { 'data-anim-group': cardsAnimation } : {})}
          >
            {caseStudies.map((cs, i) => {
              const thumb = imgProps(cs.featuredImage)
              return (
                <Link key={cs.id} href={`/insights/case-studies/${cs.slug}`} className="card-glow group flex flex-col bg-surface rounded-xl border border-border overflow-hidden hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div className="relative h-44 flex-shrink-0" style={{ background: CS_GRADIENTS[i % 3] }}>
                    {thumb ? (
                      <Image src={thumb.src} alt={thumb.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
                      <span className="text-[11px] font-bold text-white/90 uppercase tracking-widest">{cs.tag ?? 'Case Study'}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-muted mb-3">{cs.publishedDate ? new Date(cs.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}</p>
                    <h3 className="text-sm font-semibold text-heading leading-snug mb-3 group-hover:text-primary transition-colors flex-1 tracking-tight">{cs.title}</h3>
                    {cs.excerpt && <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">{cs.excerpt}</p>}
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                      Read more
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Block: Insights ──────────────────────────────────────────────────────────

const WAVE_H = [30, 58, 44, 72, 38, 62, 50, 78, 42, 66, 34, 74, 56, 46, 68, 40, 60, 52, 76, 36]

async function InsightsBlock(block: Extract<LayoutBlock, { blockType: 'insights' }>) {
  const { heading, subheading, typeFilter = 'all', limit = 3, showCTA = true, headingAnimation, cardsAnimation } = block

  const payload = await getPayload({ config: configPromise })
  const where = typeFilter && typeFilter !== 'all' ? { type: { equals: typeFilter } } : undefined
  const result = await payload.find({
    collection: 'insights',
    where,
    limit: limit ?? 3,
    sort: '-publishedDate',
    depth: 1,
  }).catch(() => ({ docs: [] as Insight[] }))

  const insights = result.docs
  const typeLabel = typeFilter && typeFilter !== 'all'
    ? typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)
    : 'Insights'

  return (
    <section className="bg-surface py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">{typeLabel}</p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-heading tracking-tight"
              {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
            >
              {heading ?? `Latest ${typeLabel}`}
            </h2>
            {subheading && <p className="text-muted mt-3">{subheading}</p>}
          </div>
          {showCTA && (
            <Link href="/insights" className="flex-shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {insights.length === 0 ? (
          <p className="text-center text-muted py-10 text-sm">No insights yet. Add them in the admin panel.</p>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...(cardsAnimation && cardsAnimation !== 'none' ? { 'data-anim-group': cardsAnimation } : {})}
          >
            {insights.map((item) => {
              const thumb = imgProps(item.featuredImage)
              const isPodcast = item.type === 'podcast'
              return (
                <Link
                  key={item.id}
                  href={item.externalUrl ?? `/insights/${item.slug}`}
                  target={item.externalUrl ? '_blank' : undefined}
                  rel={item.externalUrl ? 'noopener noreferrer' : undefined}
                  className="card-glow group flex flex-col bg-white rounded-xl border border-border overflow-hidden hover:-translate-y-1.5 transition-all duration-300 h-full"
                >
                  <div className="relative h-40 flex-shrink-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)' }}>
                    {thumb ? (
                      <Image src={thumb.src} alt={thumb.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : isPodcast ? (
                      <div className="absolute inset-0 flex items-center justify-center gap-[3px] px-8">
                        {WAVE_H.map((h, idx) => (
                          <div key={idx} className="w-1 rounded-full bg-white/20 flex-shrink-0" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    ) : null}
                    {isPodcast && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full border-2 border-accent/60 bg-accent/15 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                          <svg className="w-5 h-5 text-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2.5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{item.type}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-muted mb-2">
                      {new Date(item.publishedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                    <h3 className="text-sm font-semibold text-heading leading-snug mb-3 group-hover:text-primary transition-colors flex-1 tracking-tight">{item.title}</h3>
                    {item.excerpt && <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">{item.excerpt}</p>}
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                      {isPodcast ? 'Listen now' : 'Read more'}
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Block: Clients ───────────────────────────────────────────────────────────

async function ClientsBlock(block: Extract<LayoutBlock, { blockType: 'clients' }>) {
  const { heading, selectionMode = 'featured', items, showCTA = true, headingAnimation } = block

  const payload = await getPayload({ config: configPromise })
  let clients: Client[] = []

  if (selectionMode === 'manual' && Array.isArray(items) && items.length > 0) {
    clients = items
      .map((item) => (typeof item === 'object' ? (item as Client) : null))
      .filter(Boolean) as Client[]
  } else {
    const where = selectionMode === 'featured' ? { featured: { equals: true } } : undefined
    const result = await payload.find({
      collection: 'clients',
      where,
      sort: 'order',
      limit: 30,
      depth: 1,
    }).catch(() => ({ docs: [] as Client[] }))
    clients = result.docs
  }

  return (
    <section className="bg-white py-16 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest text-muted"
          {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
        >
          {heading ?? 'Trusted by leading healthcare companies worldwide'}
        </p>
      </div>

      {clients.length === 0 ? (
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 px-8">
          <p className="text-sm text-muted">No clients found. Add clients in the admin panel.</p>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />
          <div className="flex items-center animate-marquee" style={{ width: 'max-content' }}>
            {[...clients, ...clients].map((client, i) => {
              const logo = imgProps(client.logo)
              return (
                <div key={i} className="mx-10 flex-shrink-0">
                  {logo ? (
                    <Image src={logo.src} alt={client.name} width={140} height={52} className="h-10 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity grayscale hover:grayscale-0" />
                  ) : (
                    <span className="text-base font-semibold whitespace-nowrap" style={{ color: 'rgba(15,23,42,0.32)' }}>{client.name}</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {showCTA && (
        <div className="text-center mt-10">
          <Link href="/about/clients" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5">
            View all clients
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  )
}

// ─── Block: CTA Banner ────────────────────────────────────────────────────────

function CTABannerBlock(block: Extract<LayoutBlock, { blockType: 'ctaBanner' }>) {
  const { heading, subtext, ctaPrimary, ctaSecondary, variant = 'accent', headingAnimation, subtextAnimation, ctaAnimation } = block
  const bgMap: Record<string, string> = { accent: '#00A896', primary: '#1B5FAD', dark: '#0C1B2D' }
  const bg = bgMap[variant ?? 'accent'] ?? '#00A896'

  return (
    <section className="py-16" style={{ background: bg }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight"
          {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
        >
          {heading}
        </h2>
        {subtext && (
          <p
            className="text-lg text-white/75 mb-8 max-w-xl mx-auto"
            {...(subtextAnimation && subtextAnimation !== 'none' ? { 'data-anim': subtextAnimation } : {})}
          >
            {subtext}
          </p>
        )}
        <div
          className="flex flex-wrap justify-center gap-4"
          {...(ctaAnimation && ctaAnimation !== 'none' ? { 'data-anim': ctaAnimation } : {})}
        >
          {ctaPrimary?.label && (
            <Link href={ctaPrimary.url ?? '#'} className="btn-shimmer inline-flex items-center gap-2 px-8 py-3.5 bg-white text-heading hover:bg-white/90 font-semibold rounded-lg transition-colors">
              {ctaPrimary.label}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
          {ctaSecondary?.label && (
            <Link href={ctaSecondary.url ?? '#'} className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/40 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors">
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Two Column ────────────────────────────────────────────────────────

function TwoColumnBlock(block: Extract<LayoutBlock, { blockType: 'twoColumn' }>) {
  const { image, imagePosition = 'right', eyebrow, heading, richText, cta, background = 'white',
    headingAnimation, bodyAnimation, imageAnimation } = block
  const thumb = imgProps(image)
  const html = renderLexical(richText)
  const bg = background === 'surface' ? 'bg-surface' : 'bg-white'
  const isRight = imagePosition === 'right'

  return (
    <section className={`${bg} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isRight ? 'direction-rtl' : ''}`}>
          <div className={isRight ? '' : 'lg:order-2'}>
            {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{eyebrow}</p>}
            {heading && (
              <h2
                className="text-3xl lg:text-4xl font-bold text-heading mb-5 leading-tight tracking-tight"
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {html && (
              <div
                className="text-muted leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: html }}
                {...(bodyAnimation && bodyAnimation !== 'none' ? { 'data-anim': bodyAnimation } : {})}
              />
            )}
            {cta?.label && (
              <Link href={cta.url ?? '#'} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                {cta.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
          <div
            className={isRight ? '' : 'lg:order-1'}
            {...(imageAnimation && imageAnimation !== 'none' ? { 'data-anim': imageAnimation } : {})}
          >
            {thumb ? (
              <div className="rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  {...thumb}
                  className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  style={{ height: 'auto' }}
                />
              </div>
            ) : (
              <div className="h-64 rounded-2xl bg-surface border border-border flex items-center justify-center text-muted text-sm">
                Upload an image in the admin panel
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Block: Team Grid ─────────────────────────────────────────────────────────

function TeamGridBlock(block: Extract<LayoutBlock, { blockType: 'teamGrid' }>) {
  const { heading, subheading, members = [], headingAnimation, membersAnimation } = block
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Our Team</p>
          {heading && (
            <h2
              className="text-3xl lg:text-4xl font-bold text-heading tracking-tight"
              {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
            >
              {heading}
            </h2>
          )}
          {subheading && <p className="text-lg text-muted max-w-2xl mx-auto mt-3">{subheading}</p>}
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          {...(membersAnimation && membersAnimation !== 'none' ? { 'data-anim-group': membersAnimation } : {})}
        >
          {(members ?? []).map((member, i) => {
            const photo = imgProps(member.photo)
            return (
              <div key={member.id ?? i} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  {photo ? (
                    <Image
                      {...photo}
                      width={96}
                      height={96}
                      className="rounded-full object-cover border-2 border-border"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-base font-semibold text-heading tracking-tight">{member.name}</h3>
                <p className="text-sm text-accent font-medium mt-0.5">{member.title}</p>
                {member.bio && <p className="text-xs text-muted leading-relaxed mt-2">{member.bio}</p>}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                    LinkedIn
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Accordion ─────────────────────────────────────────────────────────

function AccordionBlock(block: Extract<LayoutBlock, { blockType: 'accordion' }>) {
  const { heading, items = [], headingAnimation, itemsAnimation } = block
  const clientItems = (items ?? []).map((item) => ({
    question: item.question,
    answerHtml: renderLexical(item.answer),
  }))

  return (
    <section className="bg-surface py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">FAQ</p>
            <h2
              className="text-3xl font-bold text-heading tracking-tight"
              {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
            >
              {heading}
            </h2>
          </div>
        )}
        <div {...(itemsAnimation && itemsAnimation !== 'none' ? { 'data-anim-group': itemsAnimation } : {})}>
          <AccordionClient items={clientItems} />
        </div>
      </div>
    </section>
  )
}

// ─── Helpers for new blocks ───────────────────────────────────────────────────

function getEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return url
}

// ─── Block: Timeline ─────────────────────────────────────────────────────────

function TimelineBlock(block: Extract<LayoutBlock, { blockType: 'timeline' }>) {
  const { heading, subheading, items = [], variant = 'surface', headingAnimation, itemsAnimation } = block
  const isDark = variant === 'dark'
  const bgMap: Record<string, string> = { surface: '#F8F9FA', white: '#ffffff', dark: '#0C1B2D' }

  return (
    <section className="py-20" style={{ background: bgMap[variant ?? 'surface'] ?? '#F8F9FA' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="text-center mb-14">
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-muted'}`}>{subheading}</p>
            )}
          </div>
        )}

        <div
          className="relative pl-10"
          {...(itemsAnimation && itemsAnimation !== 'none' ? { 'data-anim-group': itemsAnimation } : {})}
        >
          {/* Animated vertical line — drawn by GSAP scrollTrigger scrub */}
          <div
            className="timeline-line absolute left-0 top-0 bottom-0 w-0.5"
            style={{ background: 'rgba(0,168,150,0.25)' }}
          />

          {(items ?? []).map((item, i) => (
            <div key={item.id ?? i} className={`relative ${i < (items?.length ?? 0) - 1 ? 'pb-10' : ''}`}>
              <div className="absolute -left-[49px] flex items-center gap-3">
                <div className="dot-pulse w-5 h-5 rounded-full bg-accent border-2 border-white shadow flex-shrink-0" />
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    isDark ? 'bg-white/10 text-accent' : 'bg-accent/10 text-accent'
                  }`}
                >
                  {item.year}
                </span>
              </div>

              <div
                className={`ml-2 p-5 rounded-xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-border'
                } shadow-sm`}
              >
                <h3 className={`text-base font-semibold tracking-tight mb-1 ${isDark ? 'text-white' : 'text-heading'}`}>
                  {item.title}
                </h3>
                {item.description && (
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-white/60' : 'text-muted'}`}>
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Testimonials ──────────────────────────────────────────────────────

function TestimonialsBlock(block: Extract<LayoutBlock, { blockType: 'testimonials' }>) {
  const { heading, subheading, items = [], variant = 'surface', headingAnimation, cardsAnimation } = block
  const isDark = variant === 'dark' || variant === 'primary'
  const bgMap: Record<string, string> = {
    surface: '#F8F9FA', white: '#ffffff', dark: '#0C1B2D', primary: '#1B5FAD',
  }

  return (
    <section className="py-20" style={{ background: bgMap[variant ?? 'surface'] ?? '#F8F9FA' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-muted'}`}>{subheading}</p>
            )}
          </div>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          {...(cardsAnimation && cardsAnimation !== 'none' ? { 'data-anim-group': cardsAnimation } : {})}
        >
          {(items ?? []).map((item, i) => {
            const photo = imgProps(item.photo)
            return (
              <div
                key={item.id ?? i}
                className={`flex flex-col p-7 rounded-2xl border shadow-sm ${
                  isDark
                    ? 'bg-white/10 border-white/10'
                    : 'card-glow bg-white border-border'
                }`}
              >
                <svg className="w-8 h-8 text-accent opacity-50 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                <p className={`text-sm leading-relaxed flex-1 mb-6 ${isDark ? 'text-white/80' : 'text-body'}`}>
                  {item.quote}
                </p>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E2E8F0' }}>
                  {photo ? (
                    <Image
                      src={photo.src}
                      alt={item.authorName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-accent">{item.authorName.charAt(0)}</span>
                    </div>
                  )}
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-heading'}`}>{item.authorName}</p>
                    {(item.authorTitle || item.authorCompany) && (
                      <p className={`text-xs ${isDark ? 'text-white/50' : 'text-muted'}`}>
                        {[item.authorTitle, item.authorCompany].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Video Embed ───────────────────────────────────────────────────────

function VideoBlock(block: Extract<LayoutBlock, { blockType: 'video' }>) {
  const { heading, subheading, videoUrl, posterImage, caption, variant = 'white', headingAnimation, videoAnimation } = block
  const isDark = variant === 'dark'
  const bgMap: Record<string, string> = { white: '#ffffff', surface: '#F8F9FA', dark: '#0C1B2D' }
  const poster = imgProps(posterImage)
  const embedUrl = getEmbedUrl(videoUrl ?? '')

  return (
    <section className="py-20" style={{ background: bgMap[variant ?? 'white'] ?? '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="text-center mb-10">
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-muted'}`}>{subheading}</p>
            )}
          </div>
        )}

        <div {...(videoAnimation && videoAnimation !== 'none' ? { 'data-anim': videoAnimation } : {})}>
          <VideoEmbed embedUrl={embedUrl} posterSrc={poster?.src} posterAlt={poster?.alt} />
          {caption && (
            <p className={`text-center text-sm mt-4 ${isDark ? 'text-white/50' : 'text-muted'}`}>{caption}</p>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Block: Contact Form ──────────────────────────────────────────────────────

function ContactFormBlock(block: Extract<LayoutBlock, { blockType: 'contactForm' }>) {
  const {
    heading,
    subheading,
    submitLabel = 'Send Message',
    successMessage = "Thank you! We'll be in touch shortly.",
    variant = 'surface',
    headingAnimation,
  } = block
  const bg = variant === 'white' ? 'bg-white' : 'bg-surface'

  return (
    <section className={`${bg} py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Contact</p>
            {heading && (
              <h2
                className="text-3xl lg:text-4xl font-bold text-heading tracking-tight mb-4 leading-tight"
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && <p className="text-muted leading-relaxed">{subheading}</p>}
          </div>

          <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
            <ContactFormClient
              submitLabel={submitLabel ?? 'Send Message'}
              successMessage={successMessage ?? "Thank you! We'll be in touch shortly."}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Block: Feature Scroll ───────────────────────────────────────────────────

function FeatureScrollBlock(block: Extract<LayoutBlock, { blockType: 'featureScroll' }>) {
  const { eyebrow, heading, subheading, items = [], stickyImage, imagePosition = 'right', variant = 'white', headingAnimation } = block
  const isDark = variant === 'dark'
  const bgMap: Record<string, string> = { white: '#ffffff', surface: '#F8F9FA', dark: '#0C1B2D' }

  const defaultImg = imgProps(stickyImage)
  const clientItems = (items ?? []).map((item) => {
    const itemImg = imgProps(item.image)
    return {
      id: item.id,
      title: item.title,
      description: item.description ?? '',
      icon: item.icon ?? null,
      imageSrc: itemImg?.src ?? null,
      imageAlt: itemImg?.alt ?? '',
    }
  })

  return (
    <section className="py-20" style={{ background: bgMap[variant ?? 'white'] ?? '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading || subheading) && (
          <div className="text-center mb-16">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{eyebrow}</p>
            )}
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-muted'}`}>
                {subheading}
              </p>
            )}
          </div>
        )}
        <FeatureScrollClient
          items={clientItems}
          defaultImageSrc={defaultImg?.src ?? null}
          defaultImageAlt={defaultImg?.alt ?? ''}
          imagePosition={imagePosition ?? 'right'}
          isDark={isDark}
        />
      </div>
    </section>
  )
}

// ─── Block: Metrics Bar ───────────────────────────────────────────────────────

function MetricsBarBlock(block: Extract<LayoutBlock, { blockType: 'metricsBar' }>) {
  const { heading, subheading, items = [], layout = 'bars', variant = 'white', headingAnimation } = block
  const isDark = variant === 'dark' || variant === 'primary'
  const bgMap: Record<string, string> = { white: '#ffffff', surface: '#F8F9FA', dark: '#0C1B2D', primary: '#1B5FAD' }

  const clientItems = (items ?? []).map((item) => ({
    label: item.label,
    percentage: item.percentage ?? 0,
    description: item.description ?? null,
    color: item.color ?? 'accent',
  }))

  return (
    <section className="py-20" style={{ background: bgMap[variant ?? 'white'] ?? '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className={`mb-14 ${layout === 'rings' ? 'text-center' : ''}`}>
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight mb-3 ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className={`text-lg ${isDark ? 'text-white/60' : 'text-muted'} ${layout === 'rings' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
                {subheading}
              </p>
            )}
          </div>
        )}
        <MetricsBarClient
          items={clientItems}
          layout={layout ?? 'bars'}
          isDark={isDark}
        />
      </div>
    </section>
  )
}

// ─── Main Block Renderer ──────────────────────────────────────────────────────

export async function BlockRenderer({ block }: { block: LayoutBlock }) {
  switch (block.blockType) {
    case 'hero':        return <HeroBlock {...block} />
    case 'content':     return <ContentBlock {...block} />
    case 'stats':       return <StatsBlock {...block} />
    case 'servicesGrid':return <ServicesGridBlock {...block} />
    case 'caseStudies': return <CaseStudiesBlock {...block} />
    case 'insights':    return <InsightsBlock {...block} />
    case 'clients':     return <ClientsBlock {...block} />
    case 'ctaBanner':   return <CTABannerBlock {...block} />
    case 'twoColumn':   return <TwoColumnBlock {...block} />
    case 'teamGrid':    return <TeamGridBlock {...block} />
    case 'accordion':   return <AccordionBlock    {...block} />
    case 'timeline':    return <TimelineBlock     {...block} />
    case 'testimonials':return <TestimonialsBlock  {...block} />
    case 'video':       return <VideoBlock         {...block} />
    case 'contactForm':    return <ContactFormBlock    {...block} />
    case 'featureScroll':  return <FeatureScrollBlock  {...block} />
    case 'metricsBar':     return <MetricsBarBlock      {...block} />
    case 'ticker':         return <TickerBlockComponent {...block} />
    case 'bento':          return <BentoBlock {...block} />
    case 'carousel':       return <CarouselBlock {...block} />
    case 'newsList':       return <NewsListBlock {...block} />
    case 'introVideo':     return <IntroVideoBlock {...block} />
    case 'bandWithImage':  return <BandWithImageBlock {...block} />
    default:               return null
  }
}
