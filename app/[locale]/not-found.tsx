"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("notFound")
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="text-sm font-mono uppercase tracking-[0.2em] text-gold mb-4">{t("label")}</p>
      <h1 className="text-4xl sm:text-5xl font-semibold text-foreground mb-4">{t("title")}</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        {t("description")}
      </p>
      <Button className="bg-gold text-gold-foreground hover:bg-gold/90" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 size-4" />
          {t("back")}
        </Link>
      </Button>
    </div>
  )
}
