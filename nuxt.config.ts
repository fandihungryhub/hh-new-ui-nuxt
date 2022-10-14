import { defineNuxtConfig } from "nuxt";
import { localeEN, localeTh } from "@afif_hh/web-toolkit/locale";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  buildModules: [
    "@intlify/nuxt3",
    ["unplugin-icons/nuxt", { compiler: "vue3" }],
    "@pinia/nuxt",
  ],
  intlify: {
    vueI18n: {
      locale: "en",
      messages: {
        en: {
          hello: "Hello",
          ...localeEN,
        },
        th: {
          hello: "こんにちは",
          ...localeTh,
        },
      },
    },
  },
});
