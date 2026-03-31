'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenCheck, FileText, NotebookText, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "./fade-in"

const docs = [
  {
    icon: BookOpenCheck,
    title: "Beginner Guides",
    description: "Step-by-step guides on downloading the Parallax client, setting up wallets, and getting started with mining.",
    href: "https://docs.parallaxprotocol.org/guides",
    external: true,
  },
  {
    icon: NotebookText,
    title: "Technical Documentation",
    description: "Core building blocks, developer stack, and in-depth topics on running and configuring the Parallax client.",
    href: "https://docs.parallaxprotocol.org",
    external: true,
  },
  {
    icon: FileText,
    title: "Whitepaper",
    description: "The technical specification for the Parallax protocol. Monetary design, consensus mechanism, and network architecture.",
    href: "/introduction/whitepaper",
    external: false,
  },
]

export function Documentation() {
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">Learn</p>
            <h2 className="text-3xl text-foreground sm:text-4xl">Documentation</h2>
            <p className="mt-8 text-base text-muted-foreground text-pretty">
              Find beginner guides and in-depth technical documentation about the Parallax protocol and reference client.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc, i) => (
            <FadeIn key={doc.title} delay={i * 0.1}>
              <Link
                href={doc.href}
                target={doc.external ? "_blank" : undefined}
                rel={doc.external ? "noopener" : undefined}
                className="group block h-full"
              >
                <Card className="h-full transition-all duration-300 hover:border-gold/30 hover:shadow-[0_0_20px_-5px_var(--gold-muted)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <doc.icon className="size-6 text-muted-foreground group-hover:text-gold transition-colors" />
                        <CardTitle>{doc.title}</CardTitle>
                      </div>
                      {doc.external ? (
                        <ExternalLink className="size-4 text-muted-foreground/50" />
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-1">
                    <p className="text-base text-muted-foreground">{doc.description}</p>
                    <div className="flex items-center gap-2 mt-6 text-sm font-medium text-foreground group-hover:text-gold transition-colors">
                      Read more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
