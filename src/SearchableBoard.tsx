import { useState } from 'react'
import { COLUMNS, type Card, type ColumnName } from './board.ts'
import Column from './Column.tsx'

type BoardProps = {
  cards: Card[]
  onMove: (id: number, step: -1 | 1) => void
  onDrop: (id: number, column: ColumnName) => void
  onUpdate: (id: number, changes: Partial<Card>) => void
  onDelete: (id: number) => void
}

export default function SearchableBoard({ cards, onMove, onDrop, onUpdate, onDelete }: BoardProps) {
  const [search, setSearch] = useState('')
  const [stage, setStage] = useState('All')
  const query = search.trim().toLowerCase()
  const visibleCards = cards.filter((card) => stage === 'All' || card.column === stage)
  const matchingIds = visibleCards.filter((card) =>
    query && `${card.company} ${card.role}`.toLowerCase().includes(query),
  ).map((card) => card.id)

  return (
    <>
      <div className="board-filters" role="search" aria-label="Find applications">
        <label>
          Search company or role
          <input type="search" value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applications" />
        </label>
        <label>
          Stage
          <select value={stage} onChange={(event) => setStage(event.target.value)}>
            <option value="All">All stages</option>
            {COLUMNS.map((name) => <option key={name}>{name}</option>)}
          </select>
        </label>
        <button type="button" disabled={!search && stage === 'All'}
          onClick={() => { setSearch(''); setStage('All') }}>
          Clear filters
        </button>
      </div>
      <p role="status">
        Showing {visibleCards.length} of {cards.length} applications.
        {query && ` ${matchingIds.length} search matches highlighted. Other cards remain visible.`}
      </p>
      <div className="board">
        {COLUMNS.filter((name) => stage === 'All' || name === stage).map((name) => (
          <Column key={name} name={name}
            matchingIds={matchingIds}
            cards={visibleCards.filter((card) => card.column === name)}
            onMove={onMove} onDrop={onDrop} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </>
  )
}
