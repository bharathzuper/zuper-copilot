import { useCallback } from 'react'
import html2canvas from 'html2canvas'

export function useScreenCapture() {
  const captureScreen = useCallback(async (targetSelector = '#zuper-app') => {
    const target = document.querySelector(targetSelector)
    if (!target) return null

    try {
      const canvas = await html2canvas(target, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#F8F8FA',
        logging: false,
      })
      return canvas.toDataURL('image/png')
    } catch (err) {
      console.error('Screenshot capture failed:', err)
      return null
    }
  }, [])

  return { captureScreen }
}
