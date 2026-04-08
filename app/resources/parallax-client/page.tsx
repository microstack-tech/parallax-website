import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppWindow, CircleSlash, ExternalLink, Hexagon, Info, ShieldCheck, TerminalSquare } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import ClientDownloadButton from "@/components/client-download-button";
import ClientQuickStart from "@/components/client-quick-start";
import ClientReleases from "@/components/client-releases";

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
              <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">Decentralized</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              It is these users who keep Parallax decentralized. They individually run their own Parallax full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.
            </p>
          </div>
          <div className="pl-0 sm:pl-10 pt-8 sm:pt-0 border-t sm:border-t-0 border-border">
            <div className="flex items-center gap-3 mb-4">
              <CircleSlash className="size-5 text-gold" />
              <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">No voting</h3>
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

        <div className="border border-border">
          <div className="px-6 sm:px-12 pt-10 pb-8 text-center">
            <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">Download Parallax Client</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Two ways to run a Parallax full node — pick whichever fits how you work. Both connect to the same network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border">
            <div className="relative p-8 sm:p-12 border-b md:border-b-0 md:border-r border-border">
              <div className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-[0.15em] text-gold border border-gold/40 px-1.5 py-0.5">
                Recommended
              </div>
              <AppWindow className="size-6 text-gold mb-4" />
              <h4 className="text-base text-foreground mb-2">Desktop App</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                A graphical interface for running a full node. The easiest way to participate — install, launch, and watch the chain sync. No terminal required.
              </p>
              <ClientDownloadButton variant="gui" />
            </div>

            <div className="relative p-8 sm:p-12 bg-surface-elevated/40">
              <div className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground border border-border px-1.5 py-0.5">
                Advanced
              </div>
              <TerminalSquare className="size-6 text-foreground mb-4" />
              <h4 className="text-base text-foreground mb-2">Command-Line Client</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The terminal binary for developers, miners, and operators running headless servers. Configurable, scriptable, and ideal for automation.
              </p>
              <ClientDownloadButton variant="cli" prominent={false} />
            </div>
          </div>

          <div className="px-6 sm:px-12 py-6 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
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

        <ClientQuickStart />

        <ClientReleases />
      </section>
    </MainMotion>
  );
}
