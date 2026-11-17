'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export type CarouselSlide = {
  id?: string | null
  title: string
  text?: string | null
  linkLabel?: string | null
  linkUrl?: string | null
  img?: { src: string; width: number; height: number; alt: string } | null
}

type Props = {
  slides: CarouselSlide[]
  autoplay?: boolean
  intervalSeconds?: number
  imgHoverClass?: string
  dark?: boolean
}

export function CarouselClient({ slides, autoplay = true, intervalSeconds = 6, imgHoverClass = '', dark = false }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = slides.length
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (!autoplay || paused || count < 2) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), Math.max(2, intervalSeconds) * 1000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [autoplay, paused, count, intervalSeconds])

  if (count === 0) return null

  const text = dark ? 'text-white' : 'text-heading'
  const sub = dark ? 'text-white/65' : 'text-muted'

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={s.id ?? i}
              className="w-full flex-shrink-0 grid md:grid-cols-2 gap-6 md:gap-10 items-center"
              aria-hidden={i !== index}
            >
              <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-200">
                {s.img ? (
                  <Image
                    src={s.img.src}
                    alt={s.img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-500 ${imgHoverClass}`}
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0C1B2D 0%, #1B5FAD 100%)' }} />
                )}
              </div>
              <div className="py-2 md:py-6">
                <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight leading-tight ${text}`}>{s.title}</h3>
                {s.text && <p className={`mt-4 leading-relaxed ${sub}`}>{s.text}</p>}
                {s.linkUrl && (
                  <Link
                    href={s.linkUrl}
                    tabIndex={i === index ? 0 : -1}
                    className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    {s.linkLabel || 'Read more'} <span aria-hidden>→</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-9 min-w-9 px-3 rounded-full text-sm font-semibold transition-colors ${
                  i === index
                    ? 'bg-primary text-white'
                    : dark
                    ? 'bg-white/10 text-white/70 hover:bg-white/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(index - 1)}
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors ${dark ? 'border-white/25 text-white hover:bg-white/10' : 'border-border text-heading hover:bg-slate-50'}`}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(index + 1)}
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors ${dark ? 'border-white/25 text-white hover:bg-white/10' : 'border-border text-heading hover:bg-slate-50'}`}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
