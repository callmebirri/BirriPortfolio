'use client'

import { forwardRef } from 'react'
import { stats } from '@/content/stack'

const HeroIntro = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="hero"
      className="copy-layer flex flex-col items-center justify-center text-center px-6"
      aria-label="Introduction"
    >
      <p
        className="text-xs font-semibold tracking-widest uppercase mb-4"
        style={{ color: 'var(--accent-color)', letterSpacing: '0.2em' }}
      >
        Hi, I&apos;m birri
      </p>

      <h1
        className="font-serif text-balance"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 7rem)',
          lineHeight: 1.05,
          color: 'var(--ink)',
          margin: '0 0 1rem',
          fontWeight: 400,
        }}
      >
        Bui Doan
        <br />
        <em style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Quang Huy</em>
      </h1>

      <p
        className="text-balance"
        style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
          color: 'var(--ink-secondary)',
          maxWidth: '34ch',
          lineHeight: 1.55,
          margin: '0 0 2.5rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        A beginner software engineer from Viet Nam :3
      </p>

      <ul
        className="flex flex-wrap items-center justify-center gap-3 list-none m-0 p-0"
        aria-label="Quick stats"
      >
        {stats.map((s) => (
          <li key={s.label}>
            <span className="chip">
              <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>{s.value}</strong>
              {' '}{s.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
})

HeroIntro.displayName = 'HeroIntro'

export default HeroIntro
