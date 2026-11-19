import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Page } from '@/payload-types'
import { imgProps } from './blockUtils'

type Props = Extract<NonNullable<Page['layout']>[number], { blockType: 'bandWithImage' }>

const BAND: Record<string, string> = {
  ocean: '#0E7AA8',
  brand: '#1B5FAD',
  navy: '#0C1B2D',
  teal: '#00A896',
}

const BTN: Record<string, React.CSSProperties> = {
  red: { background: '#A63F47', color: '#fff' },
  white: { background: '#fff', color: '#0C1B2D' },
  teal: { background: '#00A896', color: '#fff' },
  navy: { background: '#0C1B2D', color: '#fff' },
}

export function BandWithImageBlock(block: Props) {
  const { eyebrow, heading, text, button, image, imagePosition = 'right', bandColor = 'ocean', headingAnimation, imageAnimation } = block
  const img = imgProps(image)
  const imageLeft = imagePosition === 'left'

  return (
    // The section's vertical padding gives the image room to stick out of the band (lg:-my-14 matches lg:py-14).
    <section className="bg-white py-10 lg:py-14">
      <div style={{ background: BAND[bandColor ?? 'ocean'] ?? BAND.ocean }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-stretch">
          <div className={`py-12 lg:py-16 flex flex-col lg:justify-center items-start ${imageLeft ? 'lg:order-2' : ''}`}>
            {eyebrow && <p className="text-sm font-semibold text-white mb-3">{eyebrow}</p>}
            <h2
              className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-5"
              {...(headingAnimation && headingAnimation !== 'none' ? { 'data-anim': headingAnimation } : {})}
            >
              {heading}
            </h2>
            {text && <p className="text-white/85 leading-relaxed mb-7 max-w-xl">{text}</p>}
            {button?.label && (
              <Link
                href={button.url || '#'}
                className="inline-flex items-center rounded-md px-7 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={BTN[button.style ?? 'red'] ?? BTN.red}
              >
                {button.label}
              </Link>
            )}
          </div>

          <div
            className={`pb-10 lg:pb-0 ${imageLeft ? 'lg:order-1' : ''}`}
            {...(imageAnimation && imageAnimation !== 'none' ? { 'data-anim': imageAnimation } : {})}
          >
            {/* On desktop the image is positioned against the band and extends 56px (-14) above and below it. */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[300px]">
              <div className="absolute inset-0 lg:-top-14 lg:-bottom-14 overflow-hidden rounded-3xl shadow-xl bg-white/10">
              {img && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
