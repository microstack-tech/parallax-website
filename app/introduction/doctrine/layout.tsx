import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Parallax Doctrine",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
