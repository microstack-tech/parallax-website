'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaBitcoin, FaDiscord, FaGithub, FaReddit, FaTelegram, FaXTwitter } from "react-icons/fa6"
import { FadeIn } from "./fade-in"

const channels = [
  { name: "GitHub", href: "https://github.com/ParallaxProtocol", icon: FaGithub },
  { name: "BitcoinTalk", href: "https://bitcointalk.org/index.php?topic=5560698", icon: FaBitcoin },
  { name: "X / Twitter", href: "https://x.com/prlxchain", icon: FaXTwitter },
  { name: "Discord", href: "https://discord.gg/4Z4R3aAU3B", icon: FaDiscord },
  { name: "Telegram", href: "https://t.me/parallaxchain", icon: FaTelegram },
  { name: "Reddit", href: "https://reddit.com/r/parallaxprotocol", icon: FaReddit },
]

export function Community() {
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Community</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">Open Development</h2>
          </div>
        </FadeIn>

        {/* Two-column prose */}
        <FadeIn delay={0.1}>
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="pr-0 sm:pr-10 sm:border-r border-border pb-8 sm:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <FaGithub className="size-5 text-gold" />
                <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">Open Source</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {`All code is open source and available on GitHub. Review, audit, and contribute to the protocol's development. Transparency is not optimism — it is resilience.`}
              </p>
            </div>
            <div className="pl-0 sm:pl-10 pt-8 sm:pt-0 border-t sm:border-t-0 border-border">
              <div className="flex items-center gap-3 mb-4">
                <FaBitcoin className="size-5 text-gold" />
                <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">Community Driven</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Parallax has no foundation, no governing body, and no privileged contributors.
                Development happens in the open. The protocol&apos;s rules do not change by
                popular demand.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Community CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-16 bg-surface-elevated border border-border rounded-sm p-8 sm:p-12 text-center">
            <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">Join the Community</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Connect with users, developers, miners and pool operators. Get support, share ideas, and stay updated.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {channels.map((channel) => (
                <Button key={channel.name} variant="secondary" asChild>
                  <Link href={channel.href} target="_blank" rel="noopener">
                    <channel.icon className="size-4" />
                    {channel.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
