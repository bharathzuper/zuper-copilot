import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ThumbsUp, ThumbsDown, Send, Volume2, VolumeX, Mic, Copy, Check } from 'lucide-react'
import AiOrb from './AiOrb'
import ActionChips from './ActionChips'
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis'

export default function ResponsePanel({ response, onClose, onFollowUp, screenshotData }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(true)
  const [followUp, setFollowUp] = useState('')
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [copied, setCopied] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState(null)
  const { speak, stop, isSpeaking } = useSpeechSynthesis()
  const intervalRef = useRef(null)
  const hasSpokenRef = useRef(false)
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!response?.text) return

    setDisplayedText('')
    setIsStreaming(true)
    hasSpokenRef.current = false

    let index = 0
    const text = response.text

    intervalRef.current = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1))
        index++
      } else {
        clearInterval(intervalRef.current)
        setIsStreaming(false)
      }
    }, 20)

    const voiceTimer = setTimeout(() => {
      if (voiceEnabled && !hasSpokenRef.current) {
        hasSpokenRef.current = true
        speak(text, response.audioKey)
      }
    }, 300)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(voiceTimer)
      stop()
    }
  }, [response])

  const skipStreaming = useCallback(() => {
    if (!isStreaming || !response?.text) return
    clearInterval(intervalRef.current)
    setDisplayedText(response.text)
    setIsStreaming(false)
  }, [isStreaming, response])

  const toggleVoice = () => {
    if (isSpeaking) {
      stop()
    }
    setVoiceEnabled((v) => !v)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(response.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (type) => {
    setFeedbackGiven(type)
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
      setFollowUp(transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const handleFollowUp = (e) => {
    e.preventDefault()
    if (followUp.trim()) {
      onFollowUp?.(followUp.trim())
      setFollowUp('')
    }
  }

  if (!response) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 40, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-[72px] right-4 bottom-4 w-[400px] z-[9998] flex flex-col"
      >
        <div className="bg-zuper-beige-50 border border-zuper-beige-200 shadow-xl shadow-black/[0.06] rounded-xl flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zuper-beige-200/80 shrink-0">
            <div className="flex items-center gap-3">
              <AiOrb isSpeaking={isSpeaking} size={32} />
              <div>
                <span className="text-[13px] font-semibold text-zuper-primary">Zuper Copilot</span>
                <div className="text-[11px] text-zuper-text-secondary mt-0.5">
                  {isStreaming ? (
                    <span className="flex items-center gap-1">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="inline-block w-1 h-1 rounded-full bg-zuper-primary"
                      />
                      Thinking...
                    </span>
                  ) : isSpeaking ? 'Speaking...' : 'Response complete'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <button
                onClick={toggleVoice}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zuper-muted hover:text-zuper-primary hover:bg-zuper-beige-100 transition-all"
                title={voiceEnabled ? 'Mute voice' : 'Enable voice'}
              >
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zuper-muted hover:text-zuper-primary hover:bg-zuper-beige-100 transition-all"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {screenshotData && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 rounded-lg overflow-hidden border border-zuper-beige-200"
              >
                <img
                  src={screenshotData}
                  alt="Screenshot"
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            <div
              className={`text-[14px] leading-[1.7] text-zuper-text ${isStreaming ? 'cursor-pointer' : ''}`}
              onClick={isStreaming ? skipStreaming : undefined}
              title={isStreaming ? 'Click to show full response' : undefined}
            >
              {displayedText}
              {isStreaming && <span className="typewriter-cursor" />}
            </div>

            {!isStreaming && <ActionChips chips={response.chips} />}

            {/* Actions row: copy + feedback */}
            {!isStreaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between mt-5 pt-3 border-t border-zuper-beige-200/60"
              >
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[11px] text-zuper-muted hover:text-zuper-primary transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <div className="flex items-center gap-1">
                  {feedbackGiven ? (
                    <span className="text-[11px] text-zuper-text-secondary">Thanks for the feedback</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleFeedback('up')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zuper-muted hover:text-emerald-500 hover:bg-emerald-50 transition-all"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback('down')}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-zuper-muted hover:text-red-400 hover:bg-red-50 transition-all"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Follow-up input */}
          <div className="px-3 pb-3 pt-2.5 shrink-0 border-t border-zuper-beige-200">
            <form onSubmit={handleFollowUp} className="flex items-center gap-2">
              <input
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Ask a follow-up..."
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
                disabled={!followUp.trim()}
                className="w-9 h-9 rounded-lg bg-zuper-primary flex items-center justify-center text-white shadow-sm shadow-zuper-primary/20 disabled:opacity-30 disabled:shadow-none hover:shadow-md hover:shadow-zuper-primary/25 active:scale-95 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
