"use client"
import GridView from "@/components/grid-view"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Heart, Megaphone, Pickaxe, Radio, Server, SquareTerminal, Waypoints } from "lucide-react"
import { useTranslations } from "next-intl"

const BTC_DONATION_ADDRESS = "bc1qmlwnufa0ux3janw04dlld0w0v3tkv05snjmr8m"
const EVM_DONATION_ADDRESS = "0xa4Ff25A2814649F672e4abad49E45AB824E5988c"
const PATREON_URL = "https://www.patreon.com/ParallaxChainProtocol"

const TOPIC_ICONS = [Heart, Waypoints, Pickaxe, Code, Megaphone, BookOpen, Radio, SquareTerminal, Server]

function DonationsSection() {
  const t = useTranslations("participate.supportParallax.donations")
  return (
    <div className="mt-16 max-w-7xl mx-auto text-center space-y-8 px-6 sm:px-8">
      <h2 className="text-4xl">{t("heading")}</h2>

      <p className="text-lg text-muted-foreground">
        {t("intro")}
      </p>

      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center p-6 border border-border bg-card/50 backdrop-blur-sm border-l-2 border-l-gold">
          <h3 className="text-xl font-medium text-foreground">{t("btc.title")}</h3>
          <p className="text-sm text-muted-foreground">{t("btc.description")}</p>
          <code className="flex w-fit mt-8 bg-surface-elevated border border-border p-4 text-sm text-muted-foreground break-all font-mono">
            {BTC_DONATION_ADDRESS}
          </code>
        </div>

        <div className="flex flex-col items-center justify-center p-6 border border-border bg-card/50 backdrop-blur-sm border-l-2 border-l-gold">
          <h3 className="text-xl font-medium text-foreground">{t("evm.title")}</h3>
          <p className="text-sm text-muted-foreground">{t("evm.description")}</p>
          <code className="flex w-fit mt-8 bg-surface-elevated border border-border p-4 text-sm text-muted-foreground break-all font-mono">
            {EVM_DONATION_ADDRESS}
          </code>
        </div>
      </div>

      <p className="text-lg text-muted-foreground">
        {t("patreonIntro")}
        <br />
        {t("patreonIntroLine2")}
      </p>

      <Button
        size={"xl"}
        className="bg-gold text-gold-foreground hover:bg-gold/90"
        asChild
      >
        <a
          href={PATREON_URL}
          target="_blank"
          rel="noopener"
        >
          {t("patreonCta")}
        </a>
      </Button>
    </div>
  );
}

export default function ParallaxForIndividuals() {
  const t = useTranslations("participate.supportParallax")
  const rawTopics = t.raw("topics") as Array<{ title: string; description: string }>
  const topics = rawTopics.map((topic, i) => ({
    icon: TOPIC_ICONS[i],
    title: topic.title,
    description: topic.description,
  }))

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <GridView
        items={topics}
      />
      <DonationsSection />
    </MainMotion>
  )
}
