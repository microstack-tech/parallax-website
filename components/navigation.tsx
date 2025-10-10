"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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
import { useTheme } from "next-themes"

interface NavItem {
  name: string
  href?: string
  subItems?: { name: string; href?: string }[]
}

const navItems: NavItem[] = [
  {
    name: "Introduction",
    subItems: [
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
      { name: "Branding", href: "/resources/branding" },
      { name: "Beginner Guides", href: "/resources/beginner-guides" },
      { name: "Technical Documentation", href: "/resources/technical-documentation" },
      { name: "Parallax Client", href: "/resources/parallax-client" },
      { name: "###" },
      { name: "Block Explorer", href: "#" },
      { name: "Faucet", href: "#" },
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
  const [opacity, setOpacity] = useState(0);
  const [isOpen, setIsOpen] = useState(false)
  const [bgColor, setBgColor] = useState<string>(``)
  const pathname = usePathname()
  const { theme } = useTheme()

  useEffect(() => {
    const bgColor = theme === 'light' ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
    setBgColor(bgColor)
  }, [theme, opacity])

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
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / 300, 1);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <nav
      className="fixed top-0 py-2 md:py-4 px-6 sm:px-8 left-0 right-0 z-50 transition-opacity duration-300"
      style={{
        backgroundColor: bgColor
      }}
    >
      <div className="flex items-center mx-auto max-w-7xl justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/parallax_logo_color_dark.svg"
                className="size-10 md:size-12 w-auto"
                width={200}
                height={200}
                alt="Parallax Logo"
                priority
              />
            </Link>
          </div>
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
                      {item.subItems.map((sub) => {

                        if (sub.name === "###") {
                          return (
                            <Separator
                              className="bg-muted-foreground/15 my-1.5"
                              key={`desk_sub_${item.name}_${sub.name}`}
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
            <Button className="ml-16 px-8" asChild>
              <Link href={"/introduction/getting-started"}>
                Get Started
              </Link>
            </Button>
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
            className="inline-flex items-center justify-center"
          >
            {isOpen ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </Button>
        </div>
      </div>

      {/* Mobile Sheet via Portal (escapes nav stacking context) */}
      {typeof window !== "undefined" && isOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <button
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-14 bg-black/50 md:hidden z-[9998]"
            />
            {/* Panel */}
            <div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              className="fixed inset-x-0 top-14 bottom-0 md:hidden z-[9999] bg-background/95 backdrop-blur border-t border-border overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="mx-auto pb-20 max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
                {navItems.map((item) =>
                  item.subItems ? (
                    <div key={`mob_${item.name}`} className="mb-2">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-accent-foreground">
                        {item.name}
                      </div>
                      <div className="flex pl-4 flex-col">
                        {item.subItems.map((sub) => {

                          if (sub.name === "###") {
                            return (
                              <Separator
                                className="bg-muted-foreground/15 my-1.5 ml-2"
                                key={`desk_sub_${item.name}_${sub.name}`}
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
                  ) : (
                    <Link
                      key={`mob_${item.name}`}
                      href={item.href ?? "#"}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-accent-foreground hover:text-foreground hover:bg-muted transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
          </>,
          document.body
        )}
    </nav>
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
