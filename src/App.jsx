import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/ZuperApp/Sidebar'
import TopBar from './components/ZuperApp/TopBar'
import JobsList from './components/ZuperApp/JobsList'
import JobDetails from './components/ZuperApp/JobDetails'
import EstimateCreate from './components/ZuperApp/EstimateCreate'
import CopilotOverlay from './components/Copilot/CopilotOverlay'

import { useCopilot } from './hooks/useCopilot'
import { Toaster } from 'sonner'

const pageVariants = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}
const pageTransition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] }

export default function App() {
  const [screen, setScreen] = useState('jobs')
  const [selectedJob, setSelectedJob] = useState(null)
  const copilot = useCopilot()

  const handleSelectJob = (job) => {
    setSelectedJob(job)
    setScreen('jobDetail')
  }

  const handleNavigate = useCallback((target) => {
    if (target === 'jobs') {
      setScreen('jobs')
      setSelectedJob(null)
    } else if (target === 'estimate') {
      setScreen('estimate')
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault()
        copilot.toggleOrb()
      }
      if (e.key === 'Escape' && copilot.mode !== copilot.MODES.IDLE && copilot.mode !== copilot.MODES.CIRCLE_SELECT) {
        copilot.closeCopilot()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [copilot.toggleOrb, copilot.closeCopilot, copilot.mode, copilot.MODES])

  const isActive = copilot.mode !== copilot.MODES.IDLE

  return (
    <div className="h-full flex flex-col">
      <TopBar onAskClick={copilot.toggleOrb} isActive={isActive} />

      <div className="flex-1 flex min-h-0">
        <Sidebar activeScreen={screen} onNavigate={handleNavigate} />

        <div id="zuper-app" className="flex-1 flex flex-col min-w-0 bg-white">
          <AnimatePresence mode="wait">
            {screen === 'jobs' && (
              <motion.div
                key="jobs"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="flex-1 flex flex-col min-h-0"
              >
                <JobsList onSelectJob={handleSelectJob} onNavigate={handleNavigate} />
              </motion.div>
            )}
            {screen === 'jobDetail' && (
              <motion.div
                key="jobDetail"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="flex-1 flex flex-col min-h-0"
              >
                <JobDetails job={selectedJob} onBack={() => handleNavigate('jobs')} />
              </motion.div>
            )}
            {screen === 'estimate' && (
              <motion.div
                key="estimate"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                className="flex-1 flex flex-col min-h-0"
              >
                <EstimateCreate onBack={() => handleNavigate('jobs')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CopilotOverlay copilot={copilot} screen={screen} />
      <Toaster
        position="bottom-left"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.96)',
            color: '#374151',
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          },
        }}
      />
    </div>
  )
}
