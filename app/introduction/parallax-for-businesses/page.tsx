import GridView from "@/components/grid-view"
import PageHeader from "@/components/page-header"
import { Code, DollarSign, Eye, FileText, Lock, Plane, ShieldCheck, Users } from "lucide-react"

const topics = [
  {
    icon: DollarSign,
    title: "Choose Your Own Fees",
    description: "No fees to receive Parallax coins, with customizable fees when sending. Higher fees can speed up transaction confirmations, and fees remain consistent whether transferring 1 or 100,000 coins."
  },
  {
    icon: ShieldCheck,
    title: "Protection Against Fraud",
    description: "Parallax transactions are irreversible, secured by Ethash Proof of Work, eliminating chargeback fraud risks and reducing costs for merchants compared to credit cards or PayPal."
  },
  {
    icon: Plane,
    title: "Fast International Payments",
    description: "Send Parallax coins globally as easily as locally, with no bank delays, no extra international fees, and no limits on transaction amounts."
  },
  {
    icon: Lock,
    title: "No PCI Compliance Required",
    description: "Accept Parallax payments without the costly PCI compliance checks needed for credit cards, while still securing your wallet and payment requests."
  },
  {
    icon: Eye,
    title: "Gain New Visibility",
    description: "Tap into a growing market of Parallax users looking to spend their coins, boosting your business’s visibility by accepting this innovative payment method."
  },
  {
    icon: Users,
    title: "Multi-Signature Governance",
    description: "Use Parallax’s multi-signature feature to require multiple approvals for transactions, ideal for businesses or boards needing secure, consensual spending controls."
  },
  {
    icon: FileText,
    title: "Transparent Accounting",
    description: "Leverage Parallax’s timechain for transparent accounting, enabling verifiable balances and transactions, perfect for businesses or non-profits to showcase financial clarity."
  },
  {
    icon: Code,
    title: "Programmable Transactions",
    description: "Utilize the Ethereum Virtual Machine to create smart contracts for automated payments or decentralized applications, all backed by Parallax’s fixed 21M coin supply and Bitcoin-like halving cycles."
  },
]

export default function ParallaxForBusinesses() {
  return (
    <>
      <PageHeader
        title="Parallax for Businesses"
        subTitle="Parallax is a very secure and inexpensive way to handle payments."
      />
      <GridView
        items={topics}
      />
    </>
  )
}

