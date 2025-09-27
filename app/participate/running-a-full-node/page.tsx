import PageHeader from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, ShieldCheck, Download, Info, ArrowRight } from "lucide-react";
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
    <main>
      <PageHeader
        title="Running a Full Node"
        subTitle="Help secure Parallax and participate in the network by running your own node."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {nodeTopics.map((topic) => (
            <Card key={topic.title} className="border-border py-10 flex flex-col">
              <CardHeader className="flex flex-col justify-center items-center gap-8">
                <topic.icon className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-lg text-center mb-2">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center mb-2">{topic.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border py-10 flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl text-center mb-2">Get started</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base text-center">
              Ready to run a full node? Download the Parallax Client and follow our step-by-step guide.
            </CardDescription>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="default" size="lg" asChild>
                <Link href="https://github.com/microstack-tech/parallax/releases/latest" target="_blank" rel="noopener">
                  <Download className="mr-2 h-5 w-5" />
                  Download Parallax Client
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://parallax-4.gitbook.io/parallax-docs/parallax-client/getting-started/installing-the-parallax-client" target="_blank" rel="noopener">
                  Setup Guide
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
