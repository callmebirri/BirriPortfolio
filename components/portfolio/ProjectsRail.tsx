'use client'

import { forwardRef, useRef } from 'react'
import { projects } from '@/content/projects'

const ProjectsRail = forwardRef<HTMLElement>((_, ref) => {
  const announcerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={ref}
      id="projects"
      className="copy-layer projects-rail"
      aria-label="Projects"
      aria-hidden="true"
    >
      <div className="projects-group">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent-color)', letterSpacing: '0.2em' }}>
            Projects
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.1 }}>
            Things I&apos;ve built.
          </h2>
        </div>

        <div className="projects-viewport" role="region" aria-label="Projects gallery">
          <div className="projects-track" style={{ willChange: 'auto' }}>
            {projects.map((project, index) => (
              <article key={project.id} className="project-card project-placard">
                <div className="flex items-start justify-between gap-4">
                  <span className="project-counter font-mono text-[13px] font-medium" style={{ color: 'var(--accent-color)' }}>
                    {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(1.35rem, 1.6vw, 1.65rem)',
                      fontWeight: 400,
                      color: 'var(--ink)',
                      lineHeight: 1.15,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mt-3 text-[13.5px] md:text-[14.5px] leading-relaxed"
                    style={{ color: 'var(--ink-secondary)' }}
                  >
                    {project.description}
                  </p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-2 list-none p-0">
                  {project.tags.map((tag, tagIndex) => (
                    <li
                      key={`${project.id}-${tag}-${tagIndex}`}
                      className="rounded-full px-3 py-1 text-[11.5px] md:text-xs font-medium"
                      style={{
                        background: 'var(--chip)',
                        color: 'var(--ink-secondary)',
                        border: '1px solid var(--border-soft)',
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <a
                  className="btn-ghost mt-3 justify-center text-[13.5px] md:text-[14px] font-bold"
                  style={{ color: '#E4608A' }}
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                >
                  Open GitHub repo
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div ref={announcerRef} aria-live="polite" aria-atomic="true" className="sr-only">Projects gallery</div>
    </section>
  )
})

ProjectsRail.displayName = 'ProjectsRail'
export default ProjectsRail
