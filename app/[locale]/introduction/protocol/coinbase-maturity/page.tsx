"use client";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, Database, GitFork, KeySquare, RefreshCw, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

type RawSection = {
  title: string;
  tagline: string;
  bullets: string[];
  codeTitle: string;
};

type ParamRow = { param: string; symbol: string; value: string; notes: string };

const SECTION_IDS = [
  "overview",
  "state-keys",
  "payout-lifecycle",
  "validation-and-security",
  "reorg-behavior",
  "configuration",
] as const;

const SECTION_ICONS = [Clock, Database, RefreshCw, ShieldCheck, GitFork, KeySquare];

const SECTION_CODE: string[] = [
  `Finalize(header, state):
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
  `schedKeyAddr(H):
  b = bigEndianUint64(H)
  return keccak256("maturity:addr:" || b)

schedKeyAmt(H):
  b = bigEndianUint64(H)
  return keccak256("maturity:amt:" || b)
`,
  `N:   mine block, schedule payout for U=N+M
...
U-1: pending only
U:   popDuePayout → AddBalance(addr_U, amt_U) → clear slots
U+1: nothing due for U anymore
`,
  `popDuePayout(state, H):
  rawAmt  = state.Get(lockbox, schedKeyAmt(H))
  if rawAmt == 0: return (zero, 0, false)
  rawAddr = state.Get(lockbox, schedKeyAddr(H))
  state.Set(lockbox, schedKeyAmt(H), 0)
  state.Set(lockbox, schedKeyAddr(H), 0)
  return (Address(rawAddr), BigInt(rawAmt), true)
`,
  `ReorgTo(newTip):
  rewind state → parent of fork
  for block in pathTo(newTip):
    Execute(block) // schedules & payouts naturally recompute
`,
  `for h in [current..current+K]:
  if getState(lockbox, schedKeyAmt(h)) != 0:
    // list upcoming payout at height h
`,
];

export default function Page() {
  const t = useTranslations("introduction.protocol.coinbaseMaturity");
  const rawSections = t.raw("sections") as RawSection[];
  const sections = rawSections.map((s, i) => ({
    id: SECTION_IDS[i] ?? `section-${i}`,
    Icon: SECTION_ICONS[i] ?? Clock,
    title: s.title,
    tagline: s.tagline,
    bullets: s.bullets,
    codeTitle: s.codeTitle,
    code: SECTION_CODE[i] ?? "",
  }));

  const paramRows = t.raw("params.rows") as ParamRow[];

  const ParamsTable = () => (
    <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
      <CardHeader>
        <ChevronRight className="text-gold" />
        <CardTitle className="text-xl">{t("params.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">{t("params.columns.parameter")}</TableHead>
              <TableHead className="whitespace-nowrap">{t("params.columns.symbol")}</TableHead>
              <TableHead className="whitespace-nowrap">{t("params.columns.value")}</TableHead>
              <TableHead className="whitespace-nowrap">{t("params.columns.notes")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paramRows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.param}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>
                  {row.value.startsWith("0x") || row.value.startsWith("\"") ? (
                    <span className="font-mono break-all text-xs">{row.value}</span>
                  ) : (
                    row.value
                  )}
                </TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))}
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
          title={t("pageTitle")}
          subTitle={t("pageSubtitle")}
        />

        <nav className="flex flex-wrap justify-center items-center gap-2 text-sm">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="group inline-flex items-center gap-1">
              <span className="rounded-full bg-muted px-3 py-1 transition-colors group-hover:bg-muted/80">
                {s.title}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </a>
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
            <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
              <CardHeader>
                <s.Icon className="text-gold" />
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

                <div className="min-w-0 border border-border bg-surface-elevated p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <ChevronRight className="h-3.5 w-3.5" />
                      <span className="font-medium">{s.codeTitle}</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">{t("pseudocodeBadge")}</Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre bg-background p-4 text-sm leading-relaxed shadow-xs border overscroll-x-contain [-webkit-overflow-scrolling:touch]">
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
            {t("nav.prev")}
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit bg-gold text-gold-foreground hover:bg-gold/90">
          <Link href="/introduction/protocol/difficulty-and-forkchoice">
            {t("nav.next")}
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
