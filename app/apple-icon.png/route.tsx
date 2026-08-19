import { LOGO_SQUARE } from "@/lib/brand"
import { ImageResponse } from "next/og"

/** Home-screen icon for iOS. Named with an extension so the i18n middleware skips it. */
export const dynamic = "force-static"

export function GET() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={LOGO_SQUARE} width={180} height={180} alt="" />
    ),
    { width: 180, height: 180 },
  )
}
