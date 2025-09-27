import PageHeader from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Info, ShieldCheck, TerminalSquare } from "lucide-react";
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
    <main>
      <PageHeader
        title="Parallax Client"
        subTitle="Download and run the official Parallax node software. Help secure the network and participate in consensus."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <Card className="border-border py-10 flex flex-col">
            <CardHeader className="flex flex-col justify-center items-center gap-8">
              <CardTitle className="text-xl text-center">
                Decentralized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-center mb-2">
                It is these users who keep Parallax decentralized. They individually run their own Parallax full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-border py-10 flex flex-col">
            <CardHeader className="flex flex-col justify-center items-center gap-8">
              <CardTitle className="text-xl text-center">
                No voting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-center mb-2">
                {`There's no voting or other corruptible process involved: there's just individual software following identical rules—"math"—to evaluate identical blocks and coming to identical conclusions about which block chain is valid.`}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <Card className="border-0 bg-background py-10 flex flex-col">
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              {`This shared agreement (called consensus) allows people like you to only accept valid laxes, enforcing Parallax's rules against even the most powerful miners.`}
            </CardDescription>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {clientFeatures.map((feature) => (
            <Card key={feature.title} className="border-border py-10 flex flex-col">
              <CardHeader className="flex flex-col justify-center items-center gap-8">
                <feature.icon className="h-8 w-8 text-primary" strokeWidth={1} />
                <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center mb-2">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border py-10 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl text-center mb-2">Download Parallax Client</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              The Parallax Client is available for Linux, Windows, and macOS. Download the latest release below or visit our GitHub for source code and instructions.
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="default" size="lg" asChild>
                <Link href="https://github.com/microstack-tech/parallax/releases/latest" target="_blank" rel="noopener">
                  <Download className="mr-2 h-5 w-5" />
                  Download Latest Release
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://github.com/microstack-tech/parallax" target="_blank" rel="noopener">
                  <FaGithub />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
