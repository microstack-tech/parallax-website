import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { FadeIn } from "@/components/fade-in"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  ExternalLink,
  ShieldAlert,
  Trophy,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { COINGECKO_COIN_URL, Exchange, getExchanges } from "./data"

function formatUsd(v: number | undefined): string {
  if (v == null) return "—"
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`
  return `$${v.toFixed(2)}`
}

function formatPrice(price: number, target: string): string {
  const decimals = price < 0.01 ? 6 : price < 1 ? 4 : 2
  return `${price.toFixed(decimals)} ${target}`
}

function formatSpread(pct: number | undefined): string {
  if (pct == null) return "—"
  return `${pct.toFixed(2)}%`
}

function SectionDivider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  caption,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  caption?: string
}) {
  return (
    <Card className="border-l-2 border-l-brand bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <Icon className="size-5 text-brand" />
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-mono text-foreground leading-none">
          {value}
        </p>
        {caption && (
          <p className="text-xs text-muted-foreground mt-3">{caption}</p>
        )}
      </CardContent>
    </Card>
  )
}

function ExchangeCard({
  exchange,
  labels,
}: {
  exchange: Exchange
  labels: { lastPrice: string; volume24h: string; spread: string }
}) {
  return (
    <a
      href={exchange.url}
      target="_blank"
      rel="noopener"
      className="block h-full"
    >
      <Card className="group relative h-full border-l-2 border-l-brand/30 hover:border-l-brand hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)] transition-[border-color,box-shadow] duration-300 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 w-full">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-base normal-case tracking-normal font-sans font-semibold">
                {exchange.name}
              </CardTitle>
              <Badge
                variant="outline"
                className="font-mono text-[10px] uppercase tracking-wider w-fit"
              >
                {exchange.pair}
              </Badge>
            </div>
            <ArrowUpRight className="size-5 text-brand opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                {labels.lastPrice}
              </p>
              <p className="text-sm font-mono text-foreground mt-1.5">
                {formatPrice(exchange.lastPrice, exchange.targetSymbol)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                {labels.volume24h}
              </p>
              <p className="text-sm font-mono text-foreground mt-1.5">
                {formatUsd(exchange.volumeUsd)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                {labels.spread}
              </p>
              <p className="text-sm font-mono text-foreground mt-1.5">
                {formatSpread(exchange.spreadPct)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export default async function ExchangePage() {
  const t = await getTranslations("exchanges")
  const exchanges = await getExchanges()
  const totalVolume = exchanges.reduce(
    (sum, e) => sum + (e.volumeUsd ?? 0),
    0
  )
  const topExchange = exchanges[0] // already sorted by volume desc

  const cardLabels = {
    lastPrice: t("card.lastPrice"),
    volume24h: t("card.volume24h"),
    spread: t("card.spread"),
  }

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />

      {exchanges.length === 0 ? (
        // API failure / empty state
        <section className="py-24 px-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <Card className="border-l-2 border-l-brand bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <ShieldAlert className="size-5 text-brand" />
                  <CardTitle>{t("unavailable.title")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("unavailable.description")}
                  </p>
                  <div className="mt-6">
                    <a
                      href={COINGECKO_COIN_URL}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 text-brand hover:underline underline-offset-4"
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.15em]">
                        {t("unavailable.viewOnCoingecko")}
                      </span>
                      <ExternalLink className="size-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </section>
      ) : (
        <>
          {/* Market overview */}
          <section className="py-24 px-6 sm:px-8">
            <div className="mx-auto max-w-7xl">
              <FadeIn>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center">
                  {t("stats.marketOverview")}
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FadeIn delay={0}>
                  <StatCard
                    icon={BarChart3}
                    label={t("stats.volume24h")}
                    value={formatUsd(totalVolume)}
                    caption={t("stats.volume24hCaption")}
                  />
                </FadeIn>
                <FadeIn delay={0.08}>
                  <StatCard
                    icon={Building2}
                    label={t("stats.activeMarkets")}
                    value={exchanges.length.toString()}
                    caption={
                      exchanges.length === 1
                        ? t("stats.activeMarketsCaptionOne")
                        : t("stats.activeMarketsCaptionOther")
                    }
                  />
                </FadeIn>
                {topExchange && (
                  <FadeIn delay={0.16}>
                    <StatCard
                      icon={Trophy}
                      label={t("stats.topMarket")}
                      value={topExchange.name}
                      caption={t("stats.topMarketCaption", {
                        price: formatPrice(
                          topExchange.lastPrice,
                          topExchange.targetSymbol
                        ),
                        volume: formatUsd(topExchange.volumeUsd),
                      })}
                    />
                  </FadeIn>
                )}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Active markets */}
          <section className="py-24 px-6 sm:px-8">
            <div className="mx-auto max-w-7xl">
              <FadeIn>
                <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
                  {t("activeMarkets.eyebrow")}
                </p>
                <h2 className="text-3xl text-foreground sm:text-4xl text-center">
                  {t("activeMarkets.heading")}
                </h2>
                <p className="mt-6 text-base text-muted-foreground text-center max-w-2xl mx-auto text-pretty">
                  {t("activeMarkets.description")}
                </p>
              </FadeIn>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exchanges.map((e, i) => (
                  <FadeIn key={`${e.name}-${e.url}`} delay={i * 0.08}>
                    <ExchangeCard exchange={e} labels={cardLabels} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Disclaimer + attribution */}
          <section className="py-24 px-6 sm:px-8">
            <div className="mx-auto max-w-4xl flex flex-col gap-12">
              <FadeIn>
                <div className="border-l-2 border-l-brand pl-6 py-2">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="size-4 text-brand" />
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-brand">
                      {t("disclaimer.label")}
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                    {t.rich("disclaimer.body", {
                      strong: (chunks) => (
                        <strong className="text-foreground">{chunks}</strong>
                      ),
                    })}
                  </p>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="bg-surface-elevated border border-border p-8 sm:p-10 text-center">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">
                    {t("attribution.dataSource")}
                  </p>
                  <a
                    href={COINGECKO_COIN_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 text-foreground hover:text-brand transition-colors"
                  >
                    <span className="text-base font-medium">
                      {t("attribution.viewOnCoingecko")}
                    </span>
                    <ExternalLink className="size-4" />
                  </a>
                  <p className="text-xs text-muted-foreground mt-4">
                    {t("attribution.note")}
                  </p>
                </div>
              </FadeIn>
            </div>
          </section>
        </>
      )}
    </MainMotion>
  )
}
