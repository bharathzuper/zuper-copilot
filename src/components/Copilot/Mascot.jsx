import { useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const STATE_STYLES = {
  idle: '',
  menu: '',
  circleSelect: 'mascot-pulse',
  screenshotCapture: 'mascot-pulse',
  chat: '',
  responding: 'mascot-speaking',
  followUp: 'mascot-pulse',
}

const STATE_LABELS = {
  menu: null,
  circleSelect: null,
  screenshotCapture: null,
  chat: null,
  responding: null,
}

export default function Mascot({ visible, mode, onDotLottieReady }) {
  const stateClass = STATE_STYLES[mode] || ''
  const label = STATE_LABELS[mode] || null

  const handleRef = useCallback(
    (instance) => {
      if (instance) {
        onDotLottieReady?.(instance)
      }
    },
    [onDotLottieReady]
  )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.5 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 right-4 z-[9997] flex flex-col items-center"
        >
          {/* Speech label */}
          <AnimatePresence mode="wait">
            {label && (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mb-1 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-lg shadow-black/[0.06]"
              >
                <span className="text-[12px] font-medium text-gray-600">{label}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mascot container */}
          <div className={`relative ${stateClass}`}>
            {/* Ambient glow ring */}
            <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-violet-400/20 via-blue-400/15 to-cyan-400/20 blur-xl mascot-glow" />

            {/* Lottie character */}
            <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden bg-white shadow-lg shadow-black/[0.06] border border-gray-200">
              <DotLottieReact
                src="/mascot/robot-hello.lottie"
                loop
                autoplay
                dotLottieRefCallback={handleRef}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
