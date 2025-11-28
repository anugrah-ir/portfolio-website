import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSite } from "./admin/actions";

const site = getSite();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-neutral-950 text-white antialiased`}
      >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
