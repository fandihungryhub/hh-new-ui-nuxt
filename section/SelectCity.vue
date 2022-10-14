<template>
  <select class="border-none">
    <option v-for="city in availableCities" value="">{{ city }}</option>
  </select>
</template>

<script setup lang="ts">
const availableCities = ["Bangkok", "Phuket"];
</script>

<script lang="ts">
export default {
  name: "SelectCity",
};
</script>
