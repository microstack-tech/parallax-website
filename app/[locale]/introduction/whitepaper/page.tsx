import { redirect } from "next/navigation";

// The HTML transcription of the first-edition whitepaper was removed — it had
// drifted from consensus (pre-ASERT difficulty, pre-launch language). The
// canonical whitepaper is the second-edition PDF. A permanent redirect also
// exists in next.config.ts; this stub covers any render path that bypasses it.
export default function WhitepaperPage() {
  redirect("/parallax.pdf");
}
