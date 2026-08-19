import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Download, ExternalLink, Info, Server, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";

const TOPIC_ICONS = [Server, ShieldCheck, Download, Info]

export default async function RunningFullNodePage() {
  const t = await getTranslations("participate.runningAFullNode")
  const rawTopics = t.raw("topics") as Array<{ title: string; description: string }>
  const nodeTopics = rawTopics.map((topic, i) => ({
    icon: TOPIC_ICONS[i],
    title: topic.title,
    description: topic.description,
  }))

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          {nodeTopics.map((topic) => (
            <Card key={topic.title}>
              <CardHeader>
                <topic.icon className="size-6 text-brand" />
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {topic.description}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center">
          <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">{t("getStarted.eyebrow")}</h3>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("getStarted.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="brand-gradient text-brand-foreground hover:opacity-90" asChild>
              <Link href="/resources/parallax-client">
                <Download className="mr-2 h-5 w-5" />
                {t("getStarted.download")}
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://docs.parallaxprotocol.org/guides/client/setup" target="_blank" rel="noopener">
                {t("getStarted.setupGuide")}
                <ExternalLink />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </MainMotion>
  );
}
