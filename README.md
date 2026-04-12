# Parallax Website

The official marketing and documentation website for [Parallax](https://parallaxprotocol.org), built with Next.js.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router, Turbopack)
- **UI:** React 19, Tailwind CSS v4, [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/) primitives
- **Animation & 3D:** [Framer Motion](https://www.framer.com/motion/), [Three.js](https://threejs.org/)
- **Data viz:** [Recharts](https://recharts.org/), [d3-geo](https://github.com/d3/d3-geo), [world-atlas](https://github.com/topojson/world-atlas)
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
i18n/              next-intl routing, request, and navigation config
messages/          Translation JSON files, one per locale
public/            Static assets
```

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
