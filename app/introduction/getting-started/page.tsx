"use client"

import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpen, Building, Download, Eye, HandCoins, Scale, Store, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"

export default function GettingStarted() {
  const [activeTab, setActiveTab] = useState<"use" | "accept">("use")

  return (
    <>
      <PageHeader
        title="Getting Started with Parallax"
        subTitle=" Using Parallax to transact is easy and accessible to everyone. Experience Bitcoin's monetary policy with Ethereum's programmability. "
      />
      <section className="container mx-auto px-6 sm:px-8 max-w-7xl py-16">
        <Card className="border-border py-10 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl text-center mb-2">Download the Parallax Client</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              The Parallax Client is available for Linux, Windows, and macOS. Download the latest release below or visit our GitHub for source code and instructions.
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
              <Button variant="default" size="xl" asChild>
                <Link href="https://github.com/microstack-tech/parallax/releases/latest" target="_blank" rel="noopener">
                  <Download className="mr-2 h-5 w-5" />
                  Download Latest Release
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="https://docs.parallaxchain.org/guides/client/setup" target="_blank" rel="noopener">
                  Setup guide
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="https://github.com/microstack-tech/parallax" target="_blank" rel="noopener">
                  <FaGithub />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Navigation Tabs */}
        <div className="flex justify-center my-24">
          <div className="flex gap-2 bg-background border rounded-lg p-2">
            <button
              onClick={() => setActiveTab("use")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${activeTab === "use"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground cursor-pointer hover:text-foreground"
                }`}
            >
              How to use Parallax
            </button>
            <button
              onClick={() => setActiveTab("accept")}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${activeTab === "accept"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground cursor-pointer hover:text-foreground"
                }`}
            >
              How to accept Parallax
            </button>
          </div>
        </div>

        {activeTab === "use" && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <BookOpen className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">1. Inform Yourself</CardTitle>
                </div>
                <CardDescription>
                  {`Parallax combines Bitcoin's proven monetary policy with Ethereum's smart contract capabilities. Before
                  you start using Parallax, learn about its unique features and security considerations.`}
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" asChild>
                <Link href={"https://docs.parallaxchain.org"} target="_blank">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <Wallet className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">2. Choose Your Wallet</CardTitle>
                </div>
                <CardDescription>
                  Free Parallax wallets are available for all major operating systems and devices. Choose from mobile
                  apps for everyday use or desktop wallets for advanced features.
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" asChild>
                <Link href={"/wallets"}>
                  Choose a Wallet <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <HandCoins className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">3. Get Parallax</CardTitle>
                </div>
                <CardDescription>
                  You can get Parallax by accepting it as payment, mining it, or purchasing it from exchanges. Multiple
                  options are available to suit your needs.
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" asChild>
                <Link href={"https://docs.parallaxchain.org/guides/mining"} target="_blank">
                  Mining <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" disabled>
                Exchanges List Coming Soon
              </Button>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <Store className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">4. Spend Parallax</CardTitle>
                </div>
                <CardDescription>
                  A growing number of services and merchants are accepting Parallax worldwide. Use smart contracts for
                  automated payments and complex transactions.
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" disabled>
                Merchant Directory Coming Soon
              </Button>
            </Card>
          </div>
        )}

        {activeTab === "accept" && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <BookOpen className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">1. Inform Yourself</CardTitle>
                </div>
                <CardDescription>
                  {`Parallax doesn't require merchants to change their habits significantly. However, understanding its
                  unique features will help you leverage its full potential for your business.`}
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" asChild>
                <Link href={"https://docs.parallaxchain.org"} target="_blank">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <Building className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">2. Processing Payments</CardTitle>
                </div>
                <CardDescription>
                  Set up Parallax payment processing for your business. Benefit from low fees, fast transactions, and
                  programmable payment logic.
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" disabled>
                Processing Payments Guide Coming Soon
              </Button>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <Scale className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">3. Accounting & Taxes</CardTitle>
                </div>
                <CardDescription>
                  Understand the accounting and tax implications of accepting Parallax. Access tools and resources for
                  proper financial management.
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" asChild>
                <Link href={"https://en.bitcoin.it/wiki/Tax_compliance"} target="_blank">
                  Tax Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2">
                    <Eye className="h-6 w-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-xl">4. Gain Visibility</CardTitle>
                </div>
                <CardDescription>
                  Promote your business in the Parallax ecosystem. Join directories and communities to reach Parallax
                  users worldwide.
                </CardDescription>
              </CardHeader>
              <Button variant="outline" size={"lg"} className="w-fit ml-6" disabled>
                Merchant Directory Coming Soon
              </Button>
            </Card>
          </div>
        )}

        <div className="text-center border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the Parallax network and experience the future of blockchain technology. Combine the security of
            Bitcoin with the flexibility of smart contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" asChild>
              <Link href={"/wallets"}>
                Choose a Wallet
                <ArrowRight />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href={"https://docs.parallaxchain.org/guides/wallets"} target="_blank">
                Wallet Setup Guide
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
