"use client";

import enLocale from "../i18n/en.json";
import deLocale from "../i18n/de.json";
// If using TypeScript, import the type:
import type { TreeTranslationsData } from "@tolgee/core";

const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;

// Assert the type of the imported JSONs
const enData = enLocale as TreeTranslationsData;
const deData = deLocale as TreeTranslationsData;
import { useRouter } from "next/navigation";
import {
  TolgeeProvider,
  DevTools,
  Tolgee,
  FormatSimple,
  useTolgeeSSR,
} from "@tolgee/react";

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .init({
    defaultLanguage: "en",
    staticData: {
      en: enData,
      de: deData,
    },
    apiKey,
    apiUrl,
  });

function TolgeeNextProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Extract locale from the pathname, assuming /[locale]/... structure
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const locale = pathname.split("/")[1] || "en";

  const ssrTolgee = useTolgeeSSR(tolgee, locale);
  if (process.env.NODE_ENV === "development") {
    import("@tolgee/web/tools").then((module) => {
      tolgee.addPlugin(module.InContextTools());
    });
  }
  return <TolgeeProvider tolgee={ssrTolgee}>{children}</TolgeeProvider>;
}

export default TolgeeNextProvider;
