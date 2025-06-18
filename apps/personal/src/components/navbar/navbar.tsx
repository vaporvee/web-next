"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "./logo";
import { Search } from "lucide-react";
import { NavigationSheet } from "./navigation-sheet";
import { useTranslate } from "@tolgee/react";
import { AnimatedNavigationTabs } from "../ui/animated-navigation-tabs";


const Navbar = () => {
  const { t } = useTranslate();
  const ITEMS = [
    { id: 1, title: t("home"), href: "/" },
    { id: 2, title: t("blog"), href: "/blog" },
    { id: 3, title: t("work"), href: "/work" },
  ];
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-sidebar/70 backdrop-blur-xs border border-sidebar-border max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-6">
          <Logo />

          <div className="relative hidden md:block">
            <Search className="h-5 w-5 absolute inset-y-0 my-auto left-2.5" />
            <Input
              className="pl-10 flex-1 border-none shadow-none w-[280px] rounded-full"
              placeholder={t("search")}
            />
          </div>
        </div>
        <AnimatedNavigationTabs items={ITEMS} />
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="bg-muted text-foreground hover:bg-accent shadow-none rounded-full md:hidden"
          >
            <Search className="!h-5 !w-5" />
          </Button>
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full"
          >
            {t("docs")}
          </Button>
          <Button className="rounded-full">{t("contact")}</Button>
          <div className="block md:hidden">
            <NavigationSheet items={ITEMS} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
