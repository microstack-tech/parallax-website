import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Parallax Protocol — covering general, technical, mining, economics, governance, and development topics.",
}

const faqEntries = [
  { q: "What is Parallax?", a: "Parallax is a blockchain protocol that combines Bitcoin's proven monetary discipline with Ethereum's programmability. It maintains Bitcoin's fixed 21M coin supply, 10-minute blocks, and Proof of Work consensus while adding full EVM compatibility for smart contracts." },
  { q: "Who created Parallax?", a: "Parallax was created by a team of blockchain developers who recognized the need for a protocol that bridges Bitcoin's sound money principles with Ethereum's smart contract capabilities. The project follows a fair launch model with no premine or privileged allocations." },
  { q: "How is Parallax different from Bitcoin and Ethereum?", a: "Parallax uniquely combines the best of both worlds: Bitcoin's monetary policy (21M fixed supply, halving cycles, PoW) with Ethereum's programmability (EVM compatibility, smart contracts). Unlike Bitcoin, it supports complex applications. Unlike Ethereum, it maintains a fixed supply and doesn't burn fees." },
  { q: "Why Proof of Work instead of Proof of Stake?", a: "Proof of Work anchors security to an external, objective cost — energy — that cannot be simulated, voted into existence, or socially negotiated. PoW ensures that influence is earned only through work, never through privilege or identity, making it the only consensus mechanism compatible with true permissionlessness." },
  { q: "What consensus mechanism does Parallax use?", a: "Parallax uses Proof of Work (PoW) consensus with XHash mining algorithm, making it GPU-friendly unlike Bitcoin's ASIC-dominated SHA-256. This ensures broader mining participation while maintaining the security benefits of PoW." },
  { q: "What is XHash and why was it chosen?", a: "XHash is a modified Ethash variant specifically designed to obsolete existing ASICs and keep mining accessible to commodity hardware like GPUs. By resisting ASIC dominance, XHash promotes miner diversity and broader participation in securing the network." },
  { q: "Is Parallax EVM compatible?", a: "Yes, Parallax is fully EVM compatible, meaning all Ethereum smart contracts, tools, and applications can run on Parallax without modification. Developers can use familiar tools like MetaMask, Remix, and Hardhat." },
  { q: "What are the block times and transaction fees?", a: "Parallax maintains 10-minute block intervals like Bitcoin for stability and predictability. Transaction fees use a first-price auction model where fees go directly to miners, ensuring sustainable mining incentives without fee burning." },
  { q: "Why 10-minute blocks instead of faster?", a: "Global agreement requires physical delay. Systems that minimize time-to-finality below physical limits introduce hidden advantages that centralize consensus. Parallax treats time as a stabilizing force. Finality earned slowly through accumulated work is more robust than finality declared quickly." },
  { q: "What is the block gas limit?", a: "Parallax uses a conservative block gas limit of 600 million gas, approximately half of Ethereum's throughput. This ensures full nodes remain accessible to individuals running commodity hardware, prioritizing decentralization over raw speed." },
  { q: "How does Parallax handle 51% attacks?", a: "Parallax's security model combines Proof of Work, 10-minute block intervals, and XHash mining to make attacks prohibitively expensive. Rewriting history requires accumulating more work than the honest chain — a cost that grows with every block." },
  { q: "What is coinbase maturity?", a: "Coinbase maturity is a 100-block lockup period (approximately 17 hours) before newly mined block rewards can be spent. This prevents miners from spending rewards from blocks that might later be reorganized out of the chain." },
  { q: "What are the hardware requirements for running a full node?", a: "Parallax is designed so that full nodes can run on commodity hardware accessible to individuals. The conservative block gas limit and 10-minute block intervals keep storage growth, bandwidth, and computation requirements manageable." },
  { q: "How can I mine Parallax?", a: "Parallax uses XHash mining algorithm, so you can mine with CPUs and GPUs using the built-in Parallax client miner or an external GPU miner. Simply point your miner to a Parallax mining pool with the appropriate configuration." },
  { q: "What is the mining reward schedule?", a: "Parallax follows Bitcoin's halving schedule. The initial block reward starts at 50 Laxes per block and halves approximately every 4 years (210,000 blocks)." },
  { q: "Can I use my Ethereum mining rig?", a: "Yes! Since Parallax uses the XHash algorithm which is based on Ethash, existing Ethereum mining rigs can mine Parallax without hardware changes." },
  { q: "What is the total supply of Parallax?", a: "Parallax has a fixed maximum supply of 21 million coins, identical to Bitcoin. This hard cap ensures scarcity and deflationary monetary policy." },
  { q: "How are transaction fees handled?", a: "Unlike Ethereum's fee burning mechanism, Parallax uses a first-price auction model where all transaction fees go directly to miners. This ensures sustainable mining incentives and maintains the economic security of the network." },
  { q: "Why doesn't Parallax burn fees like Ethereum?", a: "Fee burning reduces miner revenue and creates a dependency on transaction volume for economic security. In Parallax, all fees go directly to miners, ensuring they remain economically incentivized to secure the network regardless of block subsidy levels." },
  { q: "What happens when all 21 million coins are mined?", a: "Once all 21 million coins have been mined, miners will be sustained entirely by transaction fees. Because Parallax does not burn fees, all transaction fees flow directly to miners, providing a long-term economic incentive to continue securing the network." },
  { q: "Is there a premine or ICO?", a: "No. Parallax follows a fair launch model with no premine, no ICO, and no privileged allocations. All coins are distributed through mining rewards." },
  { q: "How are protocol upgrades decided?", a: "Parallax follows a minimal governance philosophy. The protocol's monetary policy is considered immutable and not subject to governance. Upgrades are limited to technical improvements and bug fixes, driven by community consensus." },
  { q: "Is there a foundation or company behind Parallax?", a: "Parallax was initially stewarded by MicroStack, but the protocol is designed to outlive its creators. There is no foundation controlling the protocol, no treasury funded by inflation, and no privileged governance tokens." },
  { q: "Will Parallax support Layer 2 solutions?", a: "Yes. The base layer is intentionally conservative — it exists to settle, not to impress. Layer 2 solutions such as rollups and sidechains can anchor to Parallax's secure base layer for scalability while preserving the security guarantees of PoW settlement." },
  { q: "Are there bridges to other blockchains?", a: "As a fully EVM-compatible chain, Parallax is architecturally compatible with existing cross-chain bridge protocols. Since Parallax uses standard Ethereum tooling and interfaces, integrating with bridge infrastructure follows the same patterns as any EVM chain." },
  { q: "How can I build on Parallax?", a: "Building on Parallax is identical to building on Ethereum. Use familiar tools like Solidity, Remix IDE, Hardhat, or Foundry. Deploy contracts using MetaMask or other Web3 wallets by connecting to the Parallax network." },
  { q: "Are there development grants available?", a: "The Parallax ecosystem encourages community-driven development. While there's no central foundation distributing grants, the community actively supports promising projects through various mechanisms and partnerships." },
  { q: "What tools and libraries are supported?", a: "All Ethereum development tools work with Parallax: Web3.js, Ethers.js, MetaMask, Remix, Hardhat, Foundry, OpenZeppelin contracts, and more." },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntries.map((entry) => ({
    "@type": "Question",
    name: entry.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: entry.a,
    },
  })),
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
