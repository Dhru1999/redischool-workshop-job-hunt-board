import { useState } from 'react'
import AddCardForm from './AddCardForm'
import { COLUMNS, type JobCard } from './board'

export default function App() {
  const [cards, setCards] = useState<JobCard[]>([])

  function addCard(company: string, role: string) {
    const newCard: JobCard = { id: crypto.randomUUID(), company, role, column: 'Wishlist' }
    setCards([...cards, newCard])
  }

  return (
    <main>
      <h1>Job Hunt Board</h1>
      <AddCardForm onAdd={addCard} />
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
