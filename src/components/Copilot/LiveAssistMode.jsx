import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Send, Mic, Radio, ChevronRight, CheckCircle2,
  AlertTriangle, Lightbulb, ArrowRight, ChevronUp,
  ChevronDown, Sparkles,
} from 'lucide-react'

const GUIDANCE_BY_SCREEN = {
  jobs: {
    greeting: 'Watching your Jobs list',
    steps: [
      {
        type: 'nudge',
        icon: AlertTriangle,
        iconColor: '#f59e0b',
        title: 'Unassigned job detected',
        body: 'Job S0123B45 "Roof Inspection" has no technician assigned. Assign before end of day to meet the SLA.',
        action: 'Open job',
      },
      {
        type: 'tip',
        icon: Lightbulb,
        iconColor: '#6366f1',
        title: 'Quick tip',
        body: 'You can bulk-select jobs using the checkboxes and assign a technician to all of them at once.',
      },
      {
        type: 'next',
        icon: ArrowRight,
        iconColor: '#059669',
        title: 'Suggested next step',
        body: 'Review the 3 "On Hold" jobs — they may need customer follow-up before the week ends.',
        action: 'Filter On Hold',
      },
    ],
    progress: { current: 2, total: 5, label: 'Daily job review' },
  },
  jobDetail: {
    greeting: 'Watching this job',
    steps: [
      {
        type: 'check',
        icon: CheckCircle2,
        iconColor: '#059669',
        title: 'Job details look complete',
        body: 'Customer, schedule, and category are all filled in. Good to go.',
      },
      {
        type: 'nudge',
        icon: AlertTriangle,
        iconColor: '#f59e0b',
        title: 'Missing estimate',
        body: 'This job has no linked estimate. Create one before dispatching so the customer knows the cost upfront.',
        action: 'Create estimate',
      },
      {
        type: 'next',
        icon: ArrowRight,
        iconColor: '#059669',
        title: 'Suggested next step',
        body: 'Update the job status to "Scheduled" and notify the assigned technician.',
        action: 'Update status',
      },
    ],
    progress: { current: 3, total: 4, label: 'Job setup checklist' },
  },
  estimate: {
    greeting: 'Watching your estimate',
    steps: [
      {
        type: 'check',
        icon: CheckCircle2,
        iconColor: '#059669',
        title: 'Line items added',
        body: 'You have 3 line items totaling $14,400. Looks good.',
      },
      {
        type: 'nudge',
        icon: AlertTriangle,
        iconColor: '#f59e0b',
        title: 'No discount applied',
        body: 'This customer has a 10% loyalty discount on file. Want to apply it?',
        action: 'Apply discount',
      },
      {
        type: 'tip',
        icon: Lightbulb,
        iconColor: '#6366f1',
        title: 'Before sending',
        body: 'Double-check the tax rate — this service address is in a different tax zone than the billing address.',
      },
    ],
    progress: { current: 2, total: 3, label: 'Estimate completion' },
  },
}

const DEFAULT_GUIDANCE = GUIDANCE_BY_SCREEN.jobs

const CHAT_REPLIES = {
  'am i missing anything': 'Looking at the current state: the job details are filled in, but you haven\'t created an estimate yet. I\'d recommend doing that before dispatching. Also, the customer\'s preferred contact method is email — make sure to send the estimate via email, not SMS.',
  'what should i do next': 'Based on your current workflow, I\'d suggest: 1) Assign the unassigned jobs from your list, 2) Review the 3 On Hold jobs for customer updates, 3) Send out pending estimates before end of day.',
  'is this correct': 'Everything on this page looks good. The job category, priority, and customer info all match. One thing to note: the scheduled date is a Saturday — confirm the technician is available for weekend work.',
}

function getAssistReply(question) {
  const q = question.toLowerCase().trim()
  for (const [key, reply] of Object.entries(CHAT_REPLIES)) {
    if (q.includes(key)) return reply
  }
  return 'Based on what I can see, you\'re on the right track. The current page data looks consistent. Let me know if you want me to check something specific — like "am I missing anything?" or "is this correct?"'
}

export default function LiveAssistMode({ active, screen, onClose }) {
  const [expanded, setExpanded] = useState(true)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)

  const guidance = useMemo(
    () => GUIDANCE_BY_SCREEN[screen] || DEFAULT_GUIDANCE,
    [screen]
  )

  useEffect(() => {
    if (!active) {
      setMessages([])
      setVisibleSteps(0)
      return
    }
    setVisibleSteps(0)
    const timers = guidance.steps.map((_, i) =>
      setTimeout(() => setVisibleSteps((v) => Math.max(v, i + 1)), 800 + i * 1200)
    )
    return () => timers.forEach(clearTimeout)
  }, [active, guidance])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, visibleSteps, isTyping])

  const sendMessage = useCallback((text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', text: text.trim(), id: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const reply = getAssistReply(text)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: reply, id: Date.now() },
      ])
      setIsTyping(false)
    }, 1200)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const toggleMic = useCallback(() => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    const recognition = new SR()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      sendMessage(transcript)
      setIsListening(false)
    }
    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [isListening, sendMessage])

  if (!active) return null

  const progress = guidance.progress

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 z-[9999] w-[380px]"
    >
      <div className="bg-white rounded-xl border border-zuper-border shadow-xl shadow-black/[0.08] overflow-hidden flex flex-col max-h-[calc(100vh-120px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zuper-border bg-[#fafaf9]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <motion.span
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-zuper-text leading-tight">Live Assist</p>
              <p className="text-[10px] text-zuper-text-secondary leading-tight">{guidance.greeting}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-zuper-beige-100 transition-colors"
            >
              {expanded ? (
                <ChevronDown className="w-4 h-4 text-zuper-muted" />
              ) : (
                <ChevronUp className="w-4 h-4 text-zuper-muted" />
              )}
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-zuper-beige-100 transition-colors"
            >
              <X className="w-4 h-4 text-zuper-muted" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Progress bar */}
              {progress && (
                <div className="px-4 pt-3 pb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium text-zuper-text-secondary">{progress.label}</span>
                    <span className="text-[11px] font-semibold text-zuper-text">{progress.current}/{progress.total}</span>
                  </div>
                  <div className="h-1.5 bg-[#f0ede8] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(progress.current / progress.total) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>
              )}

              {/* Guidance cards + chat messages */}
              <div ref={scrollRef} className="overflow-y-auto max-h-[340px] px-3 pb-3 space-y-2">
                {/* Proactive guidance steps */}
                {guidance.steps.slice(0, visibleSteps).map((step, i) => (
                  <motion.div
                    key={`step-${screen}-${i}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <StepCard step={step} />
                  </motion.div>
                ))}

                {/* Chat messages */}
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {msg.role === 'user' ? (
                      <div className="flex justify-end">
                        <div className="bg-zuper-primary text-white text-[13px] leading-5 px-3 py-2 rounded-xl rounded-br-md max-w-[85%]">
                          {msg.text}
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-start">
                        <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="bg-[#f8f6f2] text-zuper-text text-[13px] leading-5 px-3 py-2 rounded-xl rounded-bl-md max-w-[85%]">
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                    </div>
                    <div className="bg-[#f8f6f2] px-3 py-2.5 rounded-xl rounded-bl-md">
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-zuper-sidebar-active"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="px-3 pb-3 pt-1">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-[#f5f3ef] rounded-lg border border-zuper-border px-3 py-2 gap-2 focus-within:border-zuper-primary/30 transition-colors">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-[13px] text-zuper-text placeholder:text-zuper-text-secondary/50 outline-none"
                    />
                    <button
                      type="button"
                      onClick={toggleMic}
                      className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-md transition-all ${
                        isListening
                          ? 'bg-red-500 text-white shadow-sm shadow-red-500/25'
                          : 'text-zuper-muted hover:text-zuper-text'
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      {isListening && (
                        <motion.span
                          className="absolute w-7 h-7 rounded-md border-2 border-red-400"
                          animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-zuper-primary text-white disabled:opacity-30 hover:bg-zuper-primary/90 active:scale-95 transition-all shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function StepCard({ step }) {
  const Icon = step.icon
  const bgByType = {
    check: 'bg-emerald-50 border-emerald-100',
    nudge: 'bg-amber-50 border-amber-100',
    tip: 'bg-indigo-50 border-indigo-100',
    next: 'bg-emerald-50 border-emerald-100',
  }

  return (
    <div className={`rounded-lg border p-3 ${bgByType[step.type] || 'bg-white border-zuper-border'}`}>
      <div className="flex items-start gap-2.5">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${step.iconColor}14` }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: step.iconColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-semibold text-zuper-text leading-tight">{step.title}</p>
          <p className="text-[12px] text-zuper-text-secondary leading-[18px] mt-0.5">{step.body}</p>
          {step.action && (
            <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              {step.action}
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
