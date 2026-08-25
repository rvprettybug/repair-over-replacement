import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wrench, User, Hammer } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { Field } from './Login'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    const res = signup({ name, email, password, role })
    if (!res.ok) {
      setError(res.error)
      return
    }
    showToast('Account created successfully!', 'success')
    navigate(role === 'repairer' ? '/repairer-dashboard' : '/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="w-12 h-12 rounded-full bg-emerald-600 inline-flex items-center justify-center mb-3">
            <Wrench size={22} className="text-cream-50" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">Create your account</h1>
          <p className="text-sm text-ink-700/60 dark:text-cream-300/60 mt-1">Already registered? <Link to="/login" className="text-emerald-700 dark:text-emerald-300 font-medium">Log in</Link></p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-6 space-y-4">
          {error && <p className="text-sm text-clay-600 bg-clay-50 dark:bg-clay-900/30 rounded-lg px-3 py-2">{error}</p>}

          <div>
            <span className="text-sm font-medium text-ink-800 dark:text-cream-200 block mb-2">I am a</span>
            <div className="grid grid-cols-2 gap-3">
              <RoleCard icon={User} label="Customer" active={role === 'customer'} onClick={() => setRole('customer')} />
              <RoleCard icon={Hammer} label="Repairer" active={role === 'repairer'} onClick={() => setRole('repairer')} />
            </div>
          </div>

          <Field label="Full name" value={name} onChange={setName} required />
          <Field label="Email address" type="email" value={email} onChange={setEmail} required />
          <Field label="Password" type="password" value={password} onChange={setPassword} required />

          <button type="submit" className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

function RoleCard({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-sm font-medium transition-colors ${
        active
          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
          : 'border-ink-900/15 dark:border-cream-100/20 text-ink-700 dark:text-cream-300'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  )
}
