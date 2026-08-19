import { PostCard } from "@/components/blog/post-card"
import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { getAllPosts, getAllTags } from "@/lib/blog"
import { Rss } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations("blog")
  const posts = getAllPosts()
  const tags = getAllTags()
  const [featured, ...rest] = posts

  return (
    <MainMotion>
      <PageHeader title={t("title")} subTitle={t("subtitle")}>
        {locale !== routing.defaultLocale && (
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {t("englishOnly")}
          </p>
        )}
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8 xl:px-0">
        {tags.length > 0 && (
          <nav aria-label={t("topics")} className="mb-12 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {t("topics")}
            </span>
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
              >
                {tag.tag}
                <span className="ml-2 text-border">{tag.count}</span>
              </Link>
            ))}
          </nav>
        )}

        {posts.length === 0 ? (
          <p className="py-16 text-center text-lg text-muted-foreground">{t("empty")}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <PostCard post={featured} locale={locale} featured />
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        )}

        <a
          href="/blog/rss.xml"
          className="mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-brand"
        >
          <Rss className="size-4" />
          {t("rss")}
        </a>
      </section>
    </MainMotion>
  )
}
