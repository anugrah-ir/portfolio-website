import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSite } from "./admin/actions";
import siteData from "@/data/siteData.json";

export async function generateMetadata(): Promise<Metadata> {
  const { success, site } = await getSite();

  const title = success && site?.title ? site.title : siteData.site.title;
  const description =
    success && site?.description ? site.description : siteData.site.description;
  const favicon =
    success && site?.favicon ? site.favicon : siteData.site.favicon;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://anugrahilhamirizki.vercel.app";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    keywords: [
      "Fullstack Developer",
      "Software Engineer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Web Development",
      siteData.author.name,
    ],
    authors: [{ name: siteData.author.name, url: siteUrl }],
    creator: siteData.author.name,
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: favicon },
      ],
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      type: "website",
      locale: "en_US",
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@anugrahir",
    },
    verification: {
      google: "rRKtx8q1aru_KTmZi0HtAiApQeH5UoXzIa-w_yWHyFs",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="preconnect"
          href="https://arkdkqkhbfpcf1pr.public.blob.vercel-storage.com"
        />
        <link
          rel="dns-prefetch"
          href="https://arkdkqkhbfpcf1pr.public.blob.vercel-storage.com"
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex min-h-screen w-full flex-col overflow-x-hidden bg-neutral-950 text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-950 focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="w-full flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
