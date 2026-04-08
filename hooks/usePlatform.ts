'use client'
import { useEffect, useState } from "react";

export type Os = "darwin" | "linux" | "windows";
export type Arch = "amd64" | "arm64" | "386" | "armv7";

export type Platform = {
  os: Os;
  arch: Arch;
  osLabel: string;
  archLabel: string;
  label: string;
  isMobile: boolean;
};

type UADataPlatform = {
  platform?: string;
  mobile?: boolean;
  getHighEntropyValues?: (hints: string[]) => Promise<{
    platform?: string;
    architecture?: string;
    bitness?: string;
  }>;
};

function detectMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { userAgentData?: UADataPlatform };
  if (typeof nav.userAgentData?.mobile === "boolean") return nav.userAgentData.mobile;
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua);
}

async function detect(): Promise<Platform | null> {
  if (typeof navigator === "undefined") return null;

  const nav = navigator as Navigator & { userAgentData?: UADataPlatform };
  const ua = navigator.userAgent || "";

  let os: Os | null = null;
  let arch: Arch | null = null;

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
      // fall through
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

  if (!arch) {
    arch = os === "darwin" ? "arm64" : "amd64";
  }

  const osLabel = os === "darwin" ? "macOS" : os === "windows" ? "Windows" : "Linux";
  const archLabel =
    arch === "amd64" ? "x86_64" : arch === "arm64" ? "ARM64" : arch === "386" ? "x86" : "ARMv7";

  return {
    os,
    arch,
    osLabel,
    archLabel,
    label: `${osLabel} (${archLabel})`,
    isMobile: detectMobile(),
  };
}

export function usePlatform(): { platform: Platform | null; ready: boolean } {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    detect().then((p) => {
      if (cancelled) return;
      setPlatform(p);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { platform, ready };
}
