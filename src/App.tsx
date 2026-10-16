import { useState } from 'react'
import { COLUMNS, type JobCard } from './board'

export default function App() {
  const [cards] = useState<JobCard[]>([])

  return (
    <main>
      <h1>Job Hunt Board</h1>
      <div className="board">
        {COLUMNS.map((column) => {
          const cardsInColumn = cards.filter((card) => card.column === column)
          return (
            <section key={column} className="column" aria-label={column}>
              <h2>{column}</h2>
              {cardsInColumn.length === 0 && <p className="empty">No cards yet</p>}
              <ul>
                {cardsInColumn.map((card) => (
                  <li key={card.id}>
                    {card.company} – {card.role}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </main>
  )
}
