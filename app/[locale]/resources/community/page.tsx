
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GitBranch, Globe, HeartHandshake, MessageCircle, Users } from "lucide-react";
import { FaBitcoin, FaDiscord, FaGithub, FaReddit, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getTranslations } from "next-intl/server";

const TOPIC_ICONS = [Users, MessageCircle, GitBranch, Globe, HeartHandshake, BookOpen];

const OFFICIAL_CHANNELS = [
  { href: "https://x.com/prlxchain", icon: FaXTwitter },
  { href: "https://bitcointalk.org/index.php?topic=5560698", icon: FaBitcoin },
  { href: "https://github.com/ParallaxProtocol", icon: FaGithub },
];

const COMMUNITY_CHANNELS = [
  { href: "https://t.me/parallaxchain", icon: FaTelegram },
  { href: "https://www.reddit.com/r/ParallaxProtocol/", icon: FaReddit },
  { href: "https://discord.gg/85SvRxWEja", icon: FaDiscord },
];

type Channel = { name: string; description: string };
type Topic = { title: string; description: string };

export default async function CommunityPage() {
  const t = await getTranslations("resources.community");
  const officialChannels = t.raw("officialChannels") as Channel[];
  const communityChannels = t.raw("communityChannels") as Channel[];
  const topics = t.raw("topics") as Topic[];

  return (
    <MainMotion>
      <PageHeader
        title={t("title")}
        subTitle={t("subtitle")}
      />

      <section className="flex flex-col gap-8 mx-auto text-center max-w-7xl px-6 sm:px-8 xl:px-0 py-8">
        <h2 className="text-2xl">
          {t("officialChannelsHeading")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {officialChannels.map((ch, i) => {
            const Icon = OFFICIAL_CHANNELS[i].icon;
            return (
              <Button key={ch.name} variant={"outline"} size={"2xl"} className="hover:border-brand/30 hover:text-brand transition-all" asChild>
                <a href={OFFICIAL_CHANNELS[i].href} target="_blank" rel="noopener" className="block">
                  <Icon className="size-6 mr-4" />
                  {ch.name}
                </a>
              </Button>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col mt-4 gap-8 mx-auto text-center max-w-7xl px-6 sm:px-8 xl:px-0 py-8">
        <h2 className="text-2xl">
          {t("communityChannelsHeading")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {communityChannels.map((ch, i) => {
            const Icon = COMMUNITY_CHANNELS[i].icon;
            return (
              <Button key={ch.name} variant={"outline"} size={"2xl"} className="hover:border-brand/30 hover:text-brand transition-all" asChild>
                <a href={COMMUNITY_CHANNELS[i].href} target="_blank" rel="noopener" className="block">
                  <Icon className="size-6 mr-4" />
                  {ch.name}
                </a>
              </Button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, i) => {
            const Icon = TOPIC_ICONS[i];
            return (
              <Card key={topic.title}>
                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Icon className="size-6 text-brand" />
                    <CardTitle className="text-lg text-center">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {topic.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

    </MainMotion>
  );
}
