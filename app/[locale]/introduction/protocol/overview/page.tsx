"use client";

import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Gauge, Layers, Hash, Coins, Clock, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

type RawTopic = { title: string; description: string };
type Bullet = { label: string; body: string };

const TOPIC_ICONS = [Layers, Coins, Clock, Gauge, Hash];
const TOPIC_HREFS = [
  "/introduction/protocol/architecture",
  "/introduction/protocol/block-reward-and-halving",
  "/introduction/protocol/coinbase-maturity",
  "/introduction/protocol/difficulty-and-forkchoice",
  "/introduction/protocol/xhash",
] as const;

export default function Page() {
  const t = useTranslations("introduction.protocol.overview");
  const rawTopics = t.raw("topics") as RawTopic[];
  const bullets = t.raw("purpose.bullets") as Bullet[];

  const topics = rawTopics.map((topic, i) => ({
    icon: TOPIC_ICONS[i] ?? Layers,
    title: topic.title,
    description: topic.description,
    href: TOPIC_HREFS[i] ?? "/",
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 xl:px-0 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 flex flex-col gap-6"
      >
        <PageHeader
          title={t("pageTitle")}
          subTitle={t("pageSubtitle")}
        />

        <Card>
          <CardHeader>
            <ChevronRight className="size-6" />
            <CardTitle>{t("purpose.heading")}</CardTitle>
          </CardHeader>
          <CardDescription className="text-sm text-muted-foreground pt-1">
            {t("purpose.description")}
          </CardDescription>
          <CardContent>
            <ul className="list-disc list-inside">
              {bullets.map((bullet, i) => (
                <li key={i}>
                  <strong>{bullet.label}</strong> {bullet.body}
                </li>
              ))}
            </ul>
            <p className="inline-flex items-center mt-6 gap-2">
              <ChevronRight className="size-4" />
              {t("purpose.footer")}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Separator className="my-10" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="border-muted-foreground/10 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <topic.icon className="h-5 w-5 min-w-fit min-h-fit text-brand" />
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                {topic.description}
                <div className="inline-flex w-full justify-end mt-8">
                  <Button variant={"secondary"} className="w-full sm:w-fit" asChild>
                    <Link href={topic.href}>
                      {t("readMore")} <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center w-full mt-16">
        <Button size={"xl"} className="w-full sm:w-fit brand-gradient text-brand-foreground hover:opacity-90" asChild>
          <a href="https://docs.parallaxprotocol.org" target="_blank" rel="noopener noreferrer">
            {t("exploreDocs")} <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
