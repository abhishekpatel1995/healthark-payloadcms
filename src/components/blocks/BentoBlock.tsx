import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { imgProps, sectionBg, hoverClasses } from './blockUtils'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'bento' }>

const SPAN: Record<string, string> = {
  large: 'md:col-span-2 md:row-span-2 min-h-[320px] md:min-h-[460px]',
  wide: 'md:col-span-2 min-h-[220px]',
  small: 'min-h-[220px]',
}

export function BentoBlock(block: Props) {
  const { heading, subheading, items, hoverEffect, variant = 'white', headingAnimation, cardsAnimation } = block
  const isDark = variant === 'dark'
  const hv = hoverClasses(hoverEffect)

  return (
    <section className="py-20" style={{ background: sectionBg[variant ?? 'white'] }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-10 max-w-3xl">
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
            {subheading && <p className={`mt-3 ${isDark ? 'text-white/60' : 'text-muted'}`}>{subheading}</p>}
          </div>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[220px]"
          {...(cardsAnimation && cardsAnimation !== 'none' ? { 'data-anim-group': cardsAnimation } : {})}
        >
          {(items ?? []).map((item, i) => {
            const img = imgProps(item.image)
            const card = (
              <>
                {img ? (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-500 ${hv.img}`}
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)' }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  {item.label && (
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 mb-2">{item.label}</p>
                  )}
                  <h3 className="text-white font-bold leading-snug text-lg lg:text-xl flex items-end gap-2">
                    <span>{item.title}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </h3>
                </div>
              </>
            )
            const cls = `group relative block overflow-hidden rounded-2xl transition-all duration-300 ${hv.card} ${SPAN[item.size ?? 'small'] ?? SPAN.small}`
            return item.link ? (
              <Link key={item.id ?? i} href={item.link} className={cls}>
                {card}
              </Link>
            ) : (
              <div key={item.id ?? i} className={cls}>
                {card}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
