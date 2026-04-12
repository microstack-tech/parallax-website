import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Blocks, Layers, Server, SquareTerminal } from "lucide-react";
import { getTranslations } from "next-intl/server";

const ICONS = [Blocks, SquareTerminal, Layers, Server];
const HREFS = [
  "https://docs.parallaxprotocol.org/parallax-protocol/foundational-topics/introduction-to-parallax",
  "https://docs.parallaxprotocol.org/parallax-protocol/parallax-stack/introduction-stack",
  "https://docs.parallaxprotocol.org/parallax-protocol/advanced/bridges",
  "https://docs.parallaxprotocol.org/parallax-client/getting-started/introduction",
];

type Doc = { title: string; description: string };

export default async function TechnicalDocumentationPage() {
  const t = await getTranslations("resources.technicalDocumentation");
  const tCommon = await getTranslations("resources.common");
  const docs = t.raw("docs") as Doc[];

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        {docs.map((doc, i) => {
          const Icon = ICONS[i];
          return (
            <a
              key={doc.title}
              href={HREFS[i]}
              target="_blank"
              rel="noopener"
              className="group block h-full"
            >
              <Card className="h-full transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)]">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon className="size-6 text-gold" />
                    <CardTitle>{doc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-full">
                  <div>{doc.description}</div>
                  <div className="flex items-center gap-2 mt-6 text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground group-hover:text-gold transition-colors">
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
