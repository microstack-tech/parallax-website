"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { FadeIn } from "@/components/fade-in"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import {
  Check,
  Minus,
  X,
  Scale,
  Cpu,
  Coins,
  Hourglass,
  ShieldCheck,
  Users,
  CircuitBoard,
  Flame,
  GitBranch,
} from "lucide-react"

const PARALLAX_LAUNCH = new Date("2025-10-28T00:00:00Z")
const BITCOIN_LAUNCH = new Date("2009-01-03T00:00:00Z")
const ETHEREUM_LAUNCH = new Date("2015-07-30T00:00:00Z")

function yearsSince(date: Date, now: Date): number {
  const ms = now.getTime() - date.getTime()
  return ms / (365.25 * 24 * 60 * 60 * 1000)
}

function formatMaturity(years: number): string {
  if (years < 1) {
    const months = Math.max(0, Math.round(years * 12))
    if (months <= 0) return "Just launched"
    return months === 1 ? "~1 month" : `~${months} months`
  }
  const rounded = years < 10 ? years.toFixed(1) : Math.round(years).toString()
  return `~${rounded} years`
}

type Cell =
  | { kind: "yes"; label?: string }
  | { kind: "no"; label?: string }
  | { kind: "partial"; label?: string }
  | { kind: "text"; label: string }

type Row = {
  label: string
  description?: string
  parallax: Cell
  bitcoin: Cell
  ethereum: Cell
}

type Section = {
  title: string
  icon: React.ComponentType<{ className?: string }>
  rows: Row[]
}

function buildSections(now: Date): Section[] {
  return [
  {
    title: "Consensus & Security",
    icon: ShieldCheck,
    rows: [
      {
        label: "Consensus mechanism",
        description:
          "How the network agrees on the state of the ledger.",
        parallax: { kind: "text", label: "Proof of Work" },
        bitcoin: { kind: "text", label: "Proof of Work" },
        ethereum: { kind: "text", label: "Proof of Stake" },
      },
      {
        label: "Hashing algorithm",
        parallax: { kind: "text", label: "XHash (ASIC-resistant)" },
        bitcoin: { kind: "text", label: "SHA-256 (ASIC-dominant)" },
        ethereum: { kind: "text", label: "N/A (validator staking)" },
      },
      {
        label: "Difficulty algorithm",
        description:
          "How the protocol retargets proof-of-work difficulty to keep block times on target.",
        parallax: { kind: "text", label: "ASERT (per-block, 2-day half-life)" },
        bitcoin: { kind: "text", label: "2016-block window retarget" },
        ethereum: { kind: "text", label: "N/A (no mining)" },
      },
      {
        label: "Coinbase maturity",
        description:
          "Lockup period before newly mined rewards become spendable. Reduces incentives for near-tip reorgs to steal fees and subsidy.",
        parallax: { kind: "text", label: "100 blocks (~16 hours)" },
        bitcoin: { kind: "text", label: "100 blocks (~16 hours)" },
        ethereum: { kind: "text", label: "None" },
      },
      {
        label: "Security anchored in real-world energy",
        description:
          "Attacking the chain requires burning measurable physical cost rather than acquiring social trust.",
        parallax: { kind: "yes" },
        bitcoin: { kind: "yes" },
        ethereum: { kind: "no" },
      },
      {
        label: "Permissionless validation",
        description:
          "Can anyone participate in securing the network without approval or capital gatekeeping?",
        parallax: { kind: "yes", label: "Anyone can mine" },
        bitcoin: { kind: "yes", label: "Anyone can mine" },
        ethereum: { kind: "partial", label: "32 ETH to solo stake" },
      },
    ],
  },
  {
    title: "Monetary Policy",
    icon: Coins,
    rows: [
      {
        label: "Supply cap",
        description: "Is the maximum supply fixed by protocol?",
        parallax: { kind: "text", label: "21,000,000 (hard cap)" },
        bitcoin: { kind: "text", label: "21,000,000 (hard cap)" },
        ethereum: { kind: "text", label: "Uncapped" },
      },
      {
        label: "Predictable emission schedule",
        parallax: { kind: "yes", label: "Halving every 210k blocks" },
        bitcoin: { kind: "yes", label: "Halving every 210k blocks" },
        ethereum: { kind: "no", label: "Adjustable by governance" },
      },
      {
        label: "Initial block reward & halving",
        description:
          "The starting block subsidy and how often it is cut in half.",
        parallax: { kind: "text", label: "50 LAX, halves every 210,000 blocks (~4y)" },
        bitcoin: { kind: "text", label: "50 BTC, halves every 210,000 blocks (~4y)" },
        ethereum: { kind: "text", label: "No fixed schedule; issuance set by EIPs" },
      },
      {
        label: "Fair launch",
        description:
          "No premine, no VC allocation, no insider distribution.",
        parallax: { kind: "yes" },
        bitcoin: { kind: "yes" },
        ethereum: { kind: "no", label: "72M ETH premined (2014 ICO)" },
      },
      {
        label: "Monetary policy changes",
        description:
          "Can the issuance rules be changed without a contentious hard fork?",
        parallax: { kind: "text", label: "Encoded in protocol" },
        bitcoin: { kind: "text", label: "Encoded in protocol" },
        ethereum: { kind: "text", label: "Governed by core devs / EIPs" },
      },
      {
        label: "Fee model",
        description:
          "How transaction fees are priced and whether any portion is burned.",
        parallax: { kind: "text", label: "Priority auction (gas price, no burn)" },
        bitcoin: { kind: "text", label: "Priority auction (sat/vB, no burn)" },
        ethereum: { kind: "text", label: "EIP-1559 base fee + tip (base fee burned)" },
      },
    ],
  },
  {
    title: "Settlement & Performance",
    icon: Hourglass,
    rows: [
      {
        label: "Target block time",
        parallax: { kind: "text", label: "~10 minutes" },
        bitcoin: { kind: "text", label: "~10 minutes" },
        ethereum: { kind: "text", label: "~12 seconds" },
      },
      {
        label: "Settlement-first design",
        description:
          "Optimized for durable finality over high-throughput activity.",
        parallax: { kind: "yes" },
        bitcoin: { kind: "yes" },
        ethereum: { kind: "no" },
      },
      {
        label: "Finality model",
        parallax: { kind: "text", label: "Probabilistic (PoW)" },
        bitcoin: { kind: "text", label: "Probabilistic (PoW)" },
        ethereum: { kind: "text", label: "Economic (checkpoints)" },
      },
      {
        label: "Scaling approach",
        description:
          "How the chain extends beyond base-layer throughput without compromising settlement.",
        parallax: { kind: "text", label: "Rollups + payment channels (EVM L2s viable)" },
        bitcoin: { kind: "text", label: "Lightning + sidechains (Liquid, Rootstock)" },
        ethereum: { kind: "text", label: "Optimistic & ZK rollups" },
      },
    ],
  },
  {
    title: "Programmability",
    icon: CircuitBoard,
    rows: [
      {
        label: "Account model",
        description:
          "The fundamental ledger structure — affects smart contracts, parallelism, and fee accounting.",
        parallax: { kind: "text", label: "Account-based (EVM)" },
        bitcoin: { kind: "text", label: "UTXO" },
        ethereum: { kind: "text", label: "Account-based (EVM)" },
      },
      {
        label: "Smart contracts",
        parallax: { kind: "yes", label: "EVM compatible" },
        bitcoin: { kind: "partial", label: "Script (limited)" },
        ethereum: { kind: "yes", label: "EVM native" },
      },
      {
        label: "Native token issuance",
        description:
          "Can users deploy fungible tokens and NFTs as first-class protocol objects?",
        parallax: { kind: "yes", label: "ERC-20 / ERC-721 via EVM" },
        bitcoin: { kind: "partial", label: "Metaprotocols only (Ordinals, Runes)" },
        ethereum: { kind: "yes", label: "ERC-20 / ERC-721 native" },
      },
      {
        label: "Turing-complete execution",
        parallax: { kind: "yes" },
        bitcoin: { kind: "no" },
        ethereum: { kind: "yes" },
      },
      {
        label: "Native support for dApps & rollups",
        parallax: { kind: "yes" },
        bitcoin: { kind: "partial", label: "Via sidechains / L2s" },
        ethereum: { kind: "yes" },
      },
      {
        label: "Sound money as the native asset",
        description:
          "The base-layer asset is itself a hard-capped, energy-secured store of value.",
        parallax: { kind: "yes" },
        bitcoin: { kind: "yes", label: "But no smart contracts" },
        ethereum: { kind: "no" },
      },
    ],
  },
  {
    title: "Decentralization & Governance",
    icon: Users,
    rows: [
      {
        label: "Credibly neutral",
        description:
          "The protocol does not discriminate based on identity, jurisdiction, or stake size.",
        parallax: { kind: "yes" },
        bitcoin: { kind: "yes" },
        ethereum: { kind: "partial" },
      },
      {
        label: "Foundation / corporate influence",
        parallax: { kind: "text", label: "None" },
        bitcoin: { kind: "text", label: "None" },
        ethereum: { kind: "text", label: "Ethereum Foundation" },
      },
      {
        label: "Node hardware requirements",
        parallax: { kind: "text", label: "Consumer hardware" },
        bitcoin: { kind: "text", label: "Consumer hardware" },
        ethereum: { kind: "text", label: "SSD + staking hardware" },
      },
      {
        label: "Upgrade path",
        parallax: { kind: "text", label: "Rough consensus + hard forks" },
        bitcoin: { kind: "text", label: "Rough consensus + soft forks" },
        ethereum: { kind: "text", label: "Coordinated hard forks" },
      },
      {
        label: "Network maturity",
        description:
          "Time since mainnet launch — a rough proxy for battle-testing and ecosystem depth.",
        parallax: {
          kind: "text",
          label: `${formatMaturity(yearsSince(PARALLAX_LAUNCH, now))} (Oct 2025)`,
        },
        bitcoin: {
          kind: "text",
          label: `${formatMaturity(yearsSince(BITCOIN_LAUNCH, now))} (Jan 2009)`,
        },
        ethereum: {
          kind: "text",
          label: `${formatMaturity(yearsSince(ETHEREUM_LAUNCH, now))} (Jul 2015)`,
        },
      },
    ],
  },
  ]
}

function CellDisplay({ cell }: { cell: Cell }) {
  if (cell.kind === "yes") {
    return (
      <div className="flex items-start gap-2">
        <Check className="size-4 text-gold shrink-0 mt-0.5" />
        {cell.label && (
          <span className="text-sm text-foreground">{cell.label}</span>
        )}
      </div>
    )
  }
  if (cell.kind === "no") {
    return (
      <div className="flex items-start gap-2">
        <X className="size-4 text-muted-foreground/60 shrink-0 mt-0.5" />
        {cell.label && (
          <span className="text-sm text-muted-foreground">{cell.label}</span>
        )}
      </div>
    )
  }
  if (cell.kind === "partial") {
    return (
      <div className="flex items-start gap-2">
        <Minus className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        {cell.label && (
          <span className="text-sm text-muted-foreground">{cell.label}</span>
        )}
      </div>
    )
  }
  return <span className="text-sm text-foreground">{cell.label}</span>
}

const chains = [
  { key: "parallax", name: "Parallax", highlight: true },
  { key: "bitcoin", name: "Bitcoin", highlight: false },
  { key: "ethereum", name: "Ethereum", highlight: false },
] as const

const summary = [
  {
    icon: Scale,
    title: "Hard Capped Supply",
    parallax: "Yes — 21M, identical to Bitcoin",
    bitcoin: "Yes — 21M",
    ethereum: "No — uncapped issuance",
  },
  {
    icon: Cpu,
    title: "Proof of Work",
    parallax: "Yes — XHash",
    bitcoin: "Yes — SHA-256",
    ethereum: "No — Proof of Stake since 2022",
  },
  {
    icon: CircuitBoard,
    title: "EVM Smart Contracts",
    parallax: "Yes — native",
    bitcoin: "No",
    ethereum: "Yes — native",
  },
  {
    icon: Flame,
    title: "Fair Launch",
    parallax: "Yes — no premine, no VCs",
    bitcoin: "Yes — no premine",
    ethereum: "No — 72M ETH premined",
  },
]

export default function ComparePage() {
  // Initialize with the fixed launch date so SSR and initial client render agree,
  // then update to the actual current time after hydration.
  const [now, setNow] = useState<Date>(PARALLAX_LAUNCH)
  useEffect(() => {
    setNow(new Date())
  }, [])
  const sections = buildSections(now)

  return (
    <MainMotion>
      <PageHeader
        title="Parallax vs Bitcoin vs Ethereum"
        subTitle="A side-by-side look at how Parallax compares to the two dominant cryptocurrencies. Same hard cap as Bitcoin, programmability of Ethereum — with none of the monetary compromises."
      />

      {/* At a glance cards */}
      <section className="mt-24 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center">
              At a glance
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {summary.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="border-l-2 border-l-gold bg-card/50 backdrop-blur-sm border border-border p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <item.icon className="size-5 text-gold" />
                    <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
                      <span className="font-mono uppercase tracking-wider text-xs text-gold">
                        Parallax
                      </span>
                      <span className="text-foreground text-right">
                        {item.parallax}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
                      <span className="font-mono uppercase tracking-wider text-xs text-muted-foreground">
                        Bitcoin
                      </span>
                      <span className="text-muted-foreground text-right">
                        {item.bitcoin}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="font-mono uppercase tracking-wider text-xs text-muted-foreground">
                        Ethereum
                      </span>
                      <span className="text-muted-foreground text-right">
                        {item.ethereum}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed comparison */}
      <section className="mt-24 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
              Detailed comparison
            </p>
            <h2 className="text-3xl text-foreground sm:text-4xl text-center mb-16">
              Feature by feature
            </h2>
          </FadeIn>

          {sections.map((section, si) => (
            <FadeIn key={section.title} delay={si * 0.05}>
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <section.icon className="size-5 text-gold" />
                  <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground">
                    {section.title}
                  </h3>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-border">
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                      Property
                    </div>
                    {chains.map((c) => (
                      <div
                        key={c.key}
                        className={cn(
                          "text-xs font-mono uppercase tracking-[0.15em]",
                          c.highlight ? "text-gold" : "text-muted-foreground"
                        )}
                      >
                        {c.name}
                      </div>
                    ))}
                  </div>
                  {section.rows.map((row, ri) => (
                    <div
                      key={row.label}
                      className={cn(
                        "grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 px-4 py-5",
                        ri !== section.rows.length - 1 && "border-b border-border/60"
                      )}
                    >
                      <div>
                        <div className="text-sm text-foreground font-medium">
                          {row.label}
                        </div>
                        {row.description && (
                          <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {row.description}
                          </div>
                        )}
                      </div>
                      <div
                        className={cn(
                          "border-l-2 pl-4",
                          "border-l-gold/40"
                        )}
                      >
                        <CellDisplay cell={row.parallax} />
                      </div>
                      <div>
                        <CellDisplay cell={row.bitcoin} />
                      </div>
                      <div>
                        <CellDisplay cell={row.ethereum} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile stacked layout */}
                <div className="md:hidden space-y-6">
                  {section.rows.map((row) => (
                    <div
                      key={row.label}
                      className="border border-border bg-card/50 backdrop-blur-sm p-5"
                    >
                      <div className="text-sm text-foreground font-medium mb-1">
                        {row.label}
                      </div>
                      {row.description && (
                        <div className="text-xs text-muted-foreground mb-4 leading-relaxed">
                          {row.description}
                        </div>
                      )}
                      <div className="space-y-3 mt-4">
                        {chains.map((c) => (
                          <div key={c.key} className="flex flex-col gap-1">
                            <span
                              className={cn(
                                "text-[10px] font-mono uppercase tracking-[0.15em]",
                                c.highlight
                                  ? "text-gold"
                                  : "text-muted-foreground"
                              )}
                            >
                              {c.name}
                            </span>
                            <CellDisplay cell={row[c.key]} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section className="mt-16 px-6 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="border-l-2 border-l-gold pl-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="size-4 text-gold" />
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-gold">
                  The Parallax Thesis
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                Bitcoin proved that hard money works — but it is not
                programmable. Ethereum proved that programmable money works —
                but it abandoned scarcity and Proof of Work. Parallax is the
                synthesis: Bitcoin&apos;s exact supply schedule and
                energy-secured settlement, with the full EVM available to
                builders. Sound money as the native asset, not a wrapped
                afterthought.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </MainMotion>
  )
}
