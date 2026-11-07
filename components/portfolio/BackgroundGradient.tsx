'use client'

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
