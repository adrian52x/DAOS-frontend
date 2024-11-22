import { createFileRoute, Navigate } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useAuth } from '../../auth/AuthContext'

export const Route = createFileRoute('/(auth)/register')({
  component: Register,
})

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { user, setUser } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
      })
      const data = await response.json()

      if (response.ok) {
        setUser(data)
        alert('Register successful')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!user) {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />

        <button className="underline" type="submit">
          Register
        </button>
      </form>
    )
  } else {
    return <Navigate to="/" />
  }
}
