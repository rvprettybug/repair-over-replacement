import { createContext, useContext, useState } from 'react'
import { readStore, writeStore, removeStore, generateId } from '../utils/storage'

const AuthContext = createContext(null)

// Simulated auth: "users" is a local directory of accounts (never do this
// with real passwords in production — a real backend would hash + verify
// server-side). "session" is the currently logged-in user.

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStore('session', null))

  function signup({ name, email, password, role }) {
    const users = readStore('users', [])
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: generateId('USR'),
      name,
      email,
      password, // demo only
      role, // 'customer' | 'repairer'
      savedRepairers: [],
      createdAt: new Date().toISOString(),
    }
    writeStore('users', [...users, newUser])
    writeStore('session', newUser)
    setUser(newUser)
    return { ok: true, user: newUser }
  }

  function login({ email, password }) {
    const users = readStore('users', [])
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { ok: false, error: 'Invalid email or password.' }
    writeStore('session', found)
    setUser(found)
    return { ok: true, user: found }
  }

  function logout() {
    removeStore('session')
    setUser(null)
  }

  function updateUser(patch) {
    const users = readStore('users', [])
    const updated = { ...user, ...patch }
    writeStore('users', users.map((u) => (u.id === updated.id ? updated : u)))
    writeStore('session', updated)
    setUser(updated)
  }

  function toggleSavedRepairer(repairerId) {
    if (!user) return
    const saved = user.savedRepairers || []
    const next = saved.includes(repairerId)
      ? saved.filter((id) => id !== repairerId)
      : [...saved, repairerId]
    updateUser({ savedRepairers: next })
    return next.includes(repairerId)
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser, toggleSavedRepairer }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
