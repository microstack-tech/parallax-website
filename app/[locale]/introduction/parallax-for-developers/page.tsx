"use client"
import { FadeIn } from "@/components/fade-in"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { FaGithub } from "react-icons/fa"

type NetworkRow = { label: string; value: string }
type RawItem = { title: string; description: string }

const HARDHAT_CONFIG = `import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: { evmVersion: "paris" },
  },
  networks: {
    parallax: {
      url: "https://rpc.parallaxprotocol.org",
      chainId: 2110,
    },
  },
};

export default config;`

const FOUNDRY_CONFIG = `[profile.default]
evm_version = "paris"

[rpc_endpoints]
parallax = "https://rpc.parallaxprotocol.org"`

function CodeCard({ title, code }: { title: string; code: string }) {
  return (
    <Card className="h-full min-w-0">
      <CardHeader>
        <CardTitle className="font-mono text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto bg-muted rounded-sm p-4 text-xs leading-relaxed font-mono text-foreground/90">
          {code}
        </pre>
      </CardContent>
    </Card>
  )
}

export default function ParallaxForDevelopers() {
  const t = useTranslations("introduction.parallaxForDevelopers")
  const networkRows = t.raw("network.rows") as NetworkRow[]
  const differences = t.raw("differences.items") as RawItem[]

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
        subTitle={t("pageSubtitle")}
      />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-0 flex flex-col gap-16 pb-16">
        {/* Network facts */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-brand mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("network.heading")}</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <Card className="mt-8">
              <CardContent className="p-0">
                <dl className="divide-y divide-border">
                  {networkRows.map((row) => (
                    <div key={row.label} className="grid sm:grid-cols-[14rem_1fr] gap-1 sm:gap-4 px-6 py-3">
                      <dt className="text-sm text-muted-foreground">{row.label}</dt>
                      <dd className="font-mono text-sm text-foreground/90 break-all">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        {/* Compiler config */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-brand mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("config.heading")}</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">{t("config.tagline")}</p>
          </FadeIn>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <FadeIn delay={0.05}>
              <CodeCard title={t("config.hardhatTitle")} code={HARDHAT_CONFIG} />
            </FadeIn>
            <FadeIn delay={0.1}>
              <CodeCard title={t("config.foundryTitle")} code={FOUNDRY_CONFIG} />
            </FadeIn>
          </div>
        </section>

        {/* Differences */}
        <section>
          <FadeIn>
            <div className="w-12 h-0.5 bg-brand mb-6" />
            <h2 className="text-2xl sm:text-3xl text-foreground">{t("differences.heading")}</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">{t("differences.tagline")}</p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {differences.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {item.description}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Why */}
        <section>
          <FadeIn>
            <div className="border border-border border-l-2 border-l-brand bg-card/50 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl text-foreground">{t("why.heading")}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t("why.body")}</p>
            </div>
          </FadeIn>
        </section>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90" asChild>
            <a href="https://docs.parallaxprotocol.org" target="_blank" rel="noopener">
              {t("ctas.docs")}
              <ChevronRight />
            </a>
          </Button>
          <Button variant="outline" className="w-full sm:w-fit" asChild>
            <a href="https://explorer.parallaxprotocol.org" target="_blank" rel="noopener">
              {t("ctas.explorer")}
              <ExternalLink />
            </a>
          </Button>
          <Button variant="outline" className="w-full sm:w-fit" asChild>
            <a href="https://github.com/ParallaxProtocol" target="_blank" rel="noopener">
              {t("ctas.github")}
              <FaGithub />
            </a>
          </Button>
        </div>
      </div>
    </MainMotion>
  )
}
