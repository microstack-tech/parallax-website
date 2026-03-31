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
  title: "Parallax Protocol",
  description: "Open source protocol for P2P Programmable Cash System",
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <ScrollToTop />
          <Navigation />
          <div className="flex flex-col justify-between min-h-screen">
            {children}
            <Footer />
          </div>
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
