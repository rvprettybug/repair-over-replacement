import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import EmptyState from '../components/EmptyState'

export default function Cart() {
  const { items, setQty, removeItem, total, clearCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [placed, setPlaced] = useState(false)
  const [orderId, setOrderId] = useState('')

  function checkout() {
    if (!user) {
      showToast('Please log in to check out.', 'info')
      navigate('/login')
      return
    }
    const id = `ORD-${Date.now().toString(36).toUpperCase()}`
    setOrderId(id)
    setPlaced(true)
    clearCart()
    showToast('Order placed successfully!', 'success')
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">Order placed!</h1>
        <p className="text-ink-700/70 dark:text-cream-300/70 mt-2">Order ID: <span className="font-mono font-medium">{orderId}</span></p>
        <Link to="/spare-parts" className="inline-block mt-6 px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium">Continue Shopping</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          message="Browse spare parts to find what you need for your next repair."
          action={<Link to="/spare-parts" className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium">Browse Spare Parts</Link>}
        />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50 mb-8">Your Cart</h1>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-center gap-4 bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-ink-900 dark:text-cream-50 truncate">{i.name}</p>
              <p className="text-sm text-ink-700/60 dark:text-cream-300/60">₹{i.price.toLocaleString('en-IN')} each</p>
            </div>
            <div className="flex items-center border border-ink-900/15 dark:border-cream-100/20 rounded-full">
              <button onClick={() => setQty(i.id, i.qty - 1)} className="p-1.5" aria-label="Decrease quantity"><Minus size={13} /></button>
              <span className="w-7 text-center text-sm">{i.qty}</span>
              <button onClick={() => setQty(i.id, i.qty + 1)} className="p-1.5" aria-label="Increase quantity"><Plus size={13} /></button>
            </div>
            <p className="w-20 text-right font-medium text-ink-900 dark:text-cream-50">₹{(i.price * i.qty).toLocaleString('en-IN')}</p>
            <button onClick={() => removeItem(i.id)} aria-label="Remove item" className="text-ink-700/40 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-5 mt-6 flex items-center justify-between">
        <span className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">Total</span>
        <span className="font-display text-2xl font-bold text-emerald-700 dark:text-emerald-300">₹{total.toLocaleString('en-IN')}</span>
      </div>

      <button onClick={checkout} className="w-full mt-4 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700">
        Checkout
      </button>
    </div>
  )
}
