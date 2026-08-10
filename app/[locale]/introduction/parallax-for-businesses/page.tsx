import { redirect } from "next/navigation";

// This page was replaced by /introduction/parallax-for-developers.
// A permanent redirect also exists in next.config.ts; this stub covers
// any render path that bypasses it.
export default function ParallaxForBusinesses() {
  redirect("/introduction/parallax-for-developers");
}
