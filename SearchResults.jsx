import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import { REPAIRERS, SPARE_PARTS, CATEGORIES } from '../data/mockData'
import RepairerCard from '../components/RepairerCard'
import ProductCard from '../components/ProductCard'
import EmptyState from '../components/EmptyState'

export default function SearchResults() {
  const [params] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()

  const repairers = useMemo(() => REPAIRERS.filter((r) => r.name.toLowerCase().includes(q) || r.specialty.toLowerCase().includes(q) || r.city.toLowerCase().includes(q)), [q])
  const parts = useMemo(() => SPARE_PARTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)), [q])
  const categories = useMemo(() => CATEGORIES.filter((c) => c.label.toLowerCase().includes(q)), [q])

  const total = repairers.length + parts.length + categories.length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">
        Search results for "{params.get('q')}"
      </h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">{total} results found</p>

      {total === 0 ? (
        <EmptyState icon={SearchX} title="No results found" message="Try a different keyword, or browse repairers and spare parts directly." />
      ) : (
        <div className="space-y-12 mt-8">
          {categories.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-ink-900 dark:text-cream-50 mb-3">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link key={c.id} to={`/find-repairer?category=${c.id}`} className="text-sm font-medium px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    {c.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {repairers.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-ink-900 dark:text-cream-50 mb-3">Repairers</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {repairers.map((r) => <RepairerCard key={r.id} repairer={r} />)}
              </div>
            </section>
          )}

          {parts.length > 0 && (
            <section>
              <h2 className="font-display font-semibold text-ink-900 dark:text-cream-50 mb-3">Spare Parts</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {parts.map((p) => <ProductCard key={p.id} part={p} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
