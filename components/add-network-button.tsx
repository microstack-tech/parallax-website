"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

export default function AddNetworkButton() {
  const [status, setStatus] = useState<"idle" | "adding" | "success" | "error" | "no-wallet">("idle");

  async function addNetwork() {
    if (typeof window === "undefined" || !window.ethereum) {
      setStatus("no-wallet");
      return;
    }

    setStatus("adding");
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x83E",
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
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        className="bg-gold text-gold-foreground hover:bg-gold/90"
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
      {status === "no-wallet" && (
        <p className="text-sm text-muted-foreground">No wallet detected. Please install an EVM-compatible wallet extension.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-destructive">Failed to add network. Please try again.</p>
      )}
    </div>
  );
}
