import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

const USE_CASES = [
  // ENERGY & ECONOMICS LAYER
  {
    category: "Energy & Economics",
    title: "Energy-Backed Global Trade Rail",
    short: "Neutral settlement for international trade, secured by physics instead of politics.",
    description:
      "Countries and corporations can clear cross-border trades on an energy-secured chain instead of relying on reserve currencies, correspondent banks, and political alliances. Settlement happens on neutral infrastructure anyone can verify, not on infrastructure anyone must trust."
  },
  {
    category: "Energy & Economics",
    title: "Monetary Base for Multi-Chain Economies",
    short: "A sound PoW reserve asset that other chains and rollups can settle into.",
    description:
      "Execution can live on faster, specialized L1s and L2s, while long-term value, reserves, and collateral sit on Parallax. It acts as a programmable digital gold layer that other networks can reference, peg to, or periodically settle against."
  },
  {
    category: "Energy & Economics",
    title: "High-Value Institutional Settlement",
    short: "Programmable settlement for large, infrequent, high-value transfers.",
    description:
      "Corporate treasury moves, M&A events, OTC trades, and sovereign transfers can be encoded in smart contracts and finalized on a PoW base layer. Institutions get automation, auditability, and energy-anchored finality for their most important transactions."
  },
  {
    category: "Energy & Economics",
    title: "Geopolitics-Proof Reserve Asset",
    short: "Long-term value storage independent of any government or central bank.",
    description:
      "Parallax is not tied to a single jurisdiction, monetary regime, or alliance. Its monetary schedule is transparent and enforced by energy, giving individuals, funds, and even nation-states a programmable hedge against debasement, capital controls, and confiscation."
  },

  // COMMODITIES & MARKETS
  {
    category: "Commodities & Markets",
    title: "Open Commodities Clearinghouse",
    short: "A decentralized alternative to COMEX/CME for commodity settlement.",
    description:
      "Metals, energy, and other commodities can be traded and cleared via on-chain contracts. Margin, collateral, and delivery obligations are transparent and verifiable by anyone, reducing reliance on opaque centralized clearinghouses."
  },
  {
    category: "Commodities & Markets",
    title: "Institutional Proof-of-Assets",
    short: "On-chain reserve proofs for exchanges, funds, and custodians.",
    description:
      "Institutions can periodically commit cryptographic proofs of balances and liabilities to Parallax. Users and auditors can verify that assets exist and match what is claimed, making hidden insolvency and opaque rehypothecation much harder."
  },

  // TECHNOLOGY & AUTONOMY
  {
    category: "Technology & Autonomy",
    title: "AI-Native Monetary System",
    short: "A neutral currency layer that AI agents can use without corporate gatekeepers.",
    description:
      "Autonomous agents can hold value, pay for services, and interact with smart contracts directly on Parallax. Economic activity between machines is settled on a chain secured by physics, not by the policies of a single platform."
  },
  {
    category: "Technology & Autonomy",
    title: "Machine-to-Machine Commerce",
    short: "Devices and vehicles paying each other for energy, data, and compute.",
    description:
      "IoT devices, EVs, and industrial systems can buy and sell energy, bandwidth, storage, and compute using on-chain payments. No banks, no proprietary billing APIs—just machines speaking an open economic protocol."
  },
  {
    category: "Technology & Autonomy",
    title: "Quantum-Resilient Settlement",
    short: "A PoW base layer designed to evolve toward quantum-safe cryptography.",
    description:
      "Parallax combines proven cryptography today with a path to post-quantum schemes tomorrow. Settlement finality is anchored by energy and can be upgraded cryptographically as new standards mature, making it a long-horizon economic base."
  },

  // SOCIETY & HUMAN FREEDOM
  {
    category: "Freedom & Society",
    title: "Financial Sovereignty for Restricted Regions",
    short: "Borderless savings and payments under capital controls or weak banking systems.",
    description:
      "Anyone with a network connection and a private key can store value and transact globally, without local banks or permission. Parallax offers a way out of hyperinflation, capital controls, and unstable financial infrastructure."
  },
  {
    category: "Freedom & Society",
    title: "Digital Inheritance & Asset Wills",
    short: "On-chain logic to handle inheritance and long-term asset distribution.",
    description:
      "Smart contracts can encode how assets should move across generations—using time locks, multi-party approvals, or external proofs—while settlement remains immutable. Legal complexity is reduced to clear, verifiable rules."
  },
  {
    category: "Freedom & Society",
    title: "Election & Public Record Integrity",
    short: "Anchoring civic data and election results to an immutable ledger.",
    description:
      "Hashes of election results, legal records, and public documents can be committed to Parallax, creating a permanent audit trail. Even if local systems are compromised, the original state can always be checked against the chain."
  },
  {
    category: "Freedom & Society",
    title: "Scientific Integrity Registry",
    short: "Timestamped, tamper-proof records for research data and results.",
    description:
      "Researchers can anchor datasets, code, and papers to Parallax at every stage of their work. This makes precedence, authorship, and reproducibility independently verifiable over time, protecting science from quiet revision or deletion."
  },

  // GOVERNANCE & INSTITUTIONS
  {
    category: "Governance & Institutions",
    title: "Autonomous Corporate Registry",
    short: "On-chain registration for companies, equity, and governance rules.",
    description:
      "Formation documents, cap tables, and voting rights can live on Parallax instead of siloed state registries. Ownership, dilution, and governance events become cryptographically verifiable, reducing fraud and legal friction for founders and investors."
  },
  {
    category: "Governance & Institutions",
    title: "Neutral Arbitration & Dispute Resolution",
    short: "Enforceable on-chain outcomes for disputes and commercial conflicts.",
    description:
      "Arbitration bodies can use smart contracts and escrows on Parallax to enforce rulings. Funds are locked and released based on agreed rules, providing global, jurisdiction-agnostic enforcement without centralized courts."
  },

  // MONEY + MEDIA
  {
    category: "Money & Media",
    title: "Digital Art Preservation & Provenance",
    short: "Proof-of-origin and ownership for digital art and media.",
    description:
      "Artists and collectors can timestamp and register works on Parallax, ensuring provenance survives platform failures and licensing changes. Ownership records remain verifiable for decades, backed by an energy-secured chain."
  },
  {
    category: "Money & Media",
    title: "Streaming Money for Creative Economies",
    short: "Real-time earnings distribution for creators and collaborators.",
    description:
      "Payments can be streamed to multiple stakeholders—artists, producers, editors—in real time as content is consumed. Revenue flows through transparent smart contracts rather than opaque platform payouts."
  },

  // ENVIRONMENT & ENERGY
  {
    category: "Environment & Energy",
    title: "Carbon Market Integrity System",
    short: "Transparent issuance and retirement of carbon credits.",
    description:
      "Carbon credits can be minted, traded, and retired on Parallax with cryptographic auditability. Supply, transfers, and retirement events are verifiable, making climate markets harder to game and easier to trust."
  },
  {
    category: "Environment & Energy",
    title: "Renewable Grid Balancing",
    short: "Real-time incentives to stabilize renewable energy grids.",
    description:
      "Homes, batteries, and industrial loads can respond to price signals by shifting consumption or selling excess energy. Micro-payments on Parallax coordinate demand response and help grids integrate more renewable power."
  },

  // INFRASTRUCTURE & SUPPLY CHAINS
  {
    category: "Infrastructure & Supply Chains",
    title: "Decentralized Compute & Storage Settlement",
    short: "Settlement rails for open compute, storage, and bandwidth markets.",
    description:
      "Compute and storage networks can use Parallax to handle payments, collateral, and integrity proofs. Users pay exactly for what they consume, while providers compete globally on an open, neutral settlement layer."
  },
  {
    category: "Infrastructure & Supply Chains",
    title: "Proof-of-Build Supply Chains",
    short: "End-to-end traceability for manufacturing and logistics.",
    description:
      "Every step in a supply chain—from origin to shipment to delivery—can be timestamped on Parallax. Manufacturers, regulators, and consumers gain verifiable provenance for food, medicine, electronics, and other critical goods."
  },

  // MEMORY, MEDIA & TRUTH
  {
    category: "Memory & Truth",
    title: "Digital Time Capsules",
    short: "Preserving life events and artifacts on an immutable ledger.",
    description:
      "Individuals and institutions can anchor letters, photos, and stories to Parallax, ensuring they remain verifiable far into the future. It becomes a neutral, tamper-resistant memory layer for culture and personal history."
  },
  {
    category: "Memory & Truth",
    title: "Fact-Verification Layer for Journalism",
    short: "Anchoring evidence and reporting to resist manipulation.",
    description:
      "Journalists can commit hashes of documents, interviews, and investigations to Parallax when they are collected. If narratives are later contested, the original evidence trail can be independently verified against the chain."
  },

  // SECURITY & IDENTITY
  {
    category: "Security & Identity",
    title: "Self-Sovereign Access Control",
    short: "Use keys, not accounts and passwords, to access services.",
    description:
      "Apps, devices, and online services can rely on Parallax keys for authentication and authorization. Users keep control of their identity while businesses reduce their attack surface and dependency on centralized identity providers."
  },
  {
    category: "Security & Identity",
    title: "Burner Wallet Commerce",
    short: "Safe, temporary wallets for low-friction, privacy-friendly interactions.",
    description:
      "Ephemeral wallets enable short-lived economic sessions—events, marketplaces, conferences—without tying activity to long-term identities. This improves privacy and reduces risk while keeping UX smooth."
  },

  // EDUCATION & WORK
  {
    category: "Education & Work",
    title: "Open Reputation Graph for Skills",
    short: "Portable, verifiable proof of skills and work history.",
    description:
      "Workers can build a reputation on-chain based on contributions, completed projects, and verified credentials. Employers can verify claims instantly, and individuals are no longer locked into platform-specific profiles."
  },
  {
    category: "Education & Work",
    title: "Peer-to-Peer Education Markets",
    short: "Teachers and learners transacting directly, without institutional gatekeepers.",
    description:
      "Anyone can teach or learn through smart-contract marketplaces on Parallax, with payments, credentials, and progress recorded on-chain. Education becomes borderless, merit-driven, and less dependent on traditional institutions."
  },
  // ENERGY-BASED CONSENSUS
  {
    category: "Energy-Based Consensus",
    title: "Energy-Backed Security Guarantees",
    short: "Security proportional to real-world cost, not governance assumptions.",
    description:
      "Attacking Parallax requires expending vast amounts of energy in the real world. This anchors security in something attackers cannot fake or coordinate around socially, unlike systems that rely heavily on votes or reputation."
  },
  {
    category: "Energy-Based Consensus",
    title: "Geography-Agnostic Participation",
    short: "Anyone with energy access can help secure the network.",
    description:
      "Miners can operate wherever energy is available—hydro, geothermal, solar, or surplus grid capacity. Consensus participation is tied to physical infrastructure, not insider status or large pre-existing token holdings."
  },
  {
    category: "Energy-Based Consensus",
    title: "Energy Market Integration",
    short: "PoW as a global buyer of last resort for stranded or excess energy.",
    description:
      "Mining can absorb surplus production that would otherwise be wasted, monetizing remote resources and improving grid efficiency. It aligns economic incentives with better utilization of energy infrastructure."
  },
  {
    category: "Energy-Based Consensus",
    title: "Cost-Anchored Settlement Finality",
    short: "Finality measured in energy spent, not in governance comfort.",
    description:
      "Each block buried under more work becomes exponentially harder to rewrite. Finality increases with cumulative energy spent, providing a form of certainty that is grounded in physics rather than the goodwill of stakeholders."
  },
  {
    category: "Energy-Based Consensus",
    title: "Censorship Resistance Through Entropy",
    short: "Physical randomness makes coordinated censorship expensive and unstable.",
    description:
      "PoW introduces entropy into block production that is difficult to optimize or centrally control. Sustained censorship requires continuous, costly coordination, making it economically unattractive compared to honest participation."
  },
  {
    category: "Energy-Based Consensus",
    title: "Trustless Monetary Policy",
    short: "Issuance enforced by energy and code, not committees or votes.",
    description:
      "Parallax’s monetary schedule is not subject to governance capture or discretionary changes. As long as miners follow the rules, issuance stays predictable and transparent, giving users a base money they don’t have to ‘trust’—only verify."
  }
]

function shuffle<T>(arr: T[]): T[] {
  return [...arr]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export function UseCases() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const [expanded, setExpanded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [cases, setCases] = useState<typeof USE_CASES>([])

  useEffect(() => {
    setCases(shuffle(USE_CASES))
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mq = window.matchMedia("(pointer: fine)")
    const update = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches)
    }

    update(mq)
    mq.addEventListener("change", update)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => mq.removeEventListener("change", update as any)
  }, [])

  return (
    <section className="py-24 border-b px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Use Cases</h2>
        </div>

        <div className="mx-auto mt-24 max-w-7xl">
          <Carousel
            className="w-full"
            opts={{
              loop: true,
              active: true,
            }}
            plugins={[plugin.current]}
            onMouseEnter={() => {
              plugin.current.stop()
            }}
            onMouseLeave={() => {
              plugin.current.reset()
              // we *don’t* auto-collapse here so click still matters
            }}
          >
            <CarouselContent>
              {cases.map((useCase) => (
                <CarouselItem
                  key={useCase.title}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col">
                      <CardHeader>
                        <CardTitle className="mt-1 text-lg">
                          {useCase.title}
                          {useCase.category && (
                            <p className="text-xs font-medium text-primary/70 uppercase tracking-wide">
                              {useCase.category}
                            </p>
                          )}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="flex-1 flex flex-col gap-3 text-sm text-muted-foreground">
                        <p className="font-medium leading-relaxed">
                          {useCase.short}
                        </p>

                        <div
                          className={`
                            transition-all duration-300 ease-out overflow-hidden
                            ${expanded ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"}
                          `}
                        >
                          <p className="leading-relaxed">
                            {useCase.description}
                          </p>
                        </div>

                        <div className="mt-auto pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-2 px-2 text-xs underline"
                            onClick={() => setExpanded((prev) => !prev)}
                          >
                            {expanded ? "Show less" : "Learn more"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
