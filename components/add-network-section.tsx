"use client";

import { Button } from "@/components/ui/button";
import { addParallaxNetwork, checkParallaxAdded, STORAGE_KEY } from "@/lib/parallax-network";
import { Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function AddNetworkSection() {
  const t = useTranslations("addNetworkSection");
  const [state, setState] = useState<"loading" | "not-added" | "added" | "no-wallet">("loading");
  const [status, setStatus] = useState<"idle" | "adding" | "success" | "error">("idle");

  useEffect(() => {
    if (!window.ethereum) {
      setState("no-wallet");
      return;
    }

    checkParallaxAdded().then((added) => {
      setState(added ? "added" : "not-added");
    });
  }, []);

  async function handleAdd() {
    setStatus("adding");
    try {
      await addParallaxNetwork();
      setStatus("success");
      localStorage.setItem(STORAGE_KEY, "true");
      setState("added");
    } catch {
      setStatus("error");
    }
  }

  if (state === "loading" || state === "no-wallet") return null;

  if (state === "added" && status !== "success") {
    return (
      <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Check className="h-5 w-5 text-gold" />
          <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground">
            {t("connectedTitle")}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          {t("connectedDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface-elevated border border-border p-8 sm:p-12 text-center mb-8">
      <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-3">
        {t("title")}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
        {t("description")}
      </p>
      <div className="flex flex-col items-center gap-3">
        <Button
          className="bg-gold text-gold-foreground hover:bg-gold/90"
          onClick={handleAdd}
          disabled={status === "adding" || status === "success"}
        >
          <Plus className="mr-2 h-5 w-5" />
          {status === "adding"
            ? t("adding")
            : status === "success"
              ? t("added")
              : t("add")}
        </Button>
        {status === "error" && (
          <p className="text-sm text-destructive">{t("error")}</p>
        )}
      </div>
    </div>
  );
}
