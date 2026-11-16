'use client'
import { useEffect, useState } from 'react'

interface TypewriterSpanProps {
  words: string[]
}

export function TypewriterSpan({ words }: TypewriterSpanProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    if (words.length === 0) return
    const word = words[currentIndex % words.length] ?? ''

    if (phase === 'typing') {
      if (displayText === word) {
        const t = setTimeout(() => setPhase('pausing'), 2000)
        return () => clearTimeout(t)
      }
      const t = setTimeout(() => setDisplayText(word.slice(0, displayText.length + 1)), 75)
      return () => clearTimeout(t)
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), 400)
      return () => clearTimeout(t)
    }

    // deleting
    if (displayText === '') {
      setCurrentIndex((i) => (i + 1) % words.length)
      setPhase('typing')
      return
    }
    const t = setTimeout(() => setDisplayText((s) => s.slice(0, -1)), 40)
    return () => clearTimeout(t)
  }, [displayText, phase, currentIndex, words])

  return (
    <span className="text-accent whitespace-nowrap">
      {displayText}
      <span className="inline-block w-[3px] h-[0.85em] bg-accent ml-1 align-middle rounded-sm animate-pulse" />
    </span>
  )
}
