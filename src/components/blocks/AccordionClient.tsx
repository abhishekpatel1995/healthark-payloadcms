'use client'

import React, { useState } from 'react'

type Item = { question: string; answerHtml: string }

export function AccordionClient({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-border rounded-xl overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface transition-colors"
          >
            <span className="text-sm font-semibold text-heading pr-4">{item.question}</span>
            <svg
              className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open === i && (
            <div
              className="px-6 pb-5 text-sm text-muted leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: item.answerHtml }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
