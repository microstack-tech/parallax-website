import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How It Works",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
