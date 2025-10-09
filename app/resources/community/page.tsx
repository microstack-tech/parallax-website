
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GitBranch, Globe, HeartHandshake, MessageCircle, Users } from "lucide-react";
import Link from "next/link";
import { FaBitcoin, FaDiscord, FaGithub, FaReddit, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const communityTopics = [
  {
    icon: Users,
    title: "Open & Neutral",
    description:
      "Parallax is not owned by anyone. No foundation, no company, no CEO, no privileged allocations—just sound money and open participation."
  },
  {
    icon: MessageCircle,
    title: "Join the Conversation",
    description:
      "Discuss protocol design, governance, and new ideas. Your voice shapes the future of programmable cash."
  },
  {
    icon: GitBranch,
    title: "Contribute Code",
    description:
      "Develop the protocol, build dApps, or improve documentation. All skill levels welcome—every contribution matters."
  },
  {
    icon: Globe,
    title: "Run a Node or Mine",
    description:
      "Help secure the network by running a node or mining with commodity hardware. Decentralization starts with you."
  },
  {
    icon: HeartHandshake,
    title: "Grow the Ecosystem",
    description:
      "Share Parallax, educate others, and help build a fair, permissionless financial system."
  },
  {
    icon: BookOpen,
    title: "Learn & Educate",
    description:
      "Explore the whitepaper, join workshops, or create educational content. Knowledge empowers the community."
  }
];

const oficialChannels = [
  {
    name: "@prlxchain",
    href: "https://x.com/prlxchain",
    description: "Follow for updates and announcements.",
    icon: FaXTwitter
  },
  {
    name: "BitcoinTalk",
    href: "https://bitcointalk.org/index.php?topic=5560698",
    description: "Engage with our BitcoinTalk thread.",
    icon: FaBitcoin,
  },
  {
    name: "GitHub",
    href: "https://github.com/microstack-tech",
    description: "Code, issues, and development.",
    icon: FaGithub,
  },
];

const communityChannels = [
  {
    name: "Telegram",
    href: "https://t.me/parallaxchain",
    description: "Chat with the community on our TG.",
    icon: FaTelegram,
  },
  {
    name: "r/ParallaxProtocol",
    href: "https://www.reddit.com/r/ParallaxProtocol/",
    description: "Join our Reddit community.",
    icon: FaReddit,
  },
  {
    name: "Discord",
    href: "https://discord.gg/QYgSxzqh",
    description: "Engage with our Discord channel.",
    icon: FaDiscord,
  },
]

export default function CommunityPage() {
  return (
    <MainMotion>
      <PageHeader
        title="Parallax Community"
        subTitle="Neutral, open, and built by everyone. Join us in shaping the future of programmable cash."
      />

      <section className="flex flex-col gap-8 mx-auto text-center max-w-7xl px-6 sm:px-8 xl:px-0 py-8">
        <h2 className="text-2xl">
          Official Channels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {oficialChannels.map((ch) => (
            <Button key={ch.name} variant={"outline"} size={"2xl"} asChild>
              <Link href={ch.href} target="_blank" rel="noopener" className="block">
                <ch.icon className="size-6 mr-4" />
                {ch.name}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <section className="flex flex-col mt-4 gap-8 mx-auto text-center max-w-7xl px-6 sm:px-8 xl:px-0 py-8">
        <h2 className="text-2xl">
          Community Channels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {communityChannels.map((ch) => (
            <Button key={ch.name} variant={"outline"} size={"2xl"} asChild>
              <Link href={ch.href} target="_blank" rel="noopener" className="block">
                <ch.icon className="size-6 mr-4" />
                {ch.name}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {communityTopics.map((topic) => (
            <Card key={topic.title} className="border-border py-10">
              <CardHeader>
                <div className="flex flex-col items-center gap-6">
                  <topic.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  <CardTitle className="text-lg text-center">{topic.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-center leading-relaxed">{topic.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </MainMotion>
  );
}
