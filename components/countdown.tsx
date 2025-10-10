'use client'

import { useEffect, useState } from "react"

export default function Countdown() {
  const launchDate = new Date(1761678000000).getTime()
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = launchDate - now

      if (diff <= 0) {
        setTimeLeft(`"I'm sure that in 20 years there will either be very large transaction volume or no volume." - Satoshi Nakamoto`)
        clearInterval(interval)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      const milliseconds = Math.floor(diff % 1000)

      const pad2 = (n: number) => n.toString().padStart(2, "0")
      const pad3 = (n: number) => n.toString().padStart(3, "0")

      setTimeLeft(
        `T−${pad2(days)}D ${pad2(hours)}H ${pad2(minutes)}M ${pad2(seconds)}S.${pad3(milliseconds)}`
      )
    }, 50)

    return () => clearInterval(interval)
  }, [launchDate])

  return (
    <div className="flex flex-col items-end">
      <span className="text-xs sm:text-base font-mono text-cyan-400 mt-2 sm:mt-0 sm:ml-4 select-none tracking-tight text-right max-w-[24rem]">
        {timeLeft}
      </span>
    </div>
  )
}
