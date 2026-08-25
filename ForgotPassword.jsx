import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, MailCheck } from 'lucide-react'
import { Field } from './Login'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="w-12 h-12 rounded-full bg-emerald-600 inline-flex items-center justify-center mb-3">
            <Wrench size={22} className="text-cream-50" />
          </span>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">Reset your password</h1>
          <p className="text-sm text-ink-700/60 dark:text-cream-300/60 mt-1">
            <Link to="/login" className="text-emerald-700 dark:text-emerald-300 font-medium">Back to log in</Link>
          </p>
        </div>

        <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-6">
          {sent ? (
            <div className="text-center py-4">
              <MailCheck size={32} className="text-emerald-500 mx-auto mb-3" />
              <p className="text-sm text-ink-800 dark:text-cream-200">
                If an account exists for <strong>{email}</strong>, a reset link has been sent.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
              <p className="text-sm text-ink-700/70 dark:text-cream-300/70">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <Field label="Email address" type="email" value={email} onChange={setEmail} required />
              <button type="submit" className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700">
                Send Reset Link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
