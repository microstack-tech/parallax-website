import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

const RELEASES_API = "https://api.github.com/repos/ParallaxProtocol/parallax/releases?per_page=10";
const MAX_RELEASES = 4;

type Asset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type Release = {
  tag_name: string;
  name: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
  assets: Asset[];
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

async function fetchReleases(): Promise<Release[] | null> {
  try {
    const res = await fetch(RELEASES_API, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as Release[];
  } catch {
    return null;
  }
}

export default async function ClientReleases() {
  const releases = await fetchReleases();
  if (!releases || releases.length === 0) return null;

  const latestStableIndex = releases.findIndex((r) => !r.prerelease && !r.draft);
  const visible = releases.filter((r) => !r.draft).slice(0, MAX_RELEASES);

  if (visible.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground">Recent Releases</h3>
        <div className="flex-1 h-px bg-border" />
      </div>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Recent versions of the Parallax client. Always prefer the latest release unless you have a specific reason to run an older build.
      </p>

      <div className="border border-border">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-surface-elevated text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
          <div className="col-span-3">Version</div>
          <div className="col-span-3">Released</div>
          <div className="col-span-4">Assets</div>
          <div className="col-span-2 text-right">Link</div>
        </div>

        {visible.map((release) => {
          const binaryAssets = release.assets.filter(
            (a) => a.name.endsWith(".tar.gz") || a.name.endsWith(".zip"),
          );
          const isLatestStable = releases.indexOf(release) === latestStableIndex;
          return (
            <div
              key={release.tag_name}
              className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-5 border-b border-border last:border-b-0 hover:bg-surface-elevated/50 transition-colors"
            >
              <div className="sm:col-span-3 flex items-center gap-2">
                <span className="font-mono text-sm text-foreground">{release.tag_name}</span>
                {isLatestStable && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-gold border border-gold/40 px-1.5 py-0.5">
                    Latest
                  </span>
                )}
                {release.prerelease && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-gold border border-gold/40 px-1.5 py-0.5">
                    Pre
                  </span>
                )}
              </div>
              <div className="sm:col-span-3 text-sm text-muted-foreground font-mono">
                {formatDate(release.published_at)}
              </div>
              <div className="sm:col-span-4 text-xs text-muted-foreground">
                {binaryAssets.length > 0 ? (
                  <span>{binaryAssets.length} artifacts</span>
                ) : (
                  <span className="italic">source only</span>
                )}
              </div>
              <div className="sm:col-span-2 sm:text-right">
                <Link
                  href={release.html_url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  View
                  <ExternalLink className="size-3" />
                </Link>
              </div>
              {binaryAssets.length > 0 && (
                <div className="sm:col-span-12 sm:pl-0 mt-2 sm:mt-3 sm:border-t sm:border-border/50 sm:pt-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {binaryAssets.map((asset) => (
                      <Link
                        key={asset.name}
                        href={asset.browser_download_url}
                        target="_blank"
                        rel="noopener"
                        className="text-[11px] font-mono text-muted-foreground hover:text-gold transition-colors"
                      >
                        {asset.name}
                        <span className="text-muted-foreground/60"> · {formatSize(asset.size)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="secondary" asChild>
          <Link href="https://github.com/ParallaxProtocol/parallax/releases" target="_blank" rel="noopener">
            <FaGithub />
            View all releases
          </Link>
        </Button>
      </div>
    </div>
  );
}
