'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Shared ScrollTrigger config ───────────────────────────────────────────────

function st(trigger: Element) {
  return { trigger, start: 'top 88%', once: true }
}

// ── Single-element animation ──────────────────────────────────────────────────

function animateSingle(el: HTMLElement, anim: string) {
  switch (anim) {
    case 'fade-in':
      gsap.from(el, { opacity: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: st(el) })
      break

    case 'fade-up':
      gsap.from(el, { opacity: 0, y: 48, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
      break

    case 'fade-down':
      gsap.from(el, { opacity: 0, y: -48, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
      break

    case 'slide-left':
      gsap.from(el, { opacity: 0, x: -80, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
      break

    case 'slide-right':
      gsap.from(el, { opacity: 0, x: 80, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
      break

    case 'zoom-in':
      gsap.from(el, { opacity: 0, scale: 0.88, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
      break

    case 'text-reveal': {
      const text = el.textContent ?? ''
      if (!text.trim()) {
        // Fallback: plain fade-up if no text content (e.g. image wrappers)
        gsap.from(el, { opacity: 0, y: 32, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
        break
      }
      // Replace text with individually-wrapped character spans
      el.innerHTML = text
        .split('')
        .map((c) => {
          const safe = c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c
          return `<span style="display:inline-block">${safe === ' ' ? '&nbsp;' : safe}</span>`
        })
        .join('')
      gsap.from(el.querySelectorAll('span'), {
        opacity: 0,
        y: 16,
        duration: 0.35,
        stagger: 0.022,
        ease: 'power2.out',
        scrollTrigger: st(el),
      })
      break
    }

    case 'word-by-word': {
      const text = el.textContent ?? ''
      if (!text.trim()) {
        gsap.from(el, { opacity: 0, y: 32, duration: 0.75, ease: 'power3.out', scrollTrigger: st(el) })
        break
      }
      // Each word gets an overflow-hidden clip wrapper so it slides up from behind a mask
      el.innerHTML = text
        .split(' ')
        .map((word) => {
          const safe = word.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
          return `<span style="display:inline-block;overflow:hidden;vertical-align:bottom"><span style="display:inline-block">${safe}</span></span>`
        })
        .join('&nbsp;')
      gsap.from(el.querySelectorAll('span > span'), {
        yPercent: 110,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: st(el),
      })
      break
    }
  }
}

// ── Group / stagger animation ─────────────────────────────────────────────────

function animateGroup(container: HTMLElement, anim: string) {
  const children = Array.from(container.children) as HTMLElement[]
  if (children.length === 0) return

  switch (anim) {
    case 'fade-in':
      gsap.from(children, {
        opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out', scrollTrigger: st(container),
      })
      break

    case 'fade-up':
      gsap.from(children, {
        opacity: 0, y: 45, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(container),
      })
      break

    case 'fade-down':
      gsap.from(children, {
        opacity: 0, y: -45, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(container),
      })
      break

    case 'slide-left':
      gsap.from(children, {
        opacity: 0, x: -60, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(container),
      })
      break

    case 'slide-right':
      gsap.from(children, {
        opacity: 0, x: 60, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(container),
      })
      break

    case 'zoom-in':
      gsap.from(children, {
        opacity: 0, scale: 0.88, duration: 0.65, stagger: 0.1, ease: 'power3.out', scrollTrigger: st(container),
      })
      break
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function PageAnimator() {
  useEffect(() => {
    // ── Scroll progress bar ───────────────────────────────────────────────────
    const bar = document.createElement('div')
    bar.id = 'scroll-progress-bar'
    document.body.appendChild(bar)

    const updateProgress = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const total = doc.scrollHeight - doc.clientHeight
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%'
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    // ── GSAP animations ───────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      // Single-element animations
      document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
        const anim = el.getAttribute('data-anim')
        if (anim && anim !== 'none') animateSingle(el, anim)
      })

      // Group / stagger animations — animates each direct child
      document.querySelectorAll<HTMLElement>('[data-anim-group]').forEach((el) => {
        const anim = el.getAttribute('data-anim-group')
        if (anim && anim !== 'none') animateGroup(el, anim)
      })

      // ── Hero image parallax ─────────────────────────────────────────────────
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') ?? '0.15')
        gsap.to(el, {
          yPercent: -(speed * 30),
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })

      // ── Timeline line draw (scaleY from top, scrubbed with scroll) ──────────
      document.querySelectorAll<HTMLElement>('.timeline-line').forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: line.parentElement ?? line,
              start: 'top 78%',
              end: 'bottom 82%',
              scrub: 0.6,
            },
          },
        )
      })

      ScrollTrigger.refresh()
    })

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', updateProgress)
      bar.remove()
    }
  }, [])

  return null
}
