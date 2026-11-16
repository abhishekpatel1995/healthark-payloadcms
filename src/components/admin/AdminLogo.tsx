import React from 'react'

export default function AdminLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '2px 4px',
      }}
    >
      {/* Brand icon */}
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '9px',
          background: 'linear-gradient(135deg, #1B5FAD 0%, #00A896 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="10" y="3" width="4" height="18" rx="1.5" fill="white" opacity="0.9" />
          <rect x="3" y="10" width="18" height="4" rx="1.5" fill="white" opacity="0.9" />
          <circle cx="12" cy="12" r="2.5" fill="rgba(0,168,150,0.8)" />
        </svg>
      </div>

      {/* Wordmark */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontSize: '17px',
            fontWeight: '700',
            letterSpacing: '-0.03em',
          }}
        >
          <span style={{ color: '#1B5FAD' }}>Health</span>
          <span style={{ color: '#00A896' }}>ark</span>
        </span>
        <span
          style={{
            fontSize: '9px',
            fontWeight: '600',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#94a3b8',
          }}
        >
          Content Studio
        </span>
      </div>
    </div>
  )
}
