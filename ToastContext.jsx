import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++counter.current
    setToasts((t) => [...t, { id, message, type }])
    setTimeout(() => dismiss(id), 3500)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className="flex items-start gap-2 bg-ink-900 text-cream-50 rounded-ticket shadow-ticket px-4 py-3 animate-in fade-in slide-in-from-bottom-2"
          >
            {t.type === 'success' && <CheckCircle2 size={18} className="text-emerald-300 mt-0.5 shrink-0" />}
            {t.type === 'error' && <AlertTriangle size={18} className="text-clay-300 mt-0.5 shrink-0" />}
            {t.type === 'info' && <Info size={18} className="text-cream-200 mt-0.5 shrink-0" />}
            <p className="text-sm leading-snug flex-1">{t.message}</p>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="text-cream-300 hover:text-white">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
