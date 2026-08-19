import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppWindow, CircleSlash, ExternalLink, Hexagon, Info, ShieldCheck, TerminalSquare } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ClientDownloadButton from "@/components/client-download-button";
import ClientQuickStart from "@/components/client-quick-start";
import ClientReleases from "@/components/client-releases";
import { getTranslations } from "next-intl/server";

const FEATURE_ICONS = [ShieldCheck, TerminalSquare, Info];

type Feature = { title: string; description: string };

export default async function ParallaxClientPage() {
  const t = await getTranslations("resources.parallaxClient");
  const features = t.raw("features") as Feature[];

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          <div className="pr-0 sm:pr-10 sm:border-r border-border pb-8 sm:pb-0">
            <div className="flex items-center gap-3 mb-4">
              <Hexagon className="size-5 text-brand" />
              <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">{t("decentralized.heading")}</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("decentralized.body")}
            </p>
          </div>
          <div className="pl-0 sm:pl-10 pt-8 sm:pt-0 border-t sm:border-t-0 border-border">
            <div className="flex items-center gap-3 mb-4">
              <CircleSlash className="size-5 text-brand" />
              <h3 className="text-xs font-medium font-mono uppercase tracking-[0.15em] text-foreground">{t("noVoting.heading")}</h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              {t("noVoting.body")}
            </p>
          </div>
        </div>

        <blockquote className="my-16 border-l-2 border-brand pl-8 py-2">
          <p className="text-lg italic text-muted-foreground leading-relaxed">
            {t("blockquote")}
          </p>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {features.map((feature, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <Icon className="size-6 text-brand" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {feature.description}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="border border-border">
          <div className="px-6 sm:px-12 pt-10 pb-8 text-center">
            <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">{t("download.heading")}</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t("download.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border">
            <div className="relative p-8 sm:p-12 border-b md:border-b-0 md:border-r border-border">
              <div className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-[0.15em] text-brand border border-brand/40 px-1.5 py-0.5">
                {t("download.recommended")}
              </div>
              <AppWindow className="size-6 text-brand mb-4" />
              <h4 className="text-base text-foreground mb-2">{t("download.desktopTitle")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("download.desktopDescription")}
              </p>
              <ClientDownloadButton variant="gui" />
            </div>

            <div className="relative p-8 sm:p-12 bg-surface-elevated/40">
              <div className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-[0.15em] text-muted-foreground border border-border px-1.5 py-0.5">
                {t("download.advanced")}
              </div>
              <TerminalSquare className="size-6 text-foreground mb-4" />
              <h4 className="text-base text-foreground mb-2">{t("download.cliTitle")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("download.cliDescription")}
              </p>
              <ClientDownloadButton variant="cli" prominent={false} />
            </div>
          </div>

          <div className="px-6 sm:px-12 py-6 border-t border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
            <Button variant="secondary" asChild>
              <a href="https://docs.parallaxprotocol.org/guides/client/setup" target="_blank" rel="noopener">
                {t("download.cliSetupGuide")}
                <ExternalLink />
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://github.com/ParallaxProtocol/parallax" target="_blank" rel="noopener">
                <FaGithub />
                {t("download.cliOnGithub")}
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="https://github.com/ParallaxProtocol/parallax-gui" target="_blank" rel="noopener">
                <FaGithub />
                {t("download.desktopOnGithub")}
              </a>
            </Button>
          </div>
        </div>

        <ClientQuickStart />

        <ClientReleases />
      </section>
    </MainMotion>
  );
}
