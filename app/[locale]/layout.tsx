import AddNetworkPopup from "@/components/add-network-popup";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ScrollProgress, ScrollToTop } from "@/components/scroll-utilities";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import "../table.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.site" });

  return {
    title: {
      default: t("titleDefault"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    metadataBase: new URL("https://parallaxprotocol.org"),
    openGraph: {
      type: "website",
      siteName: t("titleDefault"),
      title: t("titleDefault"),
      description: t("ogDescription"),
      url: "https://parallaxprotocol.org",
      locale: locale.replace("-", "_"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleDefault"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
      types: {
        "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#06070d",
  colorScheme: "dark",
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
      description:
        "A peer-to-peer programmable cash system combining Bitcoin's sound money with Ethereum's programmability.",
    },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className="dark"
      style={{ colorScheme: "dark", backgroundColor: "#06070d" }}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
