"use client"
import GridView from "@/components/grid-view";
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ChevronRight, Cpu, Database, Key, Rabbit, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Wallet, Database, Key, Cpu, Rabbit];

type RawTopic = { title: string; description: string };

export default function ParallaxHowItWorks() {
  const t = useTranslations("introduction.howItWorks");
  const rawTopics = t.raw("topics") as RawTopic[];
  const topics = rawTopics.map((topic, i) => ({
    icon: ICONS[i] ?? Wallet,
    title: topic.title,
    description: topic.description,
  }));

  return (
    <MainMotion>
      <PageHeader
        title={t("pageTitle")}
        subTitle={t("pageSubtitle")}
      />
      <GridView items={topics} />
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-4 mb-8 px-6">
          <Button className="w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90" asChild>
            <Link href={'/introduction/protocol/overview'}>
              {t("learnMore")}
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
    </MainMotion>
  );
}
