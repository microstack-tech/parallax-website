"use client";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { BarChart4, ChevronLeft, ChevronRight, Clock, Coins, Database, LineChartIcon, Sigma } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Page() {
  const sections = useMemo(
    () => [
      {
        id: "overview",
        icon: Coins,
        title: "Overview",
        tagline: "The Parallax monetary schedule mirrors Bitcoin’s: 21 million total supply, 50 → 25 → 12.5 ... halvings every 210,000 blocks.",
        bullets: [
          "Initial block reward: 50 LAX (in wei, 50 × 10¹⁸).",
          "Halving interval: every 210,000 blocks (≈ 4 years at 10‑minute blocks).",
          "Total theoretical supply: capped at ~21,000,000 LAX.",
          "Implements a deflationary issuance model identical in structure to Bitcoin’s but denominated in wei for EVM compatibility.",
        ],
        codeTitle: "Reward function (from consensus.go)",
        code: `calcBlockReward(height):
  if height == 0:
    return 0
  reward = 50 * 1e18
  halvings = height / 210000
  if halvings > 63:
    return 0  // reward effectively zero
  divisor = 2 ** halvings
  return reward / divisor
`,
      },
      {
        id: "maturity-scheduling",
        icon: Clock,
        title: "Coinbase Maturity Scheduling",
        tagline: "Block rewards are locked until maturity — preventing instant spend and ensuring deterministic unlocks.",
        bullets: [
          "Every reward is associated with an unlock height: current_height + 100 blocks.",
          "Rewards are written into the state trie under a special lockbox address (0x...42).",
          "When chain height reaches unlock, the reward is transferred to the miner’s address.",
          "Ensures clean separation of pending vs spendable supply in the ledger state.",
        ],
        codeTitle: "Reward scheduling (simplified)",
        code: `Finalize(block):
  height = block.number
  reward = calcBlockReward(height)
  unlock = height + CoinbaseMaturityBlocks

  if reward > 0:
    lockbox[unlock].addr = coinbase
    lockbox[unlock].amt  = reward

  // Pay matured rewards for current height
  if lockbox[height].amt > 0:
    AddBalance(lockbox[height].addr, lockbox[height].amt)
    Clear(lockbox[height])
`,
      },
      {
        id: "economic-properties",
        icon: Sigma,
        title: "Economic Properties",
        tagline: "Parallax enforces predictable scarcity and zero pre‑mine issuance.",
        bullets: [
          "Each halving epoch reduces new issuance by 50%.",
          "Cumulative issuance asymptotically approaches the 21M cap but never exceeds it.",
          "Rewards are distributed exclusively to miners — no developer or foundation allocation.",
          "The emission curve is hard‑coded, ensuring no discretionary monetary changes post‑launch.",
        ],
        codeTitle: "Total issued approximation",
        code: `totalIssued(upToHeight):
  sum = 0
  for h in 1..upToHeight:
    sum += calcBlockReward(h)
  return sum
// approaches 21e6 * 1e18 wei
`,
      },
      {
        id: "state-representation",
        icon: Database,
        title: "State Representation",
        tagline: "Reward maturity tracking inside the state trie.",
        bullets: [
          "Two state keys are used per unlock height: schedKeyAddr(height) and schedKeyAmt(height).",
          "Both are derived using keccak256(\"maturity:addr:\" + height) and (\"maturity:amt:\" + height).",
          "Values are stored under the lockbox address to segregate reward metadata from user accounts.",
          "Upon payout, both keys are cleared from state to reclaim trie space.",
        ],
        codeTitle: "State key derivation (from consensus.go)",
        code: `schedKeyAddr(height):
  return keccak256("maturity:addr:" || height)

schedKeyAmt(height):
  return keccak256("maturity:amt:" || height)
`,
      },
    ],
    []
  );

  // ---- Monetary constants (from consensus.go) ----
  const H = 210_000; // blocks per halving
  const R0 = 50; // initial reward in LAX (display-only; consensus uses wei)


  // Build epoch summary for charts/tables (use LAX units for readability)
  const epochs = useMemo(() => {
    const out: {
      epoch: number;
      startHeight: number;
      endHeight: number;
      reward: number; // LAX per block
      issuedInEpoch: number; // LAX
      cumulative: number; // LAX
    }[] = [];
    let reward = R0;
    let cumulative = 0;
    for (let e = 0; e <= 63; e++) {
      const start = e * H + (e === 0 ? 1 : 0); // block 0 has no spendable subsidy
      const end = (e + 1) * H;
      const issued = reward * H;
      cumulative += issued;
      out.push({
        epoch: e,
        startHeight: start,
        endHeight: end,
        reward: reward,
        issuedInEpoch: issued,
        cumulative,
      });
      reward = reward / 2;
      if (reward < 1e-8) break; // effectively zero
    }
    return out;
  }, []);

  const ParamsTable = () => (
    <Card>
      <CardHeader>
        <ChevronRight className="size-6" strokeWidth={1.5} />
        <CardTitle>Monetary Parameters</CardTitle>
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
              <TableCell>Initial reward</TableCell>
              <TableCell>R₀</TableCell>
              <TableCell>50 × 10¹⁸ wei</TableCell>
              <TableCell>50 LAX per block</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Halving interval</TableCell>
              <TableCell>H</TableCell>
              <TableCell>210,000 blocks</TableCell>
              <TableCell>≈ 4 years at 10 min intervals</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Coinbase maturity</TableCell>
              <TableCell>M</TableCell>
              <TableCell>100 blocks</TableCell>
              <TableCell>Reward unlock delay</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lockbox address</TableCell>
              <TableCell>—</TableCell>
              <TableCell>0x0000000000000000000000000000000000000042</TableCell>
              <TableCell>State location for maturity records</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const Charts = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Cumulative supply */}
      <Card>
        <CardHeader>
          <LineChartIcon />
          <CardTitle>Cumulative Supply by Epoch</CardTitle>
        </CardHeader>
        <CardDescription>
          Sum of all issued rewards up to each halving epoch (LAX units).
        </CardDescription>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={epochs} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" tickFormatter={(v) => `E${v}`} />
              <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [`${v.toLocaleString()} LAX`, "Value"]} labelFormatter={(l) => `Epoch ${l}`} />
              <ReferenceLine y={21_000_000} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="cumulative" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>


      {/* Per-block reward */}
      <Card>
        <CardHeader>
          <BarChart4 />
          <CardTitle>Per‑block Reward (step)</CardTitle>
        </CardHeader>
        <CardDescription>Reward in LAX per block at each epoch.</CardDescription>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={epochs} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" tickFormatter={(v) => `E${v}`} />
              <YAxis />
              <Tooltip formatter={(v: number) => [`${v} LAX`, "Reward"]} labelFormatter={(l) => `Epoch ${l}`} />
              <Line type="stepAfter" dataKey="reward" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-0 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col gap-6"
      >
        <PageHeader
          title="Block Reward & Halving"
          subTitle="This page explains Parallax’s Bitcoin‑inspired emission schedule, coinbase maturity mechanism, and how block rewards are managed in the protocol state."
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

      {/* Charts */}
      <Charts />

      <Separator className="my-10" />

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
                <s.icon className="size-6" />
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardDescription>{s.tagline}</CardDescription>
              <CardContent className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <ul className="min-w-0 space-y-3 leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <ChevronRight className="size-4 min-w-4 mt-1.5" strokeWidth={1.5} />
                      <span className="text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="min-w-0 rounded-xl border bg-muted shadow-inner p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="font-medium">{s.codeTitle}</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">pseudocode</Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre rounded-lg bg-background p-4 text-sm leading-relaxed shadow-xs border overscroll-x-contain [-webkit-overflow-scrolling:touch]">
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

      <div className="mt-10 grid gap-4 rounded-2xl border p-6">
        <h2 className="text-xl font-semibold">Emission Summary</h2>
        <p className="text-muted-foreground">
          Parallax’s issuance is fully deterministic. Rewards halve every 210,000 blocks until they
          converge toward zero. Every coin in circulation is traceable to on-chain mining output,
          making Parallax a fair-launch, work-secured network with no premine or hidden subsidies.
        </p>
      </div>

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"}>
          <Link href="/introduction/protocol/architecture">
            <ChevronLeft />
            Protocol Architecture
          </Link>
        </Button>
        <Button asChild>
          <Link href="/introduction/protocol/coinbase-maturity">
            Coinbase Maturity Scheduling
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
