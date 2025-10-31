"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Continent, continents, Exchange, exchanges } from "./exchange-list"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const ExchangeCmp = ({ exchange }: { exchange: Exchange }) => {
  return (
    <Link href={exchange.url} target="_blank" className="flex flex-col rounded-2xl border bg-muted overflow-hidden" >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 px-8 py-4 font-semibold text-foreground text-balance text-lg">
        <div>
          {exchange.name}
        </div>
        <div className="flex flex-row gap-4">
        </div>
      </div>
    </Link >
  )
}

export default function ExchangePage() {
  const [activeCategory, setActiveCategory] = useState<Continent>("international")

  const exchangesSorted = exchanges.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <MainMotion>
      <PageHeader
        title="Parallax Exchanges"
        subTitle="Place to buy Parallax in exchange for other currencies."
      />
      {/* Exchanges Content */}
      <section className="flex flex-col gap-16 mt-24 bg-transparent z-10 px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-8 mx-auto w-full max-w-7xl">
          <Alert>
            <AlertCircleIcon />
            <AlertTitle className="text-base">Note:</AlertTitle>
            <AlertDescription className="text-base">
              <p className="mt-4">
                Exchanges provide highly varying degrees of safety, security, privacy, and control over your funds and personal information. Always perform your own due diligence and ensure you use a trusted wallet to hold your coins before interacting with any exchange.
              </p>
              <p className="mt-4">
                <strong>Parallax is not affiliated with, nor responsible for, any of the exchanges listed below.</strong> Use them at your own discretion.
              </p>
            </AlertDescription>
          </Alert>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mx-auto w-full max-w-7xl">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-2">
                {continents.map((continent) => (
                  <Button
                    key={continent.id}
                    onClick={() => setActiveCategory(continent.id)}
                    variant={'ghost'}
                    className={`flex flex-row w-full text-base py-5 cursor-pointer justify-between text-left ${activeCategory === continent.id
                      ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-white"
                      : ""
                      }`}
                  >
                    {continent.name}
                    <Badge variant={'outline'} className={cn("text-foreground", {
                      "text-background border-background/25": activeCategory === continent.id
                    })}>
                      {exchanges.filter(e => e.location.find(c => c === continent.id)).length}
                    </Badge>
                  </Button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground capitalize mb-6">
                {continents.find((cat) => cat.id === activeCategory)?.name}
              </h2>
              {exchangesSorted.filter(e => e.location.find(l => l === activeCategory)).map((e, i) => {
                const exchangeId = `${activeCategory}-${i}`
                return (
                  <ExchangeCmp key={exchangeId} exchange={e} />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
