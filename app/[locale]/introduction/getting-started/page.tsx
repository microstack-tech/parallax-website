"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { BookOpen, Building, ChevronRight, ExternalLink, Eye, HandCoins, Scale, Store, Wallet } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function GettingStarted() {
  const t = useTranslations("introduction.gettingStarted")
  const [activeTab, setActiveTab] = useState<"use" | "accept">("use")

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
        subTitle={t("pageSubtitle")}
      />
      <section className="container mx-auto px-6 sm:px-8 xl:px-0 max-w-7xl py-0">
        {/* Navigation Tabs */}
        <div className="flex justify-center my-16">
          <div className="flex flex-col sm:flex-row gap-2 bg-surface-elevated border border-border p-2">
            <Button
              size={"xl"}
              onClick={() => setActiveTab("use")}
              className={activeTab === "use"
                ? "brand-gradient text-brand-foreground hover:opacity-90"
                : ""}
              variant={activeTab === "use" ? "default" : "secondary"}
            >
              {t("tabs.use")}
            </Button>
            <Button
              size={"xl"}
              onClick={() => setActiveTab("accept")}
              className={activeTab === "accept"
                ? "brand-gradient text-brand-foreground hover:opacity-90"
                : ""}
              variant={activeTab === "accept" ? "default" : "secondary"}
            >
              {t("tabs.accept")}
            </Button>
          </div>
        </div>

        {activeTab === "use" && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <BookOpen className="size-6 text-brand" />
                  <CardTitle>{t("use.inform.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {t("use.inform.description")}
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/introduction/how-it-works"}>
                      {t("use.inform.cta")} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Wallet className="size-6 text-brand" />
                  <CardTitle>{t("use.wallet.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  {t("use.wallet.description")}
                </div>
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/wallets"}>
                      {t("use.wallet.cta")} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HandCoins className="size-6 text-brand" />
                  <CardTitle>{t("use.get.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  {t("use.get.description")}
                </div>
                <div className="flex flex-col md:flex-row w-full justify-end mt-8 gap-4">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <a href="https://docs.parallaxprotocol.org/guides/mining" target="_blank" rel="noopener noreferrer">
                      {t("use.get.mining")} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/exchanges"}>
                      {t("use.get.exchanges")}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Store className="size-6 text-brand" />
                  <CardTitle>{t("use.spend.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  {t("use.spend.description")}
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/resources/community"}>
                      {t("use.spend.cta")} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "accept" && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="size-6 text-brand" />
                  <CardTitle>{t("accept.inform.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {t("accept.inform.description")}
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/introduction/how-it-works"}>
                      {t("accept.inform.cta")} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="size-6 text-brand" />
                  <CardTitle>{t("accept.processing.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  {t("accept.processing.description")}
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/wallets"}>
                      {t("accept.processing.cta")} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Scale className="size-6 text-brand" />
                  <CardTitle>{t("accept.taxes.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  {t("accept.taxes.description")}
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <a href="https://en.bitcoin.it/wiki/Tax_compliance" target="_blank" rel="noopener noreferrer">
                      {t("accept.taxes.cta")} <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="size-6 text-brand" />
                  <CardTitle>{t("accept.visibility.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  {t("accept.visibility.description")}
                </div>
                <div className="inline-flex w-full justify-end mt-8 gap-2">
                  <Button variant="secondary" asChild className="w-full sm:w-fit">
                    <Link href={"/resources/community"}>
                      {t("accept.visibility.cta")} <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 bg-surface-elevated border border-border p-8 sm:p-12 text-center">
          <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">{t("ready.heading")}</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("ready.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="brand-gradient text-brand-foreground hover:opacity-90" asChild>
              <Link href={"/wallets"}>
                {t("ready.chooseWallet")}
                <ChevronRight />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://docs.parallaxprotocol.org/guides/wallets" target="_blank" rel="noopener noreferrer">
                {t("ready.setupGuide")}
                <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
