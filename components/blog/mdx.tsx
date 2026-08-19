import { Callout, Embed, Video, YouTube } from "@/components/blog/media"
import { cn } from "@/lib/utils"
import fs from "node:fs"
import path from "node:path"
import { imageSize } from "image-size"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import rehypeUnwrapImages from "rehype-unwrap-images"
import remarkGfm from "remark-gfm"

type ElementProps<T extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<T> & Record<string, unknown>

/** Reads the intrinsic size of an image in `public/` so it renders without layout shift. */
function localImageSize(src: string): { width: number; height: number } | null {
  try {
    const file = path.join(process.cwd(), "public", decodeURIComponent(src))
    const { width, height } = imageSize(fs.readFileSync(file))
    return width && height ? { width, height } : null
  } catch {
    return null
  }
}

/**
 * Markdown images. `![alt](/blog/post/shot.png "A caption")` becomes a figure;
 * the optional title becomes the caption. Local images go through next/image.
 */
function PostImage({ src, alt, title }: ElementProps<"img">) {
  if (typeof src !== "string" || src === "") return null

  const frame = "rounded-lg border border-border w-full h-auto"
  const remote = /^https?:\/\//.test(src)
  const size = remote ? null : localImageSize(src)

  return (
    <figure className="my-10">
      {size ? (
        <Image
          src={src}
          alt={typeof alt === "string" ? alt : ""}
          width={size.width}
          height={size.height}
          className={frame}
          sizes="(min-width: 1024px) 720px, 100vw"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={typeof alt === "string" ? alt : ""}
          loading="lazy"
          decoding="async"
          className={frame}
        />
      )}
      {title && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground text-pretty">
          {title}
        </figcaption>
      )}
    </figure>
  )
}

function PostLink({ href, children, ...props }: ElementProps<"a">) {
  const target = typeof href === "string" ? href : ""
  const linkClass =
    "text-foreground underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand"

  // Heading anchors added by rehype-autolink-headings, and in-page jumps.
  if (target.startsWith("#")) {
    return (
      <a href={target} {...props}>
        {children}
      </a>
    )
  }

  if (/^https?:\/\//.test(target) || target.startsWith("mailto:")) {
    return (
      <a href={target} target="_blank" rel="noopener" className={linkClass} {...props}>
        {children}
      </a>
    )
  }

  // Site-internal links are written locale-free (`/faq`); next/link keeps the
  // reader's locale prefix because posts render inside the [locale] segment.
  return (
    <Link href={target} className={linkClass} {...props}>
      {children}
    </Link>
  )
}

const components = {
  h1: (props: ElementProps<"h1">) => (
    <h1 className="mt-14 mb-6 text-3xl text-foreground sm:text-4xl" {...props} />
  ),
  h2: (props: ElementProps<"h2">) => (
    <h2 className="mt-14 mb-5 text-2xl text-foreground sm:text-3xl" {...props} />
  ),
  h3: (props: ElementProps<"h3">) => (
    <h3 className="mt-10 mb-4 text-xl text-foreground sm:text-2xl" {...props} />
  ),
  h4: (props: ElementProps<"h4">) => (
    <h4 className="mt-8 mb-3 text-lg text-foreground" {...props} />
  ),
  p: (props: ElementProps<"p">) => (
    <p className="my-6 text-lg leading-relaxed text-muted-foreground text-pretty" {...props} />
  ),
  a: PostLink,
  img: PostImage,
  ul: (props: ElementProps<"ul">) => (
    <ul className="my-6 ml-5 list-disc space-y-2 text-lg text-muted-foreground marker:text-brand" {...props} />
  ),
  ol: (props: ElementProps<"ol">) => (
    <ol className="my-6 ml-5 list-decimal space-y-2 text-lg text-muted-foreground marker:text-brand" {...props} />
  ),
  li: (props: ElementProps<"li">) => <li className="leading-relaxed pl-1" {...props} />,
  blockquote: (props: ElementProps<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-brand pl-6 text-lg italic text-foreground [&>p]:text-foreground"
      {...props}
    />
  ),
  hr: (props: ElementProps<"hr">) => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" {...props} />
  ),
  strong: (props: ElementProps<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  code: ({ className, ...props }: ElementProps<"code">) => {
    // Code inside a fenced block is already styled by rehype-pretty-code.
    if (props["data-language"] || props["data-theme"]) {
      return <code className={className} {...props} />
    }
    return (
      <code
        className={cn(
          "rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[0.9em] text-foreground",
          className,
        )}
        {...props}
      />
    )
  },
  table: (props: ElementProps<"table">) => (
    <div className="my-8 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ElementProps<"th">) => (
    <th
      className="border-b border-border bg-surface-elevated px-4 py-3 font-mono text-xs font-medium uppercase tracking-[0.15em] text-foreground"
      {...props}
    />
  ),
  td: (props: ElementProps<"td">) => (
    <td className="border-b border-border px-4 py-3 align-top text-muted-foreground" {...props} />
  ),
  // Components authors can use directly in a post.
  Video,
  YouTube,
  Embed,
  Callout,
}

const prettyCodeOptions = {
  // Both site themes are rendered at build time; blog.css picks one per mode.
  theme: { light: "github-light", dark: "github-dark-default" },
  keepBackground: false,
  defaultLang: "text",
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="post-body">
      <MDXRemote
        source={source}
        components={components}
        options={{
          parseFrontmatter: false,
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeUnwrapImages,
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: "heading-anchor" } }],
              [rehypePrettyCode, prettyCodeOptions],
            ],
          },
        }}
      />
    </div>
  )
}
