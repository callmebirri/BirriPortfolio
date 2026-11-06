'use client'

import { useEffect, useState } from 'react'

const steps = [
  { label: 'Intro', progress: 0 },
  { label: 'About', progress: 0.25 },
  { label: 'Passions', progress: 0.48 },
  { label: 'Say hello', progress: 0.75 },
]

export default function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const update = () => {
      const section = document.querySelector('.cinematic-section')
      if (!section) return
      const maxScroll = Math.max(section.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll))
      let nextIndex = 0
      steps.forEach((step, index) => {
        if (progress >= step.progress) nextIndex = index
      })
      setActiveIndex(nextIndex)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <nav
      aria-label="Portfolio journey"
      className="pointer-events-none absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
    >
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full transition-all duration-500"
            style={{
              background: index <= activeIndex ? 'var(--accent-color)' : 'var(--ink-secondary)',
              opacity: index <= activeIndex ? 1 : 0.35,
              transform: index === activeIndex ? 'scale(1.35)' : 'scale(1)',
            }}
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity duration-500"
            style={{
              color: 'var(--ink)',
              opacity: index === activeIndex ? 1 : 0.42,
            }}
          >
            {step.label}
          </span>
        </div>
      ))}
    </nav>
  )
}
