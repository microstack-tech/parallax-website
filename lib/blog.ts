import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

/**
 * File-based blog. Posts are `.mdx` (or `.md`) files in `content/blog/`; the
 * file name is the URL slug. Posts are intentionally not translated — the site
 * chrome around them is, the prose is not — so the same English body is served
 * under every locale prefix and the canonical URL points at the default locale.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "blog")
const EXTENSIONS = [".mdx", ".md"]

export type PostFrontmatter = {
  title: string
  date: string
  summary: string
  author?: string
  tags: string[]
  cover?: string
  coverAlt?: string
  updated?: string
  draft: boolean
}

export type Post = PostFrontmatter & {
  slug: string
  /** Raw MDX body, frontmatter stripped. */
  body: string
  readingMinutes: number
}

export type PostSummary = Omit<Post, "body">

/** Drafts are visible while running `next dev`, never in a production build. */
const showDrafts = process.env.NODE_ENV === "development"

function isPostFile(file: string): boolean {
  return EXTENSIONS.includes(path.extname(file)) && !file.startsWith(".")
}

function fail(file: string, message: string): never {
  throw new Error(`Invalid blog post "content/blog/${file}": ${message}`)
}

function requireString(value: unknown, file: string, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    fail(file, `frontmatter field "${field}" is required and must be a non-empty string.`)
  }
  return value.trim()
}

/** Accepts a `YYYY-MM-DD` string or a YAML date, always returns `YYYY-MM-DD`. */
function normalizeDate(value: unknown, file: string, field: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === "string") {
    const trimmed = value.trim()
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed) && !Number.isNaN(Date.parse(trimmed))) {
      return trimmed.slice(0, 10)
    }
  }
  fail(file, `frontmatter field "${field}" must be a date in YYYY-MM-DD form.`)
}

/** Rough word count: drop code fences, JSX tags and markdown punctuation first. */
function readingMinutes(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`~\[\]()!|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function parsePost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8")
  const { data, content } = matter(raw)

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag: unknown) => String(tag).trim()).filter(Boolean)
    : []

  if (data.cover !== undefined && typeof data.cover !== "string") {
    fail(file, `frontmatter field "cover" must be a path such as /blog/my-post/cover.png.`)
  }

  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: requireString(data.title, file, "title"),
    summary: requireString(data.summary, file, "summary"),
    date: normalizeDate(data.date, file, "date"),
    updated: data.updated === undefined ? undefined : normalizeDate(data.updated, file, "updated"),
    author: typeof data.author === "string" ? data.author.trim() : undefined,
    cover: data.cover,
    coverAlt: typeof data.coverAlt === "string" ? data.coverAlt : undefined,
    tags,
    draft: data.draft === true,
    body: content,
    readingMinutes: readingMinutes(content),
  }
}

/** All posts, newest first. Cached per process so a build parses each file once. */
let cache: Post[] | null = null

function loadPosts(): Post[] {
  if (cache && process.env.NODE_ENV !== "development") return cache
  if (!fs.existsSync(POSTS_DIR)) return (cache = [])

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter(isPostFile)
    .map(parsePost)
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))

  return (cache = posts)
}

/** Drops the MDX body so listing pages don't carry the full text of every post. */
function toSummary(post: Post): PostSummary {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { body, ...rest } = post
  return rest
}

export function getAllPosts(): PostSummary[] {
  return loadPosts().map(toSummary)
}

export function getPostSlugs(): string[] {
  return loadPosts().map((post) => post.slug)
}

export function getPost(slug: string): Post | undefined {
  return loadPosts().find((post) => post.slug === slug)
}

/** Newer/older neighbours in the reverse-chronological listing. */
export function getAdjacentPosts(slug: string): {
  newer?: PostSummary
  older?: PostSummary
} {
  const posts = loadPosts()
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return {}
  return {
    newer: posts[index - 1] ? toSummary(posts[index - 1]) : undefined,
    older: posts[index + 1] ? toSummary(posts[index + 1]) : undefined,
  }
}

export type TagEntry = { tag: string; slug: string; count: number }

/** Every tag in use, most-used first, deduplicated on its slug. */
export function getAllTags(): TagEntry[] {
  const bySlug = new Map<string, TagEntry>()

  for (const post of loadPosts()) {
    for (const tag of post.tags) {
      const slug = tagSlug(tag)
      if (!slug) continue
      const existing = bySlug.get(slug)
      if (existing) existing.count += 1
      else bySlug.set(slug, { tag, slug, count: 1 })
    }
  }

  return [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.tag.localeCompare(b.tag),
  )
}

export function getPostsByTag(slug: string): PostSummary[] {
  return loadPosts()
    .filter((post) => post.tags.some((tag) => tagSlug(tag) === slug))
    .map(toSummary)
}

export function getTagLabel(slug: string): string | undefined {
  return getAllTags().find((entry) => entry.slug === slug)?.tag
}

/** Date formatter for post metadata; posts are English but dates follow the UI locale. */
export function formatPostDate(date: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`))
}
