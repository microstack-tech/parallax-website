'use client'
import { useStableVh } from "@/hooks/useStableVh"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaBitcoin, FaGithub, FaTelegramPlane } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import Countdown from "./countdown"
import { Button } from "./ui/button"

export function Hero() {
  useStableVh()
  return (
    <section className="relative isolate overflow-hidden
                        min-h-[calc(var(--vh,1vh)*100)]
                        pt-[env(safe-area-inset-top)]
                        pb-[env(safe-area-inset-bottom)]">

      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="relative h-full w-full">
          <Image
            alt="background lines"
            className="object-cover w-full h-full invert-100 dark:invert-0"
            fill
            src="/background-lines.svg"
          />
        </div>
      </div>

      <div className="absolute flex flex-col justify-evenly h-full w-full px-6 sm:px-8 items-center">
        <div className="flex flex-col items-center w-full max-w-7xl">
          <div className="flex flex-col items-center px-2 w-full">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-center">
              $LAX is programmable gold.
            </h1>
          </div>
          <p className="mt-6 sm:px-0 text-lg sm:text-2xl text-muted-foreground text-center">
            Secured by Physics.
          </p>
        </div>
        <div className="flex flex-col gap-4 justify-between items-center sm:flex-row w-full max-w-4xl">
          <Button size={"2xl"} className="w-full max-w-[15rem] px-6" asChild>
            <Link href={"/participate/running-a-full-node"}>
              Run a node
            </Link>
          </Button>
          <Button size={"2xl"} variant={"secondary"} className="w-full border-2 max-w-[15rem] px-6" asChild>
            <Link href={"https://docs.parallaxchain.org"}>
              Read the Docs
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
