import { defineNuxtConfig } from "nuxt/config";
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
  modules: ["@nuxtjs/tailwindcss"],
  buildModules: [["unplugin-icons/nuxt", { compiler: "vue3" }], "@pinia/nuxt"],
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
