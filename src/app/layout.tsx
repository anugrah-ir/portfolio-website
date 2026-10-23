import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSite } from "./admin/actions";

export async function generateMetadata(): Promise<Metadata> {
  const { success, site } = await getSite();

  if (!success || !site) {
    return {
      title: "Default Title",
      description: "Default Description",
      icons: {
        icon: "/favicon.ico",
      },
    };
  }

  return {
    title: site.title,
    description: site.description,
    icons: {
      icon: site.favicon,
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
