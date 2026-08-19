'use client'
import { useStableVh } from "@/hooks/useStableVh"
import { Link } from "@/i18n/navigation"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"

const BlackHoleVisualization = dynamic(() => import("./black-hole"), { ssr: false })

export function Hero() {
  useStableVh()
  const containerRef = useRef<HTMLElement>(null)
  const t = useTranslations("home.hero")

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
      <BlackHoleVisualization interactive={false} />

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
        <div className="flex flex-col items-center w-full max-w-7xl pt-[18vh] sm:pt-[15vh]">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-center text-white font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Parallax
          </motion.h1>
          <motion.p
            className="mt-4 text-lg sm:text-2xl text-white/80 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Centered in the black hole core */}
        <motion.p
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs sm:text-sm text-white/40 text-center tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          {t("securedByPhysics")}
        </motion.p>

        {/* Buttons — pinned to bottom */}
        <motion.div
          className="absolute bottom-20 sm:bottom-24 flex flex-col gap-4 justify-between items-center sm:flex-row w-full max-w-4xl px-6 sm:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
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
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5 text-white/20" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
