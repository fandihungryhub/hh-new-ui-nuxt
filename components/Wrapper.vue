<template>
  <div class="wrapper">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { createApp, reactive } from "vue";
import { createI18n } from "vue-i18n";
import { getCurrentInstance } from "vue";
import { i18nOption } from "~/plugins/i18n";
// import WrapperRoot from "./WrapperRoot.vue";

const instance = getCurrentInstance();
const i18n = createI18n(i18nOption);
const app = createApp({});
app.use(i18n);
// appContext.app.use(i18n);
</script>
