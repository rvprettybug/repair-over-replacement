import { useState } from 'react'
import { Check, X, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { readStore, writeStore } from '../utils/storage'
import { REPAIR_STATUSES } from '../data/mockData'
import EmptyState from '../components/EmptyState'
import { Inbox } from 'lucide-react'

const EARNINGS = [
  { month: 'Mar', value: 18400 },
  { month: 'Apr', value: 22100 },
  { month: 'May', value: 19800 },
  { month: 'Jun', value: 26500 },
  { month: 'Jul', value: 31200 },
  { month: 'Aug', value: 28700 },
]

export default function RepairerDashboard() {
  const { user } = useAuth()
  const { showToast } = useToast()
  // Repairer sees all pending/assigned requests platform-wide in this demo,
  // simulating a shared request pool since there's no real backend.
  const [requests, setRequests] = useState(() => readStore('repairRequests', []))

  function updateStatus(id, status) {
    const next = requests.map((r) => (r.id === id ? { ...r, status } : r))
    setRequests(next)
    writeStore('repairRequests', next)
    showToast(`Request marked as ${status}.`, 'success')
  }

  const pending = requests.filter((r) => r.status === 'Pending')
  const active = requests.filter((r) => ['Accepted', 'Repair in Progress', 'Ready for Pickup'].includes(r.status))
  const completed = requests.filter((r) => r.status === 'Completed')
  const totalEarnings = completed.length * 1850

  const maxEarning = Math.max(...EARNINGS.map((e) => e.value))

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Repairer Dashboard</h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">Welcome back, {user.name.split(' ')[0]}.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Stat label="Total Requests" value={requests.length} />
        <Stat label="Pending Requests" value={pending.length} />
        <Stat label="Active Repairs" value={active.length} />
        <Stat label="Completed" value={completed.length} />
        <Stat label="Total Earnings" value={`₹${totalEarnings.toLocaleString('en-IN')}`} />
        <Stat label="Average Rating" value="4.7" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-10">
        <div>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50 mb-4">Repair Requests</h2>
          {requests.length === 0 ? (
            <EmptyState icon={Inbox} title="No requests yet" message="New repair requests from customers will appear here." />
          ) : (
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs text-ink-700/50 dark:text-cream-300/50">{r.id}</p>
                      <p className="font-medium text-ink-900 dark:text-cream-50">{r.productName} — {r.problem}</p>
                      <p className="text-sm text-ink-700/60 dark:text-cream-300/60">{r.location} · {r.urgency}</p>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 h-fit">{r.status}</span>
                  </div>

                  {r.status === 'Pending' ? (
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => updateStatus(r.id, 'Accepted')} className="text-sm font-medium px-3 py-1.5 rounded-full bg-emerald-600 text-white inline-flex items-center gap-1.5">
                        <Check size={14} /> Accept
                      </button>
                      <button onClick={() => updateStatus(r.id, 'Cancelled')} className="text-sm font-medium px-3 py-1.5 rounded-full border border-red-200 text-red-600 dark:border-red-900/40 dark:text-red-300 inline-flex items-center gap-1.5">
                        <X size={14} /> Reject
                      </button>
                    </div>
                  ) : (
                    !['Completed', 'Cancelled'].includes(r.status) && (
                      <div className="mt-3">
                        <select
                          value={r.status}
                          onChange={(e) => updateStatus(r.id, e.target.value)}
                          className="text-sm rounded-full border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-1.5 text-ink-800 dark:text-cream-200"
                        >
                          {REPAIR_STATUSES.filter((s) => s !== 'Pending').map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-5 h-fit">
          <h2 className="font-display font-semibold text-ink-900 dark:text-cream-50 mb-4 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-emerald-600" /> Monthly Earnings
          </h2>
          <div className="flex items-end gap-2 h-32">
            {EARNINGS.map((e) => (
              <div key={e.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-emerald-500 dark:bg-emerald-600 rounded-t-md"
                  style={{ height: `${(e.value / maxEarning) * 100}%` }}
                  title={`₹${e.value.toLocaleString('en-IN')}`}
                />
                <span className="text-[10px] text-ink-700/60 dark:text-cream-300/60">{e.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-emerald-50 dark:bg-ink-800 rounded-ticket py-5 text-center">
      <p className="font-display text-2xl font-bold text-emerald-700 dark:text-emerald-300">{value}</p>
      <p className="text-xs text-ink-700/70 dark:text-cream-300/70 mt-1">{label}</p>
    </div>
  )
}
