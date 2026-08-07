'use client'

import { forwardRef } from 'react'
import { quickFacts } from '@/content/stack'

/**
 * Narrative panel A — About Me.
 * Starts at opacity 0; enters at scroll p ≈ 0.25.
 */
const NarrativePanelAboutMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="copy-layer flex items-center justify-center px-8 md:px-16"
      style={{ opacity: 0, pointerEvents: 'none' }}
      aria-label="About Me"
    >
      <div style={{ maxWidth: '660px', width: '100%' }}>
        {/* Label */}
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent-color)', letterSpacing: '0.2em' }}
        >
          About Me
        </p>

        {/* Heading */}
        <h2
          className="font-serif text-balance mb-6"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            color: 'var(--ink)',
            fontWeight: 400,
          }}
        >
          Still learning,
          <br />
          <em style={{ color: 'var(--accent-color)' }}>still having fun.</em>
        </h2>

        {/* Body */}
        <p
          className="leading-relaxed mb-8"
          style={{
            fontSize: 'clamp(0.9rem, 1.6vw, 1.0625rem)',
            color: 'var(--ink-secondary)',
            maxWidth: '54ch',
          }}
        >
          Hey, I&apos;m Bui Doan Quang Huy — a student from Vietnam who somehow spends way too
          much time writing code. Most of my projects start with &ldquo;this could be fun&rdquo;
          and end with me debugging at 2AM. I enjoy building things people can actually use,
          solving programming problems, and messing around with Minecraft plugins, Android apps,
          or whatever catches my interest that week. Still making mistakes, still having fun.
        </p>

        {/* Quick facts */}
        <dl className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Quick facts">
          {quickFacts.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <dt
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: 'var(--accent-color)', letterSpacing: '0.16em' }}
              >
                {f.label}
              </dt>
              <dd className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
})

NarrativePanelAboutMe.displayName = 'NarrativePanelAboutMe'

export default NarrativePanelAboutMe
