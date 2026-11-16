'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface VideoEmbedProps {
  embedUrl: string
  posterSrc?: string
  posterAlt?: string
}

export function VideoEmbed({ embedUrl, posterSrc, posterAlt }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)

  const iframeSrc = playing
    ? `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`
    : embedUrl

  if (posterSrc && !playing) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setPlaying(true)}
        onKeyDown={(e) => e.key === 'Enter' && setPlaying(true)}
        className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-2xl"
        aria-label="Play video"
      >
        <Image src={posterSrc} alt={posterAlt ?? 'Video thumbnail'} fill sizes="(max-width: 1280px) 100vw, 1024px" className="object-cover" />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
            <svg className="w-7 h-7 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
      <iframe
        src={iframeSrc}
        title="Embedded video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  )
}
