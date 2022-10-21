<template>
  <div>
    {{ configStore.backendConfig }}
  </div>
</template>

<script lang="ts" setup>
import useConfigStore from "~/stores/config";
import { onMounted } from "#imports";
const configStore = useConfigStore();
await configStore.getConfig();
onMounted(() => {
  console.log("index mounted");
});
</script>
