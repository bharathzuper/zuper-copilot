import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Send, Mic, Loader2, MousePointer2, RotateCcw } from 'lucide-react'
import { useScreenCapture } from '../../hooks/useScreenCapture'

export default function ScreenshotMode({ active, onCapture, onSubmit, onSwitchMode }) {
  const { captureScreen } = useScreenCapture()
  const [screenshot, setScreenshot] = useState(null)
  const [question, setQuestion] = useState('')
  const [isCapturing, setIsCapturing] = useState(false)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    if (!active) {
      setScreenshot(null)
      setQuestion('')
    }
  }, [active])

  const handleCapture = async () => {
    setIsCapturing(true)
    const dataUrl = await captureScreen('#zuper-app')
    setIsCapturing(false)
    if (dataUrl) {
      setScreenshot(dataUrl)
      onCapture?.(dataUrl)
    }
  }

  const handleRetake = async () => {
    setScreenshot(null)
    setQuestion('')
    setIsCapturing(true)
    const dataUrl = await captureScreen('#zuper-app')
    setIsCapturing(false)
    if (dataUrl) {
      setScreenshot(dataUrl)
      onCapture?.(dataUrl)
    }
  }

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (question.trim()) {
      onSubmit?.(question.trim())
    }
  }

  const toggleMic = () => {
    if (isListening) {
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
    recognition.start()
    setIsListening(true)
  }

  if (!active) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[72px] right-4 z-[9998] w-[340px]"
    >
      <div className="bg-zuper-beige-50 border border-zuper-beige-200 shadow-xl shadow-black/[0.06] rounded-xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-zuper-primary" />
            <span className="text-[12px] font-semibold text-zuper-primary">
              Screenshot & Talk
            </span>
          </div>
          {onSwitchMode && (
            <button
              onClick={onSwitchMode}
              className="flex items-center gap-1.5 text-[10px] text-zuper-text-secondary hover:text-zuper-primary transition-colors"
            >
              <MousePointer2 className="w-2.5 h-2.5" />
              Circle
            </button>
          )}
        </div>

        {!screenshot ? (
          <button
            onClick={handleCapture}
            disabled={isCapturing}
            className="w-full flex items-center justify-center gap-2.5 py-4 rounded-lg bg-white border border-zuper-beige-200 text-zuper-text-secondary hover:text-zuper-primary hover:bg-zuper-beige-100 hover:border-zuper-sidebar-active transition-all duration-200 group"
          >
            {isCapturing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-[13px] font-medium">Capturing...</span>
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 group-hover:text-zuper-primary transition-colors" />
                <span className="text-[13px] font-medium">Capture current screen</span>
              </>
            )}
          </button>
        ) : (
          <>
            <div className="relative rounded-lg overflow-hidden border border-zuper-beige-200 mb-3 group">
              <img src={screenshot} alt="Captured screenshot" className="w-full h-auto" />
              <button
                onClick={handleRetake}
                className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-zuper-beige-50/90 backdrop-blur-sm border border-zuper-beige-200 flex items-center justify-center text-zuper-muted hover:text-zuper-primary opacity-0 group-hover:opacity-100 transition-all duration-150 shadow-sm"
                title="Retake"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask about this..."
                className="flex-1 bg-white border border-zuper-beige-200 rounded-lg px-3 py-2.5 text-[12px] text-zuper-text placeholder:text-zuper-text-secondary/50 shadow-sm shadow-black/[0.02] focus:outline-none focus:border-zuper-sidebar-active focus:shadow-md focus:shadow-zuper-sidebar-active/10 transition-all"
                autoFocus
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
                disabled={!question.trim()}
                className="w-9 h-9 rounded-lg bg-zuper-primary flex items-center justify-center text-white shadow-sm shadow-zuper-primary/20 disabled:opacity-30 disabled:shadow-none hover:shadow-md hover:shadow-zuper-primary/25 active:scale-95 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  )
}
