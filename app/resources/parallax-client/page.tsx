import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleSlash, Download, ExternalLink, Hexagon, Info, ShieldCheck, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const clientFeatures = [
  {
    icon: ShieldCheck,
    title: "Security & Privacy",
    description: "The Parallax Client is designed for robust security and privacy, using cryptographic signatures and decentralized consensus."
  },
  {
    icon: TerminalSquare,
    title: "Full Node",
    description: "Run a full node to validate transactions, mine blocks, and help secure the Parallax network."
  },
  {
    icon: Info,
    title: "Open Source",
    description: "The client is fully open source. Review, audit, and contribute to the codebase on GitHub."
  }
];

export default function ParallaxClientPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Parallax Client"
        subTitle="Download and run the official Parallax node software. Help secure the network and participate in consensus."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          <div className="pr-0 sm:pr-10 sm:border-r border-border pb-8 sm:pb-0">
            <div className="flex items-center gap-3 mb-4">
              <Hexagon className="size-5 text-gold" />
              <h3 className="text-lg font-semibold text-foreground">Decentralized</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              It is these users who keep Parallax decentralized. They individually run their own Parallax full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.
            </p>
          </div>
          <div className="pl-0 sm:pl-10 pt-8 sm:pt-0 border-t sm:border-t-0 border-border">
            <div className="flex items-center gap-3 mb-4">
              <CircleSlash className="size-5 text-gold" />
              <h3 className="text-lg font-semibold text-foreground">No voting</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {`There's no voting or other corruptible process involved: there's just individual software following identical rules—"math"—to evaluate identical blocks and coming to identical conclusions about which block chain is valid.`}
            </p>
          </div>
        </div>

        <blockquote className="my-16 border-l-2 border-gold pl-8 py-2">
          <p className="text-lg italic text-muted-foreground leading-relaxed">
            {`This shared agreement (called consensus) allows people like you to only accept valid transactions, enforcing Parallax's rules against even the most powerful miners.`}
          </p>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {clientFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="size-6 text-gold" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-3">Download Parallax Client</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            The Parallax Client is available for Linux, Windows, and macOS. Download the latest release below or visit our GitHub for source code and instructions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90" asChild>
              <Link href="https://github.com/ParallaxProtocol/parallax/releases/latest" target="_blank" rel="noopener">
                <Download className="mr-2 h-5 w-5" />
                Download Latest Release
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="https://docs.parallaxprotocol.org/guides/client/setup" target="_blank" rel="noopener">
                Setup guide
                <ExternalLink />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="https://github.com/ParallaxProtocol/parallax" target="_blank" rel="noopener">
                <FaGithub />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainMotion>
  );
}
