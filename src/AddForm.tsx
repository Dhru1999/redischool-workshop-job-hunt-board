import { useState, type FormEvent } from 'react'

type AddFormProps = {
  onAdd: (company: string, role: string) => void
}

export default function AddForm({ onAdd }: AddFormProps) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedCompany = company.trim()
    const trimmedRole = role.trim()
    if (!trimmedCompany || !trimmedRole) {
      setError('Please enter both a company and a role.')
      return
    }
    onAdd(trimmedCompany, trimmedRole)
    setCompany('')
    setRole('')
    setError('')
  }

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit} noValidate>
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
    </>
  )
}
