import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import rehypeExternalLinks from "rehype-external-links";
import rehypeInlineCodeLanguage from "rehype-inline-code-language";
import icon from "astro-icon";
import catppuccin from "@catppuccin/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "vaporvee Docs",
      defaultLocale: "root",
      favicon: "/favicon.svg",
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
      plugins: [
        catppuccin({
          dark: { flavor: "macchiato", accent: "sky" },
          light: { flavor: "latte", accent: "sky" }
        })
      ],
      customCss: ["./src/styles/custom.scss", "./src/styles/global.scss"],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/vaporvee' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/3gqUrtbaur' },
        { icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/vaporvee.com' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/yannik-ain/' },
      ],
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
