'use client'
import { motion } from "framer-motion"

export default function PageHeader({
  title,
  subTitle,
  children,
}: {
  title: string,
  subTitle?: string,
  children?: React.ReactNode,
}) {
  return (
    <div className="relative mt-24 py-23.5 px-4 md:px-0 text-center">
      <div className="flex flex-col gap-8 max-w-4xl items-center mx-auto">
        {/* Gold accent line */}
        <motion.div
          className="w-12 h-0.5 bg-gold"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <motion.h2
          className="text-4xl text-foreground sm:text-5xl"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h2>
        {subTitle && (
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl text-pretty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {subTitle}
          </motion.p>
        )}
        {children}
      </div>
    </div>
  )
}
