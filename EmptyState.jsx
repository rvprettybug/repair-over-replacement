export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center mb-4">
          <Icon size={26} className="text-emerald-500" />
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">{title}</h3>
      {message && <p className="text-sm text-ink-700/60 dark:text-cream-300/60 mt-1 max-w-sm">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
