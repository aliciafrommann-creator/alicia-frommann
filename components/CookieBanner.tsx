'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-notice')) setVisible(true)
  }, [])

  if (!visible) return null

  const dismiss = () => {
    localStorage.setItem('cookie-notice', '1')
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie-Hinweis"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: '14px var(--pad-x)',
        background: 'var(--cream)',
        borderTop: '1px solid var(--line-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        flexWrap: 'wrap',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          color: 'var(--ink-3)',
          letterSpacing: '.02em',
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        Diese Website verwendet ausschließlich technisch notwendige Cookies (Vercel),
        die für den Betrieb der Seite erforderlich sind.
      </p>
      <button
        onClick={dismiss}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '8px 18px',
          borderRadius: '999px',
          border: '1px solid var(--line-2)',
          background: 'none',
          color: 'var(--ink)',
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          letterSpacing: '.04em',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'border-color .25s, color .25s',
          whiteSpace: 'nowrap',
        }}
      >
        Verstanden
      </button>
    </div>
  )
}
