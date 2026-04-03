import { useState, useCallback, useRef } from 'react'
import { getResponseForContext, getChatResponse } from '../data/mockResponses'

const MODES = {
  IDLE: 'idle',
  MENU: 'menu',
  CIRCLE_SELECT: 'circleSelect',
  SCREENSHOT: 'screenshotCapture',
  CHAT: 'chat',
  RESPONDING: 'responding',
  FOLLOW_UP: 'followUp',
  LIVE_ASSIST: 'liveAssist',
}

export function useCopilot() {
  const [mode, setMode] = useState(MODES.IDLE)
  const [selectionBounds, setSelectionBounds] = useState(null)
  const [screenshotData, setScreenshotData] = useState(null)
  const [currentResponse, setCurrentResponse] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [detectedContexts, setDetectedContexts] = useState([])
  const canvasRef = useRef(null)

  const activateCircleMode = useCallback(() => {
    setMode(MODES.CIRCLE_SELECT)
    setSelectionBounds(null)
    setCurrentResponse(null)
    setDetectedContexts([])
  }, [])

  const activateScreenshotMode = useCallback(() => {
    setMode(MODES.SCREENSHOT)
    setCurrentResponse(null)
  }, [])

  const activateChatMode = useCallback(() => {
    setMode(MODES.CHAT)
    setCurrentResponse(null)
  }, [])

  const activateLiveAssist = useCallback(() => {
    setMode(MODES.LIVE_ASSIST)
    setCurrentResponse(null)
  }, [])

  const handleSelectionComplete = useCallback((bounds) => {
    setSelectionBounds(bounds)

    const elements = document.querySelectorAll('[data-copilot-context]')
    const detected = []
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      const overlap =
        rect.left < bounds.x + bounds.width &&
        rect.right > bounds.x &&
        rect.top < bounds.y + bounds.height &&
        rect.bottom > bounds.y
      if (overlap) {
        detected.push(el.getAttribute('data-copilot-context'))
      }
    })
    setDetectedContexts(detected)
  }, [])

  const submitQuestion = useCallback(
    (question) => {
      const screenType = mode === MODES.SCREENSHOT ? 'screenshot' : 'circle'
      const response = getResponseForContext(detectedContexts, screenType, question)
      setCurrentResponse(response)
      setMode(MODES.RESPONDING)
    },
    [mode, detectedContexts]
  )

  const addChatUserMessage = useCallback((question) => {
    const userMsg = { role: 'user', text: question, id: Date.now() }
    setChatMessages((prev) => [...prev, userMsg])
  }, [])

  const addChatAssistantReply = useCallback((question) => {
    const response = getChatResponse(question)
    const assistantMsg = { role: 'assistant', text: response.text, chips: response.chips, id: Date.now() }
    setChatMessages((prev) => [...prev, assistantMsg])
  }, [])

  const handleScreenshotCapture = useCallback((dataUrl) => {
    setScreenshotData(dataUrl)
  }, [])

  const closeCopilot = useCallback(() => {
    setMode(MODES.IDLE)
    setSelectionBounds(null)
    setScreenshotData(null)
    setCurrentResponse(null)
    setDetectedContexts([])
    setIsListening(false)
    setIsSpeaking(false)
    setChatMessages([])
    window.speechSynthesis?.cancel()
  }, [])

  const askFollowUp = useCallback(
    (question) => {
      const response = getResponseForContext(detectedContexts, 'circle', question)
      setCurrentResponse(response)
      setMode(MODES.RESPONDING)
    },
    [detectedContexts]
  )

  const toggleOrb = useCallback(() => {
    if (mode === MODES.IDLE) {
      setMode(MODES.MENU)
    } else {
      closeCopilot()
    }
  }, [mode, closeCopilot])

  return {
    mode,
    MODES,
    selectionBounds,
    screenshotData,
    currentResponse,
    chatMessages,
    detectedContexts,
    isListening,
    setIsListening,
    isSpeaking,
    setIsSpeaking,
    canvasRef,
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
    toggleOrb,
  }
}
