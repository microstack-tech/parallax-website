import AddNetworkSection from "@/components/add-network-section";
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const wallets = [
  {
    name: "MetaMask",
    image: "/wallets/metamask.png",
    url: "https://metamask.io",
    recommended: true,
  },
  {
    name: "Coinbase Wallet",
    image: "/wallets/base.png",
    url: "https://wallet.coinbase.com",
    recommended: true,
  },
  {
    name: "Trust Wallet",
    image: "/wallets/trust.png",
    url: "https://trustwallet.com",
    recommended: true,
  },
  {
    name: "Rabby Wallet",
    image: "/wallets/rabby.png",
    url: "https://rabby.io",
  },
  {
    name: "Atomic Wallet",
    image: "/wallets/atomic.png",
    url: "https://atomicwallet.io",
  },
  {
    name: "CTRL Wallet",
    image: "/wallets/ctrl.png",
    url: "https://ctrl.xyz",
  },
  {
    name: "Brave Wallet",
    image: "/wallets/brave.png",
    url: "https://brave.com/wallet",
  },
  {
    name: "Phantom",
    image: "/wallets/phantom.png",
    url: "https://phantom.com",
  },
  {
    name: "Rainbow",
    image: "/wallets/rainbow.png",
    url: "https://rainbow.me",
  },
  {
    name: "Zerion",
    image: "/wallets/zerion.png",
    url: "https://zerion.io",
  },
  {
    name: "Frame",
    image: "/wallets/frame.png",
    url: "https://frame.sh",
  },
]
export default function Page() {
  return (
    <MainMotion>
      <PageHeader
        title="Wallets on Parallax"
        subTitle="Choose the right wallet to manage your Laxes, connect to dapps, and explore the Parallax ecosystem securely."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <AddNetworkSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {wallets.map((wallet) => (
            <Card key={wallet.name} className="group relative hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
              {"recommended" in wallet && wallet.recommended && (
                <Badge className="absolute top-3 right-3 bg-gold/15 text-gold border-gold/30 hover:bg-gold/20 text-[0.65rem] font-medium">
                  Beginner friendly
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-center">{wallet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Image src={wallet.image} alt={wallet.name} width={200} height={200} className="rounded-2xl" />
                </div>
                <div className="flex gap-4 justify-center">
                  <Button variant="secondary" className="text-base" asChild>
                    <Link href={wallet.url} target="_blank">
                      {`Get ${wallet.name}`}
                      <ChevronRight />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center">
          <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">Run your own Parallax client</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            For optimal privacy we recommend that you run your own Parallax client for wallet interactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90" asChild>
              <Link href="/resources/parallax-client">
                <Download className="mr-2 h-5 w-5" />
                Download Parallax Client
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="https://docs.parallaxprotocol.org/guides/client/introduction" target="_blank" rel="noopener">
                Setup Guide
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
