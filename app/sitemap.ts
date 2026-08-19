import { routing } from "@/i18n/routing"
import type { MetadataRoute } from "next"

const BASE_URL = "https://parallaxprotocol.org"

const routes = [
  "/",
  "/faq",
  "/wallets",
  "/exchanges",
  "/compare",
  "/introduction/doctrine",
  "/introduction/getting-started",
  "/introduction/how-it-works",
  "/introduction/parallax-for-bitcoiners",
  "/introduction/parallax-for-developers",
  "/introduction/verify",
  "/introduction/protocol/overview",
  "/introduction/protocol/architecture",
  "/introduction/protocol/block-reward-and-halving",
  "/introduction/protocol/coinbase-maturity",
  "/introduction/protocol/difficulty-and-forkchoice",
  "/introduction/protocol/xhash",
  "/resources/community",
  "/resources/branding",
  "/resources/parallax-client",
  "/resources/technical-documentation",
  "/resources/beginner-guides",
  "/resources/network-atlas",
  "/participate/running-a-full-node",
  "/participate/mining",
  "/participate/development",
  "/participate/support-parallax",
]

function normalize(path: string): string {
  return path === "/" ? "" : path
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of routing.locales) {
    for (const route of routes) {
      // No lastModified: stamping every URL with the build time is a signal
      // crawlers discount. Blog posts below carry real dates.
      entries.push({
        url: `${BASE_URL}/${locale}${normalize(route)}`,
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((l) => [
                l,
                `${BASE_URL}/${l}${normalize(route)}`,
              ]),
            ),
            "x-default": `${BASE_URL}/${routing.defaultLocale}${normalize(route)}`,
          },
        },
      })
    }
  }

  return entries
}
