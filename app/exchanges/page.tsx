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
import Link from "next/link"
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
    <Card className="border-l-2 border-l-gold bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <Icon className="size-5 text-gold" />
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

function ExchangeCard({ exchange }: { exchange: Exchange }) {
  return (
    <Link
      href={exchange.url}
      target="_blank"
      rel="noopener"
      className="block h-full"
    >
      <Card className="group relative h-full border-l-2 border-l-gold/30 hover:border-l-gold hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300 cursor-pointer">
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
            <ArrowUpRight className="size-5 text-gold opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                Last Price
              </p>
              <p className="text-sm font-mono text-foreground mt-1.5">
                {formatPrice(exchange.lastPrice, exchange.targetSymbol)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                24h Volume
              </p>
              <p className="text-sm font-mono text-foreground mt-1.5">
                {formatUsd(exchange.volumeUsd)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                Spread
              </p>
              <p className="text-sm font-mono text-foreground mt-1.5">
                {formatSpread(exchange.spreadPct)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function ExchangePage() {
  const exchanges = await getExchanges()
  const totalVolume = exchanges.reduce(
    (sum, e) => sum + (e.volumeUsd ?? 0),
    0
  )
  const topExchange = exchanges[0] // already sorted by volume desc

  return (
    <MainMotion>
      <PageHeader
        title="Parallax Exchanges"
        subTitle="Live markets where Parallax is bought and traded. Data sourced from CoinGecko, refreshed hourly."
      />

      {exchanges.length === 0 ? (
        // API failure / empty state
        <section className="py-24 px-6 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <Card className="border-l-2 border-l-gold bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <ShieldAlert className="size-5 text-gold" />
                  <CardTitle>Live data unavailable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Live exchange data is temporarily unavailable. Please check
                    back shortly, or visit Parallax on CoinGecko directly to
                    view current markets.
                  </p>
                  <div className="mt-6">
                    <Link
                      href={COINGECKO_COIN_URL}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 text-gold hover:underline underline-offset-4"
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.15em]">
                        View on CoinGecko
                      </span>
                      <ExternalLink className="size-4" />
                    </Link>
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
                  Market overview
                </p>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FadeIn delay={0}>
                  <StatCard
                    icon={BarChart3}
                    label="24h Volume"
                    value={formatUsd(totalVolume)}
                    caption="Combined across all live markets"
                  />
                </FadeIn>
                <FadeIn delay={0.08}>
                  <StatCard
                    icon={Building2}
                    label="Active Markets"
                    value={exchanges.length.toString()}
                    caption={
                      exchanges.length === 1
                        ? "Exchange listing LAX"
                        : "Exchanges listing LAX"
                    }
                  />
                </FadeIn>
                {topExchange && (
                  <FadeIn delay={0.16}>
                    <StatCard
                      icon={Trophy}
                      label="Top Market"
                      value={topExchange.name}
                      caption={`${formatPrice(
                        topExchange.lastPrice,
                        topExchange.targetSymbol
                      )} · ${formatUsd(topExchange.volumeUsd)} 24h`}
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
                  Where to trade
                </p>
                <h2 className="text-3xl text-foreground sm:text-4xl text-center">
                  Active markets
                </h2>
                <p className="mt-6 text-base text-muted-foreground text-center max-w-2xl mx-auto text-pretty">
                  Click any market to open the exchange in a new tab. Sorted
                  by 24-hour trading volume.
                </p>
              </FadeIn>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {exchanges.map((e, i) => (
                  <FadeIn key={`${e.name}-${e.url}`} delay={i * 0.08}>
                    <ExchangeCard exchange={e} />
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
                <div className="border-l-2 border-l-gold pl-6 py-2">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="size-4 text-gold" />
                    <span className="text-xs font-mono uppercase tracking-[0.15em] text-gold">
                      Disclaimer
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                    Exchanges vary widely in safety, security, privacy, and
                    custody practices. Always perform your own due diligence
                    and use a trusted self-custody wallet to hold your coins.{" "}
                    <strong className="text-foreground">
                      Parallax is not affiliated with, nor responsible for, any
                      of the exchanges listed above.
                    </strong>{" "}
                    Use them at your own discretion.
                  </p>
                </div>
              </FadeIn>

              <FadeIn>
                <div className="bg-surface-elevated border border-border p-8 sm:p-10 text-center">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">
                    Data source
                  </p>
                  <Link
                    href={COINGECKO_COIN_URL}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 text-foreground hover:text-gold transition-colors"
                  >
                    <span className="text-base font-medium">
                      View Parallax on CoinGecko
                    </span>
                    <ExternalLink className="size-4" />
                  </Link>
                  <p className="text-xs text-muted-foreground mt-4">
                    Live market data is fetched from the CoinGecko public API
                    and refreshed hourly. CoinGecko is the source of truth for
                    all listings on this page.
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
