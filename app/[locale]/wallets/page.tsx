import AddNetworkSection from "@/components/add-network-section";
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Download, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const wallets = [
  {
    name: "MetaMask",
    image: "/wallets/metamask.png",
    url: "https://metamask.io",
    recommended: true,
  },
  {
    name: "Coinbase Wallet",
    image: "/wallets/base.png",
    url: "https://wallet.coinbase.com",
    recommended: true,
  },
  {
    name: "Trust Wallet",
    image: "/wallets/trust.png",
    url: "https://trustwallet.com",
    recommended: true,
  },
  {
    name: "Rabby Wallet",
    image: "/wallets/rabby.png",
    url: "https://rabby.io",
  },
  {
    name: "Atomic Wallet",
    image: "/wallets/atomic.png",
    url: "https://atomicwallet.io",
  },
  {
    name: "CTRL Wallet",
    image: "/wallets/ctrl.png",
    url: "https://ctrl.xyz",
  },
  {
    name: "Brave Wallet",
    image: "/wallets/brave.png",
    url: "https://brave.com/wallet",
  },
  {
    name: "Phantom",
    image: "/wallets/phantom.png",
    url: "https://phantom.com",
  },
  {
    name: "Rainbow",
    image: "/wallets/rainbow.png",
    url: "https://rainbow.me",
  },
  {
    name: "Zerion",
    image: "/wallets/zerion.png",
    url: "https://zerion.io",
  },
  {
    name: "Frame",
    image: "/wallets/frame.png",
    url: "https://frame.sh",
  },
]
export default async function Page() {
  const t = await getTranslations("wallets")
  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-16">
        <AddNetworkSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {wallets.map((wallet) => (
            <a key={wallet.name} href={wallet.url} target="_blank" rel="noopener" className="block">
              <Card className="group relative h-full hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)] transition-all duration-300 cursor-pointer">
                {"recommended" in wallet && wallet.recommended && (
                  <Badge className="absolute top-3 right-3 bg-brand/15 text-brand border-brand/30 hover:bg-brand/20 text-[0.65rem] font-medium">
                    {t("beginnerFriendly")}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-center">{wallet.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <Image src={wallet.image} alt={wallet.name} width={200} height={200} className="rounded-2xl" />
                  </div>
                  <div className="flex gap-4 justify-center">
                    <span className="inline-flex items-center text-base text-muted-foreground group-hover:text-foreground transition-colors">
                      {t("getWallet", { name: wallet.name })}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
        <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center">
          <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">{t("runClient.eyebrow")}</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("runClient.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="brand-gradient text-brand-foreground hover:opacity-90" asChild>
              <Link href="/resources/parallax-client">
                <Download className="mr-2 h-5 w-5" />
                {t("runClient.download")}
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://docs.parallaxprotocol.org/guides/client/introduction" target="_blank" rel="noopener">
                {t("runClient.setupGuide")}
                <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
