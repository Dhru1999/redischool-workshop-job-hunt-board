import { useState, type FormEvent } from 'react'
import { COLUMNS, type Card, type ColumnName } from './board.ts'
import SearchableBoard from './SearchableBoard.tsx'

export default function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [nextId, setNextId] = useState(1)
  const [error, setError] = useState('')

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedCompany = company.trim()
    const trimmedRole = role.trim()
    if (!trimmedCompany || !trimmedRole) {
      setError('Please enter both a company and a role.')
      return
    }
    setCards([
      ...cards,
      { id: nextId, company: trimmedCompany, role: trimmedRole, column: 'Wishlist' },
    ])
    setNextId(nextId + 1)
    setCompany('')
    setRole('')
    setError('')
  }

  function moveCard(id: number, step: -1 | 1) {
    setCards(
      cards.map((card) => {
        if (card.id !== id) return card
        const newIndex = COLUMNS.indexOf(card.column) + step
        if (newIndex < 0 || newIndex >= COLUMNS.length) return card
        return { ...card, column: COLUMNS[newIndex] }
      }),
    )
  }

  function dropCard(id: number, column: ColumnName) {
    setCards(cards.map((card) => (card.id === id ? { ...card, column } : card)))
  }

  function deleteCard(id: number) {
    setCards(cards.filter((card) => card.id !== id))
  }

  return (
    <main>
      <h1>Job Hunt Board</h1>
      <form className="add-form" onSubmit={handleAdd} noValidate>
        <label>
          Company
          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Example GmbH"
          />
        </label>
        <label>
          Role
          <input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="Junior Developer"
          />
        </label>
        <button type="submit">Add to Wishlist</button>
      </form>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      <SearchableBoard cards={cards} onMove={moveCard} onDrop={dropCard} onDelete={deleteCard} />
    </main>
  )
}
