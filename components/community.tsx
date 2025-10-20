import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, MessageCircleMore, UsersRound } from "lucide-react"
import Link from "next/link"
import { FaBitcoin, FaGithub } from "react-icons/fa"

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
              <FaGithub className="size-6" strokeWidth={1.5} />
              <CardTitle>Open Source</CardTitle>
            </CardHeader>
            <CardContent>
              {`All code is open source and available on GitHub. Contribute to the protocol's development and help shape the future of Parallax.`}
              <div className="inline-flex w-full justify-end mt-8">
                <Button variant="secondary" asChild className="w-full sm:w-fit">
                  <Link href={"https://github.com/microstack-tech"}>
                    <FaGithub strokeWidth={1.5} />
                    GitHub
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <UsersRound className="size-6" strokeWidth={1.5} />
              <CardTitle>Community Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Parallax is guided by a truly decentralized community. No single entity
                can dictate its future—every voice matters. Join the conversation and
                help shape the protocol in our official BitcoinTalk thread.
              </p>
              <div className="inline-flex w-full justify-end mt-8">
                <Button variant="secondary" asChild className="w-full sm:w-fit">
                  <Link href="https://bitcointalk.org/index.php?topic=5560698" target="_blank">
                    <FaBitcoin strokeWidth={1.5} />
                    BitcoinTalk
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row mt-8 justify-center mx-auto">
          <Card className="sm:max-w-1/2">
            <CardHeader>
              <MessageCircleMore strokeWidth={1.5} />
              <CardTitle className="text-center">Join Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              {`Connect with users, developers, miners and pool operators. Get support, share ideas, and stay updated on the latest developments.`}
              <div className="inline-flex w-full justify-end mt-8">
                <Button asChild className="w-full sm:w-fit">
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
