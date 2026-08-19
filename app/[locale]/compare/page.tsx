"use client"

import { FadeIn } from "@/components/fade-in"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { cn } from "@/lib/utils"
import {
  Check,
  CircuitBoard,
  Coins,
  Cpu,
  Flame,
  GitBranch,
  Hourglass,
  Minus,
  Scale,
  ShieldCheck,
  Users,
  X,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

const PARALLAX_LAUNCH = new Date("2025-10-28T00:00:00Z")
const BITCOIN_LAUNCH = new Date("2009-01-03T00:00:00Z")
const ETHEREUM_LAUNCH = new Date("2015-07-30T00:00:00Z")

function yearsSince(date: Date, now: Date): number {
  const ms = now.getTime() - date.getTime()
  return ms / (365.25 * 24 * 60 * 60 * 1000)
}

type RawRow = {
  label: string
  description?: string
  parallax?: string
  bitcoin?: string
  ethereum?: string
}

type SectionKey = "consensus" | "monetary" | "settlement" | "programmability" | "governance"

// Per-row cell kinds — defines yes/no/partial visual treatment per chain column.
// Rows that contain chain labels in messages default to "text".
const ROW_KINDS: Record<SectionKey, Array<Record<"parallax" | "bitcoin" | "ethereum", "yes" | "no" | "partial" | "text">>> = {
  consensus: [
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "yes", bitcoin: "yes", ethereum: "no" },
    { parallax: "yes", bitcoin: "yes", ethereum: "partial" },
  ],
  monetary: [
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "yes", bitcoin: "yes", ethereum: "no" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "yes", bitcoin: "yes", ethereum: "no" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
  ],
  settlement: [
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "yes", bitcoin: "yes", ethereum: "no" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
  ],
  programmability: [
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "yes", bitcoin: "partial", ethereum: "yes" },
    { parallax: "yes", bitcoin: "partial", ethereum: "yes" },
    { parallax: "yes", bitcoin: "no", ethereum: "yes" },
    { parallax: "yes", bitcoin: "partial", ethereum: "yes" },
    { parallax: "yes", bitcoin: "yes", ethereum: "no" },
  ],
  governance: [
    { parallax: "yes", bitcoin: "yes", ethereum: "partial" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
    { parallax: "text", bitcoin: "text", ethereum: "text" },
  ],
}

const SECTION_ICONS: Record<SectionKey, React.ComponentType<{ className?: string }>> = {
  consensus: ShieldCheck,
  monetary: Coins,
  settlement: Hourglass,
  programmability: CircuitBoard,
  governance: Users,
}

const SECTION_KEYS: SectionKey[] = ["consensus", "monetary", "settlement", "programmability", "governance"]

const SUMMARY_ICONS = [Scale, Cpu, CircuitBoard, Flame]

type Cell =
  | { kind: "yes"; label?: string }
  | { kind: "no"; label?: string }
  | { kind: "partial"; label?: string }
  | { kind: "text"; label: string }

function CellDisplay({ cell }: { cell: Cell }) {
  if (cell.kind === "yes") {
    return (
      <div className="flex items-start gap-2">
        <Check className="size-4 text-brand shrink-0 mt-0.5" />
        {cell.label && <span className="text-sm text-foreground">{cell.label}</span>}
      </div>
    )
  }
  if (cell.kind === "no") {
    return (
      <div className="flex items-start gap-2">
        <X className="size-4 text-muted-foreground/60 shrink-0 mt-0.5" />
        {cell.label && <span className="text-sm text-muted-foreground">{cell.label}</span>}
      </div>
    )
  }
  if (cell.kind === "partial") {
    return (
      <div className="flex items-start gap-2">
        <Minus className="size-4 text-muted-foreground shrink-0 mt-0.5" />
        {cell.label && <span className="text-sm text-muted-foreground">{cell.label}</span>}
      </div>
    )
  }
  return <span className="text-sm text-foreground">{cell.label}</span>
}

function formatMaturity(years: number, t: ReturnType<typeof useTranslations<"compare.maturity">>): string {
  if (years < 1) {
    const months = Math.max(0, Math.round(years * 12))
    if (months <= 0) return t("justLaunched")
    if (months === 1) return t("oneMonth")
    return t("months", { count: months })
  }
  const rounded = years < 10 ? years.toFixed(1) : Math.round(years).toString()
  return t("years", { years: rounded })
}

export default function ComparePage() {
  const t = useTranslations("compare")
  const tMaturity = useTranslations("compare.maturity")
  const [now, setNow] = useState<Date>(PARALLAX_LAUNCH)
  useEffect(() => { setNow(new Date()) }, [])

  const chains = [
    { key: "parallax" as const, name: t("chains.parallax"), highlight: true },
    { key: "bitcoin" as const, name: t("chains.bitcoin"), highlight: false },
    { key: "ethereum" as const, name: t("chains.ethereum"), highlight: false },
  ]

  const summary = t.raw("summary") as Array<{ title: string; parallax: string; bitcoin: string; ethereum: string }>

  const sections = SECTION_KEYS.map((sectionKey) => {
    const rows = t.raw(`sections.${sectionKey}.rows`) as RawRow[]
    const Icon = SECTION_ICONS[sectionKey]
    return {
      key: sectionKey,
      title: t(`sections.${sectionKey}.title` as "sections.consensus.title"),
      icon: Icon,
      rows: rows.map((row, i): { label: string; description?: string; parallax: Cell; bitcoin: Cell; ethereum: Cell } => {
        const kinds = ROW_KINDS[sectionKey][i]
        const makeCell = (chain: "parallax" | "bitcoin" | "ethereum"): Cell => {
          const kind = kinds[chain]
          const label = row[chain]
          // Network maturity row (governance section, last row) has dynamic maturity labels.
          if (sectionKey === "governance" && i === 4) {
            const years =
              chain === "parallax" ? yearsSince(PARALLAX_LAUNCH, now) :
              chain === "bitcoin" ? yearsSince(BITCOIN_LAUNCH, now) :
              yearsSince(ETHEREUM_LAUNCH, now)
            const launch = t(`launchDates.${chain}` as "launchDates.parallax")
            return { kind: "text", label: `${formatMaturity(years, tMaturity)} (${launch})` }
          }
          if (kind === "text") return { kind: "text", label: label ?? "" }
          return { kind, label }
        }
        return {
          label: row.label,
          description: row.description,
          parallax: makeCell("parallax"),
          bitcoin: makeCell("bitcoin"),
          ethereum: makeCell("ethereum"),
        }
      }),
    }
  })

  return (
    <MainMotion>
      <PageHeader title={t("title")} subTitle={t("subtitle")} />

      {/* At a glance cards */}
      <section className="mt-24 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center">
              {t("atAGlance")}
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {summary.map((item, i) => {
              const Icon = SUMMARY_ICONS[i]
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="border-l-2 border-l-brand bg-card/50 backdrop-blur-sm border border-border p-6 h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <Icon className="size-5 text-brand" />
                      <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">
                        {item.title}
                      </h3>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
                        <span className="font-mono uppercase tracking-wider text-xs text-brand">
                          {t("chains.parallax")}
                        </span>
                        <span className="text-foreground text-right">{item.parallax}</span>
                      </div>
                      <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
                        <span className="font-mono uppercase tracking-wider text-xs text-muted-foreground">
                          {t("chains.bitcoin")}
                        </span>
                        <span className="text-muted-foreground text-right">{item.bitcoin}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-mono uppercase tracking-wider text-xs text-muted-foreground">
                          {t("chains.ethereum")}
                        </span>
                        <span className="text-muted-foreground text-right">{item.ethereum}</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Detailed comparison */}
      <section className="mt-24 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
              {t("detailedComparison")}
            </p>
            <h2 className="text-3xl text-foreground sm:text-4xl text-center mb-16">
              {t("featureByFeature")}
            </h2>
          </FadeIn>

          {sections.map((section, si) => (
            <FadeIn key={section.key} delay={si * 0.05}>
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <section.icon className="size-5 text-brand" />
                  <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground">
                    {section.title}
                  </h3>
                </div>

                {/* Desktop table */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-4 px-4 pb-3 border-b border-border">
                    <div className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
                      {t("property")}
                    </div>
                    {chains.map((c) => (
                      <div
                        key={c.key}
                        className={cn(
                          "text-xs font-mono uppercase tracking-[0.15em]",
                          c.highlight ? "text-brand" : "text-muted-foreground"
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
                        <div className="text-sm text-foreground font-medium">{row.label}</div>
                        {row.description && (
                          <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {row.description}
                          </div>
                        )}
                      </div>
                      <div className="border-l-2 pl-4 border-l-brand/40">
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
                      <div className="text-sm text-foreground font-medium mb-1">{row.label}</div>
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
                                c.highlight ? "text-brand" : "text-muted-foreground"
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
            <div className="border-l-2 border-l-brand pl-6 py-4">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="size-4 text-brand" />
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-brand">
                  {t("thesisLabel")}
                </span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                {t("thesisBody")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </MainMotion>
  )
}
