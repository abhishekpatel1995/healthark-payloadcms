'use client'
import React, { useEffect, useRef, useState } from 'react'

interface MetricItem {
  label: string
  percentage: number
  description?: string | null
  color?: string | null
}

interface MetricsBarClientProps {
  items: MetricItem[]
  layout: 'bars' | 'rings'
  isDark: boolean
}

const COLOR_MAP: Record<string, string> = {
  accent:  '#00A896',
  primary: '#1B5FAD',
  white:   '#ffffff',
}

function AnimatedNumber({ target, started, delay = 0 }: { target: number; started: boolean; delay?: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return
    let frame: number
    const timer = setTimeout(() => {
      const start = performance.now()
      const duration = 1400
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * target))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(timer); cancelAnimationFrame(frame) }
  }, [started, target, delay])

  return <>{value}</>
}

export function MetricsBarClient({ items, layout, isDark }: MetricsBarClientProps) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ── Circular rings layout ─────────────────────────────────────────────────────
  if (layout === 'rings') {
    const r = 52
    const circ = 2 * Math.PI * r

    return (
      <div
        ref={ref}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center"
      >
        {items.map((item, i) => {
          const pct    = item.percentage ?? 0
          const color  = COLOR_MAP[item.color ?? 'accent'] ?? '#00A896'
          const offset = started ? circ - (pct / 100) * circ : circ

          return (
            <div key={i} className="text-center">
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  {/* Track */}
                  <circle
                    cx="60" cy="60" r={r}
                    fill="none"
                    stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
                    strokeWidth="9"
                  />
                  {/* Progress */}
                  <circle
                    cx="60" cy="60" r={r}
                    fill="none"
                    stroke={color}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) ${i * 120}ms` }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: isDark ? '#fff' : '#0F172A' }}
                  >
                    <AnimatedNumber target={pct} started={started} delay={i * 120} />%
                  </span>
                </div>
              </div>
              <p className={`text-sm font-semibold mt-3 ${isDark ? 'text-white' : 'text-heading'}`}>
                {item.label}
              </p>
              {item.description && (
                <p className={`text-xs mt-1 ${isDark ? 'text-white/50' : 'text-muted'}`}>
                  {item.description}
                </p>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // ── Horizontal bars layout (default) ─────────────────────────────────────────
  return (
    <div ref={ref} className="space-y-8 max-w-2xl mx-auto lg:mx-0">
      {items.map((item, i) => {
        const pct   = item.percentage ?? 0
        const color = COLOR_MAP[item.color ?? 'accent'] ?? '#00A896'
        const delay = i * 100

        return (
          <div key={i}>
            <div className="flex items-baseline justify-between mb-2.5">
              <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-heading'}`}>
                {item.label}
              </p>
              <span className="text-2xl font-bold tabular-nums" style={{ color }}>
                <AnimatedNumber target={pct} started={started} delay={delay} />%
              </span>
            </div>

            {/* Track */}
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
            >
              {/* Fill */}
              <div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  width: started ? `${pct}%` : '0%',
                  background: `linear-gradient(90deg, ${color}BB, ${color})`,
                  transition: `width 1.3s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
                }}
              >
                {/* Shimmer sweep on fill */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.35) 50%, transparent 80%)',
                    animation: started
                      ? `bar-shimmer 1.6s ease ${delay + 200}ms 1`
                      : 'none',
                  }}
                />
              </div>
            </div>

            {item.description && (
              <p className={`text-xs mt-2 ${isDark ? 'text-white/50' : 'text-muted'}`}>
                {item.description}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
