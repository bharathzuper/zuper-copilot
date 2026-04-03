import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import '../../styles/copilot.css'

export default function CopilotButton({ isActive, onClick }) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <motion.div className="relative group" whileTap={{ scale: 0.95 }}>
        {/* Outer glow ring */}
        <div
          className={`copilot-orb-ring ${isActive ? 'copilot-orb-active' : ''}`}
        />

        {/* Pulsing halo */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
              }}
            />
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          className="relative w-14 h-14 rounded-full shadow-orb flex items-center justify-center overflow-hidden"
          title={isActive ? 'Close Copilot' : 'Zuper Copilot — Ask me anything'}
        >
          <div className="copilot-orb-bg absolute inset-0 rounded-full" />
          <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5 text-white" strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="sparkle"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        {/* Tooltip */}
        {!isActive && (
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="copilot-panel rounded-lg px-3 py-2 text-xs text-gray-700 whitespace-nowrap font-medium flex items-center gap-2">
              Zuper Copilot
              <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-[10px] text-gray-400 font-mono">
                ⌘K
              </kbd>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
