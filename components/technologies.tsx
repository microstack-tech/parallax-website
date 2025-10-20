import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, ChevronRight, Cpu, Layers, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"

const features = [
  {
    icon: Lock,
    title: "Digital Signatures",
    description: [
      "Parallax employs elliptic curve digital signatures (ECDSA over secp256k1) to authenticate transactions and enforce ownership at the protocol level.",
      "Each signature provides non-repudiation and cryptographic assurance that only the holder of the private key corresponding to a public address can authorize state transitions.",
    ],
    url: "/introduction/protocol/architecture#digital-signatures",
  },
  {
    icon: Cpu,
    title: "Turing-complete Scripting",
    description: [
      "Parallax integrates a fully deterministic Virtual Machine (PVM) execution layer for state transitions and contract computation.",
      "It inherits the Ethereum execution semantics — gas accounting, opcode compatibility, and Merkle Patricia Trie state management — while operating under Bitcoin-like monetary constraints.",
    ],
    url: "/introduction/protocol/architecture#pvm",
  },
  {
    icon: Layers,
    title: "Timestamp Server",
    description: [
      "Parallax functions as a decentralized timestamp server, where each block commits to the hash of its predecessor — forming an immutable chain of cryptographically verifiable time events.",
      "Proof-of-Work transforms time itself into a scarce computational resource, preventing backdating and enforcing an objective ordering of events without trusted authorities.",
    ],
    url: "/introduction/protocol/architecture#timestamp-server",
  },
  {
    icon: BrainCircuit,
    title: "Nakamoto Consensus",
    description: [
      "Parallax adheres to the Nakamoto consensus model, where the heaviest valid chain — defined by cumulative proof-of-work — determines canonical state.",
      "Consensus emerges organically through probabilistic finality: each block built atop another increases the cost of reversal exponentially with depth.",
    ],
    url: "/introduction/protocol/architecture#nakamoto-consensus",
  }
]

export function Technologies() {
  return (
    <section className="relative py-24 z-10 px-6 border-b sm:px-8">
      <div className="mx-auto max-w-7xl w-fit pt-0">
        <div className="mx-auto w-full text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Technologies used in Parallax</h2>
          <p className="mt-8 text-base text-muted-foreground text-pretty">
            Parallax combines the best of Bitcoin and Ethereum, creating a unique protocol that offers both monetary
            predictability and programmable functionality.
          </p>
        </div>

        <div className="mx-auto mt-24 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <feature.icon className="size-6" strokeWidth={1.5} />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 text-md text-left leading-relaxed">
                  <p>{feature.description[0]}</p>
                  <p>{feature.description[1]}</p>
                </div>
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant={"secondary"} asChild className="w-full sm:w-fit">
                    <Link href={feature.url}>
                      Learn more
                      <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
