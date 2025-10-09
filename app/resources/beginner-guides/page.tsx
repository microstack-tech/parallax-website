import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ExternalLink, Pickaxe, SquareTerminal, Wallet } from "lucide-react";
import Link from "next/link";

export default function BeginnerGuidesPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Beginner Guides"
        subTitle="Explore the user-friendly guides on how to run a Parallax node, connect wallets, and start mining."
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8 xl:px-0">

        {/* Node guide */}
        <Card className="border-border py-12 px-4 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <SquareTerminal className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Run a Parallax node</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Step-by-step guides on downloading and running the Parallax client on your machine.
              <br />
              <br />
              Learn how to connect MetaMask to your local node so you can create addresses,
              manage your laxes, and interact with the network directly.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link
                href="https://docs.parallaxchain.org/guides/client/introduction"
                target="_blank"
                rel="noopener"
              >
                View setup guide
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Wallet guides */}
        <Card className="border-border py-10 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <Wallet className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Learn how to set up and use wallets on Parallax.
              <br />
              <br />
              These guides cover creating and managing accounts, connecting MetaMask,
              sending and receiving Laxes, verifying transactions,
              and keeping your wallet safe.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link
                href="https://docs.parallaxchain.org/guides/wallets"
                target="_blank"
                rel="noopener"
              >
                View wallet guides
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Mining guides */}
        <Card className="border-border py-10 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <Pickaxe className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Mining</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Learn how to mine laxes with our beginner guides.
              <br />
              <br />
              Get started with the built-in CPU miner, set up GPU mining with ethminer,
              and join a mining pool to combine your hashpower with others for more consistent rewards.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link
                href="https://docs.parallaxchain.org/guides/mining/introduction"
                target="_blank"
                rel="noopener"
              >
                View mining guides
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </Card>

      </section>
    </MainMotion>
  );
}
