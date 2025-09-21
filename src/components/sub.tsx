import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight, LucideDownload } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function Sub() {
  return (
    <section className="relative overflow-visible">
      {/* Description */}
      <div className="relative -mt-20 mx-auto max-w-7xl px-6 py-16 lg:px-8 overflow-visible">
        <div className="mx-auto max-w-4xl text-center overflow-visible">
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto text-pretty">
            Parallax is a timechain protocol that unites Bitcoin's immutability and monetary discipline with Ethereum's
            programmability. Operating under Bitcoin's fixed rules with a capped 21 million supply, Parallax extends
            these foundations with the Ethereum Virtual Machine.
          </p>

          {/* Key Stats */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">21M</div>
              <div className="text-sm text-blue-400">Fixed Supply Cap</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10min</div>
              <div className="text-sm text-blue-400">Block Interval</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0%</div>
              <div className="text-sm text-blue-400">Premine</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
            >
              <Link to="/whitepaper">
                Read Whitepaper
                <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <a href="https://github.com/microstack-tech/parallax/releases" target="_blank">
                <LucideDownload />
                Download Parallax Client
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex justify-center gap-6">
            <Link to="https://x.com/prlxchain" target="_blank" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <FaXTwitter className="h-6 w-6" strokeWidth={1} />
            </Link>
            <Link to="https://github.com/microstack-tech" target="_blank" className="text-muted-foreground hover:text-blue-400 transition-colors">
              <FaGithub className="h-6 w-6" strokeWidth={1} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
