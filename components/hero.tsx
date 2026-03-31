'use client'
import { useStableVh } from "@/hooks/useStableVh"
import Link from "next/link"
import { Button } from "./ui/button"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"

export function Hero() {
  useStableVh()
  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0.65)
  const mouseY = useMotionValue(0.4)

  const springConfig = { damping: 30, stiffness: 120 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const ghostX = useTransform(smoothX, [0, 1], [-8, 8])
  const ghostY = useTransform(smoothY, [0, 1], [-5, 5])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <section
      ref={containerRef}
      className="relative isolate overflow-hidden
                  min-h-[calc(var(--vh,1vh)*100)]
                  pt-[env(safe-area-inset-top)]
                  pb-[env(safe-area-inset-bottom)]"
    >
      {/* Noise grain texture — analog, physical, replaces generic SVG lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.045]"
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
      <div className="absolute flex flex-col justify-evenly h-full w-full px-6 sm:px-8 items-center">
        <div className="flex flex-col items-center w-full max-w-7xl">
          <div className="relative flex flex-col items-center w-full">
            {/* Purple ghost — tracks mouse, creating a chromatic aberration / parallax effect */}
            <motion.span
              className="absolute top-0 w-full text-4xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-center text-primary/20 select-none pointer-events-none"
              style={{ x: ghostX, y: ghostY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              aria-hidden="true"
            >
              Parallax
            </motion.span>
            <motion.h1
              className="text-4xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Parallax
            </motion.h1>
          </div>
          <motion.p
            className="mt-6 text-lg sm:text-2xl text-muted-foreground text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            A peer-to-peer programmable cash system.
          </motion.p>
        </div>

        <motion.p
          className="font-mono text-xs sm:text-sm text-muted-foreground/50 text-center tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Secured by Physics.
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 justify-between items-center sm:flex-row w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Button size={"2xl"} className="w-full max-w-[15rem] px-6" asChild>
            <Link href={"/participate/running-a-full-node"}>
              Run a node
            </Link>
          </Button>
          <Button size={"2xl"} variant={"secondary"} className="w-full border-2 max-w-[15rem] px-6" asChild>
            <Link href={"https://docs.parallaxprotocol.org"}>
              Read the Docs
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
