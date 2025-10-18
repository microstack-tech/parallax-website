import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, UsersRound } from "lucide-react"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"

export function Community() {
  return (
    <section className="py-24 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl text-foreground sm:text-4xl">Built by the Community</h2>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <FaGithub className="size-6" strokeWidth={1.5} />
                <CardTitle>Open Source</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`All code is open source and available on GitHub. Contribute to the protocol's development and help shape the future of Parallax.`}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <UsersRound className="size-6" strokeWidth={1.5} />
                <CardTitle>Community Driven</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-base text-muted-foreground">
              {`Decisions are made collectively by the community. No single entity controls the direction of the protocol.`}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row mt-8 justify-center mx-auto">
          <Card className="sm:max-w-1/2">
            <CardHeader>
              <CardTitle className="text-center">Join Our Community</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-8 space-y-3 text-base text-muted-foreground">
              {`Connect with users, developers, miners and pool operators. Get support, share ideas, and stay updated on the latest developments.`}
              <div className="inline-flex w-full justify-end">
                <Button asChild>
                  <Link href={"/resources/community"}>
                    Explore Communities
                    <ChevronRight />
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
