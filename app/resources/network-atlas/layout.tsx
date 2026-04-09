import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Network Atlas",
  description: "Live world map and country breakdown of Parallax nodes discovered through peer connections.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
