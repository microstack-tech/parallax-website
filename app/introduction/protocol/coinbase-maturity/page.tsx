"use client";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Database, GitFork, KeySquare, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function Page() {
  const sections = useMemo(
    () => [
      {
        id: "overview",
        icon: Clock,
        title: "Overview",
        tagline:
          "Parallax escrows block subsidies until a fixed maturity height, releasing them deterministically from a lockbox in the state trie.",
        bullets: [
          "Each block schedules its own coinbase payout for height + M blocks, where M = 100 blocks.",
          "A special lockbox account stores \"when\" (height) → (addr, amt) pairs as state slots.",
          "At each height h, the protocol checks if any payout is due for h and transfers it to the recorded address.",
          "This separates pending issuance from spendable supply and smooths reorg handling.",
        ],
        codeTitle: "High‑level flow",
        code: `Finalize(header, state):
  h = header.number
  R = calcBlockReward(h)
  M = 100 blocks
  if R > 0:
    putScheduledPayout(state, h + M, header.coinbase, R)
  if due(h):
    (addr, amt) = popDuePayout(state, h)
    state.AddBalance(addr, amt)
  header.Root = state.IntermediateRoot(...)
`,
      },
      {
        id: "state-keys",
        icon: Database,
        title: "State Keys & Lockbox Address",
        tagline: "Two storage slots per unlock height under a reserved system address.",
        bullets: [
          "For a given unlock height H: store address at schedKeyAddr(H) and amount at schedKeyAmt(H).",
          "Both keys are derived by keccak256 of a fixed ASCII prefix plus H encoded as big‑endian uint64.",
          "Presence is keyed off the amount slot; payout clears both slots to reclaim trie space.",
        ],
        codeTitle: "Key derivation (from consensus.go)",
        code: `schedKeyAddr(H):
  b = bigEndianUint64(H)
  return keccak256("maturity:addr:" || b)

schedKeyAmt(H):
  b = bigEndianUint64(H)
  return keccak256("maturity:amt:" || b)
`,
      },
      {
        id: "payout-lifecycle",
        icon: RefreshCw,
        title: "Payout Lifecycle",
        tagline: "From block inclusion to matured transfer.",
        bullets: [
          "Block N is mined → reward R_N computed from halving schedule.",
          "Schedule (addr=coinbase_N, amt=R_N) at unlock height U = N + M.",
          "At height U, node reads (addr_U, amt_U); if amt_U ≠ 0, credit and clear slots.",
          "Genesis (height 0) has no spendable subsidy.",
        ],
        codeTitle: "Timeline (textual diagram)",
        code: `N:   mine block, schedule payout for U=N+M
...
U-1: pending only
U:   popDuePayout → AddBalance(addr_U, amt_U) → clear slots
U+1: nothing due for U anymore
`,
      },
      {
        id: "validation-and-security",
        icon: ShieldCheck,
        title: "Validation & Security Properties",
        tagline: "Deterministic unlocks, replay‑safe, and reorg‑resilient.",
        bullets: [
          "Unlock logic is computed from canonical height; no signatures or off‑chain triggers required.",
          "Amounts are protocol‑computed (calcBlockReward) — peers cannot inflate payouts.",
          "State key presence is the ‘due’ indicator; double‑spend is prevented by clearing after credit.",
          "Maturity defers miner spendability, reducing incentives for near‑tip reorgs to capture fees+subsidy immediately.",
        ],
        codeTitle: "Due detection & clearing",
        code: `popDuePayout(state, H):
  rawAmt  = state.Get(lockbox, schedKeyAmt(H))
  if rawAmt == 0: return (zero, 0, false)
  rawAddr = state.Get(lockbox, schedKeyAddr(H))
  state.Set(lockbox, schedKeyAmt(H), 0)
  state.Set(lockbox, schedKeyAddr(H), 0)
  return (Address(rawAddr), BigInt(rawAmt), true)
`,
      },
      {
        id: "reorg-behavior",
        icon: GitFork,
        title: "Reorg Behavior",
        tagline: "What happens if the chain reorganizes around unlock heights.",
        bullets: [
          "On reorg, state is recomputed from the new canonical chain; scheduled entries reflect the canonical sequence of blocks.",
          "If a payout occurred at height H on the old tip but not on the new chain, state replay will only credit what is due under the new history.",
          "Because entries are keyed by height, \"phantom credits\" cannot survive a reorg — cleared/uncleared status follows canonical execution.",
          "This mirrors how balances and receipts re‑compute during block re‑execution.",
        ],
        codeTitle: "Conceptual reorg pseudocode",
        code: `ReorgTo(newTip):
  rewind state → parent of fork
  for block in pathTo(newTip):
    Execute(block) // schedules & payouts naturally recompute
`,
      },
      {
        id: "configuration",
        icon: KeySquare,
        title: "Configuration",
        tagline: "Where the maturity parameter lives and how clients consume it.",
        bullets: [
          "Maturity M is defined as 100 blocks",
          "Clients must display both ‘pending’ (scheduled) and ‘spendable’ balances for miners.",
          "Explorers can show upcoming unlocks by scanning for non‑zero schedKeyAmt(h).",
          "Wallets should warn miners that reward UTXOs (account credits) are not available until height U.",
        ],
        codeTitle: "Explorer hint (pseudo‑RPC)",
        code: `for h in [current..current+K]:
  if getState(lockbox, schedKeyAmt(h)) != 0:
    // list upcoming payout at height h
`,
      },
    ],
    []
  );

  const ParamsTable = () => (
    <Card>
      <CardHeader>
        <ChevronRight />
        <CardTitle className="text-xl">Maturity Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Parameter</TableHead>
              <TableHead className="whitespace-nowrap">Symbol</TableHead>
              <TableHead className="whitespace-nowrap">Value / Source</TableHead>
              <TableHead className="whitespace-nowrap">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Coinbase maturity blocks</TableCell>
              <TableCell>M</TableCell>
              <TableCell>100 blocks</TableCell>
              <TableCell>Bitcoin-like coinbase maturity</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Lockbox address</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                <span className="font-mono break-all text-xs">
                  0x0000000000000000000000000000000000000042
                </span>
              </TableCell>
              <TableCell>Reserved system account</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Key prefixes</TableCell>
              <TableCell>—</TableCell>
              <TableCell>
                <span className="font-mono break-all text-xs">
                  {"\"maturity:addr:\", \"maturity:amt:\""}
                </span>
              </TableCell>
              <TableCell>Keccak256(prefix || big-endian height)</TableCell>
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
          title="Coinbase Maturity Scheduling"
          subTitle="How Parallax escrows miner subsidies until maturity using deterministic, canonical state updates."
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

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"} className="w-full sm:w-fit">
          <Link href="/introduction/protocol/block-reward-and-halving">
            <ChevronLeft />
            Block Reward & Halving
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit">
          <Link href="/introduction/protocol/difficulty-and-forkchoice">
            Difficulty Algorithm
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
