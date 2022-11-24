<template>
  <div class="text-white bg-red-dark">
    {{ b }}
  </div>
  <div>
    <!-- {{ selectedCityName }} -->
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n({
  useScope: "global",
});
const b = t("bannerCTA");
</script>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>
