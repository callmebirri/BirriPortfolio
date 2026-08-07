'use client'

import { forwardRef } from 'react'
import { passions, techStack } from '@/content/stack'

/**
 * Narrative panel B — Passions + tech stack chips.
 * Starts at opacity 0; enters at scroll p ≈ 0.48.
 */

const categoryColor: Record<string, string> = {
  language:  '#FFEDF3',
  framework: '#FFF0F5',
  tool:      '#FFF5F8',
}

const NarrativePanelPassions = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="stack"
      className="copy-layer flex items-center justify-center px-8 md:px-16"
      style={{ opacity: 0, pointerEvents: 'none' }}
      aria-label="Passions and tech stack"
    >
      <div
        className="flex flex-col md:flex-row gap-12 md:gap-16 items-start"
        style={{ maxWidth: '760px', width: '100%' }}
      >
        {/* Left — Passions */}
        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--accent-color)', letterSpacing: '0.2em' }}
          >
            Passionate About
          </p>
          <h2
            className="font-serif text-balance mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.1,
              color: 'var(--ink)',
              fontWeight: 400,
            }}
          >
            Things I care
            <br />
            <em style={{ color: 'var(--accent-color)' }}>deeply about.</em>
          </h2>

          <ul className="flex flex-col gap-2.5 list-none m-0 p-0" aria-label="Passions list">
            {passions.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 text-base font-medium"
                style={{ color: 'var(--ink)' }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: 'var(--accent-color)' }}
                  aria-hidden="true"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Tech stack */}
        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--ink-secondary)', letterSpacing: '0.2em' }}
          >
            Tech Stack
          </p>
          <ul className="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Technologies">
            {techStack.map((t) => (
              <li key={t.label}>
                <span
                  className="chip text-xs"
                  style={{ background: categoryColor[t.category] ?? '#FFEDF3' }}
                >
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
})

NarrativePanelPassions.displayName = 'NarrativePanelPassions'

export default NarrativePanelPassions
