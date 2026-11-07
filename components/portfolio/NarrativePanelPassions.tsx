'use client'

import { forwardRef, useMemo, useState } from 'react'
import { passions, techStack } from '@/content/stack'

const categoryColor: Record<string, string> = {
  language:  '#FFEDF3',
  framework: '#FFF0F5',
  tool:      '#FFF5F8',
}

const categories = ['all', 'language', 'framework', 'tool'] as const

const NarrativePanelPassions = forwardRef<HTMLElement>((_, ref) => {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('all')
  const visibleTools = useMemo(
    () => activeCategory === 'all' ? techStack : techStack.filter((tool) => tool.category === activeCategory),
    [activeCategory],
  )

  return (
    <section
      ref={ref}
      id="stack"
      className="copy-layer flex items-center justify-center px-8 md:px-16"
      aria-label="Passions and tech stack"
    >
      <div
        className="flex flex-col md:flex-row gap-12 md:gap-16 items-start"
        style={{ maxWidth: '760px', width: '100%' }}
      >
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

        <div className="flex-1 min-w-0">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--ink-secondary)', letterSpacing: '0.2em' }}
          >
            Toolbox
          </p>
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter toolbox">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="cursor-pointer rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] transition-all duration-200"
                style={{
                  borderColor: activeCategory === category ? 'var(--accent-color)' : 'rgba(40, 28, 34, 0.18)',
                  background: activeCategory === category ? 'var(--accent-color)' : 'transparent',
                  color: activeCategory === category ? '#fff' : 'var(--ink-secondary)',
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <ul className="flex flex-wrap gap-2 list-none m-0 p-0" aria-label="Technologies">
            {visibleTools.map((t) => (
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
