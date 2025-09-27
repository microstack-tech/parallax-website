"use client"

import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { LucideChevronRight } from "lucide-react"
import { useState } from "react"

const faqCategories = [
  { id: "general", name: "General" },
  { id: "technical", name: "Technical" },
  { id: "mining", name: "Mining" },
  { id: "economics", name: "Economics" },
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
  ],
  technical: [
    {
      question: "What consensus mechanism does Parallax use?",
      answer:
        "Parallax uses Proof of Work (PoW) consensus with Ethash mining algorithm, making it GPU-friendly unlike Bitcoin's ASIC-dominated SHA-256. This ensures broader mining participation while maintaining the security benefits of PoW.",
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
  ],
  mining: [
    {
      question: "How can I mine Parallax?",
      answer:
        "Parallax uses Ethash mining algorithm, so you can mine with GPUs using existing Ethereum mining software. Simply point your miner to a Parallax mining pool with the appropriate configuration. CPU mining is also possible but less efficient.",
    },
    {
      question: "What is the mining reward schedule?",
      answer:
        "Parallax follows Bitcoin's halving schedule. The initial block reward starts at 50 Laxes per block and halves approximately every 4 years (210,000 blocks). This ensures the same scarcity model that has proven successful with Bitcoin.",
    },
    {
      question: "Can I use my Ethereum mining rig?",
      answer:
        "Yes! Since Parallax uses the Ethash algorithm, existing Ethereum mining rigs can mine Parallax without hardware changes. Simply update your mining software configuration to point to Parallax pools.",
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
      question: "Is there a premine or ICO?",
      answer:
        "No. Parallax follows a fair launch model with no premine, no ICO, and no privileged allocations. All coins are distributed through mining rewards, ensuring decentralized and equitable distribution from day one.",
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

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subTitle="Find answers to recurring questions about Parallax"
      />
      {/* FAQ Content */}
      <section className="relative py-32 bg-transparent z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <nav className="space-y-2">
                  {faqCategories.map((category) => (
                    <Button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      variant={'ghost'}
                      className={`w-full text-base py-5 cursor-pointer justify-start text-left ${activeCategory === category.id
                        ? "bg-primary text-primary-foreground"
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
                <h2 className="text-3xl font-bold text-primary capitalize mb-6">
                  {faqCategories.find((cat) => cat.id === activeCategory)?.name}
                </h2>

                {faqData[activeCategory as keyof typeof faqData]?.map((faq, index) => {
                  const questionId = `${activeCategory}-${index}`

                  return (
                    <div key={questionId} className="overflow-hidden">
                      <h3 className="inline-flex items-center gap-4 px-4 py-4 font-semibold text-foreground text-balance text-lg">
                        <LucideChevronRight />
                        {faq.question}
                      </h3>

                      <div className="px-6 pb-4 border-t border-border">
                        <div className="pt-4 text-base text-muted-foreground leading-relaxed">{faq.answer}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
