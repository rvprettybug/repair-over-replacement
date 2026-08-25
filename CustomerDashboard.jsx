import { Link } from 'react-router-dom'
import { Search, Calculator, FilePlus2, Heart, Clock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { readStore } from '../utils/storage'
import { REPAIRERS } from '../data/mockData'
import RepairerCard from '../components/RepairerCard'
import EmptyState from '../components/EmptyState'

export default function CustomerDashboard() {
  const { user } = useAuth()
  const requests = readStore('repairRequests', []).filter((r) => r.userId === user.id)
  const active = requests.filter((r) => !['Completed', 'Cancelled'].includes(r.status))
  const completed = requests.filter((r) => r.status === 'Completed')
  const saved = REPAIRERS.filter((r) => user.savedRepairers?.includes(r.id))

  const quickActions = [
    { to: '/find-repairer', icon: Search, label: 'Find Repairer' },
    { to: '/estimate', icon: Calculator, label: 'Get Estimate' },
    { to: '/repair-request', icon: FilePlus2, label: 'New Repair Request' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Welcome back, {user.name.split(' ')[0]}</h1>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {quickActions.map((a) => (
          <Link key={a.to} to={a.to} className="flex items-center gap-3 bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-4 hover:-translate-y-0.5 transition-transform">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center shrink-0">
              <a.icon size={18} className="text-emerald-700 dark:text-emerald-200" />
            </div>
            <span className="font-medium text-sm text-ink-800 dark:text-cream-200">{a.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        <Stat label="Active Repairs" value={active.length} />
        <Stat label="Completed Repairs" value={completed.length} />
        <Stat label="Saved Repairers" value={saved.length} />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50 mb-4">Recent Activity</h2>
        {requests.length === 0 ? (
          <EmptyState icon={Clock} title="No activity yet" message="Your repair requests and updates will show up here." />
        ) : (
          <div className="space-y-3">
            {requests.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between bg-cream-50 dark:bg-ink-800 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-cream-50">{r.productName} — {r.problem}</p>
                  <p className="text-xs text-ink-700/60 dark:text-cream-300/60">{r.id}</p>
                </div>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">{r.status}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {saved.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50 mb-4 flex items-center gap-2">
            <Heart size={18} className="text-clay-500" /> Saved Repairers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {saved.map((r) => <RepairerCard key={r.id} repairer={r} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-emerald-50 dark:bg-ink-800 rounded-ticket py-6 text-center">
      <p className="font-display text-3xl font-bold text-emerald-700 dark:text-emerald-300">{value}</p>
      <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-1">{label}</p>
    </div>
  )
}
