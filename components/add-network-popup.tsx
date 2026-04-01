"use client";

import AddNetworkButton from "@/components/add-network-button";
import { X } from "lucide-react";
import { useState } from "react";

export default function AddNetworkPopup() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {/* Mobile: inline section before wallets */}
      <div className="lg:hidden bg-surface-elevated border border-border p-8 text-center mb-8">
        <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">
          Add Parallax to your wallet
        </h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
          Automatically add the Parallax network to your wallet with one click.
        </p>
        <AddNetworkButton />
      </div>

      {/* Desktop: floating popup bottom-left */}
      {!dismissed && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-50 w-80 bg-surface-elevated border border-border p-6 shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-300">
          <button
            onClick={() => setDismissed(true)}
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
          <AddNetworkButton />
        </div>
      )}
    </>
  );
}
