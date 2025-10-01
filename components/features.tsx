import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Cpu, Lock, Shield } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

const features = [
  {
    icon: Lock,
    title: "Immutable Monetary Rules",
    description: "Ossified monetary policy resistant to governance capture and discretionary changes.",
  },
  {
    icon: Cpu,
    title: "Full EVM Compatibility",
    description: "Deploy Ethereum smart contracts with existing tools like Hardhat and Foundry.",
  },
  {
    icon: Shield,
    title: "Proof of Work Security",
    description: "Ethash mining ensures decentralization and accessibility via commodity GPUs.",
  },
]

export function Features() {
  return (
    <section className="relative py-24 bg-transparent z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Bridging Two Worlds</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Parallax combines the best of Bitcoin and Ethereum, creating a unique protocol that offers both monetary
            predictability and programmable functionality.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <feature.icon strokeWidth={1} className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center">
        <div className="flex justify-center gap-4">
          <Button className="has-[>svg]:px-8 py-8 text-base" asChild>
            <Link href={'/introduction/getting-started'}>
              Get started with Parallax
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
