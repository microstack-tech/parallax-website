import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const wallets = [
  {
    name: "MetaMask",
    image: "/wallets/metamask.png",
    url: "https://metamask.io",
  },
  {
    name: "Coinbase Wallet",
    image: "/wallets/base.png",
    url: "https://wallet.coinbase.com",
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
    name: "Trust Wallet",
    image: "/wallets/trust.png",
    url: "https://trustwallet.com",
  },
  {
    name: "CTRL Wallet",
    image: "/wallets/ctrl.png",
    url: "https://ctrl.xyz",
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
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Run your own Parallax client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-base text-center">
              For optimal privacy we recommend that you run your own Parallax client for wallet interactions.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="default" asChild>
                <Link href="/resources/parallax-client">
                  <Download className="mr-2 h-5 w-5" />
                  Download Parallax Client
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="https://docs.parallaxchain.org/guides/client/introduction" target="_blank" rel="noopener">
                  Setup Guide
                  <ExternalLink />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
          {wallets.map((wallet) => (
            <Card key={wallet.name}>
              <CardHeader>
                <CardTitle className="text-center">{wallet.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Image src={wallet.image} alt={wallet.name} width={200} height={200} className=" rounded-2xl" />
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
        <Card>
          <CardHeader>
            <CardTitle className="text-center w-full">Add Parallax to your wallet</CardTitle>
          </CardHeader>
          <CardDescription className="text-center text-sm">Make sure to add Parallax as a custom network on wallets that support EVM-based chains. </CardDescription>
          <CardContent className="flex flex-col items-center">
            <div className="flex flex-col gap-4 w-full max-w-xl">
              <div className="flex flex-row justify-between py-2 border-b">
                <label className="">
                  Network Name
                </label>
                <label className="text-muted-foreground">
                  Parallax
                </label>
              </div>
              <div className="flex flex-row justify-between py-2 border-b">
                <label className="">
                  RPC URL
                </label>
                <div className="flex flex-col gap-2 text-right">
                  <label className="text-muted-foreground">
                    https://rpc.parallaxchain.org
                  </label>
                </div>
              </div>
              <div className="flex flex-row justify-between py-2 border-b">
                <label className="">
                  Chain ID
                </label>
                <label className="text-muted-foreground">
                  2110
                </label>
              </div>
              <div className="flex flex-row justify-between py-2 border-b">
                <label className="">
                  Symbol
                </label>
                <label className="text-muted-foreground">
                  LAX
                </label>
              </div>
              <div className="flex flex-row justify-between py-2 border-b">
                <label className="">
                  Explorer URL
                </label>
                <label className="text-muted-foreground">
                  https://explorer.parallaxchain.org
                </label>
              </div>
              <Button asChild>
                <Link href={"https://docs.parallaxchain.org/guides/wallets/metamask"} target="_blank">
                  Guide on MetaMask setup
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
