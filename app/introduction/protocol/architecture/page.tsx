"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Link2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const sections = useMemo(
    () => [
      {
        id: "digital-signatures",
        icon: Lock,
        title: "Digital Signatures",
        tagline: "Who can act: ECDSA over secp256k1 authenticates state transitions.",
        bullets: [
          "ECDSA over secp256k1 identical to Bitcoin for battle-tested security and tooling.",
          "Transactions include (r, s, v); sender recovered via public key → address derivation.",
          "Validation runs in the execution pipeline, ensuring uniform rules across nodes.",
          "Non-repudiation: signatures bind intents to keys; replay protection via chain id & nonce.",
        ],
        codeTitle: "Signature verification (conceptual)",
        code: `// Pseudocode: PVM-side validation sketch
verify(tx):
  msg = keccak256(encodeTxForSig(tx))
  pub = ecrecover(msg, tx.v, tx.r, tx.s)
  require(address(pub) == tx.from)
  require(tx.nonce == account.nonce)
  // gas accounting & state updates proceed
`,
      },
      {
        id: "pvm",
        icon: Cpu,
        title: "Turing-complete Scripting (PVM)",
        tagline:
          "What actions mean: Deterministic EVM-compatible execution under Bitcoin-like monetary rules.",
        bullets: [
          "Opcode parity with the EVM (CALL/SSTORE/etc.), gas-metered deterministic execution.",
          "State stored in Merkle Patricia Trie; block header commits to stateRoot & receiptsRoot.",
          "Programmability within scarcity: 21M cap, halving ⇒ execution inherits hard money.",
          "Light-client friendliness via inclusion proofs and deterministic replay of blocks.",
        ],
        codeTitle: "Block → Execution → Roots",
        code: `// Conceptual block processing
for (tx of block.txs):
  result = PVM.execute(tx, state)
commit:
  stateRoot    = MPT(state)
  receiptsRoot = MPT(receipts)
  header.stateRoot = stateRoot
  header.receiptsRoot = receiptsRoot
`,
      },
      {
        id: "timestamp-server",
        icon: Layers,
        title: "Timestamp Server",
        tagline:
          "When actions occur: PoW turns time into a cryptographic resource and orders events.",
        bullets: [
          "Each block commits to the previous header hash ⇒ verifiable temporal chain.",
          "Proof-of-Work (XHash) binds cost to time; recomputation enforces the arrow of time.",
          "Objective ordering without trusted clocks; median-time-past prevents timestamp abuse.",
          "Security grows with cumulative difficulty; backdating becomes economically infeasible.",
        ],
        codeTitle: "Header linkage",
        code: `// Block header sketch
header = {
  parentHash,
  stateRoot,
  txRoot,
  time,
  nonce,
  difficulty,
  mixHash,      // XHash result
}
assert(block.parent.hash == parentHash)
assert(XHash(header) < target(difficulty))
`,
      },
      {
        id: "nakamoto-consensus",
        icon: BrainCircuit,
        title: "Nakamoto Consensus",
        tagline:
          "Which history prevails: the heaviest valid chain by cumulative work is canonical.",
        bullets: [
          "Heaviest-chain rule selects canonical history via cumulative PoW (difficulty sum).",
          "Probabilistic finality: reorg risk decays exponentially with depth (k-confirmations).",
          "Difficulty retargeting (XHash) aims for ~10-minute blocks using median-time-past.",
          "Economically neutral: no staking or privileged validators — only open PoW.",
        ],
        codeTitle: "Fork-choice (conceptual)",
        code: `// Choose chain with max cumulative work
best = argmax(chains, sum(block.work for block in chain))
`,
      },
    ],
    []
  );

  const HowItFits = () => (
    <Card className="border min-w-0">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">How the pieces fit together</CardTitle>
        <p className="text-sm text-muted-foreground">
          Parallax weaves cryptography, deterministic execution, proof-of-work timekeeping, and
          neutral fork-choice into a single verifiable pipeline.
        </p>
      </CardHeader>
      <CardContent className="grid min-w-0 gap-4 md:grid-cols-4">
        {[
          { label: "Cryptography", desc: "ECDSA decides who may act (valid authorship)." },
          { label: "Execution (PVM)", desc: "Defines what actions do (state transitions)." },
          { label: "Timestamp Server", desc: "Establishes when actions occur (ordered by PoW)." },
          { label: "Nakamoto", desc: "Selects which history prevails (heaviest chain)." },
        ].map((x) => (
          <div key={x.label} className="min-w-0 rounded-2xl border p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">{x.label}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{x.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-0 pb-24 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex min-w-0 flex-col gap-6"
      >
        <PageHeader
          title="Protocol Architecture"
          subTitle="A deep dive into Parallax’s security model: signatures for authorship, PVM for
              semantics, Proof-of-Work for time, and Nakamoto consensus for canonical history."
        />

        <nav className="flex flex-wrap items-center justify-center gap-2 text-sm">
          {sections.map((s) => (
            <Link key={s.id} href={`#${s.id}`} className="group inline-flex items-center gap-1">
              <span className="rounded-full bg-muted px-3 py-1 transition-colors group-hover:bg-muted/80">
                {s.title}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </nav>
      </motion.div>

      <HowItFits />

      <Separator className="my-10" />

      {/* Sections */}
      <div className="grid min-w-0 gap-10">
        {sections.map((s, i) => (
          <motion.section
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="scroll-mt-24 min-w-0"
          >
            <Card className="border min-w-0">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <s.icon className="h-5 w-5" />
                  <CardTitle className="text-2xl">{s.title}</CardTitle>
                </div>
                <p className="pt-2 text-sm text-muted-foreground">{s.tagline}</p>
              </CardHeader>

              <CardContent className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <ul className="min-w-0 space-y-3 text-sm leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1.5 w-1.5 min-w-1.5 rounded-full bg-foreground/60" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="min-w-0 rounded-xl border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="font-medium">{s.codeTitle}</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">pseudocode</Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre rounded-lg bg-background p-4 text-xs leading-relaxed shadow-sm overscroll-x-contain [-webkit-overflow-scrolling:touch]">
                    <code className="block max-w-full">
                      {s.code}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        ))}
      </div>

      {/* Interplay Diagram (textual) */}
      <div className="mt-10 grid min-w-0 gap-4 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">End-to-end flow</h2>
        <p className="text-sm text-muted-foreground">
          A signed transaction enters the mempool → the miner proposes a block → the PVM executes
          deterministically → the header commits to state/receipts → XHash proves work → the network
          adopts the heaviest valid chain. Scarcity (21M, halvings) underpins all execution.
        </p>
        <div className="grid min-w-0 gap-3 md:grid-cols-5">
          {["Sign", "Execute", "Commit", "Prove", "Select"].map((step, idx) => (
            <div key={step} className="min-w-0 rounded-xl border bg-card p-4 text-center shadow-sm">
              <div className="text-2xl font-semibold">{idx + 1}</div>
              <div className="mt-2 text-sm">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Links to related docs */}
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4">
        <Button asChild size={"xl"} variant={"outline"}>
          <Link href="/introduction/protocol/overview">
            <ChevronLeft />
            Protocol Overview
          </Link>
        </Button>
        <Button asChild size={"xl"}>
          <Link href="/introduction/protocol/block-reward-and-halving">
            Block Reward & Halving
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
