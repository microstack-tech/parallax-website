"use client"
import GridView from "@/components/grid-view"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { ChevronRight, Code, DollarSign, Globe, Plane, Shield, Smartphone, User } from "lucide-react"
import { useTranslations } from "next-intl"

const ICONS = [Smartphone, Shield, Globe, Plane, DollarSign, User, Code]

type RawTopic = { title: string; description: string }

export default function ParallaxForIndividuals() {
  const t = useTranslations("introduction.parallaxForIndividuals")
  const rawTopics = t.raw("topics") as RawTopic[]
  const topics = rawTopics.map((topic, i) => ({
    icon: ICONS[i] ?? Smartphone,
    title: topic.title,
    description: topic.description,
  }))

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
        subTitle={t("pageSubtitle")}
      />
      <GridView
        items={topics}
      />
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-4 px-6">
          <Button className="w-full sm:w-fit bg-gold text-gold-foreground hover:bg-gold/90" asChild>
            <Link href={'/introduction/getting-started'}>
              {t("cta")}
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </MainMotion>
  )
}
