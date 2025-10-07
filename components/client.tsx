import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function Client() {
  return (
    <>
      <section className="relative py-24 bg-[#18181A] z-10 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl w-fit pt-0">
          <div className="mx-auto w-full text-center">
            <h2 className="text-3xl text-foreground sm:text-4xl">The Parallax Client</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              Download and run the reference Parallax node software. Help secure the network and participate in consensus.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 mt-24 justify-center">
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
          <Card className="my-8 border-0 bg-transparent py-8 flex flex-col">
            <CardContent>
              <CardDescription className="text-base text-center mb-4">
                {`This shared agreement (called consensus) allows people like you to only accept valid transactions, enforcing Parallax's rules against even the most powerful miners.`}
              </CardDescription>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {clientFeatures.map((feature) => (
              <Card key={feature.title} className="border-border py-10 flex flex-col">
                <CardHeader className="flex flex-col justify-center items-center gap-8">
                  <feature.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center mb-2">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-24 border-border rounded-none bg-transparent py-10 flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-center mb-2">Download the Parallax Client</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-center mb-4">
                The Parallax Client is available for Linux, Windows, and macOS. Download the latest release below or visit our GitHub for source code and instructions.
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
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
        </div>
      </section>
    </>
  );
}
