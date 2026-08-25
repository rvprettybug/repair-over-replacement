import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Upload, X, CheckCircle2, Sparkles } from 'lucide-react'
import { CATEGORIES, REPAIRERS, AI_SIMULATED_RESULTS } from '../data/mockData'
import { Field } from './Login'
import { generateId, readStore, writeStore } from '../utils/storage'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const URGENCY = ['Low — within a week', 'Medium — within 2-3 days', 'High — as soon as possible']

export default function RepairRequest() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showToast } = useToast()

  const [form, setForm] = useState({
    category: '',
    productName: '',
    brand: '',
    model: '',
    problem: '',
    purchaseYear: '',
    preferredDate: '',
    location: '',
    urgency: URGENCY[1],
    repairerId: params.get('repairer') || '',
  })
  const [image, setImage] = useState(null)
  const [aiResult, setAiResult] = useState(null)
  const [submitted, setSubmitted] = useState(null)

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function handleImage(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImage(url)
    // Simulated AI Repair Assistant — not real image recognition.
    const name = (form.productName + ' ' + form.problem).toLowerCase()
    const match = AI_SIMULATED_RESULTS.find((r) => name.includes(r.keyword)) || AI_SIMULATED_RESULTS.find((r) => r.keyword === 'default')
    setAiResult(match)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!user) {
      showToast('Please log in to submit a repair request.', 'info')
      navigate('/login')
      return
    }
    const id = generateId('RR')
    const requests = readStore('repairRequests', [])
    const newRequest = {
      id,
      userId: user.id,
      ...form,
      status: 'Pending',
      hasImage: !!image,
      createdAt: new Date().toISOString(),
    }
    writeStore('repairRequests', [newRequest, ...requests])
    showToast('Repair request submitted successfully!', 'success')
    setSubmitted(newRequest)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50">Repair Request Submitted Successfully</h1>
        <p className="text-ink-700/70 dark:text-cream-300/70 mt-2">Your repair request ID is:</p>
        <p className="font-mono text-lg font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 inline-block px-4 py-2 rounded-full mt-2">
          {submitted.id}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button onClick={() => navigate('/my-repairs')} className="px-5 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">
            View My Repairs
          </button>
          <button onClick={() => navigate('/')} className="px-5 py-2.5 rounded-full border border-ink-900/15 dark:border-cream-100/20 text-sm font-medium text-ink-800 dark:text-cream-200">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50">Submit a Repair Request</h1>
      <p className="text-ink-700/70 dark:text-cream-300/70 mt-1">Tell us what's broken — a repairer will review and respond shortly.</p>

      <form onSubmit={handleSubmit} className="bg-cream-50 dark:bg-ink-800 rounded-ticket shadow-ticket p-6 mt-8 space-y-4">
        <Field label="Product category" type="select" value={form.category} onChange={(v) => update('category', v)} required
          options={[{ value: '', label: 'Select category' }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.label }))]} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Product name" value={form.productName} onChange={(v) => update('productName', v)} required />
          <Field label="Brand" value={form.brand} onChange={(v) => update('brand', v)} required />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Model" value={form.model} onChange={(v) => update('model', v)} />
          <Field label="Approx. purchase year" value={form.purchaseYear} onChange={(v) => update('purchaseYear', v)} />
        </div>
        <label className="block">
          <span className="text-sm font-medium text-ink-800 dark:text-cream-200">Problem description</span>
          <textarea
            value={form.problem}
            onChange={(e) => update('problem', e.target.value)}
            required
            rows={3}
            className="mt-1 w-full rounded-lg border border-ink-900/15 dark:border-cream-100/20 bg-transparent px-3 py-2 text-sm text-ink-900 dark:text-cream-50 focus:border-emerald-500 outline-none"
            placeholder="e.g. Screen cracked after a fall, touch still works partially"
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Preferred repair date" type="date" value={form.preferredDate} onChange={(v) => update('preferredDate', v)} />
          <Field label="Location" value={form.location} onChange={(v) => update('location', v)} required />
        </div>

        <Field label="Urgency" type="select" value={form.urgency} onChange={(v) => update('urgency', v)}
          options={URGENCY.map((u) => ({ value: u, label: u }))} />

        <Field label="Assign a repairer (optional)" type="select" value={form.repairerId} onChange={(v) => update('repairerId', v)}
          options={[{ value: '', label: 'Let any nearby repairer respond' }, ...REPAIRERS.map((r) => ({ value: r.id, label: `${r.name} — ${r.city}` }))]} />

        <div>
          <span className="text-sm font-medium text-ink-800 dark:text-cream-200 block mb-1.5">Upload problem image</span>
          {image ? (
            <div className="relative w-40">
              <img src={image} alt="Uploaded product problem" className="rounded-lg w-40 h-40 object-cover" />
              <button type="button" onClick={() => { setImage(null); setAiResult(null) }} className="absolute -top-2 -right-2 bg-ink-900 text-white rounded-full p-1">
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-ink-900/15 dark:border-cream-100/20 rounded-lg py-8 cursor-pointer hover:border-emerald-400">
              <Upload size={20} className="text-ink-700/50 dark:text-cream-300/50" />
              <span className="text-sm text-ink-700/60 dark:text-cream-300/60">Click to upload an image</span>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          )}

          {aiResult && (
            <div className="mt-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-4 flex gap-3">
              <Sparkles size={18} className="text-emerald-600 dark:text-emerald-300 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-emerald-800 dark:text-emerald-200">Possible issue detected: {aiResult.issue}</p>
                <p className="text-emerald-700/80 dark:text-emerald-300/80 mt-0.5">Recommended action: {aiResult.action}</p>
                <p className="text-xs text-emerald-700/60 dark:text-emerald-300/60 mt-2">Simulated AI Repair Assistant — not a real diagnosis.</p>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700">
          Submit Repair Request
        </button>
      </form>
    </div>
  )
}
