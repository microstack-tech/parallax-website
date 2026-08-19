import { PostCard } from "@/components/blog/post-card"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Link } from "@/i18n/navigation"
import { getAllTags, getPostsByTag, getTagLabel } from "@/lib/blog"
import { blogAlternates, pageMetadata } from "@/lib/seo"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return getAllTags().map((entry) => ({ tag: entry.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}): Promise<Metadata> {
  const { locale, tag } = await params
  const label = getTagLabel(tag)
  if (!label) return {}

  const t = await getTranslations({ locale, namespace: "metadata.blog" })
  return pageMetadata({
    locale,
    path: `/blog/tag/${tag}`,
    title: t("tagTitle", { tag: label }),
    description: t("tagDescription", { tag: label }),
    alternates: blogAlternates(`/blog/tag/${tag}`, t("title")),
  })
}

export default async function BlogTagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { locale, tag } = await params
  const label = getTagLabel(tag)
  if (!label) notFound()

  const t = await getTranslations("blog")
  const posts = getPostsByTag(tag)

  return (
    <MainMotion>
      <PageHeader
        title={t("taggedWith", { tag: label })}
        subTitle={t("taggedSubtitle", { count: posts.length })}
      />

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 xl:px-0">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" />
          {t("backToBlog")}
        </Link>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </MainMotion>
  )
}
