import { createContext, useContext, useEffect, useState } from 'react'
import { readStore, writeStore } from '../utils/storage'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStore('cart', []))

  useEffect(() => {
    writeStore('cart', items)
  }, [items])

  function addItem(part, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === part.id)
      if (existing) {
        return prev.map((i) => (i.id === part.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: part.id, name: part.name, price: part.price, qty }]
    })
  }

  function setQty(id, qty) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, setQty, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
