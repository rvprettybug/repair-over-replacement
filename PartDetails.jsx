import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Puzzle, Minus, Plus, Truck, ShieldCheck } from 'lucide-react'
import { SPARE_PARTS } from '../data/mockData'
import Rating from '../components/Rating'
import EmptyState from '../components/EmptyState'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function PartDetails() {
  const { id } = useParams()
  const part = SPARE_PARTS.find((p) => p.id === id)
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()
  const { showToast } = useToast()

  if (!part) return <EmptyState title="Part not found" message="This spare part may no longer be available." />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-2 gap-10">
      <div className="aspect-square rounded-ticket bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
        <Puzzle size={80} className="text-emerald-400 dark:text-emerald-300" />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-clay-600 dark:text-clay-300 font-medium">{part.category}</p>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50 mt-1">{part.name}</h1>
        <div className="mt-2"><Rating value={part.rating} count={part.reviewCount} /></div>
        <p className="font-display text-3xl font-bold text-ink-900 dark:text-cream-50 mt-4">₹{part.price.toLocaleString('en-IN')}</p>
        <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-2">{part.compatibility}</p>

        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center border border-ink-900/15 dark:border-cream-100/20 rounded-full">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-ink-700 dark:text-cream-300" aria-label="Decrease quantity"><Minus size={14} /></button>
            <span className="w-8 text-center text-sm font-medium text-ink-900 dark:text-cream-50">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="p-2 text-ink-700 dark:text-cream-300" aria-label="Increase quantity"><Plus size={14} /></button>
          </div>
          <button
            onClick={() => { addItem(part, qty); showToast('Added to cart.', 'success') }}
            disabled={part.stock === 0}
            className="flex-1 py-2.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-40"
          >
            {part.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        <div className="mt-6 space-y-2 text-sm text-ink-700/70 dark:text-cream-300/70">
          <p className="flex items-center gap-2"><Truck size={15} /> Ships in 2–4 business days</p>
          <p className="flex items-center gap-2"><ShieldCheck size={15} /> 6-month replacement warranty</p>
        </div>

        <Link to="/spare-parts" className="inline-block mt-6 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">← Back to Spare Parts</Link>
      </div>
    </div>
  )
}
