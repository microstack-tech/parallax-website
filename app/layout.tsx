import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parallax | Open source P2P Programmable Cash System",
  description: "Open source protocol for P2P Programmable Cash System",
};

const PlausibleScript = () => {
  return (
    <Script defer data-domain="parallaxchain.org" src="https://plausible.parallaxchain.org/js/script.js"></Script>
  )
}

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlausibleScript />
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
