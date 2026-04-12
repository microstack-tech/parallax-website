"use client"

import MainMotion from "@/components/main-motion"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { LucideChevronRight, Search, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"

type FaqItem = { question: string; answer: string }
type CategoryId = "general" | "technical" | "mining" | "economics" | "governance" | "development"

const CATEGORY_IDS: CategoryId[] = ["general", "technical", "mining", "economics", "governance", "development"]

export default function FAQPage() {
  const t = useTranslations("faq")
  const [activeCategory, setActiveCategory] = useState<CategoryId>("general")
  const [searchQuery, setSearchQuery] = useState("")

  const faqData = useMemo(() => {
    const data = {} as Record<CategoryId, FaqItem[]>
    for (const id of CATEGORY_IDS) {
      data[id] = t.raw(`items.${id}` as "items.general") as FaqItem[]
    }
    return data
  }, [t])

  const categories = CATEGORY_IDS.map((id) => ({
    id,
    name: t(`categories.${id}` as "categories.general"),
  }))

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    const query = searchQuery.toLowerCase()
    const results: { category: CategoryId; question: string; answer: string }[] = []
    for (const id of CATEGORY_IDS) {
      for (const faq of faqData[id]) {
        if (
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        ) {
          results.push({ category: id, ...faq })
        }
      }
    }
    return results
  }, [searchQuery, faqData])

  const isSearching = searchQuery.trim().length > 0

  return (
    <MainMotion>
      <PageHeader title={t("title")} subTitle={t("subtitle")} />
      <section className="flex mt-24 bg-transparent z-10 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 mx-auto max-w-7xl w-full">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 placeholder:text-muted-foreground/60"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label={t("search.clear")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <nav className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id)
                      setSearchQuery("")
                    }}
                    variant={"ghost"}
                    className={`w-full text-base py-5 cursor-pointer justify-start text-left ${!isSearching && activeCategory === category.id
                      ? "bg-gold/10 text-gold font-semibold hover:bg-gold/15 hover:text-gold border-l-2 border-gold"
                      : ""
                      }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="space-y-4">
              {isSearching ? (
                <>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    {searchResults && searchResults.length > 0
                      ? t(
                          searchResults.length === 1
                            ? "search.resultsOne"
                            : "search.resultsOther",
                          { count: searchResults.length },
                        )
                      : t("search.noResults")}
                  </h2>
                  {searchResults?.map((faq, index) => (
                    <div key={`search-${index}`} className="overflow-hidden">
                      <h3 className="inline-flex items-center gap-4 px-4 py-4 font-semibold text-foreground text-balance text-lg">
                        <LucideChevronRight className="text-gold" />
                        {faq.question}
                      </h3>
                      <div className="px-6 pb-4 border-t border-border">
                        <div className="pt-4 text-base text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                        <span className="mt-2 inline-block text-xs font-mono uppercase tracking-wider text-muted-foreground/60">
                          {categories.find((c) => c.id === faq.category)?.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-foreground capitalize mb-6">
                    {categories.find((cat) => cat.id === activeCategory)?.name}
                  </h2>
                  {faqData[activeCategory].map((faq, index) => (
                    <div key={`${activeCategory}-${index}`} className="overflow-hidden">
                      <h3 className="inline-flex items-center gap-4 px-4 py-4 font-semibold text-foreground text-balance text-lg">
                        <LucideChevronRight className="text-gold" />
                        {faq.question}
                      </h3>
                      <div className="px-6 pb-4 border-t border-border">
                        <div className="pt-4 text-base text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainMotion>
  )
}
