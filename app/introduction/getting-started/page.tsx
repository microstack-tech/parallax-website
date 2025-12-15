"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Building, ChevronRight, ExternalLink, Eye, HandCoins, Scale, Store, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function GettingStarted() {
  const [activeTab, setActiveTab] = useState<"use" | "accept">("use")

  return (
    <MainMotion>
      <PageHeader
        title="Getting Started with Parallax"
        subTitle=" Using Parallax to transact is easy and accessible to everyone. Experience Bitcoin's monetary policy with Ethereum's programmability. "
      />
      <section className="container mx-auto px-6 sm:px-8 xl:px-0 max-w-7xl py-0">
        {/* Navigation Tabs */}
        <div className="flex justify-center my-16">
          <div className="flex flex-col sm:flex-row gap-2 bg-muted border rounded-lg p-2">
            <Button
              size={"xl"}
              onClick={() => setActiveTab("use")}
              variant={activeTab === "use" ? "default" : "secondary"}
            >
              How to use Parallax
            </Button>
            <Button
              size={"xl"}
              onClick={() => setActiveTab("accept")}
              variant={activeTab === "accept" ? "default" : "secondary"}
            >
              How to accept Parallax
            </Button>
          </div>
        </div>

        {activeTab === "use" && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <BookOpen className="size-6" />
                  <CardTitle>1. Inform Yourself</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {`Parallax combines Bitcoin's proven monetary policy with Ethereum's smart contract capabilities. Before
                  you start using Parallax, learn about its unique features and security considerations.`}
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/introduction/protocol/overview"}>
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Wallet className="size-6" />
                  <CardTitle>2. Choose Your Wallet</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  Free Parallax wallets are available for all major operating systems and devices. Choose from mobile
                  apps for everyday use or desktop wallets for advanced features.
                </div>
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/wallets"}>
                      Choose a Wallet <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HandCoins className="size-6" />
                  <CardTitle>3. Get Parallax</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  You can get Parallax by accepting it as payment, mining it, or purchasing it from exchanges. Multiple
                  options are available to suit your needs.
                </div>
                <div className="flex flex-col md:flex-row w-full justify-end mt-8 gap-4">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"https://docs.parallaxprotocol.org/guides/mining"} target="_blank">
                      Mining <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/exchanges"}>
                      Exchanges
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Store className="size-6" />
                  <CardTitle>4. Spend Parallax</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  A growing number of services and merchants are accepting Parallax worldwide. Use smart contracts for
                  automated payments and complex transactions.
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" disabled className="w-full sm:w-fit">
                    Merchant Directory Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "accept" && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="size-6" />
                  <CardTitle>1. Inform Yourself</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {`Parallax doesn't require merchants to change their habits significantly. However, understanding its
                  unique features will help you leverage its full potential for your business.`}
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/introduction/protocol/overview"}>
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="size-6" />
                  <CardTitle>2. Processing Payments</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  Set up Parallax payment processing for your business. Benefit from low fees, fast transactions, and
                  programmable payment logic.
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" disabled className="w-full sm:w-fit">
                    Payments Guide Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Scale className="size-6" />
                  <CardTitle>3. Accounting & Taxes</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  Understand the accounting and tax implications of accepting Parallax. Access tools and resources for
                  proper financial management.
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"https://en.bitcoin.it/wiki/Tax_compliance"} target="_blank">
                      Tax Resources <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="size-6" />
                  <CardTitle>4. Gain Visibility</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  Promote your business in the Parallax ecosystem. Join directories and communities to reach Parallax
                  users worldwide.
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" disabled className="w-full sm:w-fit">
                    Merchant Directory Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center w-full">Ready to Start?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base text-center">
              Join the Parallax network and experience the future of blockchain technology. Combine the security of
              Bitcoin with the flexibility of smart contracts.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild>
                <Link href={"/wallets"}>
                  Choose a Wallet
                  <ChevronRight />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href={"https://docs.parallaxprotocol.org/guides/wallets"} target="_blank">
                  Wallet Setup Guide
                  <ExternalLink />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </MainMotion>
  )
}
