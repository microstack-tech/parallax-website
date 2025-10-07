import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Documentation() {
  return (
    <section className="py-24 bg-[#0D0D0D] px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl tracking-tight text-foreground sm:text-4xl">Documentation</h2>
          <p className="mt-8 text-base text-muted-foreground text-pretty">
            Find beginner guides and in-depth technical documentation about the Parallax protocol and reference client.
          </p>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl">Beginner Guides</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Step-by-step beginner guides on downloading and running the Parallax client, learn how to set up and use wallets, and dive deeper on how to mine on the Parallax network.`}
              <div className="flex flex-row w-full justify-center mt-8">
                <Button className="w-fit" size={"xl"} asChild>
                  <Link href={"https://docs.parallaxchain.org/guides"}>
                    Beginner Guides
                    <ArrowRight />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl">Technical Documentation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Explore the core building blocks of Parallax, dive into the developer stack, go beyond the basics with in-depth technical topics and learn how to run, configure and interact with the Parallax client.`}
              <div className="flex flex-row w-full justify-center mt-8">
                <Button className="w-fit" size={"xl"} asChild>
                  <Link href={"https://docs.parallaxchain.org"}>
                    Technical Documentation
                    <ArrowRight />
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
