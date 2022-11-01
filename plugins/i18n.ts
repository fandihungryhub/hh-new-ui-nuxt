import { createI18n } from "vue-i18n";
import { defineNuxtPlugin } from "#imports";
import en from "~/locales/en.json";
import th from "~/locales/th.json";

export const i18nOption = {
  legacy: false,
  globalInjection: true,
  locale: "en",
  messages: {
    en,
    th,
  },
};

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n(i18nOption);

  vueApp.use(i18n);
});
