"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

// Degrees of tilt toward the pointer at the card's edge. A nudge, not a flip:
// the plate should feel mounted on a pivot, still reading as a flat surface.
const MAX_TILT = 1.5

// motion.div's drag/animation callbacks collide with the DOM's, so those
// native handlers can't pass through.
type CardProps = Omit<
  React.ComponentProps<"div">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>

function Card({ className, children, ...props }: CardProps) {
  const reduceMotion = useReducedMotion()
  // Pointer position within the card, 0..1 on each axis; 0.5 is rest.
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 300, damping: 30 } as const
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), spring)

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  function onPointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      data-slot="card"
      onPointerMove={reduceMotion ? undefined : onPointerMove}
      onPointerLeave={reduceMotion ? undefined : onPointerLeave}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className={cn(
        "bg-card text-card-foreground flex flex-col rounded-none border py-2 justify-between relative group/card transition-colors duration-300 hover:border-foreground/20",
        className
      )}
      {...props}
    >
      <span aria-hidden className="plate-brackets group-hover/card:opacity-100" />
      {children}
    </motion.div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header px-6 py-6 inline-flex items-center justify-start gap-4",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-medium font-mono uppercase tracking-[0.15em] text-sm", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("px-6 pl-16 -mt-6 mb-6 text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col justify-between px-6 py-6 h-full text-muted-foreground bg-transparent leading-relaxed", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
