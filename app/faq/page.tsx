"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { LucideChevronRight, Search, X } from "lucide-react"
import { useMemo, useState } from "react"

const faqCategories = [
  { id: "general", name: "General" },
  { id: "technical", name: "Technical" },
  { id: "mining", name: "Mining" },
  { id: "economics", name: "Economics" },
  { id: "governance", name: "Governance" },
  { id: "development", name: "Development" },
]

const faqData = {
  general: [
    {
      question: "What is Parallax?",
      answer:
        "Parallax is a blockchain protocol that combines Bitcoin's proven monetary discipline with Ethereum's programmability. It maintains Bitcoin's fixed 21M coin supply, 10-minute blocks, and Proof of Work consensus while adding full EVM compatibility for smart contracts.",
    },
    {
      question: "Who created Parallax?",
      answer:
        "Parallax was created by a team of blockchain developers who recognized the need for a protocol that bridges Bitcoin's sound money principles with Ethereum's smart contract capabilities. The project follows a fair launch model with no premine or privileged allocations.",
    },
    {
      question: "How is Parallax different from Bitcoin and Ethereum?",
      answer:
        "Parallax uniquely combines the best of both worlds: Bitcoin's monetary policy (21M fixed supply, halving cycles, PoW) with Ethereum's programmability (EVM compatibility, smart contracts). Unlike Bitcoin, it supports complex applications. Unlike Ethereum, it maintains a fixed supply and doesn't burn fees.",
    },
    {
      question: "Why Proof of Work instead of Proof of Stake?",
      answer:
        "Proof of Work anchors security to an external, objective cost — energy — that cannot be simulated, voted into existence, or socially negotiated. Proof of Stake systems replace one set of trusted intermediaries with another (validators/committees), merely relocating trust rather than removing it. PoW ensures that influence is earned only through work, never through privilege or identity, making it the only consensus mechanism compatible with true permissionlessness.",
    },
  ],
  technical: [
    {
      question: "What consensus mechanism does Parallax use?",
      answer:
        "Parallax uses Proof of Work (PoW) consensus with XHash mining algorithm, making it GPU-friendly unlike Bitcoin's ASIC-dominated SHA-256. This ensures broader mining participation while maintaining the security benefits of PoW.",
    },
    {
      question: "What is XHash and why was it chosen?",
      answer:
        "XHash is a modified Ethash variant specifically designed to obsolete existing ASICs and keep mining accessible to commodity hardware like GPUs. By resisting ASIC dominance, XHash promotes miner diversity and broader participation in securing the network, preventing the centralization of hash power that has affected other PoW chains.",
    },
    {
      question: "Is Parallax EVM compatible?",
      answer:
        "Yes, Parallax is fully EVM compatible, meaning all Ethereum smart contracts, tools, and applications can run on Parallax without modification. Developers can use familiar tools like MetaMask, Remix, and Hardhat.",
    },
    {
      question: "What are the block times and transaction fees?",
      answer:
        "Parallax maintains 10-minute block intervals like Bitcoin for stability and predictability. Transaction fees use a first-price auction model where fees go directly to miners, ensuring sustainable mining incentives without fee burning.",
    },
    {
      question: "Why 10-minute blocks instead of faster?",
      answer:
        "Global agreement requires physical delay. Systems that minimize time-to-finality below physical limits introduce hidden advantages — proximity to validators, specialized networking, privileged transaction ordering — all of which centralize consensus. Parallax treats time as a stabilizing force. Finality earned slowly through accumulated work is more robust than finality declared quickly through social agreement.",
    },
    {
      question: "What is the block gas limit?",
      answer:
        "Parallax uses a conservative block gas limit of 600 million gas, approximately half of Ethereum's throughput at roughly 1 million gas per second. This is a deliberate design choice: keeping the base layer conservative in throughput ensures full nodes remain accessible to individuals running commodity hardware, prioritizing decentralization over raw speed.",
    },
    {
      question: "How does Parallax handle 51% attacks?",
      answer:
        "Parallax's security model combines Proof of Work, 10-minute block intervals, and XHash mining to make attacks prohibitively expensive. Rewriting history requires accumulating more work than the honest chain — a cost that grows with every block. XHash's accessibility promotes a diverse, distributed mining base, making it harder for any single entity to accumulate majority hash power. The 100-block coinbase maturity period also prevents attackers from immediately spending mined rewards during a reorganization attempt.",
    },
    {
      question: "What is coinbase maturity?",
      answer:
        "Coinbase maturity is a 100-block lockup period (approximately 17 hours) before newly mined block rewards can be spent. This prevents miners from spending rewards from blocks that might later be reorganized out of the chain, adding an additional layer of security against chain reorganization attacks.",
    },
    {
      question: "What are the hardware requirements for running a full node?",
      answer:
        "Parallax is designed so that full nodes can run on commodity hardware accessible to individuals. The conservative block gas limit of 600M gas and 10-minute block intervals keep storage growth, bandwidth, and computation requirements manageable. Any modern computer with a broadband connection can participate in validating the network.",
    },
  ],
  mining: [
    {
      question: "How can I mine Parallax?",
      answer:
        "Parallax uses XHash mining algorithm, so you can mine with CPUs and GPUs using the built-in Parallax client miner or an external GPU miner. Simply point your miner to a Parallax mining pool with the appropriate configuration.",
    },
    {
      question: "What is the mining reward schedule?",
      answer:
        "Parallax follows Bitcoin's halving schedule. The initial block reward starts at 50 Laxes per block and halves approximately every 4 years (210,000 blocks). This ensures the same scarcity model that has proven successful with Bitcoin.",
    },
    {
      question: "Can I use my Ethereum mining rig?",
      answer:
        "Yes! Since Parallax uses the XHash algorithm which is based on Ethash, existing Ethereum mining rigs can mine Parallax without hardware changes. Simply update your mining software configuration to point to Parallax pools.",
    },
  ],
  economics: [
    {
      question: "What is the total supply of Parallax?",
      answer:
        "Parallax has a fixed maximum supply of 21 million coins, identical to Bitcoin. This hard cap ensures scarcity and deflationary monetary policy, making Laxes a store of value while enabling programmable functionality.",
    },
    {
      question: "How are transaction fees handled?",
      answer:
        "Unlike Ethereum's fee burning mechanism, Parallax uses a first-price auction model where all transaction fees go directly to miners. This ensures sustainable mining incentives and maintains the economic security of the network.",
    },
    {
      question: "Why doesn't Parallax burn fees like Ethereum?",
      answer:
        "Fee burning reduces miner revenue and creates a dependency on transaction volume for economic security. In Parallax, all fees go directly to miners, ensuring they remain economically incentivized to secure the network regardless of block subsidy levels. This is especially important as block rewards diminish through halving cycles — transaction fees become the primary incentive for miners, and burning any portion of them would undermine long-term network security.",
    },
    {
      question: "What happens when all 21 million coins are mined?",
      answer:
        "Once all 21 million coins have been mined (estimated to take over a century following the halving schedule), miners will be sustained entirely by transaction fees. Because Parallax does not burn fees, all transaction fees flow directly to miners, providing a long-term economic incentive to continue securing the network. This model mirrors Bitcoin's design and ensures the network remains viable without relying on perpetual coin issuance.",
    },
    {
      question: "Is there a premine or ICO?",
      answer:
        "No. Parallax follows a fair launch model with no premine, no ICO, and no privileged allocations. All coins are distributed through mining rewards, ensuring decentralized and equitable distribution from day one.",
    },
  ],
  governance: [
    {
      question: "How are protocol upgrades decided?",
      answer:
        "Parallax follows a minimal governance philosophy. The protocol's monetary policy — the 21 million supply cap, halving schedule, and PoW consensus — is considered immutable and not subject to governance. Protocol upgrades are limited to technical improvements and bug fixes, and are driven by community consensus rather than any central foundation or company. Any rule that requires interpretation introduces discretion, and discretion introduces capture; Parallax favors deterministically evaluable rules.",
    },
    {
      question: "Is there a foundation or company behind Parallax?",
      answer:
        "Parallax was initially stewarded by MicroStack, but the protocol is designed to outlive its creators. Stewardship is being transitioned to the broader ecosystem as the project matures. There is no foundation controlling the protocol, no treasury funded by inflation, and no privileged governance tokens. The protocol must remain correct even if its creators disappear or disagree.",
    },
    {
      question: "Will Parallax support Layer 2 solutions?",
      answer:
        "Yes. The base layer is intentionally conservative — it exists to settle, not to impress. Maximizing throughput and expressiveness at the base layer increases complexity and attack surface. Parallax confines experimentation to higher layers where failure doesn't threaten settlement. Layer 2 solutions such as rollups and sidechains can anchor to Parallax's secure base layer for scalability while preserving the security guarantees of PoW settlement.",
    },
    {
      question: "Are there bridges to other blockchains?",
      answer:
        "As a fully EVM-compatible chain, Parallax is architecturally compatible with existing cross-chain bridge protocols. Bridge development is driven by the community and ecosystem participants. Since Parallax uses standard Ethereum tooling and interfaces, integrating with bridge infrastructure follows the same patterns as any EVM chain.",
    },
  ],
  development: [
    {
      question: "How can I build on Parallax?",
      answer:
        "Building on Parallax is identical to building on Ethereum. Use familiar tools like Solidity, Remix IDE, Hardhat, or Foundry. Deploy contracts using MetaMask or other Web3 wallets by connecting to the Parallax network.",
    },
    {
      question: "Are there development grants available?",
      answer:
        "The Parallax ecosystem encourages community-driven development. While there's no central foundation distributing grants, the community actively supports promising projects through various mechanisms and partnerships.",
    },
    {
      question: "What tools and libraries are supported?",
      answer:
        "All Ethereum development tools work with Parallax: Web3.js, Ethers.js, MetaMask, Remix, Hardhat, Foundry, OpenZeppelin contracts, and more. The full Ethereum ecosystem is available to Parallax developers.",
    },
  ],
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    const query = searchQuery.toLowerCase()
    const results: { category: string; question: string; answer: string }[] = []
    for (const [categoryId, faqs] of Object.entries(faqData)) {
      for (const faq of faqs) {
        if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
          results.push({ category: categoryId, ...faq })
        }
      }
    }
    return results
  }, [searchQuery])

  const isSearching = searchQuery.trim().length > 0

  return (
    <MainMotion>
      <PageHeader
        title="Frequently Asked Questions"
        subTitle="Find answers to recurring questions about Parallax"
      />
      {/* FAQ Content */}
      <section className="flex mt-24 bg-transparent z-10 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 mx-auto max-w-7xl w-full">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 placeholder:text-muted-foreground/60"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <nav className="space-y-2">
                {faqCategories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => { setActiveCategory(category.id); setSearchQuery("") }}
                    variant={'ghost'}
                    className={`w-full text-base py-5 cursor-pointer justify-start text-left ${!isSearching && activeCategory === category.id
                      ? "bg-gold/10 text-gold font-semibold hover:bg-gold/15 hover:text-gold border-l-2 border-gold"
                      : ""
                      }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex-1">
            <div className="space-y-4">
              {isSearching ? (
                <>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    {searchResults && searchResults.length > 0
                      ? `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`
                      : "No results found"}
                  </h2>
                  {searchResults?.map((faq, index) => (
                    <div key={`search-${index}`} className="overflow-hidden">
                      <h3 className="inline-flex items-center gap-4 px-4 py-4 font-semibold text-foreground text-balance text-lg">
                        <LucideChevronRight className="text-gold" />
                        {faq.question}
                      </h3>
                      <div className="px-6 pb-4 border-t border-border">
                        <div className="pt-4 text-base text-muted-foreground leading-relaxed">{faq.answer}</div>
                        <span className="mt-2 inline-block text-xs font-mono uppercase tracking-wider text-muted-foreground/60">
                          {faqCategories.find((c) => c.id === faq.category)?.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-foreground capitalize mb-6">
                    {faqCategories.find((cat) => cat.id === activeCategory)?.name}
                  </h2>

                  {faqData[activeCategory as keyof typeof faqData]?.map((faq, index) => {
                    const questionId = `${activeCategory}-${index}`

                    return (
                      <div key={questionId} className="overflow-hidden">
                        <h3 className="inline-flex items-center gap-4 px-4 py-4 font-semibold text-foreground text-balance text-lg">
                          <LucideChevronRight className="text-gold" />
                          {faq.question}
                        </h3>

                        <div className="px-6 pb-4 border-t border-border">
                          <div className="pt-4 text-base text-muted-foreground leading-relaxed">{faq.answer}</div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
