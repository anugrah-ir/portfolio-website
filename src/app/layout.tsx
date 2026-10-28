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

  return {
    metadataBase: new URL("https://anugrahilhamirizki.vercel.app"),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: {
      icon: favicon,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: title,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
        <Navbar />
        <main className="w-full flex-grow pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

