import { defineNuxtConfig } from "nuxt/config";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "url";
import VueI18nVitePlugin from "@intlify/unplugin-vue-i18n/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiDomain: process.env.NUXT_PUBLIC_API_DOMAIN,
    },
  },
  typescript: {
    shim: false,
  },
  // imports: {
  //   autoImport: false,
  // },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    [
      "unplugin-icons/nuxt",
      {
        compiler: "vue3",
        customCollections: {
          "hh-icons": FileSystemIconLoader("./assets/icons", (svg) =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
        },
      },
    ],
  ],
  vite: {
    plugins: [
      VueI18nVitePlugin({
        include: [
          resolve(dirname(fileURLToPath(import.meta.url)), "./locales/*.json"),
        ],
      }),
    ],
  },

  // intlify: {
  //   vueI18n: {
  //     locale: "en",
  //     messages: {
  //       en: {
  //         hello: "Hello",
  //       },
  //       th: {
  //         hello: "こんにちは",
  //       },
  //     },
  //   },
  // },
});
