import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Info, Server, ShieldCheck } from "lucide-react";
import Link from "next/link";

const nodeTopics = [
  {
    icon: Server,
    title: "What is a Full Node?",
    description: "A full node independently verifies all transactions and blocks, helping secure the Parallax network and maintain decentralization."
  },
  {
    icon: ShieldCheck,
    title: "Why Run a Node?",
    description: "Running a node gives you direct access to the network, improves privacy, and strengthens Parallax against censorship and attacks."
  },
  {
    icon: Download,
    title: "Get the Parallax Client",
    description: "Download the official Parallax Client for Linux, Windows, or macOS. Follow the instructions to install and start your node."
  },
  {
    icon: Info,
    title: "Need Help?",
    description: "Find setup guides, troubleshooting tips, and community support in our documentation and Discord."
  }
];

export default function RunningFullNodePage() {
  return (
    <MainMotion>
      <PageHeader
        title="Running a Full Node"
        subTitle="Help secure Parallax and participate in the network by running your own node."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {nodeTopics.map((topic) => (
            <Card key={topic.title}>
              <CardHeader>
                <topic.icon className="size-6 text-gold" />
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {topic.description}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center">
          <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">Get started</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Ready to run a full node? Download the Parallax Client and follow our step-by-step guide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90" asChild>
              <Link href="/resources/parallax-client">
                <Download className="mr-2 h-5 w-5" />
                Download Parallax Client
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="https://docs.parallaxprotocol.org/guides/client/setup" target="_blank" rel="noopener">
                Setup Guide
                <ExternalLink />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </MainMotion>
  );
}
