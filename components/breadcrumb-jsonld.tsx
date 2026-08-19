import { BASE_URL } from "@/lib/seo"

type Crumb = { name: string; path: string }

/**
 * BreadcrumbList for pages that sit under a real parent page. Only worth adding
 * where the trail is more than "home → this page"; sections without an index
 * page of their own have no URL to point a crumb at.
 */
export function BreadcrumbJsonLd({ locale, items }: { locale: string; items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${BASE_URL}/${locale}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
