import Image from 'next/image'
import Link from 'next/link'

const footerLinks = {
  Protocol: [
    { name: "Doctrine", href: "/introduction/doctrine" },
    { name: "Whitepaper", href: "/introduction/whitepaper" },
    { name: "How It Works", href: "/introduction/how-it-works" },
    { name: "Getting Started", href: "/introduction/getting-started" },
    { name: "Protocol Overview", href: "/introduction/protocol/overview" },
    { name: "vs Bitcoin & Ethereum", href: "/compare" },
  ],
  Resources: [
    { name: "Documentation", href: "https://docs.parallaxprotocol.org", external: true },
    { name: "Beginner Guides", href: "/resources/beginner-guides" },
    { name: "Block Explorer", href: "https://explorer.parallaxprotocol.org", external: true },
    { name: "Parallax Client", href: "/resources/parallax-client" },
    { name: "Network Atlas", href: "/resources/network-atlas" },
    { name: "Wallets", href: "/wallets" },
    { name: "Brand Assets", href: "/resources/branding" },
  ],
  Community: [
    { name: "GitHub", href: "https://github.com/ParallaxProtocol", external: true },
    { name: "BitcoinTalk", href: "https://bitcointalk.org/index.php?topic=5560698", external: true },
    { name: "X / Twitter", href: "https://x.com/prlxchain", external: true },
    { name: "Discord", href: "https://discord.gg/4Z4R3aAU3B", external: true },
    { name: "Telegram", href: "https://t.me/parallaxchain", external: true },
  ],
}

export function Footer() {
  return (
    <footer className="relative w-full">
      {/* Top divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/new_parallax_logo_square.svg"
                className="h-10 w-auto dark:hidden"
                alt="Parallax logo"
                width={200}
                height={200}
              />
              <Image
                src="/new_parallax_logo_square_white.svg"
                className="h-10 w-auto hidden dark:block"
                alt="Parallax logo"
                width={200}
                height={200}
              />
              <span className="text-lg font-semibold font-sans text-foreground">
                Parallax
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              A peer-to-peer programmable cash system. Secured by physics, governed by no one.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      target={'external' in link && link.external ? "_blank" : undefined}
                      rel={'external' in link && link.external ? "noopener" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © Parallax Protocol 2026
            </p>
            <p className="text-sm text-muted-foreground">
              Released under{" "}
              <Link
                href="https://www.gnu.org/licenses/lgpl-3.0.html"
                target="_blank"
                rel="noopener"
                className="hover:text-foreground transition-colors underline underline-offset-4"
              >
                LGPL-3.0
              </Link>{" "}
              license.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
