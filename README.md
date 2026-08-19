# Parallax Website

The official marketing and documentation website for [Parallax](https://parallaxprotocol.org), built with Next.js.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS v4, [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) primitives
- **Animation & 3D:** [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/)
- **Data viz:** [Recharts](https://recharts.org/), [d3-geo](https://github.com/d3/d3-geo), [world-atlas](https://github.com/topojson/world-atlas)
- **Content:** MDX blog posts in `content/blog/` ([next-mdx-remote](https://github.com/hashicorp/next-mdx-remote), [rehype-pretty-code](https://rehype-pretty.pages.dev/))
- **i18n:** [next-intl](https://next-intl.dev/)
- **Package manager:** [pnpm](https://pnpm.io/)

## Getting Started

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. Pages live under `app/[locale]/` and hot-reload as you edit.

### Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server with Turbopack |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build locally |
| `pnpm lint` | Run ESLint |

## Project Structure

```
app/
  [locale]/        Localized routes (home, introduction, wallets, exchanges, faq, ...)
  api/             Route handlers (e.g. node discovery)
components/        Reusable React components
content/
  blog/            Blog posts, one MDX file per post
i18n/              next-intl routing, request, and navigation config
messages/          Translation JSON files, one per locale
public/            Static assets (blog media lives in public/blog/<slug>/)
```

## Blog

Posts are MDX files in `content/blog/`. The file name is the URL slug, so
`content/blog/asert-migration.mdx` is served at `/en/blog/asert-migration`. Adding
a file is all it takes: the index at `/blog`, the tag pages, the RSS feed at
`/blog/rss.xml`, and the sitemap are all generated from the directory at build time.

Posts are written in English only and are not translated — the same body is served
under every locale prefix, and each post's canonical URL points at `/en/...`.

### Writing a post

Create `content/blog/<slug>.mdx` starting with a frontmatter block:

```mdx
---
title: "Why the difficulty algorithm changed"
date: 2026-08-19
summary: "One-paragraph summary used on cards, in search results, and in the RSS feed."
author: "Parallax Protocol"
tags: ["protocol", "mining"]
cover: /blog/asert-migration/cover.png
coverAlt: "Difficulty over the migration window"
draft: false
---

Markdown goes here.
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Page heading and browser title |
| `date` | yes | `YYYY-MM-DD`; orders the index |
| `summary` | yes | Card text, meta description, RSS description |
| `author` | no | Byline; omitted if absent |
| `tags` | no | Each tag gets a page at `/blog/tag/<tag>` |
| `cover` | no | Path under `public/` |
| `coverAlt` | no | Alt text for the cover |
| `updated` | no | `YYYY-MM-DD`; shown at the foot of the post |
| `draft` | no | `true` renders in `pnpm dev` only, never in a production build |

A missing or malformed required field fails the build with the offending file name.

### Images, video, and embeds

Put a post's media in `public/blog/<slug>/` and reference it by absolute path.
Markdown images take an optional quoted title, which becomes the caption; local
images are sized at build time so nothing shifts as the page loads.

```mdx
![Difficulty over the migration window](/blog/asert-migration/chart.png "Retarget behaviour before and after block 17,560.")

<Video src="/blog/asert-migration/demo.mp4" poster="/blog/asert-migration/poster.png" caption="Optional caption." />

<YouTube id="VIDEO_ID" title="Video title" caption="Optional caption." />

<Embed src="https://player.vimeo.com/video/76979871" title="Vimeo" />

<Callout type="warning" title="Careful">Aside for a caveat.</Callout>
```

`<YouTube>` shows a thumbnail and loads nothing from Google until the reader
presses play. Fenced code blocks are highlighted at build time and accept a
title and highlighted lines: ` ```js title="config.js" {2-3} `.

`content/blog/hello-parallax.mdx` is a draft that demonstrates all of the above;
run `pnpm dev` and open `/en/blog/hello-parallax` to see it rendered.

## Internationalization

The site is localized with [next-intl](https://next-intl.dev/). Translations live in `messages/<locale>.json`, and the list of enabled locales is declared in `i18n/routing.ts`.

### Improving an existing translation

1. Edit the relevant `messages/<locale>.json` file (e.g. `messages/fr.json`).
2. Keep the key structure identical to `messages/en.json` — English is the source of truth.
3. Run `pnpm dev` and switch locales via the language selector to verify your changes.
4. Open a pull request.

### Adding a new locale

1. Add the locale code to the `locales` array in `i18n/routing.ts`.
2. Add a display name for it in the `localeNames` map in the same file.
3. Create `messages/<code>.json` by copying `messages/en.json` and translating the values (leave keys untouched).
4. Verify the new locale renders correctly in development, then open a pull request.

Please keep ICU placeholders (e.g. `{count}`), HTML tags, and punctuation intact, and avoid translating brand names like "Parallax".

## Contributing

Issues and pull requests are welcome. For non-trivial changes, please open an issue first to discuss the approach.

## License

See [LICENSE](./LICENSE) if present, or contact the maintainers.
