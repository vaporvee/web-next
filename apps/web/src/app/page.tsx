import type { Home, Author } from "@/sanity/sanity.types";
import { sanityFetch } from "@/sanity/client";
import Header from "@/components/header";
import { CSSProperties } from "react";

const HOME_QUERY = `*[_type == "home"]`;
const OWNER_QUERY = (ownerRef: string) =>
  `*[_type == "author" && _id == "${ownerRef}"]`;

export default async function IndexPage() {
  const result = await sanityFetch({ query: HOME_QUERY });
  const home: Home | null = result.data.length > 0 ? result.data[0] : null;

  let owner: Author | null = null;
  if (home?.owner?._ref) {
    const ownerQuery = OWNER_QUERY(home.owner._ref);
    const ownerResult = await sanityFetch({ query: ownerQuery });
    owner = ownerResult.data.length > 0 ? ownerResult.data[0] : null;
  }
  if (home) {
    const buttonStyles: CSSProperties[] =
      home.buttons?.map((button) => {
        return button?.variant === "bordered"
          ? {
              borderColor: button?.color?.value || "#000",
              color: button?.color?.value || "#000",
            }
          : { backgroundColor: button?.color?.value || "#000", color: "#fff" };
      }) || [];

    return (
      <>
        {home ? (
          <Header
            buttonStyles={buttonStyles}
            home={home}
            owner={owner ?? undefined}
          />
        ) : (
          <p></p>
        )}
        {
          //TODO: All tools from the database on circular big badges with their description under it
          //TODO: Slideshow from all images from projects on a glowing screen mockup inspired by GitHubs front page
        }

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum dolor
          sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum
        </p>
      </>
    );
  }
}
