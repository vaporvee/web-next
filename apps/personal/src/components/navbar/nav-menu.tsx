import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavProp } from "@/lib/types";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

export const NavMenu = ({items, ...props} : {items: NavProp[]} & NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center"> 
      {items.map((item) => (
        <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href={item.href || "#"}>{item.title}</Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
