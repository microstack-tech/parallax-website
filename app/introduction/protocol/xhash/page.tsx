"use client";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Cpu, ExternalLink, Hash, Layers, ShieldCheck, TimerReset } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function Page() {
  const sections = useMemo(
    () => [
      {
        id: "overview",
        icon: Hash,
        title: "Overview",
        tagline:
          "XHash is Parallax’s Proof-of-Work engine: Ethash-style Hashimoto (light/full) with Parallax-specific consensus wiring, ASERT-based difficulty mapping, and epoch handling.",
        bullets: [
          "Mining evaluates Hashimoto over a header seal hash and 64-bit nonce, using either a cache (light) or dataset (full).",
          "Verification checks MixDigest equality and compares the result to a target derived from difficulty: target = ⌊(2^256−1)/D⌋.",
          "Seal hash uses Legacy Keccak-256 over an RLP list of specific header fields.",
        ],
        codeTitle: "SealHash",
        code: `SealHash(header):
  enc = [
    header.ParentHash,
    header.Coinbase,
    header.Root,
    header.TxHash,
    header.ReceiptHash,
    header.Bloom,
    header.Difficulty,
    header.Number,
    header.GasLimit,
    header.GasUsed,
    header.Time,
    header.Extra,
    header.EpochStartTime,
  ]
  if header.BaseFee != nil:
    enc.append(header.BaseFee)
  return keccak256(rlp.encode(enc))
`,
      },
      {
        id: "mining-loop",
        icon: Cpu,
        title: "Mining Loop",
        tagline: "Hashimoto-light/full with 64-bit nonce search and little-endian target compare in the inner loop.",
        bullets: [
          "Miners iterate nonce ∈ [0..2^64−1], computing (digest, result) = hashimoto(cache/dataset, sealHash, nonce).",
          "MixDigest must match the header field exactly; result must be ≤ target.",
          "Full miners use the per-epoch dataset; light verifiers/nodes can validate with caches (no full DAG).",
          "Dataset/cache regenerate on epoch boundaries (e.g., every 720 blocks).",
        ],
        codeTitle: "Nonce search (pseudocode)",
        code: `mine(header, cacheOrDataset):
  target = floor((2^256 - 1) / header.Difficulty)
  nonce  = random64()
  loop:
    (mix, res) = hashimoto(cacheOrDataset, SealHash(header), nonce)
    if mix == header.MixDigest and Big(res) <= target:
      return nonce
    nonce = (nonce + 1) mod 2^64
`,
      },
      {
        id: "verification",
        icon: ShieldCheck,
        title: "Header Verification",
        tagline: "What a node checks before accepting a PoW header.",
        bullets: [
          "Size of Extra ≤ MaximumExtraDataSize.",
          "Time ≤ now + 300s and Time > MTP(parent) (median of last 11).",
          "Difficulty must match the consensus difficulty engine (ASERT) for the given parent and header.",
          "PoW seal: MixDigest equality and XHash(header) ≤ target(two256m1 / D).",
        ],
        codeTitle: "verifySeal (conceptual)",
        code: `verifySeal(h):
  require(h.Difficulty > 0)
  if fulldag:
    (mix, res) = hashimotoFull(dataset(epoch(h.Number)), SealHash(h), h.Nonce)
  else:
    (mix, res) = hashimotoLight(datasetSize(h.Number), cache(epoch(h.Number)), SealHash(h), h.Nonce)
  require(mix == h.MixDigest)
  target = floor((2^256 - 1) / h.Difficulty)
  require(Big(res) <= target)
`,
      },
      {
        id: "epochs-dag",
        icon: Layers,
        title: "Epochs, Cache & Dataset (DAG)",
        tagline: "Regeneration cadence and miner compatibility notes.",
        bullets: [
          "Epoch number is derived from block height; cache/dataset sizes depend on epoch via datasetSize(height).",
          "Parallax uses shorter epochs than legacy Ethash (e.g., 720-block epochs) to fit ~5-day regeneration at 10-minute blocks.",
          "Nodes keep caches to make verification light; full DAG not required to validate headers.",
        ],
        codeTitle: "Regeneration trigger",
        code: `if newEpoch(height):
  regenerate cache
  if mining full: regenerate dataset
`,
      },
      {
        id: "retarget-anchors",
        icon: TimerReset,
        title: "Difficulty & Anchors",
        tagline: "Interaction between PoW and the ASERT difficulty schedule.",
        bullets: [
          "Difficulty is computed by the ASERT scheduler; XHash simply enforces the chosen difficulty via the target check.",
          "Consensus maintains an ASERT anchor (height, parentTime, target) and uses header metadata (e.g., EpochStartTime or dedicated fields) to reconstruct the anchor context.",
          "CalcAsertDifficulty(config, anchor, parent, header) derives the expected difficulty for the header.",
          "Difficulty and anchor invariants are enforced in header verification before fork-choice.",
        ],
        codeTitle: "Difficulty invariants (conceptual)",
        code: `verifyDifficulty(h, parent, anchor):
  expected = CalcAsertDifficulty(config, anchor, parent, h)
  require(h.Difficulty == expected)
`,
      },
    ],
    []
  );

  const ParamsTable = () => (
    <Card>
      <CardHeader>
        <ChevronRight />
        <CardTitle>Consensus-Relevant Details</CardTitle>
      </CardHeader>
      <CardDescription>
        As reflected by <code>xhash/consensus.go</code> and Parallax chain config.
      </CardDescription>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aspect</TableHead>
              <TableHead>Value / Behavior</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Hash function (seal)</TableCell>
              <TableCell>Legacy Keccak-256</TableCell>
              <TableCell>RLP over specific header fields</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Target mapping</TableCell>
              <TableCell>target = ⌊(2^256−1)/D⌋</TableCell>
              <TableCell>Result must be ≤ target</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MixDigest</TableCell>
              <TableCell>Must equal computed digest</TableCell>
              <TableCell>Mismatch ⇒ invalid PoW</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MTP</TableCell>
              <TableCell>Median of last 11</TableCell>
              <TableCell>Enforced: Time &gt; MTP(parent); future drift ≤ 300s</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Epoch length</TableCell>
              <TableCell>Config-defined (e.g., 720 blocks)</TableCell>
              <TableCell>Determines cache/DAG regeneration cadence</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Difficulty algorithm</TableCell>
              <TableCell>ASERT (per-block, anchor-based)</TableCell>
              <TableCell>aserti3-2d; consensus computes D, XHash enforces it via PoW</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 xl:px-0 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col gap-6"
      >
        <PageHeader
          title="XHash"
          subTitle="The memory-hard Proof-of-Work used by Parallax. Ethash-style Hashimoto with Parallax’s ASERT-based difficulty, consensus rules, and epoch handling."
        />

        <nav className="flex flex-wrap justify-center items-center gap-2 text-sm">
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

      <ParamsTable />

      <Separator className="my-10" />

      {/* Sections */}
      <div className="grid gap-10">
        {sections.map((s, i) => (
          <motion.section
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="scroll-mt-24"
          >
            <Card>
              <CardHeader>
                <s.icon />
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardDescription>{s.tagline}</CardDescription>

              <CardContent className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <ul className="min-w-0 space-y-3 leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <ChevronRight className="size-4 min-w-4 mt-1.5" />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="min-w-0 rounded-xl border bg-muted p-4 shadow-inner">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="font-medium">{s.codeTitle}</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">
                      pseudocode
                    </Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre rounded-lg bg-background p-4 text-sm leading-relaxed overscroll-x-contain [-webkit-overflow-scrolling:touch] border shadow-xs">
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

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"} className="w-full sm:w-fit">
          <Link href="/introduction/protocol/difficulty-and-forkchoice">
            <ChevronLeft />
            Difficulty Algorithm & Fork-choice Rules
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit">
          <Link
            href="https://docs.parallaxprotocol.org/parallax-protocol/foundational-topics/consensus/algorithms/xhash"
            target="_blank"
          >
            XHash Specification
            <ExternalLink />
          </Link>
        </Button>
      </div>
    </div>
  );
}
