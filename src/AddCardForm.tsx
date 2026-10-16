import { useState, type FormEvent } from 'react'

type Props = {
  onAdd: (company: string, role: string) => void
}

export default function AddCardForm({ onAdd }: Props) {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedCompany = company.trim()
    const trimmedRole = role.trim()
    if (trimmedCompany === '' || trimmedRole === '') {
      setError('Please enter both a company and a role.')
      return
    }
    onAdd(trimmedCompany, trimmedRole)
    setCompany('')
    setRole('')
    setError('')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>
      <label>
        Company
        <input value={company} onChange={(event) => setCompany(event.target.value)} />
      </label>
      <label>
        Role
        <input value={role} onChange={(event) => setRole(event.target.value)} />
      </label>
      <button type="submit">Add</button>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
