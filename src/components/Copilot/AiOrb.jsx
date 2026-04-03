import { motion } from 'framer-motion'

export default function AiOrb({ isSpeaking, size = 36 }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={
          isSpeaking
            ? { scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }
            : { scale: 1, opacity: 0.15 }
        }
        transition={
          isSpeaking
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.5 }
        }
        style={{
          background: 'radial-gradient(circle, rgba(42,41,46,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Orb body */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: '#2a292e',
        }}
      >
        {/* Inner wave bars */}
        <div className="absolute inset-0 flex items-center justify-center gap-[3px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: size > 30 ? 3 : 2,
                backgroundColor: 'rgba(255,255,255,0.85)',
              }}
              animate={
                isSpeaking
                  ? {
                      height: [size * 0.15, size * (0.3 + i * 0.08), size * 0.15],
                    }
                  : { height: size * 0.12 }
              }
              transition={
                isSpeaking
                  ? {
                      duration: 0.6 + i * 0.1,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.08,
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
