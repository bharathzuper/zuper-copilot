import { AnimatePresence, motion } from 'framer-motion'
import { MousePointer2, Camera, MessageCircle, Radio } from 'lucide-react'
import CircleSelector from './CircleSelector'
import SelectionPopup from './SelectionPopup'
import ResponsePanel from './ResponsePanel'
import ScreenshotMode from './ScreenshotMode'
import ChatMode from './ChatMode'
import LiveAssistMode from './LiveAssistMode'

function ModePicker({ onCircle, onScreenshot, onChat, onLiveAssist }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[72px] right-4 z-[9999]"
    >
      <div className="w-[224px] rounded-xl p-1.5 bg-zuper-beige-50 border border-zuper-beige-200 shadow-xl shadow-black/[0.06]">
        <button
          onClick={onChat}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-zuper-beige-100 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-zuper-beige-200/80 flex items-center justify-center shrink-0 group-hover:border-zuper-sidebar-active transition-colors">
            <MessageCircle className="w-4 h-4 text-zuper-primary group-hover:text-zuper-primary transition-colors" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-zuper-primary">Ask Anything</p>
            <p className="text-[10px] text-zuper-text-secondary leading-tight">Chat with Copilot</p>
          </div>
        </button>
        <button
          onClick={onCircle}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-zuper-beige-100 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-zuper-beige-200/80 flex items-center justify-center shrink-0 group-hover:border-zuper-sidebar-active transition-colors">
            <MousePointer2 className="w-4 h-4 text-zuper-primary group-hover:text-zuper-primary transition-colors" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-zuper-primary">Circle & Ask</p>
            <p className="text-[10px] text-zuper-text-secondary leading-tight">Draw around anything</p>
          </div>
        </button>
        <button
          onClick={onScreenshot}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-zuper-beige-100 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-zuper-beige-200/80 flex items-center justify-center shrink-0 group-hover:border-zuper-sidebar-active transition-colors">
            <Camera className="w-4 h-4 text-zuper-primary group-hover:text-zuper-primary transition-colors" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-zuper-primary">Screenshot & Talk</p>
            <p className="text-[10px] text-zuper-text-secondary leading-tight">Capture and ask</p>
          </div>
        </button>
        <div className="mx-2 my-0.5 border-t border-zuper-beige-200/60" />
        <button
          onClick={onLiveAssist}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-zuper-beige-100 transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-white border border-zuper-beige-200/80 flex items-center justify-center shrink-0 group-hover:border-zuper-sidebar-active transition-colors relative">
            <Radio className="w-4 h-4 text-zuper-primary group-hover:text-zuper-primary transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-zuper-primary">Live Assist</p>
            <p className="text-[10px] text-zuper-text-secondary leading-tight">Real-time guidance</p>
          </div>
        </button>
      </div>
    </motion.div>
  )
}

function ModeSwitch({ currentMode, onSwitch }) {
  const isCircle = currentMode === 'circle'
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[72px] right-4 z-[9999]"
    >
      <button
        onClick={onSwitch}
        className="bg-zuper-beige-50 border border-zuper-beige-200 shadow-lg shadow-black/[0.04] rounded-lg px-3 py-2 flex items-center gap-2 hover:bg-zuper-beige-100 transition-colors group"
      >
        {isCircle ? (
          <Camera className="w-3.5 h-3.5 text-zuper-text-secondary group-hover:text-zuper-primary transition-colors" />
        ) : (
          <MousePointer2 className="w-3.5 h-3.5 text-zuper-text-secondary group-hover:text-zuper-primary transition-colors" />
        )}
        <span className="text-[11px] font-medium text-zuper-text-secondary group-hover:text-zuper-primary transition-colors">
          {isCircle ? 'Screenshot mode' : 'Circle mode'}
        </span>
      </button>
    </motion.div>
  )
}

export default function CopilotOverlay({ copilot, screen }) {
  const {
    mode,
    MODES,
    selectionBounds,
    screenshotData,
    currentResponse,
    chatMessages,
    detectedContexts,
    activateCircleMode,
    activateScreenshotMode,
    activateChatMode,
    activateLiveAssist,
    handleSelectionComplete,
    submitQuestion,
    addChatUserMessage,
    addChatAssistantReply,
    handleScreenshotCapture,
    closeCopilot,
    askFollowUp,
  } = copilot

  return (
    <>
      {/* Mode picker menu — drops down from Ask button */}
      <AnimatePresence>
        {mode === MODES.MENU && (
          <ModePicker
            onCircle={activateCircleMode}
            onScreenshot={activateScreenshotMode}
            onChat={activateChatMode}
            onLiveAssist={activateLiveAssist}
          />
        )}
      </AnimatePresence>

      {/* Circle selection overlay */}
      <CircleSelector
        active={mode === MODES.CIRCLE_SELECT}
        onSelectionComplete={handleSelectionComplete}
        onCancel={closeCopilot}
      />

      {/* Selection popup (after circle drawn, before response) */}
      <AnimatePresence>
        {mode === MODES.CIRCLE_SELECT && selectionBounds && !currentResponse && (
          <SelectionPopup
            bounds={selectionBounds}
            onSubmit={submitQuestion}
            onCancel={closeCopilot}
            detectedContexts={detectedContexts}
          />
        )}
      </AnimatePresence>

      {/* Screenshot mode panel */}
      <AnimatePresence>
        <ScreenshotMode
          active={mode === MODES.SCREENSHOT && !currentResponse}
          onCapture={handleScreenshotCapture}
          onSubmit={submitQuestion}
          onSwitchMode={activateCircleMode}
        />
      </AnimatePresence>

      {/* Chat mode panel */}
      <AnimatePresence>
        {mode === MODES.CHAT && (
          <ChatMode
            active
            messages={chatMessages}
            onSendUserMessage={addChatUserMessage}
            onSendAssistantReply={addChatAssistantReply}
            onClose={closeCopilot}
            onSwitchToCircle={activateCircleMode}
            onSwitchToScreenshot={activateScreenshotMode}
            screen={screen}
          />
        )}
      </AnimatePresence>

      {/* Live Assist mode */}
      <AnimatePresence>
        {mode === MODES.LIVE_ASSIST && (
          <LiveAssistMode
            active
            screen={screen}
            onClose={closeCopilot}
          />
        )}
      </AnimatePresence>

      {/* Response panel */}
      <AnimatePresence>
        {mode === MODES.RESPONDING && currentResponse && (
          <ResponsePanel
            response={currentResponse}
            screenshotData={screenshotData}
            onClose={closeCopilot}
            onFollowUp={askFollowUp}
          />
        )}
      </AnimatePresence>

      {/* Mode switch — visible after circle selection is drawn */}
      <AnimatePresence>
        {mode === MODES.CIRCLE_SELECT && selectionBounds && !currentResponse && (
          <ModeSwitch currentMode="circle" onSwitch={activateScreenshotMode} />
        )}
      </AnimatePresence>
    </>
  )
}
