import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld"
import { MdxContent } from "@/components/blog/mdx"
import { Cover, PostMeta } from "@/components/blog/post-card"
import MainMotion from "@/components/main-motion"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { formatPostDate, getAdjacentPosts, getPost, getPostSlugs, tagSlug } from "@/lib/blog"
import { blogAlternates, pageOgImage } from "@/lib/seo"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const BASE_URL = "https://parallaxprotocol.org"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const t = await getTranslations({ locale, namespace: "metadata.blog" })
  const image = post.cover
    ? { url: post.cover, alt: post.coverAlt ?? post.title }
    : pageOgImage(post.title)

  return {
    title: post.title,
    description: post.summary,
    // Posts are English-only, so every locale prefix points at one canonical URL.
    alternates: blogAlternates(`/blog/${post.slug}`, t("title")),
    openGraph: {
      type: "article",
      siteName: "Parallax Protocol",
      title: post.title,
      description: post.summary,
      url: `${BASE_URL}/${routing.defaultLocale}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [image.url],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const t = await getTranslations("blog")
  const { newer, older } = getAdjacentPosts(post.slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "en",
    mainEntityOfPage: `${BASE_URL}/${routing.defaultLocale}/blog/${post.slug}`,
    image: post.cover ? `${BASE_URL}${post.cover}` : undefined,
    keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
    author: { "@type": "Organization", name: post.author ?? "Parallax Protocol" },
    publisher: {
      "@type": "Organization",
      name: "Parallax Protocol",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  }

  return (
    <MainMotion>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Posts are English-only, so the trail points at the canonical URLs. */}
      <BreadcrumbJsonLd
        locale={routing.defaultLocale}
        items={[
          { name: "Parallax Protocol", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="mx-auto max-w-3xl px-6 pt-32 sm:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" />
          {t("backToBlog")}
        </Link>

        <header className="mt-8 flex flex-col gap-6 border-b border-border pb-10">
          <div className="h-0.5 w-12 bg-brand" />
          <h1 className="text-4xl text-foreground text-pretty sm:text-5xl">{post.title}</h1>
          <p className="text-xl text-muted-foreground text-pretty">{post.summary}</p>
          <PostMeta post={post} locale={locale} />
          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tagSlug(tag)}>
                  <Link
                    href={`/blog/tag/${tagSlug(tag)}`}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:border-brand/40 hover:text-foreground"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.cover && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-lg border border-border bg-surface-elevated">
            <Cover
              src={post.cover}
              alt={post.coverAlt ?? ""}
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
            />
          </div>
        )}

        <MdxContent source={post.body} />

        {post.updated && (
          <p className="mt-12 border-t border-border pt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {t("updatedOn", { date: formatPostDate(post.updated, locale) })}
          </p>
        )}

        {(newer || older) && (
          <nav className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2">
            {older && (
              <Link
                href={`/blog/${older.slug}`}
                className="group flex flex-col gap-2 rounded-lg border border-border p-5 transition-colors hover:border-brand/30"
              >
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                  {t("olderPost")}
                </span>
                <span className="text-foreground text-pretty">{older.title}</span>
              </Link>
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="group flex flex-col gap-2 rounded-lg border border-border p-5 transition-colors hover:border-brand/30 sm:col-start-2 sm:items-end sm:text-right"
              >
                <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  {t("newerPost")}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-foreground text-pretty">{newer.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </MainMotion>
  )
}
