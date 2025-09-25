import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Tokenomics() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{`Bitcoin's Proven Economics`}</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {`Parallax inherits Bitcoin's time-tested monetary design, ensuring long-term predictability and resistance to
            inflation.`}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">Emission Schedule</CardTitle>
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
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Premine</span>
                <span className="text-primary">0 coins</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-xl">Network Parameters</CardTitle>
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
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Block Gas Limit</span>
                <span className="text-primary">600M gas</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
