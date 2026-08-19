'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpenCheck, ExternalLink, FileText, NotebookText } from "lucide-react"
import { useTranslations } from "next-intl"
import { FadeIn } from "./fade-in"

const docs = [
  { key: "beginnerGuides", icon: BookOpenCheck, href: "https://docs.parallaxprotocol.org/guides", external: true },
  { key: "technicalDocumentation", icon: NotebookText, href: "https://docs.parallaxprotocol.org", external: true },
  { key: "whitepaper", icon: FileText, href: "/parallax.pdf", external: true },
] as const

export function Documentation() {
  const t = useTranslations("home.documentation")
  const tCommon = useTranslations("common")
  return (
    <section className="py-24 px-6 sm:px-8">
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

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc, i) => {
            const Icon = doc.icon
            const title = t(`${doc.key}.title` as "beginnerGuides.title")
            const description = t(`${doc.key}.description` as "beginnerGuides.description")
            const linkProps = doc.external
              ? { href: doc.href, target: "_blank", rel: "noopener" }
              : { href: doc.href }
            const LinkComponent = doc.external ? "a" : Link
            return (
              <FadeIn key={doc.key} delay={i * 0.1}>
                <LinkComponent {...linkProps} className="group block h-full">
                  <Card className="h-full transition-[border-color,box-shadow] duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Icon className="size-6 text-muted-foreground group-hover:text-brand transition-colors" />
                          <CardTitle>{title}</CardTitle>
                        </div>
                        {doc.external ? (
                          <ExternalLink className="size-4 text-muted-foreground/50" />
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-between flex-1">
                      <p className="text-base text-muted-foreground">{description}</p>
                      <div className="flex items-center gap-2 mt-6 text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                        {tCommon("readMore")}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </LinkComponent>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
