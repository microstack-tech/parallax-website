// useVh.ts
import { useEffect } from "react"

export function useVh() {
  useEffect(() => {
    const setVh = () => {
      const h = window.visualViewport?.height ?? window.innerHeight
      // 1vh = 1% of the *current visible* viewport height
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`)
    }
    setVh()
    window.addEventListener("resize", setVh)
    window.addEventListener("orientationchange", setVh)
    window.visualViewport?.addEventListener?.("resize", setVh)
    return () => {
      window.removeEventListener("resize", setVh)
      window.removeEventListener("orientationchange", setVh)
      window.visualViewport?.removeEventListener?.("resize", setVh)
    }
  }, [])
}
