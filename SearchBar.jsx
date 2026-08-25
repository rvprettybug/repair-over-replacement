import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar({ compact = false }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function submit(e) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
  }

  return (
    <form onSubmit={submit} ref={ref} className="relative w-full">
      <div className={`flex items-center gap-2 bg-ink-900/5 dark:bg-cream-100/10 rounded-full px-3 ${compact ? 'py-1.5' : 'py-2'}`}>
        <Search size={16} className="text-ink-700/50 dark:text-cream-300/50 shrink-0" />
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          placeholder="Search repairers, services, parts…"
          className="bg-transparent outline-none text-sm w-full placeholder:text-ink-700/40 dark:placeholder:text-cream-300/40 text-ink-900 dark:text-cream-50"
          aria-label="Search the platform"
        />
      </div>
    </form>
  )
}
