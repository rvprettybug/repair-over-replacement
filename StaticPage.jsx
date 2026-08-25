export default function StaticPage({ title, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50 mb-6">{title}</h1>
      <div className="prose-sm text-ink-700/80 dark:text-cream-300/80 space-y-4 leading-relaxed">{children}</div>
    </div>
  )
}
