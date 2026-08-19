"use client"
import { FadeIn } from "@/components/fade-in"
import { GENESIS_HASH } from "@/components/genesis-proof"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { Check, ChevronRight, Copy } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

const RPC = "https://rpc.parallaxprotocol.org"

const CMD_GENESIS_HASH = `curl -s ${RPC} -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x0",false],"id":1}' \\
  | jq -r '.result.hash'`

const CMD_GENESIS_EXTRA = `curl -s ${RPC} -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x0",false],"id":1}' \\
  | jq -r '.result.extraData' | sed 's/^0x//' | xxd -r -p; echo`

const CMD_SUPPLY = `curl -s https://parallaxprotocol.org/api/circulating_supply`

const CMD_EMISSIONS = `curl -s https://parallaxprotocol.org/api/emissions`

const CMD_CHAIN_ID = `curl -s ${RPC} -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'`

const CMD_LATEST_BLOCK = `curl -s ${RPC} -X POST \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \\
  | jq '{number: .result.number, timestamp: .result.timestamp, gasLimit: .result.gasLimit}'`

function CommandBlock({
  label,
  command,
  copyLabel,
  copiedLabel,
}: {
  label: string
  command: string
  copyLabel: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — nothing to do
    }
  }

  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-4 mb-2">
        <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label={copyLabel}
        >
          {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="overflow-x-auto bg-muted rounded-lg border border-border p-4 text-xs leading-relaxed font-mono text-foreground/90">
        {command}
      </pre>
    </div>
  )
}

export default function VerifyPage() {
  const t = useTranslations("introduction.verify")
  const copyLabel = t("copy")
  const copiedLabel = t("copied")

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
        subTitle={t("pageSubtitle")}
      />

      <div className="mx-auto max-w-4xl px-6 sm:px-8 flex flex-col gap-16 pb-16">
        {/* Genesis */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-brand mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("genesis.heading")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("genesis.body1")}</p>
            <blockquote className="mt-6 border-l-2 border-l-brand pl-4 font-serif italic text-lg text-foreground">
              &ldquo;{t("genesis.headline")}&rdquo;
            </blockquote>
            <p className="mt-6 text-muted-foreground leading-relaxed">{t("genesis.body2")}</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="mt-6 flex flex-col gap-6">
              <div className="border border-border border-l-2 border-l-brand bg-card/50 px-4 py-3">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">{t("genesis.hashLabel")}</p>
                <p className="mt-1 font-mono text-xs sm:text-sm text-foreground/80 break-all">{GENESIS_HASH}</p>
              </div>
              <CommandBlock label={t("genesis.cmdHashLabel")} command={CMD_GENESIS_HASH} copyLabel={copyLabel} copiedLabel={copiedLabel} />
              <CommandBlock label={t("genesis.cmdExtraLabel")} command={CMD_GENESIS_EXTRA} copyLabel={copyLabel} copiedLabel={copiedLabel} />
            </div>
          </FadeIn>
        </section>

        {/* Supply */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-brand mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("supply.heading")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("supply.body1")}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("supply.body2")}</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="mt-6 flex flex-col gap-6">
              <CommandBlock label={t("supply.cmdSupplyLabel")} command={CMD_SUPPLY} copyLabel={copyLabel} copiedLabel={copiedLabel} />
              <CommandBlock label={t("supply.cmdEmissionsLabel")} command={CMD_EMISSIONS} copyLabel={copyLabel} copiedLabel={copiedLabel} />
            </div>
          </FadeIn>
        </section>

        {/* Rules */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-brand mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("rules.heading")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("rules.body1")}</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div className="mt-6 flex flex-col gap-6">
              <CommandBlock label={t("rules.cmdChainIdLabel")} command={CMD_CHAIN_ID} copyLabel={copyLabel} copiedLabel={copiedLabel} />
              <CommandBlock label={t("rules.cmdBlockLabel")} command={CMD_LATEST_BLOCK} copyLabel={copyLabel} copiedLabel={copiedLabel} />
            </div>
          </FadeIn>
        </section>

        {/* Run your own node */}
        <section>
          <FadeIn>
            <div className="border border-border border-l-2 border-l-brand bg-card/50 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl text-foreground">{t("node.heading")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("node.body1")}</p>
              <Button className="mt-6 w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90" asChild>
                <Link href={"/participate/running-a-full-node"}>
                  {t("node.cta")}
                  <ChevronRight />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </section>
      </div>
    </MainMotion>
  )
}
