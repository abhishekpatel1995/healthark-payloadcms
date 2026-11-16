'use client'
import React from 'react'
import Marquee from 'react-fast-marquee'

interface TickerItem {
  text: string
  emoji?: string | null
  type?: 'default' | 'person' | 'company' | 'achievement' | null
  id?: string | null
}

interface TickerBlockProps {
  eyebrow?: string | null
  heading?: string | null
  rows?: 'one' | 'two' | null
  speed?: number | null
  direction?: 'left' | 'right' | null
  pauseOnHover?: boolean | null
  separator?: string | null
  variant?: 'white' | 'surface' | 'dark' | 'primary' | null
  items?: TickerItem[] | null
}

const BG_MAP: Record<string, string> = {
  white:   '#ffffff',
  surface: '#F8F9FA',
  dark:    '#0C1B2D',
  primary: '#1B5FAD',
}

const GRADIENT_MAP: Record<string, string> = {
  white:   '#ffffff',
  surface: '#F8F9FA',
  dark:    '#0C1B2D',
  primary: '#1B5FAD',
}

const TYPE_PILL: Record<string, { bg: string; color: string }> = {
  person:      { bg: 'rgba(27,95,173,0.13)',  color: '#1B5FAD' },
  company:     { bg: 'rgba(0,168,150,0.13)',  color: '#007D72' },
  achievement: { bg: 'rgba(234,179,8,0.13)',  color: '#92400E' },
  default:     { bg: 'transparent',           color: 'inherit' },
}

export function TickerBlock({
  eyebrow,
  heading,
  rows = 'one',
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  separator = '•',
  variant = 'surface',
  items,
}: TickerBlockProps) {
  if (!items?.length) return null

  const isDark    = variant === 'dark'
  const isPrimary = variant === 'primary'
  const bg        = BG_MAP[variant ?? 'surface']!
  const gradColor = GRADIENT_MAP[variant ?? 'surface']!
  const dir1      = (direction ?? 'left') as 'left' | 'right'
  const dir2      = dir1 === 'left' ? 'right' : 'left'
  const sep       = separator ?? '•'
  const pxSpeed   = speed ?? 50

  const textColor = isDark || isPrimary ? 'rgba(255,255,255,0.85)' : '#334155'
  const sepColor  = isDark || isPrimary ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)'

  const renderItems = () =>
    items.map((item, i) => {
      const pill     = TYPE_PILL[item.type ?? 'default'] ?? TYPE_PILL['default']!
      const hasStyle = (item.type ?? 'default') !== 'default'
      return (
        <span key={i} className="inline-flex items-center">
          <span
            className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold select-none"
            style={
              hasStyle
                ? { background: pill.bg, color: pill.color, padding: '5px 14px', borderRadius: 9999 }
                : { color: textColor }
            }
          >
            {item.emoji && (
              <span aria-hidden className="text-base leading-none">{item.emoji}</span>
            )}
            {item.text}
          </span>
          <span
            aria-hidden
            className="select-none"
            style={{ color: sepColor, padding: '0 20px', fontSize: '10px' }}
          >
            {sep}
          </span>
        </span>
      )
    })

  const marqueeRow = (dir: 'left' | 'right', opacity = 1) => (
    <div style={opacity < 1 ? { opacity } : undefined}>
      <Marquee
        speed={pxSpeed}
        direction={dir}
        pauseOnHover={pauseOnHover ?? true}
        gradient
        gradientColor={gradColor}
        gradientWidth={80}
      >
        {renderItems()}
      </Marquee>
    </div>
  )

  return (
    <section style={{ background: bg }} className="py-14 overflow-hidden">
      {(eyebrow || heading) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          {eyebrow && (
            <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isDark || isPrimary ? 'text-white/50' : 'text-muted'}`}>
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className={`text-2xl font-bold tracking-tight ${isDark || isPrimary ? 'text-white' : 'text-heading'}`}>
              {heading}
            </h2>
          )}
        </div>
      )}

      <div className={`flex flex-col ${rows === 'two' ? 'gap-5' : ''}`}>
        {marqueeRow(dir1)}
        {rows === 'two' && marqueeRow(dir2, 0.65)}
      </div>
    </section>
  )
}
