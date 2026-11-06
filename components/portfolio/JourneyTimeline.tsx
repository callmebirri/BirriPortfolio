'use client'

import { useEffect, useState, type MouseEvent } from 'react'

const steps = [
  { label: 'Intro', id: 'hero', progress: 0 },
  { label: 'About', id: 'about', progress: 0.25 },
  { label: 'Passions', id: 'stack', progress: 0.48 },
  { label: 'Say hello', id: 'contact', progress: 0.75 },
]

export default function JourneyTimeline() {
  const [activeId, setActiveId] = useState(steps[0].id)

  useEffect(() => {
    const markers = steps
      .map(({ id }) => document.querySelector(`[data-journey-marker="${id}"]`))
      .filter((marker): marker is HTMLElement => Boolean(marker))

    if (!markers.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleMarker = entries.find((entry) => entry.isIntersecting)
        if (visibleMarker) setActiveId((visibleMarker.target as HTMLElement).dataset.journeyMarker ?? steps[0].id)
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    markers.forEach((marker) => observer.observe(marker))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, progress: number) => {
    event.preventDefault()
    const section = document.querySelector('.cinematic-section')
    if (!section) return

    const maxScroll = Math.max(section.scrollHeight - window.innerHeight, 0)
    const target = section.getBoundingClientRect().top + window.scrollY + maxScroll * progress - window.innerHeight / 2
    window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Portfolio journey"
      className="pointer-events-auto absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 lg:flex"
    >
      {steps.map((step) => {
        const isActive = step.id === activeId
        return (
          <a
            key={step.id}
            href={`#${step.id}`}
            aria-current={isActive ? 'step' : undefined}
            onClick={(event) => scrollToSection(event, step.progress)}
            className="group flex cursor-pointer items-center gap-3 rounded-sm px-2 py-1 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span
              className="h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-125"
              style={{
                background: isActive ? 'var(--accent-color)' : 'var(--ink-secondary)',
                opacity: isActive ? 1 : 0.35,
                transform: isActive ? 'scale(1.35)' : 'scale(1)',
              }}
              aria-hidden="true"
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                color: 'var(--ink)',
                opacity: isActive ? 1 : 0.42,
              }}
            >
              {step.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
