"use client";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ChevronRight, Gauge, Layers, Hash, Coins, Clock, BookOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const topics = [
    {
      icon: Layers,
      title: "Protocol Architecture",
      description:
        "How Parallax unifies cryptography, deterministic computation, proof-of-work timekeeping, and Nakamoto consensus into a cohesive protocol stack.",
      href: "/introduction/protocol/architecture",
    },
    {
      icon: Coins,
      title: "Block Reward & Halving",
      description:
        "Bitcoin-like issuance: 50 → 25 → 12.5 … every 210,000 blocks, asymptotically approaching 21M with clear visuals and parameters.",
      href: "/introduction/protocol/block-reward-and-halving",
    },
    {
      icon: Clock,
      title: "Coinbase Maturity Scheduling",
      description:
        "How miner subsidies are escrowed on-chain and released at a fixed maturity height via the lockbox state mechanism.",
      href: "/introduction/protocol/coinbase-maturity",
    },
    {
      icon: Gauge,
      title: "Difficulty Algorithm & Fork-choice",
      description:
        "Epoch-anchored difficulty retargeting and cumulative-work fork selection, including Median-Time-Past checks and epoch anchors.",
      href: "/introduction/protocol/difficulty-and-forkchoice",
    },
    {
      icon: Hash,
      title: "XHash (Proof-of-Work)",
      description:
        "Parallax’s memory-hard PoW based on Ethash-style Hashimoto with Parallax-specific seal hash, target mapping, and epoch/DAG handling.",
      href: "/introduction/protocol/xhash",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-0 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col gap-6"
      >
        <PageHeader
          title="Parallax Protocol"
          subTitle="This section explains the base rules of the Parallax protocol — cryptographic primitives, deterministic execution, proof-of-work (XHash), and the consensus logic that defines canonical history."
        />

        <Card>
          <CardHeader>
            <ChevronRight className="size-6" />
            <CardTitle>Purpose of this section</CardTitle>
          </CardHeader>
          <CardDescription className="text-sm text-muted-foreground pt-1">
            Parallax merges Bitcoin’s ossified monetary discipline with Ethereum-style
            programmability. These documents detail how Parallax maintains a fixed supply and
            predictable issuance while enforcing deterministic execution and open, work-based
            consensus.
          </CardDescription>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>
                <strong>Cryptographic Soundness:</strong> Transactions and state transitions are
                authorized with ECDSA (secp256k1).
              </li>
              <li>
                <strong>Deterministic Execution:</strong> PVM mirrors EVM semantics under
                Bitcoin-like constraints.
              </li>
              <li>
                <strong>Proof-of-Work as Time:</strong> XHash turns computation into a verifiable
                ordering of events.
              </li>
              <li>
                <strong>Consensus through Work:</strong> Canonical history is the valid chain with
                the greatest cumulative work.
              </li>
            </ul>
            <p className="inline-flex items-center mt-6 gap-2">
              <ChevronRight className="size-4" />
              These pages target developers, miners, and researchers seeking a precise understanding
              of Parallax at the protocol layer.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="border-muted-foreground/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <topic.icon className="h-5 w-5 min-w-fit min-h-fit" />
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                {topic.description}
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant={"secondary"} className="w-full sm:w-fit" asChild>
                    <Link href={topic.href}>
                      Read more <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center w-full mt-16">
        <Button size={"xl"} className="w-full sm:w-fit" asChild>
          <Link href={"https://docs.parallaxprotocol.org"}>
            Explore Technical Documentation <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
