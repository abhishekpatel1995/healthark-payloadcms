import type { Media } from '@/payload-types'

export function imgProps(field: unknown) {
  if (!field || typeof field !== 'object') return null
  const m = field as Media
  if (!m.url) return null
  return { src: m.url, width: m.width ?? 800, height: m.height ?? 600, alt: m.alt ?? '' }
}

export function getEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return url
}

export const sectionBg: Record<string, string> = {
  white: '#ffffff',
  surface: '#F8F9FA',
  dark: '#0C1B2D',
}

export function hoverClasses(effect?: string | null) {
  const e = effect ?? 'lift-zoom'
  return {
    card: e === 'lift' || e === 'lift-zoom' ? 'hover:-translate-y-1.5' : '',
    img: e === 'zoom' || e === 'lift-zoom' ? 'group-hover:scale-105' : '',
  }
}

export function safeHref(url?: string | null) {
  if (!url) return undefined
  return url
}
