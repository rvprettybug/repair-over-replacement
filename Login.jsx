import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Wrench } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(e) {
    e.preventDefault()
    const res = login({ email, password })
    if (!res.ok) {
      setError(res.error)
      return
    }
    showToast(`Welcome back, ${res.user.name.split(' ')[0]}!`, 'success')
    navigate(location.state?.from?.pathname || (res.user.role === 'repairer' ? '/repairer-dashboard' : '/dashboard'))
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="w-12 h-12 rounded-full bg-emerald-600 inline-flex items-center justify-center mb-3">
            <Wrench size={22} className="text-cream-50" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">Log in to your account</h1>
          <p className="text-sm text-ink-700/60 dark:text-cream-300/60 mt-1">New here? <Link to="/signup" className="text-emerald-700 dark:text-emerald-300 font-medium">Create an account</Link></p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-6 space-y-4">
          {error && <p className="text-sm text-clay-600 bg-clay-50 dark:bg-clay-900/30 rounded-lg px-3 py-2">{error}</p>}
          <Field label="Email address" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />
          <div className="text-right -mt-2">
            <Link to="/forgot-password" className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline">Forgot password?</Link>
          </div>
          <button type="submit" className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700">
            Log In
          </button>
          <p className="text-xs text-center text-ink-700/50 dark:text-cream-300/50">
            Demo tip: sign up first — accounts are stored locally in your browser.
          </p>
        </form>
      </div>
    </div>
  )
}

export function Field({ label, type = 'text', value, onChange, required, options }) {
  if (type === 'select') {
    return (
      <label className="block">
        <span className="text-sm font-medium text-ink-800 dark:text-cream-200">{label}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="mt-1 w-full rounded-lg border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-cream-50 focus:border-emerald-500 outline-none"
        >
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </label>
    )
  }
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-800 dark:text-cream-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full rounded-lg border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-cream-50 placeholder:text-ink-700/30 focus:border-emerald-500 outline-none"
      />
    </label>
  )
}
