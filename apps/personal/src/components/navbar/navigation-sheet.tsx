import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { NavProp } from "@/lib/types";

export const NavigationSheet = ({items}: {items: NavProp[]}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-center text-center bg-sidebar border-l-sidebar-border">
        <NavMenu orientation="vertical" items={items} className="mt-12 w-full" />
      </SheetContent>
    </Sheet>
  );
};
