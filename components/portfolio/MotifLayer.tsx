'use client'

const motifs = [
  { id: 'm1', x: 8, y: 30, char: '</>', size: 13, opacity: 0.07, rotate: -12 },
  { id: 'm2', x: 88, y: 55, char: '{ }', size: 11, opacity: 0.06, rotate: 8 },
  { id: 'm3', x: 22, y: 65, char: '//', size: 10, opacity: 0.06, rotate: -5 },
  { id: 'm4', x: 74, y: 22, char: '=>', size: 12, opacity: 0.07, rotate: 15 },
  { id: 'm5', x: 55, y: 80, char: '( )', size: 10, opacity: 0.05, rotate: -8 },
  { id: 'm6', x: 38, y: 14, char: '&&', size: 11, opacity: 0.06, rotate: 6 },
]

const midBlobs = [
  { id: 'mb1', x: 25, y: 35, w: 16, h: 13, color: '#FFB0C8', opacity: 0.14, br: '55% 45% 60% 40% / 50% 50% 48% 52%' },
  { id: 'mb2', x: 72, y: 45, w: 14, h: 12, color: '#FFAABE', opacity: 0.12, br: '40% 60% 45% 55% / 55% 45% 52% 48%' },
  { id: 'mb3', x: 48, y: 20, w: 12, h: 10, color: '#FFC4D4', opacity: 0.1, br: '60% 40% 52% 48% / 44% 56% 50% 50%' },
]

export default function MotifLayer() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none" data-motif-layer>
      {midBlobs.map((b) => (
        <div
          key={b.id}
          className="absolute will-change-transform"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.w}%`,
            height: `${b.h}%`,
            background: b.color,
            opacity: b.opacity,
            borderRadius: b.br,
            filter: 'blur(24px)',
          }}
        />
      ))}

      {motifs.map((m) => (
        <div
          key={m.id}
          className="font-mono select-none absolute"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            fontSize: `${m.size}px`,
            opacity: m.opacity,
            transform: `rotate(${m.rotate}deg)`,
            color: '#E85D8A',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          {m.char}
        </div>
      ))}
    </div>
  )
}
