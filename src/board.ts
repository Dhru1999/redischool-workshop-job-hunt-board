export const COLUMNS = ['Wishlist', 'Applied', 'Interview', 'Offer'] as const

export type ColumnName = (typeof COLUMNS)[number]

export type Card = {
  id: number
  company: string
  role: string
  column: ColumnName
}
