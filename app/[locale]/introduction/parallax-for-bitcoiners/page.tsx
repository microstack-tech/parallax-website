"use client"
import { FadeIn } from "@/components/fade-in"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { AlertTriangle, ArrowRightLeft, Check, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

type RawItem = { title: string; description: string }

function Section({
  heading,
  tagline,
  items,
  icon: Icon,
  columns,
}: {
  heading: string
  tagline: string
  items: RawItem[]
  icon: React.ComponentType<{ className?: string }>
  columns: string
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-0 py-10">
      <FadeIn>
        <div className="max-w-2xl">
          <div className="w-12 h-0.5 bg-brand mb-6" />
          <h2 className="text-2xl sm:text-3xl text-foreground">{heading}</h2>
          <p className="mt-3 text-muted-foreground">{tagline}</p>
        </div>
      </FadeIn>
      <div className={`mt-10 grid grid-cols-1 gap-8 ${columns}`}>
        {items.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.05}>
            <Card className="h-full">
              <CardHeader className="flex justify-start items-center gap-4">
                <Icon className="size-6 shrink-0 text-brand" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

export default function ParallaxForBitcoiners() {
  const t = useTranslations("introduction.parallaxForBitcoiners")
  const identical = t.raw("identical.items") as RawItem[]
  const different = t.raw("different.items") as RawItem[]
  const caveats = t.raw("caveats.items") as RawItem[]

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
        subTitle={t("pageSubtitle")}
      />
      <Section
        heading={t("identical.heading")}
        tagline={t("identical.tagline")}
        items={identical}
        icon={Check}
        columns="sm:grid-cols-2 lg:grid-cols-3"
      />
      <Section
        heading={t("different.heading")}
        tagline={t("different.tagline")}
        items={different}
        icon={ArrowRightLeft}
        columns="sm:grid-cols-2"
      />
      <Section
        heading={t("caveats.heading")}
        tagline={t("caveats.tagline")}
        items={caveats}
        icon={AlertTriangle}
        columns="sm:grid-cols-2 lg:grid-cols-3"
      />
      <div className="mb-16 mt-6 text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-6">
          <Button className="w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90" asChild>
            <Link href={"/introduction/verify"}>
              {t("ctaVerify")}
              <ChevronRight />
            </Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-fit" asChild>
            <Link href={"/compare"}>
              {t("ctaCompare")}
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </MainMotion>
  )
}
