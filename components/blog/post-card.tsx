import type { PostSummary } from "@/lib/blog"
import { formatPostDate, tagSlug } from "@/lib/blog"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

/** Cover art. Local paths go through next/image; remote URLs are left alone. */
export function Cover({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes: string
}) {
  if (/^https?:\/\//.test(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  )
}

export async function PostMeta({
  post,
  locale,
  className,
}: {
  post: PostSummary
  locale: string
  className?: string
}) {
  const t = await getTranslations("blog")

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground",
        className,
      )}
    >
      <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
      <span aria-hidden className="text-border">/</span>
      <span>{t("minRead", { minutes: post.readingMinutes })}</span>
      {post.author && (
        <>
          <span aria-hidden className="text-border">/</span>
          <span>{t("by", { author: post.author })}</span>
        </>
      )}
    </div>
  )
}

export async function PostCard({
  post,
  locale,
  featured = false,
}: {
  post: PostSummary
  locale: string
  featured?: boolean
}) {
  const t = await getTranslations("blog")

  return (
    <article className={cn("group", featured && "md:col-span-2")}>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)]",
          featured && "md:flex-row",
        )}
      >
        {post.cover && (
          <div
            className={cn(
              "relative shrink-0 overflow-hidden bg-surface-elevated",
              featured ? "aspect-video md:aspect-auto md:w-1/2" : "aspect-video",
            )}
          >
            <Cover
              src={post.cover}
              alt={post.coverAlt ?? ""}
              priority={featured}
              sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className={cn("flex flex-1 flex-col gap-4 p-6", featured && "md:justify-center md:p-8")}>
          <PostMeta post={post} locale={locale} />

          <h3 className={cn("text-xl text-foreground text-pretty", featured && "sm:text-3xl")}>
            {post.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed text-pretty">{post.summary}</p>

          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tagSlug(tag)}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <span className="mt-auto flex items-center gap-2 pt-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors group-hover:text-gold">
            {t("readPost")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  )
}
