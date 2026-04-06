'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const RELEASES_PAGE = "https://github.com/ParallaxProtocol/parallax/releases/latest";
const LATEST_API = "https://api.github.com/repos/ParallaxProtocol/parallax/releases/latest";

type Os = "darwin" | "linux" | "windows";
type Arch = "amd64" | "arm64" | "386" | "armv7";

type Detected = {
  os: Os;
  arch: Arch;
  label: string;
};

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  tag_name: string;
  assets: ReleaseAsset[];
};

type UADataPlatform = {
  platform?: string;
  getHighEntropyValues?: (hints: string[]) => Promise<{ platform?: string; architecture?: string; bitness?: string }>;
};

async function detectPlatform(): Promise<Detected | null> {
  if (typeof navigator === "undefined") return null;

  const nav = navigator as Navigator & { userAgentData?: UADataPlatform };
  const ua = navigator.userAgent || "";

  let os: Os | null = null;
  let arch: Arch | null = null;

  // Prefer the modern UA-Client-Hints API when available (Chromium-based).
  if (nav.userAgentData?.getHighEntropyValues) {
    try {
      const hints = await nav.userAgentData.getHighEntropyValues(["platform", "architecture", "bitness"]);
      const p = (hints.platform || "").toLowerCase();
      if (p.includes("mac")) os = "darwin";
      else if (p.includes("win")) os = "windows";
      else if (p.includes("linux") || p.includes("chrome os")) os = "linux";

      const a = (hints.architecture || "").toLowerCase();
      const bits = hints.bitness || "";
      if (a === "arm" || a === "arm64") arch = bits === "32" ? "armv7" : "arm64";
      else if (a === "x86") arch = bits === "32" ? "386" : "amd64";
    } catch {
      // ignore, fall through to UA parsing
    }
  }

  if (!os) {
    if (/Mac|iPhone|iPad|iPod/i.test(ua)) os = "darwin";
    else if (/Windows/i.test(ua)) os = "windows";
    else if (/Linux|Android|CrOS/i.test(ua)) os = "linux";
  }

  if (!arch) {
    if (/aarch64|arm64/i.test(ua)) arch = "arm64";
    else if (/armv7|armv6|\barm\b/i.test(ua)) arch = "armv7";
    else if (/x86_64|x64|Win64|WOW64|amd64/i.test(ua)) arch = "amd64";
    else if (/i[3-6]86|x86(?!_64)/i.test(ua)) arch = "386";
  }

  if (!os) return null;

  // Sensible defaults when arch couldn't be detected.
  if (!arch) {
    if (os === "darwin") arch = "arm64"; // Apple Silicon is the modern default; Safari hides arch.
    else arch = "amd64";
  }

  const osLabel = os === "darwin" ? "macOS" : os === "windows" ? "Windows" : "Linux";
  const archLabel =
    arch === "amd64" ? "x86_64" : arch === "arm64" ? "ARM64" : arch === "386" ? "x86" : "ARMv7";

  return { os, arch, label: `${osLabel} (${archLabel})` };
}

function findAsset(release: Release, detected: Detected): ReleaseAsset | null {
  const ext = detected.os === "windows" ? "zip" : "tar.gz";
  const exact = `parallax-${detected.os}-${detected.arch}.${ext}`;
  const match = release.assets.find((a) => a.name === exact);
  if (match) return match;

  // Fallback: any asset for the same OS.
  return release.assets.find((a) => a.name.includes(`-${detected.os}-`)) ?? null;
}

export default function ClientDownloadButton() {
  const [detected, setDetected] = useState<Detected | null>(null);
  const [release, setRelease] = useState<Release | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [plat, rel] = await Promise.all([
        detectPlatform(),
        fetch(LATEST_API, { headers: { Accept: "application/vnd.github+json" } })
          .then((r) => (r.ok ? (r.json() as Promise<Release>) : null))
          .catch(() => null),
      ]);
      if (cancelled) return;
      setDetected(plat);
      setRelease(rel);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const asset = ready && detected && release ? findAsset(release, detected) : null;
  const href = asset?.browser_download_url ?? RELEASES_PAGE;
  const version = release?.tag_name;

  const label = !ready
    ? "Download Latest Release"
    : asset && detected
      ? `Download for ${detected.label}`
      : "Download Latest Release";

  return (
    <div className="relative">
      <Button className="bg-gold text-gold-foreground hover:bg-gold/90" asChild>
        <Link href={href} target="_blank" rel="noopener">
          <Download className="h-5 w-5" />
          {label}
        </Link>
      </Button>
      {ready && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
          {version && asset ? <span>{version} · </span> : null}
          <Link href={RELEASES_PAGE} target="_blank" rel="noopener" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
            Other platforms
          </Link>
        </div>
      )}
    </div>
  );
}
