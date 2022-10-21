import { createI18n } from "vue-i18n";
import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "en",
    messages: {
      en: {
        hello: "Hello, {name}!",
        lastReservationCTA: "Trending! Last booking was made",
      },
      th: {
        lastReservationCTA: "ร้านฮิต! จองครั้งสุดท้ายเมื่อ",
      },
    },
  });

  vueApp.use(i18n);
});
