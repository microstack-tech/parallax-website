"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Layers,
  Lock
} from "lucide-react";
import { useTranslations } from "next-intl";

import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type RawSection = {
  title: string;
  tagline: string;
  bullets: string[];
  codeTitle: string;
};

type FitItem = { label: string; desc: string };

const SECTION_IDS = ["digital-signatures", "pvm", "timestamp-server", "nakamoto-consensus"] as const;
const SECTION_ICONS = [Lock, Cpu, Layers, BrainCircuit];

const SECTION_CODE: string[] = [
  `// Pseudocode: PVM-side validation sketch
verify(tx):
  msg = keccak256(encodeTxForSig(tx))
  pub = ecrecover(msg, tx.v, tx.r, tx.s)
  require(address(pub) == tx.from)
  require(tx.nonce == account.nonce)
  // gas accounting & state updates proceed
`,
  `// Conceptual block processing
for (tx of block.txs):
  result = PVM.execute(tx, state)
commit:
  stateRoot    = MPT(state)
  receiptsRoot = MPT(receipts)
  header.stateRoot = stateRoot
  header.receiptsRoot = receiptsRoot
`,
  `// Block header sketch
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
  `// Choose chain with max cumulative work
best = argmax(chains, sum(block.work for block in chain))
`,
];

export default function Page() {
  const t = useTranslations("introduction.protocol.architecture");
  const rawSections = t.raw("sections") as RawSection[];
  const sections = rawSections.map((s, i) => ({
    id: SECTION_IDS[i] ?? `section-${i}`,
    Icon: SECTION_ICONS[i] ?? Lock,
    title: s.title,
    tagline: s.tagline,
    bullets: s.bullets,
    codeTitle: s.codeTitle,
    code: SECTION_CODE[i] ?? "",
  }));

  const fitItems = t.raw("howItFits.items") as FitItem[];
  const pipelineSteps = t.raw("pipeline.steps") as string[];

  const HowItFits = () => (
    <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
      <CardHeader>
        <ChevronRight className="size-6 text-gold" />
        <CardTitle>{t("howItFits.title")}</CardTitle>
      </CardHeader>
      <CardDescription>
        {t("howItFits.description")}
      </CardDescription>
      <CardContent className="grid min-w-0 gap-4 md:grid-cols-4">
        {fitItems.map((x) => (
          <div key={x.label} className="min-w-0 border border-border p-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              <span className="font-medium">{x.label}</span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">{x.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-0 pb-8 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex min-w-0 flex-col gap-6"
      >
        <PageHeader
          title={t("pageTitle")}
          subTitle={t("pageSubtitle")}
        />

        <nav className="flex flex-wrap items-center justify-center gap-2 text-sm">
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
            <Card className="hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)] transition-all duration-300">
              <CardHeader>
                <s.Icon className="size-6 text-gold" />
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardDescription>
                {s.tagline}
              </CardDescription>
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

      {/* Interplay Diagram (textual) */}
      <div className="mt-10 grid min-w-0 gap-4 border border-border p-6">
        <span className="font-mono text-xs uppercase tracking-widest text-gold">{t("pipeline.eyebrow")}</span>
        <h2 className="text-xl font-semibold">{t("pipeline.heading")}</h2>
        <p className="text-muted-foreground">
          {t("pipeline.description")}
        </p>
        <div className="grid min-w-0 gap-3 md:grid-cols-5">
          {pipelineSteps.map((step, idx) => (
            <div key={step} className="min-w-0 border border-border bg-card/50 backdrop-blur-sm p-4 text-center">
              <div className="text-2xl font-semibold">{idx + 1}</div>
              <div className="mt-2">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Links to related docs */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-4">
        <Button asChild variant={"secondary"} className="w-full sm:w-fit">
          <Link href="/introduction/protocol/overview">
            <ChevronLeft />
            {t("nav.prev")}
          </Link>
        </Button>
        <Button asChild className="w-full sm:w-fit bg-gold text-gold-foreground hover:bg-gold/90">
          <Link href="/introduction/protocol/block-reward-and-halving">
            {t("nav.next")}
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
