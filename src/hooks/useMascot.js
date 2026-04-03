import { useRef, useCallback } from 'react'

export function useMascot() {
  const dotLottieRef = useRef(null)

  const setInstance = useCallback((instance) => {
    dotLottieRef.current = instance
  }, [])

  const play = useCallback(() => {
    dotLottieRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    dotLottieRef.current?.pause()
  }, [])

  return { setInstance, play, pause }
}
