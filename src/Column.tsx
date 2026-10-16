import { COLUMNS, type Card, type ColumnName } from './board.ts'

type ColumnProps = {
  name: ColumnName
  cards: Card[]
  onMove: (id: number, step: -1 | 1) => void
  onDelete: (id: number) => void
}

export default function Column({ name, cards, onMove, onDelete }: ColumnProps) {
  const index = COLUMNS.indexOf(name)
  const isFirst = index === 0
  const isLast = index === COLUMNS.length - 1

  return (
    <section className="column" aria-labelledby={`column-${name}`}>
      <h2 id={`column-${name}`}>
        {name} <span className="count">({cards.length})</span>
      </h2>
      {cards.length === 0 && <p className="empty">No cards yet.</p>}
      <ul>
        {cards.map((card) => {
          const label = `${card.company} – ${card.role}`
          return (
            <li key={card.id} className="card">
              <p>{label}</p>
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
        })}
      </ul>
    </section>
  )
}
