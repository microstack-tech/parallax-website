import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Pickaxe, SquareTerminal, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICONS = [SquareTerminal, Wallet, Pickaxe];
const HREFS = [
  "https://docs.parallaxprotocol.org/guides/client/introduction",
  "https://docs.parallaxprotocol.org/guides/wallets",
  "https://docs.parallaxprotocol.org/guides/mining/introduction",
];

type Guide = { title: string; description: string };

export default async function BeginnerGuidesPage() {
  const t = await getTranslations("resources.beginnerGuides");
  const tCommon = await getTranslations("resources.common");
  const guides = t.raw("guides") as Guide[];

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        {guides.map((guide, i) => {
          const Icon = ICONS[i];
          return (
            <a
              key={guide.title}
              href={HREFS[i]}
              target="_blank"
              rel="noopener"
              className="group block h-full"
            >
              <Card className="h-full transition-all duration-300 hover:border-brand/30 hover:shadow-[0_0_20px_-5px_var(--brand-muted)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon className="size-6 text-brand" />
                    <CardTitle>{guide.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-full">
                  <div>{guide.description}</div>
                  <div className="flex items-center gap-2 mt-6 text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground group-hover:text-brand transition-colors">
                    {tCommon("readMore")}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </a>
          );
        })}
      </section>
    </MainMotion>
  );
}
