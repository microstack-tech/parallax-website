import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Lock, Shield } from "lucide-react"
import { Separator } from "./ui/separator"

const features = [
  {
    icon: Lock,
    title: "Immutable Monetary Rules",
    description: [
      "Ossified monetary policy resistant to governance capture and discretionary changes.",
    ],
    sub: (
      <>
        <label className="font-semibold underline">Immutable Monetary Rules:</label>
        <ul className="list-disc pl-3">
          <li>Maximum supply of 21M coins</li>
          <li>Emission of 50 coins per block</li>
          <li>Halves every 210,000 blocks</li>
        </ul>
      </>
    )
  },
  {
    icon: Cpu,
    title: "Full EVM Compatibility",
    description: [
      "Deploy Ethereum smart contracts with existing tools like Hardhat and Foundry.",
    ],
    sub: (
      <>
        <label className="font-semibold underline">Ethereum Ecosystem Unlocked:</label>
        <ul className="list-disc pl-3">
          <li>Compatible with existing Ethereum smart contracts</li>
          <li>Web3 wallets</li>
          <li>Web3 tooling</li>
        </ul>
      </>
    )
  },
  {
    icon: Shield,
    title: "Proof of Work",
    description: [
      "XHash mining ensures decentralization and accessibility via commodity CPUs & GPUs.",
      "Parallax implements the Nakamoto consensus with 10-minutes block target, difficulty is adjusted every 2016 blocks and fork-choice rules based on proof-of-work weight."
    ],
    sub: (
      <>
        <label className="font-semibold underline">Parallax implements the Nakamoto consensus:</label>
        <ul className="list-disc pl-3">
          <li>10-minute block timings</li>
          <li>Difficulty adjusted every 2016 blocks</li>
          <li>Fork-choice rules based on proof-of-work weight</li>
        </ul>
      </>
    )
  },
]

export function Features() {
  return (
    <section className="relative py-24 z-10 px-6 border-b sm:px-8">
      <div className="mx-auto max-w-6xl w-fit pt-0">
        <div className="mx-auto w-full text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Bridging two Worlds</h2>
          <p className="mt-8 text-base text-muted-foreground text-pretty">
            Parallax combines Bitcoin’s uncompromising monetary discipline with Ethereum’s programmable smart contract ecosystem, creating a network where sound money meets expressive computation. By uniting immutable monetary rules, full EVM compatibility, and proof-of-work security, Parallax bridges the gap between economic resilience and developer freedom—without sacrificing decentralization.
          </p>
        </div>

        <div className="mx-auto mt-24 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon strokeWidth={1.5} />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {feature.description[0]}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
