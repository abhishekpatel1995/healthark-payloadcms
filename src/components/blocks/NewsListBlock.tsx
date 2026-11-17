import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Page, Insight } from '@/payload-types'
import { sectionBg } from './blockUtils'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'newsList' }>

function fmtDate(d?: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function typeLabel(t?: string | null) {
  if (!t) return ''
  return t.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

export async function NewsListBlock(block: Props) {
  const {
    heading, subheading, typeFilter = 'all', limit = 4, showFeatured = true,
    viewAllLabel, viewAllUrl, variant = 'surface', headingAnimation, itemsAnimation,
  } = block
  const isDark = variant === 'dark'

  const payload = await getPayload({ config: configPromise })
  const where = typeFilter && typeFilter !== 'all' ? { type: { equals: typeFilter } } : undefined
  const result = await payload
    .find({ collection: 'insights', where, limit: limit ?? 4, sort: '-publishedDate', depth: 0 })
    .catch(() => ({ docs: [] as Insight[] }))
  const items = result.docs

  const hrefFor = (i: Insight) => i.externalUrl ?? `/insights/${i.slug}`
  const [first, ...rest] = items
  const featured = showFeatured && first ? first : null
  const list = featured ? rest : items

  const textMain = isDark ? 'text-white' : 'text-heading'
  const textSub = isDark ? 'text-white/60' : 'text-muted'
  const line = isDark ? 'border-white/15' : 'border-border'

  return (
    <section className="py-20" style={{ background: sectionBg[variant ?? 'surface'] }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight ${textMain}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && <p className={`mt-3 ${textSub}`}>{subheading}</p>}
          </div>
          {viewAllUrl && (
            <Link href={viewAllUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              {viewAllLabel || 'See all'} <span aria-hidden>→</span>
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <p className={`text-sm py-10 text-center ${textSub}`}>No items yet. Add some under Insights in the admin.</p>
        ) : (
          <div
            className={featured ? 'grid lg:grid-cols-5 gap-8' : ''}
            {...(itemsAnimation && itemsAnimation !== 'none' ? { 'data-anim-group': itemsAnimation } : {})}
          >
            {featured && (
              <Link
                href={hrefFor(featured)}
                className="group lg:col-span-3 rounded-2xl p-8 lg:p-10 text-white flex flex-col justify-end min-h-[280px] transition-transform duration-300 hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)' }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
                  {typeLabel(featured.type)} · {fmtDate(featured.publishedDate)}
                </p>
                <h3 className="mt-3 text-2xl lg:text-3xl font-bold leading-snug">{featured.title}</h3>
                {featured.excerpt && <p className="mt-3 text-white/70 line-clamp-3">{featured.excerpt}</p>}
                <span className="mt-5 text-sm font-semibold">Read more →</span>
              </Link>
            )}

            <ul className={featured ? 'lg:col-span-2' : 'max-w-4xl'}>
              {list.map((it) => (
                <li key={it.id} className={`border-b ${line} first:border-t`}>
                  <Link href={hrefFor(it)} className="group block py-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                      {typeLabel(it.type)} <span className={textSub}>· {fmtDate(it.publishedDate)}</span>
                    </p>
                    <p className={`mt-2 font-semibold leading-snug transition-colors group-hover:text-primary ${textMain}`}>
                      {it.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
