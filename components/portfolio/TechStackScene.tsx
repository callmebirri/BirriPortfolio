'use client'

import { techStack } from '@/content/stack'

/**
 * Floating tech-stack chip panorama.
 * Chips are scattered across the stage; their positions form
 * the "clean panorama" beat between About Me and Passions panels.
 */

// Stable positions across the canvas (%, %) + slight rotation
const positions: Array<{ x: number; y: number; rotate: number }> = [
  { x: 8,  y: 25, rotate: -8 },
  { x: 18, y: 60, rotate: 5 },
  { x: 28, y: 15, rotate: -4 },
  { x: 38, y: 72, rotate: 7 },
  { x: 50, y: 30, rotate: -6 },
  { x: 62, y: 65, rotate: 4 },
  { x: 72, y: 20, rotate: -10 },
  { x: 82, y: 50, rotate: 6 },
  { x: 90, y: 75, rotate: -3 },
  { x: 15, y: 82, rotate: 8 },
  { x: 45, y: 82, rotate: -5 },
  { x: 58, y: 12, rotate: 9 },
  { x: 76, y: 38, rotate: -7 },
  { x: 30, y: 44, rotate: 3 },
]

export default function TechStackScene() {
  return (
    <div
      data-stack-scene
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0 }}
    >
      {techStack.map((tech, i) => {
        const pos = positions[i % positions.length]
        return (
          <div
            key={tech.label}
            data-stack-chip={tech.label}
            className="absolute will-change-[transform,opacity]"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: `rotate(${pos.rotate}deg) translate(-50%, -50%)`,
            }}
          >
            <span
              className="chip text-sm"
              style={{ opacity: 0.85 }}
            >
              {tech.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
