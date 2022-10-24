<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import "./assets/index.css";
import { useLang } from "./composables/state/lang";
import { setupUseReport } from "~~/composables/report/useReport";
import { useI18n } from "vue-i18n";
const { lang } = useRoute().params;
const parsedLang = Array.isArray(lang) ? lang[0] : lang;
changeLang(parsedLang);

function changeLang(lang: string) {
  const { locale } = useI18n();
  locale.value = lang;
  useLang().value = lang;
}
</script>
