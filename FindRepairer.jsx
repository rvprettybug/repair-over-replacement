import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { CATEGORIES, CITIES, REPAIRERS } from '../data/mockData'
import RepairerCard from '../components/RepairerCard'
import EmptyState from '../components/EmptyState'
import { Search } from 'lucide-react'

export default function FindRepairer() {
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || '')
  const [city, setCity] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1500)
  const [sort, setSort] = useState('rating')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const results = useMemo(() => {
    let list = REPAIRERS.filter((r) => {
      if (category && r.category !== category) return false
      if (city && r.city !== city) return false
      if (r.rating < minRating) return false
      if (r.startingPrice > maxPrice) return false
      return true
    })
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    if (sort === 'price') list = [...list].sort((a, b) => a.startingPrice - b.startingPrice)
    if (sort === 'distance') list = [...list].sort((a, b) => a.distanceKm - b.distanceKm)
    return list
  }, [category, city, minRating, maxPrice, sort])

  function clearFilters() {
    setCategory('')
    setCity('')
    setMinRating(0)
    setMaxPrice(1500)
    setParams({})
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Find a Repairer</h1>
        <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">{results.length} repairers ready to help near you.</p>
      </div>

      <button
        onClick={() => setFiltersOpen((o) => !o)}
        className="lg:hidden mb-4 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-ink-900/15 dark:border-cream-100/20 text-ink-800 dark:text-cream-200"
      >
        <SlidersHorizontal size={15} /> Filters
      </button>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-5 h-fit`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-ink-900 dark:text-cream-50">Filters</h2>
            <button onClick={clearFilters} className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline">Clear all</button>
          </div>

          <FilterGroup label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
              <option value="">All categories</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label="Location">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="filter-select">
              <option value="">All cities</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </FilterGroup>

          <FilterGroup label={`Minimum rating: ${minRating.toFixed(1)}+`}>
            <input type="range" min="0" max="5" step="0.5" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full accent-emerald-600" />
          </FilterGroup>

          <FilterGroup label={`Max starting price: ₹${maxPrice}`}>
            <input type="range" min="200" max="1500" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-emerald-600" />
          </FilterGroup>

          <FilterGroup label="Sort by">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="filter-select">
              <option value="rating">Highest Rating</option>
              <option value="price">Lowest Price</option>
              <option value="distance">Nearest Distance</option>
            </select>
          </FilterGroup>
        </aside>

        <div>
          {results.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No repairers match your filters"
              message="Try widening your rating or price range, or clear filters to see everyone."
              action={<button onClick={clearFilters} className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium">Clear filters</button>}
            />
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((r) => <RepairerCard key={r.id} repairer={r} />)}
            </div>
          )}
        </div>
      </div>

      <style>{`.filter-select { width:100%; border-radius:8px; border:1px solid rgba(15,46,35,0.15); background:transparent; padding:6px 10px; font-size:14px; }`}</style>
    </div>
  )
}

function FilterGroup({ label, children }) {
  return (
    <div className="mb-5">
      <label className="text-xs font-medium text-ink-700/70 dark:text-cream-300/70 block mb-1.5">{label}</label>
      {children}
    </div>
  )
}
