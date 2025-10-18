"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  GitFork,
  ShieldCheck,
  TimerReset,
  TriangleAlert
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Page() {
  const sections = useMemo(
    () => [
      {
        id: "overview",
        icon: Gauge,
        title: "Overview",
        tagline:
          "XHash difficulty retargets on fixed block boundaries (epoch anchors) and fork choice selects the valid chain with the greatest cumulative work.",
        bullets: [
          "Retarget occurs every 2016 blocks.",
          "Each retarget epoch has an anchor time recorded in headers (EpochStartTime).",
          "Median‑Time‑Past (MTP, median of last 11) guards timestamp validity; a block’s time must be strictly greater than parent MTP.",
          "Nodes reject headers more than +300s in the future, and verify PoW with target = ⌊(2^256−1)/D⌋.",
        ],
      },
      {
        id: "target-and-difficulty",
        icon: Gauge,
        title: "Target ↔ Difficulty",
        tagline: "Work threshold mapping used by XHash verification.",
        bullets: [
          "Let TWO256M1 = 2^256 − 1. The header is valid iff XHash(header) ≤ target, where target = ⌊TWO256M1 / D⌋.",
          "Higher difficulty D ⇒ smaller target ⇒ harder block.",
          "Header.MixDigest must equal the computed digest from hashimoto (light/full paths).",
          "Difficulty must be strictly positive; zero/negative is invalid.",
        ],
        codeTitle: "Target calculation (conceptual)",
        code: `// Given difficulty D (big integer)
TWO256M1 = (1n << 256n) - 1n
target   = TWO256M1 / D
valid    = BigIntFromBytes(result) <= target
`,
      },
      {
        id: "retargeting",
        icon: TimerReset,
        title: "Retargeting via Epoch Anchors",
        tagline: "Difficulty is derived at fixed block intervals using epoch start times.",
        bullets: [
          "Let R = 2016 blocks.",
          "If height % R == 0: header.EpochStartTime = header.Time (start a new epoch).",
          "Else: header.EpochStartTime = parent.EpochStartTime (propagate the current anchor).",
          "CalcNakamotoDifficulty() implements the Nakamoto‑style difficulty adjustment using these anchors.",
        ],
        codeTitle: "Header preparation & check (from consensus.go semantics)",
        code: `// Prepare (when building a block)
if height % R == 0:
  header.EpochStartTime = header.Time
else:
  header.EpochStartTime = parent.EpochStartTime

header.Difficulty = CalcNakamotoDifficulty(config, parent)

// Verify (when receiving a header)
if height % R == 0:
  require(header.EpochStartTime == header.Time)
else:
  require(header.EpochStartTime == parent.EpochStartTime)
`,
      },
      {
        id: "median-time-past",
        icon: TimerReset,
        title: "Median‑Time‑Past (MTP)",
        tagline: "Timestamp sanity for validity and anti‑warp defenses.",
        bullets: [
          "MTP(parent) = median of the last 11 block timestamps ending at parent.",
          "Validity requires header.Time > MTP(parent) (strict inequality).",
          "Future‑drift bound: header.Time ≤ now + 300s.",
          "MTP is used for validity checks; the retarget algorithm itself relies on epoch anchors.",
        ],
        codeTitle: "MTP computation",
        code: `MTP(n):
  ts = timestamps(n, upTo=11) // back from n inclusive
  sort(ts)
  return ts[len(ts)//2]
`,
      },
      {
        id: "fork-choice",
        icon: GitFork,
        title: "Fork Choice Rule",
        tagline: "Heaviest valid chain by cumulative work.",
        bullets: [
          "Maintain ChainWork[tip] = ChainWork[parent] + Work(block).",
          "Work(block) is a monotone function of target/difficulty; any consistent definition yields equivalent ordering.",
          "Select the valid tip with greatest ChainWork; ties can be broken lexicographically by tip hash.",
          "Invalid headers (time, PoW, difficulty/epoch rules) are excluded before fork choice.",
        ],
        codeTitle: "Cumulative work (conceptual)",
        code: `Work(block):
  target = TWO256M1 / Difficulty(block)
  // Use an approximation that preserves ordering; e.g.,
  return TWO256M1 / (target + 1)

SelectBest(tips):
  return argmax(tips, ChainWork[tip])
`,
      },
      {
        id: "reorgs-finality",
        icon: ShieldCheck,
        title: "Reorgs & Probabilistic Finality",
        tagline: "Depth‑based assurances instead of absolute finality.",
        bullets: [
          "Confirmation depth k lowers reorg probability exponentially with k.",
          "Wallets/UIs choose k by value at risk (e.g., 6‑conf defaults for high‑value).",
          "Nodes can implement practical guards (e.g., max reorg depth) to avoid DoS from pathological peers.",
          "Miner economics disfavor long reorgs absent majority hashpower collusion.",
        ],
        codeTitle: "Reorg handling (conceptual)",
        code: `OnNewTip(candidate):
  if ChainWork[candidate] > ChainWork[currentTip]:
    currentTip = candidate
    ReorgTo(candidate)
`,
      },
      {
        id: "attacks-and-mitigations",
        icon: TriangleAlert,
        title: "Attacks & Mitigations",
        tagline: "Key vectors relevant to the Parallax protocol specification.",
        bullets: [
          "Time‑warp: strict MTP enforcement and epoch‑anchor checks mitigate manipulation.",
          "Future timestamp skew: reject headers more than +300s ahead of local time.",
          "MixDigest spoofing: header.MixDigest must match hashimoto output (light/full).",
        ],
        codeTitle: "Header validity subset",
        code: `ValidHeader(h, parent):
  require(len(h.Extra) <= MaximumExtraDataSize)
  require(h.Time <= now() + 300)
  require(h.Time > MTP(parent))
  require(h.Difficulty > 0)
  // epoch anchor invariants per height % R
  // PoW: MixDigest match & XHash(h) <= targetFrom(D)
`,
      },
    ],
    []
  );

  const ParamsTable = () => (
    <Card>
      <CardHeader>
        <ChevronRight strokeWidth={1.5} />
        <CardTitle>Consensus Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Target block interval</TableCell>
              <TableCell>τ</TableCell>
              <TableCell>600 s</TableCell>
              <TableCell>Bitcoin‑like target</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Future time drift bound</TableCell>
              <TableCell>—</TableCell>
              <TableCell>300 s</TableCell>
              <TableCell>5 minutes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MTP sample size</TableCell>
              <TableCell>—</TableCell>
              <TableCell>11 blocks</TableCell>
              <TableCell>Median of last 11 timestamps</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Retarget interval</TableCell>
              <TableCell>R</TableCell>
              <TableCell>2016 blocks</TableCell>
              <TableCell>Bitcoin-like retarget</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

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
          title="Difficulty Algorithm & Fork-choice Rules"
          subTitle="A precise walk‑through of Parallax’s difficulty retargeting (XHash) and the Nakamoto fork‑choice rule based on cumulative work."
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
                <div className="flex items-center gap-4">
                  <s.icon className="size-6" />
                  <CardTitle>{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardDescription>{s.tagline}</CardDescription>

              <CardContent className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <ul className="min-w-0 space-y-3 leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <ChevronRight className="size-4 min-w-4 mt-1.5" strokeWidth={1.5} />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="min-w-0 rounded-xl border bg-muted/30 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="font-medium">{s.codeTitle}</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">pseudocode</Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre rounded-lg bg-background p-4 text-sm leading-relaxed shadow-sm overscroll-x-contain [-webkit-overflow-scrolling:touch]">
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

      {/* Flow Summary */}
      <div className="mt-10 grid gap-4 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">End‑to‑end selection flow</h2>
        <p className="text-muted-foreground">
          Headers are checked for Extra size, time (MTP & future drift), epoch‑anchor invariants,
          exact difficulty, gas limits/EIPs, height increment, and PoW seal. Valid blocks extend
          ChainWork, and the heaviest tip is canonical.
        </p>
        <div className="grid gap-3 md:grid-cols-5">
          {["Validate", "Check Epoch Anchor", "Compute Difficulty", "Accumulate Work", "Select Heaviest"].map((step, idx) => (
            <div key={step} className="rounded-xl border bg-card p-4 text-center shadow-sm">
              <div className="text-2xl font-semibold">{idx + 1}</div>
              <div className="mt-2">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"}>
          <Link href="/introduction/protocol/coinbase-maturity">
            <ChevronLeft />
            Coinbase Maturity Scheduling
          </Link>
        </Button>
        <Button asChild>
          <Link href="/introduction/protocol/xhash">
            XHash
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
