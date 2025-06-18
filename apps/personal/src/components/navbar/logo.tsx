import Image, { ImageProps } from "next/image";
import logo from "../../public/favicon.svg";
import { useTranslate } from "@tolgee/react";

export function Logo() {
  const {t} = useTranslate();
  return (
    <div className="flex items-center px-5 justify-center text-xs font-semibold font-serif">
      <Image
        src={logo}
        alt="vaporvee's website Logo"
        width={32}
        height={32}
        className="h-6 w-6"
      />
      <h1 className="hidden md:inline text-lg font-semibold ml-2">
        {t("productName")}
      </h1>
    </div>
  );
}
