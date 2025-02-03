"use client";
import { Author, Home } from "@/sanity/sanity.types";
import { Button } from "@nextui-org/button";
import { PortableText } from "next-sanity";
import SanityLink from "./helpers/sanity-link";
import { CSSProperties } from "react";

interface HeaderProps {
  owner?: Author;
  home?: Home;
  buttonStyles?: CSSProperties[] | undefined;
}

export default function Header({ owner, home, buttonStyles }: HeaderProps) {
  return (
    <header className="relative min-h-screen overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gray-950 opacity-50"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-6xl md:text-7xl lg:text-8xl uppercase">
            {home?.pagetitle || ""}
          </h1>
          <h2 className="mb-6 text-xl font-extrabold leading-tight sm:text-xl md:text-2xl lg:text-3xl uppercase">
            {home?.subtitle || ""}
          </h2>
          <div className="mb-8 max-w-[61rem] text-xl text-gray-300 sm:text-2xl">
            {Array.isArray(owner?.bio) && <PortableText value={owner?.bio} />}
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {home?.buttons && home.buttons.length > 0 ? (
              home.buttons.map((button, index) => (
                <SanityLink key={button._key} link={button.link}>
                  <Button
                    className="rounded transition-colors duration-300"
                    size="lg"
                    style={
                      buttonStyles && buttonStyles[index]
                        ? buttonStyles[index]
                        : undefined
                    }
                    variant={button?.variant}
                  >
                    {button.text}
                  </Button>
                </SanityLink>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/*socialLinks && socialLinks.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-6">
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors"
                >
                  <span className="sr-only">{link.platform}</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  ></svg>
                </a>
              ))}
            </div>
          </div>
        )*/}
    </header>
  );
}
