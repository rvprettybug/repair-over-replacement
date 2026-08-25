import { Link } from 'react-router-dom'
import { MapPin, ShieldCheck, Heart } from 'lucide-react'
import Rating from './Rating'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function RepairerCard({ repairer }) {
  const { user, toggleSavedRepairer } = useAuth()
  const { showToast } = useToast()
  const saved = user?.savedRepairers?.includes(repairer.id)

  function handleSave(e) {
    e.preventDefault()
    if (!user) {
      showToast('Log in to save repairers.', 'info')
      return
    }
    const nowSaved = toggleSavedRepairer(repairer.id)
    showToast(nowSaved ? 'Repairer saved.' : 'Removed from saved.', 'success')
  }

  return (
    <Link
      to={`/repairer/${repairer.id}`}
      className="group relative flex flex-col bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-5 tag-notch"
    >
      <button
        onClick={handleSave}
        aria-label={saved ? 'Remove from saved repairers' : 'Save repairer'}
        className="absolute top-4 right-4 text-ink-900/30 hover:text-clay-500 dark:text-cream-100/40"
      >
        <Heart size={18} className={saved ? 'fill-clay-500 text-clay-500' : ''} />
      </button>

      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center font-display font-semibold text-emerald-700 dark:text-emerald-200 shrink-0">
          {repairer.initials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-display font-semibold text-ink-900 dark:text-cream-50 truncate">{repairer.name}</h3>
            {repairer.verified && <ShieldCheck size={15} className="text-emerald-500 shrink-0" aria-label="Verified repairer" />}
          </div>
          <p className="text-sm text-ink-700/70 dark:text-cream-300/70 truncate">{repairer.specialty}</p>
        </div>
      </div>

      <Rating value={repairer.rating} count={repairer.reviewCount} />

      <div className="flex items-center gap-1 text-sm text-ink-700/70 dark:text-cream-300/70 mt-2">
        <MapPin size={14} />
        <span>{repairer.city} · {repairer.distanceKm} km away</span>
      </div>

      <div className="perforated mt-4 pt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-700/60 dark:text-cream-300/60">Starting at</p>
          <p className="font-semibold text-ink-900 dark:text-cream-50">₹{repairer.startingPrice}</p>
        </div>
        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 group-hover:underline">View Profile →</span>
      </div>
    </Link>
  )
}
