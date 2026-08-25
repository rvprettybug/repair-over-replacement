import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ShieldCheck, MapPin, Clock, Phone, Heart, MessageCircle, ImageOff } from 'lucide-react'
import { REPAIRERS, REVIEWS } from '../data/mockData'
import Rating from '../components/Rating'
import EmptyState from '../components/EmptyState'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function RepairerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const repairer = REPAIRERS.find((r) => r.id === id)
  const reviews = REVIEWS.filter((r) => r.repairerId === id)
  const { user, toggleSavedRepairer } = useAuth()
  const { showToast } = useToast()
  const [tab, setTab] = useState('services')

  if (!repairer) {
    return <EmptyState title="Repairer not found" message="This profile may have been removed." />
  }

  const saved = user?.savedRepairers?.includes(repairer.id)

  function handleSave() {
    if (!user) { showToast('Log in to save repairers.', 'info'); return }
    const nowSaved = toggleSavedRepairer(repairer.id)
    showToast(nowSaved ? 'Repairer saved.' : 'Removed from saved.', 'success')
  }

  function handleMessage() {
    if (!user) { showToast('Log in to message repairers.', 'info'); return }
    navigate(`/chat?with=${repairer.id}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center font-display text-2xl font-semibold text-emerald-700 dark:text-emerald-200 shrink-0">
            {repairer.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">{repairer.name}</h1>
              {repairer.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 rounded-full px-2 py-0.5">
                  <ShieldCheck size={12} /> Verified
                </span>
              )}
            </div>
            <p className="text-ink-700/70 dark:text-cream-300/70">{repairer.specialty} · {repairer.yearsExperience} yrs experience</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-ink-700/70 dark:text-cream-300/70">
              <Rating value={repairer.rating} count={repairer.reviewCount} />
              <span className="flex items-center gap-1"><MapPin size={14} /> {repairer.city} · {repairer.distanceKm} km</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {repairer.workingHours}</span>
            </div>
          </div>
          <div className="flex sm:flex-col gap-2">
            <Link to={`/repair-request?repairer=${repairer.id}`} className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 text-center">
              Book Repair
            </Link>
            <button onClick={handleMessage} className="px-5 py-2.5 rounded-full border border-ink-900/15 dark:border-cream-100/20 text-sm font-medium text-ink-800 dark:text-cream-200 hover:bg-ink-900/5 dark:hover:bg-cream-100/10 inline-flex items-center justify-center gap-1.5">
              <MessageCircle size={15} /> Message
            </button>
          </div>
        </div>

        <p className="text-sm text-ink-700/80 dark:text-cream-300/80 mt-6 perforated pt-4">{repairer.bio}</p>

        <div className="flex flex-wrap gap-3 mt-4 text-sm text-ink-700/70 dark:text-cream-300/70">
          <span className="flex items-center gap-1"><Phone size={14} /> {repairer.phone}</span>
          <span>{repairer.repairsCompleted} repairs completed</span>
          <span className="text-emerald-700 dark:text-emerald-300 font-medium">{repairer.availability}</span>
        </div>

        <button onClick={handleSave} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-700 dark:text-cream-300">
          <Heart size={16} className={saved ? 'fill-clay-500 text-clay-500' : ''} /> {saved ? 'Saved' : 'Save repairer'}
        </button>
      </div>

      <div className="mt-8">
        <div className="flex gap-1 border-b border-ink-900/10 dark:border-cream-100/10">
          <TabButton active={tab === 'services'} onClick={() => setTab('services')}>Services & Pricing</TabButton>
          <TabButton active={tab === 'work'} onClick={() => setTab('work')}>Previous Work</TabButton>
          <TabButton active={tab === 'reviews'} onClick={() => setTab('reviews')}>Reviews ({reviews.length})</TabButton>
        </div>

        <div className="py-6">
          {tab === 'services' && (
            <div className="grid sm:grid-cols-2 gap-3">
              {repairer.services.map((s) => (
                <div key={s.name} className="flex justify-between items-center bg-cream-50 dark:bg-ink-800 rounded-lg px-4 py-3">
                  <span className="text-sm font-medium text-ink-800 dark:text-cream-200">{s.name}</span>
                  <span className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold">{s.price}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'work' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-ink-900/5 dark:bg-cream-100/5 flex items-center justify-center text-ink-700/30 dark:text-cream-300/30">
                  <ImageOff size={22} />
                </div>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            reviews.length === 0 ? (
              <EmptyState title="No reviews yet" message="Be the first to leave a review after a repair." />
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-cream-50 dark:bg-ink-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-ink-900 dark:text-cream-50">{rev.reviewer}</span>
                      <Rating value={rev.rating} showValue={false} size={12} />
                    </div>
                    <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-1">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
        active ? 'border-emerald-600 text-emerald-700 dark:text-emerald-300' : 'border-transparent text-ink-700/60 dark:text-cream-300/60 hover:text-ink-900 dark:hover:text-cream-50'
      }`}
    >
      {children}
    </button>
  )
}
