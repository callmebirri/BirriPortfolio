'use client'

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
      <nav
        aria-label="Primary navigation"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '1.25rem clamp(1.25rem, 5vw, 3rem)',
        }}
      >
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

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
          {[
            { label: 'About',    target: 'about'    },
            { label: 'Passions', target: 'passions' },
            { label: 'Projects', target: 'projects' },
            { label: 'Say hello', target: 'contact' },
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

        <div />
      </nav>
    </header>
  )
}
