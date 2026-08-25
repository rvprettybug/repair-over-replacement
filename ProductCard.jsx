import { Link } from 'react-router-dom'
import { Puzzle } from 'lucide-react'
import Rating from './Rating'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'

export default function ProductCard({ part }) {
  const { addItem } = useCart()
  const { showToast } = useToast()

  function handleAdd(e) {
    e.preventDefault()
    addItem(part, 1)
    showToast('Added to cart.', 'success')
  }

  return (
    <Link to={`/spare-parts/${part.id}`} className="group flex flex-col bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket hover:shadow-lg transition-shadow p-4">
      <div className="aspect-square rounded-lg bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center mb-3">
        <Puzzle size={36} className="text-emerald-400 dark:text-emerald-300" />
      </div>
      <p className="text-xs uppercase tracking-wide text-clay-600 dark:text-clay-300 font-medium">{part.category}</p>
      <h3 className="font-display font-semibold text-ink-900 dark:text-cream-50 leading-snug mt-0.5">{part.name}</h3>
      <p className="text-xs text-ink-700/60 dark:text-cream-300/60 mt-1 line-clamp-2">{part.compatibility}</p>
      <div className="mt-2"><Rating value={part.rating} count={part.reviewCount} size={12} /></div>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="font-semibold text-ink-900 dark:text-cream-50">₹{part.price.toLocaleString('en-IN')}</p>
          <p className={`text-xs ${part.stock > 0 ? 'text-emerald-600 dark:text-emerald-300' : 'text-clay-600'}`}>
            {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
          </p>
        </div>
        <button
          onClick={handleAdd}
          disabled={part.stock === 0}
          className="text-sm font-medium px-3 py-1.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </Link>
  )
}
