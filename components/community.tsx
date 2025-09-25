import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Megaphone } from "lucide-react"
import Link from "next/link"
import { FaGithub, FaTelegramPlane } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export function Community() {
  return (
    <section className="py-24 bg-background">
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
                  <Megaphone className="h-6 w-6 text-primary" />
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
                  Join our Telegram channel
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
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
                  View Source Code
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">Stay Updated</h3>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href={'https://x.com/prlxchain'} target="_blank">
                <FaXTwitter />
                Follow @prlxchain
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              asChild
            >
              <Link href={'https://github.com/microstack-tech/parallax'} target="_blank">
                <FaGithub className="mr-2 h-4 w-4" />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
