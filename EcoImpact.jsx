import { Leaf, PiggyBank, Timer, Handshake } from 'lucide-react'

const stats = [
  { icon: Leaf, value: '96 tonnes', label: 'E-waste kept out of landfills' },
  { icon: PiggyBank, value: '₹2.3 Cr+', label: 'Saved by customers vs. buying new' },
  { icon: Timer, value: '3.4 yrs', label: 'Average extra life added per product' },
  { icon: Handshake, value: '640+', label: 'Local repairers supported' },
]

export default function EcoImpact() {
  return (
    <div>
      <section className="bg-emerald-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-300">Our Impact</p>
          <h1 className="font-display text-4xl font-semibold text-cream-50 mt-2">Every repair is a small step toward a less wasteful future.</h1>
          <p className="text-emerald-100/80 mt-4 max-w-xl mx-auto">
            Manufacturing new electronics and appliances consumes raw materials, energy, and water. Repairing what you already own is one of the highest-impact ways to reduce your environmental footprint.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center bg-emerald-50 dark:bg-ink-800 rounded-ticket p-6">
              <s.icon size={28} className="text-emerald-600 dark:text-emerald-300 mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-ink-900 dark:text-cream-50">{s.value}</p>
              <p className="text-sm text-ink-700/70 dark:text-cream-300/70 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        <ImpactBlock
          title="E-waste reduction"
          text="Electronic waste is the fastest-growing waste stream in the world. Repairing a phone, laptop, or appliance instead of discarding it keeps hazardous materials out of landfills and reduces demand for newly mined metals."
        />
        <ImpactBlock
          title="Money saved"
          text="A repair typically costs 20-40% of a replacement's price. Multiplied across thousands of customers, that adds up to significant household savings redirected toward other needs."
        />
        <ImpactBlock
          title="Product lifespan extension"
          text="Most products fail at a single component, not all at once. A targeted repair can add years of useful life to something that would otherwise be thrown away."
        />
        <ImpactBlock
          title="Local business support"
          text="Every booking on this platform puts money directly into the hands of local repair professionals — technicians, mechanics, and craftspeople — rather than large manufacturers."
        />
      </section>
    </div>
  )
}

function ImpactBlock({ title, text }) {
  return (
    <div className="perforated pt-6">
      <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-cream-50">{title}</h2>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-2 leading-relaxed">{text}</p>
    </div>
  )
}
