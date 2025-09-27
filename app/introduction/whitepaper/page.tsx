import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function WhitepaperPage() {
  return (
    <>
      <PageHeader
        title="Parallax: A New Perspective on Programmable Cash"
      />
      <main className="py-8 min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-end max-w-6xl w-full pb-8 mx-auto">
            <Button variant={'outline'} asChild>
              <Link href={"https://github.com/microstack-tech/parallax-whitepaper"} target="_blank">
                <FaGithub />
                View on Github
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-4 bg-card ring-4 max-w-6xl ring-muted/10 rounded-md border px-8 py-12 mx-auto items-start">
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              Abstract
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax is a timechain protocol that unites Bitcoin’s immutability and monetary discipline with Ethereum’s programmability. Operating under Bitcoin’s fixed rules — Proof of Work, ten-minute blocks, halving cycles, and a capped 21 million supply — Parallax extends these foundations with the Ethereum Virtual Machine. By adopting Ethash mining and rejecting premine or privileged allocations, it launches as a fair and neutral experiment in programmable cash: scarce, decentralized, and permissionless.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              1. Introduction
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {`Bitcoin demonstrated that decentralized digital scarcity is possible, providing a secure and immutable ledger with a predictable monetary policy. Ethereum introduced a Turing-complete execution layer, enabling decentralized applications and financial primitives. However, Ethereum's adaptive monetary policy contrasts with Bitcoin's fixed, discipline-driven design.`}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {`Parallax bridges this gap. It preserves Bitcoin's monetary rules while adopting Ethereum's virtual machine for programmability. To further strengthen accessibility and decentralization, Parallax employs the Ethash Proof of Work function, historically used by Ethereum before its transition to Proof of Stake.`}
            </p>

            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              2. Motivation and Problem Statement
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The blockchain ecosystem has evolved around two philosophical poles. Bitcoin prioritizes immutability, scarcity, and resistance to change, giving the world its first example of digital sound money. Ethereum, in contrast, embraced programmability and flexibility, enabling entire industries such as decentralized finance and NFTs, but at the expense of monetary predictability and long-term stability.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The divergence between these two models has left a gap in the ecosystem. Users and institutions often want the expressiveness of Ethereum without sacrificing the monetary assurances of Bitcoin. Parallax is designed to fill this gap. It applies Bitcoin’s fixed rules of money — capped supply, halving schedule, and secure Proof of Work consensus — while simultaneously supporting the EVM as a fully programmable execution environment. The result is a system that can power decentralized applications on top of a monetary base that is as predictable and scarce as Bitcoin itself.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              To realize this synthesis of scarcity and expressiveness, Parallax defines explicit system parameters that mirror Bitcoin’s discipline while supporting Ethereum-level programmability.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              3. System Parameters
            </h2>
            <div className="my-6 w-full overflow-visible">
              <table className="w-full">
                <thead>
                  <tr className="even:bg-muted/40 m-0 border-t p-0">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Parameter
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Consensus Mechanism
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Proof of Work (Ethash)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Target Block Interval
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      600 seconds (10 minutes)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Difficulty Adjustment Window
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      2016 block (~2 weeks)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Initial Block Reward
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      50 coins
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Halving Interval
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      210,000 blocks (~4 years)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Maximum Supply
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      21,000,000 coins
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Premine
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      0 (no pre-mined coins)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Execution Environment
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Ethereum Virtual Machine (EVM)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Fee Model
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      First-price auction (no burning)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Block Gas Limit
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      600M gas (initial), miner-adjustable by ±0.1% per block
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              4. Comparative Analysis
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The distinct position of Parallax becomes clearer when contrasted with Bitcoin and Ethereum.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Bitcoin maintains a strict monetary supply of 21 million coins, distributed over time through a halving schedule every 210,000 blocks. However, its scripting language is deliberately limited, making it unsuitable for complex applications. Ethereum, on the other hand, pioneered the use of a Turing-complete execution environment through the EVM. This allowed smart contracts, decentralized exchanges, stablecoins, and DAOs to flourish. Yet Ethereum’s monetary design diverges from Bitcoin. Its supply is not capped, and with the London hard fork (EIP-1559), a portion of transaction fees is burned, introducing supply dynamics that are dependent on usage and governance decisions.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax is positioned between these two. Like Bitcoin, it has a fixed supply of 21 million coins, with issuance governed by halving cycles and an immutable schedule. Like Ethereum, it offers a Turing-complete execution environment, compatible with existing developer tools and smart contracts. But unlike Ethereum, Parallax rejects supply burning and adaptive monetary policy, ensuring that programmability does not come at the cost of predictable monetary rules.
            </p>
            <div className="my-6 w-full overflow-visible">
              <table className="w-full">
                <thead>
                  <tr className="even:bg-muted/40 m-0 border-t p-0">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Feature
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Bitcoin
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Ethereum
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Parallax
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Supply Cap
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      21M (fixed)
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Uncapped
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      21M (fixed)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Block Interval
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      10 min
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      12-15s
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      10 min
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Consensus
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      PoW (SHA-256)
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      PoS (Casper/Beacon)
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      PoW (Ethash)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Programmability
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Limited script
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Full EVM
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Full EVM
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Fee Model
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      First-price
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      EIP-1559
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      First-price (no burn)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Fee Model
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      First-price
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      EIP-1559
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      First-price (no burn)
                    </td>
                  </tr>
                  <tr className="even:bg-muted/20 m-0 border-t p-0">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Coinbase Maturity Threshold
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      100 Blocks
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      N/A
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      100 Blocks
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              5. Genesis Block
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The genesis block of Parallax is deliberately minimal. There is no pre-mine, no foundation allocation, and no privileged accounts. The first block mined after genesis issues 50 coins to the successful miner, in line with the Bitcoin model. The genesis state also includes the base EVM configuration but no pre-deployed smart contracts.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              To further guarantee fairness and prove that the network was not secretly created beforehand, the genesis block will include an extra data field containing the title of a news article published on the launch date, drawn from a reputable source such as The Times or The New York Times. This timestamping method, inspired by Bitcoin’s genesis block, ensures that the genesis could not have been pre-mined or constructed prior to the public launch.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              This design choice reinforces transparency, credibility, and neutrality from the very first block.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              6. Consensus and Timechain
            </h2>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              Block Structure
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              {`Parallax adopts Bitcoin's timechain structure, modified to include an EVM execution payload. Each block consists of a block header with the hash, nonce, Merkle root, and timestamp, followed by transactions and their execution receipts. The transactions themselves follow Ethereum’s account-based format, allowing developers to use familiar tools.`}
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              Proof of Work
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax employs Nakamoto consensus with Ethash. Ethash is memory-hard and was originally designed to discourage the centralization of mining in specialized ASIC hardware. By choosing Ethash, Parallax favors broader participation via commodity GPUs, especially in its early years. A valid block requires finding a nonce
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                n
              </code>
              such that:
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`Ethash(block_header, n) < T`}
              </code>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              where
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`T`}
              </code>
              is the current network difficulty target.
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              Block Interval and Difficulty Adjustment
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Every 2016 blocks, approximately two weeks, the difficulty target is adjusted by comparing the actual time taken to the expected interval. To prevent extreme oscillations, the adjustment is bounded by a factor of four: the new difficulty cannot be more than four times higher or lower than the previous difficulty, mirroring Bitcoin’s design.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`T_new = clamp( T_old * (t_actual / t_expected), T_old / 4, T_old * 4 )`}
              </code>
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              where
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`T_old = previous difficulty target`}
              </code>,
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`t_actual = actual time taken to mine the last 2016 blocks`}
              </code> and
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`t_expected = expected time for 2016 blocks (2016 * 600 seconds)`}
              </code>.
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              Emission Schedule
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The block subsidy begins at 50 coins and halves every 210,000 blocks:
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`R(h) = 50 / 2^( floor(h / 210000) )`}
              </code>.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              where
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`h`}
              </code>.
              is the block height. The cumulative supply converges to the hard limit of 21 million coins:
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              <code className="mx-1 bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {`lim h→∞ S(h) = 21,000,000`}
              </code>.
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              Coinbase Maturity
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax enforces a coinbase maturity period identical to Bitcoin’s. Newly mined coins (block rewards) cannot be spent until 100 additional blocks have been added on top of the block that issued them. With Parallax’s 10-minute block interval, this corresponds to roughly 16–17 hours of confirmation time. This rule ensures that rewards are only spendable once the probability of a chain reorganization invalidating the block is negligible. It strengthens network security by aligning miner incentives with long-term chain stability and prevents immediate liquidation of block rewards while reorg risk remains relatively high
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              7. Execution Layer
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The execution layer of Parallax is the Ethereum Virtual Machine, enabling compatibility with existing Ethereum smart contracts and developer tools. Developers can port Solidity and Vyper contracts with minimal modification, and existing frameworks such as Hardhat and Foundry can be adapted to work with Parallax nodes.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax diverges from Ethereum in its approach to transaction fees. It rejects the London hard fork’s EIP-1559 fee-burning model, as burning supply is incompatible with a fixed 21 million cap. Instead, Parallax maintains a simple first-price auction for gas fees, with all fees going directly to miners.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The block gas limit is adjusted for Parallax’s longer block time. Ethereum processes about 30 million gas every 15 seconds, or roughly 2 million gas per second. Extrapolated to Parallax’s 600-second interval, this would imply 1.2 billion gas per block. Such a high value would create propagation risks and excessive state growth. Parallax therefore adopts a conservative initial gas limit of 600 million gas per block, corresponding to approximately 1 million gas per second, which is half of Ethereum’s throughput. This choice prioritizes decentralization and stability over maximum throughput. The gas limit can adjust elastically by ±0.1% per block, consistent with Ethereum’s pre-London mechanism, allowing gradual changes over time.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The account-based state model is retained in full, meaning Parallax supports the same type of contracts, balances, and execution semantics as Ethereum, while grounding them in Bitcoin’s monetary discipline.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              8. Tokenomics
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax inherits its monetary design directly from Bitcoin. All coins must be mined via Proof of Work, with no pre-mine or privileged allocations. The block reward schedule mirrors Bitcoin exactly, beginning at 50 coins and halving every 210,000 blocks until issuance reaches zero. Transaction fees are paid entirely to miners and never burned, ensuring that total supply cannot fall below 21 million. This ossified monetary design distinguishes Parallax from more adaptive protocols and provides long-term predictability for users and institutions.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              9. Security Model
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax’s security emerges from the combination of Proof of Work, long block intervals, and strict monetary policy. The ten-minute target ensures deep finality over time, making double-spending attacks expensive and impractical. Longer block times reduce the frequency of chain reorganizations, contributing to network stability.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Ethash strengthens security in another dimension by promoting miner accessibility. Its memory-hard nature means that commodity hardware, especially GPUs, can participate competitively. This makes it more difficult for a small number of industrial ASIC operators to dominate the network, particularly in the early stages of adoption.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Propagation and block size considerations are also central to Parallax’s security model. By conservatively capping throughput at around one million gas per second, Parallax ensures that nodes remain accessible to individuals and smaller operators, preventing excessive centralization pressures. The combination of fixed supply, cumulative Proof of Work, and fair miner incentives forms a trust-minimized foundation resistant to governance manipulation.
            </p>
            <h3 className="pt-4 scroll-m-20 text-2xl font-semibold tracking-tight">
              Energy Considerations
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Critics of Proof of Work often highlight its energy intensity. However, Bitcoin has demonstrated through empirical studies that a majority of its global hash rate is powered by renewable or otherwise stranded energy sources, as miners naturally gravitate toward the cheapest available electricity. Over time, this market-driven incentive structure has aligned Bitcoin mining with renewable adoption and grid-balancing functions.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax follows the same economic principles. While energy use is unavoidable in any Proof of Work system, the protocol’s long-term maturity is expected to replicate Bitcoin’s trajectory, with miners seeking renewable and surplus energy to minimize operational costs. This dynamic turns energy expenditure from a perceived drawback into a feature that anchors security in physical reality, reinforces Satoshi’s vision that consensus must be grounded in economic incentives, and simultaneously incentivizes the growth of renewable infrastructure.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              By embedding its security in physical reality while aligning incentives with renewable energy, Parallax strengthens both its decentralization and its credibility as a sustainable timechain.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              10. Use Cases
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax’s design enables a range of applications that combine sound money with programmability. DeFi protocols can operate on a scarce and predictable monetary base, offering lending, stablecoins, and decentralized exchanges with credibility derived from Bitcoin’s model. NFTs and DAOs can be created with the assurance that the underlying currency is not subject to inflation or arbitrary monetary change. Institutions seeking programmable settlement rails may find Parallax attractive as it offers the expressiveness of Ethereum without the uncertainty of adaptive supply. Finally, Parallax can also serve as a foundation for rollups and other scaling solutions, leveraging its long-term credibility while enabling high-throughput applications on secondary layers.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              As second-layer solutions emerge, neutrality at the base layer becomes paramount. Without ossified monetary rules and permissionless consensus, Layer 2 systems inherit governance and centralization risks. By anchoring programmability to a neutral Proof of Work timechain, Parallax aspires to serve as a settlement layer with the same credibility Bitcoin offers to money.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              11. Governance Philosophy
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax follows a minimal-governance approach. Its monetary policy is immutable, ensuring that the cap of 21 million coins cannot be changed by community decision or governance vote. Protocol upgrades are limited to technical improvements and bug fixes. No foundation, company, or privileged entity has control over supply or emission, ensuring neutrality and trust-minimization at every layer of the protocol.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              True neutrality requires ossification of the monetary base: Parallax cannot become a tool for discretionary policy or governance capture, as its rules are hard-coded and immune to debasement. Neutrality is not simply a design choice but a credibility mechanism that prevents capture by special interests.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              While Parallax is currently being developed under the MicroStack name, the long-term vision is a fully community-driven protocol. Once the codebase and network reach sufficient maturity and stability, stewardship will be transitioned from MicroStack to the broader ecosystem. Development, maintenance, and future upgrades will then be coordinated in an open, transparent manner by the community, ensuring that no single company or entity can exert privileged control over Parallax.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax recognizes Bitcoin as the ultimate form of digital sound money, with unmatched credibility in its fixed monetary rules and long-term immutability. The role of Parallax is not to compete with Bitcoin, but to experiment with extending Bitcoin’s monetary discipline into a programmable environment. By combining Bitcoin’s ethos of scarcity with Ethereum’s expressiveness, Parallax offers a complementary system that explores what is possible when neutrality, decentralization, and programmability are brought together.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              12. The Primacy of Proof of Work
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Satoshi Nakamoto’s introduction of Proof of Work as a practical solution to the Byzantine Generals Problem remains one of the most important inventions in human history. By anchoring consensus to the expenditure of real-world energy, Bitcoin proved that it is possible to coordinate a global set of untrusted actors without requiring permission, identity, or central authority. Proof of Work is not merely a consensus algorithm; it is the cornerstone of permissionless decentralization and the foundation of the first credible digital money.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Proof of Work enforces a radically open entry condition: anyone, anywhere, may compete for block rewards by expending energy. No identity, capital lock-up, or institutional recognition is required. This enshrines equality of access as a core property of the timechain.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax adopts this principle in full. While it introduces programmability through the EVM, it does not compromise on the bedrock that makes decentralization possible: Nakamoto consensus through Proof of Work. A permissionless timechain cannot be achieved through committee signatures, voting schemes, or governance tokens, as these all reintroduce central points of control.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Many alternative cryptocurrencies (“altcoins”) have pursued speed, throughput, or experimental features at the expense of neutrality and decentralization. While faster block times or novel governance models may appear attractive in the short term, they typically rely on centralized consensus mechanisms or privileged validators. This undermines the very property that makes Bitcoin revolutionary: the ability to participate without permission and without trust in any authority.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              The decentralization of Parallax arises from both the accessibility of Ethash mining and the ossified monetary rules. By externalizing attack costs to physical energy and hardware, Parallax resists capture by financial whales or governance cartels. Influence is earned only through work performed, never through privilege or identity.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax rejects such trade-offs. Its design respects and extends Satoshi’s vision by preserving Proof of Work as the only credible foundation for a decentralized, permissionless timechain. All programmability, throughput, and application-layer innovations must operate within this boundary: decentralization first, convenience second. With sufficient network maturity, the drawbacks of slow block intervals can be mitigated through the use of Layer 2 settlement solutions, ensuring scalability without sacrificing the core guarantees of permissionless decentralization.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
              13. Conclusion
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax is an experiment in extending Bitcoin’s monetary ethos into a programmable environment. Its neutrality, ossified monetary policy, and reliance on Proof of Work ensure that it cannot be captured or co-opted. The future of the protocol will rest in the hands of its community — developers, miners, and users alike — to discover what becomes possible when scarcity, decentralization, and programmability converge.
            </p>
            <h2 className="border-b pb-2 text-3xl w-full font-semibold tracking-tight first:mt-0">
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              Parallax will follow a transparent release process to ensure fairness and neutrality:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              <li><strong>Whitepaper Release:</strong><br /> The protocol specification and economic model will be published publicly to invite community review and discussion.</li>
              <li><strong>Open-Source Code Release and Mainnet Launch:</strong><br /> After the whitepaper is published, the full Parallax client source code will be released. The mainnet will launch after code release, with no premine, no privileged allocations, and no hidden mining period. The exact mainnet launch date will be announced on our our official X account and will take place at least two weeks after the lock-in announcement, ensuring all participants have equal time to prepare.</li>
              <li><strong>Genesis Block:</strong><br /> The genesis block will be minimal, with no pre-deployed contracts or special accounts. The first miner to solve a valid block will receive the standard block reward of 50 coins.</li>
            </ul>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              This schedule ensures that all participants—developers, miners, institutions, and the broader community—can prepare in advance, while maintaining the credibility of a fair launch aligned with Bitcoin’s ethos of openness and neutrality.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              There is no premine, no insider mining, and no privileged allocations. Every participant begins at the same starting line at genesis.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-2">
              In the spirit of Bitcoin’s neutrality, Parallax is not owned, controlled, or steered by any single entity — it is a community experiment in uniting scarcity with expressiveness.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
