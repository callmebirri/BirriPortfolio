'use client'

/**
 * Sticky nav — logo mark + navigation links + solid CTA button.
 * Nav links call the scroll helper attached to the cinematic section
 * by useScrollTimeline, so clicks programmatically scroll to the
 * correct scroll offset rather than jumping to a hash anchor.
 */

export default function Header() {
  const handleNav = (target: string, e: React.MouseEvent) => {
    e.preventDefault()
    const section = document.querySelector('.cinematic-section') as
      | (HTMLElement & { __scrollToSection?: (id: string) => void })
      | null
    section?.__scrollToSection?.(target)
  }

  return (
    <header className="nav-layer" role="banner">
      {/*
        Three-column CSS grid: logo | nav-links | cta
        Each outer column is `1fr` so logo and CTA share equal edge space,
        and the nav-links column is `auto` centered via `place-items: center`.
        This guarantees the links land on the true horizontal midpoint regardless
        of the logo/CTA widths — fixes the `justify-between` asymmetry.
      */}
      <nav
        aria-label="Primary navigation"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1.25rem 3rem',
        }}
      >
        {/* Col 1 — Logo (left-aligned inside its column) */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            className="font-serif text-xl font-normal tracking-tight leading-none bg-transparent border-0 p-0 cursor-pointer"
            style={{ color: 'var(--ink)' }}
            aria-label="birri — back to top"
            onClick={(e) => handleNav('hero', e)}
          >
            birri
          </button>
        </div>

        {/* Col 2 — Nav links (centered in the auto column = true page center) */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {[
            { label: 'About',    target: 'about'    },
            { label: 'Stack',    target: 'stack'    },
            { label: 'Projects', target: 'projects' },
          ].map(({ label, target }) => (
            <li key={target}>
              <button
                className="text-sm font-medium transition-colors duration-150 bg-transparent border-0 p-0 cursor-pointer"
                style={{ color: 'var(--ink-secondary)' }}
                onClick={(e) => handleNav(target, e)}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--accent-color)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-secondary)')}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Col 3 — CTA (right-aligned inside its column) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="mailto:contact@qhuyy.tech"
            className="btn-accent text-sm py-2.5 px-5"
            aria-label="Get in touch via email"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  )
}
