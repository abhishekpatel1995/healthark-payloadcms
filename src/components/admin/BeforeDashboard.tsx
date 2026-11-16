'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const SETUP_STEPS = [
  {
    number: '01',
    title: 'Site Settings',
    href: '/admin/globals/site-settings',
    color: '#1B5FAD',
    description: 'Set your hero headline, subtext, CTA buttons, hero image, and global SEO meta.',
    fields: ['Hero Headline & Subtext', 'Primary & Secondary CTAs', 'Hero Image (920×680 px)', 'Contact Email', 'Social Links'],
  },
  {
    number: '02',
    title: 'Services',
    href: '/admin/collections/services',
    color: '#00A896',
    description: 'Add your 9 capability service cards. Each appears in the homepage Services grid and the /capabilities page.',
    fields: ['Title & Slug', 'Category (Capability / Business Unit / Solution)', 'Excerpt (2–3 sentences)', 'Featured Image (optional)', 'Display Order'],
  },
  {
    number: '03',
    title: 'Case Studies',
    href: '/admin/collections/case-studies',
    color: '#1B5FAD',
    description: 'Add client case studies. The latest 3 appear on the homepage; all appear on the Case Studies listing page.',
    fields: ['Title, Slug & Category Tag', 'Excerpt (for cards)', 'Featured Image (800×450 px)', 'Client Background, Challenge, Role, Impact'],
  },
  {
    number: '04',
    title: 'Insights',
    href: '/admin/collections/insights',
    color: '#00A896',
    description: 'Add all content types — blogs, reports, podcasts, events. Podcasts appear in the homepage Podcast section.',
    fields: ['Title, Slug & Type', 'Published Date', 'Featured Image', 'Excerpt & Author', 'External URL (for YouTube / Spotify podcasts)'],
  },
  {
    number: '05',
    title: 'Clients',
    href: '/admin/collections/clients',
    color: '#1B5FAD',
    description: 'Upload client logos. Toggle "Show on Homepage" to include them in the animated logo strip on the homepage.',
    fields: ['Client Name & Logo (SVG or PNG, transparent)', 'Industry', '"Show on Homepage" checkbox', 'Display Order (lower = first)'],
  },
  {
    number: '06',
    title: 'Pages',
    href: '/admin/collections/pages',
    color: '#00A896',
    description: 'Build interior pages (About Us, Contact, Capabilities) using the flexible block builder. No coding needed.',
    fields: ['Page Title & Slug', 'SEO Title, Description & OG Image', 'Layout Blocks (Hero, Content, Services Grid, CTA, etc.)'],
  },
]

const LINKS = [
  { label: 'Live Homepage (static)', href: '/', bg: '#0F172A', text: '#fff' },
  { label: 'CMS Homepage (live data)', href: '/cms', bg: '#1B5FAD', text: '#fff' },
  { label: 'Preview in new tab', href: '/cms', bg: '#00A896', text: '#fff', target: '_blank' },
]

export default function BeforeDashboard() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      style={{
        marginBottom: '32px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0C1B2D 0%, #0d2d52 100%)',
          borderRadius: '14px',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '16px',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0,168,150,0.15)',
              borderRadius: '100px',
              padding: '4px 12px',
              marginBottom: '10px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00A896', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#00A896', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Content Studio
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#fff', letterSpacing: '-0.02em' }}>
            Welcome to Healthark CMS
          </h2>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            Fill in each section below to power the live website. Changes appear instantly at <code style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 6px', borderRadius: '4px', fontSize: '12px', color: '#00A896' }}>/cms</code>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                textDecoration: 'none',
                background: link.bg,
                color: link.text,
                border: '1px solid rgba(255,255,255,0.12)',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: collapsed ? 0 : '12px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setCollapsed((c) => !c)}
      >
        <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Setup Guide — 6 Steps
        </span>
        <span style={{ fontSize: '12px', color: '#94a3b8' }}>{collapsed ? '▼ Show guide' : '▲ Hide guide'}</span>
      </div>

      {/* Steps grid */}
      {!collapsed && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '12px',
          }}
        >
          {SETUP_STEPS.map((step) => (
            <a
              key={step.number}
              href={step.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '18px 20px',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                background: '#fff',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => {
                const t = e.currentTarget
                t.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
                t.style.borderColor = step.color
              }}
              onMouseLeave={(e) => {
                const t = e.currentTarget
                t.style.boxShadow = 'none'
                t.style.borderColor = '#E2E8F0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* Step number */}
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: step.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#fff', letterSpacing: '0.02em' }}>{step.number}</span>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#0F172A', letterSpacing: '-0.01em' }}>
                    {step.title}
                  </p>
                  <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Field checklist */}
              <ul style={{ margin: 0, padding: '0 0 0 12px', listStyle: 'none', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                {step.fields.map((field) => (
                  <li
                    key={field}
                    style={{
                      fontSize: '11px',
                      color: '#64748b',
                      padding: '2px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: step.color, flexShrink: 0, display: 'inline-block' }} />
                    {field}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
