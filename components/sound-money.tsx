'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Scale,
  Zap,
  Hourglass,
  CircuitBoard,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { FadeIn } from "./fade-in"

const primaryFeatures = [
  {
    icon: Scale,
    title: "Hard Capped Supply",
    description: `A finite and predictable emission schedule identical to Bitcoin's. No monetary discretion and no hidden inflation. The rules for supply are encoded in the protocol, not set by committees.`,
  },
  {
    icon: Zap,
    title: "Energy Secured Value",
    description: `Hashrate ties the currency to real world energy and silicon. Attacking the chain requires burning the same physics that protect it, anchoring Parallax's monetary integrity in measurable cost rather than social trust.`,
  },
]

const secondaryFeatures = [
  {
    icon: Users,
    title: "Fair Launch Economics",
    description: "No premine, no VC allocation, no insider advantages. Every coin must be earned under the same rules.",
  },
  {
    icon: Hourglass,
    title: "Settlement-First Blocks",
    description: "Ten minute blocks keep coordination stress low and decentralization high. Designed for durable settlement.",
  },
  {
    icon: CircuitBoard,
    title: "Programmable Gold",
    description: "EVM compatible chain treating sound money as the native asset. Build contracts, dApps, and rollups on PoW.",
  },
  {
    icon: ShieldCheck,
    title: "Credibly Neutral",
    description: "Anyone can run a node, mine, or build without approval. The protocol does not care who you are.",
  },
]

export function SoundMoney() {
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Economics</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">Sound Money Design</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              Parallax is programmable gold, secured by physics. A fixed supply,
              Proof of Work settlement layer where scarcity is enforced by energy,
              not committees.
            </p>
          </div>
        </FadeIn>

        {/* Primary features — large cards with gold accent */}
        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          {primaryFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <Card className="border-l-2 border-l-gold bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <feature.icon className="size-7 text-gold" />
                    <CardTitle className="text-sm font-medium font-mono uppercase tracking-[0.15em]">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Secondary features — compact list */}
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2">
          {secondaryFeatures.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.08}>
              <div className="flex items-start gap-4 border-l border-border pl-6 py-4">
                <feature.icon className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 flex flex-col items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="group border-gold/30 hover:border-gold hover:bg-gold/5 text-foreground px-6 py-5"
            >
              <Link href="/compare">
                <span className="font-mono text-xs uppercase tracking-[0.15em]">
                  See how Parallax stacks up
                </span>
                <ArrowRight className="size-4 ml-1 text-gold transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              vs Bitcoin & Ethereum, feature by feature
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
