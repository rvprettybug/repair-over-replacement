import { Link } from 'react-router-dom'
import {
  Smartphone, Laptop, WashingMachine, Cpu, Armchair, Bike, Watch, Wrench,
  ListChecks, MessageSquareText, Search, CheckCircle2,
  PiggyBank, Leaf, Handshake, Timer, ArrowRight,
} from 'lucide-react'
import { CATEGORIES, REPAIRERS, REVIEWS } from '../data/mockData'
import RepairerCard from '../components/RepairerCard'
import Rating from '../components/Rating'

const categoryIcons = { Smartphone, Laptop, WashingMachine, Cpu, Armchair, Bike, Watch, Wrench }

const steps = [
  { icon: ListChecks, title: 'Select your product', text: 'Tell us what needs fixing — from phones to furniture.' },
  { icon: MessageSquareText, title: 'Describe the problem', text: 'Add details and photos so repairers know what to expect.' },
  { icon: Search, title: 'Find a repairer', text: 'Compare verified experts nearby by price, rating and distance.' },
  { icon: CheckCircle2, title: 'Get it fixed', text: 'Book, track progress, and get your product back working.' },
]

const whyRepair = [
  { icon: PiggyBank, title: 'Save Money', text: 'Repairs typically cost a fraction of buying new.' },
  { icon: Leaf, title: 'Reduce E-Waste', text: 'Keep functioning parts out of landfills.' },
  { icon: Handshake, title: 'Support Local Repairers', text: 'Put money back into your local repair economy.' },
  { icon: Timer, title: 'Extend Product Life', text: 'A good repair can add years of extra use.' },
]

export default function Landing() {
  const featured = REPAIRERS.slice(0, 4)
  const topReviews = REVIEWS.slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-emerald-900">
        <div className="absolute inset-0 opacity-[0.07] bg-stitch text-cream-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-mono uppercase tracking-widest text-emerald-300 border border-emerald-700 rounded-full px-3 py-1 mb-6">
              Trusted repair marketplace
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-cream-50 leading-[1.05]">
              Don't Replace It.<br /><span className="italic text-clay-400">Repair It.</span>
            </h1>
            <p className="text-emerald-100/80 text-lg mt-6 max-w-md">
              Give your products a second life. Find trusted repair experts, estimate repair costs, and fix what you already own.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/find-repairer" className="px-6 py-3 rounded-full bg-clay-500 text-white font-medium hover:bg-clay-600 transition-colors inline-flex items-center gap-2">
                Find a Repairer <ArrowRight size={16} />
              </Link>
              <Link to="/estimate" className="px-6 py-3 rounded-full bg-cream-50/10 text-cream-50 font-medium border border-cream-50/30 hover:bg-cream-50/20 transition-colors">
                Get Repair Estimate
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-cream-50 rounded-ticket shadow-ticket p-6 rotate-2">
              <p className="text-xs font-mono uppercase tracking-widest text-clay-600 mb-2">Repair Ticket #4821</p>
              <div className="perforated pt-3 space-y-3">
                <Row label="Product" value="iPhone 13 — Broken Screen" />
                <Row label="Repairer" value="Harpreet Singh · Ludhiana" />
                <Row label="Estimate" value="₹2,500 – ₹5,000" />
                <Row label="Status" value="Repair in Progress" accent />
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-clay-500 text-white rounded-ticket shadow-ticket p-4 -rotate-3 hidden sm:block">
              <p className="text-2xl font-display font-bold">92%</p>
              <p className="text-xs">cheaper than replacing</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="Process" title="How It Works" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {steps.map((s, i) => (
            <div key={s.title} className="relative bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-5">
              <span className="font-mono text-xs text-clay-500">{String(i + 1).padStart(2, '0')}</span>
              <s.icon size={24} className="text-emerald-600 dark:text-emerald-300 my-3" />
              <h3 className="font-display font-semibold text-ink-900 dark:text-cream-50">{s.title}</h3>
              <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-emerald-50 dark:bg-ink-800/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Browse" title="Popular Repair Categories" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {CATEGORIES.map((c) => {
              const Icon = categoryIcons[c.icon] || Wrench
              return (
                <Link
                  key={c.id}
                  to={`/find-repairer?category=${c.id}`}
                  className="flex flex-col items-center text-center gap-2 bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket py-6 px-3 hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  <Icon size={26} className="text-emerald-600 dark:text-emerald-300" />
                  <span className="text-sm font-medium text-ink-800 dark:text-cream-200">{c.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* WHY REPAIR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="Impact" title="Why Repair?" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {whyRepair.map((w) => (
            <div key={w.title} className="text-center px-4">
              <div className="w-14 h-14 rounded-full bg-clay-100 dark:bg-clay-900/40 flex items-center justify-center mx-auto mb-3">
                <w.icon size={24} className="text-clay-600 dark:text-clay-300" />
              </div>
              <h3 className="font-display font-semibold text-ink-900 dark:text-cream-50">{w.title}</h3>
              <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-1">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED REPAIRERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="Meet the experts" title="Featured Repairers" />
          <Link to="/find-repairer" className="hidden sm:inline text-sm font-medium text-emerald-700 dark:text-emerald-300 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((r) => <RepairerCard key={r.id} repairer={r} />)}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-ink-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading eyebrow="Testimonials" title="Customer Reviews" dark />
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {topReviews.map((rev) => (
              <div key={rev.id} className="bg-ink-800 rounded-ticket p-5">
                <Rating value={rev.rating} showValue={false} />
                <p className="text-cream-200 text-sm mt-3 leading-relaxed">"{rev.comment}"</p>
                <p className="text-cream-300/50 text-xs mt-4 font-mono">— {rev.reviewer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <SectionHeading eyebrow="Since launch" title="Environmental Impact" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
          <Stat value="18,400+" label="Products Repaired" />
          <Stat value="₹2.3 Cr+" label="Money Saved" />
          <Stat value="96 tonnes" label="E-Waste Reduced" />
          <Stat value="640+" label="Active Repairers" />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="bg-clay-500 rounded-ticket p-10 sm:p-14 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
            Before you replace it, see if it can be repaired.
          </h2>
          <Link to="/estimate" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white text-clay-700 font-medium hover:bg-cream-100">
            Get Repair Estimate <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex justify-between text-sm gap-4">
      <span className="text-ink-700/60">{label}</span>
      <span className={`font-medium text-right ${accent ? 'text-emerald-600' : 'text-ink-900'}`}>{value}</span>
    </div>
  )
}

function SectionHeading({ eyebrow, title, dark }) {
  return (
    <div>
      <p className={`text-xs font-mono uppercase tracking-widest ${dark ? 'text-clay-400' : 'text-clay-600 dark:text-clay-400'}`}>{eyebrow}</p>
      <h2 className={`font-display text-3xl font-semibold mt-1 ${dark ? 'text-cream-50' : 'text-ink-900 dark:text-cream-50'}`}>{title}</h2>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div className="text-center bg-emerald-50 dark:bg-ink-800 rounded-ticket py-8">
      <p className="font-display text-3xl font-bold text-emerald-700 dark:text-emerald-300">{value}</p>
      <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-1">{label}</p>
    </div>
  )
}
