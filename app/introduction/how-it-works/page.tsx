
import GridView from "@/components/grid-view";
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { ChevronRight, Cpu, Database, ExternalLink, Key, Rabbit, Wallet } from "lucide-react";
import Link from "next/link";

const topics = [
  {
    icon: Wallet,
    title: "The Basics",
    description: "Start using Parallax by installing a wallet, generating addresses, and sending or receiving funds. It’s as simple as email!"
  },
  {
    icon: Database,
    title: "Balances & Blockchain",
    description: "All transactions are recorded on the Parallax blockchain. Wallets compute your spendable balance and cryptography keeps everything secure and transparent."
  },
  {
    icon: Key,
    title: "Transactions & Private Keys",
    description: "Transactions transfer value between wallets and are signed with your private key. This proves ownership and keeps your funds safe."
  },
  {
    icon: Cpu,
    title: "Processing & Mining",
    description: "Miners secure Parallax by packaging transactions into blocks and competing with XHash Proof-of-Work. This keeps the network fair and decentralized."
  },
  {
    icon: Rabbit,
    title: "Going Down the Rabbit Hole",
    description: "This page is just the surface. To dive deeper, check out the Parallax white paper, developer docs, and community resources."
  }
];

export default function ParallaxHowItWorks() {
  return (
    <MainMotion>
      <PageHeader
        title="How does Parallax work?"
        subTitle="This is a question often surrounded by confusion, so here's a quick explanation!"
      />
      <GridView items={topics} />
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-4 mb-8 px-6">
          <Button className="w-full sm:w-fit" asChild>
            <Link href={'/introduction/protocol/overview'}>
              Learn more about Parallax
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </MainMotion>
  );
}
