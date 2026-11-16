'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  end: string   // e.g. "250+", "28+", "60", "2016"
  duration?: number
}

export function CountUp({ end, duration = 2000 }: Props) {
  const match = end.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1]!, 10) : 0
  const suffix = match ? match[2]! : ''

  // Years and large numbers (≥ 1000) render immediately without counting
  const isStatic = target >= 1000
  const [count, setCount] = useState(isStatic ? target : 0)
  const started = useRef(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isStatic) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()

        const startTime = performance.now()
        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(tick)
          else setCount(target)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, isStatic])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}
