import type { MetadataRoute } from "next"

const BASE_URL = "https://parallaxprotocol.org"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/faq",
    "/wallets",
    "/mining-pools",
    "/exchanges",
    "/introduction/doctrine",
    "/introduction/getting-started",
    "/introduction/how-it-works",
    "/introduction/parallax-for-individuals",
    "/introduction/parallax-for-businesses",
    "/introduction/whitepaper",
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
    "/participate/running-a-full-node",
    "/participate/development",
    "/participate/support-parallax",
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.8,
  }))
}
