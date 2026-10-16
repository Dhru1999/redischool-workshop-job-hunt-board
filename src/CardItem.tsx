import { COLUMNS, type JobCard } from './board'

type Props = {
  card: JobCard
  onMove: (id: string, step: -1 | 1) => void
  onDelete: (id: string) => void
}

export default function CardItem({ card, onMove, onDelete }: Props) {
  const position = COLUMNS.indexOf(card.column)
  const isFirst = position === 0
  const isLast = position === COLUMNS.length - 1
  const title = `${card.company} – ${card.role}`

  return (
    <li className="card">
      <p className="card-title">{title}</p>
      <div className="card-actions">
        <button
          type="button"
          onClick={() => onMove(card.id, -1)}
          disabled={isFirst}
          aria-label={`Move ${title} back`}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => onMove(card.id, 1)}
          disabled={isLast}
          aria-label={`Move ${title} forward`}
        >
          Forward →
        </button>
        <button type="button" onClick={() => onDelete(card.id)} aria-label={`Delete ${title}`}>
          Delete
        </button>
      </div>
    </li>
  )
}
