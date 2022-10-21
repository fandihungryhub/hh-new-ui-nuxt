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
const { lang } = useRoute().params;
const parsedLang = Array.isArray(lang) ? lang[0] : lang;
useLang().value = parsedLang;
</script>
