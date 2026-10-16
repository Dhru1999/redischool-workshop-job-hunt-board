import { useState, type DragEvent } from 'react'
import { COLUMNS, type Card, type ColumnName } from './board.ts'

type ColumnProps = {
  name: ColumnName
  cards: Card[]
  onMove: (id: number, step: -1 | 1) => void
  onDrop: (id: number, column: ColumnName) => void
  onDelete: (id: number) => void
}

export default function Column({ name, cards, onMove, onDrop, onDelete }: ColumnProps) {
  const [isOver, setIsOver] = useState(false)
  const index = COLUMNS.indexOf(name)
  const isFirst = index === 0
  const isLast = index === COLUMNS.length - 1

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setIsOver(false)
    const id = Number(event.dataTransfer.getData('text/plain'))
    if (id) onDrop(id, name)
  }

  return (
    <section
      className={isOver ? 'column drag-over' : 'column'}
      aria-labelledby={`column-${name}`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsOver(true)
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDrop}
    >
      <h2 id={`column-${name}`}>
        {name} <span className="count">({cards.length})</span>
      </h2>
      {cards.length === 0 && <p className="empty">No cards yet.</p>}
      <ul>
        {cards.map((card) => {
          const label = `${card.company} – ${card.role}`
          return (
            <li
              key={card.id}
              className="card"
              draggable
              onDragStart={(event) => event.dataTransfer.setData('text/plain', String(card.id))}
            >
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
