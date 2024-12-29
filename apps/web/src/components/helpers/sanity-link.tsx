import Link from "next/link";
import { Post, Link as SLink } from "@/sanity/sanity.types";
import { ReactNode } from "react";

interface Props {
  link: SLink | undefined;
  children: ReactNode;
  post?: Post | null;
}

export default function SanityLink({ link, children, post }: Props) {
  if (!link) return <>{children}</>;

  const { type, value, anchor, parameters, blank, url, email, phone } = link;
  const target = blank ? "_blank" : "";

  let href = "";
  switch (type) {
    case "static":
      href = `${value || ""}${anchor || ""}${parameters || ""}`;
      break;
    case "external":
      href = `${url || ""}${anchor || ""}${parameters || ""}`;
      break;
    case "email":
      href = `mailto:${email || ""}`;
      break;
    case "phone":
      href = `tel:${phone || ""}`;
      break;
    case "internal":
      if (post) {
        //TODO: pass down better posts / better structs
        href = `blog/${post.slug || ""}`;
      }
      break;
    default:
      return <>{children}</>;
  }

  return (
    <Link href={href} target={target}>
      {children}
    </Link>
  );
}
