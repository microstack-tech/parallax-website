import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { FadeIn } from "@/components/fade-in"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

const sections = ["browser", "hosting", "external", "contact"] as const

export default async function PrivacyPage() {
  const t = await getTranslations("privacy")

  return (
    <MainMotion>
      <PageHeader title={t("title")} subTitle={t("subtitle")} />

      <section className="pb-24 px-6 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground text-center">
              {t("updated")}
            </p>
            <p className="mt-12 text-base text-muted-foreground leading-relaxed text-pretty">
              {t("intro")}
            </p>
          </FadeIn>

          <div className="mt-16 flex flex-col gap-12">
            {sections.map((section, i) => (
              <FadeIn key={section} delay={i * 0.08}>
                <div className="border-l-2 border-l-brand/30 pl-6 py-1">
                  <h2 className="text-xs font-mono uppercase tracking-[0.15em] text-brand mb-3">
                    {t(`sections.${section}.title`)}
                  </h2>
                  {section === "external" ? (
                    <>
                      <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                        {t("sections.external.body1")}
                      </p>
                      <p className="mt-4 text-base text-muted-foreground leading-relaxed text-pretty">
                        {t("sections.external.body2")}
                      </p>
                    </>
                  ) : section === "contact" ? (
                    <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                      {t.rich("sections.contact.body", {
                        link: (chunks) => (
                          <Link
                            href="/resources/community"
                            className="text-brand hover:underline underline-offset-4"
                          >
                            {chunks}
                          </Link>
                        ),
                      })}
                    </p>
                  ) : (
                    <p className="text-base text-muted-foreground leading-relaxed text-pretty">
                      {t(`sections.${section}.body`)}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
