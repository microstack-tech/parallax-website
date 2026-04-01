import AddNetworkPopup from "@/components/add-network-popup";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ScrollProgress, ScrollToTop } from "@/components/scroll-utilities";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import "./table.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Parallax Protocol",
    template: "%s | Parallax Protocol",
  },
  description: "Open source protocol for P2P Programmable Cash System",
  metadataBase: new URL("https://parallaxprotocol.org"),
  openGraph: {
    type: "website",
    siteName: "Parallax Protocol",
    title: "Parallax Protocol",
    description: "A peer-to-peer programmable cash system. Bitcoin's monetary discipline meets Ethereum's programmability.",
    url: "https://parallaxprotocol.org",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parallax Protocol",
    description: "A peer-to-peer programmable cash system. Bitcoin's monetary discipline meets Ethereum's programmability.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Parallax Protocol",
      url: "https://parallaxprotocol.org",
      logo: "https://parallaxprotocol.org/new_parallax_logo_square.svg",
      sameAs: [
        "https://github.com/ParallaxProtocol",
        "https://x.com/prlxchain",
        "https://discord.gg/4Z4R3aAU3B",
        "https://t.me/parallaxchain",
        "https://reddit.com/r/parallaxprotocol",
        "https://bitcointalk.org/index.php?topic=5560698",
      ],
    },
    {
      "@type": "WebSite",
      name: "Parallax Protocol",
      url: "https://parallaxprotocol.org",
      description: "A peer-to-peer programmable cash system combining Bitcoin's sound money with Ethereum's programmability.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <ScrollToTop />
          <Navigation />
          <div className="flex flex-col justify-between min-h-screen">
            {children}
            <Footer />
          </div>
          <AddNetworkPopup />
          {/* Global noise grain texture */}
          <svg
            className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.015] dark:opacity-[0.02] z-[100]"
            aria-hidden="true"
          >
            <filter id="global-grain">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#global-grain)" />
          </svg>
        </ThemeProvider>
      </body>
    </html>
  );
}
