"use client";

import { Button } from "@/components/ui/button";
import { addParallaxNetwork, checkParallaxAdded, STORAGE_KEY } from "@/lib/parallax-network";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function AddNetworkPopup() {
  const t = useTranslations("popup");
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "adding" | "success" | "error">("idle");

  useEffect(() => {
    if (!window.ethereum) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    checkParallaxAdded().then((added) => {
      if (!added) setVisible(true);
    });
  }, []);

  async function handleAdd() {
    setStatus("adding");
    try {
      await addParallaxNetwork();
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
        aria-label={t("dismiss")}
      >
        <X className="h-4 w-4" />
      </button>
      <h3 className="text-sm font-medium font-mono uppercase tracking-[0.15em] text-foreground mb-2">
        {t("title")}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{t("description")}</p>
      <div className="flex flex-col items-center gap-3">
        <Button
          className="brand-gradient text-brand-foreground hover:opacity-90 w-full"
          onClick={handleAdd}
          disabled={status === "adding"}
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
