'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import {
  ArrowRight,
  CircuitBoard,
  Hourglass,
  Scale,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeIn } from "./fade-in"

const primaryFeatures = [
  { key: "hardCap", icon: Scale },
  { key: "energySecured", icon: Zap },
] as const

const secondaryFeatures = [
  { key: "fairLaunch", icon: Users },
  { key: "settlement", icon: Hourglass },
  { key: "programmable", icon: CircuitBoard },
  { key: "credibly", icon: ShieldCheck },
] as const

export function SoundMoney() {
  const t = useTranslations("home.soundMoney")

  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">{t("eyebrow")}</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">{t("heading")}</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Primary features — large cards with brand accent */}
        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          {primaryFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <FadeIn key={feature.key} delay={i * 0.1}>
                <Card className="border-l-2 border-l-brand bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon className="size-7 text-brand" />
                      <CardTitle className="text-sm font-medium font-mono uppercase tracking-[0.15em]">
                        {t(`${feature.key}.title` as "hardCap.title")}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-base text-muted-foreground leading-relaxed">
                    {t(`${feature.key}.description` as "hardCap.description")}
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        {/* Secondary features — compact list */}
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2">
          {secondaryFeatures.map((feature, i) => {
            const Icon = feature.icon
            return (
              <FadeIn key={feature.key} delay={i * 0.08}>
                <div className="flex items-start gap-4 border-l border-border pl-6 py-4">
                  <Icon className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">
                      {t(`${feature.key}.title` as "fairLaunch.title")}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {t(`${feature.key}.description` as "fairLaunch.description")}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn>
          <div className="mt-16 flex flex-col items-center gap-3">
            <Button
              asChild
              variant="outline"
              className="group border-brand/30 hover:border-brand hover:bg-brand/5 text-foreground px-6 py-5 no-underline hover:no-underline"
            >
              <Link href="/compare">
                <span className="font-mono text-xs uppercase tracking-[0.15em]">
                  {t("cta")}
                </span>
                <ArrowRight className="size-4 ml-1 text-brand transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">{t("ctaSubtitle")}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
