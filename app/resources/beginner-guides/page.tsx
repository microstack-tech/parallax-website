import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Pickaxe, SquareTerminal, Wallet } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    icon: SquareTerminal,
    title: "Run a Parallax node",
    description: "Step-by-step guides on downloading and running the Parallax client on your machine. Learn how to connect MetaMask to your local node so you can create addresses, manage your laxes, and interact with the network directly.",
    href: "https://docs.parallaxprotocol.org/guides/client/introduction",
  },
  {
    icon: Wallet,
    title: "Wallets",
    description: "Learn how to set up and use wallets on Parallax. These guides cover creating and managing accounts, connecting MetaMask, sending and receiving Laxes, verifying transactions, and keeping your wallet safe.",
    href: "https://docs.parallaxprotocol.org/guides/wallets",
  },
  {
    icon: Pickaxe,
    title: "Mining",
    description: "Learn how to mine laxes with our beginner guides. Get started with the built-in CPU miner, set up GPU mining with ethminer, and join a mining pool to combine your hashpower with others for more consistent rewards.",
    href: "https://docs.parallaxprotocol.org/guides/mining/introduction",
  },
]

export default function BeginnerGuidesPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Beginner Guides"
        subTitle="Explore the user-friendly guides on how to run a Parallax node, connect wallets, and start mining."
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        {guides.map((guide) => (
          <Link
            key={guide.title}
            href={guide.href}
            target="_blank"
            rel="noopener"
            className="group block h-full"
          >
            <Card className="h-full transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)]">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <guide.icon className="size-6 text-gold" />
                  <CardTitle>{guide.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div>{guide.description}</div>
                <div className="flex items-center gap-2 mt-6 text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground group-hover:text-gold transition-colors">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </MainMotion>
  );
}
