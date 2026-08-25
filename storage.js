// Thin wrapper around localStorage so every read/write is JSON-safe and
// centralized. When a real backend is added, swap these calls for API
// calls without touching the components that use them.

const NS = 'ror:' // repair-over-replacement namespace

export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(NS + key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeStore(key, value) {
  try {
    localStorage.setItem(NS + key, JSON.stringify(value))
  } catch {
    // storage full or unavailable — fail silently, app still works in-memory
  }
}

export function removeStore(key) {
  localStorage.removeItem(NS + key)
}

export function generateId(prefix = 'ID') {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase()
  const time = Date.now().toString(36).slice(-4).toUpperCase()
  return `${prefix}-${time}${rand}`
}
