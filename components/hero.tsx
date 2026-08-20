'use client'
import { useStableVh } from "@/hooks/useStableVh"
import { Link } from "@/i18n/navigation"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"

const BlackHoleVisualization = dynamic(() => import("./black-hole"), { ssr: false })

/* The entrances are CSS animations (see "Entrance animations" in
   globals.css), not framer-motion: the h1 and subtitle are the homepage's
   LCP candidates and must paint from the SSR HTML, before hydration. */
export function Hero() {
  useStableVh()
  const containerRef = useRef<HTMLElement>(null)
  const t = useTranslations("home.hero")

  // Mount the black hole only once the browser is idle: its chunk eval and
  // scene setup are the page's biggest main-thread block, and mounting it at
  // hydration stalled the entrance animations above it (mobile LCP). Its own
  // 3s bloom fade-in makes the later start imperceptible.
  const [showBlackHole, setShowBlackHole] = useState(false)
  useEffect(() => {
    if (!("requestIdleCallback" in window)) {
      setShowBlackHole(true)
      return
    }
    const id = requestIdleCallback(() => setShowBlackHole(true), { timeout: 2000 })
    return () => cancelIdleCallback(id)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden
                  min-h-[calc(var(--vh,1vh)*100)]
                  pt-[env(safe-area-inset-top)]
                  pb-[env(safe-area-inset-bottom)]
                  bg-black on-dark-surface"
    >
      {/* Black hole background */}
      {showBlackHole && <BlackHoleVisualization interactive={false} />}

      {/* Radial gradient vignette for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.8) 75%)',
        }}
      />

      {/* Noise grain texture */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.04] z-[2]"
        aria-hidden="true"
      >
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      {/* Content */}
      <div className="absolute flex flex-col h-full w-full px-6 sm:px-8 items-center z-[3]">
        {/* Title group — pinned to top area, above the black hole */}
        <div className="flex flex-col items-center w-full max-w-7xl pt-[12vh] sm:pt-[10vh]">
          <h1
            className="text-4xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-center text-white font-sans enter-fade-up"
            style={{ "--enter-delay": "0.1s" } as React.CSSProperties}
          >
            Parallax
          </h1>
          <p
            className="mt-4 text-lg sm:text-2xl text-white/80 text-center enter-fade-up"
            style={{ "--enter-delay": "0.25s" } as React.CSSProperties}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Centered in the black hole core */}
        <p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs sm:text-sm text-white/40 text-center tracking-[0.25em] uppercase enter-fade"
          style={{ "--enter-delay": "0.8s", animationDuration: "1.2s" } as React.CSSProperties}
        >
          {t("securedByPhysics")}
        </p>

        {/* Buttons — pinned to bottom */}
        <div
          className="absolute bottom-20 sm:bottom-24 flex flex-col gap-4 justify-between items-center sm:flex-row w-full max-w-4xl px-6 sm:px-8 enter-fade"
          style={{ "--enter-delay": "1s" } as React.CSSProperties}
        >
          <Button size={"2xl"} className="w-full max-w-[15rem] px-6 brand-gradient text-brand-foreground hover:opacity-90 text-sm" asChild>
            <Link href={"/participate/running-a-full-node"}>
              {t("runNode")}
            </Link>
          </Button>
          <Button size={"2xl"} variant={"secondary"} className="w-full border border-white/20 max-w-[15rem] px-6 bg-white/5 text-white hover:bg-white/10 text-sm" asChild>
            <a href={"https://docs.parallaxprotocol.org"} target="_blank" rel="noopener">
              {t("readDocs")}
            </a>
          </Button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 enter-fade"
          style={{ "--enter-delay": "1.4s" } as React.CSSProperties}
        >
          <div className="enter-bob">
            <ChevronDown className="size-5 text-white/20" />
          </div>
        </div>
      </div>
    </section>
  )
}
