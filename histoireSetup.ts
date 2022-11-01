import "./assets/css/tailwind.css";
import { defineSetupVue3 } from "@histoire/plugin-vue";
import { createI18n } from "vue-i18n";
import { i18nOption } from "~/plugins/i18n";

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  // const pinia = createI18n(i18nOption);
  // app.use(pinia); // Add Pinia store
});
