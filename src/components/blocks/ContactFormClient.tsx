'use client'
import React, { useState } from 'react'

interface ContactFormClientProps {
  submitLabel: string
  successMessage: string
}

export function ContactFormClient({ submitLabel, successMessage }: ContactFormClientProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const data = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or email us directly.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-heading">{successMessage}</p>
      </div>
    )
  }

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm text-heading placeholder:text-muted transition'
  const labelCls = 'block text-sm font-medium text-heading mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="cf-firstName">
            First Name <span className="text-accent">*</span>
          </label>
          <input id="cf-firstName" name="firstName" type="text" required className={inputCls} placeholder="Jane" />
        </div>
        <div>
          <label className={labelCls} htmlFor="cf-lastName">
            Last Name <span className="text-accent">*</span>
          </label>
          <input id="cf-lastName" name="lastName" type="text" required className={inputCls} placeholder="Smith" />
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" type="text" className={inputCls} placeholder="Acme Healthcare" />
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-email">
          Work Email <span className="text-accent">*</span>
        </label>
        <input id="cf-email" name="email" type="email" required className={inputCls} placeholder="jane@example.com" />
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-phone">Phone (optional)</label>
        <input id="cf-phone" name="phone" type="tel" className={inputCls} placeholder="+1 555 000 0000" />
      </div>

      <div>
        <label className={labelCls} htmlFor="cf-message">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          className={`${inputCls} resize-none`}
          placeholder="Tell us how we can help…"
        />
      </div>

      {status === 'error' && <p className="text-sm text-red-500">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-shimmer inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold rounded-lg transition-colors text-sm w-full sm:w-auto"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  )
}
