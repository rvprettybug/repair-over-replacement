import { Star } from 'lucide-react'

export default function Rating({ value = 0, count, size = 14, showValue = true }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={i < Math.round(value) ? 'fill-clay-400 text-clay-400' : 'fill-transparent text-ink-900/20 dark:text-cream-100/20'}
          />
        ))}
      </div>
      {showValue && <span className="text-sm font-medium text-ink-800 dark:text-cream-200">{value.toFixed(1)}</span>}
      {count !== undefined && <span className="text-sm text-ink-700/60 dark:text-cream-300/60">({count})</span>}
    </div>
  )
}
