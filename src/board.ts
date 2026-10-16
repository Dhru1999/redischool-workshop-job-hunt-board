export const COLUMNS = ['Wishlist', 'Applied', 'Interview', 'Offer'] as const

export type ColumnName = (typeof COLUMNS)[number]

export type Card = {
  id: number
  company: string
  role: string
  column: ColumnName
  note: string
  date: string
}

const STORAGE_KEY = 'job-hunt-board-cards'

// Reads saved cards from this browser. Returns an empty board if nothing
// is saved or the saved data is unreadable.
export function loadCards(): Card[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(saved)) return []
    return saved
      .filter(
        (item) =>
          typeof item?.id === 'number' &&
          typeof item.company === 'string' &&
          typeof item.role === 'string' &&
          COLUMNS.includes(item.column),
      )
      .map((item) => ({
        id: item.id,
        company: item.company,
        role: item.role,
        column: item.column,
        note: typeof item.note === 'string' ? item.note : '',
        date: typeof item.date === 'string' ? item.date : '',
      }))
  } catch {
    return []
  }
}

export function saveCards(cards: Card[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
  } catch {
    // Storage can be blocked (for example in private windows); the board still works.
  }
}
