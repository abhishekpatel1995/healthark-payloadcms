'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type AwardItem = {
  id: string
  title: string
  detail?: string | null
  linkLabel?: string | null
  linkUrl?: string | null
  color: string
  position: string
}

// Card width and height per size setting.
const SIZES: Record<string, { w: number; h: number }> = {
  small: { w: 280, h: 260 },
  medium: { w: 340, h: 300 },
  large: { w: 420, h: 360 },
}

// Desktop horizontal position of a card. --cw is the card width.
function leftFor(position: string, index: number): string {
  if (position === 'left') return '4%'
  if (position === 'center') return 'calc(50% - var(--cw) / 2)'
  if (position === 'right') return 'calc(96% - var(--cw))'
  // Keep automatic positions inside the screen on narrower tablets.
  return `min(${LEFTS[index % LEFTS.length]}, calc(100% - var(--cw) - 16px))`
}

const GRID_COLS: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const COLORS: Record<string, string> = {
  blue: '#0a3cff',
  red: '#cf0a3b',
  purple: '#46006f',
  teal: '#00796b',
  navy: '#1B5FAD',
}

// Horizontal positions of the cards on desktop, repeated if there are more cards.
const LEFTS = ['6%', '36%', '64%', '20%', '50%', '74%', '12%', '58%']

// Thin decorative lines, like the card artwork on the reference site.
function Pattern() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
      viewBox="0 0 320 300"
      preserveAspectRatio="none"
      fill="none"
      stroke="white"
      strokeWidth="1"
    >
      <circle cx="120" cy="100" r="54" />
      <path d="M0 70 L190 120 L320 60" />
      <path d="M200 0 C250 60 300 120 296 300" />
      <path d="M60 300 C90 220 190 210 250 240" />
    </svg>
  )
}

export function AwardsClient({
  heading,
  items,
  background,
  isDark,
  cardSize,
  columns,
  respectReducedMotion,
}: {
  heading: string
  items: AwardItem[]
  background: string
  isDark: boolean
  cardSize: string
  columns: string
  respectReducedMotion: boolean
}) {
  const size = SIZES[cardSize] ?? SIZES.medium
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  // 'stack' = simple grid (mobile, reduced motion, before hydration); 'scroll' = pinned desktop animation.
  const [mode, setMode] = useState<'stack' | 'scroll'>('stack')

  useEffect(() => {
    const mq = window.matchMedia(
      respectReducedMotion
        ? '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
        : '(min-width: 768px)',
    )
    const update = () => setMode(mq.matches ? 'scroll' : 'stack')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [respectReducedMotion])

  useEffect(() => {
    if (mode !== 'scroll') return
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return
    const cards = cardRefs.current.filter(Boolean) as HTMLLIElement[]
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'none' } })
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: () => stage.clientHeight + 40 },
          { y: () => -(card.offsetHeight + 40), duration: 1 },
          i * 0.4,
        )
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(tl.duration() * window.innerHeight * 0.9)}`,
        pin: stage,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
      })
    }, section)

    return () => ctx.revert()
  }, [mode, items.length])

  const isScroll = mode === 'scroll'
  const headingColor = isDark ? 'text-white' : 'text-heading'

  return (
    <section ref={sectionRef} style={{ background }} className="relative">
      <div
        ref={stageRef}
        className={isScroll ? 'relative h-screen overflow-hidden' : 'relative px-4 sm:px-6 lg:px-8 py-16'}
        style={{ background, ['--cw' as string]: `${size.w}px` }}
      >
        <h2
          className={`${headingColor} font-bold tracking-tight text-center ${
            isScroll
              ? 'absolute inset-0 z-0 flex items-center justify-center px-8 text-6xl xl:text-8xl leading-[1.05]'
              : 'mb-10 text-4xl sm:text-5xl'
          }`}
        >
          <span className="max-w-5xl">{heading}</span>
        </h2>

        <ul
          className={
            isScroll
              ? 'absolute inset-0 z-10 list-none'
              : `relative z-10 mx-auto grid max-w-7xl gap-6 list-none ${GRID_COLS[columns] ?? GRID_COLS['3']}`
          }
        >
          {items.map((it, i) => (
            <li
              key={it.id}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              tabIndex={0}
              className="group relative overflow-hidden text-white outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{
                background: COLORS[it.color] ?? COLORS.blue,
                height: size.h,
                ...(isScroll
                  ? { position: 'absolute', top: 0, left: leftFor(it.position, i), width: size.w }
                  : {}),
              }}
            >
              <Pattern />

              {/* Title: sits at the bottom, moves to the top on hover/focus, and back when the pointer leaves. */}
              <h3 style={{ color: '#fff' }} className="absolute inset-x-0 top-[calc(100%-5rem)] z-10 px-6 font-serif text-xl leading-snug transition-[top] duration-500 ease-out group-hover:top-6 group-focus-within:top-6">
                {it.title}
              </h3>

              {/* Detail: fades and slides in while the title moves up. */}
              {(it.detail || it.linkUrl) && (
                <div className="absolute inset-x-0 bottom-0 top-20 z-0 flex flex-col justify-between px-6 pb-5 opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <p className="text-sm leading-relaxed text-white/90">{it.detail}</p>
                  {it.linkUrl && (
                    <Link href={it.linkUrl} className="self-end text-sm font-semibold hover:underline">
                      {it.linkLabel || 'See related awards'} <span aria-hidden>›</span>
                    </Link>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
