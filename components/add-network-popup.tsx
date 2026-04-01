"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const PARALLAX_CHAIN_ID = "0x83E";
const STORAGE_KEY = "parallax-network-added";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

export default function AddNetworkPopup() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "adding" | "success" | "error">("idle");

  useEffect(() => {
    if (!window.ethereum) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Check if Parallax is already added by trying to switch to it
    window.ethereum
      .request({ method: "wallet_switchEthereumChain", params: [{ chainId: PARALLAX_CHAIN_ID }] })
      .then(() => {
        // Chain exists — mark as added, don't show popup
        localStorage.setItem(STORAGE_KEY, "true");
      })
      .catch((err: unknown) => {
        const error = err as { code?: number };
        if (error.code === 4902) {
          // Chain not added — show the popup
          setVisible(true);
        }
        // Other errors (user rejected switch, etc.) — don't show popup
      });
  }, []);

  async function addNetwork() {
    if (!window.ethereum) return;

    setStatus("adding");
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: PARALLAX_CHAIN_ID,
            chainName: "Parallax",
            nativeCurrency: {
              name: "Lax",
              symbol: "LAX",
              decimals: 18,
            },
            rpcUrls: ["https://rpc.parallaxprotocol.org"],
            blockExplorerUrls: ["https://explorer.parallaxprotocol.org"],
          },
        ],
      });
      setStatus("success");
      localStorage.setItem(STORAGE_KEY, "true");
      setTimeout(() => setVisible(false), 2000);
    } catch {
      setStatus("error");
    }
  }

  function dismiss() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "dismissed");
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-surface-elevated border border-border p-6 shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-300">
      <button
        onClick={dismiss}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
      <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-2">
        Add Parallax to your wallet
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Automatically add the Parallax network to your wallet with one click.
      </p>
      <div className="flex flex-col items-center gap-3">
        <Button
          className="bg-gold text-gold-foreground hover:bg-gold/90 w-full"
          onClick={addNetwork}
          disabled={status === "adding"}
        >
          <Plus className="mr-2 h-5 w-5" />
          {status === "adding"
            ? "Waiting for approval..."
            : status === "success"
              ? "Network added!"
              : "Add Parallax Network"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-destructive">Failed to add network. Please try again.</p>
        )}
      </div>
    </div>
  );
}
