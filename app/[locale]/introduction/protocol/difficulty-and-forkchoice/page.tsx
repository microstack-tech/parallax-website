"use client";

import { Link } from "@/i18n/navigation";
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
import { useTranslations } from "next-intl";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type RawSection = {
  title: string;
  tagline: string;
  bullets: string[];
  codeTitle: string;
};

type ParamRow = { param: string; symbol: string; value: string; notes: string };

const SECTION_IDS = [
  "overview",
  "target-and-difficulty",
  "retargeting",
  "median-time-past",
  "fork-choice",
  "reorgs-finality",
  "attacks-and-mitigations",
] as const;

const SECTION_ICONS = [Gauge, Gauge, TimerReset, TimerReset, GitFork, ShieldCheck, TriangleAlert];

const SECTION_CODE: string[] = [
  "",
  `// Given difficulty D (big integer)
TWO256M1 = (1n << 256n) - 1n
target   = TWO256M1 / D
valid    = BigIntFromBytes(result) <= target
`,
  `// Difficulty selection by era
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
  `MTP(n):
  ts = timestamps(n, upTo=11) // back from n inclusive
  sort(ts)
  return ts[len(ts)//2]
`,
  `Work(block):
  target = TWO256M1 / Difficulty(block)
  // Use an approximation that preserves ordering; e.g.,
  return TWO256M1 / (target + 1)

SelectBest(tips):
  return argmax(tips, ChainWork[tip])
`,
  `OnNewTip(candidate):
  if ChainWork[candidate] > ChainWork[currentTip]:
    currentTip = candidate
    ReorgTo(candidate)
`,
  `ValidHeader(h, parent):
  require(len(h.Extra) <= MaximumExtraDataSize)
  require(h.Time <= now() + 300)
  require(h.Time > MTP(parent))
  require(h.Difficulty > 0)
  // difficulty rules depend on height:
  //   < 17560: BTC-style DAA epoch invariants
  //   ≥ 17560: ASERT anchor-based invariants
  // PoW: MixDigest match & XHash(h) <= targetFrom(D)
`,
];

export default function Page() {
  const t = useTranslations("introduction.protocol.difficultyAndForkchoice");
  const rawSections = t.raw("sections") as RawSection[];
  const sections = rawSections.map((s, i) => ({
    id: SECTION_IDS[i] ?? `section-${i}`,
    Icon: SECTION_ICONS[i] ?? Gauge,
    title: s.title,
    tagline: s.tagline,
    bullets: s.bullets,
    codeTitle: s.codeTitle,
    code: SECTION_CODE[i] ?? "",
  }));

  const paramRows = t.raw("params.rows") as ParamRow[];
  const pipelineSteps = t.raw("pipeline.steps") as string[];

  const ParamsTable = () => (
    <Card className="hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)] transition-all duration-300">
      <CardHeader>
        <ChevronRight className="text-brand" />
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
                <TableCell>{row.value}</TableCell>
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
            <Card className="hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)] transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <s.Icon className="size-6 text-brand" />
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

                {s.code ? (
                  <div className="min-w-0 border border-border bg-surface-elevated p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="font-medium">{s.codeTitle}</span>
                      </div>
                      <Badge variant="outline" className="rounded-full">{t("pseudocodeBadge")}</Badge>
                    </div>

                    {/* scrollable code without forcing container width */}
                    <pre className="w-full max-w-full overflow-x-auto whitespace-pre bg-background p-4 text-sm leading-relaxed border shadow-xs overscroll-x-contain [-webkit-overflow-scrolling:touch]">
                      <code className="block max-w-full">
                        {s.code}
                      </code>
                    </pre>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </motion.section>
        ))}
      </div>

      {/* Flow Summary */}
      <div className="mt-10 grid gap-4 border border-border p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-brand">{t("pipeline.eyebrow")}</span>
        <h2 className="text-xl font-semibold">{t("pipeline.heading")}</h2>
        <p className="text-muted-foreground">
          {t("pipeline.description")}
        </p>
        <div className="grid gap-3 md:grid-cols-5">
          {pipelineSteps.map((step, idx) => (
            <div key={step} className="border border-border bg-card/50 backdrop-blur-sm p-4 text-center">
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
            {t("nav.prev")}
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90">
          <Link href="/introduction/protocol/xhash">
            {t("nav.next")}
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
