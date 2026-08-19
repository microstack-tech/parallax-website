'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { ArrowRight, Bitcoin, Code2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeIn } from "./fade-in"

const audiences = [
  { key: "parallaxForBitcoiners", icon: Bitcoin, href: "/introduction/parallax-for-bitcoiners" },
  { key: "parallaxForDevelopers", icon: Code2, href: "/introduction/parallax-for-developers" },
] as const

export function AudienceRouter() {
  const t = useTranslations("home.audience")
  const tIntro = useTranslations("introduction")
  const tCommon = useTranslations("common")

  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">{t("eyebrow")}</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">{t("heading")}</h2>
            <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
          {audiences.map((audience, i) => {
            const Icon = audience.icon
            return (
              <FadeIn key={audience.key} delay={i * 0.1}>
                <Link href={audience.href} className="group block h-full">
                  <Card className="h-full transition-[border-color,box-shadow] duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Icon className="size-6 shrink-0 text-muted-foreground group-hover:text-brand transition-colors" />
                        <CardTitle>{tIntro(`${audience.key}.pageTitle` as "parallaxForBitcoiners.pageTitle")}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between flex-1">
                      <p className="text-base text-muted-foreground">
                        {tIntro(`${audience.key}.pageSubtitle` as "parallaxForBitcoiners.pageSubtitle")}
                      </p>
                      <div className="flex items-center gap-2 mt-6 text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                        {tCommon("readMore")}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
