import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Target, MousePointer2, Camera, Sparkles, ArrowRight } from 'lucide-react'

const demoScenarios = [
  {
    id: 1,
    title: 'Circle the "Unassigned" badge',
    description: 'On JOB-1043, circle the red Unassigned label',
    screen: 'jobs',
    targetContext: 'unassigned-badge',
    icon: MousePointer2,
  },
  {
    id: 2,
    title: 'Circle a Draft status',
    description: 'Circle the gray Draft badge on JOB-1043',
    screen: 'jobs',
    targetContext: 'draft-status',
    icon: MousePointer2,
  },
  {
    id: 3,
    title: 'Circle estimate line items',
    description: 'Navigate to Estimates, circle the line items table',
    screen: 'estimate',
    targetContext: 'estimate-line-items',
    icon: MousePointer2,
  },
  {
    id: 4,
    title: 'Screenshot & ask "what next?"',
    description: 'Use Screenshot mode on the Jobs List',
    screen: 'jobs',
    targetContext: 'screenshot',
    icon: Camera,
  },
  {
    id: 5,
    title: 'Circle the Create Job button',
    description: 'Circle the blue + Create Job button',
    screen: 'jobs',
    targetContext: 'create-job-button',
    icon: MousePointer2,
  },
]

export default function DemoGuide({ onNavigate, onHighlight, hidden }) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeScenario, setActiveScenario] = useState(null)

  const handleScenarioClick = (scenario) => {
    setActiveScenario(scenario.id)
    onNavigate?.(scenario.screen)

    setTimeout(() => {
      const target = document.querySelector(`[data-copilot-context="${scenario.targetContext}"]`)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' })

        target.style.transition = 'box-shadow 0.3s ease'
        target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.4), 0 0 20px rgba(124, 58, 237, 0.2)'
        target.style.borderRadius = '6px'

        setTimeout(() => {
          target.style.boxShadow = ''
          target.style.borderRadius = ''
          setActiveScenario(null)
        }, 3000)
      }
    }, 300)
  }

  return (
    <div className={`fixed top-4 right-4 z-[9980] transition-all duration-300 ${hidden ? 'opacity-0 pointer-events-none translate-x-4' : 'opacity-100'}`}>
      <motion.div
        layout
        className="bg-white rounded-card border border-zuper-border shadow-panel overflow-hidden"
        style={{ width: isOpen ? 280 : 'auto' }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-zuper-surface/60 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-copilot-purple" />
            <span className="text-sm font-semibold text-zuper-text">Try These</span>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-zuper-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zuper-muted" />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-2 pb-2 space-y-0.5">
                {demoScenarios.map((scenario) => {
                  const Icon = scenario.icon
                  const isActive = activeScenario === scenario.id
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleScenarioClick(scenario)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-copilot-purple/10 border border-copilot-purple/20'
                          : 'hover:bg-zuper-surface/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            isActive ? 'bg-copilot-purple/20' : 'bg-zuper-surface'
                          }`}
                        >
                          <Icon
                            className={`w-3.5 h-3.5 ${
                              isActive ? 'text-copilot-purple' : 'text-zuper-muted'
                            }`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-medium text-zuper-text leading-tight">
                            {scenario.title}
                          </p>
                          <p className="text-[11px] text-zuper-text-secondary mt-0.5 leading-snug">
                            {scenario.description}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zuper-muted opacity-0 group-hover:opacity-100 mt-1 transition-opacity shrink-0" />
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="px-3 pb-3 pt-1">
                <div className="flex items-center gap-1.5 px-2 py-2 rounded-lg bg-copilot-purple/[0.04]">
                  <Sparkles className="w-3 h-3 text-copilot-purple shrink-0" />
                  <p className="text-[10px] text-zuper-text-secondary leading-snug">
                    Click the glowing orb, draw a circle, then ask a question
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
