"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import NextLink from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

const customNavTriggerStyle = cva(
  "h-6 px-3 py-0 mx-1 bg-sidebar text-white font-medium hover:bg-sidebar-accent focus:bg-sidebar-accent active:bg-sidebar-accent data-[state=open]:bg-sidebar data-[state=open]:hover:bg-sidebar-accent data-[state=open]:focus:bg-sidebar-accent leading-none rounded-full flex items-center justify-center"
);

const Link = ({
  href,
  children,
  className,
  ...props
}: LinkProps & { children: React.ReactNode; className?: string }) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <NavigationMenuLink
      asChild
      active={isActive}
      className={cn(customNavTriggerStyle(), isActive ? "bg-sidebar-accent" : undefined)}
      {...props}
    >
      <NextLink href={href}>{children}</NextLink>
    </NavigationMenuLink>
  );
};

export default function Navbar() {
  return (
    <nav className="w-full flex items-center px-8 py-4 gap-x-5 bg-sidebar border-b border-sidebar-border">
      <NextLink href="/">
        <h1>vaporvee's Website</h1>
      </NextLink>
      <NavigationMenu className="self-center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={customNavTriggerStyle()}>
              Blog
            </NavigationMenuTrigger>
            {}
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" className={customNavTriggerStyle()}>
              Item Two
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
