import type { Node } from "@/lib/nodes"

type Props = {
  nodes: Node[]
}

type Row = {
  asn: string
  org: string
  count: number
}

/**
 * Bucket nodes by AS number. ASN is the most accurate unit for "who owns the
 * IP block" — different orgs can share names and a single org can hold many
 * ASNs, but each AS is one routing entity. Nodes whose ASN couldn't be
 * resolved are bucketed under "Unknown".
 */
function aggregate(nodes: Node[]): Row[] {
  const map = new Map<string, Row>()
  for (const n of nodes) {
    const key = n.asn || "unknown"
    const existing = map.get(key)
    if (existing) {
      existing.count++
    } else {
      map.set(key, {
        asn: n.asn,
        org: n.asOrg || "Unknown",
        count: 1,
      })
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => b.count - a.count || a.org.localeCompare(b.org),
  )
}

export default function HostingTable({ nodes }: Props) {
  const rows = aggregate(nodes)
  const total = nodes.length

  return (
    <div className="bg-surface-elevated border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-foreground">
          Hosting providers
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider font-normal">
                Provider
              </th>
              <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider font-normal text-right">
                Nodes
              </th>
              <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider font-normal text-right w-1/3">
                Share
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const pct = total > 0 ? (row.count / total) * 100 : 0
              return (
                <tr
                  key={row.asn || row.org}
                  className="border-b border-border/50 last:border-b-0 hover:bg-background/40 transition-colors"
                >
                  <td className="px-6 py-3 text-foreground">
                    <div className="flex flex-col">
                      <span>{row.org}</span>
                      {row.asn && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {row.asn}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums text-foreground align-top">
                    {row.count}
                  </td>
                  <td className="px-6 py-3 align-top">
                    <div className="flex items-center gap-3 justify-end">
                      <div className="relative h-1 w-full max-w-[160px] bg-border/60">
                        <div
                          className="absolute inset-y-0 left-0 bg-gold"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="tabular-nums text-muted-foreground w-12 text-right">
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
