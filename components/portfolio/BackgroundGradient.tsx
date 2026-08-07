'use client'

/**
 * Layer 00 — full-canvas pink→white gradient, always opaque.
 * Slowest parallax: only a tiny scale/shift from pointer.
 */
export default function BackgroundGradient() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 will-change-transform"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 20%, #FFE0EC 0%, #FFF7F9 45%, #FFFFFF 100%)',
      }}
    />
  )
}
