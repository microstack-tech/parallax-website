import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenCheck, ExternalLink, NotebookText } from "lucide-react"
import Link from "next/link"

export function Documentation() {
  return (
    <section className="py-24 border-b px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Documentation</h2>
          <p className="mt-8 text-base text-muted-foreground text-pretty">
            Find beginner guides and in-depth technical documentation about the Parallax protocol and reference client.
          </p>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <BookOpenCheck className="size-6" strokeWidth={1.5} />
                <CardTitle>Beginner Guides</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Step-by-step beginner guides on downloading and running the Parallax client, learn how to set up and use wallets, and dive deeper on how to mine on the Parallax network.`}
              <div className="inline-flex w-full justify-end mt-8">
                <Button variant={"secondary"} asChild>
                  <Link href={"https://docs.parallaxchain.org/guides"} target="_blank">
                    Beginner Guides
                    <ExternalLink />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <NotebookText className="size-6" strokeWidth={1.5} />
                <CardTitle>Technical Documentation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Explore the core building blocks of Parallax, dive into the developer stack, go beyond the basics with in-depth technical topics and learn how to run, configure and interact with the Parallax client.`}
              <div className="inline-flex w-full justify-end mt-8">
                <Button variant={"secondary"} asChild>
                  <Link href={"https://docs.parallaxchain.org"} target="_blank">
                    Technical Documentation
                    <ExternalLink />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
