import { Button } from "./ui/button";
import { ArrowRight, LucideDownload } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Sub() {
  return (
    <section className="relative overflow-visible">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
      {/* Description */}
      <div className="relative -mt-0 mx-auto max-w-7xl px-6 py-4 lg:px-8 overflow-visible">
        <div className="mx-auto max-w-4xl text-center overflow-visible">
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto text-pretty">
            {`Parallax is a timechain protocol that unites Bitcoin's immutability and monetary discipline with Ethereum's
            programmability. Operating under Bitcoin's fixed rules with a capped 21 million supply, Parallax extends
            these foundations with the Ethereum Virtual Machine.`}
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
            >
              <Link href="/whitepaper">
                Read Whitepaper
                <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="https://github.com/microstack-tech/parallax/releases" target="_blank">
                <LucideDownload />
                Download Parallax Client
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-6">
            <Link href="https://x.com/prlxchain" target="_blank" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <FaXTwitter className="h-6 w-6" strokeWidth={1} />
            </Link>
            <Link href="https://github.com/microstack-tech" target="_blank" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <FaGithub className="h-6 w-6" strokeWidth={1} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
