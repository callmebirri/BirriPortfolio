'use client'

import { forwardRef } from 'react'
import { quickFacts } from '@/content/stack'

/**
 * Narrative panel A — About Me.
 * Starts hidden; enters at scroll p ≈ 0.25.
 */
const NarrativePanelAboutMe = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="copy-layer flex items-center justify-center px-8 md:px-16"
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
          Hey, I'm Bui Doan Quang Huy, just some dude from Vietnam who spends an unhealthy amount of time messing with code.

          I build random stuff, break things, fix them (sometimes), and occasionally wonder why the hell I started in the first place. Mostly into C++, Java, Minecraft plugins, Android stuff, and whatever rabbit hole I happen to fall into.

          Not here to change the world or build the next big thing. Just wanna make cool shit, solve some problems, and have a good time doing it.

          Still learning, still breaking stuff, still shipping.
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
