import { Link } from 'react-router-dom'
import { ListChecks, MessageSquareText, Search, CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  { icon: ListChecks, title: 'Select your product', text: 'Choose from smartphones, laptops, appliances, furniture, vehicles, and more.' },
  { icon: MessageSquareText, title: 'Describe the problem', text: 'Add a description and photo so repairers understand the issue before quoting.' },
  { icon: Search, title: 'Find a repairer', text: 'Compare verified repairers nearby by rating, price, and availability.' },
  { icon: CheckCircle2, title: 'Get it fixed', text: 'Book your repair, track status in real time, and pay only when you\'re satisfied.' },
]

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-display text-4xl font-semibold text-ink-900 dark:text-cream-50 text-center">How It Works</h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 text-center mt-2 max-w-lg mx-auto">
        From a broken screen to a squeaky washing machine — here's how to get it fixed on Repair Over Replacement.
      </p>

      <div className="mt-14 space-y-8">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-5 items-start">
            <div className="flex flex-col items-center">
              <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-display font-semibold shrink-0">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-ink-900/10 dark:bg-cream-100/10 mt-2" style={{ minHeight: 40 }} />}
            </div>
            <div className="pb-2">
              <s.icon size={22} className="text-emerald-600 dark:text-emerald-300 mb-2" />
              <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-cream-50">{s.title}</h2>
              <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">{s.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/repair-request" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700">
          Start a Repair Request <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
