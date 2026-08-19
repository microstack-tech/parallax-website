import { Card, CardContent } from "@/components/ui/card"
import TransportSplit from "@/components/network-atlas/transport-split"
import { getTranslations } from "next-intl/server"

type Props = {
  /** Every peer observed, Tor included — the headline figure. */
  totalPeers: number
  countries: number
  torPeers: number
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

export default async function NodesSummary({ totalPeers, countries, torPeers }: Props) {
  const t = await getTranslations("resources.networkAtlas.summary")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Stat label={t("onlineNodes")} value={totalPeers.toLocaleString()} />
      {/* Splits the headline figure: Tor peers are in the total but not on the
          map, since an onion address has no location. */}
      <TransportSplit clearnet={totalPeers - torPeers} tor={torPeers} />
      <Stat label={t("countries")} value={countries.toLocaleString()} />
    </div>
  )
}
