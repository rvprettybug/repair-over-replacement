import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Bell, Sun, Moon, Wrench, ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react'
import SearchBar from './SearchBar'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/find-repairer', label: 'Find Repairer' },
  { to: '/estimate', label: 'Repair Estimate' },
  { to: '/spare-parts', label: 'Spare Parts' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/eco-impact', label: 'Eco Impact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { user, logout } = useAuth()
  const { count } = useCart()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const notifications = [
    { id: 1, text: 'Your repair request RR-4821 was accepted.' },
    { id: 2, text: 'New message from Harpreet Singh.' },
    { id: 3, text: 'Your laptop repair is ready for pickup.' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-cream-50/90 dark:bg-ink-900/90 backdrop-blur border-b border-ink-900/10 dark:border-cream-100/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center">
              <Wrench size={18} className="text-cream-50" />
            </span>
            <span className="font-display font-bold leading-3 text-ink-900 dark:text-cream-50 text-[13px] tracking-wide">
              REPAIR<br />OVER<br />REPLACEMENT
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-300' : 'text-ink-800 dark:text-cream-200 hover:text-emerald-600 dark:hover:text-emerald-300'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <SearchBar compact />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button onClick={toggle} aria-label="Toggle dark mode" className="p-2 rounded-full hover:bg-ink-900/5 dark:hover:bg-cream-100/10 text-ink-800 dark:text-cream-200">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link to="/cart" aria-label="Cart" className="relative p-2 rounded-full hover:bg-ink-900/5 dark:hover:bg-cream-100/10 text-ink-800 dark:text-cream-200">
              <ShoppingCart size={18} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-clay-500 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {user && (
              <div className="relative hidden sm:block">
                <button onClick={() => setNotifOpen((o) => !o)} aria-label="Notifications" className="p-2 rounded-full hover:bg-ink-900/5 dark:hover:bg-cream-100/10 text-ink-800 dark:text-cream-200">
                  <Bell size={18} />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-700/60 dark:text-cream-300/60 mb-2 px-1">Notifications</p>
                    {notifications.map((n) => (
                      <p key={n.id} className="text-sm text-ink-800 dark:text-cream-200 px-2 py-2 rounded-lg hover:bg-ink-900/5 dark:hover:bg-cream-100/10">{n.text}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {user ? (
              <div className="hidden md:flex items-center gap-1.5">
                <Link
                  to={user.role === 'repairer' ? '/repairer-dashboard' : '/dashboard'}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full text-ink-800 dark:text-cream-200 hover:bg-ink-900/5 dark:hover:bg-cream-100/10"
                >
                  <LayoutDashboard size={15} />
                  {user.name.split(' ')[0]}
                </Link>
                <button
                  onClick={() => { logout(); navigate('/') }}
                  aria-label="Log out"
                  className="p-2 rounded-full hover:bg-ink-900/5 dark:hover:bg-cream-100/10 text-ink-800 dark:text-cream-200"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:inline-block text-sm font-medium px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                Log In
              </Link>
            )}

            <button onClick={() => setOpen((o) => !o)} className="lg:hidden p-2 text-ink-800 dark:text-cream-200" aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-900/10 dark:border-cream-100/10 px-4 py-4 space-y-3 bg-cream-50 dark:bg-ink-900">
          <SearchBar />
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `block text-sm font-medium py-1.5 ${isActive ? 'text-emerald-600 dark:text-emerald-300' : 'text-ink-800 dark:text-cream-200'}`}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-ink-900/10 dark:border-cream-100/10">
            {user ? (
              <div className="flex items-center justify-between">
                <Link to={user.role === 'repairer' ? '/repairer-dashboard' : '/dashboard'} onClick={() => setOpen(false)} className="text-sm font-medium text-ink-800 dark:text-cream-200">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setOpen(false); navigate('/') }} className="text-sm font-medium text-clay-600">Log Out</button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="block text-center text-sm font-medium px-4 py-2 rounded-full bg-emerald-600 text-white">
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
