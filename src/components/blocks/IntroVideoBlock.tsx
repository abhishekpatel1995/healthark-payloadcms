import React from 'react'
import type { Page } from '@/payload-types'
import { VideoEmbed } from './VideoEmbed'
import { getEmbedUrl, imgProps, sectionBg } from './blockUtils'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'introVideo' }>

export function IntroVideoBlock(block: Props) {
  const { eyebrow, heading, text, videoUrl, posterImage, videoSide = 'right', variant = 'white', headingAnimation, videoAnimation } = block
  const isDark = variant === 'dark'
  const poster = imgProps(posterImage)

  return (
    <section className="py-20" style={{ background: sectionBg[variant ?? 'white'] }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className={videoSide === 'left' ? 'lg:order-2' : ''}>
          {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">{eyebrow}</p>}
          <h2
            className={`text-3xl lg:text-5xl font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-heading'}`}
            {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
          >
            {heading}
          </h2>
          {text && <p className={`mt-5 text-lg leading-relaxed ${isDark ? 'text-white/65' : 'text-muted'}`}>{text}</p>}
        </div>
        <div {...(videoAnimation && videoAnimation !== 'none' ? { 'data-anim': videoAnimation } : {})}>
          <VideoEmbed embedUrl={getEmbedUrl(videoUrl ?? '')} posterSrc={poster?.src} posterAlt={poster?.alt} />
        </div>
      </div>
    </section>
  )
}
