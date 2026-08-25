import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, RotateCcw } from 'lucide-react'
import { CATEGORIES, PROBLEM_OPTIONS, ESTIMATE_RANGES } from '../data/mockData'

const PRODUCTS_BY_CATEGORY = {
  smartphones: ['Smartphone'],
  laptops: ['Laptop'],
  appliances: ['Washing Machine', 'Refrigerator'],
  electronics: ['Television'],
  vehicles: ['Bike'],
  watches: ['Watch'],
  furniture: ['Furniture'],
  other: ['Smartphone', 'Laptop', 'Washing Machine', 'Refrigerator', 'Television', 'Bike', 'Watch', 'Furniture'],
}

export default function CostEstimator() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [product, setProduct] = useState('')
  const [problem, setProblem] = useState('')

  const products = PRODUCTS_BY_CATEGORY[category] || []
  const problems = PROBLEM_OPTIONS[product] || []
  const range = ESTIMATE_RANGES[problem]

  function reset() {
    setStep(1); setCategory(''); setProduct(''); setProblem('')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Repair Cost Estimator</h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">Three quick steps to a ballpark repair cost.</p>

      <div className="flex items-center gap-2 mt-6 mb-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-2 flex-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
              step >= n ? 'bg-emerald-600 text-white' : 'bg-ink-900/10 dark:bg-cream-100/10 text-ink-700/50 dark:text-cream-300/50'
            }`}>
              {step > n ? <Check size={14} /> : n}
            </div>
            {n < 3 && <div className={`h-0.5 flex-1 ${step > n ? 'bg-emerald-600' : 'bg-ink-900/10 dark:bg-cream-100/10'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-6">
        {step === 1 && (
          <StepBlock title="Step 1 — Select category">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CATEGORIES.map((c) => (
                <OptionButton key={c.id} active={category === c.id} onClick={() => { setCategory(c.id); setProduct(''); setProblem(''); setStep(2) }}>
                  {c.label}
                </OptionButton>
              ))}
            </div>
          </StepBlock>
        )}

        {step === 2 && (
          <StepBlock title="Step 2 — Select product">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {products.map((p) => (
                <OptionButton key={p} active={product === p} onClick={() => { setProduct(p); setProblem(''); setStep(3) }}>
                  {p}
                </OptionButton>
              ))}
            </div>
            <BackButton onClick={() => setStep(1)} />
          </StepBlock>
        )}

        {step === 3 && (
          <StepBlock title="Step 3 — Select problem">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {problems.map((p) => (
                <OptionButton key={p} active={problem === p} onClick={() => setProblem(p)}>
                  {p}
                </OptionButton>
              ))}
            </div>
            <BackButton onClick={() => setStep(2)} />
          </StepBlock>
        )}
      </div>

      {range && (
        <div className="mt-6 bg-emerald-900 rounded-ticket p-6 text-center">
          <p className="text-emerald-200 text-sm">Estimated Repair Cost</p>
          <p className="font-display text-3xl font-bold text-cream-50 mt-1">
            ₹{range[0].toLocaleString('en-IN')} – ₹{range[1].toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-emerald-200/70 mt-3 max-w-sm mx-auto">
            This is an estimated cost. Final pricing may vary depending on product condition and repairer.
          </p>
          <div className="flex justify-center gap-3 mt-5">
            <Link to="/find-repairer" className="px-5 py-2.5 rounded-full bg-clay-500 text-white text-sm font-medium hover:bg-clay-600">
              Find a Repairer
            </Link>
            <button onClick={reset} className="px-5 py-2.5 rounded-full border border-cream-50/30 text-cream-50 text-sm font-medium inline-flex items-center gap-1.5">
              <RotateCcw size={14} /> Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function StepBlock({ title, children }) {
  return (
    <div>
      <h2 className="font-display font-semibold text-ink-900 dark:text-cream-50 mb-4">{title}</h2>
      {children}
    </div>
  )
}

function OptionButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium rounded-lg py-3 px-3 border transition-colors ${
        active
          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
          : 'border-ink-900/15 dark:border-cream-100/20 text-ink-800 dark:text-cream-200 hover:border-emerald-300'
      }`}
    >
      {children}
    </button>
  )
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} className="text-sm text-ink-700/60 dark:text-cream-300/60 hover:underline mt-4">
      ← Back
    </button>
  )
}
