import { X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { label: 'Job -#JN-245678', closeable: true },
  { label: 'Invoice- #771233', closeable: true },
  { label: 'Quote -#JN-245678', closeable: true },
  { label: 'Add New', closeable: false, isAdd: true },
]

export default function TopBar({ onAskClick, isActive }) {
  return (
    <header className="h-16 flex items-center justify-between pl-8 pr-4 py-3 shrink-0">
      <div className="flex gap-7 items-center">
        <div className="flex items-center py-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <img src="/icons/zuper-logo.svg" alt="Zuper" className="w-6 h-6" />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="bg-white rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.15)] p-2 flex items-center justify-center">
            <img src="/icons/home-tab.svg" alt="Home" className="w-4 h-[17px]" />
          </div>

          {tabs.map((tab) => (
            <div
              key={tab.label}
              className="flex gap-1 items-center justify-center px-3 py-2 rounded-lg bg-zuper-chip-bg border border-zuper-chip-border"
              style={{ borderWidth: '0.75px' }}
            >
              <span className="text-xs font-semibold leading-[1.2] text-[rgba(0,0,0,0.72)] whitespace-nowrap">
                {tab.label}
              </span>
              {tab.closeable && (
                <img src="/icons/tab-close.svg" alt="Close" className="w-4 h-4" />
              )}
              {tab.isAdd && (
                <img src="/icons/tab-add.svg" alt="Add" className="w-4 h-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {/* Ask Copilot trigger */}
        <motion.button
          onClick={onAskClick}
          whileTap={{ scale: 0.96 }}
          className={`
            relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold
            transition-all duration-200 cursor-pointer select-none
            ${isActive
              ? 'bg-zuper-chip-bg border border-zuper-sidebar-active text-zuper-primary'
              : 'bg-zuper-chip-bg border border-zuper-chip-border text-[rgba(0,0,0,0.72)] hover:border-zuper-sidebar-active hover:text-zuper-primary'
            }
          `}
          style={{ borderWidth: '0.75px' }}
          title="Zuper Copilot (⌘J)"
        >
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="sparkle"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
          <span>{isActive ? 'Close' : 'Ask'}</span>
          {!isActive && (
            <kbd className="hidden sm:inline-flex px-1 py-0.5 rounded bg-black/[0.06] text-[9px] text-current opacity-40 font-mono">
              ⌘J
            </kbd>
          )}
        </motion.button>

        <div className="w-px h-5 bg-gray-200 mx-1" />

        <div className="flex items-center justify-center w-8 h-8 rounded-full p-1">
          <img src="/icons/search-topbar.svg" alt="Search" className="w-4 h-4" />
        </div>
        <img src="/icons/calendar-topbar.svg" alt="Calendar" className="w-5 h-5" />
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zuper-sidebar-active p-1">
          <span className="text-xs font-bold text-black tracking-[0.17px]">RG</span>
        </div>
      </div>
    </header>
  )
}
