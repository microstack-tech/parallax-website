import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Cpu, Shield, Zap, Users, Lock } from "lucide-react"

const features = [
  {
    icon: Coins,
    title: "Fixed 21M Supply",
    description: "Immutable monetary policy with Bitcoin's proven scarcity model and halving schedule.",
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
  {
    icon: Zap,
    title: "No Fee Burning",
    description: "First-price auction model with all fees going to miners, preserving the 21M cap.",
  },
  {
    icon: Users,
    title: "Fair Launch",
    description: "Zero premine, no privileged allocations. Every participant starts at the same line.",
  },
  {
    icon: Lock,
    title: "Immutable Rules",
    description: "Ossified monetary policy resistant to governance capture and discretionary changes.",
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
                    <feature.icon className="h-6 w-6 text-primary" />
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
    </section>
  )
}
