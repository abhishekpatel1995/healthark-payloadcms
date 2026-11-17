import React from 'react'
import type { Page } from '@/payload-types'
import { CarouselClient } from './CarouselClient'
import { imgProps, sectionBg, hoverClasses } from './blockUtils'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'carousel' }>

export function CarouselBlock(block: Props) {
  const { eyebrow, heading, slides, autoplay, intervalSeconds, hoverEffect, variant = 'white', headingAnimation } = block
  const isDark = variant === 'dark'

  return (
    <section className="py-20" style={{ background: sectionBg[variant ?? 'white'] }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading) && (
          <div className="mb-10">
            {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-2">{eyebrow}</p>}
            {heading && (
              <h2
                className={`text-3xl lg:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-heading'}`}
                {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
              >
                {heading}
              </h2>
            )}
          </div>
        )}
        <CarouselClient
          slides={(slides ?? []).map((s) => ({
            id: s.id,
            title: s.title,
            text: s.text,
            linkLabel: s.linkLabel,
            linkUrl: s.linkUrl,
            img: imgProps(s.image),
          }))}
          autoplay={autoplay ?? true}
          intervalSeconds={intervalSeconds ?? 6}
          imgHoverClass={hoverClasses(hoverEffect).img}
          dark={isDark}
        />
      </div>
    </section>
  )
}
