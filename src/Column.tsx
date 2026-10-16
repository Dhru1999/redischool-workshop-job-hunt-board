import { useState, type DragEvent } from 'react'
import { COLUMNS, type Card, type ColumnName } from './board.ts'
import CardItem from './CardItem.tsx'

type ColumnProps = {
  name: ColumnName
  cards: Card[]
  onMove: (id: number, step: -1 | 1) => void
  onDrop: (id: number, column: ColumnName) => void
  onUpdate: (id: number, changes: Partial<Card>) => void
  onDelete: (id: number) => void
}

export default function Column({ name, cards, onMove, onDrop, onUpdate, onDelete }: ColumnProps) {
  const [isOver, setIsOver] = useState(false)
  const index = COLUMNS.indexOf(name)

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
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            isFirst={index === 0}
            isLast={index === COLUMNS.length - 1}
            onMove={onMove}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  )
}
