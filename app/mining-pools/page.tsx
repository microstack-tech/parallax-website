"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { Continent, continents, Pool, pools } from "./pool-list"
import { cn } from "@/lib/utils"

const PoolsCmp = ({ pool }: { pool: Pool }) => {
  return (
    <Link href={pool.url} target="_blank" className="flex flex-col rounded-2xl border bg-muted overflow-hidden" >
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 px-8 py-4 font-semibold text-foreground text-balance text-lg">
        <div>
          {pool.name}
        </div>
        <div className="flex flex-row gap-4">
          <Badge variant={'secondary'} className="font-semibold">
            {pool.capabilities.map((c, i) => (
              <div key={`${pool.name}_${c}`}>
                {c.concat(pool.capabilities.length - 1 === i ? '' : ' | ')}
              </div>
            ))}
          </Badge>
        </div>
      </div>
    </Link >
  )
}

export default function MiningPoolsPage() {
  const [activeCategory, setActiveCategory] = useState<Continent | 'all'>("all")

  const poolSorted = pools.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <MainMotion>
      <PageHeader
        title="Mining Pools"
        subTitle="Connect with Parallax miners worldwide — explore pools near you and join the growing global network."
      />
      {/* Pools Content */}
      <section className="flex mt-24 bg-transparent z-10 px-6 lg:px-8 mb-16">
        <div className="flex flex-col lg:flex-row gap-8 mx-auto w-full max-w-7xl">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-2">
                <Button
                  onClick={() => setActiveCategory('all')}
                  variant={'ghost'}
                  className={`flex flex-row w-full text-base py-5 cursor-pointer justify-between text-left ${activeCategory === 'all'
                    ? "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-white"
                    : ""
                    }`}
                >
                  All
                  <Badge variant={'outline'} className={cn("text-foreground", {
                    "text-background border-background/25": activeCategory === 'all'
                  })}>
                    {pools.length}
                  </Badge>
                </Button>
                {continents.map((continent) => (
                  <Button
                    key={continent.id}
                    onClick={() => setActiveCategory(continent.id)}
                    variant={'ghost'}
                    className={cn(`flex flex-row w-full text-base py-5 cursor-pointer justify-between text-left`, {
                      "bg-primary text-primary-foreground font-semibold hover:bg-primary hover:text-white": activeCategory === continent.id
                    })}
                  >
                    {continent.name}
                    <Badge variant={'outline'} className={cn("text-foreground", {
                      "text-background border-background/25": activeCategory === continent.id
                    })}>
                      {pools.filter(p => p.location.find(c => c === continent.id)).length}
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
                {activeCategory === 'all' && (
                  <>
                    All mining pools
                  </>
                )}
              </h2>

              {activeCategory === 'all' && poolSorted.map((pool, index) => {
                const poolId = `${activeCategory}-${index}`
                return (
                  <PoolsCmp key={poolId} pool={pool} />
                )
              })}

              {poolSorted.filter(p => p.location.find(l => l === activeCategory)).map((pool, index) => {
                const poolId = `${activeCategory}-${index}`

                return (
                  <PoolsCmp key={poolId} pool={pool} />
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
