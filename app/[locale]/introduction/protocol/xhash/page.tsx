"use client";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Cpu, ExternalLink, Hash, Layers, ShieldCheck, TimerReset } from "lucide-react";
import { useTranslations } from "next-intl";

type RawSection = {
  title: string;
  tagline: string;
  bullets: string[];
  codeTitle: string;
};

type ParamRow = { aspect: string; value: string; notes: string };

const SECTION_IDS = ["overview", "mining-loop", "verification", "epochs-dag", "retarget-anchors"] as const;
const SECTION_ICONS = [Hash, Cpu, ShieldCheck, Layers, TimerReset];

const SECTION_CODE: string[] = [
  `SealHash(header):
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
  `mine(header, cacheOrDataset):
  target = floor((2^256 - 1) / header.Difficulty)
  nonce  = random64()
  loop:
    (mix, res) = hashimoto(cacheOrDataset, SealHash(header), nonce)
    if mix == header.MixDigest and Big(res) <= target:
      return nonce
    nonce = (nonce + 1) mod 2^64
`,
  `verifySeal(h):
  require(h.Difficulty > 0)
  if fulldag:
    (mix, res) = hashimotoFull(dataset(epoch(h.Number)), SealHash(h), h.Nonce)
  else:
    (mix, res) = hashimotoLight(datasetSize(h.Number), cache(epoch(h.Number)), SealHash(h), h.Nonce)
  require(mix == h.MixDigest)
  target = floor((2^256 - 1) / h.Difficulty)
  require(Big(res) <= target)
`,
  `if newEpoch(height):
  regenerate cache
  if mining full: regenerate dataset
`,
  `verifyDifficulty(h, parent, anchor):
  expected = CalcAsertDifficulty(config, anchor, parent, h)
  require(h.Difficulty == expected)
`,
];

export default function Page() {
  const t = useTranslations("introduction.protocol.xhash");
  const rawSections = t.raw("sections") as RawSection[];
  const sections = rawSections.map((s, i) => ({
    id: SECTION_IDS[i] ?? `section-${i}`,
    Icon: SECTION_ICONS[i] ?? Hash,
    title: s.title,
    tagline: s.tagline,
    bullets: s.bullets,
    codeTitle: s.codeTitle,
    code: SECTION_CODE[i] ?? "",
  }));

  const paramRows = t.raw("params.rows") as ParamRow[];

  const ParamsTable = () => (
    <Card className="hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)] transition-all duration-300">
      <CardHeader>
        <ChevronRight className="text-brand" />
        <CardTitle>{t("params.title")}</CardTitle>
      </CardHeader>
      <CardDescription>
        <span dangerouslySetInnerHTML={{ __html: t.raw("params.description") as string }} />
      </CardDescription>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("params.columns.aspect")}</TableHead>
              <TableHead>{t("params.columns.value")}</TableHead>
              <TableHead>{t("params.columns.notes")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paramRows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.aspect}</TableCell>
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
    <div className="mx-auto max-w-6xl px-4 sm:px-8 xl:px-0 pb-8">
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
                <s.Icon className="text-brand" />
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
                    <Badge variant="outline" className="rounded-full">
                      {t("pseudocodeBadge")}
                    </Badge>
                  </div>

                  {/* scrollable code without forcing container width */}
                  <pre className="w-full max-w-full overflow-x-auto whitespace-pre bg-background p-4 text-sm leading-relaxed overscroll-x-contain [-webkit-overflow-scrolling:touch] border shadow-xs">
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
            {t("nav.prev")}
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90">
          <a
            href="https://docs.parallaxprotocol.org/parallax-protocol/foundational-topics/consensus/algorithms/xhash"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("nav.next")}
            <ExternalLink />
          </a>
        </Button>
      </div>
    </div>
  );
}
