'use client'
import { Button } from "@/components/ui/button";
import { BookOpen, Hexagon, CircleSlash } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FadeIn } from "./fade-in";
import ClientDownloadButton from "./client-download-button";

export default function Client() {
  return (
    <section className="relative py-24 z-10 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Software</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">The Parallax Client</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              Download and run the reference Parallax node software. Help secure the network and participate in consensus.
            </p>
          </div>
        </FadeIn>

        {/* Two concept columns */}
        <FadeIn delay={0.1}>
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="pr-0 sm:pr-10 sm:border-r border-border pb-8 sm:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <Hexagon className="size-5 text-gold" />
                <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">Decentralized</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Users running a node are the ones keeping Parallax decentralized. They individually run their own Parallax full nodes, and each of those full nodes separately follows the exact same rules to decide which block chain is valid.
              </p>
              <Link
                href="/resources/network-atlas"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                See the live node map
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="pl-0 sm:pl-10 pt-8 sm:pt-0 border-t sm:border-t-0 border-border">
              <div className="flex items-center gap-3 mb-4">
                <CircleSlash className="size-5 text-gold" />
                <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">No Voting</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {`There's no voting or other corruptible process involved: there's just individual software following identical rules—"math"—to evaluate identical blocks and coming to identical conclusions about which block chain is valid.`}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Blockquote */}
        <FadeIn delay={0.15}>
          <blockquote className="my-16 border-l-2 border-gold pl-8 py-2">
            <p className="text-lg italic text-muted-foreground leading-relaxed">
              {`This shared agreement (called consensus) allows people like you to only accept valid transactions, enforcing Parallax's rules against even the most powerful miners.`}
            </p>
          </blockquote>
        </FadeIn>

        {/* Download CTA banner */}
        <FadeIn delay={0.2}>
          <div className="bg-surface-elevated border border-border rounded-sm p-8 sm:p-12 text-center">
            <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">Download the Parallax Client</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Available for Linux, Windows, and macOS. Download the latest release or visit GitHub for source code and instructions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ClientDownloadButton />
              <Button variant="secondary" asChild>
                <Link href="https://docs.parallaxprotocol.org/guides/client/setup" target="_blank" rel="noopener">
                  <BookOpen />
                  Setup guide
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="https://github.com/ParallaxProtocol/parallax" target="_blank" rel="noopener">
                  <FaGithub />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
