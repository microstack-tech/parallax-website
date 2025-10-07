import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import { ArrowRight, Bolt, HandCoins } from "lucide-react"

export function Tokenomics() {
  return (
    <section className="py-24 bg-background px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">{`Bitcoin's Proven Economics`}</h2>
          <p className="mt-4 text-base text-muted-foreground text-pretty">
            {`Parallax inherits Bitcoin's time-tested monetary design, ensuring long-term predictability and resistance to
            inflation.`}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <HandCoins strokeWidth={1.5} className="size-8" />
                <CardTitle className="text-xl">Emission Schedule</CardTitle>
              </div>
              <CardDescription>{`Block rewards follow Bitcoin's exact halving pattern`}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Initial Block Reward</span>
                <span className="text-primary">50 coins</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Halving Interval</span>
                <span className="text-primary">210,000 blocks (~4 years)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Maximum Supply</span>
                <span className="text-primary">21,000,000 coins</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Premine</span>
                <span className="text-primary">0 coins</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <Bolt strokeWidth={1.5} className="size-8" />
                <CardTitle className="text-xl">Network Parameters</CardTitle>
              </div>
              <CardDescription>Core protocol settings optimized for decentralization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Consensus Mechanism</span>
                <span className="text-primary">Proof of Work</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Block Interval</span>
                <span className="text-primary">10 minutes</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Difficulty Adjustment</span>
                <span className="text-primary">2016 blocks</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">DAG Regeneration Rate</span>
                <span className="text-primary">720 blocks</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row justify-center mt-24">
          <Button size={"2xl"} className="w-full max-w-[24rem] px-6" asChild>
            <Link href={"https://parallaxchain.org/introduction/whitepaper"}>
              <div className="flex flex-row items-center w-full justify-between">
                <label>Read whitepaper</label>
                <ArrowRight className="size-6" strokeWidth={1.5} />
              </div>
            </Link>
          </Button>
        </div>
        <div className="flex flex-row mt-24 justify-center mx-auto">
          <Card className="bg-cyan-400/5 sm:max-w-1/2">
            <CardHeader>
              <CardTitle className="text-xl text-center">XHash Proof of Work Algorithm</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 space-y-3 text-base text-muted-foreground">
              <p>
                {`We have developed a unique proof-of-work algorithm exclusively Parallax. XHash is Ethash-based, retaining its original memory-hardness properties while making existing Ethash ASICs obsolete.`}
              </p>
              <div className="flex flex-row w-full justify-center">
                <Button className="w-fit" size={"xl"} asChild>
                  <Link href={"https://docs.parallaxchain.org/parallax-protocol/foundational-topics/consensus/algorithms/xhash"}>
                    XHash Technical Details
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
