import { useState } from 'react'
import { Search } from 'lucide-react'
import { REPAIRERS, SPARE_PARTS, REVIEWS } from '../data/mockData'
import { readStore } from '../utils/storage'

export default function AdminDashboard() {
  const [tab, setTab] = useState('users')
  const [query, setQuery] = useState('')
  const users = readStore('users', [])
  const requests = readStore('repairRequests', [])

  const stats = [
    { label: 'Total Users', value: users.length },
    { label: 'Total Repairers', value: REPAIRERS.length },
    { label: 'Total Repairs', value: requests.length },
    { label: 'Completed Repairs', value: requests.filter((r) => r.status === 'Completed').length },
    { label: 'Revenue', value: `₹${(requests.length * 1850).toLocaleString('en-IN')}` },
    { label: 'Active Listings', value: SPARE_PARTS.length },
  ]

  const tabs = [
    { id: 'users', label: 'Users' },
    { id: 'repairers', label: 'Repairers' },
    { id: 'requests', label: 'Repair Requests' },
    { id: 'parts', label: 'Spare Parts' },
    { id: 'reviews', label: 'Reviews' },
  ]

  function filtered(list, key) {
    if (!query) return list
    return list.filter((item) => (item[key] || '').toLowerCase().includes(query.toLowerCase()))
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Admin Dashboard</h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-1 text-sm">Demo admin console — no authentication gate in this prototype.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-emerald-50 dark:bg-ink-800 rounded-ticket py-5 text-center">
            <p className="font-display text-xl font-bold text-emerald-700 dark:text-emerald-300">{s.value}</p>
            <p className="text-xs text-ink-700/70 dark:text-cream-300/70 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-10 mb-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-sm font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap ${tab === t.id ? 'bg-emerald-600 text-white' : 'text-ink-700 dark:text-cream-300 hover:bg-ink-900/5 dark:hover:bg-cream-100/10'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-ink-900/5 dark:bg-cream-100/10 rounded-full px-3 py-1.5">
          <Search size={14} className="text-ink-700/50 dark:text-cream-300/50" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" className="bg-transparent outline-none text-sm text-ink-900 dark:text-cream-50" />
        </div>
      </div>

      <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket overflow-x-auto">
        {tab === 'users' && <Table headers={['Name', 'Email', 'Role', 'Joined']} rows={filtered(users, 'name').map((u) => [u.name, u.email, u.role, new Date(u.createdAt).toLocaleDateString()])} empty="No users have signed up yet in this browser." />}
        {tab === 'repairers' && <Table headers={['Name', 'Specialty', 'City', 'Rating']} rows={filtered(REPAIRERS, 'name').map((r) => [r.name, r.specialty, r.city, r.rating.toFixed(1)])} />}
        {tab === 'requests' && <Table headers={['ID', 'Product', 'Problem', 'Status']} rows={filtered(requests, 'productName').map((r) => [r.id, r.productName, r.problem, r.status])} empty="No repair requests submitted yet." />}
        {tab === 'parts' && <Table headers={['Name', 'Category', 'Price', 'Stock']} rows={filtered(SPARE_PARTS, 'name').map((p) => [p.name, p.category, `₹${p.price}`, p.stock])} />}
        {tab === 'reviews' && <Table headers={['Reviewer', 'Rating', 'Comment']} rows={filtered(REVIEWS, 'reviewer').map((r) => [r.reviewer, r.rating, r.comment])} />}
      </div>
    </div>
  )
}

function Table({ headers, rows, empty }) {
  if (rows.length === 0) {
    return <p className="text-sm text-ink-700/60 dark:text-cream-300/60 p-6 text-center">{empty || 'No records found.'}</p>
  }
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-ink-900/10 dark:border-cream-100/10">
          {headers.map((h) => <th key={h} className="text-left font-medium text-ink-700/60 dark:text-cream-300/60 px-4 py-3 whitespace-nowrap">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-ink-900/5 dark:border-cream-100/5 last:border-0">
            {row.map((cell, j) => <td key={j} className="px-4 py-3 text-ink-800 dark:text-cream-200 whitespace-nowrap">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
