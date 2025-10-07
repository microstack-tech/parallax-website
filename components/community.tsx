import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"

export function Community() {
  return (
    <section className="py-24 bg-background px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl tracking-tight text-foreground sm:text-4xl">Built by the Community</h2>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-cyan-800/40 p-2">
                  <FaGithub className="size-8 text-primary" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-xl">Open Source</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`All code is open source and available on GitHub. Contribute to the protocol's development and help shape the future of Parallax.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-cyan-800/40 p-2">
                  <FaGithub className="size-8 text-primary" strokeWidth={1.5} />
                </div>
                <CardTitle className="text-xl">Community Driven</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Decisions are made collectively by the community. No single entity controls the direction of the protocol.`}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row mt-8 justify-center mx-auto">
          <Link href={"/resources/community"} className="sm:max-w-1/2">
            <Card className="bg-cyan-400/5">
              <CardHeader>
                <CardTitle className="text-xl text-center">Join Our Community</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-8 space-y-3 text-base text-muted-foreground">
                {`Connect with users, developers, miners and pool operators. Get support, share ideas, and stay updated on the latest developments.`}
                <div className="flex flex-row w-full justify-center">
                  <Button className="w-fit" size={"xl"}>
                    Explore Communities
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

      </div>
    </section>
  )
}
