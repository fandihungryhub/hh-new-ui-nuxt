<template>
  <div class="text-white bg-red-dark">
    {{ $t("lol") }}
  </div>
  <div>
    {{ selectedCityName }}
  </div>
</template>

<script lang="ts" setup>
import { selectedCityName } from "~/stores/city";
</script>

<script lang="ts">
export default {
  name: "MyButton",
};
</script>
