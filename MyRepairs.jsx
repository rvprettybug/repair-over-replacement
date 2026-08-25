import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PackageSearch, MessageCircle, Star, XCircle } from 'lucide-react'
import { readStore, writeStore } from '../utils/storage'
import { REPAIRERS, CATEGORIES } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import EmptyState from '../components/EmptyState'
import ConfirmDialog from '../components/ConfirmDialog'
import Modal from '../components/Modal'
import Rating from '../components/Rating'

const statusStyles = {
  Pending: 'bg-clay-100 text-clay-700 dark:bg-clay-900/40 dark:text-clay-300',
  Accepted: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'Repair in Progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'Ready for Pickup': 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Completed: 'bg-ink-900/10 text-ink-700 dark:bg-cream-100/10 dark:text-cream-300',
  Cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export default function MyRepairs() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [requests, setRequests] = useState(() => readStore('repairRequests', []).filter((r) => r.userId === user.id))
  const [cancelTarget, setCancelTarget] = useState(null)
  const [reviewTarget, setReviewTarget] = useState(null)
  const [reviewText, setReviewText] = useState('')
  const [reviewStars, setReviewStars] = useState(5)

  function persist(next) {
    const all = readStore('repairRequests', [])
    const merged = all.map((r) => next.find((n) => n.id === r.id) || r)
    writeStore('repairRequests', merged)
    setRequests(next)
  }

  function cancelRequest(id) {
    const next = requests.map((r) => (r.id === id ? { ...r, status: 'Cancelled' } : r))
    persist(next)
    showToast('Repair request cancelled.', 'success')
  }

  function submitReview() {
    const reviews = readStore('userReviews', [])
    writeStore('userReviews', [...reviews, {
      id: `ur-${Date.now()}`,
      requestId: reviewTarget.id,
      repairerId: reviewTarget.repairerId,
      rating: reviewStars,
      comment: reviewText,
    }])
    showToast('Thanks for your review!', 'success')
    setReviewTarget(null)
    setReviewText('')
    setReviewStars(5)
  }

  function categoryLabel(id) {
    return CATEGORIES.find((c) => c.id === id)?.label || id
  }

  if (requests.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <EmptyState
          icon={PackageSearch}
          title="No repair requests yet"
          message="Once you submit a repair request, it'll show up here so you can track its status."
          action={<Link to="/repair-request" className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium">New Repair Request</Link>}
        />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">My Repairs</h1>
        <Link to="/repair-request" className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium">New Repair Request</Link>
      </div>

      <div className="space-y-4">
        {requests.map((r) => {
          const repairer = REPAIRERS.find((rep) => rep.id === r.repairerId)
          return (
            <div key={r.id} className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-ink-700/50 dark:text-cream-300/50">{r.id}</p>
                  <h3 className="font-display font-semibold text-ink-900 dark:text-cream-50 mt-0.5">{r.productName} — {r.problem}</h3>
                  <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-0.5">
                    {categoryLabel(r.category)} · {repairer ? repairer.name : 'Awaiting repairer'} · {r.location}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[r.status]}`}>{r.status}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 perforated pt-4">
                {repairer && (
                  <button onClick={() => navigate(`/chat?with=${repairer.id}`)} className="text-sm font-medium px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-cream-100/20 text-ink-800 dark:text-cream-200 inline-flex items-center gap-1.5">
                    <MessageCircle size={14} /> Message Repairer
                  </button>
                )}
                {r.status === 'Completed' && (
                  <button onClick={() => setReviewTarget(r)} className="text-sm font-medium px-3 py-1.5 rounded-full border border-ink-900/15 dark:border-cream-100/20 text-ink-800 dark:text-cream-200 inline-flex items-center gap-1.5">
                    <Star size={14} /> Leave Review
                  </button>
                )}
                {!['Completed', 'Cancelled'].includes(r.status) && (
                  <button onClick={() => setCancelTarget(r.id)} className="text-sm font-medium px-3 py-1.5 rounded-full border border-red-200 text-red-600 dark:border-red-900/40 dark:text-red-300 inline-flex items-center gap-1.5">
                    <XCircle size={14} /> Cancel
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={() => cancelRequest(cancelTarget)}
        title="Cancel repair request?"
        message="This will mark the repair request as cancelled. You can always submit a new one."
        confirmLabel="Cancel Request"
      />

      <Modal
        open={!!reviewTarget}
        onClose={() => setReviewTarget(null)}
        title="Leave a review"
        footer={<button onClick={submitReview} className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium">Submit Review</button>}
      >
        <div className="space-y-3">
          <Rating value={reviewStars} showValue={false} size={22} />
          <input type="range" min="1" max="5" value={reviewStars} onChange={(e) => setReviewStars(Number(e.target.value))} className="w-full accent-emerald-600" />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={3}
            placeholder="How was your repair experience?"
            className="w-full rounded-lg border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-cream-50 outline-none focus:border-emerald-500"
          />
        </div>
      </Modal>
    </div>
  )
}
