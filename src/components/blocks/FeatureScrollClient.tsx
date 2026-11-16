'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface FeatureItem {
  id?: string | null
  title: string
  description: string
  icon?: string | null
  imageSrc?: string | null
  imageAlt?: string
}

interface FeatureScrollClientProps {
  items: FeatureItem[]
  defaultImageSrc?: string | null
  defaultImageAlt?: string
  imagePosition: 'right' | 'left'
  isDark: boolean
}

export function FeatureScrollClient({
  items,
  defaultImageSrc,
  defaultImageAlt,
  imagePosition,
  isDark,
}: FeatureScrollClientProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry?.isIntersecting) setActiveIndex(i) },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  // Resolve each step's image — fall back to the default if no step image
  const resolvedImages = items.map((item) => ({
    src: item.imageSrc ?? defaultImageSrc ?? null,
    alt: item.imageSrc ? (item.imageAlt ?? '') : (defaultImageAlt ?? ''),
  }))

  const hasAnyImage = resolvedImages.some((img) => img.src)

  const imagePanel = (
    <div className="hidden lg:block lg:sticky lg:top-28 self-start">
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: 'min(540px, 58vh)', background: 'linear-gradient(135deg, #1B5FAD 0%, #00A896 100%)' }}
      >
        {hasAnyImage &&
          resolvedImages.map((img, i) =>
            img.src ? (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            ) : null,
          )}

        {/* Dot-grid texture fallback overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1.5px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div
            className="h-full bg-white/80 transition-all duration-500 ease-out"
            style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step dots */}
      <div className="flex gap-2 mt-4 justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveIndex(i)
              itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-8 bg-accent' : 'w-2 bg-border hover:bg-muted'
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )

  const featuresPanel = (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isActive = i === activeIndex
        return (
          <div
            key={item.id ?? i}
            ref={(el) => { itemRefs.current[i] = el }}
            className={`min-h-[180px] py-8 px-7 rounded-2xl border transition-all duration-500 cursor-default ${
              isActive
                ? isDark
                  ? 'bg-white/10 border-white/15 shadow-lg'
                  : 'bg-white border-accent/25 shadow-lg'
                : isDark
                ? 'border-transparent opacity-40'
                : 'border-transparent opacity-40'
            }`}
          >
            {item.icon && (
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 text-lg font-bold transition-colors duration-300 ${
                  isActive ? 'bg-accent/10 text-accent' : isDark ? 'text-white/40' : 'text-muted'
                }`}
              >
                {item.icon}
              </div>
            )}
            <h3
              className={`text-xl font-bold tracking-tight mb-3 transition-colors duration-300 ${
                isDark
                  ? isActive ? 'text-white' : 'text-white/50'
                  : isActive ? 'text-heading' : 'text-heading'
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-white/60' : 'text-muted'
              }`}
            >
              {item.description}
            </p>

            {/* Mobile inline image */}
            {item.imageSrc && (
              <div className="lg:hidden mt-5 rounded-xl overflow-hidden relative" style={{ height: 200 }}>
                <Image src={item.imageSrc} alt={item.imageAlt ?? ''} fill sizes="100vw" className="object-cover" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-start">
      {imagePosition === 'right' ? (
        <>
          <div>{featuresPanel}</div>
          {imagePanel}
        </>
      ) : (
        <>
          {imagePanel}
          <div>{featuresPanel}</div>
        </>
      )}
    </div>
  )
}
