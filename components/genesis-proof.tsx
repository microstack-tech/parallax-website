'use client'
import { Link } from "@/i18n/navigation"
import { LucideChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeIn } from "./fade-in"

export const GENESIS_HASH = "0x96b239e015d50f5c3f11b80733e5f38c95882c072719507b7be1a59db4975457"

export function GenesisProof() {
  const t = useTranslations("home.genesis")
  return (
    <section className="relative z-10 px-6 py-20 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">{t("eyebrow")}</p>
          <blockquote className="font-serif italic text-xl sm:text-2xl text-foreground text-balance">
            &ldquo;{t("headline")}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">{t("headlineNote")}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="mt-8 border border-border border-l-2 border-l-gold bg-card/50 px-4 py-3 text-left">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">{t("hashLabel")}</p>
            <p className="mt-1 font-mono text-xs sm:text-sm text-foreground/80 break-all">{GENESIS_HASH}</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("supplyNote")}</p>
          <Link
            href="/introduction/verify"
            className="mt-6 inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors"
          >
            {t("cta")}
            <LucideChevronRight className="size-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
