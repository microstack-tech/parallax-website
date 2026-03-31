import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Blocks, ExternalLink, Layers, Server, SquareTerminal } from "lucide-react";
import Link from "next/link";

const docs = [
  {
    icon: Blocks,
    title: "Foundational Topics",
    description: "Explore the core building blocks of Parallax: an introduction to the protocol and LAX, the basics of dapps, the shift from Web2 to Web3, and the mechanics of blocks, transactions, and accounts. Learn how the Parallax Virtual Machine works, how gas and fees are calculated, the role of nodes and clients, and the consensus mechanisms that secure the network.",
    href: "https://docs.parallaxprotocol.org/parallax-protocol/foundational-topics/introduction-to-parallax",
  },
  {
    icon: SquareTerminal,
    title: "Parallax Stack",
    description: "Dive into the Parallax developer stack: learn how smart contracts are built and deployed, explore development networks and frameworks, interact with Parallax client APIs, and manage storage. This section also covers IDE setup and best practices to help you build, test, and scale dapps on Parallax.",
    href: "https://docs.parallaxprotocol.org/parallax-protocol/parallax-stack/introduction-stack",
  },
  {
    icon: Layers,
    title: "Advanced",
    description: "Go beyond the basics with in-depth technical topics: cross-chain bridges, standards that guide interoperability, oracle integrations, the networking layer that powers peer-to-peer communication, and the core data structures and encoding formats that define how information flows through Parallax.",
    href: "https://docs.parallaxprotocol.org/parallax-protocol/advanced/bridges",
  },
  {
    icon: Server,
    title: "Parallax Client",
    description: "Learn how to run, configure, and interact with the Parallax client. This section covers getting started, core fundamentals, developer tools, monitoring, and FAQs — everything you need to operate a secure and reliable Parallax node.",
    href: "https://docs.parallaxprotocol.org/parallax-client/getting-started/introduction",
  },
]

export default function TechnicalDocumentationPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Technical Documentation"
        subTitle="Explore the Parallax protocol, architecture, APIs, and developer guides."
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        {docs.map((doc) => (
          <Link
            key={doc.title}
            href={doc.href}
            target="_blank"
            rel="noopener"
            className="group block h-full"
          >
            <Card className="h-full transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)]">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <doc.icon className="size-6 text-gold" />
                  <CardTitle>{doc.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <div>{doc.description}</div>
                <div className="flex items-center gap-2 mt-6 text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground group-hover:text-gold transition-colors">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </MainMotion>
  );
}
