'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    const section = document.querySelector('.cinematic-section') as
      | (HTMLElement & { __scrollToSection?: (id: string) => void })
      | null
    section?.__scrollToSection?.('hero')
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className="scroll-to-top-btn"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 50,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: '1.5px solid var(--border-soft)',
        background: 'var(--surface)',
        color: 'var(--accent-color)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(232, 93, 138, 0.12)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.85)',
        transition: 'opacity 0.3s ease, transform 0.3s ease, border-color 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget
        btn.style.borderColor = 'var(--accent-color)'
        btn.style.boxShadow = '0 6px 28px rgba(232, 93, 138, 0.22)'
        btn.style.transform = 'translateY(-2px) scale(1)'
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget
        btn.style.borderColor = 'var(--border-soft)'
        btn.style.boxShadow = '0 4px 20px rgba(232, 93, 138, 0.12)'
        btn.style.transform = 'translateY(0) scale(1)'
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
