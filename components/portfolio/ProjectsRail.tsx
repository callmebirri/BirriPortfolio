'use client'

import { forwardRef, useEffect, useRef, useState } from 'react'
import { projects } from '@/content/projects'

const ProjectsRail = forwardRef<HTMLElement>((_, ref) => {
  const announcerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (announcerRef.current) {
      announcerRef.current.textContent = `Project ${activeIndex + 1} of ${projects.length}: ${projects[activeIndex].title}`
    }
  }, [activeIndex])

  return (
    <section
      ref={ref}
      id="projects"
      className="copy-layer projects-rail flex flex-col justify-end"
      aria-label="Projects"
      style={{ opacity: 0, pointerEvents: 'none', top: '38%', bottom: 0, height: 'auto', paddingBottom: '2.5rem', zIndex: 25, background: 'var(--surface)' }}
    >
      <div className="mb-5 flex items-end justify-between px-8 md:px-16">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-color)', letterSpacing: '0.2em' }}>
            Projects
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.1 }}>
            Things I&apos;ve built.
          </h2>
        </div>
      </div>

      <div className="projects-viewport overflow-hidden px-8 md:px-16" role="region" aria-label="Projects gallery">
        <div className="projects-track flex gap-5" style={{ willChange: 'transform' }}>
          {projects.map((project, index) => (
            <article key={project.id} className="project-card project-placard">
              <div className="flex items-start justify-between gap-4">
                <span className="project-counter font-mono text-xs" style={{ color: 'var(--accent-color)' }}>
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--ink-secondary)' }}>ARCHIVE</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl" style={{ fontWeight: 400, color: 'var(--ink)', lineHeight: 1.1 }}>{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>{project.description}</p>
              </div>
              <ul className="mt-auto flex flex-wrap gap-1.5 list-none p-0">
                {project.tags.map((tag, tagIndex) => <li key={`${project.id}-${tag}-${tagIndex}`} className="rounded-full px-2.5 py-0.5 text-xs" style={{ background: 'var(--chip)', color: 'var(--ink-secondary)', border: '1px solid var(--border-soft)' }}>{tag}</li>)}
              </ul>
              <a className="btn-ghost mt-2 justify-center text-sm" href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} GitHub repository`}>
                Open GitHub repo
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 px-8 md:px-16" aria-hidden="true">
        {projects.map((project, index) => <span key={project.id} className="h-2 rounded-full" style={{ width: index === activeIndex ? '22px' : '8px', background: index === activeIndex ? 'var(--accent-color)' : 'var(--border-soft)' }} />)}
      </div>
      <div ref={announcerRef} aria-live="polite" aria-atomic="true" className="sr-only" />
    </section>
  )
})

ProjectsRail.displayName = 'ProjectsRail'
export default ProjectsRail
