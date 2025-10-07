'use client'
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { FaBitcoin, FaGithub, FaReddit, FaTelegramPlane } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Button } from "./ui/button"
import Link from "next/link"
import { useStableVh } from "@/hooks/useStableVh"

export function Hero() {
  useStableVh()
  return (
    <section className="relative isolate overflow-hidden bg-background
                        min-h-[calc(var(--vh,1vh)*100)]
                        pt-[env(safe-area-inset-top)]
                        pb-[env(safe-area-inset-bottom)]">

      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="relative h-full w-full">
          <Image
            alt="background lines"
            className="object-cover w-full h-full"
            fill
            src="/background-lines.svg"
          />
        </div>
      </div>

      <div className="absolute flex flex-col justify-evenly h-full w-full px-6 sm:px-8 items-center">
        <div className="flex flex-col items-center sm:items-start w-full max-w-7xl">
          <h1 className="text-6xl font-sans sm:text-9xl font-bold tracking-tight sm:-ml-2">
            <span className="bg-gradient-to-r mx-0 from-white to-white/70 bg-clip-text text-transparent pr-1.5">
              Parallax
            </span>
          </h1>
          <p className="mt-6 sm:px-0 text-lg sm:text-2xl text-muted-foreground font-medium text-center">
            The open source protocol for P2P Programmable Cash System
          </p>
        </div>
        <p className="text-sm sm:text-2xl leading-8 text-muted-foreground max-w-7xl text-justify">
          {`Parallax uses peer-to-peer technology to operate with no central authority or banks; managing transactions and the issuing of coins is carried out collectively by the network. Parallax is open-source; its design is public, nobody owns or controls Parallax and everyone can take part.`}
        </p>
        <div className="flex flex-col gap-4 justify-between sm:flex-row w-full max-w-7xl">
          <Button size={"2xl"} className="w-full max-w-[25rem] rounded-none px-6 bg-cyan-400" asChild>
            <Link href={"/introduction/getting-started"}>
              <div className="flex flex-row items-center w-full justify-between">
                Get started with Parallax
                <ArrowRight className="size-6" strokeWidth={1.5} />
              </div>
            </Link>
          </Button>
          <div className="flex flex-row justify-between gap-4">
            <Button size={"2xl"} className="w-fit rounded-none px-4 bg-background border text-foreground hover:text-background transition-colors" asChild>
              <Link href={"https://x.com/prlxchain"}>
                <div>
                  <FaXTwitter className="size-6" />
                </div>
              </Link>
            </Button>
            <Button size={"2xl"} className="w-fit rounded-none px-4 bg-background border text-foreground hover:text-background transition-colors" asChild>
              <Link href={"https://t.me/parallaxchain"}>
                <div>
                  <FaTelegramPlane className="size-6" />
                </div>
              </Link>
            </Button>
            <Button size={"2xl"} className="w-fit rounded-none px-4 bg-background border text-foreground hover:text-background transition-colors" asChild>
              <Link href={"https://www.reddit.com/r/ParallaxProtocol/"}>
                <div>
                  <FaReddit className="size-6" />
                </div>
              </Link>
            </Button>
            <Button size={"2xl"} className="w-fit rounded-none px-4 bg-background border text-foreground hover:text-background transition-colors" asChild>
              <Link href={"https://bitcointalk.org/index.php?topic=5560698"}>
                <div>
                  <FaBitcoin className="size-6" />
                </div>
              </Link>
            </Button>
            <Button size={"2xl"} className="w-fit rounded-none px-4 bg-background border text-foreground hover:text-background transition-colors" asChild>
              <Link href={"https://github.com/microstack-tech"}>
                <div>
                  <FaGithub className="size-6" />
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
