import type { CSSProperties } from 'react'

export default function OfferCelebration() {
  const colors = ['#db2777', '#2563eb', '#16a34a', '#eab308', '#9333ea']

  return (
    <div className="offer-celebration">
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 60 }, (_, index) => (
          <span key={index} style={{
            left: `${(index * 37) % 100}%`,
            backgroundColor: colors[index % colors.length],
            animationDelay: `${(index % 8) * 0.08}s`,
            '--drift': `${(index % 2 ? 1 : -1) * (40 + index % 100)}px`,
          } as CSSProperties} />
        ))}
      </div>
      <div className="celebration-message" role="status">
        Congratulations!!!
      </div>
    </div>
  )
}
