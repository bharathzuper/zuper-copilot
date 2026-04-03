import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CIRCLE_R = 10
const CIRCLE_CIRC = 2 * Math.PI * CIRCLE_R
const ANIM_DURATION = 1.5
const ANIM_PAUSE = 1.5
const ANIM_EASE = [0.4, 0, 0.2, 1]

const CURSOR_XS = [16, 23.1, 26, 23.1, 16, 8.9, 6, 8.9, 16]
const CURSOR_YS = [6, 8.9, 16, 23.1, 26, 23.1, 16, 8.9, 6]
const CURSOR_OP = [0, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0]

function CircleDrawIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" className="shrink-0 text-[#6366f1]">
      <motion.circle
        cx="16" cy="16" r={CIRCLE_R}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={CIRCLE_CIRC}
        animate={{ strokeDashoffset: [CIRCLE_CIRC, 0] }}
        transition={{ duration: ANIM_DURATION, repeat: Infinity, repeatDelay: ANIM_PAUSE, ease: ANIM_EASE }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '16px 16px' }}
      />
      <motion.circle
        r="2.5"
        fill="currentColor"
        animate={{ cx: CURSOR_XS, cy: CURSOR_YS, opacity: CURSOR_OP }}
        transition={{ duration: ANIM_DURATION, repeat: Infinity, repeatDelay: ANIM_PAUSE, ease: ANIM_EASE }}
      />
    </svg>
  )
}

export default function CircleSelector({ active, onSelectionComplete, onCancel }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [path, setPath] = useState([])
  const [completed, setCompleted] = useState(false)
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    if (!active) {
      setPath([])
      setCompleted(false)
      setBounds(null)
      setIsDrawing(false)
    }
  }, [active])

  const handleMouseDown = useCallback(
    (e) => {
      if (completed) return
      setIsDrawing(true)
      setPath([{ x: e.clientX, y: e.clientY }])
    },
    [completed]
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDrawing) return
      setPath((prev) => [...prev, { x: e.clientX, y: e.clientY }])
    },
    [isDrawing]
  )

  const handleMouseUp = useCallback(() => {
    if (!isDrawing || path.length < 5) {
      setIsDrawing(false)
      setPath([])
      return
    }
    setIsDrawing(false)
    setCompleted(true)

    const xs = path.map((p) => p.x)
    const ys = path.map((p) => p.y)
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    const maxX = Math.max(...xs)
    const maxY = Math.max(...ys)

    const b = {
      x: minX - 12,
      y: minY - 12,
      width: maxX - minX + 24,
      height: maxY - minY + 24,
    }
    setBounds(b)
    onSelectionComplete?.(b)
  }, [isDrawing, path, onSelectionComplete])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onCancel?.()
      }
    },
    [onCancel]
  )

  useEffect(() => {
    if (active) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, handleKeyDown])

  if (!active) return null

  const pathD =
    path.length > 1
      ? `M ${path[0].x} ${path[0].y} ` + path.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ')
      : ''

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-[9990] ${completed ? 'pointer-events-none' : 'copilot-crosshair'}`}
        onMouseDown={completed ? undefined : handleMouseDown}
        onMouseMove={completed ? undefined : handleMouseMove}
        onMouseUp={completed ? undefined : handleMouseUp}
        ref={canvasRef}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="geminiGrad" gradientUnits="userSpaceOnUse"
              x1="0" y1="0" x2={window.innerWidth} y2={window.innerHeight}>
              <stop offset="0%">
                <animate attributeName="stop-color"
                  values="#4285F4;#9B72CB;#D96570;#E8A87C;#4285F4"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="25%">
                <animate attributeName="stop-color"
                  values="#9B72CB;#D96570;#E8A87C;#4285F4;#9B72CB"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%">
                <animate attributeName="stop-color"
                  values="#D96570;#E8A87C;#4285F4;#9B72CB;#D96570"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="75%">
                <animate attributeName="stop-color"
                  values="#E8A87C;#4285F4;#9B72CB;#D96570;#E8A87C"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%">
                <animate attributeName="stop-color"
                  values="#4285F4;#9B72CB;#D96570;#E8A87C;#4285F4"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>

            <radialGradient id="circleScrim" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.03"/>
              <stop offset="60%" stopColor="#1a1a2e" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0.12"/>
            </radialGradient>

            <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.04"/>
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.02"/>
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.04"/>
            </linearGradient>

            <filter id="geminiGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="geminiGlowWide" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
            </filter>

            <filter id="subtleNoise" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
            </filter>

          </defs>

          {completed && bounds ? (
            <>
              <defs>
                <mask id="selectionMask">
                  <rect width="100%" height="100%" fill="white"/>
                  <rect
                    x={bounds.x} y={bounds.y}
                    width={bounds.width} height={bounds.height}
                    rx="12" fill="black"
                  />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="url(#circleScrim)" mask="url(#selectionMask)"/>
              <rect width="100%" height="100%" fill="url(#edgeGlow)" mask="url(#selectionMask)"/>
              <rect width="100%" height="100%" filter="url(#subtleNoise)" opacity="0.018" mask="url(#selectionMask)"/>

              <rect
                x={bounds.x - 4} y={bounds.y - 4}
                width={bounds.width + 8} height={bounds.height + 8}
                rx="16" fill="none"
                stroke="url(#geminiGrad)"
                strokeWidth="16"
                opacity="0.15"
                filter="url(#geminiGlowWide)"
                className="gemini-pulse"
              />

              <rect
                x={bounds.x - 1} y={bounds.y - 1}
                width={bounds.width + 2} height={bounds.height + 2}
                rx="13" fill="none"
                stroke="url(#geminiGrad)"
                strokeWidth="8"
                opacity="0.3"
                filter="url(#geminiGlow)"
              />

              <rect
                x={bounds.x} y={bounds.y}
                width={bounds.width} height={bounds.height}
                rx="12" fill="none"
                stroke="url(#geminiGrad)"
                strokeWidth="3"
              />
            </>
          ) : (
            <>
              <rect width="100%" height="100%" fill="url(#circleScrim)"/>
              <rect width="100%" height="100%" fill="url(#edgeGlow)"/>
              <rect width="100%" height="100%" filter="url(#subtleNoise)" opacity="0.018"/>
            </>
          )}

          {isDrawing && pathD && (
            <>
              <path
                d={pathD}
                fill="none"
                stroke="url(#geminiGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.25"
                filter="url(#geminiGlow)"
              />

              <path
                d={pathD}
                fill="none"
                stroke="url(#geminiGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>

        {!completed && !isDrawing && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-10 z-[9999] pointer-events-none"
            style={{ left: 'calc(72px + (100% - 72px) / 2)', transform: 'translateX(-50%)' }}
          >
            <div className="flex items-center gap-3 bg-white/[0.92] backdrop-blur-xl rounded-full pl-4 pr-5 py-2.5 shadow-lg shadow-black/[0.06] border border-black/[0.06]">
              <CircleDrawIcon />
              <span className="text-[13px] font-medium text-[#1a1a2e] tracking-[-0.01em]">
                Draw around anything
              </span>
              <span className="w-px h-3.5 bg-black/10" />
              <kbd className="text-[10px] font-mono text-black/40 px-1.5 py-0.5 bg-black/[0.04] rounded">
                Esc
              </kbd>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
