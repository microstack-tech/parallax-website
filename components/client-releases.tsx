'use client'

import { AppWindow, ChevronDown, ExternalLink, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

const REPOS = {
  cli: {
    api: "https://api.github.com/repos/ParallaxProtocol/parallax/releases?per_page=10",
    allReleases: "https://github.com/ParallaxProtocol/parallax/releases",
  },
  gui: {
    api: "https://api.github.com/repos/ParallaxProtocol/parallax-gui/releases?per_page=10",
    allReleases: "https://github.com/ParallaxProtocol/parallax-gui/releases",
  },
} as const;

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

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

function ReleaseTable({ releases, allReleasesUrl }: { releases: Release[]; allReleasesUrl: string }) {
  const t = useTranslations("resources.parallaxClient.releases");
  const locale = useLocale();
  const latestStableIndex = releases.findIndex((r) => !r.prerelease && !r.draft);
  const visible = releases.filter((r) => !r.draft).slice(0, MAX_RELEASES);

  if (visible.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground italic">{t("noReleases")}</p>
    );
  }

  return (
    <>
      <div className="border border-border">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border bg-surface-elevated text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
          <div className="col-span-3">{t("columnVersion")}</div>
          <div className="col-span-3">{t("columnReleased")}</div>
          <div className="col-span-4">{t("columnAssets")}</div>
          <div className="col-span-2 text-right">{t("columnLink")}</div>
        </div>

        {visible.map((release) => {
          const binaryAssets = release.assets.filter(
            (a) =>
              a.name.endsWith(".tar.gz") ||
              a.name.endsWith(".zip") ||
              a.name.endsWith(".dmg") ||
              a.name.endsWith(".AppImage") ||
              a.name.endsWith(".exe"),
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
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-brand border border-brand/40 px-1.5 py-0.5">
                    {t("latestBadge")}
                  </span>
                )}
                {release.prerelease && (
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-brand border border-brand/40 px-1.5 py-0.5">
                    {t("preBadge")}
                  </span>
                )}
              </div>
              <div className="sm:col-span-3 text-sm text-muted-foreground font-mono">
                {formatDate(release.published_at, locale)}
              </div>
              <div className="sm:col-span-4 text-xs text-muted-foreground">
                {binaryAssets.length > 0 ? (
                  <span>{t("artifactsCount", { count: binaryAssets.length })}</span>
                ) : (
                  <span className="italic">{t("sourceOnly")}</span>
                )}
              </div>
              <div className="sm:col-span-2 sm:text-right">
                <a
                  href={release.html_url}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("view")}
                  <ExternalLink className="size-3" />
                </a>
              </div>
              {binaryAssets.length > 0 && (
                <div className="sm:col-span-12 sm:pl-0 mt-2 sm:mt-3 sm:border-t sm:border-border/50 sm:pt-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {binaryAssets.map((asset) => (
                      <a
                        key={asset.name}
                        href={asset.browser_download_url}
                        target="_blank"
                        rel="noopener"
                        className="text-[11px] font-mono text-muted-foreground hover:text-brand transition-colors"
                      >
                        {asset.name}
                        <span className="text-muted-foreground/60"> · {formatSize(asset.size)}</span>
                      </a>
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
          <a href={allReleasesUrl} target="_blank" rel="noopener">
            <FaGithub />
            {t("viewAllReleases")}
          </a>
        </Button>
      </div>
    </>
  );
}

export default function ClientReleases() {
  const t = useTranslations("resources.parallaxClient.releases");
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"gui" | "cli">("gui");
  const [cliReleases, setCliReleases] = useState<Release[] | null>(null);
  const [guiReleases, setGuiReleases] = useState<Release[] | null>(null);

  useEffect(() => {
    const headers = { Accept: "application/vnd.github+json" };
    fetch(REPOS.cli.api, { headers })
      .then((r) => (r.ok ? (r.json() as Promise<Release[]>) : null))
      .catch(() => null)
      .then(setCliReleases);
    fetch(REPOS.gui.api, { headers })
      .then((r) => (r.ok ? (r.json() as Promise<Release[]>) : null))
      .catch(() => null)
      .then(setGuiReleases);
  }, []);

  const hasAny =
    (cliReleases && cliReleases.length > 0) || (guiReleases && guiReleases.length > 0);

  if (cliReleases !== null && guiReleases !== null && !hasAny) return null;

  return (
    <div className="mt-20">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-3 cursor-pointer group"
      >
        <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground group-hover:text-brand transition-colors">{t("heading")}</h3>
        <div className="flex-1 h-px bg-border" />
        <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="releases-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground mb-8 mt-8 max-w-2xl">
              {t("intro")}
            </p>

            <div className="flex gap-2 bg-surface-elevated border border-border rounded-lg p-2 w-fit mb-8">
              {/* The active plate is one shared element that glides between
                  the two buttons (layoutId) instead of snapping. */}
              <Button
                onClick={() => setActiveTab("gui")}
                variant="ghost"
                className={cn("relative", activeTab === "gui" ? "text-brand-foreground hover:bg-transparent" : "text-muted-foreground")}
              >
                {activeTab === "gui" && (
                  <motion.span
                    layoutId="releases-tab-plate"
                    aria-hidden
                    className="absolute inset-0 rounded-lg brand-gradient"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <AppWindow className="size-3.5" />
                  {t("desktop")}
                </span>
              </Button>
              <Button
                onClick={() => setActiveTab("cli")}
                variant="ghost"
                className={cn("relative", activeTab === "cli" ? "text-brand-foreground hover:bg-transparent" : "text-muted-foreground")}
              >
                {activeTab === "cli" && (
                  <motion.span
                    layoutId="releases-tab-plate"
                    aria-hidden
                    className="absolute inset-0 rounded-lg brand-gradient"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <TerminalSquare className="size-3.5" />
                  {t("cli")}
                </span>
              </Button>
            </div>

            {activeTab === "gui" && (
              guiReleases ? (
                <ReleaseTable releases={guiReleases} allReleasesUrl={REPOS.gui.allReleases} />
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">{t("loading")}</p>
              )
            )}

            {activeTab === "cli" && (
              cliReleases ? (
                <ReleaseTable releases={cliReleases} allReleasesUrl={REPOS.cli.allReleases} />
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">{t("loading")}</p>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
