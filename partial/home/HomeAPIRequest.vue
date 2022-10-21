<template>
  <div></div>
</template>

<script lang="ts" setup>
import { setupConfig, getLang } from "~/stores/config";
import { fetchCity } from "~/stores/city";
import { init } from "~/composables/useTranslate";

async function initFetch() {
  await init(getLang());
  fetchCity();
  setupConfig();
}

initFetch();
</script>
<script lang="ts">
export default {
  name: "HomeAPIRequest",
};
</script>
