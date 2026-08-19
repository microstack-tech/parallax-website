import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { pageMetadata } from "@/lib/seo"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata.introduction.protocol.xhash" })
  return pageMetadata({
    locale,
    path: "/introduction/protocol/xhash",
    title: t("title"),
    description: t("description"),
  })
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const site = await getTranslations({ locale, namespace: "metadata.site" })
  const protocol = await getTranslations({ locale, namespace: "metadata.introduction.protocol" })

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: site("titleDefault"), path: "/" },
          { name: protocol("overview.title"), path: "/introduction/protocol/overview" },
          { name: protocol("xhash.title"), path: "/introduction/protocol/xhash" },
        ]}
      />
      {children}
    </>
  )
}
