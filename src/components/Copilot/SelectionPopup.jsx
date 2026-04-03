import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mic, Send, Search, Zap } from 'lucide-react'

const QUICK_ACTIONS = [
  { label: 'Explain this', query: 'Explain what I see here' },
  { label: 'Summarize', query: 'Give me a quick summary of this' },
  { label: 'How to use?', query: 'How do I use this feature?' },
]

export default function SelectionPopup({ bounds, onSubmit, onCancel, detectedContexts = [] }) {
  const [question, setQuestion] = useState('')
  const [isListening, setIsListening] = useState(false)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const panelWidth = 360
  const panelHeight = detectedContexts.length > 0 ? 150 : 120
  const rawX = bounds ? bounds.x + bounds.width / 2 - panelWidth / 2 : 0
  const rawY = bounds ? bounds.y + bounds.height + 16 : 0
  const fitsBelow = rawY + panelHeight < window.innerHeight - 16
  const popupX = Math.max(16, Math.min(rawX, window.innerWidth - panelWidth - 16))
  const popupY = fitsBelow ? rawY : Math.max(16, bounds.y - panelHeight - 16)

  const contextLabel = detectedContexts.length > 0
    ? detectedContexts[0].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : null

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (question.trim()) {
      onSubmit(question.trim())
    }
  }

  const handleQuickAction = (query) => {
    onSubmit(query)
  }

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('')
      setQuestion(transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  if (!bounds) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-[9995]"
      style={{
        left: popupX,
        top: popupY,
      }}
    >
      <div className="bg-zuper-beige-50 border border-zuper-beige-200 shadow-xl shadow-black/[0.06] rounded-xl p-3 w-[360px]">
        {/* Context indicator */}
        {contextLabel && (
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-[11px] font-medium text-zuper-text-secondary">
              Detected: <span className="text-zuper-primary">{contextLabel}</span>
            </span>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 mb-2.5 px-0.5">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.query)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-zuper-beige-200 text-[11px] font-medium text-zuper-text-secondary hover:text-zuper-primary hover:bg-zuper-beige-100 hover:border-zuper-sidebar-active transition-all duration-150"
            >
              {action.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zuper-muted" />
            <input
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about this..."
              className="w-full bg-white border border-zuper-beige-200 rounded-lg pr-3.5 py-2.5 text-[12px] text-zuper-text placeholder:text-zuper-text-secondary/50 focus:outline-none focus:border-zuper-sidebar-active focus:ring-1 focus:ring-zuper-sidebar-active/20 transition-all"
              style={{ paddingLeft: '2.125rem' }}
            />
          </div>
          <button
            type="button"
            onClick={toggleMic}
            className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0 ${
              isListening
                ? 'bg-red-500 text-white shadow-sm shadow-red-500/25'
                : 'bg-white border border-zuper-beige-200 text-zuper-muted hover:text-zuper-primary hover:bg-zuper-beige-100'
            }`}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            {isListening && (
              <motion.span
                className="absolute inset-0 rounded-lg border-2 border-red-400"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!question.trim()}
            className="w-9 h-9 rounded-lg bg-zuper-primary flex items-center justify-center text-white shadow-sm shadow-zuper-primary/20 disabled:opacity-30 disabled:shadow-none hover:shadow-md hover:shadow-zuper-primary/25 active:scale-95 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </motion.div>
  )
}
