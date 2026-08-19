import { readFileSync } from "node:fs"
import { join } from "node:path"

/**
 * Brand assets for the generated images (Open Graph card, icons). Everything is
 * read from disk and inlined, so the routes render at build time with no network
 * fetch. Only ever imported by `force-static` route handlers.
 */
const asset = (...parts: string[]) => readFileSync(join(process.cwd(), ...parts))

const dataUri = (file: string) =>
  `data:image/svg+xml;base64,${asset("public", file).toString("base64")}`

/** The mark alone, in its original gradient — for dark surfaces. */
export const LOGO_MARK = dataUri("new_parallax_logo_transparent.svg")

/** The mark on its black rounded plate — for icons and light surfaces. */
export const LOGO_SQUARE = dataUri("new_parallax_logo_square.svg")

// Geist, the site's sans. Satori needs raw font data and cannot read WOFF2,
// hence the vendored TTFs rather than a next/font import.
export const GEIST_SEMIBOLD = asset("assets", "fonts", "Geist-SemiBold.ttf")
export const GEIST_LIGHT = asset("assets", "fonts", "Geist-Light.ttf")
