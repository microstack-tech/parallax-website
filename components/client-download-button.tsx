'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlatform, type Platform } from "@/hooks/usePlatform";

const RELEASES_PAGE = "https://github.com/ParallaxProtocol/parallax/releases/latest";
const LATEST_API = "https://api.github.com/repos/ParallaxProtocol/parallax/releases/latest";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  tag_name: string;
  assets: ReleaseAsset[];
};

function findAsset(release: Release, platform: Platform): ReleaseAsset | null {
  const ext = platform.os === "windows" ? "zip" : "tar.gz";
  const exact = `parallax-${platform.os}-${platform.arch}.${ext}`;
  const match = release.assets.find((a) => a.name === exact);
  if (match) return match;
  return release.assets.find((a) => a.name.includes(`-${platform.os}-`)) ?? null;
}

export default function ClientDownloadButton() {
  const { platform, ready: platformReady } = usePlatform();
  const [release, setRelease] = useState<Release | null>(null);
  const [releaseReady, setReleaseReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(LATEST_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? (r.json() as Promise<Release>) : null))
      .catch(() => null)
      .then((rel) => {
        if (cancelled) return;
        setRelease(rel);
        setReleaseReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const ready = platformReady && releaseReady;
  const asset = ready && platform && release ? findAsset(release, platform) : null;
  const href = asset?.browser_download_url ?? RELEASES_PAGE;
  const version = release?.tag_name;

  const label = !ready
    ? "Download Latest Release"
    : asset && platform
      ? `Download for ${platform.label}`
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
