'use client'

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { projects } from '@/content/projects'

/**
 * Horizontal projects card rail.
 * - Keyboard navigable (arrow keys)
 * - Pointer drag / swipe
 * - aria-live region announces on settle
 * - All cards are real <a> links to GitHub
 */

const CARD_WIDTH  = 340
const CARD_GAP    = 20
const CARD_STEP   = CARD_WIDTH + CARD_GAP

const ProjectsRail = forwardRef<HTMLElement>((_, ref) => {
  const trackRef    = useRef<HTMLDivElement>(null)
  const announcerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isDragging    = useRef(false)
  const dragStartX    = useRef(0)
  const dragStartOff  = useRef(0)
  const currentOffset = useRef(0)

  const clamp = useCallback((i: number) => Math.max(0, Math.min(i, projects.length - 1)), [])

  const animateTo = useCallback((idx: number) => {
    const clamped = clamp(idx)
    currentOffset.current = -clamped * CARD_STEP
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      trackRef.current.style.transform  = `translateX(${currentOffset.current}px)`
    }
    setActiveIndex(clamped)
  }, [clamp])

  // Drag threshold in pixels — only enter drag mode after moving past this.
  // This lets simple clicks pass through to the <a> card links.
  const DRAG_THRESHOLD = 5
  const pointerActive = useRef(false)   // pointer is down, but not necessarily dragging yet
  const viewportElRef = useRef<HTMLElement | null>(null)
  const pointerIdRef  = useRef<number>(0)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerActive.current = true
    isDragging.current    = false       // not dragging until we pass threshold
    dragStartX.current    = e.clientX
    dragStartOff.current  = currentOffset.current
    viewportElRef.current = e.currentTarget as HTMLElement
    pointerIdRef.current  = e.pointerId
    // Do NOT call setPointerCapture here — it would steal the click from <a> tags
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!pointerActive.current) return

    const dx = e.clientX - dragStartX.current

    // First time past threshold → enter drag mode
    if (!isDragging.current) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return
      isDragging.current = true
      // NOW capture — we know this is a real drag, not a click
      viewportElRef.current?.setPointerCapture(pointerIdRef.current)
      if (trackRef.current) trackRef.current.style.transition = 'none'
    }

    const newOff = dragStartOff.current + dx
    if (trackRef.current) trackRef.current.style.transform = `translateX(${newOff}px)`
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!pointerActive.current) return
    pointerActive.current = false

    // If we never entered drag mode, this was a click — let the <a> handle it
    if (!isDragging.current) return

    isDragging.current = false
    const delta = e.clientX - dragStartX.current
    if (Math.abs(delta) > CARD_STEP * 0.22) {
      animateTo(activeIndex + (delta > 0 ? -1 : 1))
    } else {
      animateTo(activeIndex)
    }
  }, [activeIndex, animateTo])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  { e.preventDefault(); animateTo(activeIndex - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); animateTo(activeIndex + 1) }
  }, [activeIndex, animateTo])

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent =
        `Project ${activeIndex + 1} of ${projects.length}: ${projects[activeIndex].name}`
    }
  }, [activeIndex])

  return (
    <section
      ref={ref}
      id="projects"
      className="copy-layer flex flex-col justify-end"
      style={{
        opacity: 0,
        pointerEvents: 'none',
        // Sit in the bottom 62% — Contact CTA occupies top 38%
        top: '38%',
        bottom: 0,
        height: 'auto',
        paddingBottom: '2.5rem',
      }}
      aria-label="Projects"
    >
      {/* Heading + controls */}
      <div className="flex items-end justify-between px-8 md:px-16 mb-5">
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-1.5"
            style={{ color: 'var(--accent-color)', letterSpacing: '0.2em' }}
          >
            Projects
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.1,
            }}
          >
            Things I&apos;ve built.
          </h2>
        </div>
      </div>

      {/* Viewport */}
      <div
        className="relative overflow-hidden px-8 md:px-16"
        role="region"
        aria-label="Projects carousel"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab', outline: 'none',
          /* Extra vertical padding so the card hover lift (translateY -3px)
             and box-shadow aren't clipped by overflow-hidden.
             Negative margin compensates so the overall layout stays the same. */
          paddingTop: '8px',
          paddingBottom: '12px',
          marginTop: '-8px',
          marginBottom: '-12px',
        }}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${CARD_GAP}px`, userSelect: 'none', willChange: 'transform' }}
        >
          {projects.map((project, i) => {
            return (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                style={{
                  width: `${CARD_WIDTH}px`,
                  minHeight: '210px',
                }}
                tabIndex={i === activeIndex ? 0 : -1}
                draggable={false}
                aria-label={`${project.name} — view on GitHub`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {project.featured && (
                      <span
                        className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
                        style={{
                          background: 'var(--chip)',
                          color: 'var(--accent-color)',
                          border: '1px solid var(--border-soft)',
                        }}
                      >
                        Featured
                      </span>
                    )}
                    {project.org && (
                      <span
                        className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 ml-1.5"
                        style={{ background: '#F5F5F5', color: 'var(--ink-secondary)' }}
                      >
                        {project.org}
                      </span>
                    )}
                    <h3
                      className="font-serif text-lg"
                      style={{ fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2 }}
                    >
                      {project.name}
                    </h3>
                  </div>
                  {/* Arrow icon */}
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="flex-shrink-0 mt-1" style={{ color: 'var(--accent-color)' }}>
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--ink-secondary)' }}>
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-1.5 list-none m-0 p-0">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                        style={{
                          background: 'var(--chip)',
                          color: 'var(--ink-secondary)',
                          border: '1px solid var(--border-soft)',
                        }}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </a>
            )
          })}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 px-8 md:px-16 mt-4" role="tablist" aria-label="Project indicator">
        {projects.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Project ${i + 1}: ${p.name}`}
            onClick={() => animateTo(i)}
            className="rounded-full transition-all duration-250"
            style={{
              width: i === activeIndex ? '22px' : '8px',
              height: '8px',
              background: i === activeIndex ? 'var(--accent-color)' : 'var(--border-soft)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          />
        ))}
      </div>

      {/* SR announcer */}
      <div ref={announcerRef} aria-live="polite" aria-atomic="true" className="sr-only" />
    </section>
  )
})

ProjectsRail.displayName = 'ProjectsRail'

export default ProjectsRail
