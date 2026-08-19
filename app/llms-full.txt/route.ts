import { getAllPosts, getPost } from "@/lib/blog"
import { readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * The llms-full.txt companion to /llms.txt (llmstxt.org convention): the
 * curated index plus the full text of the content it only links to — every
 * blog post and the complete FAQ — so an LLM can ingest the site's own wording
 * in a single fetch. Built once at compile time from the same sources that
 * render the pages.
 */
export const dynamic = "force-static"

type FaqItem = { question: string; answer: string }

const FAQ_CATEGORIES = [
  "general",
  "technical",
  "mining",
  "economics",
  "governance",
  "development",
] as const

export function GET() {
  const index = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8").trimEnd()

  const sections: string[] = [
    index,
    "---",
    [
      "# Full content",
      "",
      "Everything above is the curated index (also served at /llms.txt). The",
      "sections below inline the full text it only links to: every blog post",
      "(raw Markdown) and the complete FAQ, generated from the same sources",
      "that render the site.",
    ].join("\n"),
  ]

  sections.push("## Blog posts (full text)")
  for (const summary of getAllPosts()) {
    const post = getPost(summary.slug)
    if (!post) continue
    const meta = [
      `### ${post.title}`,
      "",
      `- URL: https://parallaxprotocol.org/en/blog/${post.slug}`,
      `- Published: ${post.date}${post.updated ? ` (updated ${post.updated})` : ""}`,
      `- Tags: ${post.tags.join(", ")}`,
      `- Summary: ${post.summary}`,
    ].join("\n")
    // Demote the body's headings two levels so they nest under the post's
    // `###` title instead of opening new top-level sections of this file.
    const body = post.body.trim().replace(/^(#{1,4}) /gm, "##$1 ")
    sections.push(`${meta}\n\n${body}`)
  }

  const messages = JSON.parse(
    readFileSync(join(process.cwd(), "messages", "en.json"), "utf8"),
  )
  const faq = messages.faq
  sections.push("## FAQ (full text)")
  for (const category of FAQ_CATEGORIES) {
    const items = faq.items[category] as FaqItem[]
    sections.push(
      [
        `### ${faq.categories[category]}`,
        "",
        ...items.map((item) => `**Q: ${item.question}**\n\n${item.answer}`),
      ].join("\n\n"),
    )
  }

  return new Response(sections.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
