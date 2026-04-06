import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import CountriesTable from "@/components/network-atlas/countries-table"
import NodesSummary from "@/components/network-atlas/nodes-summary"
import WorldMap from "@/components/network-atlas/world-map"
import { getNodes, type NodesPayload } from "@/lib/nodes"

export const revalidate = 1800

export default async function NetworkAtlasPage() {
  let data: NodesPayload | null = null
  let errored = false
  try {
    data = await getNodes()
  } catch {
    errored = true
  }

  return (
    <MainMotion>
      <PageHeader
        title="Network Atlas"
        subTitle="A live view of reachable Parallax nodes around the world, discovered through the prlxdisc.org DNS tree and refreshed every 30 minutes."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        {errored || !data ? (
          <div className="bg-surface-elevated border border-border p-8 text-center">
            <p className="text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground">
              Node data temporarily unavailable
            </p>
            <p className="text-muted-foreground mt-3">
              We couldn&apos;t reach the discovery tree. Please try again in a few minutes.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <NodesSummary
              totalNodes={data.totalNodes}
              countries={data.countries}
              updatedAt={data.updatedAt}
            />
            <div className="bg-surface-elevated border border-border p-4 sm:p-6">
              <WorldMap nodes={data.nodes} />
            </div>
            <CountriesTable nodes={data.nodes} />
            <p className="text-xs text-muted-foreground text-center">
              Updated every 30 minutes · Source: <code className="font-mono">all.mainnet.prlxdisc.org</code> ·
              Geolocation by ip-api.com
            </p>
          </div>
        )}
      </section>
    </MainMotion>
  )
}
