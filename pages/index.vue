<template>
  <div>
    <Navbar />
    {{ configStore.backendConfig }}
  </div>
</template>

<script lang="ts" setup>
import useConfigStore from "~/stores/config";
import { onMounted } from "#imports";
import Navbar from "~/section/Navbar.vue";
const configStore = useConfigStore();
await configStore.getConfig();
onMounted(() => {
  console.log("index mounted");
});
</script>
