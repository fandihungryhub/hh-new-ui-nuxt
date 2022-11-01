<template>
  <div class="wrapper">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { createI18n } from "vue-i18n";
import { getCurrentInstance } from "vue";
import { i18nOption } from "~/plugins/i18n";

const instance = getCurrentInstance();
const i18n = createI18n(i18nOption);
instance?.appContext.app.use(i18n);
// appContext.app.use(i18n);
</script>
