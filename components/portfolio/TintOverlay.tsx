'use client'

export default function TintOverlay() {
  return (
    <div
      aria-hidden="true"
      data-tint-overlay
      className="absolute inset-0 pointer-events-none will-change-[opacity]"
      style={{
        background: 'rgba(255, 247, 249, 0.0)',
        opacity: 0,
      }}
    />
  )
}
