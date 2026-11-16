import React from 'react'

export default function AdminIcon() {
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'linear-gradient(135deg, #1B5FAD 0%, #00A896 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="10" y="3" width="4" height="18" rx="1.5" fill="white" opacity="0.9" />
        <rect x="3" y="10" width="18" height="4" rx="1.5" fill="white" opacity="0.9" />
        <circle cx="12" cy="12" r="2.5" fill="rgba(0,168,150,0.8)" />
      </svg>
    </div>
  )
}
