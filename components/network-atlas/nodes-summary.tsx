import { Card, CardContent } from "@/components/ui/card"

type Props = {
  totalNodes: number
  countries: number
  updatedAt: number
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts
  if (diff < 60_000) return "just now"
  const mins = Math.floor(diff / 60_000)
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? "" : "s"} ago`
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

export default function NodesSummary({ totalNodes, countries, updatedAt }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Stat label="Reachable nodes" value={totalNodes.toLocaleString()} />
      <Stat label="Countries" value={countries.toLocaleString()} />
      <Stat label="Last updated" value={formatRelative(updatedAt)} />
    </div>
  )
}
