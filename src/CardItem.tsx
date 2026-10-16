import type { Card } from './board.ts'

type CardItemProps = {
  card: Card
  isMatch: boolean
  isFirst: boolean
  isLast: boolean
  onMove: (id: number, step: -1 | 1) => void
  onUpdate: (id: number, changes: Partial<Card>) => void
  onDelete: (id: number) => void
}

export default function CardItem({ card, isMatch, isFirst, isLast, onMove, onUpdate, onDelete }: CardItemProps) {
  const label = `${card.company} – ${card.role}`

  return (
    <li
      className={`card stage-${card.column.toLowerCase()}${isMatch ? ' search-match' : ''}`}
      draggable
      onDragStart={(event) => event.dataTransfer.setData('text/plain', String(card.id))}
    >
      <p className="card-title">{label}</p>
      {isMatch && <p className="match-label">Search match</p>}
      <label className="card-field">
        Date
        <input
          type="date"
          value={card.date}
          onChange={(event) => onUpdate(card.id, { date: event.target.value })}
        />
      </label>
      <label className="card-field">
        Note
        <textarea
          rows={2}
          value={card.note}
          onChange={(event) => onUpdate(card.id, { note: event.target.value })}
          placeholder="e.g. Interview with the team lead"
        />
      </label>
      <div className="card-actions">
        <button
          type="button"
          onClick={() => onMove(card.id, -1)}
          disabled={isFirst}
          aria-label={`Move ${label} back`}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => onMove(card.id, 1)}
          disabled={isLast}
          aria-label={`Move ${label} forward`}
        >
          Forward →
        </button>
        <button
          type="button"
          className="delete"
          onClick={() => onDelete(card.id)}
          aria-label={`Delete ${label}`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}
