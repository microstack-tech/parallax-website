import { redirect } from "next/navigation";

// This page was replaced by /introduction/parallax-for-bitcoiners.
// A permanent redirect also exists in next.config.ts; this stub covers
// any render path that bypasses it.
export default function ParallaxForIndividuals() {
  redirect("/introduction/parallax-for-bitcoiners");
}
