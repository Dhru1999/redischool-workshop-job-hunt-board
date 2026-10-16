import { useEffect, useState } from 'react'
import { COLUMNS, loadCards, saveCards, type Card, type ColumnName } from './board.ts'
import AddForm from './AddForm.tsx'
import SearchableBoard from './SearchableBoard.tsx'

export default function App() {
  const [cards, setCards] = useState<Card[]>(loadCards)

  // Save to this browser whenever the cards change, so they survive a reload.
  useEffect(() => {
    saveCards(cards)
  }, [cards])

  function addCard(company: string, role: string) {
    setCards((current) => {
      const nextId = Math.max(0, ...current.map((card) => card.id)) + 1
      return [...current, { id: nextId, company, role, column: 'Wishlist', note: '', date: '' }]
    })
  }

  function moveCard(id: number, step: -1 | 1) {
    setCards((current) =>
      current.map((card) => {
        if (card.id !== id) return card
        const newIndex = COLUMNS.indexOf(card.column) + step
        if (newIndex < 0 || newIndex >= COLUMNS.length) return card
        return { ...card, column: COLUMNS[newIndex] }
      }),
    )
  }

  function dropCard(id: number, column: ColumnName) {
    updateCard(id, { column })
  }

  function updateCard(id: number, changes: Partial<Card>) {
    setCards((current) => current.map((card) => (card.id === id ? { ...card, ...changes } : card)))
  }

  function deleteCard(id: number) {
    setCards((current) => current.filter((card) => card.id !== id))
  }

  return (
    <main>
      <h1>Job Hunt Board</h1>
      <AddForm onAdd={addCard} />
      <SearchableBoard
        cards={cards}
        onMove={moveCard}
        onDrop={dropCard}
        onUpdate={updateCard}
        onDelete={deleteCard}
      />
    </main>
  )
}
