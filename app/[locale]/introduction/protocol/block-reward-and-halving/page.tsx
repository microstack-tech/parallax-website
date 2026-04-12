"use client";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { BarChart4, ChevronLeft, ChevronRight, Clock, Coins, Database, LineChartIcon, Sigma } from "lucide-react";
import { useTranslations } from "next-intl";
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

type RawSection = {
  title: string;
  tagline: string;
  bullets: string[];
  codeTitle: string;
};

type ParamRow = { param: string; symbol: string; value: string; notes: string };

const SECTION_IDS = ["overview", "maturity-scheduling", "economic-properties", "state-representation"] as const;
const SECTION_ICONS = [Coins, Clock, Sigma, Database];

const SECTION_CODE: string[] = [
  `calcBlockReward(height):
  if height == 0:
    return 0
  reward = 50 * 1e18
  halvings = height / 210000
  if halvings > 63:
    return 0  // reward effectively zero
  divisor = 2 ** halvings
  return reward / divisor
`,
  `Finalize(block):
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
  `totalIssued(upToHeight):
  sum = 0
  for h in 1..upToHeight:
    sum += calcBlockReward(h)
  return sum
// approaches 21e6 * 1e18 wei
`,
  `schedKeyAddr(height):
  return keccak256("maturity:addr:" || height)

schedKeyAmt(height):
  return keccak256("maturity:amt:" || height)
`,
];

export default function Page() {
  const t = useTranslations("introduction.protocol.blockRewardAndHalving");
  const rawSections = t.raw("sections") as RawSection[];
  const sections = rawSections.map((s, i) => ({
    id: SECTION_IDS[i] ?? `section-${i}`,
    Icon: SECTION_ICONS[i] ?? Coins,
    title: s.title,
    tagline: s.tagline,
    bullets: s.bullets,
    codeTitle: s.codeTitle,
    code: SECTION_CODE[i] ?? "",
  }));

  const paramRows = t.raw("params.rows") as ParamRow[];

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
    <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
      <CardHeader>
        <ChevronRight className="text-gold" />
        <CardTitle>{t("params.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("params.columns.parameter")}</TableHead>
              <TableHead>{t("params.columns.symbol")}</TableHead>
              <TableHead>{t("params.columns.value")}</TableHead>
              <TableHead>{t("params.columns.notes")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paramRows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.param}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>
                  {row.value.startsWith("0x") ? (
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

  const Charts = () => (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Cumulative supply */}
      <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
        <CardHeader>
          <LineChartIcon className="text-gold" />
          <CardTitle>{t("charts.cumulative.title")}</CardTitle>
        </CardHeader>
        <CardDescription>
          {t("charts.cumulative.description")}
        </CardDescription>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={epochs} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" tickFormatter={(v) => `E${v}`} />
              <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip formatter={(v: number) => [`${v.toLocaleString()} LAX`, t("charts.cumulative.valueLabel")]} labelFormatter={(l) => t("charts.cumulative.epochLabel", { n: String(l) })} />
              <ReferenceLine y={21_000_000} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="cumulative" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>


      {/* Per-block reward */}
      <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
        <CardHeader>
          <BarChart4 className="text-gold" />
          <CardTitle>{t("charts.perBlock.title")}</CardTitle>
        </CardHeader>
        <CardDescription>{t("charts.perBlock.description")}</CardDescription>
        <CardContent className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={epochs} margin={{ top: 8, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="epoch" tickFormatter={(v) => `E${v}`} />
              <YAxis />
              <Tooltip formatter={(v: number) => [`${v} LAX`, t("charts.perBlock.rewardLabel")]} labelFormatter={(l) => t("charts.perBlock.epochLabel", { n: String(l) })} />
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
            <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
              <CardHeader>
                <s.Icon className="size-6 text-gold" />
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardDescription>{s.tagline}</CardDescription>
              <CardContent className="grid min-w-0 gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <ul className="min-w-0 space-y-3 leading-relaxed">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
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

      <div className="mt-10 grid gap-4 border border-border p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-gold">{t("summary.eyebrow")}</span>
        <h2 className="text-xl font-semibold">{t("summary.heading")}</h2>
        <p className="text-muted-foreground">
          {t("summary.description")}
        </p>
      </div>

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"} className="w-full sm:w-fit">
          <Link href="/introduction/protocol/architecture">
            <ChevronLeft />
            {t("nav.prev")}
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit bg-gold text-gold-foreground hover:bg-gold/90">
          <Link href="/introduction/protocol/coinbase-maturity">
            {t("nav.next")}
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
