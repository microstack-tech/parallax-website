"use client"
import { FadeIn } from "@/components/fade-in"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { ChevronRight, Cpu, ExternalLink, Scale } from "lucide-react"
import { useTranslations } from "next-intl"

type FactRow = { label: string; value: string }
type Step = { title: string; description: string }

export default function MiningPage() {
  const t = useTranslations("participate.mining")
  const facts = t.raw("facts.rows") as FactRow[]
  const steps = t.raw("start.steps") as Step[]

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-0 flex flex-col gap-16 pb-16">
        {/* The hook: your rig works */}
        <FadeIn>
          <div className="border border-border border-l-2 border-l-gold bg-card/50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Cpu className="size-6 text-gold shrink-0" />
              <h2 className="text-xl sm:text-2xl text-foreground">{t("rig.heading")}</h2>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("rig.body")}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="w-full sm:w-fit" asChild>
                <a href="https://github.com/ParallaxProtocol/hashwarp/releases" target="_blank" rel="noopener">
                  {t("rig.hashwarpCta")}
                  <ExternalLink />
                </a>
              </Button>
              <Button variant="outline" className="w-full sm:w-fit" asChild>
                <a href="https://github.com/doktor83/SRBMiner-Multi/releases" target="_blank" rel="noopener">
                  {t("rig.srbminerCta")}
                  <ExternalLink />
                </a>
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Facts */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-gold mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("facts.heading")}</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <Card className="mt-8">
              <CardContent className="p-0">
                <dl className="divide-y divide-border">
                  {facts.map((row) => (
                    <div key={row.label} className="grid sm:grid-cols-[14rem_1fr] gap-1 sm:gap-4 px-6 py-3">
                      <dt className="text-sm text-muted-foreground">{row.label}</dt>
                      <dd className="text-sm text-foreground/90">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        {/* Steps */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-gold mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("start.heading")}</h2>
          </FadeIn>
          <ol className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.05}>
                <li className="h-full">
                  <Card className="h-full">
                    <CardHeader>
                      <p className="font-mono text-xs tracking-[0.2em] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <CardTitle>{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      {step.description}
                    </CardContent>
                  </Card>
                </li>
              </FadeIn>
            ))}
          </ol>
        </section>

        {/* Economics */}
        <FadeIn>
          <div className="border border-border border-l-2 border-l-gold bg-card/50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Scale className="size-6 text-gold shrink-0" />
              <h2 className="text-xl sm:text-2xl text-foreground">{t("economics.heading")}</h2>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("economics.body")}</p>
          </div>
        </FadeIn>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="w-full sm:w-fit bg-gold text-gold-foreground hover:bg-gold/90" asChild>
            <Link href={"/resources/parallax-client"}>
              {t("ctas.client")}
              <ChevronRight />
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-fit" asChild>
            <a href="https://miningpoolstats.stream/parallax" target="_blank" rel="noopener">
              {t("ctas.pools")}
              <ExternalLink />
            </a>
          </Button>
          <Button variant="outline" className="w-full sm:w-fit" asChild>
            <Link href={"/resources/beginner-guides"}>
              {t("ctas.guides")}
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </MainMotion>
  )
}
