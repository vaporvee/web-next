import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { SanityLive } from "@/sanity/live";
import Navbar from "@/components/navbar/navbar";
import TolgeeNextProvider from "./use-tolgee";
import React from "react";
import { bespokeSans } from "@/lib/font-bespoke";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vaporvee's Website",
  icons: {
    icon: "/favicon.svg",
  },
  description: "Personal website of Yannik Ain / vaporvee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bespokeSans.variable} antialiased scroll-smooth bg-background text-foreground dark`}
      >
        <React.StrictMode>
          <TolgeeNextProvider>
            <Navbar />
            {children}
            <SanityLive />
          </TolgeeNextProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}
