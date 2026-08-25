import { Link } from 'react-router-dom'
import { Wrench, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Become a Repairer', to: '/signup' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/help' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Find Repairer', to: '/find-repairer' },
      { label: 'Spare Parts', to: '/spare-parts' },
      { label: 'Eco Impact', to: '/eco-impact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center">
              <Wrench size={16} className="text-cream-50" />
            </span>
            <span className="font-display font-bold text-sm tracking-wide">REPAIR OVER REPLACEMENT</span>
          </Link>
          <p className="text-sm text-cream-300/70 max-w-xs">Don't Replace It. Repair It. Connecting you with trusted repair professionals across Punjab and beyond.</p>
          <div className="flex items-center gap-3 mt-4">
            {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="text-cream-300/60 hover:text-clay-400">
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-cream-50 mb-3 text-sm">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-cream-300/70 hover:text-cream-50">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream-100/10 py-5 text-center">
        <p className="text-sm text-cream-300/70 font-display italic">"Repair more. Replace less."</p>
      </div>
    </footer>
  )
}
