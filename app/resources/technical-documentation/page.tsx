import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Blocks, ExternalLink, Layers, Server, SquareTerminal } from "lucide-react";
import Link from "next/link";

export default function TechnicalDocumentationPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Technical Documentation"
        subTitle="Explore the Parallax protocol, architecture, APIs, and developer guides."
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <Card>
          <CardHeader>
            <Blocks className="size-6" />
            <CardTitle>Foundational Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Explore the core building blocks of Parallax: an introduction to the protocol and LAX,
              the basics of dapps, the shift from Web2 to Web3, and the mechanics of blocks,
              transactions, and accounts.<br /><br /> Learn how the Parallax Virtual Machine works, how gas and fees
              are calculated, the role of nodes and clients, and the consensus mechanisms that secure
              the network.
            </div>
            <div className="inline-flex w-full justify-end mt-8">
              <Button variant={"secondary"} className="w-full sm:w-fit" asChild>
                <Link href="https://docs.parallaxprotocol.org/parallax-protocol/foundational-topics/introduction-to-parallax" target="_blank" rel="noopener">
                  More on Foundational Topics
                  <ExternalLink />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <SquareTerminal className="size-6" />
            <CardTitle>Parallax Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Dive into the Parallax developer stack: learn how smart contracts are built and deployed,
              explore development networks and frameworks, interact with Parallax client APIs,
              and manage storage. <br /> <br />This section also covers IDE setup and best practices to help
              you build, test, and scale dapps on Parallax.
            </div>
            <div className="inline-flex w-full justify-end mt-8">
              <Button variant={"secondary"} className="w-full sm:w-fit" asChild>
                <Link href="https://docs.parallaxprotocol.org/parallax-protocol/parallax-stack/introduction-stack" target="_blank" rel="noopener">
                  More on Parallax Stack
                  <ExternalLink />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Layers />
            <CardTitle>Advanced</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Go beyond the basics with in-depth technical topics: cross-chain bridges,
              standards that guide interoperability, oracle integrations,
              the networking layer that powers peer-to-peer communication,
              and the core data structures and encoding formats that define
              how information flows through Parallax.
            </div>
            <div className="inline-flex w-full justify-end mt-8">
              <Button variant={"secondary"} className="w-full sm:w-fit" asChild>
                <Link href="https://docs.parallaxprotocol.org/parallax-protocol/advanced/bridges" target="_blank" rel="noopener">
                  More on Advanced Topics
                  <ExternalLink />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Server />
            <CardTitle>Parallax Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Learn how to run, configure, and interact with the Parallax client.
              This section covers getting started, core fundamentals,
              developer tools, monitoring, and FAQs — everything you need
              to operate a secure and reliable Parallax node.
            </div>
            <div className="inline-flex w-full justify-end mt-8">
              <Button variant={"secondary"} className="w-full sm:w-fit" asChild>
                <Link href="https://docs.parallaxprotocol.org/parallax-client/getting-started/introduction" target="_blank" rel="noopener">
                  More on Parallax Client
                  <ExternalLink />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </MainMotion>
  );
}
