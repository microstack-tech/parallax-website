'use client'
import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { usePlatform, type Os } from "@/hooks/usePlatform";

type StepContent = {
  extractTitle: string;
  extractBody: React.ReactNode;
  extractCmd: string | null;
  runTitle: React.ReactNode;
  runBody: React.ReactNode;
  runCmd: string | null;
  dataDir: string;
};

const CONTENT: Record<Os, StepContent> = {
  darwin: {
    extractTitle: "Unpack the archive",
    extractBody: (
      <>Double-click the downloaded <code className="font-mono text-foreground">.tar.gz</code> in Finder, or run from Terminal:</>
    ),
    extractCmd: "tar -xzf parallax-darwin-*.tar.gz",
    runTitle: (
      <>Start <code className="font-mono">prlx</code></>
    ),
    runBody: (
      <>Double-click <code className="font-mono text-foreground">prlx</code> in Finder. macOS may warn about an unidentified developer — right-click → Open to bypass it once. A Terminal window opens with sync logs.</>
    ),
    runCmd: "./prlx",
    dataDir: "~/Library/Parallax",
  },
  linux: {
    extractTitle: "Unpack the archive",
    extractBody: <>From a terminal in your downloads folder:</>,
    extractCmd: "tar -xzf parallax-linux-*.tar.gz",
    runTitle: (
      <>Start <code className="font-mono">prlx</code></>
    ),
    runBody: (
      <>From the extracted folder, make sure the binary is executable and run it:</>
    ),
    runCmd: "chmod +x prlx && ./prlx",
    dataDir: "~/.parallax",
  },
  windows: {
    extractTitle: "Unpack the archive",
    extractBody: (
      <>Right-click the downloaded <code className="font-mono text-foreground">.zip</code> in File Explorer and choose <span className="text-foreground">Extract All…</span></>
    ),
    extractCmd: null,
    runTitle: (
      <>Start <code className="font-mono">prlx.exe</code></>
    ),
    runBody: (
      <>Double-click <code className="font-mono text-foreground">prlx.exe</code> in the extracted folder. Windows SmartScreen may warn the first time — click <span className="text-foreground">More info → Run anyway</span>. A console window opens with sync logs.</>
    ),
    runCmd: null,
    dataDir: "%APPDATA%\\Parallax",
  },
};

function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="relative group">
      <pre className="bg-background border border-border p-3 pr-10 text-xs font-mono text-muted-foreground overflow-x-auto">
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="absolute top-1.5 right-1.5 inline-flex items-center justify-center size-7 text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-colors cursor-pointer"
      >
        {copied ? <Check className="size-3.5 text-gold" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

export default function ClientQuickStart() {
  const { platform, ready } = usePlatform();

  // Default to linux content during SSR / before detection resolves so the layout is stable.
  const os: Os = platform?.os ?? "linux";
  const content = CONTENT[os];
  const detectedLabel = ready && platform ? platform.label : null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground">Quick Start</h3>
        <div className="flex-1 h-px bg-border" />
        {detectedLabel && (
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
            Detected · <span className="text-gold">{detectedLabel}</span>
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-10 max-w-2xl">
        After downloading, three steps get you connected to the network. No configuration required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border">
          <div className="text-xs font-mono text-gold mb-3">01 / EXTRACT</div>
          <h4 className="text-base text-foreground mb-3">{content.extractTitle}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{content.extractBody}</p>
          {content.extractCmd && <CodeBlock>{content.extractCmd}</CodeBlock>}
        </div>

        <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border">
          <div className="text-xs font-mono text-gold mb-3">02 / RUN</div>
          <h4 className="text-base text-foreground mb-3">{content.runTitle}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{content.runBody}</p>
          {content.runCmd && <CodeBlock>{content.runCmd}</CodeBlock>}
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-xs font-mono text-gold mb-3">03 / SYNC</div>
          <h4 className="text-base text-foreground mb-3">Wait for the chain</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Your node downloads and verifies the blockchain automatically. Data is stored at:
          </p>
          <div className="bg-background border border-border p-3 text-xs font-mono text-foreground break-all">
            {content.dataDir}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Initial sync can take a while depending on your connection.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Want to help strengthen the network? Open ports <code className="font-mono text-foreground">32110</code> TCP &amp; UDP on your router.
        </p>
        <Link
          href="https://docs.parallaxprotocol.org/guides/client/setup"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
        >
          Full setup guide
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
