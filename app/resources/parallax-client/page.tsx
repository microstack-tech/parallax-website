import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <Card>
            <CardHeader>
              <Hexagon className="size-6" />
              <CardTitle>Decentralized</CardTitle>
            </CardHeader>
            <CardContent>
              It is these users who keep Parallax decentralized. They individually run their own Parallax full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CircleSlash className="size-6" />
              <CardTitle>No voting</CardTitle>
            </CardHeader>
            <CardContent>
              {`There's no voting or other corruptible process involved: there's just individual software following identical rules—"math"—to evaluate identical blocks and coming to identical conclusions about which block chain is valid.`}
            </CardContent>
          </Card>
        </div>
        <div className="px-2 py-16 text-center text-muted-foreground">
          {`This shared agreement (called consensus) allows people like you to only accept valid transactions, enforcing Parallax's rules against even the most powerful miners.`}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {clientFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="size-6" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center w-full">Download Parallax Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              The Parallax Client is available for Linux, Windows, and macOS. Download the latest release below or visit our GitHub for source code and instructions.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild>
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
          </CardContent>
        </Card>
      </section>
    </MainMotion>
  );
}
