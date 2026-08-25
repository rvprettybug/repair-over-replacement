import { Wrench } from 'lucide-react'

export function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-ink-700/60 dark:text-cream-300/60">
      <Wrench size={26} className="animate-spin mb-3" style={{ animationDuration: '1.8s' }} />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-ink-900/10 dark:bg-cream-100/10" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 bg-ink-900/10 dark:bg-cream-100/10 rounded" />
          <div className="h-2.5 w-1/2 bg-ink-900/10 dark:bg-cream-100/10 rounded" />
        </div>
      </div>
      <div className="h-2.5 w-1/3 bg-ink-900/10 dark:bg-cream-100/10 rounded mb-2" />
      <div className="h-2.5 w-1/2 bg-ink-900/10 dark:bg-cream-100/10 rounded" />
    </div>
  )
}
