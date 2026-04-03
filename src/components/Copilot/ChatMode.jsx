import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, X, Briefcase, Calendar, UserPlus, FileText, MousePointer2, Camera, MessageSquare, Filter, Download, ClipboardList, RotateCcw, StickyNote, Receipt, DollarSign, Percent, Mail, Copy } from 'lucide-react'

const SUGGESTIONS_BY_SCREEN = {
  jobs: {
    subtitle: 'Ask about your jobs, filtering, or scheduling',
    items: [
      { text: 'How do I filter jobs by status?', icon: Filter },
      { text: 'How to bulk assign technicians?', icon: UserPlus },
      { text: 'Show me overdue jobs', icon: Calendar },
      { text: 'How do I export job data?', icon: Download },
    ],
  },
  jobDetail: {
    subtitle: 'Ask about this job, updates, or invoicing',
    items: [
      { text: 'What\'s the status of this job?', icon: ClipboardList },
      { text: 'How do I reassign this job?', icon: RotateCcw },
      { text: 'How to add notes to a job?', icon: StickyNote },
      { text: 'Create an invoice for this job', icon: Receipt },
    ],
  },
  estimate: {
    subtitle: 'Ask about estimates, pricing, or sending',
    items: [
      { text: 'How do I add line items?', icon: DollarSign },
      { text: 'How to apply a discount?', icon: Percent },
      { text: 'How do I send this estimate?', icon: Mail },
      { text: 'Can I duplicate an estimate?', icon: Copy },
    ],
  },
}

const DEFAULT_SUGGESTIONS = {
  subtitle: 'Jobs, scheduling, invoicing, or anything in Zuper',
  items: [
    { text: 'How do I create a new job?', icon: Briefcase },
    { text: 'How does scheduling work?', icon: Calendar },
    { text: 'How to assign a technician?', icon: UserPlus },
    { text: 'Tell me about estimates', icon: FileText },
  ],
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-zuper-sidebar-active"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function ChatMode({ active, messages, onSendUserMessage, onSendAssistantReply, onClose, onSwitchToCircle, onSwitchToScreenshot, screen }) {
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (active) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [active])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendAndReply = (q) => {
    onSendUserMessage(q)
    setIsTyping(true)
    setTimeout(() => {
      onSendAssistantReply(q)
      setIsTyping(false)
    }, 600 + Math.random() * 400)
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    const q = input.trim()
    if (!q) return
    setInput('')
    sendAndReply(q)
  }

  const handleSuggestion = (text) => {
    setInput('')
    sendAndReply(text)
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
      setInput(transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const contextSuggestions = useMemo(
    () => SUGGESTIONS_BY_SCREEN[screen] || DEFAULT_SUGGESTIONS,
    [screen]
  )

  if (!active) return null

  const hasMessages = messages.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[72px] right-4 z-[9998] flex flex-col"
      style={{ width: 360, height: 480 }}
    >
      <div className="bg-zuper-beige-50 border border-zuper-beige-200 shadow-xl shadow-black/[0.06] rounded-xl flex flex-col overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-zuper-beige-200/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-zuper-primary tracking-[-0.01em]">Ask Zuper</span>
            <div className="flex items-center gap-1.5">
              {onSwitchToCircle && (
                <button onClick={onSwitchToCircle} className="flex items-center gap-1 text-[10px] text-zuper-text-secondary hover:text-zuper-primary transition-colors">
                  <MousePointer2 className="w-2.5 h-2.5" />
                  Circle
                </button>
              )}
              {onSwitchToCircle && onSwitchToScreenshot && (
                <span className="text-zuper-text-secondary/30 text-[9px]">|</span>
              )}
              {onSwitchToScreenshot && (
                <button onClick={onSwitchToScreenshot} className="flex items-center gap-1 text-[10px] text-zuper-text-secondary hover:text-zuper-primary transition-colors">
                  <Camera className="w-2.5 h-2.5" />
                  Screenshot
                </button>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-md flex items-center justify-center text-zuper-muted hover:text-zuper-primary hover:bg-zuper-beige-100 transition-all"
            title="Close (Esc)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Messages / empty state */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {!hasMessages && (
            <div className="flex flex-col gap-4 pt-2">
              <div>
                <p className="text-[12px] text-zuper-text-secondary leading-relaxed">
                  {contextSuggestions.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {contextSuggestions.items.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.button
                      key={s.text}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => handleSuggestion(s.text)}
                      className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-white border border-zuper-beige-200/80 text-left hover:bg-zuper-beige-100 hover:border-zuper-sidebar-active transition-all duration-150 group"
                    >
                      <Icon className="w-3.5 h-3.5 text-zuper-muted group-hover:text-zuper-primary transition-colors mt-0.5 shrink-0" strokeWidth={1.5} />
                      <span className="text-[11px] leading-snug text-zuper-text-secondary group-hover:text-zuper-primary transition-colors">{s.text}</span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {hasMessages && (
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-5 h-5 rounded-md bg-zuper-beige-100 border border-zuper-beige-200/80 flex items-center justify-center shrink-0 mt-1">
                      <MessageSquare className="w-2.5 h-2.5 text-zuper-text-secondary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-lg px-3 py-2 ${
                      msg.role === 'user'
                        ? 'bg-zuper-primary text-white'
                        : 'bg-white border border-zuper-beige-200/80 text-zuper-text'
                    }`}
                  >
                    <p className="text-[12px] leading-relaxed">{msg.text}</p>
                    {msg.chips && msg.chips.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-zuper-beige-200/60">
                        {msg.chips.map((chip) => (
                          <span key={chip.label || chip} className="text-[10px] px-1.5 py-0.5 rounded bg-zuper-beige-50 border border-zuper-beige-200/80 text-zuper-text-secondary">{chip.label || chip}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 justify-start"
            >
              <div className="w-5 h-5 rounded-md bg-zuper-beige-100 border border-zuper-beige-200/80 flex items-center justify-center shrink-0 mt-1">
                <MessageSquare className="w-2.5 h-2.5 text-zuper-text-secondary" />
              </div>
              <div className="bg-white border border-zuper-beige-200/80 rounded-lg">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input — pinned to bottom */}
        <div className="px-3 pb-3 pt-2.5 shrink-0 border-t border-zuper-beige-200">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-white border border-zuper-beige-200 rounded-lg px-3 py-2.5 text-[12px] text-zuper-text placeholder:text-zuper-text-secondary/50 shadow-sm shadow-black/[0.02] focus:outline-none focus:border-zuper-sidebar-active focus:shadow-md focus:shadow-zuper-sidebar-active/10 transition-all"
            />
            <button
              type="button"
              onClick={toggleMic}
              className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white shadow-sm shadow-red-500/25'
                  : 'text-zuper-muted hover:text-zuper-primary hover:bg-zuper-beige-100'
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
              disabled={!input.trim()}
              className="w-9 h-9 rounded-lg bg-zuper-primary flex items-center justify-center text-white shadow-sm shadow-zuper-primary/20 disabled:opacity-30 disabled:shadow-none hover:shadow-md hover:shadow-zuper-primary/25 active:scale-95 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
