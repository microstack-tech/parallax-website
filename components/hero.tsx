'use client'
import BlackHoleVisualization from "./black-hole"
import { useStableVh } from "@/hooks/useStableVh"

export function Hero() {
  useStableVh()
  return (
    <section className="relative isolate overflow-hidden bg-background
                        min-h-[calc(var(--vh,1vh)*100)]
                        pt-[env(safe-area-inset-top)]
                        pb-[env(safe-area-inset-bottom)]">

      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <BlackHoleVisualization />
      </div>

      <div className="relative flex flex-col justify-between z-10 min-h-[calc(var(--vh,1vh)*100)] mx-auto max-w-7xl px-2 py-16 pb-8 sm:pb-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-foreground drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
            <span className="bg-gradient-to-r px-1 from-white to-white/60 bg-clip-text text-transparent">
              Parallax
            </span>
          </h1>

          <p className="mt-4 text-xl text-muted-foreground font-medium">
            Open source protocol for P2P Programmable Cash System
          </p>
        </div>
        <h2 className="text-center p-2 text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
          Scarce. Decentralized.
          <br />
          Permissionless. Programmable.
        </h2>
      </div>
    </section>
  )
}
