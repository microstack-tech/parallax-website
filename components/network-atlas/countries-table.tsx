import type { Node } from "@/lib/nodes"
import { getTranslations } from "next-intl/server"

type Props = {
  nodes: Node[]
}

type Row = {
  countryCode: string
  country: string
  count: number
}

function aggregate(nodes: Node[], unknownLabel: string): Row[] {
  const map = new Map<string, Row>()
  for (const n of nodes) {
    const key = n.countryCode || "??"
    const existing = map.get(key)
    if (existing) {
      existing.count++
    } else {
      map.set(key, {
        countryCode: key,
        country: n.country || unknownLabel,
        count: 1,
      })
    }
  }
  return Array.from(map.values()).sort(
    (a, b) => b.count - a.count || a.country.localeCompare(b.country),
  )
}

/**
 * Render a country code as the corresponding flag emoji. ISO 3166-1 alpha-2
 * codes map onto regional indicator symbols by offset; bogus codes fall back
 * to a neutral globe.
 */
function flagFor(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "🌐"
  const base = 0x1f1e6 - "A".charCodeAt(0)
  const upper = code.toUpperCase()
  return String.fromCodePoint(base + upper.charCodeAt(0), base + upper.charCodeAt(1))
}

export default async function CountriesTable({ nodes }: Props) {
  const t = await getTranslations("resources.networkAtlas.countriesTable")
  const rows = aggregate(nodes, t("unknownCountry"))
  const total = nodes.length

  return (
    <div className="bg-surface-elevated border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-foreground">
          {t("heading")}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider font-normal">
                {t("country")}
              </th>
              <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider font-normal text-right">
                {t("nodes")}
              </th>
              <th className="px-6 py-3 font-mono text-xs uppercase tracking-wider font-normal text-right w-1/3">
                {t("share")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const pct = total > 0 ? (row.count / total) * 100 : 0
              return (
                <tr
                  key={row.countryCode}
                  className="border-b border-border/50 last:border-b-0 hover:bg-background/40 transition-colors"
                >
                  <td className="px-6 py-3 text-foreground">
                    <span className="mr-3 text-base" aria-hidden>
                      {flagFor(row.countryCode)}
                    </span>
                    {row.country}
                  </td>
                  <td className="px-6 py-3 text-right tabular-nums text-foreground">
                    {row.count}
                  </td>
                  <td className="px-6 py-3">
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
