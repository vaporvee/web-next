import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeInlineCodeLanguage from "rehype-inline-code-language";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "vaporvee Docs",
      defaultLocale: "root",
      favicon: "../../packages/assets/icon/favicon.svg",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        de: {
          label: "Deutsch",
          lang: "de",
        },
      },
      customCss: ["./src/styles/custom.scss", "./src/styles/global.scss"],
      social: {
        github: "https://github.com/vaporvee",
        discord: "https://discord.gg/3gqUrtbaur",
        blueSky: "https://bsky.app/profile/vaporvee.com",
        linkedin: "https://linkedin.com/in/yannik-ain/",
      },
      editLink: {
        baseUrl: "https://github.com/vaporvee/docs/edit/main/",
      },
      sidebar: [
        {
          label: "Home",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Projects",
              link: "/",
            },
          ],
        },
        {
          label: "Discord RPC Godot",
          autogenerate: {
            directory: "discord-rpc-godot",
          },
        },
      ],
      components: {
        Head: "./src/components/sl-overwrites/Head.astro",
      },
    }),
    icon(),
  ],
  markdown: {
    rehypePlugins: [
      rehypeInlineCodeLanguage,
      [
        rehypeExternalLinks,
        {
          target: "_blank",
        },
      ],
    ],
  },
});
