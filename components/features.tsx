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
    <section className="relative py-24 bg-[#0D0D0D] z-10 px-8 sm:px-0">
      <div className="mx-auto max-w-6xl w-fit pt-0">
        <div className="mx-auto w-full text-center bg-black border p-8">
          <h2 className="text-3xl text-foreground sm:text-4xl">Bridging Two Worlds</h2>
          <p className="mt-8 text-lg text-muted-foreground text-pretty">
            Parallax combines the best of Bitcoin and Ethereum, creating a unique protocol that offers both monetary
            predictability and programmable functionality.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-2">
              <Card key={feature.title} className="h-[16rem]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <feature.icon strokeWidth={1.5} className="size-8 text-primary" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="flex flex-col gap-4 text-md text-left leading-relaxed">
                    {feature.description[0]}
                  </CardDescription>
                </CardContent>
              </Card>
              <div className="px-4">
                <Separator />
              </div>
              <Card className="h-[16rem] bg-black">
                <CardContent>
                  <CardDescription className="flex flex-col gap-4 text-left leading-relaxed text-cyan-500 font-mono">
                    {feature.sub}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
