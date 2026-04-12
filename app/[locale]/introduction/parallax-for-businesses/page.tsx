"use client"
import GridView from "@/components/grid-view"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { ChevronRight, Code, DollarSign, Eye, FileText, Lock, Plane, ShieldCheck, Users } from "lucide-react"
import { useTranslations } from "next-intl"

const ICONS = [DollarSign, ShieldCheck, Plane, Lock, Eye, Users, FileText, Code]

type RawTopic = { title: string; description: string }

export default function ParallaxForBusinesses() {
  const t = useTranslations("introduction.parallaxForBusinesses")
  const rawTopics = t.raw("topics") as RawTopic[]
  const topics = rawTopics.map((topic, i) => ({
    icon: ICONS[i] ?? DollarSign,
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
