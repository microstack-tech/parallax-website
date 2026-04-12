'use client'
import { Link } from "@/i18n/navigation"
import { CircleSlash, Hexagon } from "lucide-react"
import { useTranslations } from "next-intl"
import { FaGithub } from "react-icons/fa"
import ClientDownloadButton from "./client-download-button"
import { FadeIn } from "./fade-in"

export default function Client() {
  const t = useTranslations("home.client")
  return (
    <section className="relative py-24 z-10 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">{t("eyebrow")}</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">{t("heading")}</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Two concept columns */}
        <FadeIn delay={0.1}>
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-0">
            <div className="pr-0 sm:pr-10 sm:border-r border-border pb-8 sm:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <Hexagon className="size-5 text-gold" />
                <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">{t("decentralized.title")}</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("decentralized.description")}
              </p>
              <Link
                href="/resources/network-atlas"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                {t("decentralized.cta")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="pl-0 sm:pl-10 pt-8 sm:pt-0 border-t sm:border-t-0 border-border">
              <div className="flex items-center gap-3 mb-4">
                <CircleSlash className="size-5 text-gold" />
                <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">{t("noVoting.title")}</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("noVoting.description")}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Blockquote */}
        <FadeIn delay={0.15}>
          <blockquote className="my-16 border-l-2 border-gold pl-8 py-2">
            <p className="text-lg italic text-muted-foreground leading-relaxed">
              {t("blockquote")}
            </p>
          </blockquote>
        </FadeIn>

        {/* Download CTA banner */}
        <FadeIn delay={0.2}>
          <div className="bg-surface-elevated border border-border rounded-sm p-8 sm:p-12 text-center">
            <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">{t("runNode.title")}</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t("runNode.description")}
            </p>
            <div className="flex flex-col items-center">
              <ClientDownloadButton variant="gui" />
            </div>
            <div className="mt-10 pt-6 border-t border-border/60 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
              <Link
                href="/resources/parallax-client"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                {t("cli")}
              </Link>
              <span aria-hidden="true" className="text-border">·</span>
              <Link
                href="/resources/parallax-client"
                className="hover:text-foreground transition-colors"
              >
                {t("quickStart")}
              </Link>
              <span aria-hidden="true" className="text-border">·</span>
              <a
                href="https://github.com/ParallaxProtocol"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <FaGithub className="size-3" />
                {t("github")}
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
