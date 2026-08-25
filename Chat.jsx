import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, Paperclip, Check, CheckCheck } from 'lucide-react'
import { REPAIRERS } from '../data/mockData'
import { readStore, writeStore } from '../utils/storage'
import { useAuth } from '../context/AuthContext'
import EmptyState from '../components/EmptyState'
import { MessageSquare } from 'lucide-react'

const QUICK_REPLIES = ['What time works for you?', 'Can you share the price?', 'Is the repair complete?', 'Thank you!']

function threadKey(userId, repairerId) {
  return `chat:${userId}:${repairerId}`
}

export default function Chat() {
  const { user } = useAuth()
  const [params, setParams] = useSearchParams()
  const [activeId, setActiveId] = useState(params.get('with') || null)
  const [draft, setDraft] = useState('')
  const [conversations, setConversations] = useState(() => readStore(`conversations:${user.id}`, []))
  const bottomRef = useRef(null)

  useEffect(() => {
    if (activeId && !conversations.includes(activeId)) {
      const next = [...conversations, activeId]
      setConversations(next)
      writeStore(`conversations:${user.id}`, next)
    }
  }, [activeId])

  const [messages, setMessages] = useState(() => (activeId ? readStore(threadKey(user.id, activeId), seedMessages(activeId)) : []))

  useEffect(() => {
    if (!activeId) return
    setMessages(readStore(threadKey(user.id, activeId), seedMessages(activeId)))
  }, [activeId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function seedMessages(repairerId) {
    const repairer = REPAIRERS.find((r) => r.id === repairerId)
    return [{
      id: 'seed-1',
      from: 'them',
      text: `Hi, this is ${repairer?.name.split(' ')[0]}. How can I help with your repair today?`,
      time: new Date(Date.now() - 3600000).toISOString(),
      read: true,
    }]
  }

  function send(text) {
    if (!text.trim() || !activeId) return
    const msg = { id: `m-${Date.now()}`, from: 'me', text: text.trim(), time: new Date().toISOString(), read: false }
    const next = [...messages, msg]
    setMessages(next)
    writeStore(threadKey(user.id, activeId), next)
    setDraft('')
  }

  function selectRepairer(id) {
    setActiveId(id)
    setParams({ with: id })
  }

  const activeRepairer = REPAIRERS.find((r) => r.id === activeId)
  const list = conversations.length ? conversations : (activeId ? [activeId] : [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-cream-50 mb-6">Messages</h1>
      <div className="grid md:grid-cols-[280px_1fr] rounded-ticket shadow-ticket overflow-hidden bg-cream-50 dark:bg-ink-800 h-[70vh]">
        <div className="border-r border-ink-900/10 dark:border-cream-100/10 overflow-y-auto">
          {list.length === 0 ? (
            <p className="text-sm text-ink-700/60 dark:text-cream-300/60 p-4">No conversations yet. Message a repairer from their profile.</p>
          ) : list.map((id) => {
            const r = REPAIRERS.find((rep) => rep.id === id)
            if (!r) return null
            return (
              <button
                key={id}
                onClick={() => selectRepairer(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-ink-900/5 dark:hover:bg-cream-100/10 ${activeId === id ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-xs font-semibold text-emerald-700 dark:text-emerald-200 shrink-0">
                  {r.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink-900 dark:text-cream-50 truncate">{r.name}</p>
                  <p className="text-xs text-ink-700/60 dark:text-cream-300/60 truncate">{r.specialty}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col">
          {!activeRepairer ? (
            <EmptyState icon={MessageSquare} title="Select a conversation" message="Choose a repairer on the left to view messages." />
          ) : (
            <>
              <div className="px-5 py-3 border-b border-ink-900/10 dark:border-cream-100/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-xs font-semibold text-emerald-700 dark:text-emerald-200">
                  {activeRepairer.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900 dark:text-cream-50">{activeRepairer.name}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-300">{activeRepairer.availability}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                      m.from === 'me' ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-ink-900/5 dark:bg-cream-100/10 text-ink-900 dark:text-cream-50 rounded-bl-sm'
                    }`}>
                      <p>{m.text}</p>
                      <div className={`flex items-center gap-1 mt-1 text-[10px] ${m.from === 'me' ? 'text-emerald-100' : 'text-ink-700/50 dark:text-cream-300/50'}`}>
                        {new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {m.from === 'me' && (m.read ? <CheckCheck size={12} /> : <Check size={12} />)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-none border-t border-ink-900/10 dark:border-cream-100/10">
                {QUICK_REPLIES.map((q) => (
                  <button key={q} onClick={() => send(q)} className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full bg-ink-900/5 dark:bg-cream-100/10 text-ink-700 dark:text-cream-300 hover:bg-ink-900/10">
                    {q}
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); send(draft) }} className="p-4 border-t border-ink-900/10 dark:border-cream-100/10 flex items-center gap-2">
                <button type="button" aria-label="Attach file" className="text-ink-700/50 dark:text-cream-300/50 hover:text-emerald-600">
                  <Paperclip size={18} />
                </button>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message…"
                  className="flex-1 bg-ink-900/5 dark:bg-cream-100/10 rounded-full px-4 py-2 text-sm outline-none text-ink-900 dark:text-cream-50"
                />
                <button type="submit" aria-label="Send message" className="p-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                  <Send size={16} />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
