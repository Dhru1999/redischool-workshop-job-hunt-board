export const COLUMNS = ['Wishlist', 'Applied', 'Interview', 'Offer'] as const

export type Column = (typeof COLUMNS)[number]

export type JobCard = {
  id: string
  company: string
  role: string
  column: Column
}
