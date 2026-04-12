"use client"
import GridView from "@/components/grid-view";
import MainMotion from "@/components/main-motion";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BookOpen, Boxes, LayoutGrid, PackagePlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";

const TOPIC_ICONS = [LayoutGrid, Boxes, PackagePlus, BookOpen, Users]

export default function DevelopersPage() {
  const t = useTranslations("participate.development")
  const rawTopics = t.raw("topics") as Array<{ title: string; description: string }>
  const topics = rawTopics.map((topic, i) => ({
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
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-auto mb-16 px-6">
        <Button variant={"secondary"} className="w-full sm:w-fit" size={'xl'} asChild>
          <a href="https://github.com/ParallaxProtocol" target="_blank" rel="noopener">
            <FaGithub />
            {t("exploreGithub")}
          </a>
        </Button>
        <Button variant={"secondary"} className="w-full sm:w-fit" size={'xl'} asChild>
          <Link href={"/resources/technical-documentation"}>
            <BookOpen />
            {t("readDocumentation")}
          </Link>
        </Button>
      </div>
      <GridView
        items={topics}
      />
    </MainMotion>
  );
}
