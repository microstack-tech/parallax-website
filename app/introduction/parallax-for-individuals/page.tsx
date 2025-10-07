import GridView from "@/components/grid-view"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, DollarSign, Globe, Plane, Shield, Smartphone, User } from "lucide-react"
import Link from "next/link"

const topics = [
  {
    icon: Smartphone,
    title: "Mobile Payments Made Easy",
    description: "Parallax enables simple scan-and-pay transactions on mobile devices using QR codes or NFC, no signup or PINs required."
  },
  {
    icon: Shield,
    title: "Security and Control",
    description: "Cryptographic signatures and XHash proof-of-work secure your transactions, giving you full control over your money with proper wallet protection."
  },
  {
    icon: Globe,
    title: "Works Everywhere, Anytime",
    description: "Send and receive Parallax coins globally using just an address, with the network running 24/7, including weekends and holidays."
  },
  {
    icon: Plane,
    title: "Fast International Payments",
    description: "Transfer Parallax coins across borders instantly, without bank delays, extra fees, or amount restrictions."
  },
  {
    icon: DollarSign,
    title: "Choose Your Own Fees",
    description: "No fees to receive coins, and customizable fees when sending, with higher fees enabling faster confirmations regardless of amount."
  },
  {
    icon: User,
    title: "Protect Your Identity",
    description: "Transact without revealing personal details, similar to cash, with privacy protection measures for enhanced anonymity."
  },
  {
    icon: Code,
    title: "Programmable Money",
    description: "Leverage the Parallax Virtual Machine to create smart contracts and automate payments, backed by a fixed 21M coin supply and Bitcoin-like halving cycles."
  },
]

export default function ParallaxForIndividuals() {
  return (
    <>
      <PageHeader
        title="Parallax for Individuals"
        subTitle="Parallax is the easiest way to transact at a very low cost."
      />
      <GridView
        items={topics}
      />
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-4">
          <Button className="has-[>svg]:px-8 py-8 text-base" asChild>
            <Link href={'/introduction/getting-started'}>
              Get started with Parallax
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
