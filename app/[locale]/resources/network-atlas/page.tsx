import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import CountriesTable from "@/components/network-atlas/countries-table"
import NodesSummary from "@/components/network-atlas/nodes-summary"
import WorldMap from "@/components/network-atlas/world-map"
import { getNodes, type NodesPayload } from "@/lib/nodes"
import { getTranslations } from "next-intl/server"

export const revalidate = 300

export default async function NetworkAtlasPage() {
  const t = await getTranslations("resources.networkAtlas")
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
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        {errored || !data ? (
          <div className="bg-surface-elevated border border-border p-8 text-center">
            <p className="text-sm font-mono uppercase tracking-[0.15em] text-muted-foreground">
              {t("errorTitle")}
            </p>
            <p className="text-muted-foreground mt-3">
              {t("errorBody")}
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
              {t("footer")}
            </p>
          </div>
        )}
      </section>
    </MainMotion>
  )
}
