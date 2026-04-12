import { Card, CardContent } from "@/components/ui/card"
import { getTranslations } from "next-intl/server"

type Props = {
  totalNodes: number
  countries: number
  updatedAt: number
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="bg-surface-elevated border-border">
      <CardContent className="flex flex-col gap-2 py-6">
        <span className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </span>
        <span className="text-3xl text-foreground tabular-nums">{value}</span>
      </CardContent>
    </Card>
  )
}

export default async function NodesSummary({ totalNodes, countries, updatedAt }: Props) {
  const t = await getTranslations("resources.networkAtlas.summary")

  const diff = Date.now() - updatedAt
  let relative: string
  if (diff < 60_000) {
    relative = t("justNow")
  } else {
    const mins = Math.floor(diff / 60_000)
    if (mins < 60) {
      relative = mins === 1
        ? t("minutesAgoSingular", { count: mins })
        : t("minutesAgoPlural", { count: mins })
    } else {
      const hours = Math.floor(mins / 60)
      if (hours < 24) {
        relative = hours === 1
          ? t("hoursAgoSingular", { count: hours })
          : t("hoursAgoPlural", { count: hours })
      } else {
        const days = Math.floor(hours / 24)
        relative = days === 1
          ? t("daysAgoSingular", { count: days })
          : t("daysAgoPlural", { count: days })
      }
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Stat label={t("onlineNodes")} value={totalNodes.toLocaleString()} />
      <Stat label={t("countries")} value={countries.toLocaleString()} />
      <Stat label={t("lastUpdated")} value={relative} />
    </div>
  )
}
