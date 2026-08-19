import { LOGO_SQUARE } from "@/lib/brand"
import { ImageResponse } from "next/og"

/**
 * Raster copy of the square logo. Schema.org's logo property is only eligible
 * for the rich result as a raster image, so the SVG in `public/` cannot be used
 * there directly.
 */
export const dynamic = "force-static"

export function GET() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={LOGO_SQUARE} width={512} height={512} alt="" />
    ),
    { width: 512, height: 512 },
  )
}
