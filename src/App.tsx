import { useEffect, useState } from 'react'
import { COLUMNS, loadCards, saveCards, type Card, type ColumnName } from './board.ts'
import AddForm from './AddForm.tsx'
import SearchableBoard from './SearchableBoard.tsx'
import OfferCelebration from './OfferCelebration.tsx'

export default function App() {
  const [cards, setCards] = useState<Card[]>(loadCards)
  const [celebration, setCelebration] = useState(0)

  useEffect(() => {
    if (!celebration) return
    const timer = window.setTimeout(() => setCelebration(0), 3500)
    return () => window.clearTimeout(timer)
  }, [celebration])

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
    const card = cards.find((item) => item.id === id)
    if (!card) return
    const column = COLUMNS[COLUMNS.indexOf(card.column) + step]
    if (column) updateCard(id, { column })
  }

  function dropCard(id: number, column: ColumnName) {
    updateCard(id, { column })
  }

  function updateCard(id: number, changes: Partial<Card>) {
    const card = cards.find((item) => item.id === id)
    if (card && card.column !== 'Offer' && changes.column === 'Offer') {
      setCelebration(Date.now())
    }
    setCards((current) => current.map((card) => (card.id === id ? { ...card, ...changes } : card)))
  }

  function deleteCard(id: number) {
    setCards((current) => current.filter((card) => card.id !== id))
  }

  return (
    <main>
      <h1>Job Hunt Board</h1>
      {celebration > 0 && <OfferCelebration key={celebration} />}
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
