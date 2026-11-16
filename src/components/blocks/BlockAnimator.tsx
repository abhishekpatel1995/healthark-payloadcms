'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: ReactNode
  animation?: string | null
}

export function BlockAnimator({ children, animation }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animation || animation === 'none') return
    const el = ref.current
    if (!el) return

    const st = { trigger: el, start: 'top 85%', once: true }

    const ctx = gsap.context(() => {
      switch (animation) {
        case 'fade-in':
          gsap.from(el, { opacity: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: st })
          break

        case 'fade-up':
          gsap.from(el, { opacity: 0, y: 55, duration: 0.85, ease: 'power3.out', scrollTrigger: st })
          break

        case 'fade-down':
          gsap.from(el, { opacity: 0, y: -55, duration: 0.85, ease: 'power3.out', scrollTrigger: st })
          break

        case 'slide-left':
          gsap.from(el, { opacity: 0, x: -90, duration: 0.85, ease: 'power3.out', scrollTrigger: st })
          break

        case 'slide-right':
          gsap.from(el, { opacity: 0, x: 90, duration: 0.85, ease: 'power3.out', scrollTrigger: st })
          break

        case 'zoom-in':
          gsap.from(el, { opacity: 0, scale: 0.9, duration: 0.85, ease: 'power3.out', scrollTrigger: st })
          break

        case 'text-reveal': {
          // Split every heading in the block into individual character spans
          const headings = el.querySelectorAll('h1, h2, h3, h4')
          headings.forEach((heading) => {
            const text = heading.textContent ?? ''
            heading.innerHTML = text
              .split('')
              .map((char) => {
                const safe = char === '&' ? '&amp;' : char === '<' ? '&lt;' : char === '>' ? '&gt;' : char
                return `<span style="display:inline-block">${safe === ' ' ? '&nbsp;' : safe}</span>`
              })
              .join('')
            gsap.from(heading.querySelectorAll('span'), {
              opacity: 0,
              y: 16,
              duration: 0.35,
              stagger: 0.022,
              ease: 'power2.out',
              scrollTrigger: st,
            })
          })
          // Fade in the rest of the section content after the heading
          const nonHeadings = el.querySelectorAll('p, a, button, [class*="grid"] > *')
          if (nonHeadings.length > 0) {
            gsap.from(nonHeadings, {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.06,
              ease: 'power2.out',
              delay: 0.3,
              scrollTrigger: st,
            })
          }
          break
        }

        case 'word-by-word': {
          // Slide each word up from behind a clip mask
          const headings = el.querySelectorAll('h1, h2, h3, h4')
          headings.forEach((heading) => {
            const text = heading.textContent ?? ''
            // Wrap each word in an overflow:hidden clip + inner sliding span
            heading.innerHTML = text
              .split(' ')
              .map((word) => {
                const safe = word.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                return `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block">${safe}</span></span>`
              })
              .join('&nbsp;')
            gsap.from(heading.querySelectorAll('span > span'), {
              yPercent: 105,
              duration: 0.65,
              stagger: 0.09,
              ease: 'power3.out',
              scrollTrigger: st,
            })
          })
          break
        }

        case 'stagger-children': {
          // Animate grid children or direct section children in a stagger
          const grid = el.querySelector('[class*="grid-cols"]')
          const targets = grid
            ? Array.from(grid.children)
            : Array.from(el.querySelectorAll('section > div > *'))
          if (targets.length > 0) {
            gsap.from(targets, {
              opacity: 0,
              y: 40,
              duration: 0.65,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: st,
            })
          }
          break
        }
      }
    }, el)

    return () => ctx.revert()
  }, [animation])

  if (!animation || animation === 'none') return <>{children}</>

  return <div ref={ref}>{children}</div>
}
