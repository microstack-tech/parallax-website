import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CircleSlash, Download, ExternalLink, Hexagon, ShieldCheck, TerminalSquare } from "lucide-react";
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
    icon: FaGithub,
    title: "Open Source",
    description: "The client is fully open source. Review, audit, and contribute to the codebase on GitHub."
  }
];

export default function Client() {
  return (
    <>
      <section className="relative py-24 border-b z-10 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl w-fit pt-0">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="text-3xl text-foreground sm:text-4xl">The Parallax Client</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              Download and run the reference Parallax node software. Help secure the network and participate in consensus.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 mt-24 justify-center">
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Hexagon className="size-6" />
                  <CardTitle>Decentralized</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                Users running a node are the ones keepping Parallax decentralized. They individually run their own Parallax full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.
              </CardContent>
            </Card>
            <Card className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <CircleSlash className="size-6" />
                  <CardTitle>No Voting</CardTitle>
                </div>
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
              <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <feature.icon className="size-6" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg text-center">Download the Parallax Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                The Parallax Client is available for Linux, Windows, and macOS. Download the latest release below or visit our GitHub for source code and instructions.
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button variant="default" asChild>
                  <Link href="https://github.com/microstack-tech/parallax/releases/latest" target="_blank" rel="noopener">
                    <Download className="h-5 w-5" />
                    Download
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="https://docs.parallaxchain.org/guides/client/setup" target="_blank" rel="noopener">
                    <BookOpen />
                    Setup guide
                    <ExternalLink />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="https://github.com/microstack-tech/parallax" target="_blank" rel="noopener">
                    <FaGithub />
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
