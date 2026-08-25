import { useMemo, useState } from 'react'
import { SPARE_PART_CATEGORIES, SPARE_PARTS } from '../data/mockData'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'
import { PackageX } from 'lucide-react'

export default function SpareParts() {
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('popular')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    let list = SPARE_PARTS.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()))
    if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [category, sort, query])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Spare Parts</h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">Genuine and compatible parts for DIY repairs.</p>

      <div className="flex flex-wrap items-center gap-2 mt-6 mb-6">
        <FilterChip active={category === 'All'} onClick={() => setCategory('All')}>All</FilterChip>
        {SPARE_PART_CATEGORIES.map((c) => (
          <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</FilterChip>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search parts…"
            className="rounded-full border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-1.5 text-sm outline-none text-ink-900 dark:text-cream-50"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-1.5 text-sm text-ink-900 dark:text-cream-50">
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <EmptyState icon={PackageX} title="No parts found" message="Try a different category or search term." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {results.map((p) => <ProductCard key={p.id} part={p} />)}
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
        active ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-ink-900/15 dark:border-cream-100/20 text-ink-800 dark:text-cream-200'
      }`}
    >
      {children}
    </button>
  )
}
