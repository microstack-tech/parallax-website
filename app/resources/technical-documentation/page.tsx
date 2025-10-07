import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Blocks, Layers, Server, SquareTerminal } from "lucide-react";
import Link from "next/link";

export default function TechnicalDocumentationPage() {
  return (
    <main>
      <PageHeader
        title="Technical Documentation"
        subTitle="Explore the Parallax protocol, architecture, APIs, and developer guides."
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8">
        <Card className="border-border py-12 px-4 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <Blocks className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Foundational Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Explore the core building blocks of Parallax: an introduction to the protocol and LAX,
              the basics of dapps, the shift from Web2 to Web3, and the mechanics of blocks,
              transactions, and accounts.<br /><br /> Learn how the Parallax Virtual Machine works, how gas and fees
              are calculated, the role of nodes and clients, and the consensus mechanisms that secure
              the network.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link href="https://docs.parallaxchain.org/parallax-protocol/foundational-topics/introduction-to-parallax" target="_blank" rel="noopener">
                More on Foundational Topics
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Card>
        <Card className="border-border py-10 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <SquareTerminal className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Parallax Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Dive into the Parallax developer stack: learn how smart contracts are built and deployed,
              explore development networks and frameworks, interact with Parallax client APIs,
              and manage storage. <br /> <br />This section also covers IDE setup and best practices to help
              you build, test, and scale dapps on Parallax.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link href="https://docs.parallaxchain.org/parallax-protocol/parallax-stack/introduction-stack" target="_blank" rel="noopener">
                More on Parallax Stack
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="border-border py-10 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <Layers className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Advanced</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Go beyond the basics with in-depth technical topics: cross-chain bridges,
              standards that guide interoperability, oracle integrations,
              the networking layer that powers peer-to-peer communication,
              and the core data structures and encoding formats that define
              how information flows through Parallax.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link href="https://docs.parallaxchain.org/parallax-protocol/advanced/bridges" target="_blank" rel="noopener">
                More on Advanced Topics
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="border-border py-10 flex flex-col items-center">
          <CardHeader className="inline-flex items-center w-full justify-center gap-4">
            <Server className="size-8 text-primary" strokeWidth={1.5} />
            <CardTitle className="text-xl text-center">Parallax Client</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center mb-4">
              Learn how to run, configure, and interact with the Parallax client.
              This section covers getting started, core fundamentals,
              developer tools, monitoring, and FAQs — everything you need
              to operate a secure and reliable Parallax node.
            </CardDescription>
          </CardContent>
          <div className="flex flex-col h-full justify-end">
            <Button size="xl" asChild>
              <Link href="https://docs.parallaxchain.org/parallax-client/getting-started/introduction" target="_blank" rel="noopener">
                More on Parallax Client
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}
