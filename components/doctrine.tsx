'use client'
import {
  BookText,
  ScrollText,
  ExternalLink,
  Mountain,
  Timer,
  Shield,
  Signature,
  Scale,
  KeyRound,
  Network,
  Eye,
  Layers,
  Ghost,
  GitBranch,
} from "lucide-react"
import { useTranslations } from "next-intl"
import MainMotion from "./main-motion"
import PageHeader from "./page-header"
import { Button } from "./ui/button"
import { FadeIn, Hairline } from "./fade-in"

type RawAxiom = {
  id: string
  title: string
  subtitle: string
  commentary: string
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  I: Mountain,
  II: Timer,
  III: Shield,
  IV: Signature,
  V: Scale,
  VI: KeyRound,
  VII: Network,
  VIII: Eye,
  IX: Layers,
  X: ScrollText,
  XI: BookText,
  XII: GitBranch,
  XIII: Ghost,
}

function Paragraphs({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((p, i) => (
        <p key={i} className="text-sm leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  )
}

export function Doctrine() {
  const t = useTranslations("introduction.doctrine")
  const axioms = t.raw("axioms") as RawAxiom[]

  return (
    <>
      <MainMotion>
        <PageHeader
          title={t("pageTitle")}
          subTitle={t("pageSubtitle")}
        />
        <section className="flex flex-col gap-4 bg-card/50 backdrop-blur-sm max-w-7xl border border-border rounded-xl font-sans text-foreground/90 px-8 py-12 mx-auto items-start">
          <div className="mx-auto">
            <header className="text-center">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant={"secondary"} asChild>
                  <a
                    href="https://github.com/ParallaxProtocol/parallax-doctrine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    {t("buttons.canonicalSource")}
                  </a>
                </Button>

                <Button variant={"secondary"} asChild>
                  <a
                    href="https://github.com/ParallaxProtocol/parallax-doctrine/blob/main/AXIOMS.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ScrollText className="size-4" />
                    {t("buttons.axioms")}
                  </a>
                </Button>

                <Button variant={"secondary"} asChild>
                  <a
                    href="https://github.com/ParallaxProtocol/parallax-doctrine/blob/main/COMMENTARY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookText className="size-4" />
                    {t("buttons.commentary")}
                  </a>
                </Button>
              </div>
            </header>

            <Hairline className="mt-12" />

            <section className="mt-12 space-y-10">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t("intro.heading")}</h3>
                <p className="text-base italic leading-relaxed">
                  {t("intro.date")}<br />
                  {t("intro.author")}
                </p>
                <p className="text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw("intro.body1") as string }} />
                <p className="text-base leading-relaxed">
                  {t("intro.body2Line1")}<br />
                  {t("intro.body2Line2")}
                </p>
                <p className="text-base leading-relaxed">
                  {t("intro.body3")}
                </p>
              </div>

              <Hairline />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t("purpose.heading")}</h3>
                <p className="text-base leading-relaxed">
                  {t("purpose.body1")}
                </p>
                <p className="text-base leading-relaxed">
                  {t("purpose.body2Line1")}<br />
                  {t("purpose.body2Line2")}<br />
                  {t("purpose.body2Line3")}
                </p>
                <p className="text-base leading-relaxed">
                  {t("purpose.body3")}
                </p>
              </div>

              <Hairline />

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{t("scope.heading")}</h3>
                <p className="text-base leading-relaxed">
                  {t("scope.body1")}
                </p>
                <p className="text-base leading-relaxed">
                  {t("scope.body2")}
                </p>
                <p className="text-base leading-relaxed">
                  {t("scope.body3")}
                </p>
              </div>

              <Hairline />

              <div className="space-y-16">
                {axioms.map(({ id, title, subtitle, commentary }) => {
                  const Icon = ICONS[id] ?? ScrollText
                  return (
                    <FadeIn key={id}>
                      <article className="scroll-mt-24" id={`axiom-${id}`}>
                        <div className="flex items-start gap-4">
                          <div className="min-w-0">
                            <h4 className="text-xl font-semibold leading-snug text-foreground">
                              <span className="text-2xl font-serif text-brand mr-2">
                                {id}
                              </span>
                              {title}
                            </h4>

                            <p className="mt-3 text-base text-foreground/90 leading-relaxed">{subtitle}</p>

                            <div className="mt-6 border-l-2 border-brand bg-card/50 p-6">
                              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <span className="inline-flex size-6 items-center justify-center">
                                  <Icon className="size-4 text-brand" />
                                </span>
                                {t("commentaryLabel")}
                              </div>
                              <div className="mt-3 text-foreground/80">
                                <Paragraphs text={commentary} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <Hairline className="mt-16" />
                      </article>
                    </FadeIn>
                  )
                })}
              </div>

              <FadeIn>
                <div className="space-y-4 pt-2">
                  <h3 className="text-xl font-semibold text-foreground">{t("closing.heading")}</h3>

                  <p className="text-base leading-relaxed">
                    {t("closing.body1")}
                  </p>

                  <p className="text-base leading-relaxed">
                    {t("closing.body2")}
                  </p>

                  <p className="text-base leading-relaxed">
                    {t("closing.body3Line1")} <br />
                    {t("closing.body3Line2")} <br />
                    {t("closing.body3Line3")}
                  </p>

                  <p className="text-base leading-relaxed">
                    {t("closing.body4")}
                  </p>
                </div>
              </FadeIn>
            </section>
          </div>
        </section>
      </MainMotion>
    </>
  )
}
