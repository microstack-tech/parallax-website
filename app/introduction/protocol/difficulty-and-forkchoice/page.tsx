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
          "Parallax targets 10-minute blocks using XHash Proof of Work and a per-block ASERT difficulty algorithm, after an initial BTC-style DAA phase.",
        bullets: [
          "From genesis up to block 17,559 Parallax used a Bitcoin-style 2016-block difficulty adjustment window (BTC-style DAA).",
          "PIP-0002 (Migration from BTC-Style Difficulty Adjustment Algorithm to ASERT) activated ASERT at block 17,560.",
          "ASERT (aserti3-2d, as used by Bitcoin Cash) adjusts difficulty every block relative to a fixed anchor, converging smoothly toward the 600 s target under hashrate shocks.",
          "Median-Time-Past (MTP, median of last 11) guards timestamp validity; nodes reject headers more than +300s in the future and verify PoW with target = ⌊(2^256−1)/D⌋.",
        ],
      },
      {
        id: "target-and-difficulty",
        icon: Gauge,
        title: "Target ↔ Difficulty",
        tagline: "Work threshold mapping used by XHash verification (common to both BTC-DAA and ASERT eras).",
        bullets: [
          "Let TWO256M1 = 2^256 − 1. The header is valid if XHash(header) ≤ target, where target = ⌊TWO256M1 / D⌋.",
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
        title: "Difficulty Adjustment: BTC-Style DAA → ASERT",
        tagline: "Historical 2016-block windows, modern per-block ASERT relative to an anchor.",
        bullets: [
          "Genesis → block 17,559: CalcNakamotoDifficulty() implements a Bitcoin-style 2016-block window using epoch anchors.",
          "Block 17,560 and later: CalcAsertDifficulty() implements aserti3-2d using a fixed anchor {anchorHeight, anchorParentTime, anchorTarget}.",
          "ASERT uses the height offset Δh and elapsed time Δt relative to the anchor to push difficulty toward the 600 s target with a 2-day half-life.",
          "Historical blocks keep their original BTC-style DAA difficulty and are still validated under those rules; forward-looking adjustment is entirely ASERT-based.",
        ],
        codeTitle: "Height-dependent difficulty selection (conceptual)",
        code: `// Difficulty selection by era
CalcDifficulty(config, anchor, parent, header):
  if height(header) < 17560:
    // BTC-style DAA: 2016-block window with epoch anchors
    return CalcNakamotoDifficulty(config, parent)
  else:
    // ASERT: per-block retarget relative to fixed anchor
    return CalcAsertDifficulty(config, anchor, parent, header)

// ASERT core idea (fixed-point, aserti3-2d)
CalcAsertDifficulty(config, anchor, parent, header):
  Δh = height(header) - anchor.height
  Δt = header.Time - anchor.parentTime   // seconds
  // τ = 600 s target, T_half = 172800 s (2 days)
  e  = ((Δt - Δh * τ) * RADIX) / T_half  // fixed-point exponent
  target = anchor.target * 2^e           // via cubic approximation in integer math
  target = clamp(target, 1, maxTarget)
  return DifficultyFromTarget(target)
`,
      },
      {
        id: "median-time-past",
        icon: TimerReset,
        title: "Median-Time-Past (MTP)",
        tagline: "Timestamp sanity for validity and time-warp resistance.",
        bullets: [
          "MTP(parent) = median of the last 11 block timestamps ending at parent.",
          "Validity requires header.Time > MTP(parent) (strict inequality).",
          "Future-drift bound: header.Time ≤ now + 300s.",
          "Under ASERT, elapsed time relative to the anchor is driven by timestamps constrained by MTP, which prevents classic long-range time-warp attacks against the difficulty algorithm.",
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
        tagline: "Heaviest valid chain by cumulative work, independent of the active difficulty era.",
        bullets: [
          "Maintain ChainWork[tip] = ChainWork[parent] + Work(block).",
          "Work(block) is a monotone function of target/difficulty; any consistent definition yields equivalent ordering.",
          "Select the valid tip with greatest ChainWork; ties can be broken lexicographically by tip hash.",
          "Invalid headers (time, PoW, BTC-DAA/ASERT rules) are excluded before fork choice.",
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
        tagline: "Depth-based assurances instead of absolute finality.",
        bullets: [
          "Confirmation depth k lowers reorg probability exponentially with k.",
          "Wallets/UIs choose k by value at risk (e.g., 6-conf defaults for high-value).",
          "Nodes can implement practical guards (e.g., max reorg depth) to avoid DoS from pathological peers.",
          "ASERT’s smoother, per-block difficulty response reduces the incentive for oscillation-driven or opportunistic long reorgs compared to large-window BTC-style DAA.",
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
        tagline: "Key vectors relevant to the Parallax difficulty design.",
        bullets: [
          "Time-warp: strict MTP enforcement plus ASERT’s per-block feedback (no long static windows) mitigate the classic BTC-style 2016-block time-warp manipulation.",
          "Future timestamp skew: reject headers more than +300s ahead of local time.",
          "MixDigest spoofing: header.MixDigest must match hashimoto output (light/full).",
        ],
        codeTitle: "Header validity subset",
        code: `ValidHeader(h, parent):
  require(len(h.Extra) <= MaximumExtraDataSize)
  require(h.Time <= now() + 300)
  require(h.Time > MTP(parent))
  require(h.Difficulty > 0)
  // difficulty rules depend on height:
  //   < 17560: BTC-style DAA epoch invariants
  //   ≥ 17560: ASERT anchor-based invariants
  // PoW: MixDigest match & XHash(h) <= targetFrom(D)
`,
      },
    ],
    []
  );

  const ParamsTable = () => (
    <Card>
      <CardHeader>
        <ChevronRight />
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
              <TableCell>Bitcoin-like target</TableCell>
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
              <TableCell>Difficulty algorithm history</TableCell>
              <TableCell>—</TableCell>
              <TableCell>BTC-style DAA → ASERT</TableCell>
              <TableCell>
                BTC-style 2016-block windows from genesis–17,559; ASERT (aserti3-2d) for blocks ≥ 17,560 (PIP-0002).
              </TableCell>
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
          subTitle="A precise walk-through of Parallax’s difficulty adjustment history — BTC-style DAA from genesis, the ASERT upgrade at block 17,560 (PIP-0002), and the Nakamoto fork-choice rule based on cumulative work."
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
                    <Badge variant="outline" className="rounded-full">pseudocode</Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre rounded-lg bg-background p-4 text-sm leading-relaxed border shadow-xs overscroll-x-contain [-webkit-overflow-scrolling:touch]">
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
        <h2 className="text-xl font-semibold">End-to-end selection flow</h2>
        <p className="text-muted-foreground">
          Headers are checked for Extra size, time (MTP & future drift), era-specific difficulty rules
          (BTC-style DAA for early blocks, ASERT for height ≥ 17,560), gas limits/EIPs, height increment,
          and PoW seal. Valid blocks extend ChainWork, and the heaviest tip is canonical.
        </p>
        <div className="grid gap-3 md:grid-cols-5">
          {["Validate", "Check Anchor / Era", "Compute Difficulty (DAA/ASERT)", "Accumulate Work", "Select Heaviest"].map((step, idx) => (
            <div key={step} className="rounded-xl border bg-card p-4 text-center">
              <div className="text-2xl font-semibold">{idx + 1}</div>
              <div className="mt-2">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"} className="w-full sm:w-fit">
          <Link href="/introduction/protocol/coinbase-maturity">
            <ChevronLeft />
            Coinbase Maturity Scheduling
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit">
          <Link href="/introduction/protocol/xhash">
            XHash
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
