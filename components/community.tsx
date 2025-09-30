import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Book, FileText, Megaphone } from "lucide-react"
import Link from "next/link"
import { FaBitcoin, FaDiscord, FaGithub, FaReddit, FaTelegramPlane } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export function Community() {
  return (
    <section className="pb-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Join the Community</h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Parallax is a community-driven project. Follow our progress and participate in the fair launch of
            programmable cash.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Megaphone className="h-6 w-6 text-primary" strokeWidth={1} />
                </div>
                <div>
                  <CardTitle className="text-lg">Communication Channels</CardTitle>
                  <CardDescription>Stay updated with latest news</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://x.com/prlxchain"} target="_blank">
                  <FaXTwitter className="mr-2 h-4 w-4" />
                  Follow @prlxchain
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://t.me/parallaxchain"} target="_blank">
                  <FaTelegramPlane className="mr-2 h-4 w-4" />
                  Join our Telegram group
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://bitcointalk.org/index.php?topic=5560698.0"} target="_blank">
                  <FaBitcoin className="mr-2 h-4 w-4" />
                  Participate in our BitcoinTalk thread
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://www.reddit.com/r/ParallaxProtocol/"} target="_blank">
                  <FaReddit className="mr-2 h-4 w-4" />
                  Join r/ParallaxProtocol
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://discord.gg/QYgSxzqh"} target="_blank">
                  <FaDiscord className="mr-2 h-4 w-4" />
                  Join our Discord channel
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" strokeWidth={1} />
                </div>
                <div>
                  <CardTitle className="text-lg">Resources</CardTitle>
                  <CardDescription>Learn more about Parallax</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"/whitepaper"}>
                  <FileText className="mr-2 h-4 w-4" />
                  Read the Whitepaper
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://github.com/microstack-tech/parallax"} target="_blank">
                  <FaGithub className="mr-2 h-4 w-4" />
                  {`Browse our GitHub repositories`}
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://docs.parallaxchain.org/guides"} target="_blank">
                  <Book className="mr-2 h-4 w-4" />
                  {`Get started with Beginner Guides`}
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href={"https://docs.parallaxchain.org"} target="_blank">
                  <Book className="mr-2 h-4 w-4" />
                  {`Read our Technical Documentation`}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="flex justify-center gap-4">
            <Button className="has-[>svg]:px-8 py-8 text-base" asChild>
              <Link href={'/resources/beginner-guides'}>
                Get started with Beginner Guides
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
