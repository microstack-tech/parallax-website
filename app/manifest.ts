import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Parallax Protocol",
    short_name: "Parallax",
    description:
      "A peer-to-peer programmable cash system. Bitcoin's monetary discipline meets Ethereum's programmability.",
    start_url: "/en",
    display: "browser",
    background_color: "#06070d",
    theme_color: "#06070d",
    icons: [
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
