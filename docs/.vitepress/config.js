import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Hungryhub Website",
  description: "Technical documentation",
  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/introduction" },
          {
            text: "Project Structure",
            link: "/structure/index.html",
            items: [
              { text: "Apis", link: "/structure/apis" },
              { text: "Assets", link: "/structure/assets" },
              { text: "Components", link: "/structure/components" },
              { text: "Helpers", link: "/structure/helpers" },
              { text: "Libs", link: "/structure/libs" },
              { text: "Locales", link: "/structure/locales" },
              { text: "Models", link: "/structure/models" },
              { text: "Pages", link: "/structure/pages" },
              { text: "Partials", link: "/structure/partials" },
              { text: "Plugins", link: "/structure/plugins" },
              { text: "Services", link: "/structure/services" },
              { text: "Stores", link: "/structure/stores" },
              { text: "Types", link: "/structure/types" },
            ],
          },
        ],
      },
    ],
  },
});
