import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavProp } from "@/lib/types";

type AnimatedNavigationTabsProps = {
  items: NavProp[];
};

export function AnimatedNavigationTabs({ items }: AnimatedNavigationTabsProps) {
  const [active, setActive] = useState<NavProp>(items[0]);
  const [isHover, setIsHover] = useState<NavProp | null>(null);
  return (
    <main className="relative w-full min-h-screen flex items-start md:items-center justify-center px-4 py-10">
      <div className="relative">
        <ul className="flex items-center justify-center">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href || "#"}
              onClick={() => setActive(item)}
              onMouseEnter={() => setIsHover(item)}
              onMouseLeave={() => setIsHover(null)}
            >
              <button
                className={cn(
                  "py-2 relative duration-300 transition-colors hover:!text-primary",
                  active.id === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <div className="px-5 py-2 relative">
                  {item.title}
                  {isHover?.id === item.id && (
                    <motion.div
                      layoutId="hover-bg"
                      className="absolute bottom-0 left-0 right-0 w-full h-full bg-primary/10"
                      style={{
                        borderRadius: 6,
                      }}
                    />
                  )}
                </div>
                {active.id === item.id && (
                  <motion.div
                    layoutId="active"
                    className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                  />
                )}
                {isHover?.id === item.id && (
                  <motion.div
                    layoutId="hover"
                    className="absolute bottom-0 left-0 right-0 w-full h-0.5 bg-primary"
                  />
                )}
              </button>
            </Link>
          ))}
        </ul>
      </div>
    </main>
  );
}
