'use client'

interface Blob {
  id: string
  cx: number
  cy: number
  rx: number
  ry: number
  color: string
  opacity: number
  borderRadius: string
}

const blobs: Blob[] = [
  {
    id: 'b1',
    cx: 15,
    cy: 18,
    rx: 28,
    ry: 22,
    color: '#FFB3CC',
    opacity: 0.28,
    borderRadius: '62% 38% 55% 45% / 48% 52% 40% 60%',
  },
  {
    id: 'b2',
    cx: 80,
    cy: 12,
    rx: 32,
    ry: 26,
    color: '#FFC8D8',
    opacity: 0.22,
    borderRadius: '44% 56% 62% 38% / 55% 45% 52% 48%',
  },
  {
    id: 'b3',
    cx: 68,
    cy: 72,
    rx: 24,
    ry: 20,
    color: '#FFAAC4',
    opacity: 0.2,
    borderRadius: '58% 42% 48% 52% / 44% 56% 58% 42%',
  },
  {
    id: 'b4',
    cx: 10,
    cy: 75,
    rx: 20,
    ry: 18,
    color: '#FFD0E0',
    opacity: 0.18,
    borderRadius: '50% 50% 40% 60% / 60% 40% 55% 45%',
  },
  {
    id: 'b5',
    cx: 50,
    cy: 50,
    rx: 18,
    ry: 15,
    color: '#FFB8D0',
    opacity: 0.12,
    borderRadius: '60% 40% 52% 48% / 46% 54% 50% 50%',
  },
]

export default function BlobField() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" data-blob-field>
      {blobs.map((b) => (
        <div
          key={b.id}
          data-blob-id={b.id}
          className="absolute will-change-transform"
          style={{
            left: `${b.cx - b.rx}%`,
            top: `${b.cy - b.ry}%`,
            width: `${b.rx * 2}%`,
            height: `${b.ry * 2}%`,
            background: b.color,
            opacity: b.opacity,
            borderRadius: b.borderRadius,
            filter: 'blur(40px)',
          }}
        />
      ))}
    </div>
  )
}
