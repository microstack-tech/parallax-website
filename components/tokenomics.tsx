import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bolt, ChevronRight, HandCoins } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function Tokenomics() {
  return (
    <section className="py-24 border-b px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">{`Bitcoin's Proven Economics`}</h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            {`Parallax inherits Bitcoin's time-tested monetary design, ensuring long-term predictability and resistance to
            inflation.`}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-4">
                <HandCoins className="size-6" />
                <CardTitle>Emission Schedule</CardTitle>
              </div>
            </CardHeader>
            <CardDescription>
              {`Block rewards follow Bitcoin's exact halving pattern`}
            </CardDescription>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Initial Block Reward</span>
                <span>50 coins</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Halving Interval</span>
                <span>210,000 blocks (~4 years)</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Maximum Supply</span>
                <span>21,000,000 coins</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Premine</span>
                <span>0 coins</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Bolt className="size-6" />
              <CardTitle>Network Parameters</CardTitle>
            </CardHeader>
            <CardDescription>
              Core protocol settings optimized for decentralization
            </CardDescription>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Consensus Mechanism</span>
                <span>Proof of Work</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Block Interval</span>
                <span>10 minutes</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Difficulty Adjustment</span>
                <span>2016 blocks</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Coinbase Maturity</span>
                <span>100 blocks</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row justify-center mt-24">
          <Button size={"xl"} className="w-full max-w-[24rem] px-6" asChild>
            <Link href={"https://parallaxchain.org/introduction/whitepaper"}>
              <div className="flex flex-row items-center w-full justify-between">
                <div>Read whitepaper</div>
                <ChevronRight className="size-6" />
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
