"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import SanityLink from "./helpers/sanity-link";
import Logo from "./svg/logo";
import { NavbarEntryWithSublinks } from "@/app/lib/navbar-entry";

interface Props {
  entries: NavbarEntryWithSublinks[];
}

export default function App({ entries }: Props) {
  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      className="fixed"
    >
      <NavbarMenuToggle className="sm:hidden" />
      <NavbarBrand>
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {entries.map((item, index) => (
          <NavbarItem key={`${item.text}-${index}`}>
            {item && (
              <SanityLink link={item.link}>
                <span className="text-white hover:text-green-500 transition-colors">
                  {item.text}
                </span>
              </SanityLink>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {entries.map((item, index) => (
          <NavbarMenuItem key={`${item.text}-${index}`}>
            {item && (
              <SanityLink link={item.link}>
                <span className="text-white hover:text-green-500 transition-colors">
                  {item.text}
                </span>
              </SanityLink>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
