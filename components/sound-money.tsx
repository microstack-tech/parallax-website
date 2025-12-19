import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Scale,
  Zap,
  ShieldCheck,
  Hourglass,
  CircuitBoard,
  Users,
} from "lucide-react"

export function SoundMoney() {
  return (
    <section className="py-24 border-b px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Sound Money Design</h2>
          <p className="mt-8 text-base text-muted-foreground text-pretty">
            Parallax is programmable gold, secured by physics. A fixed supply,
            Proof of Work settlement layer where scarcity is enforced by energy,
            not committees, built for people who value time, purchasing power,
            and irreversible finality.
          </p>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Scale className="size-6" />
                <CardTitle>Hard Capped Supply</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`A finite and predictable emission schedule inspired by Bitcoin. No monetary discretion and no hidden inflation. The rules for supply are encoded in the protocol, not set by committees.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Users className="size-6" />
                <CardTitle>Fair Launch Economics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`No premine, no VC allocation, and no insider advantages. Parallax is a grassroots Proof of Work network where every coin must be discovered and earned under the same rules.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Zap className="size-6" />
                <CardTitle>Energy Secured Value</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Hashrate ties the currency to real world energy and silicon. Attacking the chain requires burning the same physics that protect it, anchoring Parallaxs monetary integrity in measurable cost rather than social trust.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Hourglass className="size-6" />
                <CardTitle>Settlement First Blocks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Ten minute target blocks keep coordination stress low and decentralization high. The base layer is designed for durable settlement and resistance to rewrite, not for high frequency execution.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <CircuitBoard className="size-6" />
                <CardTitle>Programmable Gold</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`An EVM compatible chain that treats sound money as the native asset. Parallax allows developers to build contracts, dApps, and rollups directly on top of a Proof of Work secured and fixed supply monetary base.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <ShieldCheck className="size-6" />
                <CardTitle>Credibly Neutral And Permissionless</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Anyone can run a node, mine, or build on Parallax without approval. The protocol does not care who you are, only that the rules are followed. A censorship resistant base layer for long term holding, global access, and open coordination.`}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
