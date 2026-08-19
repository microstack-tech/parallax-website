import { routing } from "@/i18n/routing"
import { getAllPosts } from "@/lib/blog"

const BASE_URL = "https://parallaxprotocol.org"
const BLOG_URL = `${BASE_URL}/${routing.defaultLocale}/blog`

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/** RSS 2.0 feed of the blog. Posts are English-only, hence the single feed. */
export function GET() {
  const posts = getAllPosts()
  const updated = posts[0]?.date

  const items = posts
    .map((post) => {
      const url = `${BLOG_URL}/${post.slug}`
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Parallax Protocol Blog</title>
    <link>${BLOG_URL}</link>
    <description>Notes and announcements from the Parallax Protocol project.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${updated ? `    <lastBuildDate>${new Date(`${updated}T00:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
