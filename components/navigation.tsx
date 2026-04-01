"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "./ui/navigation-menu"
import { Separator } from "./ui/separator"
import { FaGithub } from "react-icons/fa"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

interface NavItem {
  name: string
  href?: string
  subItems?: { name: string; href?: string }[]
}

const navItems: NavItem[] = [
  {
    name: "Introduction",
    subItems: [
      { name: "The Parallax Doctrine", href: "/introduction/doctrine" },
      { name: "Getting Started", href: "/introduction/getting-started" },
      { name: "How it works", href: "/introduction/how-it-works" },
      { name: "Individuals", href: "/introduction/parallax-for-individuals" },
      { name: "Businesses", href: "/introduction/parallax-for-businesses" },
      { name: "White paper", href: "/introduction/whitepaper" },
      { name: "###" },
      { name: "Parallax Protocol", href: "/introduction/protocol/overview" },

    ],
  },
  {
    name: "Resources",
    subItems: [
      { name: "Community", href: "/resources/community" },
      { name: "Brand Assets", href: "/resources/branding" },
      { name: "Beginner Guides", href: "/resources/beginner-guides" },
      { name: "Technical Documentation", href: "/resources/technical-documentation" },
      { name: "Parallax Client", href: "/resources/parallax-client" },
      { name: "Wallets", href: "/wallets" },
      { name: "###" },
      { name: "Block Explorer", href: "https://explorer.parallaxprotocol.org" },
    ],
  },
  {
    name: "Participate",
    subItems: [
      { name: "Support Parallax", href: "/participate/support-parallax" },
      { name: "Running a full node", href: "/participate/running-a-full-node" },
      { name: "Development", href: "/participate/development" },
    ],
  },
  { name: "FAQ", href: "/faq" },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Lock body scroll on mobile sheet
  useEffect(() => {
    const b = document.body
    if (isOpen) {
      b.style.overflow = "hidden"
      b.style.touchAction = "none"
    } else {
      b.style.overflow = ""
      b.style.touchAction = ""
    }
    return () => {
      b.style.overflow = ""
      b.style.touchAction = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showBg = scrolled || isOpen
  const isHome = pathname === "/"
  // On the homepage, force white text over the black hole hero until user scrolls
  const heroOverlay = isHome && !scrolled && !isOpen

  return (
    <nav
      className={cn(
        "fixed top-0 py-2 md:py-4 px-6 sm:px-8 left-0 right-0 z-50 transition-all duration-300 border-b",
        showBg
          ? "bg-background/80 backdrop-blur-md border-border"
          : "bg-transparent border-transparent",
        heroOverlay && "nav-hero-overlay"
      )}
    >
      <div className="flex items-center mx-auto max-w-7xl justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="cursor-pointer flex items-center gap-3">
            <Image
              src={mounted && (resolvedTheme === 'dark' || heroOverlay) ? "/new_parallax_logo_square_white.svg" : "/new_parallax_logo_square.svg"}
              className="size-10 md:size-12 w-auto"
              width={200}
              height={200}
              alt="Parallax Logo"
              priority
            />
            <span className="hidden lg:inline text-lg font-semibold font-sans">
              Parallax
            </span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:block">
          <NavigationMenu viewport={false} delayDuration={0}>
            <NavigationMenuList>
              {navItems.map((item) =>
                item.subItems ? (
                  <NavigationMenuItem key={`desk_${item.name}`}>
                    <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[15rem]">
                      {item.subItems.map((sub, i) => {

                        if (sub.name === "###") {
                          return (
                            <Separator
                              className="bg-muted-foreground/15 my-1.5"
                              key={`desk_sub_${i}`}
                            />
                          )
                        }

                        return (
                          <ListItem
                            key={`desk_sub_${item.name}_${sub.name}`}
                            href={sub.href ?? "#"}
                            title={sub.name}
                          />
                        )
                      }
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={`desk_${item.name}`}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href ?? "#"}>{item.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
            <div className="flex items-center gap-2 ml-12">
              <Button className="px-8 bg-gold !text-gold-foreground hover:bg-gold/90" asChild>
                <Link href={"/introduction/getting-started"}>
                  Get Started
                </Link>
              </Button>
              <Button variant={heroOverlay ? "ghost" : "secondary"} className={cn(heroOverlay && "text-white [&_*]:text-white hover:bg-white/10")} style={heroOverlay ? { border: '1px solid rgba(255,255,255,0.15)' } : undefined} asChild>
                <Link href={'https://github.com/ParallaxProtocol/parallax'} target="_blank">
                  <FaGithub />
                </Link>
              </Button>
              <Button
                variant={heroOverlay ? "ghost" : "secondary"}
                size="icon"
                className={cn(heroOverlay && "text-white [&_*]:text-white hover:bg-white/10")}
                style={heroOverlay ? { border: '1px solid rgba(255,255,255,0.15)' } : undefined}
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </NavigationMenu>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsOpen((v) => !v)}
            className="ml-4 inline-flex items-center justify-center"
          >
            {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sheet via Portal (escapes nav stacking context) */}
      {typeof window !== "undefined" && isOpen &&
        createPortal(
          <>
            {/* Panel */}
            <div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              className="fixed inset-x-0 top-14 bottom-0 md:hidden z-50 bg-background border-t border-border overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="mx-auto pb-20 max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
                {navItems.map((item) =>
                  item.subItems ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-0"
                      key={`mob_${item.name}`}
                    >
                      <div className="mb-2">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-accent-foreground">
                          {item.name}
                        </div>
                        <div className="flex pl-4 flex-col">
                          {item.subItems.map((sub, i) => {

                            if (sub.name === "###") {
                              return (
                                <Separator
                                  className="bg-muted-foreground/15 my-1.5 ml-2"
                                  key={`desk_sub_${i}`}
                                />
                              )
                            }

                            return (
                              <Link
                                key={`mob_sub_${item.name}_${sub.name}`}
                                href={sub.href ?? "#"}
                                className={cn("ml-2 px-4 py-2 text-base font-medium text-accent-foreground/70 hover:text-foreground hover:bg-muted transition-colors border-l", {
                                  "bg-primary text-primary-foreground": sub.href === pathname,
                                })}
                                onClick={() => setIsOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <Link
                      key={`mob_${item.name}`}
                      href={item.href ?? "#"}
                      className={cn("flex items-center gap-2 px-3 py-2 text-base font-medium text-accent-foreground hover:text-foreground hover:bg-muted transition-colors", {
                        "bg-primary text-primary-foreground": item.href === pathname,
                      })}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}

                {/* Theme toggle */}
                <div className="mt-6 px-3">
                  <Separator className="bg-muted-foreground/15 mb-4" />
                  <button
                    className="flex items-center gap-3 px-3 py-2 text-base font-medium text-accent-foreground cursor-pointer"
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  >
                    {mounted && resolvedTheme === 'dark' ? <Sun className="size-5 shrink-0" /> : <Moon className="size-5 shrink-0" />}
                    <span>{mounted && resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                  </button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </nav >
  )
}

function ListItem({
  title,
  children,
  href,
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <NavigationMenuLink asChild>
      <Link href={href} className={cn({
        "text-foreground/50 pointer-events-none": href === "#"
      })}>
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className={"text-muted-foreground line-clamp-2 text-sm leading-snug"}>
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  )
}
