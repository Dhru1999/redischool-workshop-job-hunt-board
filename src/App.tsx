import { useState } from 'react'
import AddCardForm from './AddCardForm'
import { COLUMNS, type JobCard } from './board'
import CardItem from './CardItem'

export default function App() {
  const [cards, setCards] = useState<JobCard[]>([])

  function addCard(company: string, role: string) {
    const newCard: JobCard = { id: crypto.randomUUID(), company, role, column: 'Wishlist' }
    setCards([...cards, newCard])
  }

  function moveCard(id: string, step: -1 | 1) {
    setCards(
      cards.map((card) => {
        if (card.id !== id) return card
        const newColumn = COLUMNS[COLUMNS.indexOf(card.column) + step]
        return newColumn ? { ...card, column: newColumn } : card
      }),
    )
  }

  function deleteCard(id: string) {
    setCards(cards.filter((card) => card.id !== id))
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
                  <CardItem key={card.id} card={card} onMove={moveCard} onDelete={deleteCard} />
                ))}
              </ul>
            </section>
          )
        })}
      </div>
    </main>
  )
}
