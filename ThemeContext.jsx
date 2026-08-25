import { createContext, useContext, useEffect, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => readStore('theme-dark', false))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    writeStore('theme-dark', dark)
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
