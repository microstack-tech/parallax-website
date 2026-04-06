import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Parallax vs Bitcoin vs Ethereum",
  description:
    "A side-by-side comparison of Parallax, Bitcoin, and Ethereum across consensus, monetary policy, programmability, settlement, and more.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
