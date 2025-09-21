import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const comparisons = [
  {
    feature: "Supply Cap",
    bitcoin: { value: "21M (fixed)", status: "check" },
    ethereum: { value: "Uncapped", status: "x" },
    parallax: { value: "21M (fixed)", status: "check" },
  },
  {
    feature: "Block Interval",
    bitcoin: { value: "10 min", status: "check" },
    ethereum: { value: "12-15s", status: "neutral" },
    parallax: { value: "10 min", status: "check" },
  },
  {
    feature: "Consensus",
    bitcoin: { value: "PoW (SHA-256)", status: "check" },
    ethereum: { value: "PoS (Casper)", status: "neutral" },
    parallax: { value: "PoW (Ethash)", status: "check" },
  },
  {
    feature: "Programmability",
    bitcoin: { value: "Limited script", status: "x" },
    ethereum: { value: "Full EVM", status: "check" },
    parallax: { value: "Full EVM", status: "check" },
  },
  {
    feature: "Fee Model",
    bitcoin: { value: "First-price", status: "check" },
    ethereum: { value: "EIP-1559 (burn)", status: "x" },
    parallax: { value: "First-price (no burn)", status: "check" },
  },
]

export function Comparison() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How Parallax Compares</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            See how Parallax positions itself between Bitcoin's monetary discipline and Ethereum's programmability.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-center text-xl">Protocol Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold">Bitcoin</th>
                      <th className="text-center py-3 px-4 font-semibold">Ethereum</th>
                      <th className="text-center py-3 px-4 font-semibold text-primary">Parallax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((item, index) => (
                      <tr
                        key={item.feature}
                        className={index !== comparisons.length - 1 ? "border-b border-border" : ""}
                      >
                        <td className="py-4 px-4 font-medium">{item.feature}</td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {item.bitcoin.status === "check" && <Check className="h-4 w-4 text-green-500" />}
                            {item.bitcoin.status === "x" && <X className="h-4 w-4 text-red-500" />}
                            <span className="text-sm">{item.bitcoin.value}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {item.ethereum.status === "check" && <Check className="h-4 w-4 text-green-500" />}
                            {item.ethereum.status === "x" && <X className="h-4 w-4 text-red-500" />}
                            <span className="text-sm">{item.ethereum.value}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {item.parallax.status === "check" && <Check className="h-4 w-4 text-primary" />}
                            {item.parallax.status === "x" && <X className="h-4 w-4 text-red-500" />}
                            <span className="text-sm font-medium">{item.parallax.value}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
