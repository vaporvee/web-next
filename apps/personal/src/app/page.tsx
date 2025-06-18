"use client";

import { useTranslate } from "@tolgee/react";
import Link from "next/link";

export default function Home() {
  const {t} = useTranslate();
  return (
    <main className="flex flex-col items-center justify-center p-24 h-[200vh]">
      <div className="flex flex-col items-center justify-between max-w-3xl gap-12">
        <Link href="/blog" className="underline">
          {t("blog")}
        </Link>
        <h1 className="text-4xl">{t("home")}</h1>
      </div>
    </main>
  );
}
