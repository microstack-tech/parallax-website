"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-gold mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">Page not found</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button className="bg-gold text-gold-foreground hover:bg-gold/90" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
