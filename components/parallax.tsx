'use client'
import { Link } from "@/i18n/navigation"
import { LucideChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { FadeIn } from "./fade-in"
import { Button } from "./ui/button"

export function Parallax() {
  const t = useTranslations("home.parallax")
  return (
    <section className="relative z-10 px-6 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">{t("eyebrow")}</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">{t("heading")}</h2>
            <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        <div className="mt-24 grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Image */}
          <FadeIn>
            <figure className="mx-auto w-full lg:mx-0">
              <div className="relative aspect-[1000/652] w-full overflow-hidden rounded-sm">
                <Image
                  src="/the-death-of-socrates.png"
                  alt="The Death of Socrates"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/30 dark:to-background/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
              <figcaption className="mt-3 px-1 text-sm italic text-muted-foreground text-center lg:text-left font-serif">
                {t("imageCaption")}
              </figcaption>
            </figure>
          </FadeIn>

          {/* Text */}
          <FadeIn delay={0.15}>
            <div className="mx-auto text-justify text-base leading-relaxed text-foreground/60 sm:leading-8 lg:mx-0 lg:text-left lg:text-md lg:leading-9 space-y-4 bg-card/50 backdrop-blur-sm border border-border border-l-2 border-l-gold p-4 sm:p-8">
              <p>{t("body1")}</p>
              <p>{t("body2")}</p>
              <div className="flex w-full justify-end mt-8">
                <Button className="w-full sm:w-fit bg-gold text-gold-foreground hover:bg-gold/90" asChild>
                  <Link href={"/introduction/doctrine"}>
                    {t("cta")}
                    <LucideChevronRight />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
