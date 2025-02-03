import localFont from "next/font/local";
import "../styles/globals.scss";
import { draftMode } from "next/headers";
import { sanityFetch, SanityLive } from "@/sanity/client";
import { LiveErrorBoundary } from "./live-error-boundary";
import Navbar from "@/components/navbar";
import ClientProviders from "@/components/client-providers";
import { VisualEditing } from "next-sanity";
import { NavbarEntryWithSublinks } from "./lib/navbar-entry";
import { Navbar as Navigation } from "@/sanity/sanity.types";
import CatBox from "@/components/cat-box";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  let mappedEntries: NavbarEntryWithSublinks[] = [];

  try {
    const navigationFetch = await sanityFetch({
      query: `*[_type == "navbar"][0]{
        ...,
        "links": links[] {
          ...,
          "sublinks": sublinks[] {
            ...
          }
        }
      }`
    });

    const navigation: Navigation = navigationFetch.data;
    console.log("Fetched navigation data:", navigation);

    if (navigation && navigation.links) {
      mappedEntries = navigation.links.map((entry) => ({
        text: entry.text,
        link: entry.link,
        sublinks:
          entry.sublinks?.map((sublink) => ({
            text: sublink.text,
            link: sublink.link,
            _key: sublink._key,
          })) || [],
        _key: entry._key,
      }));

      console.log("Mapped entries:", mappedEntries);
    } else {
      console.warn("No navigation links found.");
    }
  } catch (error) {
    console.error("Error fetching navigation data:", error);
  }

  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href={favicons.ico.src} sizes="any" />
        <link rel="icon" href={favicons.svg.src} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={favicons.apple.src} /> */}
        <title>vaporvee&apos;s website</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProviders key={isEnabled ? "enabled" : "disabled"}>
          <Navbar entries={mappedEntries} />
          {children}
          <CatBox />
          <LiveErrorBoundary>
            <SanityLive />
          </LiveErrorBoundary>
          {isEnabled && <VisualEditing />}
        </ClientProviders>
      </body>
    </html>
  );
}
