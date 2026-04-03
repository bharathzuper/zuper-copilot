import { useState, useCallback, useRef } from 'react'

export function preloadVoiceModel() {
  // No-op — audio files are pre-generated static assets
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef(null)

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }, [])

  const speakWithBrowser = useCallback((text) => {
    const synth = window.speechSynthesis
    if (!synth) { setIsSpeaking(false); return }

    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = synth.getVoices()

    const preferred = [
      'Samantha', 'Google UK English Female', 'Google US English',
      'Ava', 'Karen', 'Daniel', 'Microsoft Zira',
    ]
    for (const name of preferred) {
      const match = voices.find((v) => v.name.includes(name) && v.lang.startsWith('en'))
      if (match) { utterance.voice = match; break }
    }

    utterance.rate = 1.0
    utterance.pitch = 1.0
    utterance.volume = 0.9
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    synth.speak(utterance)
  }, [])

  const speak = useCallback(
    (text, audioKey) => {
      stopAudio()

      if (audioKey) {
        const audio = new Audio(`/audio/${audioKey}.wav`)
        audioRef.current = audio

        audio.onplay = () => setIsSpeaking(true)
        audio.onended = () => {
          setIsSpeaking(false)
          audioRef.current = null
        }
        audio.onerror = () => {
          setIsSpeaking(false)
          audioRef.current = null
          speakWithBrowser(text)
        }

        audio.play().catch(() => speakWithBrowser(text))
      } else {
        speakWithBrowser(text)
      }
    },
    [stopAudio, speakWithBrowser]
  )

  const stop = useCallback(() => {
    stopAudio()
  }, [stopAudio])

  return { speak, stop, isSpeaking }
}
