// useStableVh.ts
import { useEffect } from "react"

export function useStableVh() {
  useEffect(() => {
    const setOnce = () => {
      const h = window.visualViewport?.height ?? window.innerHeight
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`)
    }
    setOnce()

    // Update only on orientation (not on scroll-driven resizes)
    const onOrient = () => setTimeout(setOnce, 250)
    window.addEventListener("orientationchange", onOrient)
    return () => window.removeEventListener("orientationchange", onOrient)
  }, [])
}
