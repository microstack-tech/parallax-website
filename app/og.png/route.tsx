import {
  GEIST_LIGHT,
  GEIST_SEMIBOLD,
  LOGO_MARK,
  OG_BLACKHOLE_CENTER,
  OG_BLACKHOLE_RIGHT,
} from "@/lib/brand"
import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

/**
 * The Open Graph card, set over a still of the hero's black hole (see
 * assets/og/README.md). Without a query it renders the site-wide brand card —
 * hole centered, tagline in the core, as on the homepage. With `?title=` it
 * renders a per-page variant: hole on the right, title in the dark space left
 * of it. Rendered per request (the CDN caches each URL), hence no
 * `force-static`.
 */
export const dynamic = "force-dynamic"

const SIZE = { width: 1200, height: 630 }

const FOREGROUND = "#f2f0ec"
const MUTED = "rgba(242, 240, 236, 0.55)"
const DIM = "rgba(242, 240, 236, 0.38)"

// One year: the title is part of the URL, so a card never changes in place.
const CACHE_CONTROL = "public, max-age=31536000, immutable"

const FONTS = [
  { name: "Geist", data: GEIST_SEMIBOLD, weight: 600 as const, style: "normal" as const },
  { name: "Geist", data: GEIST_LIGHT, weight: 300 as const, style: "normal" as const },
]

function background(src: string) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={SIZE.width}
      height={SIZE.height}
      alt=""
      style={{ position: "absolute", top: 0, left: 0 }}
    />
  )
}

function wordmark() {
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        left: 56,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_MARK} width={44} height={44} alt="" />
      <div style={{ fontFamily: "Geist", fontWeight: 600, fontSize: 32, color: FOREGROUND }}>
        Parallax
      </div>
    </div>
  )
}

function brandCard() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#000" }}>
      {background(OG_BLACKHOLE_CENTER)}
      {wordmark()}

      {/* The hero's tagline, centered in the hole's dark core. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Geist",
            fontWeight: 300,
            fontSize: 21,
            letterSpacing: 7,
            color: MUTED,
            // Nudge left: letter-spacing trails the last glyph, and the hole's
            // dark core sits a touch left of the frame's center.
            marginLeft: -12,
          }}
        >
          SECURED BY PHYSICS.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 44,
          right: 56,
          fontFamily: "Geist",
          fontWeight: 300,
          fontSize: 21,
          letterSpacing: 1,
          color: DIM,
        }}
      >
        parallaxprotocol.org
      </div>
    </div>
  )
}

function titleCard(title: string) {
  const fontSize = title.length > 70 ? 36 : title.length > 40 ? 44 : 54

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#000" }}>
      {background(OG_BLACKHOLE_RIGHT)}
      {wordmark()}

      {/* Title in the dark field left of the hole. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 56,
          width: 500,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Geist",
            fontWeight: 600,
            fontSize,
            lineHeight: 1.2,
            color: FOREGROUND,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 56,
          fontFamily: "Geist",
          fontWeight: 300,
          fontSize: 19,
          letterSpacing: 4,
          color: MUTED,
        }}
      >
        SECURED BY PHYSICS.
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 44,
          right: 56,
          fontFamily: "Geist",
          fontWeight: 300,
          fontSize: 19,
          letterSpacing: 1,
          color: DIM,
        }}
      >
        parallaxprotocol.org
      </div>
    </div>
  )
}

export function GET(request: NextRequest) {
  // The card renders whatever it is given, so keep it to one plain short line.
  const title = (request.nextUrl.searchParams.get("title") ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120)

  return new ImageResponse(title ? titleCard(title) : brandCard(), {
    ...SIZE,
    fonts: FONTS,
    headers: { "Cache-Control": CACHE_CONTROL },
  })
}
