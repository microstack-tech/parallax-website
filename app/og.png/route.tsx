import { GEIST_LIGHT, GEIST_SEMIBOLD, LOGO_MARK } from "@/lib/brand"
import { ImageResponse } from "next/og"

/** One static brand card for the whole site, built at compile time. */
export const dynamic = "force-static"

const SIZE = { width: 1200, height: 630 }

const BACKGROUND = "#06070d"
// A faint wash in the mark's own two colours, well under the text contrast floor.
const BACKGROUND_IMAGE = [
  "radial-gradient(760px 420px at 32% 24%, rgba(0,255,128,0.07), transparent 65%)",
  "radial-gradient(900px 520px at 70% 64%, rgba(0,128,255,0.10), transparent 68%)",
  "linear-gradient(150deg, #080b14 0%, #06070d 60%)",
].join(", ")
const FOREGROUND = "#f2f0ec"
const MUTED = "#9a99a3"
const DIM = "#6e6d76"
const HAIRLINE = "rgba(255,255,255,0.12)"

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BACKGROUND,
          backgroundImage: BACKGROUND_IMAGE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_MARK} width={140} height={140} alt="" />
          <div style={{ fontFamily: "Geist", fontWeight: 600, fontSize: 104, color: FOREGROUND }}>
            Parallax
          </div>
        </div>

        <div style={{ display: "flex", width: 380, height: 1, background: HAIRLINE, marginTop: 56 }} />

        <div
          style={{
            fontFamily: "Geist",
            fontWeight: 300,
            fontSize: 34,
            letterSpacing: 6,
            color: MUTED,
            marginTop: 40,
          }}
        >
          Secured by physics
        </div>

        <div
          style={{
            fontFamily: "Geist",
            fontWeight: 300,
            fontSize: 22,
            letterSpacing: 1,
            color: DIM,
            marginTop: 26,
          }}
        >
          An open source, censorship-resistant, peer-to-peer, immutable network
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: "Geist", data: GEIST_SEMIBOLD, weight: 600, style: "normal" },
        { name: "Geist", data: GEIST_LIGHT, weight: 300, style: "normal" },
      ],
    },
  )
}
